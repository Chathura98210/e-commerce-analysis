import React, { useContext, useEffect, useState } from "react";
import Modal from 'react-modal';
import { CartContext, RemoveCartContext,EmptyCartContext } from "../common/context";
import { useFormik } from "formik";
import axios from "axios";
import './cart.css';
import { useNavigate } from 'react-router-dom';


const Cart = () => {
  const navigate = useNavigate();
  const items = useContext(CartContext);
  const removeItem = useContext(RemoveCartContext);
  const emptyCart = useContext(EmptyCartContext);
  const [cartTotal, setCartTotal] = useState(0);

  const [modelOpen , setModelOpen] = useState(false);
  const [ isUploading , setIsUploading] = useState(false);
  const formik = useFormik({
    initialValues:{
      name : window.localStorage.getItem('islogged')=== 'true' ? window.localStorage.getItem('name') : '',
      address: window.localStorage.getItem('islogged')=== 'true' ? window.localStorage.getItem('address') : '',  
      contact: '',    
      items:[]
    },
    onSubmit : values=>{
      if(!isUploading){
        setIsUploading(true)
        let dataBody = {
          name:values.name, 
          address:values.address,  
          contact:values.contact,
          items
        }

        console.log(dataBody)
        axios.post('http://localhost:5000/addOrder',
            {
              name:values.name, 
              address:values.address,  
              contact:values.contact,
              items
            }
            ).then((res,err)=>{
              console.log(res);
              setIsUploading(false);
              if(res.data === 'order added.'){
                emptyCart()
                navigate('/completedOrder');
              }
            })
      }else{
        console.log('error')
      }
    }
  });

  const checkOutClicked = () =>{
    setModelOpen(!modelOpen);
  }

  const total = () => {
    setCartTotal(items.reduce((acc, item) => acc + item.price, 0));
  };

  useEffect(() => {
      localStorage.setItem("cart", JSON.stringify(items));
      total();
  }, [items]);

  const modalStyles = {
    content: {
      top: '50%',
      left: '50%',
      right: 'auto',
      bottom: 'auto',
      marginRight: '-50%',
      transform: 'translate(-50%, -50%)',
    },
  };

  const cartItems = items.map((item) => (
    <div class="item">
    <div class="buttons">
      <span class="delete-btn"></span>
      <span class="like-btn"></span>
    </div>
 
    <div >
      <img src={item.url} alt={item.name} class="cart-image"/>
    </div>
 
    <div class="description">
      <span>{item.name}</span>
    </div>
 
    <div class="quantity">
    <span>1</span>
    </div>
 
    <div class="total-price">{item.price}.00 LKR</div>

    <input type="button" className="cart-rmv-btn" value="remove item" onClick={e => removeItem(item)} />
  </div>
  ));

  const checkoutItems = items.map((item) => (
    <div class="item">
    <div class="buttons">
      <span class="delete-btn"></span>
      <span class="like-btn"></span>
    </div>
 
    <div >
      <img src={item.url} alt={item.name} class="cart-image"/>
    </div>
 
    <div class="description">
      <span>{item.name}</span>
    </div>
 
    <div class="quantity">
    <span>1</span>
    </div>
 
    <div class="total-price">{item.price}.00 LKR</div>
  </div>
  ));

  return (
    <div>
        <div class="shopping-cart">
        <div class="title">
            Shopping Cart
        </div>
        {
            items.length > 0 ?
            <>
            {cartItems}
            <div className="cart-total">Total : {cartTotal}.00 LKR</div>
            <div className="cart-checkout" onClick={checkOutClicked}>Checkout</div>
            </>:
            <div className="cart-empty"> Cart Empty</div>
            
        }
            
</div>

        <Modal 
        isOpen={modelOpen} 
        onRequestClose={()=> setModelOpen(false)}
        style={modalStyles}
        contentLabel='Checkout'
        >
          <div className='item-model-content'>
            <div>
              <div className="checkout-modal-title">Items List</div>
              {checkoutItems}
              <div className='item-checkout-modal-price'> Cart Total : {cartTotal}.00 LKR</div>
              <br />
              <div className="checkout-modal-title">Delivery Details</div>
              <div className="note"><span className="star">*</span>We are currently only accepting cash on delivery</div>

                <form onSubmit={formik.handleSubmit}>
                  <div className="formInput">
                    <label className="checkout-label">Customer Name</label>
                    <input 
                    className="checkout-input"
                      type='text' 
                      name='name'
                      onChange={formik.handleChange}
                      value={formik.values.name} 
                    />
                  </div>
                  <div className="formInput">
                    <label className="checkout-label">Delivery Address</label>
                    <input 
                    className="checkout-input"
                      type='text' 
                      name='address'
                      onChange={formik.handleChange}
                      value={formik.values.address} 
                    />
                  </div>
                  <div className="formInput">
                    <label className="checkout-label">Contact No</label>
                    <input 
                    className="checkout-input"
                      type='text' 
                      name='contact'
                      onChange={formik.handleChange}
                      value={formik.values.contact} 
                    />
                  </div>
                  <button disabled={isUploading} className='checkout-confirm-btn'>Confirm</button>
                </form>

              <button onClick={()=> setModelOpen(false)} className='item-model-content-close-btn'>Close</button>
            </div>
         
          
          
          </div>
          
        </Modal>
    </div>
  );
};

export default Cart;