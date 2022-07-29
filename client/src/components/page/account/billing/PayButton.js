import axios from 'axios'
import { useSelector } from 'react-redux'
import { api_base } from 'config'


const PayButton = ( {plan}) => {
  // const user = useSelector(state => state.auth)

  const handleCheckout = () => {


    axios.post(`${api_base}/stripe/create-checkout-session`, {
      plan
      // userId: user._id
    })
    .then(res => {
      if (res.data.url) {
        window.location.href = res.data.url
      }
    })
    .catch(err => console.log(err.message))
  }
    
  return (
    <>
      <button onClick={() => handleCheckout()}>
        Check Out
      </button>
    </>
  )
}

export default  PayButton