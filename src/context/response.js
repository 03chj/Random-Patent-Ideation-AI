import React, { createContext, useState } from 'react';

const ResponseContext = createContext();

const ResponseProvider = ({ children }) => {
    const [response, setResponse] = useState(new Array(50).fill({
        "indexNo": 0,
        "inventionTitle": "시각장애인을 위한 퍼킨스 타입의 접이식 키보드",
        "applicationDate": "2024-06-21",
        "applicantName": "삼성전자",
        "explanation": "발명은 위와 같은 요구에 부응하기 위하여 안출된 것으로, 본 발명에서 해결하고자 하는 과제는 퍼킨스 타입의 3단 접이식 키보드로 이루어지며, 펜타그래프 방식을 적용하여 슬림하게 제작이 가능함에 따라, 휴대시 부피를 최소화할 수 있도록 한다.",
        "url": "https://www.naver.com"
      }));

    return (
        <ResponseContext.Provider value={{ response, setResponse }}>
            {children}
        </ResponseContext.Provider>
    );
};

export { ResponseContext, ResponseProvider };
