import { Image } from "react-bootstrap";
import Palestine from "../images/palestine1.jpg"
import palestine2 from "../images/palestine2.jpg"
import CardDonation from "./card";


export default function Content() {

    const handleBtn = () => {
        if (localStorage.getItem("user") == null) {
            alert("silahkan Login dahulu !!!")
            window.scrollTo(0, 0);
        } else {
            window.location.reload()
        }
    }
    return (
        <div>

           <div className="dekstop">
           <div className="bg-home relative-container mb-5">
            <div className="container-title ">
                <p className="fs-1  fw-semibold text-white pt-3">You Don't Need To Muslim To Stand Up For Palestine You Just Need To Be Human.</p>
                <p className="text-white fs-5 mt-3">You need to enable JavaScript to run this app. Lorem, ipsum dolor sit amet consectetur adipisicing elit. Numquam temporibus ab sapiente totam est! Modi dignissimos fuga, obcaecati quibusdam rerum, reprehenderit explicabo, amet aliquam quae libero cupiditate incidunt odio ullam.</p>
                <button type="button" className="btn fw-semibold fs-5 btn-light text-red mt-3" style={{ borderRadius: "7px", width: "200px", height: "45px" }} onClick={handleBtn}> Donate </button>
               
            </div>
            <Image src={Palestine} className="foto position-absolute-1"/>
            <Image src={palestine2} className="foto position-absolute-3"/>

            <div className=" position-absolute-2">
            <p className="fs-1  fw-bold text-black pt-3">Your Donation is Very Heplful for Poeple effected by War in Palestine.</p>
            <div className="d-flex ">
                <p className="fs-5 me-3">You need to enable JavaScript to run this app. Lorem, ipsum dolor sit amet consectetur adipisicing elit. Numquam temporibus ab sapiente totam est! Modi dignissimos fuga, obcaecati quibusdam rerum, reprehenderit explicabo, amet aliquam quae libero cupiditate incidunt odio ullam</p>
                <p className="fs-5">sapiente totam est! Modi dignissimos fuga, obcaecati quibusdam rerum, reprehenderit explicabo, amet aliquam quae libero cupiditate incidunt odio ullam</p>
            </div>

            </div>
            
        </div>
           </div>

            <div className="mobile">
            <div className="bg-home-mobile  mb-5 pb-5">
                <div className="container-title text-center">
                    <p className="fs-1  fw-semibold text-white pt-3">You Don't Need To Muslim To Stand Up For Palestine You Just Need To Be Human.</p>
                    <p className="text-white fs-5 mt-3">You need to enable JavaScript to run this app. Lorem, ipsum dolor sit amet consectetur adipisicing elit. Numquam temporibus ab sapiente totam est! Modi dignissimos fuga, obcaecati quibusdam rerum, reprehenderit explicabo, amet aliquam quae libero cupiditate incidunt odio ullam.</p>
                    <button type="button" className="btn fw-semibold fs-5 btn-light text-red mt-3" style={{ borderRadius: "7px", width: "200px", height: "45px" }} onClick={handleBtn}> Donate </button>

                </div>
            </div>

            <div className="">
                <div className="d-flex justify-content-center">
                    <Image src={Palestine} className="foto" />
                </div>

                <div className="m-auto text-center" style={{width:"90%"}}>
                    <p className="fs-1  fw-bold pt-3">Your Donation is Very Heplful for Poeple effected by War in Palestine.</p>
                    <div className="d-md-flex" >
                        <p className="fs-5 me-3">You need to enable JavaScript to run this app. Lorem, ipsum dolor sit amet consectetur adipisicing elit. Numquam temporibus ab sapiente totam est! Modi dignissimos fuga, obcaecati quibusdam rerum, reprehenderit explicabo, amet aliquam quae libero cupiditate incidunt odio ullam</p>
                        <p className="fs-5">sapiente totam est! Modi dignissimos fuga, obcaecati quibusdam rerum, reprehenderit explicabo, amet aliquam quae libero cupiditate incidunt odio ullam</p>
                    </div>
                    <div className="d-flex justify-content-center">
                    <Image src={palestine2} className="foto" />
                    </div>

                </div>
            </div>
            </div>
            <div style={{ paddingTop: "100px" }} >

                <CardDonation />
            </div>
        </div>
    )
}