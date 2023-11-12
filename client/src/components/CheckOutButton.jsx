import React from "react";
import useFetch from "../hooks/useFetch";

const CheckOutButton=()=>{
  const {isLoading,error,performFetch}=useFetch("/booking/checkout",(response)=>{
    console.log(response)
  })
  const handleClick=()=>{
    performFetch({
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        firstname:"Hasan",
        lastname:"Karadirek",
        email:"hasankaradirek3@gmail.com",
        phone:"3252352352",
        returnUrl:"http://localhost:8080/checkout-confirmation"
      }),
    })
  }

  return <button onClick={handleClick}>checkout</button>
}

export default CheckOutButton