import React, { useEffect, useState } from "react";
import TinderCard from "react-tinder-card";
import "../css/JobCards.css";
import { Iemployee } from "../types/Iemployee";
import { Iemployer } from "../types/Iemployer";
import SwipeButtons from "./SwipeButtons";

function JobCards() {
  const [userType, setUserType] = useState<string | null>(null);
  const [employees, setEmployees] = useState<Iemployee[]>([]);
  const [employers, setEmployers] = useState<Iemployer[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [currentIndex, setCurrentIndex] = useState<number>(0);

  useEffect(() => {
    const fetchUserType = () => {
      const type = localStorage.getItem('userType');
      setUserType(type);
    };

    fetchUserType();

    const fetchEmployees = async () => {
      try {
        const response = await fetch("https://jobfinder-latest.onrender.com/api/employee");
        if (!response.ok) {
          throw new Error(`Error fetching employees: ${response.statusText}`);
        }
        const data = await response.json();
        setEmployees(Object.values(data) as Iemployee[]);
      } catch (error) {
        console.error("Failed to fetch employees:", error);
        setError("Failed to load employees.");
      }
    };

    const fetchEmployers = async () => {
      try {
        const response = await fetch("https://jobfinder-latest.onrender.com/api/employer");
        if (!response.ok) {
          throw new Error(`Error fetching employers: ${response.statusText}`);
        }
        const data = await response.json();
        setEmployers(Object.values(data) as Iemployer[]);
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

  const handleSwipeLeft = () => {
    setCurrentIndex(prevIndex => prevIndex + 1);
  };

  const handleSwipeRight = async () => {
    const userId = localStorage.getItem('userId');
    if (!userId) {
      console.error('User ID not found in localStorage');
      return;
    }

    const currentCard = userType === 'employer' ? employees[currentIndex] : employers[currentIndex];
    if (!currentCard) return;

    const identifier = userType === 'employer' ? currentCard.email : currentCard.companyMail;

    const url = userType === 'employee'
      ? `https://jobfinder-latest.onrender.com/api/employee/${userId}/likes`
      : `https://jobfinder-latest.onrender.com/api/employer/${userId}/likes`;

    const body = userType === 'employer'
      ? JSON.stringify({ email: identifier })
      : JSON.stringify({ companyMail: identifier });

    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body,
      });

      if (!response.ok) {
        throw new Error(`Error posting like: ${response.statusText}`);
      }

      console.log('Successfully liked the card!');
    } catch (error) {
      console.error('Failed to like the card:', error);
    }

    setCurrentIndex(prevIndex => prevIndex + 1);
  };

  return (
    <>
      {error && <div className="error">{error}</div>}
      <div className="jobCards__cardContainer">
        {userType === 'employer' && employees.length > 0 && (
          employees.slice(currentIndex, currentIndex + 1).map((employee) => (
            <TinderCard
              className="swipe"
              key={employee.email}
              preventSwipe={["up", "down"]}
            >
              <div className="card">
                <div className="card-content">
                  <h3>{employee.name} {employee.lastName}</h3>
                  <div className="card-info">
                    <p><strong>Email:</strong> {employee.email}</p>
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
          ))
        )}

        {userType === 'employee' && employers.length > 0 && (
          employers.slice(currentIndex, currentIndex + 1).map((employer) => (
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
          ))
        )}
        <SwipeButtons
          onSwipeLeft={handleSwipeLeft}
          onSwipeRight={handleSwipeRight}
        />
      </div>
    </>
  );
}

export default JobCards;
