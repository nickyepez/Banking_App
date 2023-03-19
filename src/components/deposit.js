import { useState, useEffect } from "react";
import { Card, Form, Button } from "react-bootstrap"
import { useNavigate } from "react-router";

export const Deposit = ({ onDeposit, user }) => {
    const [amount, updateAmount] = useState('')
    const [error, updateError] = useState(undefined)

    const navigate = useNavigate();

    useEffect(() => {
        if (!user) {
            navigate('/')
        }
    }, [user, navigate])

    const deposit = () => {
        if (amount < 0) updateError('Amount needs to be positive');
        if (!amount) updateError('Amount is required')

        if (amount) {
            updateError(undefined)
            updateAmount(0)
            onDeposit(amount)

            navigate('/account')
        }
    };

    return (
        <div className="d-flex justify-content-center align-items-center vh-100"> 
        <Card style={{ width: '30rem' }}>
                <Card.Body>
                    <Card.Header className="text-center">
                            Your current balance is:
                            USD {user?.balance } 
                    </Card.Header>
                    <Form className="col-4 offset-4 mt-5">
                        <Form.Group className="mb-3" controlId="formBasicEmail">
                            <Form.Label>Deposit amount</Form.Label>
                            <Form.Control type="number" placeholder="Enter amount" value={amount} onChange={e => updateAmount(e.target.value)}/>
                        </Form.Group>

                        <p></p>
                        <Form.Text className="error">{error}</Form.Text>
                        <p></p>

                        <Button variant="primary" type="button" onClick={deposit}>
                            Deposit ${amount}
                        </Button>
                    </Form>
                </Card.Body>
        </Card>
        </div>
    );
}