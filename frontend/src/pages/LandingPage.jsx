import React from 'react'
import '../App.css'
import './LandingPage.css'
import { Link, useNavigate } from "react-router-dom";

function LandingPage() {
    const router = useNavigate();

  return (
    <div className='LandingPage-Container'>
        <nav>
            <div className="navHeader"><h1>Linkup</h1></div>
            <div className="navList">
                <p role='button' onClick={ ()=>{
                    router('/gustadsf');
                }}>Join as gust</p>
                <p role='button' onClick={()=>{
                    router('/auth');
                }}>Register</p>
                <div role='button' onClick={()=>{
                    router('/auth');
                }}><p>Login</p></div>
                <p></p>
            </div>
        </nav>

        <div className="landingMainContainer">
            <div className='landingMainHeader'>
                <h1><span style={{color:"orange"}}>Connect</span> with our Loved one</h1>
                <h2>Cover a distance by Linkup</h2>

                <div role='button'>
                    {localStorage.getItem('token') ? <Link to={"/home"}>Join Now</Link> : <Link to={"/auth"}>Join Now</Link>}
                    {/* <Link to={"/auth"}>Get Started</Link> */}
                </div>
            </div>
        </div>
    </div>
  )
}

export default LandingPage