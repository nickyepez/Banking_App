import { useState } from "react";
import { Container, Card, Form, Button } from "react-bootstrap"
import { useNavigate } from "react-router";

export const CreateAccount = ({ onAccountCreated }) => {
    const [name, updateName] = useState('')
    const [email, updateEmail] = useState('')
    const [password, updatePassword] = useState('')
    const [errors, updateErrors] = useState([])

    const navigate = useNavigate();

    const createAccount = () => {
        const validationErrors = []
        if (!name) validationErrors.push('Name is required');
        if (!email) validationErrors.push('Email is required');
        if (!password) validationErrors.push('Password is required');
        if (password.length && password.length <= 8) validationErrors.push ('Password is too short - greater than 8 characters');

        if (validationErrors.length === 0) {
            updateErrors([])
            
            const accounts = JSON.parse(localStorage.getItem('accounts') ?? '[]');
            const user = accounts.find(a => a.email === email);
    
            if (user) {
                updateErrors(['Account already exists, please login']);
            } else {
                const newUser = { name, email, password, balance: 0, transactions:[] }
                accounts.push(newUser);
                localStorage.setItem('accounts', JSON.stringify(accounts))

                onAccountCreated(newUser);
                navigate('/account')
                alert("Success")
            }
        } else {
            updateErrors(validationErrors)
        }
    };

    return <Container>
            <Card className="col-4 offset-4 mt-5">
            <Card.Header className="text-center">
                <h4>Create Account</h4>
            </Card.Header>
            <Card.Body>
                <Form>
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
                    {/* <p>
                        <Form.Text className="error">{errors}</Form.Text>
                    </p> */}
                    {errors.map(e => <p class="text-danger">{e}</p>)}
                    <Button variant="primary" type="button" disabled={!name && !email && !password} onClick={createAccount}>
                        Create Account
                    </Button>
                </Form>    
            </Card.Body>
    </Card>
    </Container>
}