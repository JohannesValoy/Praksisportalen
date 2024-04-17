"use client";
import React, { useEffect, useState } from "react";

export default function Page() {
  const [submissions, setSubmissions] = useState([]);

  useEffect(() => {
    fetch("/api/submissions")
      .then((response) => response.json())
      .then((data) => setSubmissions(data));
  }, []);

  return (
    <div>
      {submissions.map((submission) => (
        <div key={submission.id}>{/* Display the submission data here */}</div>
      ))}
    </div>
  );
}
