import { useState, useEffect } from "react";
import { Container, Card, Form, Button, Alert } from "react-bootstrap"
import { useNavigate } from "react-router";
import { API, Auth } from 'aws-amplify'
import { useBalance } from "../hooks/useBalance";

export const Deposit = ({ user }) => {
    const [amount, updateAmount] = useState('')
    const [error, updateError] = useState(undefined)
    const [showSuccess, updateShowSuccess] = useState(-1)
    const { balance } = useBalance(user.attributes.sub)

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

    const postDeposit = async (transaction) => {
        const headers = {
            Authorization: `Bearer ${(await Auth.currentSession())
            .getIdToken()
            .getJwtToken()}`
        };

        await API.post('Transaction', '/transactions', { body: transaction, headers })
    }

    const deposit = async () => {
        if (isNaN(amount)) updateError ('Not a Number')
        if (Number(amount) < 0) updateError('Amount needs to be positive');
        if (!amount) updateError('Amount is required')

        if (Number(amount) >0 && !isNaN(amount)) {
            updateError(undefined)
            updateAmount(0)

            const transaction = {
                userId: user.attributes.sub,
                timestamp: Date.now(),
                type: 'DEPOSIT',
                amount
            }

            try {
                await postDeposit(transaction);
                updateShowSuccess(amount)

                setTimeout(() => {
                    navigate('../')
                }, 1000)
            } catch (error) {
                updateError('Transaction failed to create, please try again')
                throw error;
            }
        }
    };

    return (
        <Container>
        <Card className="col-4 offset-4 mt-5">
            <Card.Header className="text-center">
                Your current balance is:
                { new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(balance) } 
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