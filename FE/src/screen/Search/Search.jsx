// src/screen/Search/Search.jsx
import React from "react";
import { useNavigate } from "react-router-dom";
import { Header } from "../../component/header/header";
import SearchBar from "../../component/searchbar/searchbar";
import styles from "./Search.module.css";

function Search() {
  const navigate = useNavigate();

  const handleSearch = async (searchQuery) => {
    try {
      navigate("/loading", { state: { searchQuery } });
      const response = await fetch("http://35.216.14.32:3000/ideas", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ problemDescription: searchQuery }),
      });
      if (!response.ok) {
        throw new Error("Failed to fetch data");
      }
      setTimeout(() => {
        navigate("/result2", { state: { data } });
      }, 3000);
      const data = await response.json();
      navigate("/result2", { state: { data } });
    } catch (error) {
      console.error("Failed to fetch data:", error);
    }
  };

  return (
    <div className={styles.search}>
      <Header />
      <div className={styles.content}>
        <img className={styles.contentLogo} alt="Logo" src="/image/logo.png" />
        <div className={styles.contentText}>
          <SearchBar onSearch={handleSearch} />
          <div className={styles.infoSection}>
            <p className={styles.textWrapper}>예) 2차전지 / 배터리 수명 연장</p>
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
  );
}

export default Search;
