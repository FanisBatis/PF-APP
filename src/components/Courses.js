import React, { useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import { Container, Row, Col } from "react-bootstrap";
import { Link } from "react-router-dom";
import { API } from "../api";
import { Card } from "react-bootstrap";

const Courses = () => {

    const [courses, setCourses] = useState([]);

    useEffect(() => {
        const fetchData = () => {
            fetch(API + "courses")
                .then((response) => {
                    if (response.ok) {
                        return response.json();
                    }
                })
                .then((data) => {
                    setCourses(data);
                });
        };
        fetchData();
    }, []);

    return (
        <div> 
            <Container><h1 style={{textAlign:"center", marginTop:"20px"}}><u>ALL COURSES</u></h1>
                <Row style={{textAlign:"center"}}>
                    {courses.map((cour) => (
                        <Col sm="6" key={cour.id} style={{ marginTop: "20px" }}>
                            <Card>
                                <Card.Img top width="100%" src={cour.imagePath} alt="Card image cap" />
                                <Card.Body>
                                    <Card.Subtitle tag="h6" className="mb-2 color-text">
                                        Title: {cour.title}
                                    </Card.Subtitle>
                                    <Card.Text className="color-text">Price: {cour.price.normal} €</Card.Text>
                                    <Button style={{ background: '#F15B41' }}>
                                        <Link style={{ textDecoration: "none", color: '#fff' }}
                                            to={{ pathname: `/courses/${cour.id}` }}>
                                            View details
                                        </Link>
                                    </Button>
                                </Card.Body>
                            </Card>
                        </Col>
                    ))}
                </Row>
            </Container>
        </div>
    );
};

export default Courses;