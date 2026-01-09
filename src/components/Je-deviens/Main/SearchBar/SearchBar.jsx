import React, {useState} from 'react';

export default function SearchBar() {
    const [query, setQuery] = useState("");
    const [showDropdown, setShowDropdown] = useState(false);

    const handleChange = (e) => {
        setQuery(e.target.value);
        setShowDropdown(e.target.value.length > 0);
    };

    const clearInput = () => {
        setQuery("");
        setShowDropdown(false);
    };

    return (
        <div className="searchbar-wrapper">
            {/* DÉBUT DU CSS INTÉGRÉ */}
            <style>{`
                .visually-hidden {
                    border: 0;
                    clip: rect(0 0 0 0);
                    height: 1px;
                    margin: -1px;
                    overflow: hidden;
                    padding: 0;
                    position: absolute;
                    width: 1px;
                }

                .searchbar-wrapper {
                    margin-bottom: 64px;
                    padding: 0 24px;
                    transition: background-size 0.2s ease-out;
                    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif;
                    margin-top: -30px;
                    position: relative;
                    z-index: 10;
                }

                @media (min-width: 1100px) {
                    .searchbar-wrapper {
                        margin-bottom: 88px;
                        padding: 0 64px;
                    }
                }

                .searchbar-container {
                    max-width: 970px;
                    margin-left: auto;
                    margin-right: auto;
                    width: 100%;
                    padding: 0 16px;
                }

                @media (max-width: 699px) {
                    .searchbar-container {
                        max-width: 312px;
                    }
                }

                @media (min-width: 700px) and (max-width: 1099px) {
                    .searchbar-container {
                        padding: 0 24px;
                    }
                }

                .searchbar-form {
                    display: flex;
                    flex-direction: column;
                    background-color: #fff;
                    padding: 16px 20px;
                    border-radius: 4px;
                    box-shadow: 0 8px 16px rgba(0, 0, 0, 0.1);
                    position: relative;
                    max-width: 600px;
                    margin: 0 auto;
                }

                /* Ajout pour aligner l'input et l'icône */
                .searchbar-form__input-wrapper {
                    display: flex;
                    align-items: center;
                    width: 100%;
                    position: relative;
                }

                .searchbar-form__input-field {
                    width: 100%;
                    font-size: 1.6rem;
                    border-radius: 4px;
                    border: 0;
                    color: #000;
                    background-color: #fff;
                    outline: none;
                    padding: 8px 0;
                }

                .searchbar-form__input-field:focus,
                .searchbar-form__input-field:hover {
                    border-color: #767676;
                }

                .searchbar-form__input-field::placeholder {
                    color: #767676;
                    font-weight: 400;
                    opacity: 1;
                }

                .searchbar-form__dropdown {
                    position: absolute;
                    top: 100%;
                    left: 0;
                    width: 100%;
                    max-height: 200px; /* Limite de hauteur ajoutée */
                    overflow-y: auto;
                    font-size: 1.4rem;
                    background-color: #fff;
                    box-shadow: 0 8px 16px rgba(0, 0, 0, 0.1);
                    border-radius: 0 0 4px 4px;
                    transition: max-height 0.25s ease;
                    z-index: 10;
                    padding: 0;
                    list-style: none;
                    margin: 0;
                }

                .searchbar-form__dropdown li {
                    padding: 12px 24px;
                    cursor: pointer;
                    border-bottom: 1px solid #f0f0f0;
                }

                .searchbar-form__dropdown li:hover {
                    background-color: #f5f5f5;
                    color: #e3001b;
                }

                @media (min-width: 700px) {
                    .searchbar-form__dropdown {
                        padding: 0;
                    }
                }

                .searchbar-form__icon-clear {
                    cursor: pointer;
                    font-size: 1.6rem;
                    margin-left: 16px;
                    color: #767676;
                    line-height: 1;
                }

                .searchbar-form__icon-clear:hover {
                    color: #000;
                }

                @media (min-width: 700px) {
                    .searchbar-form__icon-clear {
                        font-size: 2rem;
                    }
                }
            `}</style>
            {/* FIN DU CSS INTÉGRÉ */}

            <div className="searchbar-container">
                <form className="searchbar-form" onSubmit={(e) => e.preventDefault()}>
                    <div className="searchbar-form__input-wrapper">
                        <input
                            type="text"
                            className="searchbar-form__input-field"
                            placeholder="Code postal ou ville"
                            value={query}
                            onChange={handleChange}
                        />
                        {query && (
                            <span
                                className="searchbar-form__icon-clear"
                                onClick={clearInput}
                                role="button"
                                aria-label="Effacer la recherche"
                            >
                                ✕
                            </span>
                        )}
                    </div>

                    {showDropdown && (
                        <ul className="searchbar-form__dropdown">
                            <li>Paris</li>
                            <li>Lyon</li>
                            <li>Marseille</li>
                        </ul>
                    )}
                </form>
            </div>
        </div>
    );
}