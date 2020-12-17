import React, { useEffect, useState } from "react";
import { API } from "../api";
import { Row, Col } from 'react-bootstrap';


const Stats = () => {

    const [stats, setStats] = useState([]);

    useEffect(() => {
        const fetchData = () => {
            fetch(API + "stats")
                .then((response) => {
                    if (response.ok) {
                        return response.json();
                    }
                })
                .then((data) => {
                    setStats(data);
                });
        };
        fetchData();
    }, []);
    return (
        <div>
            <Row style={{ width:"100%" }}>
                {stats.map((item) => (
                    <Col style={{ textAlign: "center" }}>
                        <h5 style={{ textTransform: "uppercase" }}>{item.title}: <u style={{ color: "red" }}>{item.amount}</u></h5>
                    </Col>
                ))}
            </Row>
        </div>
    )
}

export default Stats;