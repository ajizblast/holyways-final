import { Image } from "react-bootstrap"
import Navbar from "../navbar/navbar"
import ListDonation from "./list-donation";
import ProgressBar from 'react-bootstrap/ProgressBar';
import 'bootstrap/dist/css/bootstrap.min.css';
import { API } from "../../config/api";
import { Form } from "react-bootstrap";
import { useMutation, useQuery } from "react-query";
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import Modal from 'react-bootstrap/Modal';




export default function DetailDonate() {
    const [deleteModal, setDeleteModal] = useState(false);
    const [ModalDonation, setModalDonation] = useState(false)

    const donationClose = () => setModalDonation(false)
    const donationShow = () => setModalDonation(true)

    const handleClose = () => setDeleteModal(false);
    const handleShow = () => setDeleteModal(true);

    let [donation, setDonation] = useState(0)
    const { id } = useParams()
    const { data: fund, refetch } = useQuery('fundChace', async () => {
        const response = await API.get(`/fund/${id}`);
        console.log(' response : ', response?.data.Data)
        return response?.data.Data
    })
    const Day = new Date(fund?.GoalsDay)
    const Now = Date.now()

    let arrDonation = fund?.Donation
    let donatur = arrDonation?.length

    let collectDonation = 0;
    arrDonation?.forEach(item => collectDonation += item?.Money);

    let persentase = Math.floor(collectDonation / fund?.GoalsMoney * 100)

    useEffect(() => {
        setDonation(collectDonation)
    }, [collectDonation])
    console.log("user : ", localStorage.getItem("user"))

    // console.log("persentase : ", persentase)
    const [data, setData] = useState({
        money: ""
    })


    function handleOnChange(e) {
        setData({
            ...data,
            [e.target.name]: e.target.value
        })
        console.log(e.target)
    }
    const createDonation = useMutation(async (e) => {
        if (collectDonation >= fund?.GoalsMoney) {
            return alert("Donasi telah tercapai !!")
        } else if (parseInt(data.money) >= fund?.GoalsMoney) {
            console.log("data.money : ", data.money)
            console.log("colect : ", collectDonation)
            return alert("Nominal yang anda masukan terlalu banyak !!")
        } else if ((parseInt(data.money) + collectDonation) >= fund?.GoalsMoney) {
            console.log("jumlah : ", data.money + collectDonation)
            console.log("data.money : ", data.money)
            console.log("colect : ", collectDonation)
            return alert("Nominal yang anda masukan terlalu banyakkkkk !!")
        } else {

            try {
                e.preventDefault()
                const config = {
                    Headers: {
                        'Content-Type': 'application/json'
                    },
                }
                let donation = {
                    Status: "waitting Payment",
                    Money: parseInt(data.money),
                    FundID: parseInt(id)
                }
                const response = await API.post("/donation", donation, config);
                console.log("xxxxx : ", response)
                donationClose()
                refetch()

                const token = response.data.Data.token;
                window.snap.pay(token, {
                    onSuccess: function (result) {
                        /* You may add your own implementation here */
                        console.log(result);
                    },
                    onPending: function (result) {
                        /* You may add your own implementation here */
                        console.log(result);
                    },
                    onError: function (result) {
                        /* You may add your own implementation here */
                        console.log(result);
                    },
                    onClose: function () {
                        /* You may add your own implementation here */
                        alert("you closed the popup without finishing the payment");
                    },
                });
                // payment midtrans

            } catch (error) {
                console.log("failed xxx : ", error)
            }
        }

    })

    useEffect(() => {
        //change this to the script source you want to load, for example this is snap.js sandbox env
        const midtransScriptUrl = "https://app.sandbox.midtrans.com/snap/snap.js";
        //change this according to your client-key
        const myMidtransClientKey = process.env.REACT_APP_MIDTRANS_CLIENT_KEY;

        let scriptTag = document.createElement("script");
        scriptTag.src = midtransScriptUrl;
        // optional if you want to set script attribute
        // for example snap.js have data-client-key attribute
        scriptTag.setAttribute("data-client-key", myMidtransClientKey);

        document.body.appendChild(scriptTag);
        return () => {
            document.body.removeChild(scriptTag);
        };
    }, []);

    const deleteButton = useMutation(async (id) => {
        try {
            await API.delete(`/fund/${id}`);
            window.location.href = "/"
        } catch (error) {
            console.log(error)
        }
    })

    const getDuration = (timeStart, timeEnd) => {
        const miliSecond = 1000
        const distance = new Date(timeEnd) - new Date(timeStart);

        // const monthDistance = Math.floor(distance / (30 * 24 * 60 * 60 * miliSecond))
        // if(monthDistance > 0 ) {
        //   return  monthDistance  + " More Month"
        // } else {
        // }
        const dayDistance = Math.floor(distance / (24 * 60 * 60 * miliSecond))
        if (dayDistance != 0) {
            return dayDistance
        } else {
            const hourDistance = Math.floor(distance / (60 * 60 * miliSecond))
            if (hourDistance >= 1) {
                return hourDistance + " More Hours"
            } else {
                const minuteDistance = Math.floor(distance / (60 * miliSecond))
                if (minuteDistance != 0) {
                    return "Durasi : " + minuteDistance + " More Minutes"
                }
            }
        }


    };
    console.log(getDuration(Now, Day))
    return (
        <div>
            <Navbar />
            <div className="container d-md-flex gap-5 justify-content-md-between">
                <Image className="mt-5 image-detail" src={fund?.Image} />
                <div className=" mt-md-5 header-progres-bar" >

                    <p className="ms-3 pt-3 me-3 fs-2 fw-bold">{fund?.Title}</p>
                    <div className="dekstop">
                        <div className=" d-flex">
                            <div className=" d-flex justify-content-between mt-4 container-fluid">

                                <p className="fs-5 fw-bold text-red">Rp {collectDonation.toLocaleString()}   </p>
                                <p style={{ fontSize: "18px", color: "gray", fontWeight: "bold" }}>  gathered form </p>
                                <p style={{ color: "gray", }} className="fs-5 fw-bold">  Rp {fund?.GoalsMoney.toLocaleString()}</p>
                            </div>
                        </div>
                    </div>
                    <div className="mobile">
                        <div className="d-flex">
                            <div className=" d-flex justify-content-between mt-4 container-fluid">

                                <p className="fs-5 fw-bold text-red">Rp {collectDonation.toLocaleString()}   </p>
                                <p style={{ fontSize: "18px", color: "gray", fontWeight: "bold" }}>  - </p>
                                <p style={{ color: "gray", }} className="fs-5 fw-bold">  Rp {fund?.GoalsMoney.toLocaleString()}</p>
                            </div>
                        </div>
                    </div>
                    <ProgressBar variant="danger" className="mb-3" now={persentase} />
                    <div className="d-flex justify-content-between mb-3">
                        <p className="fw-bold fs-5">{donatur} <span style={{ color: "gray", fontSize: "17px" }}>Donation</span></p>
                        {getDuration(Now, Day) < 0 ? (
                            <p className="fw-bold fs-5"> <span style={{ color: "gray", fontSize: "17px" }}>Expired</span></p>
                        ) : (
                            <p className="fw-bold fs-5"> {getDuration(Now, Day)} <span style={{ color: "gray", fontSize: "17px" }}>More Day</span></p>
                        )}

                    </div>
                    <p className="ms-3 text-gray fw-semibold">{fund?.description} </p>
                    <div className=" mb-3">
                        <button type="button" class=" bg-color text-white fw-bold mt-5" style={{ width: "100%", border: "none", borderRadius: "7px", height: "40px", }} onClick={donationShow} >Donate</button>


                        {/* <button type="button" class=" bg-color text-white fw-bold mt-5" style={{ width: "100%", border: "none", borderRadius: "7px", height: "40px", }} onClick={createDonation.mutate} >Donate</button> */}

                        {localStorage.getItem("user") == fund?.User.Name ? (

                            <div className="d-flex justify-content-between">

                                <button type="button" class=" bg-warning text-white fw-bold mt-2" style={{ width: "45%", border: "none", borderRadius: "7px", height: "40px", }} onClick={() => { window.location.href = `/edit-fund/${id}` }}>Update</button>
                                <button type="button" class=" bg-secondary text-white fw-bold mt-2" style={{ width: "45%", border: "none", borderRadius: "7px", height: "40px", }} onClick={handleShow}>Delete</button>
                            </div>
                        ) : (
                            <div></div>
                        )}


                    </div>
                </div>
            </div>

            <Modal show={deleteModal} onHide={handleClose} centered>

                <Modal.Body className='rounded' style={{ backgroundColor: "whitesmoke" }}>

                    <p className='text-center fs-5 fw-bold my-5'>Are You Sure To Delete this Item ??</p>

                    <div className="d-flex justify-content-between">

                        <button type="submit" className="btn fw-semibold fs-5" style={{ borderRadius: "7px", width: "45%", height: "50px", color: "white", backgroundColor: "rgb(202, 20, 20)" }} onClick={handleClose}> Cancel </button>
                        <button type="submit" className="btn fw-semibold fs-5 bg-secondary" style={{ borderRadius: "7px", width: "45%", height: "50px", color: "white", }} onClick={() => { deleteButton.mutate(id) }}> Delete </button>
                    </div>

                </Modal.Body>

            </Modal>
            <Modal show={ModalDonation} onHide={donationClose} centered>

                <Modal.Body className='rounded' style={{ backgroundColor: "whitesmoke" }}>

                    <Form className="form-auth mt-5" onSubmit={(e) => createDonation.mutate(e)}>
                        <p className='fw-bold fs-1 mb-4'> </p>

                        <Form.Control type="number" className="mb-4 fw-semibold input-form" name='money' placeholder="Nominal Donation" onChange={handleOnChange} />

                        <div className="d-flex justify-content-center">
                            <button type="submit" className="btn fw-semibold fs-5 mt-4 mb-2" style={{ borderRadius: "7px", width: "60%", height: "45px", color: "white", backgroundColor: "rgb(202, 20, 20)" }} > Donation </button>
                        </div>
                    </Form>

                </Modal.Body>

            </Modal>

            <ListDonation qty={donatur} data={fund?.Donation} />



        </div>
    )
}