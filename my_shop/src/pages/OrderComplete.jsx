import {React} from 'react';
import { useNavigate } from 'react-router-dom';
function OrderComplete() {
    const navigate = useNavigate();
  return (
    <>
      <div className='order-completed-text'>Your order is placed successfully !!!</div>  
      <div className='order-completed-btn-container'>
      <button onClick={()=>{ navigate('/');}} className='order-completed-btn'>Continue Shopping</button>
      </div>
      
    </>
  )
}

export default OrderComplete