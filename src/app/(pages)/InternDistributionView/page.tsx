/** @format */
"use client";
import { useEffect, useState } from "react";
function DistributeInterns() {
  const [interns, setInterns] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/internshipAgreements")
      .then((res) => res.json())
      .then((data) => {
        setInterns(data);
        setLoading(false); // set loading to false after data is fetched
      });
  }, []);
  console.log(interns);
  if (loading) {
    return <p>Loading...</p>;
  }
  return (
    <div>
      <h1>Interns</h1>
      <ul>
        {Object.keys(interns).map((key) => (
          <li key={key}>
            {Object.entries(interns[key]).map(([property, value]) => (
              <p key={property}>
                {property}: {String(value)}
              </p>
            ))}
          </li>
        ))}
      </ul>
    </div>
  );
}
export default DistributeInterns;
