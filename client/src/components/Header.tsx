import React, { useState, useEffect } from "react";
import styles from "../stylesheets/main.module.scss";

const Header: React.FC = () => {
    const [currentTime, setCurrentTime] = useState<string | Date>(new Date());
    const options = {
        month: "short",
        day: "numeric",
        year: "numeric",
        hour: "numeric",
        minute: "numeric",
        second: "numeric",
        hour12: true,
    };
    const dateTimeString = currentTime.toLocaleString(
        "en-US",
        options as Object
    );

    // get date and set interval every 1 sec
    useEffect(() => {
        const current = new Date();

        const interval = setInterval(() => {
            setCurrentTime(current);
        }, 1000);

        return () => clearInterval(interval);
    }, [currentTime]);

    return (
        <div className={styles.header__container}>
            <p>{dateTimeString}</p>
            {/* <p className={styles.onCall}>On Call</p> */}
        </div>
    );
};

export default Header;
