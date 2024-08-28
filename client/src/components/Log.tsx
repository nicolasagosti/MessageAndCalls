import React, { useEffect, useState } from "react";
import styles from "../stylesheets/main.module.scss";

import { socket } from "../socket.io/socket.io";

const Log: React.FC = () => {
    const [dataLog, setDataLog] = useState<Array<object>>([]);

    useEffect(() => {
        socket.on("log", (data) => {
            setDataLog(data);
        });
    }, [dataLog]);

    return (
        <div className={styles.log__container}>
            <div className={styles.log__box}>
                <h4>Logs</h4>
                <div className={styles.log__div}>
                    {dataLog.length !== 0 ? (
                        dataLog.map((log: any, idx: number) => (
                            <div key={idx} className={styles.log__map}>
                                <p>{log.message}</p>
                                <p>{log.date}</p>
                            </div>
                        ))
                    ) : (
                        <div className={styles.nologs}>
                            <p>No Logs</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Log;
