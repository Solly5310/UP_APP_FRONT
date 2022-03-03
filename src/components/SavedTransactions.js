import React, { useState, useEffect } from "react";
import axios from "axios";

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
    return (
      <div>
        <li>
          <span>{e.description}</span>
          <span>{e.value}</span>
          <span>{e.date}</span>
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
