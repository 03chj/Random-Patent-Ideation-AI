// src/screen/Loading/Loading.jsx
import React, { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Header } from "../../component/header/header";
import styles from "./Loading.module.css";

function Loading() {
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const { data } = location.state || {};
    if (!data) {
      setTimeout(() => {
        navigate("/result2", { state: { data } });
      }, 300000);
    }
  }, [navigate, location.state]);

  return (
    <div className={styles.container}>
      <Header />
      <div className={styles.content}>
        <div className={styles.spinner}></div> {}
        <p>입력하신 내용과 관련된 특허를 찾고 있습니다...</p>
      </div>
    </div>
  );
}

export default Loading;
