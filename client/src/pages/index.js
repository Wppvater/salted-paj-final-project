import * as React from "react"
import { graphql } from 'gatsby'
import gql from 'graphql-tag';
import {Query} from 'react-apollo';
import Nav from "../components/Nav";
import Logo from "../components/Logo";
import Schedule from "../components/Schedule";
import '../styles/sass.scss';

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
        <Query query={GetAllSchedulesQuery}>
          {({data, loading, error})=>{
            if (loading) return <span>Loading...</span>
            if (error) return <span>{error.message}</span>
            console.log(data.getAllSchedules);
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
  {
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