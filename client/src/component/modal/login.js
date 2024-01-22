import Modal from 'react-bootstrap/Modal';
import { Form } from "react-bootstrap";
import { API, setAuthToken } from '../../config/api';
import { UserContext } from "../context/userContext"
import { useMutation } from 'react-query';
import { useState, useContext } from 'react';


export default function ModalLogin({ show, onHide }) {
    
    const [data, setData] = useState({
        email: "",
        password: "",
    });

    const [_, dispatch] = useContext(UserContext)
    function handleOnChange(e) {
        setData({
            ...data,
            [e.target.name]: e.target.value,

        });
    }

    const HandleSubmit = useMutation(async (e) => {

        try {
            e.preventDefault()
            const response = await API.post("/login", data);
            console.log('Login succes : ', response.data.Data)
            dispatch({
                type: "LOGIN_SUCCESS",
                payload: response.data.Data
            })
            setAuthToken(localStorage.token)
            localStorage.setItem("user", response.data.Data.name)

            setData({
                email: "",
                password: "",
            })
            window.location.reload()

            onHide()
        } catch (error) {
            alert("Login Failed ")
            console.log("login failed : ", error)
        }

    })

    return (
        <Modal show={show} onHide={onHide}>

            <Modal.Body className='rounded' style={{ backgroundColor: "whitesmoke" }}>
                <Form className="form-auth mt-5" onSubmit={(e) => HandleSubmit.mutate(e)}>
                    <p className='fw-bold fs-1 mb-4'>Login</p>

                    <Form.Control type="email" className="mb-4 fw-semibold input-form" name='email' placeholder="Email" onChange={handleOnChange} required />

                    <Form.Control type="password" className="mb-5 fw-semibold input-form" name='password' placeholder="Password" onChange={handleOnChange} required />

                    <button type="submit" className="btn fw-semibold fs-5" style={{ borderRadius: "7px", width: "100%", height: "50px", color: "white", backgroundColor: "rgb(202, 20, 20)" }}> Login </button>
                </Form>

                <p className='text-center mt-4' style={{ color: "grey" }}>Don't Have Account ? Click<span className='fw-bold'>  Here </span></p>
            </Modal.Body>

        </Modal>
    )
}