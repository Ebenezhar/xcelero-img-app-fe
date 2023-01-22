import React from 'react'

function InfoComp({ data }) {
    let cardStyle = {
        width: "400px",
        height: "350px"
    }

    let divStyle = {
        width: '100%',
    }
    return (
        <div style={divStyle} className=' m-2 border d-flex row justify-content-center '>
            <h4 className=' bg-primary text-center'>Image Informations</h4>
            <h5>Owner Informations</h5>
            <div className=' p-2 px-5'>
                <div>
                    <h6>Owned by: {data.currentImage.ownerDetails.ownerName}</h6>
                    <h6>For Contact</h6>
                    <div className='d-flex flex-wrap justify-content-start'>
                        <p className='mx-2'><b>Mail Id:</b> {data.currentImage.ownerDetails.ownerEmail}</p>
                        <p className='mx-2'><b>Phone Number:</b> {data.currentImage.ownerDetails.ownerphoneNumber}</p>
                    </div>
                </div>
                <div className='justify-content-center'>
                    <button className='m-2 btn btn-primary'>Edit</button>
                    <button className='m-2 btn btn-danger'>Delete</button>
                </div>
            </div>
            <img class="card-img-top" style={cardStyle}
                src={`http://localhost:3001/${data.currentImage.filePath}`}
                alt="Card image " />
        </div>
    )
}

export default InfoComp