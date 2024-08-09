import React, { useEffect, useState } from "react";
import TinderCard from "react-tinder-card";
import "../css/JobCards.css"


function JobCards() {
    const [people, setPeople] = useState([
        {
            name: "steve jobs",
            url: 'https://upload.wikimedia.org/wikipedia/commons/d/dc/Steve_Jobs_Headshot_2010-CROP_%28cropped_2%29.jpg'
        },
        {
            name: "Mark zukerberg",
            url: 'https://cdn.britannica.com/99/236599-050-1199AD2C/Mark-Zuckerberg-2019.jpg'
        }
    ]);

    useEffect(() => {

        //database.collection('people').onSnapshot(snapshot => (
        //  setPeople(snapshot.docs.map(doc => doc.data()))
        //  ))
        //once this works change the useState to empty array

    }, []);

    return (
        <>
            <div className="jobCards__cardContainer">
                {people.map(person => (
                    <TinderCard
                        className="swipe"
                        key={person.name}
                        preventSwipe={['up', 'down']}
                    >
                        <div
                            style={{ backgroundImage: `url(${person.url})` }}
                            className="card"
                        >
                            <h3>{person.name}</h3>
                        </div>
                    </TinderCard>
                ))}
            </div>
        </>
    )
}

export default JobCards;