import Modal from 'react-bootstrap/Modal';
import { Form } from "react-bootstrap";
import { useState } from 'react';
import { useMutation } from 'react-query';
import { API } from "../../config/api";



export default function ModalUpdate({ show, onHide, id }) {
    const [preview, setPreview] = useState(null)
    const [data, setData] = useState({
        Name: "",
        Email: "",
        Password: "",
        Phone: "",
        Image: ""
    })

    function handleOnChange(e) {
        setData({
            ...data,
            [e.target.name]: e.target.type === "file" ? e.target.files : e.target.value

        });

        if (e.target.type === "file") {
            let url = URL.createObjectURL(e.target.files[0]);
            setPreview(url);
            
            console.log("isandsaxsa  : ",e.target.files[0])
        }
    }
    console.log(data)


    const HandleSubmit = useMutation(async (e) => {

        try {
            e.preventDefault()
            const config = {
                Headers: {
                    'Content-Type': 'multipart/form-data',
                },
            }
            const formData = new FormData();
            formData.set('Image', data.Image[0], data.Image[0].name);
            formData.set('Name', data.Name)
            formData.set('Email', data.Email)
            formData.set('Password', data.Password)
            formData.set('Phone', data.Phone)

            const response = await API.patch(`/users/${id}`,formData, config);
            console.log("Edit Profile success: ", response)
            alert("Edit Profile success")
            onHide()

        } catch (error) {
            //   alert("Failed Edit Profile !!")
            console.log("Edit Profile failed : ", error);
        }

    })
    return (
        <Modal show={show} onHide={onHide}>

            <Modal.Body className='rounded' style={{ backgroundColor: "whitesmoke" }}>
                <Form className="form-auth mt-5" onSubmit={(e) => HandleSubmit.mutate(e)}>
                    <p className='fw-bold fs-2 mb-4'>Edit Profile</p>
                    <Form.Control className="mb-4 fw-semibold input-form" type="text" name='Name' placeholder="Full Name" onChange={handleOnChange} />

                    <Form.Control type="email" className="mb-4 fw-semibold input-form" name='Email' placeholder="Email" onChange={handleOnChange} />

                    <Form.Control type="password" className="mb-4 fw-semibold input-form" name='Password' placeholder="Password" onChange={handleOnChange} />

                    <Form.Control type="number" className="mb-5 fw-semibold input-form" name='Phone' placeholder="Phone" onChange={handleOnChange} />
                    <Form.Label className='fw-bold'>Upload Picture</Form.Label>

                    <Form.Control type="file" className="mb-5 fw-semibold" name='Image' onChange={handleOnChange} />

                    <button type="submit" className="btn fw-semibold fs-5 mb-5" style={{ borderRadius: "7px", width: "100%", height: "50px", color: "white", backgroundColor: "rgb(202, 20, 20)" }}> Update </button>
                </Form>

            </Modal.Body>

        </Modal>
    )
}