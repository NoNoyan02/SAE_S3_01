import React from 'react';

export default function SEO({ title, description, image }) {
    const defaultTitle = "Croix-Rouge française : engagez vous à nos côtés";
    const defaultDescription = "La Croix-Rouge française agit pour protéger et relever sans condition, les personnes en situation de vulnérabilité et construire avec elles leur résilience.";
    const defaultImage = "/assets/og-image.jpg";

    const siteTitle = title || defaultTitle;
    const metaDescription = description || defaultDescription;
    const metaImage = image || defaultImage;

    const currentUrl = typeof window !== 'undefined' ? window.location.href : 'https://www.croix-rouge.fr';

    return (
        <>
            <title>{siteTitle}</title>
            <meta name="description" content={metaDescription} />
            <link rel="canonical" href="https://www.croix-rouge.fr" />

            <meta property="og:type" content="website" />
            <meta property="og:title" content={`${siteTitle} | Croix-Rouge française`} />
            <meta property="og:description" content={metaDescription} />
            <meta property="og:image" content={metaImage} />
            <meta property="og:url" content={currentUrl} />

            <meta name="twitter:card" content="summary_large_image" />
            <meta name="twitter:title" content={siteTitle} />
            <meta name="twitter:description" content={metaDescription} />
            <meta name="twitter:image" content={metaImage} />

            <link rel="icon" type="image/x-icon" href="/favicon.ico" />
            <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
            <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
            <link rel="icon" type="image/svg+xml" href="/favicon.svg" />

            <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
            <link rel="apple-touch-icon" sizes="1006x300" href="/crf_logo.png" />

            <link rel="manifest" href="/manifest.json" crossOrigin="use-credentials" />
        </>
    );
}