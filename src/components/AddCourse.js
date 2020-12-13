import React, { useState, useEffect } from "react";
import { API } from "../api";
import { Form , Container,Col , Button, InputGroup,FormControl } from "react-bootstrap";
import { useInput } from "./hooks/useInput";
import { useHistory } from 'react-router-dom';
import { MDBInput } from "mdbreact";


const AddCourse = () => {
  let history = useHistory();

  //createObjects--------------------------------------------------------------
  const { value: title, bind: bindTitle } = useInput("");
  const { value: duration, bind: bindDuration } = useInput("");
  const { value: imagePath, bind: bindImagePath } = useInput("");
  const { value: description, bind: bindDescription } = useInput("");
  const { value: normalPrice, bind: bindNormalPrice } = useInput("");
  const { value: priceEarlyBird, bind: bindEarlyBird } = useInput("");
  const { value: startDate, bind: bindStartDate } = useInput("");
  const { value: endDate, bind: bindEndDate } = useInput("");
  const [checkBookable, setBookable] = useState({open: false});
  const [options, setOptions] = useState([]);
  const [instructors, setInstructors] = useState([]);

  const handleSubmit = (e) => {
    e.preventDefault(); 
  };
  
  //AddCourseOnPage-------------------------------------------------------
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
        open: checkBookable,
        instructors: instructors,
        description: description,
        dates: {
          start_date: startDate,
          end_date: endDate,
        },
        price: {
            normal_price: normalPrice,
            early_bird: priceEarlyBird,
          },
      }),
    })
      .then((response) => response.json())
      .then((responseJson) => {
        history.push('/');
      })
      
  };


  const handleToggle = ({ target }) =>
    setBookable((s) => ({ ...s, [target.name]: !s[target.name] }));




  
//side effects--------------------------
  useEffect(() => {
    const fetchInstructors = () => {
      fetch(API + "instructors")
        .then((response) => { if (response.ok) {
            return response.json();  } 
        })
        .then((data) => {
          setOptions(data);
        })        
    };
    fetchInstructors();
  }, []);


  
//instructorsValue-----------------------------
  const onCheckedChanged = e => {
    const value = e.target.value;
    if (instructors.includes(value)) {
      setInstructors(instructors.filter(instructors => instructors !== value));
    } else {
      setInstructors([...instructors, value]);
    }
   };

  return (
      
<Container>
    <Form onSubmit={handleSubmit}> 
        <Form.Group >
                            <h2>Add Course</h2>
{/* ----------------------TITLE---------------------------- */}
    <Form.Group>
        <Col>  
            <Form.Label for="title" >Title:</Form.Label>
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
                <FormControl placeholder=" "aria-label="Username"aria-describedby="basic-addon1" {...bindDuration} />
            </InputGroup>
        </Col>
    </Form.Group>
        
{/* ----------------------IMAGE PATH---------------------------- */}
    <Form.Group {...bindImagePath}>
        <Col>
        <Form.Label for="imagepath"/>
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
            <Form.Label for="boockable"></Form.Label>
            <Form.Check type="checkbox" label="Boockable" />
        </Col>
    </Form.Group>

{/* ----------------------INSTRUCTORS---------------------------- */}
          <h3>Instructors</h3>
    <Form.Group>
        <Col>
             <Form.Label for="instructors"></Form.Label>
                {options.map(i => (
                    <label style={{marginRight: '470px'}}>
                    <input type='checkbox' name={i.id} value={i.id} checked={instructors.includes(i.id)}
                        onChange={onCheckedChanged}/>{' '} {i.name.first + ' ' + i.name.last}
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
            <InputGroup {...bindEarlyBird}>
                <InputGroup.Prepend>
                     <InputGroup.Text>$</InputGroup.Text>
                </InputGroup.Prepend>
                <FormControl aria-label="Amount (to the nearest dollar)" />
                <InputGroup.Append>
                     <InputGroup.Text>.00</InputGroup.Text>
                </InputGroup.Append>
            </InputGroup>
        </Col>
    
        <Col>
            <Form.Label for="priceNormal">Normal Price:</Form.Label>
            <InputGroup {...bindNormalPrice}>
                <InputGroup.Prepend>
                     <InputGroup.Text>$</InputGroup.Text>
                </InputGroup.Prepend>
                <FormControl aria-label="Amount (to the nearest dollar)" />
                <InputGroup.Append>
                     <InputGroup.Text>.00</InputGroup.Text>
                </InputGroup.Append>
            </InputGroup>
        </Col>
        </Form.Row>
    </Form.Group>

{/* ----------------------SUBMIT BUTTON---------------------------- */}    
    <Col >
        <Button variant="primary" type="submit">Add Course </Button>
    </Col>

    </Form.Group>
    </Form>
</Container>
  );
};

export default AddCourse;