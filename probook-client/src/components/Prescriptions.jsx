import React from 'react'
import { useDispatch, useSelector } from "react-redux";

const Prescriptions = () => {

    const { profile, status } = useSelector((state) => state.auth);


    // console.log(profile)
  return (
    <>
    {(profile.userId.loginAs) === 'doctor' && 
    <div>Hello Certificates</div>}
    {(profile.userId.loginAs) === 'patient' && 
    <div>Hello Prescritpions</div>}

</>)
}

export default Prescriptions