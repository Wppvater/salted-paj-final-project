import * as React from "react";
import Nav from "../components/Nav";
import Logo from "../components/Logo";

const PlanPage = () => {
  return (
    <div class="blur">
    <div class="circle">
    <main >
      <Logo />
      <div className="main__div">
        <title>plan Page</title>
        {/* <h1>
          LOGO
        </h1>
        <h2>
          Schedule
        </h2> */}
      </div>
    <Nav />
    </main>
    </div>
    </div>
  );
};

export default PlanPage;
