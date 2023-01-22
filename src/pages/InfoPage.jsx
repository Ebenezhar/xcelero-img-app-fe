import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import InfoComp from '../components/InfoComp/InfoComp';

function InfoPage() {
    const { fname } = useParams();
    let [currentImage, setCurrentImage] = useState();
    let { images = [] } = useSelector(((store) => store.images))

    let fetchData = (fname) => {
        let index = images.findIndex(image => image.fileName === fname);
        let current = images[index];
        setCurrentImage(current)
        console.log(current);
    }
    useEffect(() => {
        fetchData(fname)
    }, [])

    let cardStyle = {
        width: "400px",
        height: "350px"
    }

    let divStyle = {
        width: '100%',
        // height: "100vh"
    }
    return (
        <div className='container-fluid d-flex justify-content-center'>
            {currentImage ? <InfoComp data={currentImage} /> : null}
        </div>
    )
}

export default InfoPage