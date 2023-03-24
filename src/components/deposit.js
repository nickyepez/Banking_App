import { useState, useEffect } from "react";
import { Container, Card, Form, Button, Alert } from "react-bootstrap"
import { useNavigate } from "react-router";

export const Deposit = ({ onDeposit, user }) => {
    const [amount, updateAmount] = useState('')
    const [error, updateError] = useState(undefined)
    const [showSuccess, updateShowSuccess] = useState(-1)

    const navigate = useNavigate();

    useEffect(() => {
        if (!user) {
            navigate('/')
        }
    }, [user, navigate])

    useEffect(() => {
        if (showSuccess > 0) {
            setTimeout(() => {
                updateShowSuccess(-1)
            }, 1500)
        }
    }, [showSuccess, updateShowSuccess])

    const deposit = () => {
        if (isNaN(amount)) updateError ('Not a Number')
        if (Number(amount) < 0) updateError('Amount needs to be positive');
        if (!amount) updateError('Amount is required')

        if (Number(amount) >0 && !isNaN(amount)) {
            updateError(undefined)
            updateAmount(0)
            onDeposit(amount)

            updateShowSuccess(amount)
        }
    };

    return (
        <Container>
        <Card className="col-4 offset-4 mt-5">
            <Card.Header className="text-center">
                Your current balance is:
                { new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(user?.balance) } 
            </Card.Header>
                <Card.Body>
                    {showSuccess > 0 && <Alert>Successfully deposited ${showSuccess}</Alert>}
                    <Form>
                        <Form.Group controlId="formBasicEmail">
                            <Form.Label>Deposit amount</Form.Label>
                            <Form.Control type="text" placeholder="Enter amount" value={amount} onChange={e => updateAmount(e.target.value)}/>
                        </Form.Group>
                        <p></p>
                        <Form.Text className="text-danger">{error}</Form.Text>
                        <p></p>
                        <Button variant="primary" type="button" disabled={!amount} onClick={deposit}>
                            Deposit ${amount}
                        </Button>
                    </Form>
                </Card.Body>
        </Card>
        </Container>
    );
}