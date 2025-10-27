import { useEffect, useState, useRef } from "react";

export default function ResponsiveOverflowAnalyzer() {
    const [zones, setZones] = useState([]);
    const [analyzing, setAnalyzing] = useState(false);
    const [progress, setProgress] = useState(0);
    const [config, setConfig] = useState({
        maxWidth: 3840,
        step: 1,
        includeElements: true,
    });
    const [culprits, setCulprits] = useState([]);
    const iframeRef = useRef(null);
    const [url, setUrl] = useState("");

    const analyzeScroll = async (url = null) => {
        setAnalyzing(true);
        setProgress(0);
        const results = [];
        const elementIssues = new Map();
        let currentStart = null;
        const tolerance = 2; // ← Tolérance anti faux positifs

        // Créer un iframe
        const iframe = document.createElement("iframe");
        iframe.style.cssText =
            "position:fixed;top:-9999px;left:-9999px;width:100%;height:100vh;border:none;";
        document.body.appendChild(iframe);

        // Charger la page ou le DOM actuel
        if (!url) {
            const iframeDoc = iframe.contentDocument;
            iframeDoc.open();
            iframeDoc.write(document.documentElement.outerHTML);
            iframeDoc.close();
        } else {
            iframe.src = url;
            await new Promise((resolve, reject) => {
                iframe.onload = () => resolve();
                iframe.onerror = () => reject(new Error("Impossible de charger l'URL"));
            });
        }

        const iframeDoc = iframe.contentDocument || iframe.contentWindow.document;

        // Injection d’un reset CSS global pour fiabiliser les mesures
        const resetStyle = iframeDoc.createElement("style");
        resetStyle.textContent = `
      html, body {
        margin: 0 !important;
        padding: 0 !important;
        overflow-x: hidden !important;
      }
      * {
        box-sizing: border-box !important;
        max-width: 100vw !important;
      }
    `;
        iframeDoc.head.appendChild(resetStyle);

        const totalSteps = Math.ceil(config.maxWidth / config.step);

        // Boucle de test responsive
        for (let w = 0; w <= config.maxWidth; w += config.step) {
            iframe.style.width = `${w}px`;

            const body = iframeDoc.body;
            const html = iframeDoc.documentElement;

            // Calcul consolidé du scrollWidth
            const scrollWidth = Math.max(
                body.scrollWidth,
                html.scrollWidth,
                body.offsetWidth,
                html.offsetWidth,
                iframe.contentWindow.innerWidth
            );

            const overflowValue = scrollWidth - w;
            const hasScroll = overflowValue > tolerance;

            if (hasScroll && currentStart === null) currentStart = w;

            if (!hasScroll && currentStart !== null) {
                results.push({
                    start: currentStart,
                    end: w - config.step,
                    overflow: Math.round(overflowValue),
                });
                currentStart = null;
            }

            if (w % 10 === 0) {
                setProgress(Math.round((w / config.maxWidth) * 100));
                await new Promise((r) => setTimeout(r, 0));
            }
        }

        // Fermer la dernière zone si encore active
        if (currentStart !== null) {
            const finalScroll = Math.max(
                iframeDoc.body.scrollWidth,
                iframeDoc.documentElement.scrollWidth
            );
            results.push({
                start: currentStart,
                end: config.maxWidth,
                overflow: Math.round(finalScroll - config.maxWidth),
            });
        }

        // Nettoyage de l’iframe
        document.body.removeChild(iframe);

        setZones(results);
        setCulprits(Array.from(elementIssues.values()));
        setAnalyzing(false);
        setProgress(100);
    };

    const getSelector = (el) => {
        if (el.id) return `#${el.id}`;
        if (el.className && typeof el.className === "string") {
            const classes = el.className.trim().split(/\s+/).slice(0, 2).join(".");
            return classes
                ? `${el.tagName.toLowerCase()}.${classes}`
                : el.tagName.toLowerCase();
        }
        return el.tagName.toLowerCase();
    };

    const generateCSS = () => {
        if (zones.length === 0) return "";
        let css = "/* 🎯 Corrections suggérées pour le scroll horizontal */\n\n";
        css += "/* 1. Solution globale préventive */\n";
        css += "html, body {\n";
        css += "  max-width: 100vw;\n";
        css += "  overflow-x: hidden;\n";
        css += "}\n\n";
        css += "* {\n";
        css += "  max-width: 100%;\n";
        css += "  box-sizing: border-box;\n";
        css += "}\n\n";

        zones.forEach((z, i) => {
            css += `/* Zone ${i + 1}: ${z.start}px - ${z.end}px (overflow: +${z.overflow}px) */\n`;
            css += `@media (max-width: ${z.end+1}px) {\n`;
            css += `  /* Ajustez vos éléments larges ici */\n`;
            if (culprits.length > 0) {
                const relevantCulprits = culprits.slice(0, 3);
                relevantCulprits.forEach((c) => {
                    css += `  ${c.selector} {\n`;
                    css += `    max-width: 100% !important;\n`;
                    if (
                        c.styles.width !== "auto" &&
                        !c.styles.width.includes("%")
                    ) {
                        css += `    width: 100% !important;\n`;
                    }
                    css += `  }\n`;
                });
            }
            css += `}\n\n`;
        });
        return css;
    };

    const copyCSS = () => {
        const css = generateCSS();
        navigator.clipboard.writeText(css);
    };

    return (
        <div className="fixed inset-0 bg-gradient-to-br from-slate-900 to-slate-800 p-6 overflow-auto">
            <div className="max-w-6xl mx-auto">
                {/* Header */}
                <div className="bg-slate-800 rounded-xl p-6 mb-6 border border-slate-700">
                    <h1 className="text-3xl font-bold text-white mb-2 flex items-center gap-3">
                        📱 Analyseur de Scroll Horizontal
                    </h1>
                    <p className="text-slate-400">
                        Détecte les débordements horizontaux sur toutes les résolutions et
                        suggère des corrections CSS
                    </p>
                </div>

                {/* Configuration */}
                <div className="bg-slate-800 rounded-xl p-6 mb-6 border border-slate-700">
                    <h2 className="text-xl font-semibold text-white mb-4">⚙️ Configuration</h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div>
                            <label className="block text-sm text-slate-400 mb-2">
                                Largeur maximale (px)
                            </label>
                            <input
                                type="number"
                                value={config.maxWidth}
                                onChange={(e) =>
                                    setConfig({ ...config, maxWidth: Number(e.target.value) })
                                }
                                className="w-full bg-slate-700 text-white px-4 py-2 rounded-lg border border-slate-600 focus:outline-none focus:border-blue-500"
                                min="320"
                                max="7680"
                                disabled={analyzing}
                            />
                        </div>
                        <div>
                            <label className="block text-sm text-slate-400 mb-2">
                                Précision (px)
                            </label>
                            <input
                                type="number"
                                value={config.step}
                                onChange={(e) =>
                                    setConfig({ ...config, step: Number(e.target.value) })
                                }
                                className="w-full bg-slate-700 text-white px-4 py-2 rounded-lg border border-slate-600 focus:outline-none focus:border-blue-500"
                                min="1"
                                max="50"
                                disabled={analyzing}
                            />
                        </div>
                        <div className="flex items-end">
                            <label className="flex items-center gap-2 text-white cursor-pointer">
                                <input
                                    type="checkbox"
                                    checked={config.includeElements}
                                    onChange={(e) =>
                                        setConfig({
                                            ...config,
                                            includeElements: e.target.checked,
                                        })
                                    }
                                    className="w-4 h-4"
                                    disabled={analyzing}
                                />
                                Identifier les éléments
                            </label>
                        </div>
                    </div>

                    <div className="mb-4 mt-4">
                        <label className="block mb-2 text-white">
                            URL de la page à analyser :
                        </label>
                        <input
                            type="text"
                            className="w-full p-2 rounded border border-gray-300"
                            placeholder="https://example.com"
                            value={url}
                            onChange={(e) => setUrl(e.target.value)}
                        />
                        <button
                            className="mt-2 px-4 py-2 bg-blue-600 text-white rounded"
                            onClick={() => analyzeScroll(url)}
                            disabled={analyzing}
                        >
                            {analyzing
                                ? `Analyse en cours... ${progress}%`
                                : "Analyser"}
                        </button>
                    </div>

                    {analyzing && (
                        <div className="mt-4 bg-slate-700 rounded-full h-3 overflow-hidden">
                            <div
                                className="bg-blue-500 h-full transition-all duration-300 rounded-full"
                                style={{ width: `${progress}%` }}
                            />
                        </div>
                    )}
                </div>

                {/* Résultats */}
                {!analyzing && zones.length > 0 && (
                    <>
                        <div className="bg-slate-800 rounded-xl p-6 mb-6 border border-slate-700">
                            <h2 className="text-xl font-semibold text-white mb-4">
                                📊 Zones avec scroll horizontal
                            </h2>
                            <div className="space-y-3">
                                {zones.map((z, i) => (
                                    <div
                                        key={i}
                                        className="bg-slate-700 rounded-lg p-4 border border-red-500/30"
                                    >
                                        <div className="flex items-center justify-between mb-2">
                      <span className="text-white font-mono font-semibold">
                        Zone #{i + 1}
                      </span>
                                            <span className="text-red-400 text-sm">
                        Overflow: +{z.overflow}px
                      </span>
                                        </div>
                                        <div className="text-slate-300 font-mono text-sm">
                                            📐 {z.start}px → {z.end}px
                                        </div>
                                        <div className="mt-2 text-blue-400 text-sm font-mono">
                                            @media (max-width: {z.end+1}px) &#123; /* corrections */ &#125;
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Code CSS généré */}
                        <div className="bg-slate-800 rounded-xl p-6 border border-slate-700">
                            <div className="flex items-center justify-between mb-4">
                                <h2 className="text-xl font-semibold text-white">
                                    💡 Code CSS suggéré
                                </h2>
                                <button
                                    onClick={copyCSS}
                                    className="px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg text-sm font-semibold transition-all active:scale-95"
                                >
                                    📋 Copier
                                </button>
                            </div>
                            <pre className="bg-slate-900 text-green-400 p-4 rounded-lg overflow-x-auto text-sm border border-slate-700">
                <code>{generateCSS()}</code>
              </pre>
                        </div>
                    </>
                )}

                {!analyzing && zones.length === 0 && progress === 100 && (
                    <div className="bg-slate-800 rounded-xl p-8 border border-slate-700 text-center">
                        <div className="text-6xl mb-4">✅</div>
                        <h2 className="text-2xl font-semibold text-white mb-2">
                            Aucun problème détecté !
                        </h2>
                        <p className="text-slate-400">
                            Votre page ne présente pas de scroll horizontal sur les
                            résolutions testées (0px - {config.maxWidth}px)
                        </p>
                    </div>
                )}
            </div>
        </div>
    );
}
