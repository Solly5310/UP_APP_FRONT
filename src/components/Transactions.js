import React, { useState, useEffect } from "react";
import "./Transactions.css";
import axios from "axios";
const Transactions = () => {
  //use state to save transactions
  const [transactions, setTransactions] = useState(false);

  const getTransactions = async (path = "/transactions") => {
    //sending a resopnse to our own api
    const url = `http://localhost:5000${path}`;
    //once a response is received, we then save the data
    const { data } = await axios.get(url);
    console.log(data);
    setTransactions(data);
  };
  //everytime the dom rerenders, it will send info through
  useEffect(() => {
    console.log("Here is a use effect");
    getTransactions();
  }, []);

  const handlePagedTransactions = (e) => {
    //so this is when you get a new page that is selected

    const { url } = e.currentTarget.dataset;
    console.log(e.currentTarget.dataset);
    if (url) {
      setTransactions(null);
      getTransactions(url);
    }
  };

  const saveTransaction = async (id, d, val, date) => {
    let path = "/database";

    //why did url work?
    const url = `http://localhost:5000${path}`;

    //why didnt stringify work?
    var data = {
      Value: val,
      Description: d,
      Date: date,
    };

    const response = await axios.post(url, data);
    console.log(response);
    let element = document.getElementById(id);
    element.remove();
  };

  const renderTransaction = (transaction) => 
    {
      const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
      const transDate = new Date(transaction.attributes.createdAt).toLocaleDateString(undefined, options)

      return (
              <li key={transaction.id} className="item">
                
                <table>
                  <tr>
                    <th>Description</th>
                    <th>Amount</th>
                    <th>Date</th>
                  </tr>
                  <tr>
                    <td>{transaction.attributes.description}</td>
                    <td>{transaction.attributes.amount.value}</td>
                    <td>{transDate}</td>
                  </tr>
                </table>
                <div>
                  <button
                    className="transButton"
                    id={transaction.id}
                    onClick={(e) =>
                      saveTransaction(
                        transaction.id,
                        transaction.attributes.description,
                        transaction.attributes.amount.value,
                        Date(transaction.attributes.createdAt)
                      )
                    }
                  >
                    Save Transaction
                  </button>
                </div>
              </li>
              )
        }
  

  //if it is loading, it will return a loading parameter, otherwise it will return a transactions heading
  return transactions ? (
    <div className="container">
      <h1>Transactions</h1>
      <ul className="list">{transactions.data.map(renderTransaction)}</ul>
      <div className="buttons">
        <button
          className={transactions.links.prev ? "" : "disabled"}
          onClick={handlePagedTransactions}
          data-url={transactions.links.prev}
        >
          previous
        </button>
        <button
          className={transactions.links.next ? "" : "disabled"}
          onClick={handlePagedTransactions}
          data-url={transactions.links.next}
        >
          Next
        </button>
      </div>
    </div>
  ) : (
    <div className="loading">
      <h1 className="Loading">Loading</h1>
    </div>
  );
};
//Test
export default Transactions;
