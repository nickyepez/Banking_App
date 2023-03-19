import { useEffect } from "react";
import { useNavigate } from "react-router"
import { Card } from "react-bootstrap"

export const Main = ({ user }) => {
    const navigate = useNavigate();

    useEffect(() => {
        if (!user) navigate('/')
    }, [user, navigate])

    return (
        <div className="justify-content-center align-items-center vh-100"> 
        {/* <Container className="col offset-5 mt-5"> */}
            <Card className="col-4 offset-4 mt-5" style={{ width: '30rem' }}>
                <Card.Img variant="top" src="https://thumbs.dreamstime.com/b/money-transfer-global-currency-stock-exchange-financial-background-stock-market-concept-global-currency-technology-background-153250964.jpg" />
                <Card.Body>
                    <Card.Title>{ user?.name }</Card.Title>
                    <Card.Text>
                        Your current balance is:
                    </Card.Text>
                    <Card.Text>
                        USD {user?.balance } 
                    </Card.Text>
                </Card.Body>
                <Card.Body>
                    <Card.Link onClick={() => navigate('/deposit')}>Deposit</Card.Link>
                    <Card.Link onClick={() => navigate('/withdraw')}>Withdraw</Card.Link>
                </Card.Body>
            </Card>
        {/* </Container> */}
        </div>
    );
}