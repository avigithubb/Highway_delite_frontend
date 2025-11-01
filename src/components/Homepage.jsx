import React, { useState, useEffect } from "react";
import Navbar from "./layout/Navbar";
import Card from "../components/Cards";
import { useLocation, Link } from "react-router-dom";
import LoopIcon from '@mui/icons-material/Loop';

const Homepage = () => {
    const [experience, setExperience] = useState({})
    const location = useLocation()

    const searchParams = new URLSearchParams(location.search);
    const searchQuery = searchParams.get("search");
    console.log(searchQuery);


    useEffect(()=>{
        const endpoint = searchQuery?.trim()
        ? `https://highway-delite-backend-3n56.onrender.com/experiences/${searchQuery}`
        : "https://highway-delite-backend-3n56.onrender.com/experiences";
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
                {experience.length > 0 ? 
                experience.map((element, index)=>(
                    <>
                    <Card key={index} img={`data:image/jpeg;base64,${element.img}`} destination={element.destination} location={element.location} price={element.price} />
                    </>
                ))
                :
                <LoopIcon className="loading" />
                }
             
            </div>
            
        </>
    )
}

export default Homepage;