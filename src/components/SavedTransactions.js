import React, { useState, useEffect } from "react";
import axios from "axios";
import './SavedTransactions.css'
const SavedTransactions = () => {
  const [savedTransactions, setSaved] = useState(false);

  const getSavedTrans = async (path = "/database/saved") => {
    //sending a resopnse to our own api
    const url = `http://localhost:5000${path}`;
    //once a response is received, we then save the data
    const { data } = await axios.get(url);
    console.log(data);
    setSaved(data.data);
  };
  useEffect(() => {
    getSavedTrans();
  }, []);

  const renderSavedTransactions = (e) => {
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
      const transDate = new Date(e.date).toLocaleDateString(undefined, options)
    
    
    return (
      <div className="transBox">
        <li>
          <table>
              <tr>
                <th>Description</th>
                <th className="amount">Amount</th>
                <th>Date</th>
              </tr>
              <tr>
                <td>{e.description}</td>
                <td>{e.value}</td>
                <td>{transDate}</td>
              </tr>
          </table>
        </li>
      </div>
    );
  };

  if (!savedTransactions) {
    return <div>Loading</div>;
  } else if (savedTransactions) {
    return (
      <div>
        <h1>Saved Transactions</h1>
        <ul>{savedTransactions.map(renderSavedTransactions)}</ul>
      </div>
    );
  }
};

export default SavedTransactions;
