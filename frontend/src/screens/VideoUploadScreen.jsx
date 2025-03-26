import React, { useState } from 'react';
import { Form, Button, Container, Alert, Spinner } from 'react-bootstrap';
import axios from 'axios';

const VideoUploadScreen = () => {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [image, setImage] = useState(null);
    const [video, setVideo] = useState(null);
    const [uploading, setUploading] = useState(false);
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(false);

    const handleFileChange = (e, setter) => {
        setter(e.target.files[0]);
    };

    const submitHandler = async (e) => {
        e.preventDefault();
        setUploading(true);
        setError(null);
        setSuccess(false);

        const token = localStorage.getItem('token'); // Get auth token from local storage

        if (!token) {
            setError('You must be logged in to upload a video.');
            setUploading(false);
            return;
        }

        const formData = new FormData();
        formData.append('name', title);
        formData.append('description', description);
        if (image) formData.append('image', image);
        if (video) formData.append('vid', video);

        try {
            await axios.post('/videos/upload/', formData, {
                headers: { 
                    'Content-Type': 'multipart/form-data',
                    'Authorization': `Bearer ${token}` // Include auth token
                }
            });
            setSuccess(true);
        } catch (error) {
            setError(error.response?.data?.detail || 'Failed to upload video. Please try again.');
        } finally {
            setUploading(false);
        }
    };

    return (
        <Container className="mt-4">
            <h2>Upload Video</h2>
            {error && <Alert variant="danger">{error}</Alert>}
            {success && <Alert variant="success">Video uploaded successfully!</Alert>}
            <Form onSubmit={submitHandler}>
                <Form.Group controlId="title">
                    <Form.Label>Title</Form.Label>
                    <Form.Control
                        type="text"
                        placeholder="Enter video title"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        required
                    />
                </Form.Group>

                <Form.Group controlId="description" className="mt-3">
                    <Form.Label>Description</Form.Label>
                    <Form.Control
                        as="textarea"
                        rows={3}
                        placeholder="Enter video description"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                    />
                </Form.Group>

                <Form.Group controlId="image" className="mt-3">
                    <Form.Label>Thumbnail (optional)</Form.Label>
                    <Form.Control type="file" accept="image/*" onChange={(e) => handleFileChange(e, setImage)} />
                </Form.Group>

                <Form.Group controlId="video" className="mt-3">
                    <Form.Label>Video File</Form.Label>
                    <Form.Control type="file" accept="video/*" onChange={(e) => handleFileChange(e, setVideo)} required />
                </Form.Group>

                <Button type="submit" className="mt-3" disabled={uploading}>
                    {uploading ? <Spinner animation="border" size="sm" /> : 'Upload'}
                </Button>
            </Form>
        </Container>
    );
};

export default VideoUploadScreen;
