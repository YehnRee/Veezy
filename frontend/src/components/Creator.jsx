import React from 'react'
import { Card } from 'react-bootstrap'

function Creator({creator}) {
    return (
        <Card className='my-3 p-3 rounded'>
            <a href={`/creator/${creator._id}`}>
                <Card.Img variant="top" src={creator.image} style={{ height: '100%', objectFit: 'cover' }} />
            </a>

            <Card.Body>
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