import React, { useState, useEffect } from 'react';
import logo from '../../assets/HDlogo_1.png';
import { useNavigate } from "react-router-dom";

const Navbar = () => {
    const navigateTo = useNavigate();
    const [isSubmit, setSubmit] = useState(false);
    const [searchKey, setSearchKey] = useState({
        keyword: "",
    })

    console.log(searchKey.keyword);
    
    useEffect(()=>{
        if(isSubmit && searchKey?.keyword){
            navigateTo(`/?search=${searchKey.keyword}`)
        }
    }, [isSubmit, searchKey.keyword])

    function handleSubmit(e) {
        e.preventDefault();
        setSubmit(true)
    }

    function handleChange(e){
        const key = e.target.value;
        setSearchKey({keyword: key});
    }

    return (
        <>
            <nav className='flex ml-0 w-[100vw] h-30 shadow-md items-center'>
                <div className='flex w-[80vw] m-auto p-5 justify-between'>
                <img src={logo} alt="nav-logo" />
                <form onSubmit={handleSubmit} className='flex gap-4'>
                    <input onChange={handleChange} type="search" placeholder='Search experiences' className='bg-gray-100 w-50 h-10 rounded px-3 text-black' value={searchKey.keyword} required />
                    <input type="submit" className='bg-yellow-400 rounded text-black px-3 h-10' value="Submit" />
                </form>
                 </div>
            </nav>
        </>
    )
}

export default Navbar;