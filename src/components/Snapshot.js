import React, { useState, useEffect } from "react";
import axios from "axios";

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

  useEffect(() => {
    getSnapshots();
  }, []);

  if (!snapshots) {
    return <div> yepee</div>;
  } else if (snapshots) {
    return (
      <div>
        <div>
          <h2>Section one</h2>
          <ul>{snapshots[0].map(renderSnapshots)}</ul>
        </div>
        <div>
          <h2>Section Two</h2>
          <ul>{snapshots[1].map(renderSnapshots)}</ul>
        </div>
        <div>
          <h2>Section Three</h2>
          <ul>{snapshots[2].map(renderSnapshots)}</ul>
        </div>
        <div>
          <h2>Section Four</h2>
          <ul>{snapshots[3].map(renderSnapshots)}</ul>
        </div>
        <div>
          <h2>Section Five</h2>
          <ul>{snapshots[4].map(renderSnapshots)}</ul>
        </div>
      </div>
    );
  }
};
export default Snapshot;
