import React, { useEffect, useState } from "react";
import { Table, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import { API } from "../api";
import { CheckCircleFillIcon } from '@primer/octicons-react';
import './Css Comp/Dashboard.css';

//--------import courses to dashboard table from db.json----------------
const DashboardCourses = () => {
  const [courses, setCourses] = useState([]);
  useEffect(() => {
    const fetchData = () => {
      fetch(API + "courses/?_limit=5")
        .then((response) => {
          if (response.ok) {
            return response.json();
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
    <Table hover style={{ marginTop: "50px" }}>
      <thead>
        <tr style={{ backgroundColor: 'lightgrey', border: '1px' }}><th></th><th><i>First 5 courses</i></th><th></th><th></th><th></th><th></th></tr>
        <tr>
          <th></th>
          <th>Title</th>
          <th style={{ textAlign: 'center' }}>Bookable</th>
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
            <td style={{ textAlign: 'center', color: "maroon" }}><CheckCircleFillIcon size={16} className="table-icon-check" /> </td>

            <td>{cour.price?.normal} €</td>
            <td>
              {cour.dates?.start_date} - {cour.dates?.end_date}
            </td>
            <td>
              <Button style={{ background: '#baa1a2', border: '10px' }}>
                <Link style={{ textDecoration: "none", color: 'darkred', transform: 'translateY(4px)' }} to={{ pathname: `/courses/${cour.id}` }}> Learn more{" "}
                </Link>
              </Button>
            </td>
          </tr>
        ))
        }
      </tbody>
    </Table>
  );
};

export default DashboardCourses;
