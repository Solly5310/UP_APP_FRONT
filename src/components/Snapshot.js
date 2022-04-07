import React, { useState, useEffect } from "react";
import axios from "axios";
import "./Snapshot.css";
const Snapshot = () => {
  const [snapshots, setSnapshots] = useState(false);

  const getSnapshots = async (path = "/database/snapshots") => {
    //sending a resopnse to our own api
    const url = `http://localhost:5000${path}`;
    //once a response is received, we then save the data
    const { data } = await axios.get(url);
    console.log(data);
    console.log();

    const dataArray = new Array(5);

    for (let i = 1; i < 6; i++) {
      let splitter = data.data.length / 5;
      let split_degree = data.data.length / 5;
      splitter = splitter * i;
      console.log(splitter);
      dataArray[i - 1] = data.data.slice(splitter - split_degree, splitter);
      console.log(dataArray[i - 1]);
    }

    setSnapshots(dataArray);
  };

  const renderSnapshots = (e) => {
    
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
      const transDate = new Date(e.date).toLocaleDateString(undefined, options)
    
    return (
      <div className="snapshotBox">
        <li>
          <table>
                  <tr>
                    <th>Description</th>
                    <th>Amount</th>
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

  useEffect(() => {
    getSnapshots();
  }, []);

  if (!snapshots) {
    return <div> not snapshots!</div>;
  } else if (snapshots) {
    return (
      <div>
        <div>
          <h2 className="top">Snapshot One</h2>
          <ul>{snapshots[0].map(renderSnapshots)}</ul>
        </div>
        <div>
          <h2>Snapshot Two</h2>
          <ul>{snapshots[1].map(renderSnapshots)}</ul>
        </div>
        <div>
          <h2>Snapshot Three</h2>
          <ul>{snapshots[2].map(renderSnapshots)}</ul>
        </div>
        <div>
          <h2>Snapshot Four</h2>
          <ul>{snapshots[3].map(renderSnapshots)}</ul>
        </div>
        <div>
          <h2>Snapshot Five</h2>
          <ul>{snapshots[4].map(renderSnapshots)}</ul>
        </div>
      </div>
    );
  }
};
export default Snapshot;
