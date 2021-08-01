import React from "react"
import { Link } from 'gatsby'
import gql from 'graphql-tag';
import { Query } from 'react-apollo';
import Nav from "../components/Nav";
import Logo from "../components/Logo";
import Schedule from "../components/Schedule";
import '../styles/sass.scss';
import logo from '../images/favicon.ico';

const IndexPage = ({data}) => {
  
  return (
    <div className="blur">
    <div className="circle">
    <main >
      <Logo />
      <div className="main__div">
        <title>Home Page</title>
        <Query query={GetAllSchedulesQuery} fetchPolicy={'cache-and-network'}>
          {({data, loading, error})=>{
            if (loading) {
              return (<div className="main__loading">
                  <p className="loading__text">We're loading your schedule as fast as we can.</p>
                  <p className="loading__text">Do you want to create a new schedule or view your recipes?</p>
                  <Link to='/plan'>
                    <button className="schedule__create-button">Create a new schedule</button>
                  </Link>
                  <Link to='/recipes'>
                    <button className="schedule__create-button">View your recipes</button>
                  </Link>
                </div>
              )}
            if (error) return <span>{error.message}</span>
            if(data.getAllSchedules.length == 0){
              return (
              <div className="schedule__logo__button">
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
