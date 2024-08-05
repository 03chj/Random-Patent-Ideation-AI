// src/screen/Result/Result.jsx
import React, { useState } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import {Button} from '../../component/button/button'
import {Card} from '../../component/card/card'
import {Header} from '../../component/header/header'
import {Message} from '../../component/message/message'
import './Result.css'

export const Result2 = ( ) => {
    const location = useLocation();
    const { data } = location.state || {};
    const [page, setPage] = useState(0);
    const navigate = useNavigate();

    const goToSearch = () => {
        navigate('/search');
    };

    const solutions = data?.solutions || new Array(50).fill({
        "indexNo": 0,
        "inventionTitle": "시각장애인을 위한 퍼킨스 타입의 접이식 키보드",
        "applicationDate": "2024-06-21",
        "applicantName": "삼성전자",
        "explanation": "발명은 위와 같은 요구에 부응하기 위하여 안출된 것으로, 본 발명에서 해결하고자 하는 과제는 퍼킨스 타입의 3단 접이식 키보드로 이루어지며, 펜타그래프 방식을 적용하여 슬림하게 제작이 가능함에 따라, 휴대시 부피를 최소화할 수 있도록 한다.",
        "url": "https://www.naver.com"
      });
    
    return(
        <>
            <Header></Header>
            <Message></Message>
            <div className='cards-container'>
                <div className='cards'>
                <Card 
                    title={solutions[page*3].inventionTitle}
                    date={solutions[page*3].applicationDate}
                    inventor={solutions[page*3].applicantName}
                    abstract={solutions[page*3].explanation}
                    url={solutions[page*3].url}>               
                </Card>
                <Card
                    title={solutions[page*3+1].inventionTitle}
                    date={solutions[page*3+1].applicationDate}
                    inventor={solutions[page*3+1].applicantName}
                    abstract={solutions[page*3+1].explanation}
                    url={solutions[page*3+1].url}>
                </Card>
                <Card
                    title={solutions[page*3+2].inventionTitle}
                    date={solutions[page*3+2].applicationDate}
                    inventor={solutions[page*3+2].applicantName}
                    abstract={solutions[page*3+2].explanation}
                    url={solutions[page*3+2].url}>   
                </Card>
                </div>
            </div>
            <div className='buttons-container'>
                    <div className='buttons'>
                        <Button text='검색 화면으로' handleClick={goToSearch}></Button>
                        <Button text='다른 특허 보기' handleClick={() => setPage(page => page+1)}></Button>
                    </div>
            </div>
        </>
    )
}