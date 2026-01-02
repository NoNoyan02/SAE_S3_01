import React, {useState} from 'react';
import "./SearchBar.css"

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
            <div className="searchbar-container">
                <form className="searchbar-form" onSubmit={(e) => e.preventDefault()}>
                    <div className="searchbar-form__input-wrapper">
                        <input
                            type="text"
                            className="searchbar-form__input-field"
                            placeholder="Code postale ou ville"
                            value={query}
                            onChange={handleChange}
                        />
                        {query && (
                            <span
                                className="searchbar-form__icon-clear"
                                onClick={clearInput}
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