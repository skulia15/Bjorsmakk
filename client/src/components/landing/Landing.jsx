import React from 'react';
import styles from './Landing.module.scss';

export const Landing = () => {
    return (
        <div className={styles.landing}>
            <div className={styles.landingImage}></div>
            <h1>Bjórsmakk!</h1>
            Smökkum jólabjór
        </div>
    );
};
