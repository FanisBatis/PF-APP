import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { API } from "../api";
import { Container, Row, Col, Card, Button, Modal } from "react-bootstrap";


function CourseDetails() {
  const [course, setCourse] = useState([]);
  const [instructor, setInstructor] = useState([]);
  const courseId = useParams();
  const [show, setShow] = useState();
  const handleClose = () => setShow();
  const handleShow = () => setShow(true);

  //---- Delete the selected course function -----//
  const deleteCourse = () => {
    fetch(API + "courses/" + courseId.id, {
      method: "DELETE",
    })
      .then((response) => {
        if (response.ok) {
          return response.json();
        }
      });

  };

  //---- Read selected course and its' information through db.json file (API) ----//
  useEffect(() => {
    const fetchData = () => {
      fetch(API + "courses/" + courseId.id)
        .then((response) => {
          if (response.ok) {
            return response.json();
          }
        })
        .then((data) => {
          var instr = [];
          instr = data.instructors;
          var instructorParams = "?";
          instr.forEach(function (e) {
            instructorParams = instructorParams + "id=" + e.toString() + "&";
          });
          setCourse(data);
          const fetchInstructors = () => {
            fetch(API + "instructors/" + instructorParams)
              .then((response) => {
                if (response.ok) {
                  return response.json();
                }
              })
              .then((data) => {
                setInstructor(data);
              });
          };
          fetchInstructors();
        });
    };
    fetchData();
  }, []);
  return (
    <div style={{ textAlign: "center", marginTop: "20px" }}>
      <Container>
        <Row>
          <Col>
            <img src={course.imagePath} alt={"Icon of course"}/>
          </Col>
        </Row>
        <Row style={{ marginTop: "20px" }}>
          <Col>
            <h1 className="color-text">{course.title}</h1>
            <div dangerouslySetInnerHTML={{ __html: course.description }}></div>
            <div className="color-text">Duration: {course.duration}</div>
            <div className="color-text">
              Dates: {course.dates?.start_date} to {course.dates?.end_date}
            </div>
            <div className="color-text">
              Early bird: {course.price?.early_bird} €
              </div>
            <div className="color-text">Normal: {course.price?.normal} €</div>
          </Col>
        </Row>
        <Row>
          <Col>
            <h2 style={{ marginTop: "30px" }}>Instructor</h2>
          </Col>
        </Row>
        <Row>
          {instructor.map((inst) =>
            <Col>
              <Card body key={inst.id} border="white">
                <Card.Title>{inst.name?.first} {inst.name?.last}</Card.Title>
                <Card.Text>
                  {inst.bio}
                </Card.Text>
                <Card.Text>
                  Email: {inst.email}
                </Card.Text>
                <Card.Text>
                  Birthday: {inst.dob}
                </Card.Text>
                <a href="https://www.linkedin.com/sample" target="_blank" rel="noreferrer">LinkedIn</a>
              </Card>
            </Col>
          )}
        </Row>
        <Row style={{ marginBottom: '30px', marginTop: '30px' }}>
          <Col>
            <Button onClick={handleShow} style={{ background:"brown", width: '80px', marginRight: '5px', border:'none' }}>
              Delete
              </Button>
            <Modal show={show} onHide={handleClose}>
              <Modal.Header closeButton>
                <Modal.Title>Delete <u>{course.title}</u> course?</Modal.Title>
              </Modal.Header>
              <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>Cancel</Button>
                <Button variant="primary" onClick={deleteCourse}><Link to='/courses' style={{ color: "white", textDecoration: "none" }}>OK!</Link></Button>
              </Modal.Footer>
            </Modal>
            <Link to={{ pathname: `/edit-course/${course.id}` }} style={{ color: "#fff" }}>
              <Button style={{ background: "#1a6640", width: '80px', border:'none' }}>Edit</Button>
            </Link>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default CourseDetails;