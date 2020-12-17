import React, { useEffect, useState } from "react";
import { API } from "../api";
import { Row, Col, } from 'react-bootstrap';
import '../Css Comp/Stats.css';

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

        <Row>
        {stats.map((item) => (
            <Col>
        <div id="container">
	<div id="cc">
	<div class="circle" id="five"></div>
	<div class="circle" id="four"></div>
	<div class="circle" id="three"></div>
	<div class="circle" id="two"></div>
	<div class="circle" id="one">{item.title}: {item.amount}</div>
    <div className="staats">
                        
                    </div>
	</div>
    
</div>
</Col> ))}
</Row>
</div>
    )
}

export default Stats;
