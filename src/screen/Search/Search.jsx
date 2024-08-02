// src/screen/Search/Search.jsx
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Header } from '../../component/header/header';
import SearchBar from '../../component/searchbar/searchbar';
import styles from './Search.module.css';

function Search() {
    const navigate = useNavigate();
    const handleSearch = (data) => {
        navigate('/loading', { state: { searchQuery: data } });
    };

    return (
        <div className={styles.search}>
            <Header />
            <div className={styles.content}>
                <img className={styles.contentLogo} alt="Logo" src="/image/logo.png" />
                <SearchBar onSearch={handleSearch} />
                <p className={styles.textWrapper}>예) 2차전지 / 배터리 수명 연장</p>
                <div className={styles.infoSection}>
                    <div className={styles.alignmentContainer}>
                        <img className={styles.line} alt="Line1" src="/image/line1.svg" />
                        <span>분야</span>
                    </div>
                    <div className={styles.alignmentContainer}>
                        <img className={styles.line} alt="Line2" src="/image/line2.svg" />
                        <span>문제 상황</span>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Search;
