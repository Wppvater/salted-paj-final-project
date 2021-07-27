import * as React from "react"
import { graphql } from 'gatsby'
import Nav from "../components/Nav";
import Logo from "../components/Logo";
import Schedule from "../components/Schedule";
import '../styles/sass.scss';

const IndexPage = ({data}) => {
  const scheduleData = data.saltedpaj.getAllSchedules[0];
  return (
    <div className="blur">
    <div className="circle">
    <main >
      <Logo />
      <div className="main__div">
        <title>Home Page</title>
        {/* <h1>
          LOGO
        </h1>
        <h2>
          Schedule
        </h2> */}
        <Schedule scheduleData = {scheduleData}/>
      </div>
    <Nav />
    </main>
    </div>
    </div>
  )
}

export default IndexPage

export const pageQuery = graphql`
  query schedulesQuery {
    saltedpaj {
      getAllSchedules {
        name
        id
        categories
        recipes {
          day
          id
          mealInDay
          portions
        }
      }
    }
  }
`