import {React,useState,useContext} from 'react';
import axios from 'axios';
import './style.css';
import Modal from 'react-modal';
import {AddCartContext } from '../../common/context';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function SlideCard({itemId,name,description,imgUrl,price}) {

  const [modelOpen , setModelOpen] = useState(false);
  
  const addItems = useContext(AddCartContext);

  const itemClicked = () =>{
    axios.post(`http://localhost:5000/itemviewed`,{id:itemId}).then((res,err)=>{
      if(res){
        console.log(res.data);
      }
    })
    setModelOpen(!modelOpen);
  }

  const handleAddItemClick = (e) => {
    e.preventDefault();

    axios.post(`http://localhost:5000/itemaddtocart`,{id:itemId}).then((resp,err)=>{
      if(resp){
        console.log(resp.data);
        let item = {
          id: itemId,
          name: name,
          url: imgUrl,
          price: parseInt(price)
        }
        addItems(item);
        toast.success(`${name} added to the cart!`);
      }
    })
  };
  

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

  return (
    <>
        <div className="page-wrapper">
          <div className="page-inner">
            <div className="row">
              <div className="el-wrapper">
                <div className="box-up" onClick={itemClicked}>
                  <img className="item-img" src={imgUrl} alt={name}></img>
                  <div className="img-info">
                    <div className="info-inner">
                      <span className="p-company">{name}</span>
                    </div>
                    <div className="a-size">{description}</div>
                  </div>
                </div>

                <div className="box-down">
                  <div className="h-bg">
                    <div className="h-bg-inner"></div>
                  </div>
                  <ToastContainer/>
                  <div className="cart-card" onClick={handleAddItemClick}>
                    <span className="price">{price} LKR</span>
                    <span className="add-to-cart-card">
                      <span className="txt">Add in cart</span>
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <Modal 
        isOpen={modelOpen} 
        onRequestClose={()=> setModelOpen(false)}
        style={modalStyles}
        contentLabel={name}
        >
          <div className='item-model-content'>
            <div className='item-model-content-top-row'>
              <div className='item-model-content-item-name'>{name}</div>
              <button onClick={()=> setModelOpen(false)} className='item-model-content-close-btn'>Close</button>
            </div>
            <img className="item-img" src={imgUrl} alt={name}></img>
          <div className='item-model-content-desc'>{description}</div>
          <div className='item-model-content-price'>{price}.00 LKR</div>
          
          
          </div>
          
        </Modal>
    </>
  )
}

export default SlideCard