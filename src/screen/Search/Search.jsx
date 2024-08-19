import React from 'react'
import { useNavigate } from 'react-router-dom'
import { Header } from '../../component/header/header'
import SearchBar from '../../component/searchbar/searchbar'
import styles from './Search.module.css'

function Search() {
    const navigate = useNavigate()
    // const { setResponse } = useContext(ResponseContext);

    const handleSearch = async (searchQuery) => {
        try {
            navigate('/loading', { state: { searchQuery } })
            const response = await fetch('https://trizolve.com/ideas', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    problemDescription: searchQuery,
                }),
            })
            if (!response.ok) {
                const errorData = await response.json()
                throw new Error(errorData.message || 'Failed to fetch data')
            }
            const data = await response.json()
            sessionStorage.setItem('idea', JSON.stringify(data))
            // setResponse(data);

            navigate('/result', { state: { data } })
        } catch (error) {
            console.error('Failed to fetch data:', error)
            alert(error.message)
            navigate('/search')
        }
    }

    return (
        <div className={styles.search}>
            <Header />
            <div className={styles.content}>
                <img
                    className={styles.contentLogo}
                    alt="Logo"
                    src="/image/logo.png"
                />
                <div className={styles.contentText}>
                    <SearchBar onSearch={handleSearch} />
                    <div className={styles.infoSection}>
                        <p className={styles.textWrapper}>
                            예) 2차전지 / 배터리 수명 연장
                        </p>
                        <div className={styles.description}>
                            <div className={styles.alignmentContainer}>
                                <img
                                    className={styles.line}
                                    alt="Line1"
                                    src="/image/line1.svg"
                                />
                                <span className={styles.div}>분야</span>
                            </div>
                            <div className={styles.alignmentContainer}>
                                <img
                                    className={styles.line}
                                    alt="Line2"
                                    src="/image/line2.svg"
                                />
                                <span className={styles.div2}>문제 상황</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Search
