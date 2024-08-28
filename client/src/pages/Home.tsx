import React, { useEffect, useState } from "react";
import styles from "../stylesheets/main.module.scss";

import { socket } from "../socket.io/socket.io";

import Header from "../components/Header";
import Form from "../components/Form";
import Log from "../components/Log";

const Home: React.FC = () => {
    const [clientId, setClientId] = useState<string>("");

    useEffect(() => {
        socket.on("socketId", (socketId) => {
            setClientId(socketId);
        });
    }, []);

    return (
        <div className={styles.home__container}>
            <Header />
            <div className={styles.home__hero}>
                <h1>Peer SMS</h1>
                <p>Send free text messages to your friends.</p>
            </div>
            <Form limit={20} clientId={clientId} />
            <Log />
        </div>
    );
};

export default Home;
