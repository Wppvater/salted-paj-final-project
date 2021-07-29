import React, {useState} from "react"
import { graphql, Link } from 'gatsby'
import gql from 'graphql-tag';
import {Query} from 'react-apollo';
import Nav from "../components/Nav";
import Logo from "../components/Logo";
import Schedule from "../components/Schedule";
import '../styles/sass.scss';
import logo from '../images/logo2.png';

const IndexPage = ({data}) => {
  // const [generateSchedule, { data: generateScheduleData }] = useMutation(GENERATE_SCHEDULE);
  // const scheduleData = data.saltedpaj.getAllSchedules[0];
  return (
    <div className="blur">
    <div className="circle">
    <main >
      <Logo />
      <div className="main__div">
        <title>Home Page</title>
        <Query query={GetAllSchedulesQuery} fetchPolicy={'cache-and-network'}>
          {({data, loading, error})=>{
            if (loading) return <span>Loading...</span>
            if (error) return <span>{error.message}</span>
            if(data.getAllSchedules.length == 0){
              return (
              <div>
              <img src={logo} alt={logo} className="App__logo" />
              <Link to='/plan'>
              <button className="schedule__create-button">Create your new schedule!</button>
              </Link>
              </div>
              )
            }
            return  <Schedule scheduleData = {data.getAllSchedules[data.getAllSchedules.length-1]}/>
          }}
        </Query>
       
      </div>
    <Nav />
    </main>
    </div>
    </div>
  )
}

export default IndexPage

const GetAllSchedulesQuery = gql`
  query getAllSchedulesIndex{
    getAllSchedules {
        name
        id
        categories
        recipes {
          day
          id
          __typename @skip(if: true)
          mealInDay
          portions
        }
        recipeObjects{
          name
        }
        startDate
      }
  }
`

// export const pageQuery = graphql`
//   query schedulesQuery {
//     saltedpaj {
//       getAllSchedules {
//         name
//         id
//         categories
//         recipes {
//           day
//           id
//           mealInDay
//           portions
//         }
//       }
//     }
//   }
// `