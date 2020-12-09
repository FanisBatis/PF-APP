import React, { useEffect, useState } from "react";
import { API } from "../api";
import { Row, Col,} from 'react-bootstrap';


const Stats = () => {

    const [stats, setStats] = useState([]);

    const fetchData = () => {
        fetch(API + "stats")
            .then((response) => {
                if (response.ok) {
                    return response.json();
                } else {
                    throw new Error("Something went wrong ...");
                }
            })
            .then((data) => {
                setStats(data);
                console.log(data);
            })
            .catch((error) => {
                console.log(error);
            });
    };
    useEffect(() => {
        fetchData();
    }, []);
    return (
        <div>
            <Row>
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