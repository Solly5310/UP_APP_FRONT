import React, { useEffect } from "react";
import Transactions from "./components/Transactions.js";
import io from "socket.io-client";

function App() {
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
  });

  return (
    <div className="App">
      <Transactions />
    </div>
  );
}

export default App;
