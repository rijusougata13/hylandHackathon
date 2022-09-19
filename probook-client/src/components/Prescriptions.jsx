import React,{useState,useEffect} from 'react'
import { useDispatch, useSelector } from "react-redux";
import { getProfile } from "../redux/authSlice";

const Prescriptions = () => {
  const { _id } = JSON.parse(localStorage.getItem("login"));
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getProfile(_id));
  }, [dispatch, _id]);
  const { profile } = useSelector((state) => state.auth);
  const [loginAs,setLoginAs] = useState(profile?.userId?.loginAs)

  return (
    <>
    {loginAs === 'doctor' ? (<h1>Upload Certificates</h1>):(<h1>Upload Prescriptions</h1>)}
    </>
  )
}

export default Prescriptions
