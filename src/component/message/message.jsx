import React from 'react';
import styles from './message.module.css';


export const Message = () => {
  	return (
    		<div className={styles.sectionText}>
      			<div className={styles.top}>
        				<b className={styles.secondaryHeadline}>유사한 문제를 가진 특허는 아래와 같습니다.</b>
      			</div>
    		</div>
        );
};

