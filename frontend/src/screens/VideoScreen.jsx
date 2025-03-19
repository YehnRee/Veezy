import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { Row, Col, ListGroup } from 'react-bootstrap';
import axios from 'axios';
import ReactPlayer from 'react-player';
import moment from 'moment'; // Import moment.js for date formatting

function VideoScreen() {
    const { id } = useParams();
    const [video, setVideo] = useState({});

    useEffect(() => {
        async function fetchVideo() {
            const { data } = await axios.get(`/videos/${id}/`);
            setVideo(data);
        }
        fetchVideo();
    }, [id]);

    return (
        <div>
            <Row>
                <Col md={8}>
                    <ReactPlayer
                        url={video.vid}
                        width="100%"
                        height="auto"
                        controls
                    />
                </Col>

                <Col md={4}>
                    <ListGroup variant="flush">
                        <ListGroup.Item>
                            <h3>{video.name}</h3>
                            <span>
                                {' by '}
                                {video.user} 
                                {video.createdAt && ` • ${moment(video.createdAt).format('YYYY-MM-DD')}`}
                            </span>
                        </ListGroup.Item>
                        <ListGroup.Item>{video.description}</ListGroup.Item>
                    </ListGroup>
                </Col>
            </Row>
            
            <br />
            <Link to="/">Go Back</Link>
        </div>
    );
}

export default VideoScreen;
