import React, { useEffect, useState } from "react";
import { Table, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import { API } from "../api";
import {CheckCircleFillIcon} from '@primer/octicons-react';


const DashboardCourses = (props) => {
  const [courses, setCourses] = useState([]);
//--------import courses to dashboard table from db.json----------------
  useEffect(() => {
    const fetchData = () => {
      fetch(API + "courses")
        .then((response) => {
          if (response.ok) {
            return response.json();
          } 
        })
        .then((data) => {
          console.log(data);
          setCourses(data);
          //setIsLoading(false);
        })
            };

    fetchData();
  }, []);

  return (
    <Table hover style={{ marginTop: "50px" }}>
      <thead>
        <tr>
          <th></th>
          <th>Title</th>
          <th>Bookable</th>
          <th>Price</th>
          <th>Date</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {courses.map((cour) => (
          <tr key={cour.id}>
            <th scope="row"></th>
            <td>{cour.title}</td>
            <td style={{textAlign: 'center'}}><CheckCircleFillIcon size={16} className="table-icon-check"/> </td>
            
            <td>{cour.price?.normal} €</td>
            <td>
              {cour.dates?.start_date} - {cour.dates?.end_date}
            </td>
            <td>
            <Button style={{ background: '#F15B41' }}>
             <Link style={{ textDecoration: "none", color: '#fff' }} to={{ pathname: `/courses/${cour.id}` }}> Learn more{" "}
               </Link>
                </Button>
            </td>
          </tr>
        ))}
      </tbody>
    </Table>
  );
};

export default DashboardCourses;
