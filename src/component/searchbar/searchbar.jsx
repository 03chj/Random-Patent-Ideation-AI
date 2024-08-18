// src/component/searchbar/searchbar.jsx
import React, { useState } from 'react';
import styles from './searchbar.module.css';

function SearchBar({ onSearch }) {
    const [input, setInput] = useState('');

    const handleSubmit = (event) => {
        event.preventDefault();
        const regCondition = /^(?!\s*$)(?=\S)(?:[^\s\/]+)\/(?:[^\s\/]+)$/;
        if (regCondition.test(input)){
            onSearch(input);
        }
        else {
            window.alert('입력 양식을 맞춰주세요.')
        }
    };

    return (
        <form className={styles.searchForm} onSubmit={handleSubmit}>
            <div className={styles.inputWrapper}>
                <input
                    type="text"
                    placeholder="관련 특허를 검색할 분야와 문제 상황을 '/'로 구분하여 입력하세요."
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    className={styles.inputText}
                />
                <button type="submit" className={styles.searchButton}>
                    <img src="./image/search.svg" alt="Search" />
                </button>
            </div>
        </form>
    );
}

export default SearchBar;
