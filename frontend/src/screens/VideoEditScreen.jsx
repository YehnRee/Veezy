import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Form, Button, Alert, Spinner } from 'react-bootstrap';
import axios from 'axios';

function VideoEditScreen() {
    const { id } = useParams();
    const navigate = useNavigate();

    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [vid, setVid] = useState('');
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [updating, setUpdating] = useState(false);

    const userInfo = JSON.parse(localStorage.getItem('userInfo')) || {};

    useEffect(() => {
        async function fetchVideo() {
            try {
                setLoading(true);
                const { data } = await axios.get(`/api/videos/${id}/`);
                
                // Ensure only the owner can edit
                if (userInfo.username !== data.user) {
                    navigate('/'); // Redirect if not the owner
                    return;
                }

                setName(data.name);
                setDescription(data.description);
                setVid(data.vid);
            } catch (error) {
                setError('Failed to load video details');
            } finally {
                setLoading(false);
            }
        }
        fetchVideo();
    }, [id, userInfo.username, navigate]);

    const submitHandler = async (e) => {
        e.preventDefault();
        try {
            setUpdating(true);
            await axios.put(
                `/api/videos/${id}/update/`,
                { name, description, vid },
                { headers: { Authorization: `Bearer ${userInfo.token}` } }
            );
            navigate(`/videos/${id}`); // Redirect to the video page after update
        } catch (error) {
            setError('Failed to update video');
        } finally {
            setUpdating(false);
        }
    };

    return (
        <div>
            <h2>Edit Video</h2>
            {loading ? (
                <Spinner animation="border" />
            ) : error ? (
                <Alert variant="danger">{error}</Alert>
            ) : (
                <Form onSubmit={submitHandler}>
                    <Form.Group controlId="name">
                        <Form.Label>Video Title</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Enter video title"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                        />
                    </Form.Group>

                    <Form.Group controlId="description">
                        <Form.Label>Description</Form.Label>
                        <Form.Control
                            as="textarea"
                            rows={3}
                            placeholder="Enter video description"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                        />
                    </Form.Group>

                    <Button type="submit" variant="primary" disabled={updating}>
                        {updating ? 'Updating...' : 'Update Video'}
                    </Button>
                </Form>
            )}
        </div>
    );
}

export default VideoEditScreen;
