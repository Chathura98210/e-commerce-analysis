import {React,useState,useEffect} from 'react';
import axios from 'axios';
import { useFormik } from "formik";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function Login() {


    const [ isUploading , setIsUploading] = useState(false);
    const [ isLoggedIn , setIsLoggedIn ] = useState(window.localStorage.getItem('islogged')=== 'true' ? true : false);
    const [orderCount , setOrderCount] = useState(0);
    
      useEffect(()=>{
        if(isLoggedIn){
          axios.get(`http://localhost:5000/orderCount/${window.localStorage.getItem('name')}`).then((respp,err)=>{
          if(respp){
            setOrderCount(respp.data.count)
          }
        })
        }
      },[isLoggedIn]);
    const formikLogin = useFormik({
        initialValues:{
          username : '',
          password:''
        },
        onSubmit : values=>{
          if(!isUploading){
            setIsUploading(true)
            let dataBody = {
                username:values.username, 
                password:values.password
            }
    
            console.log(dataBody)
            axios.post('http://localhost:5000/customerLogin',dataBody).then((res,err)=>{
                  console.log(res);
                  setIsUploading(false);
                  formikLogin.resetForm();
                  if(res.data.username === values.username){
                    toast.success('user logged successfully');
                    setIsLoggedIn(true)
                    window.localStorage.setItem('islogged',true);
                    window.localStorage.setItem('name',res.data.username);
                    window.localStorage.setItem('address',res.data.address);
                    axios
                      .get(`http://localhost:5000/orderCount/${res.data.username}`)
                      .then(resp => {
                          setOrderCount(resp.data.count)
                      })
                      .catch(err => console.error(err));
                  }else if(res.data === 'no user' || res.data === 'wrong password'){
                    toast.warning('Incorrect credentials');
                  }else{
                    toast.warning('something went wrong');
                  }
                })
          }else{
            console.log('error')
          }
        }
      });
      const formikReg = useFormik({
        initialValues:{
          username : '',
          password:'',
          address:''
        },
        onSubmit : values=>{
          if(!isUploading){
            // setIsUploading(true)
            let dataBody = {
                username:values.username, 
                password:values.password,
                address:values.address
            }

            axios.post('http://localhost:5000/customerRegister',dataBody).then((res,err)=>{
                  console.log(res);
                  setIsUploading(false);
                  formikReg.resetForm();
                  if(res.data === 'username already exist'){
                    toast.warning('user already exist, try different username')
                  }else if(res.data === 'user added'){
                    toast.success('user added successfully')
                  }
                })
          }else{
            toast.error('something went wrong, try again')
            console.log('error')
          }
        }
      });

  return (
    <><ToastContainer/>
    {
        !isLoggedIn ? 
        <div className='login-page-container'>
            <div className='login-page-left'>
                <div className='login-page-title'>Login</div>
                <form onSubmit={formikLogin.handleSubmit}>
                <div className="formInput">
                    <label className='login-page-label'>Username</label>
                    <br />
                    <input 
                      type='text' 
                      name='username'
                      onChange={formikLogin.handleChange}
                      value={formikLogin.values.username} 
                      className='login-page-input'
                    />
                  </div>
                  <div className="formInput">
                    <label className='login-page-label'>Password</label>
                    <br />
                    <input 
                      type='text' 
                      name='password'
                      onChange={formikLogin.handleChange}
                      value={formikLogin.values.password} 
                      className='login-page-input'
                    />
                  </div>
                  <button className='login-btn' type="submit">Login</button>
                </form>
                
            </div>
            <div className='login-page-right'>
                <div className='login-page-title'>Register</div>
                <form onSubmit={formikReg.handleSubmit}>
                <div className="formInput">
                    <label className='login-page-label'>Username</label>
                    <br />
                    <input 
                      type='text' 
                      name='username'
                      onChange={formikReg.handleChange}
                      value={formikReg.values.username} 
                      className='login-page-input'
                    />
                  </div>
                  <div className="formInput">
                    <label className='login-page-label'>Password</label>
                    <br />
                    <input 
                      type='text' 
                      name='password'
                      onChange={formikReg.handleChange}
                      value={formikReg.values.password} 
                      className='login-page-input'
                    />
                  </div>
                  <div className="formInput">
                    <label className='login-page-label'>Customer Address</label>
                    <br />
                    <input 
                      type='text' 
                      name='address'
                      onChange={formikReg.handleChange}
                      value={formikReg.values.address} 
                      className='login-page-input'
                    />
                  </div>

                    <button className='login-btn' type="submit">Register</button>
                </form>
                
            </div>
        </div>
        :
        <div className='user-profile-container'>
            <button onClick={()=>{
                setIsLoggedIn(false);
                window.localStorage.setItem('islogged',false);
                window.localStorage.removeItem('name');
                window.localStorage.removeItem('address');
                }} className='logout-btn'>Logout</button>
            <div className='profile-welcome'>Welcome,<span className="profile-welcome-name">{window.localStorage.getItem('name')}</span>  </div>
            <div className='profile-welcome'>delivery address : <span className="profile-welcome-name">{window.localStorage.getItem('address')}</span></div>
            <div className='profile-welcome'>Orders Count: <span className="profile-welcome-name">{orderCount}</span></div>
        </div>
    }
        
    </>
  )
}

export default Login