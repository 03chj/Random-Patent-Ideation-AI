import React, {useState, useEffect } from 'react'
import './card.css'

export const Card = ({
    title='제목',
    inventor='출원인',
    date='출원날짜',
    abstract='이 특허는 이렇고 저렇다',
    url='www.naver.com'
}) => {
    const [isFlipped, setIsFlipped] = useState(false);

    // useEffect(() => {
    //     let animationFrameId;
    //     let start=null;
    //     const amplitude = 10;
    //     const frequency = 2;
        
    //     function animate(timestamp) {
    //         if (!start) start = timestamp;
    //         const elapsed = timestamp - start;

    //         const position = amplitude * Math.sin((2 * Math.PI / 1000) * frequency * elapsed);

    //         if (cardRef.current) {
    //             cardRef.current.style.transform = `translateX(${position}px)`
    //         }

    //         animationFrameId = requestAnimationFrame(animate);
    //     }

    //     animationFrameId = requestAnimationFrame(animate);

    //     return () => {
    //         cancelAnimationFrame(animationFrameId)
    //     }
    // }, [])

    return(
        <div className='card-container'>
            <div className={`card ${isFlipped ? 'flipped':''}`}>
                <div className='card-front'>
                    <div className='text'>
                        <div className='title'>
                            <h2>{title}</h2>
                        </div>
                        <div className='inventor'> 
                            <p>{inventor}</p>
                        </div>
                        <div className='date'>
                            <p>{date}</p>
                        </div>
                    </div>
                    <div className='buttons'>
                        <div className='link-button'>
                            <a href={url} target='_blank' rel='noopener noreferrer'>
                                <img alt="전문 보기" src="/image/Link.svg"/>
                            </a>
                        </div>
                        <div className='flip-button'>
                            <img alt="초록 보기" src="/image/reply.svg" onClick={()=>{setIsFlipped((flipped)=>!flipped)}}/>
                        </div>
                    </div>
                </div>
                <div className='card-back'>
                    <div className='abstract'>
                        <p>{abstract}</p>
                    </div>
                    <div className='flip-button'>
                        <img alt="초록 보기" src="/image/reply.svg" onClick={()=>{setIsFlipped((flipped)=>!flipped)}}/>
                    </div>
                </div>
            </div>
        </div>
    )
}