import HeaderBox from "@/components/HeaderBox";
import React from "react";

const loggedIn = {
  user: "Anandhu Prakash",
};

const Home = () => {
  return (
    <div className="home">
      <div className="home-content">
        <div className="home-header">
          <HeaderBox
            // type="greeting"
            // title="Welcome"
            // user={`${loggedIn.user}`}
            route="home"
          />
        </div>
      </div>
    </div>
  );
};

export default Home;
