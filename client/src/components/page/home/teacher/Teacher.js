import React from 'react'

import useTeacher from './useTeacher';
import CountdownTimer from './countdown/CountdonwTimer';

const Teacher = () => {
  const teacher = useTeacher()
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