import React, { useState, useEffect } from "react";
import { API } from "../api";
import { Form, Container, Col, Button, InputGroup, FormControl } from "react-bootstrap";
import { useSubmit } from "../useSubmit";
import { useHistory } from 'react-router-dom';
import { MDBInput } from "mdbreact";



const AddCourse = () => {
  let history = useHistory();
  const { value: title, bind: bindTitle, reset: resetTitle } = useSubmit("");
  const { value: duration, bind: bindDuration, reset: resetDuration } = useSubmit("");
  const { value: imagePath, bind: bindImagePath, reset: resetImagePath } = useSubmit("");
  const { value: description, bind: bindDescription, reset: resetDescription } = useSubmit("");
  const { value: normalPrice, bind: bindNormalPrice, reset: resetNormalPrice } = useSubmit("");
  const { value: priceEarlyBird, bind: bindEarlyBird, reset: resetEarlyBird } = useSubmit("");
  const { value: startDate, bind: bindStartDate, reset: resetStartDate } = useSubmit("");
  const { value: endDate, bind: bindEndDate, reset: resetEndDate } = useSubmit("");
  const [options, setOptions] = useState([]);
  const handleSubmit = (evt) => {
    evt.preventDefault();
    resetAllInputs();
   
      alert("Course added!")
  };
 
  //------------------------Bookable Checkbox Input-------------
  const [checkBookable] = useState({ open: false });

  //----------------------Instructors Input-------------------------
  const [instructors, setInstructors] = useState([]);
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
          console.log(data);
        })
    };
    fetchInstructors();
  }, []);

  const onCheckedChanged = evt => {
    const value = evt.target.value;
    if (instructors.includes(value)) {
      setInstructors(instructors.filter(instructors => instructors !== value));
    } else {
      setInstructors([...instructors, value]);
    }
  };



  //------------------reset/delete (useInput)
  const resetAllInputs = () => {
    resetTitle();
    resetDuration();
    resetImagePath();
    resetDescription();
    postCourse();
    resetNormalPrice();
    resetEarlyBird();
    resetStartDate();
    resetEndDate();
  }


  //------------------------ Post new Course------------------------
  const postCourse = () => {
    fetch(API + "courses", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        title: title,
        duration: duration,
        imagePath: imagePath,
        description: description,
        price: {
          normal: normalPrice,
          early_bird: priceEarlyBird,
        },
        dates: {
          start_date: startDate,
          end_date: endDate,
        },
        open: checkBookable,
        instructors: instructors,
      }),
    })
      .then((response) => response.json())
      .then(() => {
        history.push('/courses');
      })
  };




  return (
    <Container>
      <Form onSubmit={handleSubmit}>
        <Form.Group >
          <h1 style={{ textAlign: "center", marginTop: "20px" }}><u>ADD COURSE</u></h1>
          {/* ----------------------TITLE---------------------------- */}
          <Form.Group>
            <Col>
              <Form.Label for="title">Title:</Form.Label>
              <Form.Control className="text" {...bindTitle} />
            </Col>
          </Form.Group>
          {/* ----------------------DURATION---------------------------- */}
          <Form.Group>
            <Col>
              <Form.Label for="duration">Duration</Form.Label>
              <InputGroup className="mb-3">
                <InputGroup.Prepend {...bindDuration}>
                  <InputGroup.Text id="basic-addon1">🕒</InputGroup.Text>
                </InputGroup.Prepend>
                <FormControl placeholder=" " aria-label="Username" aria-describedby="basic-addon1" {...bindDuration} />
              </InputGroup>
            </Col>
          </Form.Group>

          {/* ----------------------IMAGE PATH---------------------------- */}
          <Form.Group {...bindImagePath}>
            <Col>
              <Form.Label for="imagepath" />
              <div className="mb-3">
                <Form.File id="formcheck-api-custom" custom>
                  <Form.File.Input />
                  <Form.File.Label data-browse="Search"> Image Path </Form.File.Label>
                </Form.File>
              </div>
            </Col>
          </Form.Group>

          {/* ----------------------BOOCKABLE---------------------------- */}
          <Form.Group controlId="formBasicCheckbox" >
            <Col>
              <Form.Label for="bookable"></Form.Label>
              <Form.Check type="checkbox" label="Bookable" />
            </Col>
          </Form.Group>

          {/* ----------------------INSTRUCTORS---------------------------- */}
          <h3>Instructors</h3>
          <Form.Group>
            <Col>
              <Form.Label for="instructors"></Form.Label>
              {options.map(i => (
                <label style={{ marginRight: '470px' }}>
                  <input type='checkbox' name={i.id} value={i.id} checked={instructors.includes(i.id)}
                    onChange={onCheckedChanged} />{' '} {i.name.first + ' ' + i.name.last}
                </label>
              ))}
            </Col>
          </Form.Group>

          {/* ----------------------DESCRIPTION---------------------------- */}
          <Form.Group>
            <Col>
              <Form.Label for="description">Description:</Form.Label>
              <MDBInput type="textarea" {...bindDescription} background />
            </Col>
          </Form.Group>
          {/* ----------------------DATES---------------------------- */}
          <h3>Dates</h3>
          <Form.Group >
            <Form.Row>
              <Col>
                <Form.Label>Start Date</Form.Label>
                <InputGroup {...bindStartDate}>
                  <InputGroup.Prepend>
                    <InputGroup.Text id="basic-addon1">📅</InputGroup.Text>
                    <Form.Control type="date" name="dob" placeholder="Date of Birth" />
                  </InputGroup.Prepend>
                </InputGroup>
              </Col>

              <Col>
                <Form.Label>End Date</Form.Label>
                <InputGroup {...bindEndDate}>
                  <InputGroup.Prepend>
                    <InputGroup.Text id="basic-addon1">📅</InputGroup.Text>
                    <Form.Control type="date" name="dob" placeholder="Date of Birth" />
                  </InputGroup.Prepend>
                </InputGroup>
              </Col>
            </Form.Row>
          </Form.Group>

          {/* ----------------------PRICES---------------------------- */}
          <h3>Price</h3>
          <Form.Group>
            <Form.Row>
              <Col>
                <Form.Label for="priceNormal">Early Bird:</Form.Label>
                <InputGroup  {...bindEarlyBird}>
                  <InputGroup.Prepend>
                    <InputGroup.Text>€</InputGroup.Text>
                  </InputGroup.Prepend>
                  <FormControl type="number" />
                  <InputGroup.Append>
                    <InputGroup.Text>.00</InputGroup.Text>
                  </InputGroup.Append>
                </InputGroup>
              </Col>

              <Col>
                <Form.Label for="priceNormal">Normal Price:</Form.Label>
                <InputGroup {...bindNormalPrice}>
                  <InputGroup.Prepend>
                    <InputGroup.Text>€</InputGroup.Text>
                  </InputGroup.Prepend>
                  <FormControl type="number" />
                  <InputGroup.Append>
                    <InputGroup.Text>.00</InputGroup.Text>
                  </InputGroup.Append>
                </InputGroup>
              </Col>
            </Form.Row>
          </Form.Group>

          {/* ----------------------SUBMIT BUTTON---------------------------- */}
          <Col >
            <Button onClick={handleSubmit} style={{ background: "brown", border: 'none' }}>
              Add course</Button>
          </Col>
        </Form.Group>
      </Form>
    </Container>
  );
};

export default AddCourse;
