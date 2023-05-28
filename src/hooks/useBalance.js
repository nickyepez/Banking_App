import { useState, useEffect } from "react";
import { API, Auth } from 'aws-amplify'

export const useBalance = (userId) => {
    const [balance, updateBalance ] = useState(0);
  
    
    useEffect(() => {
      const fetchAll = async () => {
        const headers = {
            Authorization: `Bearer ${(await Auth.currentSession())
            .getIdToken()
            .getJwtToken()}`
        };
    
        const result = await API.get('Transaction', `/transactions/${userId}`, { headers });
  
        for (const res of result) {
          res.date = new Date(res.timestamp).toLocaleDateString();
        }
    
        const bal = result.reduce((prev, current) => {
          if (current.type === 'DEPOSIT') {
            return prev + parseFloat(current.amount); 
          } else {
            return prev - parseFloat(current.amount);
          }
        }, 0);
    
        updateBalance(bal);
      }
  
      fetchAll();
    }, [userId])
  
    return { balance };
  }