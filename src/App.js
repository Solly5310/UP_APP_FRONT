import React, { useState, useEffect } from "react";
import Transactions from "./components/Transactions.js";
import Snapshot from "./components/Snapshot.js";
import SavedTransactions from "./components/SavedTransactions.js";
import io from "socket.io-client";
import axios from "axios";

const tranState = 1;
const snapState = 2;
const savedTransState = 3;
function App() {
  const snapshotSection = () => {
    setbutton(snapState);
  };

  const transactionSection = () => {
    setbutton(tranState);
  };

  const savedTransSection = () => {
    setbutton(savedTransState);
  };

  function saveInfo() {
    storedatabaseInfo();
  }

  const [screenState, setbutton] = useState(tranState);

  const storedatabaseInfo = async (path = "/database") => {
    //sending a resopnse to our own api
    const url = `http://localhost:5000${path}/`;
    //once a response is received, we then save the data
    const data = await axios.get(url);
    console.log(data);
  };

  //need to learn this
  useEffect(() => {
    const socket = io("http://localhost:5000");

    socket.on("connect", () => {
      console.log("connected to the socket");
    });

    socket.on("webhook", (data) => {
      console.log("here it comes");
      console.log(data);
    });
  }, []);

  if (screenState === tranState) {
    return (
      <div className="App">
        <Transactions />
        <button onClick={snapshotSection}>Transaction Snapshot</button>
        <button onClick={savedTransSection}>Saved Transactions</button>
        <button onClick={saveInfo}>Save a Snapshot</button>
      </div>
    );
  } else if (screenState === snapState) {
    return (
      <div className="App">
        <Snapshot />
        <button onClick={transactionSection}>Current Transactions</button>
        <button onClick={savedTransSection}>Saved Transactions</button>
      </div>
    );
  } else if (screenState === savedTransState) {
    return (
      <div className="App">
        <SavedTransactions />
        <button onClick={transactionSection}>Current Transactions</button>
        <button onClick={snapshotSection}>Transaction Snapshot</button>
      </div>
    );
  }
}

export default App;
