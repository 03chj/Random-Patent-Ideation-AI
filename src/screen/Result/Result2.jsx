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
    const { state } = location;
    const [page, setPage] = useState(0);
    const navigate = useNavigate();

    const goToSearch = () => {
        navigate('/search');
    };

    const response = state?.data;
    
    return(
        <>
            <Header></Header>
            <Message></Message>
            <div className='cards-container'>
                <div className='cards'>
                <Card 
                    title={response[page*3].inventionTitle}
                    date={response[page*3].applicationDate}
                    inventor={response[page*3].applicantName}
                    abstract={response[page*3].explanation}
                    url={response[page*3].url}>               
                </Card>
                <Card
                    title={response[page*3+1].inventionTitle}
                    date={response[page*3+1].applicationDate}
                    inventor={response[page*3+1].applicantName}
                    abstract={response[page*3+1].explanation}
                    url={response[page*3+1].url}>
                </Card>
                <Card
                    title={response[page*3+2].inventionTitle}
                    date={response[page*3+2].applicationDate}
                    inventor={response[page*3+2].applicantName}
                    abstract={response[page*3+2].explanation}
                    url={response[page*3+2].url}>   
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