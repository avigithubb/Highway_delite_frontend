import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Listing = () => {
    const navigateTo = useNavigate();
    const [isSubmit, setSubmit] = useState(false);
    const [data, setData] = useState({
        destination: "",
        location: "",
        price: "",
        img: null,
    });

    function handleChange(e){
        const {name, value} = e.target;

        setData(prevValue=>({
            ...prevValue,
            [name]: value
        }))
    }

    function handleSubmit(e){
        e.preventDefault();
        setSubmit(true);
    }

    function handleImageChange(e) {
        const file = e.target.files[0];
        const reader = new FileReader();

        reader.onloadend = () => {
            setData((prev) => ({ 
                ...prev, img: reader.result 
            }));
        };

        if (file) {
        reader.readAsDataURL(file);
        }
    };

    useEffect(()=>{
        if(isSubmit){
            console.log(data.destination, data.location, data.price)
            fetch("http://localhost:3000/upload-experience", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    img: data.img,
                    destination: data.destination,
                    location: data.location,
                    price: data.price
                })
            })
            .then(res => res.json())
            .then(data=> {
                console.log(data.message);
                navigateTo("/listing");
            })
        }
    },[isSubmit])
    return(
        <>
        <form action="" onSubmit={handleSubmit} className='bg-gray-200 flex flex-col text-black m-auto justify-center content-center text-md/6 p-5 rounded'>
            <input className='m-auto w-[80%]' onChange={handleImageChange} type="file" accept='image/*' name="image" required />
            <input className='bg-white border-black text-black rouded mt-3 w-[80%] m-auto p-1' onChange={handleChange} type="text" name="destination" placeholder="destination" value={data.destination} required/>
            <input className='bg-white border-black text-black rouded mt-3 w-[80%] m-auto p-1' onChange={handleChange} type="text" name="location" placeholder='location' value={data.location} required/>
            <input className='bg-white border-black text-black rouded mt-3 w-[80%] m-auto p-1' onChange={handleChange} type="number" name="price" placeholder='price' value={data.price} required/>
            <input type="submit" value="Add" className='p-3 bg-yellow-400 text-black w-[40%] m-auto my-3 rounded'/>
        </form>
        </>
    )
}

export default Listing;