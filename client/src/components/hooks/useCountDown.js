
const useCountDown = (time) => {
  const second = 1000
  const minute = second * 60
  const hour = minute * 60

  const texthour = Math.floor(time / hour)
  const textMinute = Math.floor((time % hour) / minute)
  const textSecond = Math.floor((time % minute) / second)
  return `${texthour} : ${textMinute} : ${textSecond}`
}



export default useCountDown