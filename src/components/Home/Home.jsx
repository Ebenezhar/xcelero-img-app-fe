import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchAllImages } from '../../redux/userSlice'
import DisplayCard from './DisplayCard';

function Home() {
    const dispatch = useDispatch();
    let { images = [] } = useSelector(((store) => store.images))
    useEffect(() => {
        dispatch(fetchAllImages());
    }, [])


    return (
        <div className='container-fluid'>
            <div className='d-flex flex-wrap'>
                {
                    images.length ? images.map((image) => {
                        return (
                            <DisplayCard data={image} />
                        )
                    }
                    ) : <p>No Images Found</p>
                }

            </div>
        </div>

    )
}

export default Home