import { useFormik } from 'formik';
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { updateDetails } from '../redux/userSlice';

function EditPage() {
    const { fname } = useParams();
    let navigate = useNavigate();
    let { images = [] } = useSelector(((store) => store.images));
    const dispatch = useDispatch();
    const boxStyle = {
        "box-shadow": "0px 0px 15px -4px rgba(0,0,0,0.75)"
    }
    let cardStyle = {
        height: "100%",
        width: "100%",
        "box-shadow": "0px 0px 15px -4px rgba(0,0,0,0.75)"
    }



    let formik = useFormik({
        initialValues: {
            ownerName: "",
            ownerEmail: "",
            category: "",
            ownerphoneNumber: "",
            fname: "",
        },
        onSubmit: (values) => {
            values.fname = fname;
            dispatch(updateDetails(values));
            navigate('/')
        }
    })

    useEffect(() => {
        let index = images.findIndex(image => image.fileName === fname);
        formik.setValues(images[index].ownerDetails);

    }, [])


    return (
        <div className='container-fluid'>
            <h3 className='m-2'>Upload your details here</h3>
            <div style={boxStyle} className='border m-2 p-2 d-flex flex-wrap'>
                <form onSubmit={formik.handleSubmit}
                    className='d-flex flex-wrap justify-content-around'
                >
                    <div className="m-2 form-group">
                        <label htmlFor="name">Full Name</label>
                        <input type="text"
                            value={formik.values.ownerName}
                            onChange={formik.handleChange}
                            className="form-control"
                            id="ownerName"
                            placeholder="Enter Full Name"
                        />
                    </div>
                    <div className="m-2 form-group">
                        <label htmlFor="email">Email address</label>
                        <input type="ownerEmail" className="form-control"
                            value={formik.values.ownerEmail}
                            onChange={formik.handleChange}
                            id="email" placeholder="Enter email" />
                    </div>
                    <div className="m-2 form-group">
                        <label htmlFor="phoneNumber">Phone Number</label>
                        <input type="text" className="form-control"
                            value={formik.values.ownerphoneNumber}
                            onChange={formik.handleChange}
                            id="ownerphoneNumber" placeholder="Enter Phone Number" />
                    </div>
                    <div className="m-2 form-group">
                        <label htmlFor="category">Category</label>
                        <input type="text" className="form-control"
                            value={formik.values.category}
                            onChange={formik.handleChange}
                            id="category" placeholder="Enter Category" />
                    </div>
                    <div className="mt-2 mx-5 pt-3 form-group">
                        <button type={"submit"} className='btn btn-primary' >Submit</button>
                    </div>
                </form>

            </div>
            {/* <div className='container'>
                <img className="card-img-top" style={cardStyle}
                    src={`http://localhost:3001/${current.filePath}`}
                    alt="Card image" />
            </div> */}
        </div>
    )
}

export default EditPage