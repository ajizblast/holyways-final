import Navbar from "../navbar/navbar"
import Card from 'react-bootstrap/Card';
import kids from "../images/kids.png"
import { API } from "../../config/api";
import { useQuery } from "react-query";



export default function RaiseFund() {


    const { data: checkAuth } = useQuery('authChace', async () => {
        const response = await API.get('/check-auth');
        return response?.data.Data
    })
    console.log("check auth : ", checkAuth)
    const { data: fund } = useQuery('fundChace', async () => {
        const response = await API.get('/fund');
        return response?.data.Data
    })

    return (
        <div>
            <Navbar />
            <div className="container mb-3 mt-5 d-md-flex justify-content-between">
                <p className="fs-2 fw-bold ">My Raise Fund</p>
                <a href="/create-fund">
                    <button type="button" class=" bg-color btn-fund text-white fw-bold me-3" >Make Raise Fund</button>
                </a>

            </div>
            <div className="row row-cols-1 row-cols-lg-3 row-cols-md-2 m-auto container" >

                <div>
                <div className="col mb-5">
                    <Card style={{ width: '100%' }} className='position-relative m-auto' >
                        <Card.Img variant="top" src={kids} />
                        <p className="ms-3 mt-3 me-3 fs-5 fw-bold">The Strength of a poeple power of community</p>
                        <p className="ms-3 me-3 text-gray">Numquam temporibus ab sapiente totam est! Modi dignissimos fuga, </p>
                        <div className="d-flex justify-content-between mb-3">
                            <p className="ms-3 fw-bold">Rp 250.000.000</p>
                            <button type="button" class=" bg-color btn-donasi text-white fw-bold me-3" >View Fund</button>

                        </div>


                    </Card>
                </div>
                </div>

                {checkAuth?.Funds?.map((item, index) => (

                    <div>
                        <div className="col mb-5" key={index}>
                        <Card style={{ width: '100%' }} className='position-relative m-auto' >
                            <Card.Img variant="top" src={item?.Image} style={{height:"300px", objectFit:"cover"}}/>
                            <p className="ms-3 mt-3 me-3 fs-5 fw-bold">{item?.Title}</p>
                            <p className="ms-3 me-3 text-gray">{item?.Description} </p>
                            <div className="d-flex justify-content-between mb-3">
                                <p className="ms-3 fw-bold">Rp {item?.GoalsMoney.toLocaleString()}</p>


                                <button type="button" class=" bg-color btn-donasi text-white fw-bold me-3" onClick={() => {
                                    if (localStorage.getItem("user") == null) {
                                        alert("silahkan Login terlebih dahulu !!!")
                                        window.scrollTo(0, 0);
                                    } else {
                                        window.location.href = `/detail-donation/${item?.ID}`
                                    }
                                }}>View Fund</button>


                            </div>


                        </Card>
                    </div>
                    </div>
                ))}

            </div>
        </div>
    )
}