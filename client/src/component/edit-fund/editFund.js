import Navbar from "../navbar/navbar"
import { Form } from "react-bootstrap";
import { API } from "../../config/api";
import { useMutation, useQuery } from "react-query";
import { useState } from "react";
import { useNavigate } from "react-router";
import { useParams } from "react-router-dom";

export default function EditFund() {
    const {id} = useParams()
    console.log(id)

    const [data, setData] = useState({
        Title: "",
        GoalsMoney: "",
        Description: "",
        GoalsDay: "",
        Image: ""
    })


    const { data: fund } = useQuery('fundChace', async () => {
        const response = await API.get(`/fund/${id}`);
        return response?.data.Data
    })
    // const forValue = String(fund?.GoalsMoney)
    const forValue = String(fund?.GoalsMoney)
    console.log("string " ,forValue)

    const [preview, setPreview] = useState(null)  //for images
    const navigate = useNavigate()


    function handleOnChange(e) {
        setData({
            ...data,
            [e.target.name]:
                e.target.type === "file" ? e.target.files : e.target.value
        })
        // console.log(e.target.value)
        if (e.target.type === "file") {
            let url = URL.createObjectURL(e.target.files[0]);
            setPreview(url);
        }
    }

    const handleInput = useMutation(async (e) => {
        try {
            e.preventDefault()
            const config = {
                Headers: {
                    'Content-Type': 'multipart/form-data',
                },
            }
            const formData = new FormData();
            formData.set('Image', data.Image[0], data.Image[0].name);
            formData.set('Title', data.Title);
            formData.set('GoalsMoney', data.GoalsMoney);
            formData.set('GoalsDay', data.GoalsDay);
            formData.set('Description', data.Description);

            const response = await API.patch(`/fund/${id}`, formData, config)

            console.log("add Fund succes : ", response)
            navigate("/raise-fund")
            console.log(formData)
        } catch (error) {
            alert("Add fund failed ")
            console.log("add fund failed : ", error)
        }
    })
    return (
        <div>
            <Navbar/>
            <div className="container mt-5">

            <p className="fs-2 fw-bold ">Edit Raise Fund</p>
            <Form className=" mt-5" onSubmit={(e) => handleInput.mutate(e)}>
                        <Form.Control className="mb-4 fw-semibold input-form" type="text" name='Title' placeholder={fund?.Title} style={{backgroundColor:"rgb(223, 220, 220)"}} onChange={handleOnChange} />

                        {/* <button type="file" className=" fw-semibold  bg-color mb-3" style={{ borderRadius: "7px",border:"none", width: "200px" , height:"40px" , color:"white"}}> Attachment thumbnail </button> */}
                        
                        
                        <Form.Control type="file" className=" fw-semibold" name='Image' onChange={handleOnChange} required/>

                        <Form.Control type="number" className="mb-4 mt-4 fw-semibold input-form" name='GoalsMoney'  style={{backgroundColor:"rgb(223, 220, 220)"}} onChange={handleOnChange} placeholder={forValue} />

                        <Form.Control type="date" className="mb-4 fw-semibold input-form" name='GoalsDay' placeholder="Day Target" style={{backgroundColor:"rgb(223, 220, 220)"}} onChange={handleOnChange} />

                        <textarea className="form-control mb-4 fw-semibold textarea1" name="Description" id="exampleFormControlTextarea1" rows="3" style={{backgroundColor:"rgb(223, 220, 220)"}} onChange={handleOnChange} placeholder={fund?.Description} ></textarea>

                        <div className="d-flex justify-content-end">

                        <button type="submit" className=" fw-semibold fs-5 bg-color mt-5" style={{ borderRadius: "7px",border:"none", width: "250px" , height:"45px" , color:"white" ,}}> Public Fundraising </button>
                        </div>
                    </Form>
            </div>
        </div>
    )
}