import React, { useState, useEffect, useRef } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { searchItems } from '../../../../../api';
import './GlobalSearchBar.css';

const GlobalSearchBar = ({ onResultSelect }) => {
    const [query, setQuery] = useState('');
    const [results, setResults] = useState({ categories: [], subcategories: [], subsubcategories: [] });
    const [isLoading, setIsLoading] = useState(false);
    const [showSuggestions, setShowSuggestions] = useState(false);
    const searchTimeout = useRef(null);
    const suggestionsRef = useRef(null);
    const navigate = useNavigate();
    const location = useLocation();

    const [dynamicPlaceholder, setDynamicPlaceholder] = useState('');
    const placeholderIndex = useRef(0);
    const charIndex = useRef(0);
    const typingInterval = useRef(null);
    const [isAutoTyping, setIsAutoTyping] = useState(true);

    useEffect(() => {
        const urlParams = new URLSearchParams(location.search);
        const searchQuery = urlParams.get('q');

        if (searchQuery) {
            setQuery(searchQuery);
            performSearch(searchQuery);
        }

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
            if (searchTimeout.current) clearTimeout(searchTimeout.current);
        };
    }, [location.search]);

    const handleClickOutside = (event) => {
        if (suggestionsRef.current && !suggestionsRef.current.contains(event.target)) {
            setShowSuggestions(false);
        }
    };

    const performSearch = async (searchQuery) => {
        if (!searchQuery.trim()) {
            setResults({ categories: [], subcategories: [], subsubcategories: [] });
            return;
        }

        try {
            setIsLoading(true);
            const searchResults = await searchItems(searchQuery);
            setResults(searchResults);
            setIsLoading(false);
        } catch (error) {
            console.error('Error during search:', error);
            setIsLoading(false);
        }
    };

    const handleInputChange = (e) => {
        setIsAutoTyping(false);
        const newQuery = e.target.value;
        setQuery(newQuery);
        setShowSuggestions(true);

        if (searchTimeout.current) clearTimeout(searchTimeout.current);

        searchTimeout.current = setTimeout(() => {
            performSearch(newQuery);
        }, 300);
    };

    const handleResultClick = (result) => {
        setIsAutoTyping(false);
        let path;
        switch (result.type) {
            case 'category':
                path = `/categories/${result.id}`;
                break;
            case 'subcategory':
                path = `/subcategories/${result.id}`;
                break;
            case 'subsubcategory':
                path = `/subsubcategory/${result.id}`;
                break;
            default:
                path = '/';
        }

        setShowSuggestions(false);
        if (onResultSelect) onResultSelect(result);
        navigate(path);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setIsAutoTyping(false);
        if (query.trim()) {
            navigate(`/search?q=${encodeURIComponent(query)}`);
        }
    };

    const totalResults = Object.values(results).reduce((sum, arr) => sum + arr.length, 0);

    const autoTexts = [
        "Type 'Company Registration'",
        "Type 'GST filling'",
        "Type 'Trademark'",
        "type 'ISO Certificate'",
        "Search Through All our service",
        "Type 'FSSAI registration'",
        "Type 'Copyright registration'"
    ];

    useEffect(() => {
        if (!isAutoTyping) return;

        const typePlaceholder = () => {
            const currentText = autoTexts[placeholderIndex.current];
            if (charIndex.current < currentText.length) {
                setDynamicPlaceholder(currentText.slice(0, charIndex.current + 1));
                charIndex.current++;
            } else {
                clearInterval(typingInterval.current);
                setTimeout(() => {
                    charIndex.current = 0;
                    placeholderIndex.current = (placeholderIndex.current + 1) % autoTexts.length;
                    typingInterval.current = setInterval(typePlaceholder, 100);
                }, 1500);
            }
        };

        typingInterval.current = setInterval(typePlaceholder, 100);
        return () => clearInterval(typingInterval.current);
    }, [isAutoTyping]);

    return (
        <div className="global-search-container">
            <form onSubmit={handleSubmit} className="search-form">
                <div className="twm-inputicon-box">
                    <input
                        type="text"
                        placeholder={isAutoTyping ? dynamicPlaceholder : "Type here & hit search to find a perfect solution..."}
                        value={query}
                        onChange={handleInputChange}
                        onClick={() => setShowSuggestions(true)}
                        className="search-input no-border-input"
                    />
                    <i style={{color:"#0d6efd"}} className="feather-search" />
                    {/* GlobalSearchBar */}
                </div>


                {showSuggestions && (
                    <div className="search-suggestions" ref={suggestionsRef}>
                        {isLoading ? (
                            <div className="suggestions-loading">
                                <i className="fa fa-spinner fa-spin"></i> Searching...
                            </div>
                        ) : (
                            <>
                                {totalResults > 0 ? (
                                    <div className="suggestions-content">
                                        {results.categories.length > 0 && (
                                            <div className="suggestion-category">
                                                <ul>
                                                    {results.categories.map(item => (
                                                        <li key={`cat-${item.id}`} onClick={() => handleResultClick({ ...item, type: 'category' })}>{item.name}</li>
                                                    ))}
                                                </ul>
                                            </div>
                                        )}
                                        {results.subcategories.length > 0 && (
                                            <div className="suggestion-category">
                                                <ul>
                                                    {results.subcategories.map(item => (
                                                        <li key={`subcat-${item.id}`} onClick={() => handleResultClick({ ...item, type: 'subcategory' })}>{item.name}</li>
                                                    ))}
                                                </ul>
                                            </div>
                                        )}
                                        {results.subsubcategories.length > 0 && (
                                            <div className="suggestion-category">
                                                <ul>
                                                    {results.subsubcategories.map(item => (
                                                        <li key={`subsubcat-${item.id}`} onClick={() => handleResultClick({ ...item, type: 'subsubcategory' })}>{item.name}</li>
                                                    ))}
                                                </ul>
                                            </div>
                                        )}
                                    </div>
                                ) : (
                                    query.trim() && <div className="no-suggestions">No results found for "{query}"</div>
                                )}
                            </>
                        )}
                    </div>
                )}
            </form>
    
        </div>
    );
};

export default GlobalSearchBar;
