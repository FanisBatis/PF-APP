import React, { useEffect, useState } from "react";
import { Container, Row, Col,Card, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import { API } from "../api";

const Courses = (props) => {

    const [courses, setCourses] = useState([]);

    useEffect(() => {
        const fetchData = () => {
            fetch(API + "courses")
                .then((response) => {
                    if (response.ok) {
                        return response.json();
                    } 
                    }
                })
                .then((data) => {
                    console.log(data);
                    setCourses(data);
                })
               };
        fetchData();
    }, []);

    return (
        <div>
            <Container>
                <Row>
                    {courses.map((cour) => (
                        <Col sm="4" key={cour.id} style={{ marginTop: "20px" }}>
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
                                            Learn more{" "}
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
