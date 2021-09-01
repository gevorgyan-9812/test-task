import React, { useEffect } from 'react';
import { useHistory } from "react-router";

const Home = () => {
  const history = useHistory();

  useEffect(() => {
    if(localStorage.getItem("usertoken") === null) {
      history.push({
        pathname: "/login"
      });
    }
  })

    return (
      <div className="container">
            <h1 className="text-center">Home</h1>
      </div>
    )
  }

export default Home;
