import React, { useState, useEffect } from 'react'
//import videos from '../videos'
import { Row, Col } from 'react-bootstrap'
import Video from '../components/Video'
import axios from 'axios'
import { useDispatch, useSelector } from 'react-redux'
import { listVideos } from '../actions/videoActions'
import Loader from '../components/Loader'
import Message from '../components/Message'

function HomeScreen() {
    //const [videos, setVideos] = useState([])
    const dispatch = useDispatch()
    const videoList = useSelector(state => state.videoList)
    const {error, loading, videos} = videoList

    useEffect(() => {
        dispatch(listVideos())
    }, [])

    /*useEffect(() => {
        async function fetchVideos() {
            const {data} = await axios.get('/videos/')
            setVideos(data)
        }
        fetchVideos()
    }, [])*/

    return (
        <div>
            <h1>Latest Videos</h1>
            {loading ? (
                <Loader />
            ) : error ? (
                <Message variant='danger'>{error}</Message>
            ) : (
            <Row>
                {videos.map(video => (
                    <Col key={video._id} sm={12} md={6} lg={4} xl={3}>
                        <Video video={video} />
                    </Col>
                ))}
            </Row>
            )}
        </div>
    )
}

export default HomeScreen