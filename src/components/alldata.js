import { Card } from "react-bootstrap"

export function AllData({user}){
  return <Card className="col-4 offset-4 mt-5" style={{ width: '30rem' }}>
      <Card.Body>
          <Card.Title>
            Name: { user?.name }
          </Card.Title>
          <Card.Text>
              Your email is: {user.email} 
          </Card.Text>
          <Card.Text>
              Your current balance is: ${user?.balance} 
          </Card.Text>
          {/* {user.transactions.map(e => <p class="text-danger">{JSON.stringify(e)}</p>)} */}
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
            {user.transactions.map((t, i) => <tr key={i}>
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

