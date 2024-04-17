/** @format */

import React, { useEffect, useState } from "react";

const InternshipAgreement = () => {
  const [data, setData] = useState([]);
  const [id, setId] = useState("1"); // [id] is a dynamic route parameter
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  //Sets the id to the dynamic route parameter
  useEffect(() => {
    setId(window.location.pathname.split("/").pop());
  }, []);
  console.log(id);

  useEffect(() => {
    fetch(`/api/internshipAgreements/${id}`)
      .then((res) => res.json())
      .then((data) => {
        setData(data);
        setLoading(false);
      })
      .catch((error) => {
        setError(error);
        setLoading(false);
      });
  }, [id]);

  return <div>Individual Internship Agreement</div>;
};

export default InternshipAgreement;
