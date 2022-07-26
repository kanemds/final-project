import React, { useState, useEffect } from 'react'
import { api_base } from 'config'
import useExam from './useExam'

const Exam = () => {
  const exam = useExam()
	
	const {
		name = ""
	} = exam
  return (
    <div className='exam'>Exam {name}
		</div>
  )
}

export default Exam