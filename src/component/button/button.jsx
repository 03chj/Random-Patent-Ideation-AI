import React from 'react'
import styles from './button.module.css'

export const Button = ({
    text, 
    handleClick = () => {console.log('클릭')}
}) => {
    return(
        <>
            <div className={styles.button} onClick={handleClick}>{text}</div>
        </>
    )
}