
export default function ListDonation(props) {
    const list = props.data
    return (
        <div className="container my-5">
            <p className="fs-2 fw-bold">List Donation ( {props.qty} )</p>
            <div className="container-fluid bg-white px-5 py-3 mb-3">
                <p className="fw-bold fs-5">Nancy Momoland</p>
                <p className="fw-bold">Saturday, <span className="text-gray">25 Agustus 2023</span></p>
                <p className="text-red fw-bold">Total : Rp 300.000</p>

            </div>
            {list?.map((item, index) => (
                
                <div className="container-fluid bg-white px-5 py-3 mb-3" key={index}>
                    <p className="fw-bold fs-5">{item.User.Name}</p>
                    <p className="fw-bold">Saturday, <span className="text-gray">25 Agustus 2023</span></p>
                    <p className="text-red fw-bold"> {item.Money.toLocaleString()}</p>

                </div>
            ))}

        </div>
    )
}