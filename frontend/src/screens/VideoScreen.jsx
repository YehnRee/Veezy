import React, { useState, useEffect } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import { Row, Col, ListGroup, Button, Alert, Spinner } from 'react-bootstrap';
import axios from 'axios';
import ReactPlayer from 'react-player';
import moment from 'moment';

function VideoScreen() {
    const { id } = useParams();
    const navigate = useNavigate();  // ✅ Needed for redirection after delete
    const [video, setVideo] = useState({});
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [deleting, setDeleting] = useState(false);

    const userInfo = JSON.parse(localStorage.getItem('userInfo')) || {}; // ✅ Get logged-in user

    useEffect(() => {
        async function fetchVideo() {
            try {
                setLoading(true);
                const { data } = await axios.get(`/api/videos/${id}/`);
                setVideo(data);
            } catch (error) {
                setError('Failed to load video');
            } finally {
                setLoading(false);
            }
        }
        fetchVideo();
    }, [id]);

    const deleteVideoHandler = async () => {
        if (window.confirm('Are you sure you want to delete this video?')) {
            try {
                setDeleting(true);
                await axios.delete(`/api/videos/${id}/delete/`, {
                    headers: { Authorization: `Bearer ${userInfo.token}` },
                });
                navigate('/'); // ✅ Redirect after deletion
            } catch (error) {
                setError('Failed to delete video');
            } finally {
                setDeleting(false);
            }
        }
    };

    return (
        <div>
            {loading ? (
                <Spinner animation="border" />
            ) : error ? (
                <Alert variant="danger">{error}</Alert>
            ) : (
                <>
                    <Row>
                        <Col md={8}>
                            <ReactPlayer url={video.vid} width="100%" height="auto" controls />
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

                                {/* ✅ Show Edit & Delete buttons if user owns the video */}
                                {userInfo.username === video.user && (
                                    <ListGroup.Item>
                                        <Link to={`/videos/edit/${id}`}>
                                            <Button variant="primary" className="me-2">Edit</Button>
                                        </Link>
                                        <Button variant="danger" onClick={deleteVideoHandler} disabled={deleting}>
                                            {deleting ? 'Deleting...' : 'Delete'}
                                        </Button>
                                    </ListGroup.Item>
                                )}
                            </ListGroup>
                        </Col>
                    </Row>

                    <br />
                    <Link to="/">Go Back</Link>
                </>
            )}
        </div>
    );
}

export default VideoScreen;
