import { useState, useEffect } from "react";
import { Card, Form, Button } from "react-bootstrap"
import { useNavigate } from "react-router";

export const Login = ({ onLoginSuccess, user }) => {
    const [email, updateEmail] = useState('')
    const [password, updatePassword] = useState('')
    const [error, updateError] = useState(undefined)

    const navigate = useNavigate();

    const login = () => {
        if (!email) updateError('Email is required');
        if (!password) updateError('Password is required');

        if (email && password) {
            updateError(undefined)

            const accounts = JSON.parse(localStorage.getItem('accounts') ?? '[]');
            const user = accounts.find(a => a.email === email && a.password === password);
    
            if (user) {
                onLoginSuccess(user);
                navigate('/account')
            } else {
                updateError('Invalid credentials')
            }
        }
    };

    useEffect(() => {
        if (user) {
            navigate('/account');
        }
    }, [user, navigate])

    return (
        <div className="justify-content-center align-items-center vh-100"> 
        <Card>
            <Card.Body>
                    <Card.Header className="text-center">
                        <h4>Welcome to Master Bank </h4>
                    </Card.Header>
                        <Form className="col-4 offset-4 mt-5">
                            <img src="bank_icon.png" alt="" style={{ width: '200px', height: '200px' , display: 'block', margin: '0 auto' }}/>
                            <p></p>
                            <Form.Group className="mb-3" controlId="formBasicEmail">
                                <Form.Label>Email address</Form.Label>
                                <Form.Control type="email" placeholder="Enter email" value={email} onChange={e => updateEmail(e.target.value)}/>
                            </Form.Group>
                            <p></p>
                            <Form.Group className="mb-3" controlId="formBasicPassword">
                                <Form.Label>Password</Form.Label>
                                <Form.Control type="password" placeholder="Enter password" value={password} onChange={e => updatePassword(e.target.value)}/>
                            </Form.Group>
                            <p></p>
                            <Form.Text className="error">{error}</Form.Text>
                            <p></p>
                            <Button variant="primary" type="button" onClick={login}>
                                Log In
                            </Button>
                        </Form>
            </Card.Body>
        </Card>
        </div>
    );
}