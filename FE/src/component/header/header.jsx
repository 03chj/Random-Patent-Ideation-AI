import React from 'react';
import styles from './header.module.css';

export const Header = () => {
  	return (
    	<div className={styles.header}>
    		<img className={styles.image2Icon} alt="" src="/image/logo.png" />
  			<div className={styles.navigationPillList}>
        		<div className={styles.navigationPill} />
      		</div>
    	</div>
    );
};
