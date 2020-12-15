import React, { useState, useEffect } from "react";
import { Container, Form, Button, Col } from "react-bootstrap";
import { API } from "../api";
import { useHistory, useParams } from "react-router-dom";

const EditCourse = () => {
  const courseId = useParams();
  let history = useHistory();
  const [options, setOptions] = useState([]);
  const [title, setTitle] = useState("");
  const [imagePath, setImagePath] = useState("");
  const [duration, setDuration] = useState("");
  const [instructors, setInstructors] = useState([]);
  const [description, setDescription] = useState("");
  const [priceNormal, setPriceNormal] = useState("");
  const [priceEarlyBird, setPriceEarlyBird] = useState("");
  const [dateStart, setDateStart] = useState("");
  const [dateEnd, setDateEnd] = useState("");

  const [checkBookable, setBookable] = useState({
    open: false,
  });

  const handleToggle = ({ target }) =>
    setBookable((s) => ({ ...s, [target.name]: !s[target.name] }));

  useEffect(() => {
    const fetchInstructors = () => {
      fetch(API + "instructors")
        .then((response) => {
          if (response.ok) {
            return response.json();
          }
        })
        .then((data) => {
          setOptions(data);
        });
    };
    fetchInstructors();
    fetchCourseDetails();
  }, []);

  const fetchCourseDetails = () => {
    fetch(API + "courses/" + courseId.id)
      .then((response) => {
        if (response.ok) {
          return response.json();
        }
      })
      .then((data) => {
        setTitle(data.title);
        setDuration(data.duration);
        setImagePath(data.imagePath);
        setDescription(data.description);
        setPriceNormal(data.price.normal);
        setPriceEarlyBird(data.price.early_bird);
        setDateStart(data.dates.start_date);
        setDateEnd(data.dates.end_date);
        setInstructors(data.instructors);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const postCourse = (e) => {
    e.preventDefault();
    fetch(API + "courses/" + courseId.id, {
      method: "PUT",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        id: courseId.id,
        title: title,
        duration: duration,
        imagePath: imagePath,
        description: description,
        price: {
          normal: priceNormal,
          early_bird: priceEarlyBird,
        },
        dates: {
          start_date: dateStart,
          end_date: dateEnd,
        },
        open: checkBookable,
        instructors: instructors,
      }),
    })
      .then((response) => response.json())
      .then((responseJson) => {
        history.push("/courses");
      });
  };

  const onCheckedChanged = (e) => {
    const value = e.target.value;
    if (instructors.includes(value)) {
      setInstructors(
        instructors.filter((instructors) => instructors !== value)
      );
    } else {
      setInstructors([...instructors, value]);
    }
  };



  return (
    <Container>
      <Form onSubmit={(e) => postCourse(e)}>
        <Form.Group>
          <Form.Label for="title">Title:</Form.Label>
          <Form.Control
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </Form.Group>
        <Form.Group>
          <Form.Label for="duration">Duration:</Form.Label>
          <Form.Control
            type="text"
            value={duration}
            onChange={(e) => setDuration(e.target.value)}
          />
        </Form.Group>
        <Form.Group>
          <Form.Label for="imagePath">Image Path:</Form.Label>
          <Form.Control
            type="text"
            value={imagePath}
            onChange={(e) => setImagePath(e.target.value)}
          />
        </Form.Group>
        <Form.Group>
          <Form.Label for="description">Description:</Form.Label>
          <Form.Control
            type="textarea"
            name="text"
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
          <Form.Group>
            <Form.Label for="priceNormal">Start Date:</Form.Label>
            <Form.Control type="text"
              value={dateStart}
              onChange={(e) => setDateStart(e.target.value)} />
          </Form.Group>
          <Form.Group>
            <Form.Label for="endDate">End Date:</Form.Label>
            <Form.Control type="text"
              value={dateEnd}
              onChange={(e) => setDateEnd(e.target.value)}
            />
          </Form.Group>
          <Form.Group>
            <Form.Label for="normalPrice"
            >Normal Price:</Form.Label>
            <Form.Control type="text" value={priceNormal}
              onChange={(e) => setPriceNormal(e.target.value)} />
          </Form.Group>
          <Form.Group>
            <Form.Label for="priceEarlyBird">Price Early Bird:</Form.Label>
            <Form.Control type="text" value={priceEarlyBird}
              onChange={(e) => setPriceEarlyBird(e.target.value)} />
          </Form.Group>
        </Form.Group>
        {Object.keys(checkBookable).map((key) => (
          <Form.Group check>
            <Form.Label check>
              <Form.Check
                type="checkbox"
                onChange={handleToggle}
                key={key}
                name={key}
                checked={checkBookable[key]}
                label="Bookable"
              />
            </Form.Label>
          </Form.Group>
        ))}
        <h4>Instructors</h4>
        {options.map((i) => (
          <Form.Label style={{ marginRight: "15px" }}>
            <Form.Check
              type="checkbox"
              key={i.id}
              name={i.id}
              value={i.id}
              checked={instructors.includes(i.id)}
              onChange={onCheckedChanged}
              label={i.name.first + " " + i.name.last}
            />{" "}
          </Form.Label>
        ))}
        <Col>
          <Button variant="warning" href='/courses' style={{ marginRight: "15px" }}>Cancel</Button>
          <Button type="submit" variant="success">Submit</Button>
        </Col>
      </Form>
    </Container>
  );
};

export default EditCourse;
