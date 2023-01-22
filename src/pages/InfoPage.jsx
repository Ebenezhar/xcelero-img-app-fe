import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import InfoComp from '../components/InfoComp/InfoComp';
import { deleteImage } from '../redux/userSlice';

function InfoPage() {
    const navigate = useNavigate()
    const { fname } = useParams();
    let [currentImage, setCurrentImage] = useState();
    const dispatch = useDispatch()
    let { images = [] } = useSelector(((store) => store.images))

    let fetchData = (fname) => {
        let index = images.findIndex(image => image.fileName === fname);
        let current = images[index];
        setCurrentImage(current)
    }
    useEffect(() => {
        fetchData(fname);
    }, [])

    let handleDelete = (fileName) => {
        dispatch(deleteImage(fileName))
        setTimeout(() => {
            navigate('/')
        }, 1000);
    }
    let handleEdit = (fileName) => {
        navigate(`/editinfo/${fileName}`)
    }

    return (
        <div className='container-fluid d-flex justify-content-center'>
            {currentImage ? <InfoComp data={currentImage} handleDelete={handleDelete} handleEdit={handleEdit} /> : null}
        </div>
    )
}

export default InfoPage