// src/screen/Result/Result.jsx
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "../../component/button/button";
import { Card } from "../../component/card/card";
import { Header } from "../../component/header/header";
import { Message } from "../../component/message/message";
import "./Result.css";

export const Result = () => {
  const [page, setPage] = useState(0);
  const navigate = useNavigate();

  const goToSearch = (_) => {
    navigate("/search");
  };

  const storedResponse = sessionStorage.getItem("idea");
  const response = storedResponse ? JSON.parse(storedResponse).solutions : [];

  let pagesShown;
  if ((page * 3)%response.length > (page * 3 + 3)%response.length) {
    pagesShown = response.slice((page*3)%response.length);
    pagesShown = pagesShown.concat(response.slice(0,(page*3+3)%response.length));
  }
  else {
    pagesShown = response.slice((page * 3)%response.length, (page * 3 + 3)%response.length);
  }

  useEffect(() => {
    window.addEventListener('popstate', goToSearch);

    return () => {
      window.removeEventListener('popstate', goToSearch);
    };
  }, []);

  useEffect(() => {
    if(!storedResponse) {
      navigate('/', {replace: true});
    }
  }, [storedResponse, navigate]);

  return (
    <>
      <Header></Header>
      <div className="result-container">
        <div className="message">
          <Message></Message>
        </div>
        <div className="cards-container">
          <div className="cards">
            {pagesShown.map((item, index) => (
              <Card
                key={index}
                title={item.inventionTitle}
                date={item.applicationDate}
                inventor={item.applicantName}
                abstract={item.explanation}
                url={item.url}
                page = {page}
              ></Card>
            ))}
          </div>
        </div>
        <div className="buttons-container">
          <div className="buttons">
            <Button text="검색 화면으로" handleClick={goToSearch}></Button>
            <Button
              text="다른 특허 보기"
              handleClick={() => {setPage((prevPage) => prevPage + 1); }}
              disabled={page * 3 + 3 >= response.length} // Disable if no more items to show
            ></Button>
          </div>
        </div>
      </div>
    </>
  );
};
