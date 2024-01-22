import Navbar from "../navbar/navbar"
import { Image } from "react-bootstrap"
import nancy from "../images/nancy.jpg"
import { useState } from "react";
import { API } from "../../config/api";
import { useQuery } from "react-query";
import ModalUpdate from "./updateProfile";

export default function Profile() {
    const { data: user } = useQuery('authChace', async () => {
        const response = await API.get('/check-auth');
        return response?.data.Data
    })

    const profile = () => {
        if (user?.ProfilePicture == "") {
            return nancy
        } else {
            return user?.ProfilePicture
        }

    }


    const [updateForm, setUpdateForm] = useState(false);
    const closeModalUpdate = () => setUpdateForm(false)
    const showModalUpdate = () => setUpdateForm(true)

    console.log(user)
    return (
        <div className="">
            <Navbar />
            <div className="container mt-5 d-md-flex justify-content-between">

                <div className="">
                    <p className="fs-2 fw-bold text-center text-md-start">My Profile</p>
                    <div className="d-md-flex">

                        <div className="text-center text-md-start">
                        <div className="d-flex justify-content-center justify-content-md-start">
                        <Image className="img-profile d-block" src={profile()} style={{width:"220px", objectFit:"cover"}} />
                        </div>
                        <button type="button" className="btn fw-semibold btn-warning fs-5 mt-3" style={{ borderRadius: "7px", width: "220px", height: "43px", color: "white" }} onClick={() => showModalUpdate()}> Update </button>

                        </div>
                        <div className="ms-md-5 ms-2">
                            <p className="fs-5 text-red fw-bold mb-0 mt-4">Full Name</p>
                            <p className="fs-6 fw-semibold mt-0 mb-3">{user?.Name}</p>
                            <p className="fs-5 text-red fw-bold mb-0">Email</p>
                            <p className="fs-6 fw-semibold mt-0 mb-3">{user?.Email}</p>
                            <p className="fs-5 text-red fw-bold mb-0">Phone</p>
                            <p className="fs-6 fw-semibold mt-0 mb-3">{user?.Phone}</p>
                        </div>
                    </div>
                </div>
                <div>
                    <p className="fs-2 fw-bold ">History Donation</p>

                    <div className="bg-white p-3 mb-3">
                        <p className="fw-bold fs-5 mb-2">The strength of a poeple. Power of Community</p>
                        <p className="fw-bold">Saturday, <span style={{ color: "gray" }}>25 Agustus 2023</span></p>
                        <div className="d-flex justify-content-between ">
                            <p className="text-red fw-bold">Total : Rp 500.000</p>
                            <p className="finish-status fw-bold text-center rounded ">Finished</p>
                        </div>
                    </div>
                    {user?.Donation.map((item, index) => (

                        <div className="bg-white p-3 mb-3">
                            <p className="fw-bold fs-5 mb-2">{item?.Fund.Title}</p>
                            <p className="fw-bold">Saturday, <span style={{ color: "gray" }}>25 Agustus 2023</span></p>
                            <div className="d-flex justify-content-between ">
                                <p className="text-red fw-bold">Total : Rp {item?.Money.toLocaleString()}</p>
                                <p className="finish-status fw-bold text-center rounded ">{item?.Status}</p>
                            </div>

                        </div>
                    ))}
                </div>
            </div>
            <ModalUpdate show={updateForm} onHide={closeModalUpdate} id={user?.ID}/>

        </div>
    )
}