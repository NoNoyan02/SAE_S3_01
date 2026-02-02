import React from 'react';

export default function SearchBar() {
    return (
        <div className="searchbar-wrapper">
            <style>{`
                .visually-hidden {
                    position: absolute;
                    width: 1px;
                    height: 1px;
                    margin: -1px;
                    padding: 0;
                    overflow: hidden;
                    clip: rect(0, 0, 0, 0);
                    white-space: nowrap;
                    border: 0;
                }
                .searchbar-wrapper {
                    margin-bottom: 64px;
                    padding: 0 24px;
                    margin-top: -30px;
                    position: relative;
                    z-index: 10;
                    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif;
                    display: flex;
                    justify-content: center;
                }
                .search-container {
                    padding: 6px 20px;
                    display: flex;
                    background-color: white;
                    border-radius: 8px;
                    box-shadow: 0 8px 16px rgba(0, 0, 0, 0.1);
                    overflow: hidden;
                    width: 100%;
                    max-width: 900px;
                }
                .search-container select,
                .search-container input {
                    border: none;
                    outline: none;
                    padding: 16px 20px;
                    font-size: 1.6rem;
                    background: transparent;
                }
                .search-container select {
                    font-weight: bold;
                    border-right: 1px solid #eee;
                    color: #333;
                    cursor: pointer;
                    flex: 0 0 auto;
                }
                .search-container input {
                    flex: 1;
                    color: #333;
                }
                /* Mobile styles */
                @media (max-width: 768px) {
                    .searchbar-wrapper {
                        padding: 0 16px;
                    }
                    .search-container {
                        flex-direction: column;
                    }
                    .search-container select {
                        border-right: none;
                        border-bottom: 1px solid #eee;
                        width: 100%;
                    }
                    .search-container input {
                        width: 100%;
                    }
                }
            `}</style>

            <form className="search-container" role="search" aria-label="Recherche de formation" onSubmit={(e) => e.preventDefault()}>
                <label htmlFor="formation-type" className="visually-hidden">Type de formation</label>
                <select id="formation-type" name="formation-type">
                    <option value="toutes">Toutes les formations</option>
                    <option value="psc1">PSC1</option>
                    <option value="gqs">GQS</option>
                    <option value="sst">SST</option>
                </select>

                <label htmlFor="location" className="visually-hidden">Localisation</label>
                <input
                    type="text"
                    id="location"
                    name="location"
                    placeholder="Code postal ou ville"
                    aria-label="Code postal ou ville"
                />

                <button type="submit" className="visually-hidden">Rechercher</button>
            </form>
        </div>
    );
}
