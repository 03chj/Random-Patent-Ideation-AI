import React, { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Header } from '../../component/header/header';
import styles from './Loading.module.css';

function Loading() {
    const navigate = useNavigate();
    const location = useLocation();
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch('API_ENDPOINT', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ problemDescription: location.state.searchQuery })
                });
                const data = await response.json();
                setLoading(false);
                navigate('/result', { state: { data } });
            } catch (error) {
                console.error('Failed to fetch data:', error);
            }
        };

        fetchData();
    }, [navigate, location.state.searchQuery]);

    return (
        <div className={styles.container}>
            <Header />
            <div className={styles.content}>
                <div className={styles.spinner}></div> {/* Ensure CSS is defined for spinner */}
                <p>입력하신 내용과 관련된 특허를 찾고 있습니다...</p>
            </div>
        </div>
    );
}

export default Loading;
