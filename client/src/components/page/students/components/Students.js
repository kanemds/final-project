import React from 'react'
import useStudent from './useStudent'
const Students = () => {
  const student = useStudent()
  return (
    <>
      {student.map(item => {
        return (
          <div key={student._id}>
            <h1> {item.firstname}, {item.lastname}</h1>
          </div>
        )
      })}
    </>
  )
}
export default Students