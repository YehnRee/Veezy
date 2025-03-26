import React, { useEffect, useState } from 'react'
import { Link, useLocation, useSearchParams, useNavigate, redirect } from 'react-router-dom'
import { Form, Button, Row, Col } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Loader from '../components/Loader'
import Message from '../components/Message'
import { login } from '../actions/userActions'
import FormContainer from '../components/FormContainer'

function LoginScreen() {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const location = useLocation()
    const redirect = location.search ? location.search.split('=')[1] : '/'

    const userLogin = useSelector(state => state.userLogin)
    const {error, loading, userInfo} = userLogin

    let navigate = useNavigate()
    const dispatch = useDispatch()

    useEffect(() => {
        if (userInfo) {
            navigate(redirect)
        }
    }, [navigate, dispatch, userInfo, redirect])
    const submitHandler = (e) => {
        e.preventDefault()
        dispatch(login(email, password))
    }

    return (
        <FormContainer>
            <h1>Sign in</h1>
            {error && <Message variant='danger'>{error}</Message>}
            {loading && <Loader />}
            <Form onSubmit={submitHandler}>
                <Form.Group controlId='email'>
                    <Form.Label>Email</Form.Label>
                    <Form.Control
                        type='email'
                        placeholder='Email'
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    >

                    </Form.Control>
                </Form.Group>
                
                <Form.Group controlId='password'>
                    <Form.Label>Password</Form.Label>
                    <Form.Control
                        type='password'
                        placeholder='Password'
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    >

                    </Form.Control>
                </Form.Group>

                <Button type='submit' variant='primary'>
                    Sign In
                </Button>
            </Form>
            <Row className='py-3'>
                <Col>
                    Not yet registered? <Link
                        to={redirect ? `/register?redirect=${redirect}` : '/register'}
                    >
                        Register
                    </Link>
                </Col>
            </Row>
        </FormContainer>
    )
}

export default LoginScreen