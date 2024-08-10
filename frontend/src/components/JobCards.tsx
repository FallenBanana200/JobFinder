import React, { useEffect, useState } from "react";
import TinderCard from "react-tinder-card";
import "../css/JobCards.css";
import { Iemployee } from "../types/Iemployee";
import { Iemployer } from "../types/Iemployer";

function JobCards() {
  const [userType, setUserType] = useState<string | null>(null);
  const [employees, setEmployees] = useState<Iemployee[]>([]);
  const [employers, setEmployers] = useState<Iemployer[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchUserType = () => {
      const type = localStorage.getItem('userType');
      setUserType(type);
    };

    fetchUserType();

    const fetchEmployees = async () => {
      try {
        const response = await fetch("http://localhost:8080/api/employee");

        if (!response.ok) {
          throw new Error(`Error fetching employees: ${response.statusText}`);
        }

        const data = await response.json();
        const employeeArray = Object.values(data) as Iemployee[];
        setEmployees(employeeArray);
      } catch (error) {
        console.error("Failed to fetch employees:", error);
        setError("Failed to load employees.");
      }
    };

    const fetchEmployers = async () => {
      try {
        const response = await fetch("http://localhost:8080/api/employer");

        if (!response.ok) {
          throw new Error(`Error fetching employers: ${response.statusText}`);
        }

        const data = await response.json();
        const employerArray = Object.values(data) as Iemployer[];
        setEmployers(employerArray);
      } catch (error) {
        console.error("Failed to fetch employers:", error);
        setError("Failed to load employers.");
      }
    };

    if (userType === 'employer') {
      fetchEmployees();
    } else if (userType === 'employee') {
      fetchEmployers();
    }
  }, [userType]);

  return (
    <>
      {error && <div className="error">{error}</div>}
      <div className="jobCards__cardContainer">
        {userType === 'employer' && employees.map((employee) => (
          <TinderCard
            className="swipe"
            key={employee.email}
            preventSwipe={["up", "down"]}
          >
            <div className="card">
              <div className="card-content">
                <h3>{employee.name} {employee.lastName}</h3>
                <div className="card-info">
                  <p><strong>Age:</strong> {employee.age}</p>
                  <p><strong>Bio:</strong> {employee.bio}</p>
                  <p><strong>Competences:</strong> {employee.competences}</p>
                </div>
              </div>
              <div className="card-image">
                <img src={employee.picture} alt={employee.name} />
              </div>
            </div>
          </TinderCard>
        ))}
        {userType === 'employee' && employers.map((employer) => (
          <TinderCard
            className="swipe"
            key={employer.companyMail}
            preventSwipe={["up", "down"]}
          >
            <div className="card">
              <div className="card-content">
                <h3>{employer.companyName}</h3>
                <div className="card-info">
                  <p><strong>Bio:</strong> {employer.bio}</p>
                  <p><strong>Email:</strong> {employer.companyMail}</p>
                  <p><strong>Contact Number:</strong> {employer.contactNumber}</p>
                  <p><strong>Expectations:</strong> {employer.expectations}</p>
                  <p><strong>Location:</strong> {employer.location}</p>
                  <p><strong>Salary:</strong> {employer.salary}</p>
                </div>
              </div>
              <div className="card-image">
                <img src={employer.picture} alt={employer.companyName} />
              </div>
            </div>
          </TinderCard>
        ))}
      </div>
    </>
  );
}

export default JobCards;
