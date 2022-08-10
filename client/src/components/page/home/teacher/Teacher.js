import React, { useContext } from 'react'
import CountdownTimer from './countdown/CountdonwTimer';
import { LoginContext } from 'Contexts/LoginContext';

const Teacher = () => {
  const { teachers: teacher } = useContext(LoginContext)
  const Thirty_DAYS_IN_MS = 30 * 24 * 60 * 60 * 1000;
  const NOW_IN_MS = new Date().getTime();
  const dateTimeAfterThreeDays = NOW_IN_MS + Thirty_DAYS_IN_MS;

  return (
    <>
      {teacher.map(item => {
        return (
          <div key={teacher._id}>
            <h1> {item.firstname}, {item.lastname}</h1>
          </div>
        )
      })}

      <CountdownTimer targetDate={dateTimeAfterThreeDays} />

    </>
  )
}

export default Teacher