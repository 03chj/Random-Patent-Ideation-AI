import React from 'react'
import styles from './button.css'

export const Button = ({
    text, 
    handleClick = () => {console.log('클릭')}
}) => {
    return(
        <div className={styles.button}>
            <button className={styles.button1} onClick={handleClick}>{text}</button>
        </div>
    )
}