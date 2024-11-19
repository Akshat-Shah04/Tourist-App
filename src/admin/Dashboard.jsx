// import React, { useEffect, useState } from 'react'
// import SideBarDashboard from './Common/SideBarDashboard'
// import axios from 'axios'

// const Dashboard = () => {
//   const [team, setTeam] = useState([]) // State to store team data

//   const fetchData = async () => {
//     try {
//       const response = await axios.get("http://localhost:3000/team")
//       setTeam(response.data) // Update state with fetched data
//     } catch (error) {
//       console.error("Error fetching team data:", error)
//     }
//   }

//   useEffect(() => {
//     fetchData() // Fetch data when component mounts
//   }, [])

//   return (
//     <div>
//       <SideBarDashboard />
//       <div className="container">
//         <div className='my-5 d-flex gap-2 w-100 flex-row flex-wrap justify-content-center align-items-center'>
//           <div className='border border-3 border-danger shadow px-5 py-3'>
//             <h4>Total Team Members</h4>
//             <h5 className='text-end fs-4 text-success'>{team.length}</h5> {/* Display total count */}
//           </div>
//           {/* Additional divs for other stats if needed */}
//           <div></div>
//           <div></div>
//           <div></div>
//         </div>
//       </div>
//     </div>
//   )
// }

// export default Dashboard


import React, { useEffect, useState } from 'react'
import SideBarDashboard from './Common/SideBarDashboard'
import axios from 'axios'

const Dashboard = () => {
  const [team, setTeam] = useState([])
  const [stats, setStats] = useState({
    totalMembers: 0,
    averageSalary: 0,
    departments: {},
    roles: {},
    employmentStatus: {},
    cities: {},
    ageRange: { min: 0, max: 0 },
  })

  const fetchData = async () => {
    const res = await axios.get("http://localhost:3000/team")
    setTeam(res.data)
  }

  useEffect(() => {
    fetchData()
  }, [])

  useEffect(() => {
    if (team.length > 0) {
      // Total team members
      const totalMembers = team.length

      // Calculate total and average salary with validation
      const validSalaries = team.map(member => Number(member.salary)).filter(salary => !isNaN(salary) && salary > 0);
      const totalSalary = validSalaries.reduce((acc, salary) => acc + salary, 0);
      const averageSalary = validSalaries.length > 0 ? totalSalary / validSalaries.length : 0;


      // Department breakdown
      const departments = team.reduce((acc, member) => {
        acc[member.department] = (acc[member.department] || 0) + 1
        return acc
      }, {})

      // Role distribution
      const roles = team.reduce((acc, member) => {
        acc[member.role] = (acc[member.role] || 0) + 1
        return acc
      }, {})

      // Employment status breakdown
      const employmentStatus = team.reduce((acc, member) => {
        acc[member.empStatus] = (acc[member.empStatus] || 0) + 1
        return acc
      }, {})

      // Location distribution
      const cities = team.reduce((acc, member) => {
        acc[member.city] = (acc[member.city] || 0) + 1
        return acc
      }, {})

      // Age range
      const ages = team.map(member => member.age)
      const ageRange = { min: Math.min(...ages), max: Math.max(...ages) }


      // Update stats
      setStats({
        totalMembers,
        averageSalary: averageSalary.toFixed(2),
        departments,
        roles,
        employmentStatus,
        cities,
        ageRange
      })
    }
  }, [team])

  return (
    <div>
      <SideBarDashboard />
      <div className="container">
        <div className='my-5 d-flex gap-4 flex-row flex-wrap justify-content-start align-items-center'>
          <div className='px-4 py-4 border border-2 bg-light border-danger shadow'>
            <h4>Total Team Members</h4>
            <h5 className='text-end text-success'>{stats.totalMembers}</h5>
          </div>
          <div className='px-4 py-2 border border-2 bg-light border-danger shadow'>

            <h4>Department Breakdown</h4>
            <ul className='text-start text-success'>
              {Object.entries(stats.departments).map(([dept, count]) => (
                <li key={dept}>{dept}: {count}</li>
              ))}
            </ul>
          </div>
          <div className='px-4 py-4 border border-2 bg-light border-danger shadow'>

            <h4>Average Salary</h4>
            <h5 className='text-end text-success'>{stats.averageSalary}</h5>
            <h6 className='text-end text-info text-decoration-none'>In Indian Rupees</h6>
          </div>

          <div className='px-4 py-3 border border-2 bg-light border-danger shadow'>
            <h4>Employment Status</h4>
            <ul className='text-start text-success'>
              {Object.entries(stats.employmentStatus).map(([status, count]) => (
                <li key={status}>{status}: {count}</li>
              ))}
            </ul>
          </div>
          <div className='px-4 py-2 border border-2 bg-light border-danger shadow'>

            <h4>Location Distribution</h4>
            <ul className='text-start text-success'>
              {Object.entries(stats.cities).map(([city, count]) => (
                <li key={city}>{city}: {count}</li>
              ))}
            </ul>
          </div>
          <div className='px-5 py-4 border border-2 bg-light border-danger shadow'>
            <h4>Age Range</h4>
            <h5>{stats.ageRange.min} - {stats.ageRange.max} years</h5>
          </div>
          <div className='px-5 py-2 border border-2 bg-light border-danger shadow'>

            <h4>Role Distribution</h4>
            <ul className='text-start text-success'>
              {Object.entries(stats.roles).map(([role, count]) => (
                <li key={role}>{role}: {count}</li>
              ))}
            </ul>
          </div>

        </div>
      </div>
    </div>
  )
}

export default Dashboard
