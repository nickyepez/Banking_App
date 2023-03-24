import { useState } from "react";
import { Main } from "./components/main";
import { Login } from "./components/login";
import { BankNavBar } from "./components/navbar";
import { CreateAccount } from "./components/createAccount";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Deposit } from "./components/deposit";
import { Withdraw } from "./components/withdraw";
import { AllData } from "./components/alldata";

function App({ loggedInUser }) {
  const [user, updateUser] = useState(loggedInUser);

  const logOut = () => {
    updateUser(undefined);
    localStorage.removeItem('activeEmail')
    window.location =  window.location
  }

  const loggedIn = (user) => {
    updateUser(user);
    localStorage.setItem('activeEmail', user.email )
  }

  const onDeposit = (amount) => {
    updateUser(user => {
      user.balance = Number(amount) + Number(user.balance)
      user.transactions.push({type:"DEPOSIT", amount:amount, date:new Date().toDateString()})
      
      const accounts = JSON.parse(localStorage.getItem('accounts') ?? '[]');    
      const index = accounts.findIndex(u => u.email === user.email);
  
      accounts[index] = user;
  
      localStorage.setItem('accounts', JSON.stringify(accounts))

      return user
    })
  }
  
  const onWithdraw = (amount) => {
    updateUser(user => {
      user.balance = Number(user.balance) - Number(amount)
      user.transactions.push({type:"WITHDRAW", amount:amount, date:new Date().toDateString()})

      const accounts = JSON.parse(localStorage.getItem('accounts') ?? '[]');    
      const index = accounts.findIndex(u => u.email === user.email);
  
      accounts[index] = user;
  
      localStorage.setItem('accounts', JSON.stringify(accounts))

      return user
    })
  }

  return (
    <BrowserRouter>
      <BankNavBar onLogOut={logOut} user={user} />
      <Routes>
        <Route path="/" element={<Login user={user} onLoginSuccess={loggedIn}/>}/>
        <Route path="/createAccount" element={<CreateAccount onAccountCreated={loggedIn} />}/>
        <Route path="/account" element={<Main user={user}/>} />
        <Route path="/deposit" element={<Deposit onDeposit={onDeposit} user={user} />} />
        <Route path="/withdraw" element={<Withdraw onWithdraw={onWithdraw} user={user} />} />
        <Route path="/alldata" element={<AllData user={user}/>}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
