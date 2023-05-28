// import { useState } from "react";
import { Main } from "./components/main";
import { BankNavBar } from "./components/navbar";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Deposit } from "./components/deposit";
import { Withdraw } from "./components/withdraw";
import { AllData } from "./components/alldata";
import { Authenticator } from "@aws-amplify/ui-react";


function App() {
  const onDeposit = (amount) => {
  }
  
  const onWithdraw = (amount) => {
  }

  return (
    <BrowserRouter>
      <Authenticator>
        {({ signOut, user }) => (
          <main>
            <BankNavBar onLogOut={signOut} user={user} />
            <Routes>
              <Route path="/" element={<Main user={user}/>} />
              <Route path="/deposit" element={<Deposit onDeposit={onDeposit} user={user} />} />
              <Route path="/withdraw" element={<Withdraw onWithdraw={onWithdraw} user={user} />} />
              <Route path="/alldata" element={<AllData user={user}/>}/>
            </Routes>
          </main>         
        )}  
       </Authenticator>
      </BrowserRouter>
  );
}

export default App;
