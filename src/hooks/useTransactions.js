import { useState, useEffect } from "react";
import { API, Auth } from 'aws-amplify'

export const useTransactions = (userId) => {
    const [transactions, updateTransactions] = useState([]);

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

        updateTransactions(result);
      }

      fetchAll();
    }, [userId])

    return { transactions };
  }