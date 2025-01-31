import React from 'react'
import { Card } from 'react-bootstrap'
import { Link } from 'react-router-dom'

function Video({video}) {
    return (
        <Card className='my-3 p-3 rounded'>
            <Link to={`/videos/${video._id}`}>
                <Card.Img variant="top" src={video.image} style={{ height: '100%', objectFit: 'cover' }} />
            </Link>

            <Card.Body>
                <Link to={`/videos/${video._id}`}>
                    <Card.Title as="div">
                        <strong>{video.name}</strong>
                    </Card.Title>
                </Link>
                
                <Card.Text as="div">
                    {video.description}
                </Card.Text>
            </Card.Body>
        </Card>
    )
}

export default Video