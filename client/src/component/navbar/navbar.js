import { Image } from "react-bootstrap";
import { useState, useEffect } from 'react';
import Dropdown from 'react-bootstrap/Dropdown';

import ModalRegister from "../modal/register";
import ModalLogin from "../modal/login";
import Logo from "../images/logo-holyways.png"
import PP from "../images/2563352.jpg"
import { UserContext } from "../context/userContext";
import { useContext } from "react";
import { API } from "../../config/api";
import { useQuery } from "react-query";

export default function Navbar() {
    const [_, dispatch] = useContext(UserContext)
    const { data: user } = useQuery('authChace', async () => {
        const response = await API.get('/check-auth');
        console.log("auth : ", response?.data.Data)
        return response?.data.Data
    })

    const auth = localStorage.getItem("user")
    const [showRegister, setShowRegister] = useState(false);
    const [showLogin, setShowLogin] = useState(false);

    const handleCloseRegister = () => setShowRegister(false);
    const handleShowRegister = () => setShowRegister(true);
    const handleCloseLogin = () => setShowLogin(false);
    const handleShowLogin = () => setShowLogin(true);

    console.log("pp : ", user?.ProfilePicture)



    const logOut = () => {
        localStorage.removeItem("user")
        dispatch({
            type: "LOGOUT",
            payload: {},
        })
        window.location.reload()
    }
    return (
        <div className="bg-color">

            <div className="container-fluid d-flex justify-content-between py-3 ">
                <a href="/">
                    <Image className="ms-sm-5" src={Logo} style={{ objectFit: "contain" }} />
                </a>
                {auth == null ? (

                    <div>
                        <button type="button" class="btn border-none text-white fw-bold me-3" onClick={() => { handleShowLogin() }}>Login</button>
                        <button type="button" class="btn btn-light text-red fw-bold me-sm-5 " onClick={() => { handleShowRegister() }}>Register</button>
                    </div>
                ) : (


                    <Dropdown>
                        <Dropdown.Toggle className="me-sm-5" variant="" style={{ border: "none" }}>
                            {user?.ProfilePicture == "" ? (                              
                                <Image src={PP} className="profile-picture rounded-circle" style={{ objectFit: "cover" }} />
                                ) : (
                                <Image src={user?.ProfilePicture} className="profile-picture rounded-circle" style={{ objectFit: "cover" }} />
                                
                            )}
                        </Dropdown.Toggle>

                        <Dropdown.Menu>
                            <Dropdown.Item href="/profile">Profile</Dropdown.Item>
                            <Dropdown.Item href="/raise-fund">Raise fund</Dropdown.Item>
                            <Dropdown.Item onClick={logOut}>Log Out</Dropdown.Item>
                        </Dropdown.Menu>
                    </Dropdown>
                )}

                <ModalRegister onHide={handleCloseRegister} show={showRegister} showLogin={handleShowLogin} />

                <ModalLogin onHide={handleCloseLogin} show={showLogin} />
            </div>
        </div>
    )
}