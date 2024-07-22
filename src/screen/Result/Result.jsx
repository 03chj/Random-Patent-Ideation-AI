import React from 'react'
import {Button} from '../../component/button/button'
import {Card} from '../../component/card/card'
import {Header} from '../../component/header/header'
import './Result.css'

export const Result = () => {
    return(
        <>
        <Header></Header>
        <div className='card-container'>
            <Card></Card>
            <Card></Card>
            <Card></Card>
        </div>
        <Button></Button>
        </>
    )
}