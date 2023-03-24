import { useEffect, useState } from "react";
import { Container, Card, Form, Button, Alert } from "react-bootstrap"
import { useNavigate } from "react-router";

export const Withdraw = ({ onWithdraw, user }) => {
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

    const withdraw = () => {
        if (isNaN(amount)) updateError ('Not a Number')
        if (Number(amount) < 0) updateError('Amount needs to be positive');
        if (!amount) updateError('Amount is required')
        if (Number(amount) > Number(user?.balance)) updateError('Insufficient Funds');

        if (Number(amount) > 0 && !isNaN(amount) && (Number(amount) <= Number(user?.balance))) {
            updateError(undefined)
            updateAmount(0)
            onWithdraw(amount)

            updateShowSuccess(amount)
        }

        // if (amount < 0) {
        //     updateError('Amount needs to be positive')
        //     return;
        // };

        // if (!amount) {
        //     updateError('Amount is required')
        //     return;
        // }

        // if (amount > user?.balance) {
        //     updateError('Insufficient funds')
        //     return;
        // }

        // updateError(undefined)
        // updateAmount(0)
        // onWithdraw(amount)

        // navigate('/account')
    };

    return (
        <Container>
        <Card className="col-4 offset-4 mt-5">
            <Card.Header className="text-center">
                    Your current balance is:
                    { new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(user?.balance) }
            </Card.Header>
                <Card.Body>
                {showSuccess > 0 && <Alert>Successfully withdraw ${showSuccess}</Alert>}
                    <Form>
                        <Form.Group controlId="formBasicEmail">
                            <Form.Label>Withdraw amount</Form.Label>
                            <Form.Control type="text" placeholder="Enter amount" value={amount} onChange={e => updateAmount(e.target.value)}/>
                        </Form.Group>
                        <p></p>
                        <Form.Text className="text-danger">{error}</Form.Text>
                        <p></p>
                        <Button variant="primary" type="button" disabled={!amount} onClick={withdraw}>
                            Withdraw ${amount}
                        </Button>
                    </Form>
                </Card.Body>
        </Card>
        </Container>
    );
}