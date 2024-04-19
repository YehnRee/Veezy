import React from 'react'
import { Card } from 'react-bootstrap'

function Creator({creator}) {
    return (
        <Card className='my-3 p-3 rounded' style={{ height: '400px' }}>
            <a href={`/creator/${creator._id}`}>
                <Card.Img variant="top" src={creator.image} style={{ height: '100%', objectFit: 'cover' }} />
            </a>

            <Card.Body className="d-flex flex-column" style={{ overflow: 'hidden' }}>
                <a href={`/creator/${creator._id}`}>
                    <Card.Title as="div">
                        <strong>{creator.name}</strong>
                    </Card.Title>
                </a>
                
                <Card.Text as="div">
                    {creator.description}
                </Card.Text>
            </Card.Body>
        </Card>
    )
}

export default Creator