import React, { useState, useEffect } from 'react'
//import videos from '../videos'
import { Row, Col } from 'react-bootstrap'
import Video from '../components/Video'
import axios from 'axios'

function HomeScreen() {
    const [videos, setVideos] = useState([])

    useEffect(() => {
        async function fetchVideos() {
            const {data} = await axios.get('http://127.0.0.1:8000/videos/')
            setVideos(data)
        }
        fetchVideos()
    }, [])

    return (
        <div>
            <h1>Latest Videos</h1>
            <Row>
                {videos.map(video => (
                    <Col key={video._id} sm={12} md={6} lg={4} xl={3}>
                        <Video video={video} />
                    </Col>
                ))}
            </Row>
        </div>
    )
}

export default HomeScreen