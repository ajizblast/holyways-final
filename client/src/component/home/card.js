import kids from "../images/kids.png"
import Card from 'react-bootstrap/Card';
import { useQuery } from 'react-query';
import { API } from "../../config/api";
import ProgressBar from 'react-bootstrap/ProgressBar';

const PersentaseCount = (item) => {
    console.log("item : ", item)
    let arrDonation = item.Donation
    let collectDonation = 0
    arrDonation.forEach(item => collectDonation += item?.Money);
    let persen = Math.floor(collectDonation / item?.GoalsMoney * 100)
    console.log("persen : ", persen)
    return persen
}

export default function CardDonation() {
    const { data: fund } = useQuery('fundChace', async () => {
        const response = await API.get('/fund');
        return response?.data.Data
    })
    console.log(fund)

    return (
        <div className="bg-body1 mb-0 pt-3">
            <p className="fs-1 fw-bold text-red text-center" >Donation Now</p>

            <div className=" row row-cols-1 row-cols-lg-3 row-cols-md-2 m-auto container">

                <div>
                <div className="col mt-5 mb-5">
                    <Card style={{ width: '100%' }} className='position-relative m-auto' >
                        <Card.Img variant="top" src={kids} />
                        <p className="ms-3 mt-3 me-3 fs-5 fw-bold">The Strength of a poeple power of community</p>
                        <p className="ms-3 text-gray">Numquam temporibus ab sapiente totam </p>
                        <div className="m-auto" style={{ width: "90%" }}>

                            <ProgressBar variant="danger" className="mb-3" now={80} style={{ backgroundColor: "silver" }} />
                        </div>
                        <div className="d-flex justify-content-between mb-3">
                            <p className="ms-3 fw-bold">Rp 250.000.000</p>
                            <button type="button" class=" bg-color btn-donasi text-white fw-bold me-3" >Donate</button>

                        </div>


                    </Card>
                </div>
                </div>
                {fund?.map((item, index) => (

                    <div>
                        <div className="col mt-5 mb-5" key={index}>
                            <Card style={{ width: '100%', }} className='position-relative m-auto' >
                                <Card.Img variant="top" src={item?.Image} style={{ height: "300px", objectFit: "cover" }} />
                                <p className="ms-3 mt-3 me-3 fs-5 fw-bold">{item?.Title}</p>
                                <p className="ms-3 text-gray">{item?.Description} </p>
                                <div className="m-auto" style={{ width: "90%" }}>

                                    <ProgressBar variant="danger" className="mb-3" now={PersentaseCount(item)} style={{ backgroundColor: "silver" }} />
                                </div>
                                <div className="d-flex justify-content-between mb-3">
                                    <p className="ms-3 fw-bold">Rp {item?.GoalsMoney.toLocaleString()}</p>


                                    <button type="button" class=" bg-color btn-donasi text-white fw-bold me-3" onClick={() => {
                                        if (localStorage.getItem("user") == null) {
                                            alert("silahkan Login terlebih dahulu !!!")
                                            window.scrollTo(0, 0);
                                        } else {
                                            window.location.href = `/detail-donation/${item?.ID}`
                                        }
                                    }}>Donate</button>


                                </div>


                            </Card>
                        </div>
                    </div>
                ))}

            </div>
        </div >
    )
}