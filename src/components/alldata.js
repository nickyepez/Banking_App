import { useState } from "react"
import { Card } from "react-bootstrap"

export function AllData({user}){
  const [balance, updateBalance ] = useState(0);
  const [transactions, updateTransactions] = useState([]);

  return <Card className="col-4 offset-4 mt-5" style={{ width: '30rem' }}>
      <Card.Body>
          <Card.Title>
            Name: { user?.attributes.name }
          </Card.Title>
          <Card.Text>
              Your email is: {user.attributes.email} 
          </Card.Text>
          <Card.Text>
              Your current balance is: ${balance} 
          </Card.Text>
          <table className="table">
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">Transaction</th>
              <th scope="col">Amount</th>
              <th scope="col">Date</th>
            </tr>
          </thead>
          <tbody>
            {transactions.map((t, i) => <tr key={i}>
              <th scope="row">{i+1}</th>
              <td>{t.type}</td>
              <td className={t.type === 'DEPOSIT' ? 'text-success' : 'text-danger'}>{t.amount}</td>
              <td>{t.date}</td>
            </tr>)}
          </tbody>
        </table>
      </Card.Body>
    </Card>
}

