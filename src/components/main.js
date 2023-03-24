import { useEffect } from "react";
import { useNavigate } from "react-router"
import { Container, Card } from "react-bootstrap"

export const Main = ({ user }) => {
    const navigate = useNavigate();

    useEffect(() => {
        if (!user) navigate('/')
    }, [user, navigate])

    return (
        <Container>
            <Card className="col-4 offset-4 mt-5">
                <Card.Img variant="top" src="https://thumbs.dreamstime.com/b/money-transfer-global-currency-stock-exchange-financial-background-stock-market-concept-global-currency-technology-background-153250964.jpg" />
                <Card.Body>
                    <Card.Title>{ user?.name }</Card.Title>
                    <Card.Text>
                        Your current balance is: 
                    </Card.Text>
                    <Card.Text>
                    { new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(user?.balance) }
                    </Card.Text>
                </Card.Body>
                <Card.Body>
                    <Card.Link onClick={() => navigate('/deposit')}>Deposit</Card.Link>
                    <Card.Link onClick={() => navigate('/withdraw')}>Withdraw</Card.Link>
                </Card.Body>
            </Card>
        </Container>
    );
}