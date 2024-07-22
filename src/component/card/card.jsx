import React, {useState, useEffect } from 'react'
import './card.css'

export const Card = ({
    title='제목',
    inventor='출원인',
    date='출원날짜',
    abstract='이 특허는 이렇고 저렇다'
}) => {
    const [isFlipped, setIsFlipped] = useState(false);

    useEffect(() => {
        const 
    })

    return(
        <div className='card-container'>
            <div className={`card ${isFlipped ? 'flipped':''}`}>
                <div className='card-front'>
                    <h2>{title}</h2>
                    <p>{inventor}</p>
                    <p>{date}</p>
                    <a href='http://naver.com' target='_blank' rel='noopener noreferrer'>
                        <img alt="전문 보기" src={require('../../image/Link.svg').default}/>
                    </a>
                    <img alt="초록 보기" src={require('../../image/reply.svg').default} onClick={()=>{setIsFlipped((flipped)=>!flipped)}}/>
                </div>
                <div className='card-back'>
                    <p>{abstract}</p>
                    <img alt="초록 보기" src={require('../../image/reply.svg').default} onClick={()=>{setIsFlipped((flipped)=>!flipped)}}/>
                </div>
            </div>
        </div>
    )
}