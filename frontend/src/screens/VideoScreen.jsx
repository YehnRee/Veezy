import React, { useState, useEffect } from 'react'
import { Link, useParams } from 'react-router-dom'
import { Row, Col, Image, ListGroup, Button, Card, ListGroupItem } from 'react-bootstrap'
//import videos from '../videos'
import axios from 'axios'

function VideoScreen() {
    const { id } = useParams()

    const [video, setVideo] = useState([])

    useEffect(() => {
        async function fetchVideo() {
            const {data} = await axios.get(`/videos/${id}/`)
            setVideo(data)
        }
        fetchVideo()
    }, [])

  return (
    <div>
      <Row>
        <Col md={6}>
          <Image src={video.image} alt={video.name} fluid></Image>
        </Col>
        <Col md={3}>
          <ListGroup variant='flush'>
            <ListGroup.Item>
              <h3>{video.name}</h3>
            </ListGroup.Item>
            <ListGroup.Item>{video.description}</ListGroup.Item>
          </ListGroup>
        </Col>
      </Row>
      <br/>
      <Link to='/'>Go Back</Link>
    </div>
  )
}

export default VideoScreen