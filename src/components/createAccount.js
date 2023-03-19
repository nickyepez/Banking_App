import { useState } from "react";
import { Card, Form, Button } from "react-bootstrap"
import { useNavigate } from "react-router";

export const CreateAccount = ({ onAccountCreated }) => {
    const [name, updateName] = useState('')
    const [email, updateEmail] = useState('')
    const [password, updatePassword] = useState('')
    const [error, updateError] = useState(undefined)

    const navigate = useNavigate();

    const createAccount = () => {
        if (!name) updateError('Name is required');
        if (!email) updateError('Email is required');
        if (!password) updateError('Password is required');

        if (email && password && name) {
            updateError(undefined)
            
            const accounts = JSON.parse(localStorage.getItem('accounts') ?? '[]');
            const user = accounts.find(a => a.email === email);
    
            if (user) {
                updateError('Account already exists, please login');
            } else {
                accounts.push({ name, email, password, balance: 0 });
                localStorage.setItem('accounts', JSON.stringify(accounts))

                onAccountCreated({ name, email, password, balance: 0 });
                navigate('/account')
            }
        }

    };

    return <Card>
            <Card.Header className="col-4 offset-4 mt-5">
                <h4>Master Bank - Create Account</h4>
            </Card.Header>
            <Card.Body>
                <Form className="col-4 offset-4 mt-5">
                    <Form.Group className="mb-3" controlId="formBasicName">
                        <Form.Label>Full Name</Form.Label>
                        <Form.Control type="text" placeholder="Enter Name" value={name} onChange={e => updateName(e.target.value)}/>
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label>Email address</Form.Label>
                        <Form.Control type="email" placeholder="Enter email" value={email} onChange={e => updateEmail(e.target.value)}/>
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formBasicPassword">
                        <Form.Label>Password</Form.Label>
                        <Form.Control type="password" placeholder="Password" value={password} onChange={e => updatePassword(e.target.value)}/>
                    </Form.Group>

                    <p>
                        <Form.Text className="error">{error}</Form.Text>
                    </p>

                    <Button variant="primary" type="button" onClick={createAccount}>
                        Create Account
                    </Button>
                </Form>    
            </Card.Body>
    </Card>
}