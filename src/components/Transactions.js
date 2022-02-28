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

  const renderTransaction = (transaction) => (
    <li key={transaction.id} className="item">
      <span>{transaction.attributes.description}</span>
      <span>{transaction.attributes.amount.value}</span>
    </li>
  );

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
    <h1 className="Loading">Loading</h1>
  );
};
//Test
export default Transactions;
