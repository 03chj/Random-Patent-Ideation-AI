// src/screen/Result/Result.jsx
import React, { useState, useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import {Button} from '../../component/button/button'
import {Card} from '../../component/card/card'
import {Header} from '../../component/header/header'
import {Message} from '../../component/message/message'
import './Result.css'
import { ResponseContext } from '../../context/response'

export const Result = ( ) => {
    const [page, setPage] = useState(0);

    const navigate = useNavigate();

    const goToSearch = () => {
        navigate('/search');
    };

    // const { response } = useContext(ResponseContext);

    const response = sessionStorage.getItem('idea');

    return(
        <>
            <Header></Header>
            <div className='result-container'>
                <div className='message'>
                    <Message></Message>
                </div>
                <div className='cards-container'>
                    <div className='cards'>
                    <Card 
                        title={response[(page*3)%response.length].inventionTitle}
                        date={response[(page*3)%response.length].applicationDate}
                        inventor={response[(page*3)%response.length].applicantName}
                        abstract={response[(page*3)%response.length].explanation}
                        url={response[(page*3)%response.length].url}>               
                    </Card>
                    <Card
                        title={response[(page*3+1)%response.length].inventionTitle}
                        date={response[(page*3+1)%response.length].applicationDate}
                        inventor={response[(page*3+1)%response.length].applicantName}
                        abstract={response[(page*3+1)%response.length].explanation}
                        url={response[(page*3+1)%response.length].url}>
                    </Card>
                    <Card
                        title={response[(page*3+2)%response.length].inventionTitle}
                        date={response[(page*3+2)%response.length].applicationDate}
                        inventor={response[(page*3+2)%response.length].applicantName}
                        abstract={response[(page*3+2)%response.length].explanation}
                        url={response[(page*3+2)%response.length].url}>   
                    </Card>
                    </div>
                </div>
                <div className='buttons-container'>
                        <div className='buttons'>
                            <Button text='검색 화면으로' handleClick={goToSearch}></Button>
                            <Button text='다른 특허 보기' handleClick={() => setPage(page => page+1)}></Button>
                        </div>
                </div>
            </div>
        </>
    )
}