import { Container, Form, Button } from "react-bootstrap";
import React, { useState, useEffect } from "react";
import { API } from "../api";
import { useHistory, useParams, Redirect } from "react-router-dom";

const EditCourse = () => {
  const courseId = useParams();
  let history = useHistory();
  const [options, setOptions] = useState([]);
  const [title, setTitle] = useState("");
  const [imagePath, setImagePath] = useState("");
  const [duration, setDuration] = useState("");
  //const [open, setOpen] = useState(false);
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
        //setBookable(open)
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
          <Form.Label htmlFor="title">Title:</Form.Label>
          <Form.Control
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </Form.Group>
        <Form.Group>
          <Form.Label htmlFor="duration">Duration:</Form.Label>
          <Form.Control
            type="text"
            value={duration}
            onChange={(e) => setDuration(e.target.value)}
          />
        </Form.Group>
        <Form.Group>
          <Form.Label htmlFor="imagePath">Image Path:</Form.Label>
          <Form.Control
            type="text"
            value={imagePath}
            onChange={(e) => setImagePath(e.target.value)}
          />
        </Form.Group>
        <Form.Group>
          <Form.Label htmlFor="description">Description:</Form.Label>
          <Form.Control
            type="textarea"
            name="text"
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
          <Form.Group>
            <Form.Label htmlFor="priceNormal">Start Date:</Form.Label>
            <Form.Control type="text"
              value={dateStart}
              onChange={(e) => setDateStart(e.target.value)} />
          </Form.Group>
          <Form.Group>
            <Form.Label htmlFor="priceNormal">End Date:</Form.Label>
            <Form.Control type="text"
              value={dateEnd}
              onChange={(e) => setDateEnd(e.target.value)}
            />
          </Form.Group>
          <Form.Group>
            <Form.Label htmlFor="priceNormal"
            >Price Normal:</Form.Label>
            <Form.Control type="text" value={priceNormal}
              onChange={(e) => setPriceNormal(e.target.value)} />
          </Form.Group>
          <Form.Group>
            <Form.Label htmlFor="priceEarlyBird">Price Early Bird:</Form.Label>
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
        <div>
          <Button variant="warning" href='/courses' style={{ marginRight: "15px" }}>Cancel</Button>
          <Button type="submit" variant="success">Submit</Button>
        </div>
      </Form>
    </Container>
  );
};

export default EditCourse;
