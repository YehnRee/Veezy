import React from 'react'
import creators from '../creators'
import { Row, Col } from 'react-bootstrap'
import Creator from '../components/Creator'

function HomeScreen() {
    return (
        <div>
            <h1>Latest Videos</h1>
            <Row>
                {creators.map((creator) => (
                    <Col key={creator._id} sm={12} md={6} lg={4} xl={3}>
                        <Creator creator={creator} />
                    </Col>
                ))}
            </Row>
        </div>
    )
}

export default HomeScreen