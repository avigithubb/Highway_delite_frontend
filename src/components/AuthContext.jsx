// AuthContext.js
import { createContext, useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
//   const [token, setToken] = useState(() => localStorage.getItem("token"));
//   const [message, setMessage] = useState();
  const navigateTo = useNavigate();
  const [bookingData, setBookingData] = useState(() => {
    const savedData = localStorage.getItem("bookingData");
    return savedData
      ? JSON.parse(savedData)
      : {
          img: "",
          time: "",
          date: "",
          month: "",
          price: "",
          destination: "",
          quantity: "",
          bookingStatus: ""
        };
  });

    useEffect(() => {
        localStorage.setItem("bookingData", JSON.stringify(bookingData));
    }, [bookingData]);

  return (
    <AuthContext.Provider value={{bookingData, setBookingData}}>
      {children}
    </AuthContext.Provider>
  );
};

// custom hook
export const useAuth = () => useContext(AuthContext);


