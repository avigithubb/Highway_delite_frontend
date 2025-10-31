import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Homepage from './components/Homepage';
import Details from './components/Details';
import Checkout from './components/Checkout';
import Result from './components/Result';
import Listing from "./components/Listing_data";
import { BrowserRouter, Route, Routes } from 'react-router-dom';


function App() {
  // const [count, setCount] = useState(0)

  return (
    <>
     
        <Routes>
          <Route path='/' element={<Homepage />} />
          <Route path='/details' element={<Details />} />
          <Route path='/checkout' element={<Checkout />} />
          <Route path='/result' element={<Result />} />
          <Route path="/listing" element={<Listing />} />
        </Routes>
      
    </>
  )
}

export default App
