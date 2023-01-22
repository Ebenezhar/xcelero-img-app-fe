import React from 'react'
import { useNavigate } from 'react-router-dom'

function DisplayCard({ data }) {
    let navigate = useNavigate()
    let cardStyle = {
        height: "150px",
        width: "100%",
        "box-shadow": "0px 0px 15px -4px rgba(0,0,0,0.75)"
    }
    let handleClick = (fName) => {
        navigate(`/viewinfo/${fName}`)
    }
    return (
        <div className="card m-2 bg-info" style={{ width: "12rem" }}>
            <img className="card-img-top" style={cardStyle}
                src={`http://localhost:3001/${data.filePath}`}
                alt="Card image " />
            <div className="card-body">
                <button onClick={() => handleClick(data.fileName)} className="btn btn-primary">View Info</button>
            </div>
        </div>
    )
}

export default DisplayCard