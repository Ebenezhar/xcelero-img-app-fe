import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { updateDetails } from '../redux/userSlice';

function EditPage() {
    const { fname } = useParams();
    let navigate = useNavigate()
    let { images = [] } = useSelector(((store) => store.images))
    let index = images.findIndex(image => image.fileName === fname);
    let current = images[index];
    const [ownerName, setOwnerName] = useState(current.ownerDetails.ownerName)
    const [ownerEmail, setOwnerEmail] = useState(current.ownerDetails.ownerEmail)
    const [category, setCategory] = useState(current.ownerDetails.category)
    const [ownerphoneNumber, setOwnerPhoneNumber] = useState(current.ownerDetails.ownerphoneNumber)
    // const [editImage, setImages] = useState([]);
    const dispatch = useDispatch();
    const boxStyle = {
        "box-shadow": "0px 0px 15px -4px rgba(0,0,0,0.75)"
    }
    let cardStyle = {
        height: "100%",
        width: "100%",
        "box-shadow": "0px 0px 15px -4px rgba(0,0,0,0.75)"
    }
    let values = {
        ownerName: ownerName,
        ownerEmail: ownerEmail,
        category: category,
        ownerphoneNumber: ownerphoneNumber,
    }

    let handleClick = () => {
        console.log("val", values);
        console.log("fname", fname);
        let form = new FormData();
        form.append("files", values);
        form.append("fname", fname);
        console.log(form);
        dispatch(updateDetails(form));
        // navigate('/')
    }

    return (
        <div className='container-fluid'>
            <h3 className='m-2'>Upload your details here</h3>
            <div style={boxStyle} className='border m-2 p-2 d-flex flex-wrap'>
                <form
                    className='d-flex flex-wrap justify-content-around'
                >
                    <div className="m-2 form-group">
                        <label htmlFor="name">Full Name</label>
                        <input type="text"
                            onChange={(e) => setOwnerName(e.target.value)}
                            value={ownerName}
                            className="form-control"
                            id="name"
                            placeholder="Enter Full Name"
                        />
                    </div>
                    <div className="m-2 form-group">
                        <label htmlFor="email">Email address</label>
                        <input type="email" className="form-control"
                            value={ownerEmail}
                            onChange={(e) => setOwnerEmail(e.target.value)}
                            id="email" placeholder="Enter email" />
                    </div>
                    <div className="m-2 form-group">
                        <label htmlFor="phoneNumber">Phone Number</label>
                        <input type="text" className="form-control"
                            onChange={(e) => setOwnerPhoneNumber(e.target.value)}
                            value={ownerphoneNumber}
                            id="phoneNumber" placeholder="Enter Phone Number" />
                    </div>
                    <div className="m-2 form-group">
                        <label htmlFor="category">Category</label>
                        <input type="text" className="form-control"
                            value={category}
                            onChange={(e) => setCategory(e.target.value)}
                            id="category" placeholder="Enter Category" />
                    </div>
                </form>
                <div className="mt-2 mx-5 pt-3 form-group">
                    <button className='btn btn-primary' onClick={handleClick}>Submit</button>
                </div>
            </div>
            <div className='container'>
                <img className="card-img-top" style={cardStyle}
                    src={`http://localhost:3001/${current.filePath}`}
                    alt="Card image" />
            </div>
        </div>
    )
}

export default EditPage