import { useEffect, useState } from "react";
import Nav from 'react-bootstrap/Nav';
import { Navbar, Container } from "react-bootstrap";
import { useNavigate } from "react-router";

export const BankNavBar = ({ user, onLogOut }) => {

    const [ isLoggedIn, updateLoggedIn ] = useState(user !== null && user !== undefined)
    const path = window.location.pathname

    useEffect(() => {
        if (user) {
            updateLoggedIn(true)
        }
    }, [user])

    const navigate = useNavigate();

    const createAccount= () => {
        navigate('/createAccount')
    }

    // const login= () => {
    //     navigate('/')
    // }

    const deposit= () => {
        navigate('/deposit')
    }

    const withdraw= () => {
        navigate('/withdraw')
    }

    const allData= () => {
        navigate('/alldata')
    }
    
    const logOut = () => {
        onLogOut();
        navigate('/')
    }

    return <Navbar className="navbar navbar-expand-lg navbar-dark bg-dark">
        <Container>
            <Navbar.Brand className="nav-item" data-toggle="tooltip" data-placement="bottom" title="Home Page" onClick={() => navigate('/account')}>Home</Navbar.Brand>
            <Navbar.Toggle/>
            <Nav>
                {isLoggedIn &&<Navbar.Collapse>
                        <Nav.Link active={path.includes("deposit")} className="nav-item" data-toggle="tooltip" data-placement="bottom" title="Deposit Page" onClick={deposit}>
                            Deposit
                        </Nav.Link>
                        <Nav.Link active={path.includes("withdraw")} className="nav-item" data-toggle="tooltip" data-placement="bottom" title="Withdraw Page" onClick={withdraw}>
                            Withdraw
                        </Nav.Link>
                        <Nav.Link active={path.includes("alldata")} className="nav-item" data-toggle="tooltip" data-placement="bottom" title="All Data Page" onClick={allData}>
                            All Data
                        </Nav.Link>
                        <Nav.Link className="nav-item" data-toggle="tooltip" data-placement="bottom" title="Log Out Page" onClick={logOut}>
                            Log out
                        </Nav.Link>
                        {/* <Nav.Item className="nav-item text-white" >
                            Welcome {user?.name}
                        </Nav.Item> */}
                </Navbar.Collapse>}
                {!isLoggedIn &&<Navbar.Collapse className="justify-content-end">
                        <Nav.Link className="nav-item" data-toggle="tooltip" data-placement="bottom" title="Create Account Page" onClick={createAccount}>
                            Create Account
                        </Nav.Link>
                        {/* <Nav.Link onClick={login}>
                            Login
                        </Nav.Link> */}
                </Navbar.Collapse>}
            </Nav>
        </Container>
    </Navbar>
}