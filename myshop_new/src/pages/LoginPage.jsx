import React from 'react';

function Login() {

  return (
    <>
        <div className='login-page-container'>
            <div className='login-page-left'>
                <div className='login-page-title'>Login</div>
                <form action="#" method="post">
                    <div htmlFor="username_login" className='login-page-label'>Username</div>
                    <input type="text" name='username_login' className='login-page-input'/>
                    <div htmlFor="password_login" className='login-page-label'>Password</div>
                    <input type="text" name='password_login' className='login-page-input'/>
                </form>
                <button className='login-btn'>Login</button>
            </div>
            <div className='login-page-right'>
                <div className='login-page-title'>Register</div>
                <form action="#" method="post">
                    <div htmlFor="username_reg" className='login-page-label'>Username</div>
                    <input type="text" name='username_reg' className='login-page-input'/>
                    <div htmlFor="password_login" className='login-page-label'>Password</div>
                    <input type="text" name='password_reg' className='login-page-input'/>
                    <div htmlFor="address_reg" className='login-page-label'>Address</div>
                    <input type="text" name='address_reg' className='login-page-input'/>
                </form>
                <button className='login-btn'>Register</button>
            </div>
        </div>
    </>
  )
}

export default Login