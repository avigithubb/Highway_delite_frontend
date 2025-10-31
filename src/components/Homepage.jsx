import React, { useState, useEffect } from "react";
import Navbar from "./layout/Navbar";
import Card from "../components/Cards";
import Hill from "../assets/hill-transformed.png";
import beach from "../assets/beach.jpg";
import camp from "../assets/camp.jpg";
import forest from "../assets/forest.jpg";
import lake from "../assets/lake.jpg";
import roadway from "../assets/roadway1.png";
import safari from "../assets/safari.jpg";
import skydive from "../assets/skydive.jpg";
import { useLocation } from "react-router-dom";

const Homepage = () => {
    const [experience, setExperience] = useState({})
    const location = useLocation()

    const searchParams = new URLSearchParams(location.search);
    const searchQuery = searchParams.get("search");
    console.log(searchQuery);


    useEffect(()=>{
        const endpoint = searchQuery?.trim()
        ? `http://localhost:3000/experiences/${searchQuery}`
        : "http://localhost:3000/experiences";
        fetch(endpoint)
        .then(res => res.json())
        .then(data =>{
            setExperience(data);
        })
    }, [searchQuery])
    console.log(experience);
    return (
        <>
            <Navbar />
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-10 w-[100vw] m-auto place-items-center px-10 pt-10">
                {experience.length > 0 && 
                experience.map((element, index)=>(
                    <>
                    {console.log(element)}
                    <Card key={index} img={`data:image/jpeg;base64,${element.img}`} destination={element.destination} location={element.location} price={element.price} />
                    </>
                ))}
                
                {/* <Card img={Hill} destination="Kayaking" location="Udupi" price="999" />
                <Card img={beach} destination="Nandi Hills Sunrise" location="Banglore" price="899" />
                <Card img={camp} destination="Coffee Trail" location="Coorg" price="1299" />
                <Card img={forest} destination="Kayaking" location="Udupi, Karnataka" price="999" />
                <Card img={lake} destination="Juhu Falls" location="Banglore" price="899" />
                <Card img={roadway} destination="Road Trip" location="Sundarban" price="999" />
                <Card img={safari} destination="Jungle Safari" location="Manali" price="999" />
                <Card img={skydive} destination="Sky Diving" location="Coorg" price="1299" /> */}
             
            </div>
            
        </>
    )
}

export default Homepage;