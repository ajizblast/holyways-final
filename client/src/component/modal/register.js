import Modal from 'react-bootstrap/Modal';
import { Form } from "react-bootstrap";
import { useState } from 'react';
import { useMutation } from 'react-query';
import { API } from "../../config/api";



export default function ModalRegister({ show, onHide , showLogin}) {
    const [data, setData] = useState({
        nama: "",
        email: "",
        password: "",
        phone: ""
    })

    function handleOnChange(e) {
        setData({
            ...data,
            [e.target.name]: e.target.value,

        });
    }

    const HandleSubmit = useMutation(async(e) => {

        try {
          e.preventDefault()
    
          const response = await API.post("/register", data);
          console.log("register success: ", response)
          alert("register success")
          setData({
            nama : "",
            email: "",
            password: "",
            phone: "",
          })
          onHide()
          showLogin()
          
        } catch (error) {
          alert("Failed Register !!")
          console.log("registerfailed : ", error);
        }
    
      })
    return (
        <Modal show={show} onHide={onHide}>

            <Modal.Body className='rounded' style={{ backgroundColor: "whitesmoke" }}>
                <Form className="form-auth mt-5" onSubmit={(e)=> HandleSubmit.mutate(e)}>
                    <p className='fw-bold fs-1 mb-4'>Register</p>
                    <Form.Control className="mb-4 fw-semibold input-form" type="text" name='name' placeholder="Full Name" onChange={handleOnChange} required />

                    <Form.Control type="email" className="mb-4 fw-semibold input-form" name='email' placeholder="Email" onChange={handleOnChange} required />

                    <Form.Control type="password" className="mb-4 fw-semibold input-form" name='password' placeholder="Password" onChange={handleOnChange} required />

                    <Form.Control type="number" className="mb-5 fw-semibold input-form" name='phone' placeholder="Phone" onChange={handleOnChange} required/>

                    <button type="submit" className="btn fw-semibold fs-5" style={{ borderRadius: "7px", width: "100%", height: "50px", color: "white", backgroundColor: "rgb(202, 20, 20)" }}> Register </button>
                </Form>

                <p className='text-center mt-3' style={{ color: "grey" }}>Already Have an account ? Click<span className='fw-bold'>  Here </span></p>
            </Modal.Body>

        </Modal>
    )
}