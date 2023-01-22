import { useFormik } from 'formik'
import React, { useState } from 'react'
import { useDispatch } from 'react-redux';
import { postImages } from '../redux/userSlice';

function UploadPage() {
    const [ownerName, setOwnerName] = useState("")
    const [ownerEmail, setOwnerEmail] = useState("")
    const [category, setCategory] = useState("")
    const [ownerphoneNumber, setOwnerPhoneNumber] = useState("")
    const [images, setImages] = useState([]);
    const [preview, setPreview] = useState([]);
    const dispatch = useDispatch();

    const boxStyle = {
        "box-shadow": "0px 0px 15px -4px rgba(0,0,0,0.75)"
    }
    const carStyle = {
        "box-shadow": "0px 0px 15px -4px rgba(0,0,0,0.75)",
        width: "18rem"
    }

    const handleImageChanges = (e) => {
        e.preventDefault();
        if (Array.from(e.target.files).every((file) => file.type === 'image/jpeg' || file.type === 'image/png')) {
            const res = Array.from(e.target.files)

            setImages([...res])
            console.log(images);
            setPreview(res.map((file) => URL.createObjectURL(file)))
            console.log(preview);

        } else {
            alert("Please select valid file format only")
        }
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        let formData = new FormData();
        formData.append('ownerName', ownerName)
        formData.append('ownerEmail', ownerEmail)
        formData.append('category', category)
        formData.append('ownerphoneNumber', ownerphoneNumber)  //formdata objec
        for (let i = 0; i < images.length; i++) {
            formData.append('files', images[i])
        }
        dispatch(postImages(formData))
    }



    return (
        <div className='container-fluid'>
            <h3 className='m-2'>Upload your details here</h3>
            <div style={boxStyle} className='border m-2 p-2 d-flex flex-wrap'>
                <form
                    className='d-flex flex-wrap justify-content-around'
                    onSubmit={handleSubmit}>
                    <div className="m-2 form-group">
                        <label htmlFor="name">Full Name</label>
                        <input type="text"
                            onChange={(e) => setOwnerName(e.target.value)}
                            className="form-control"
                            id="name"
                            placeholder="Enter Full Name"
                        />
                    </div>
                    <div className="m-2 form-group">
                        <label htmlFor="email">Email address</label>
                        <input type="email" className="form-control"
                            onChange={(e) => setOwnerEmail(e.target.value)}
                            id="email" placeholder="Enter email" />
                    </div>
                    <div className="m-2 form-group">
                        <label htmlFor="phoneNumber">Phone Number</label>
                        <input type="text" className="form-control"
                            onChange={(e) => setOwnerPhoneNumber(e.target.value)}
                            id="phoneNumber" placeholder="Enter Phone Number" />
                    </div>
                    <div className="m-2 form-group">
                        <label htmlFor="category">Category</label>
                        <input type="text" className="form-control"
                            onChange={(e) => setCategory(e.target.value)}
                            id="category" placeholder="Enter Category" />
                    </div>
                    <div className="m-2 form-group">
                        <label htmlFor="images">Pictures</label>
                        <input type="file"
                            onChange={(e) => handleImageChanges(e)}
                            className="form-control" id="images" multiple />
                    </div>
                    <div className="mt-2 mx-5 pt-3 form-group">
                        <button type={"submit"} className="btn btn-primary">Submit</button>
                    </div>
                </form>
            </div>

            {/* Picture Preview */}

            <div style={boxStyle} className='border p-2 m-1 row d-flex justify-content-start'>
                <h3 className='m-2'>Preview</h3>
                {
                    preview.length ? preview.map((image) => {
                        return (
                            <div className="card m-2" style={carStyle}>
                                <img className="card-img-top p-2" style={{ height: "200px" }} src={image} alt="Pictures" />

                            </div>
                        )
                    }) : <p className='text-center'>Select files</p>
                }
            </div>
        </div>
    )
}

export default UploadPage