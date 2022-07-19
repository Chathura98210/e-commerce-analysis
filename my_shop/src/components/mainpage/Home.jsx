import {React , useState} from 'react'
import HomeItem from '../itemDisplay/homeItem'
import Categories from './Categories'
import Chatbot from 'react-chatbot-kit';
import 'react-chatbot-kit/build/main.css';
import config from "../chatbot/config";
import MessageParser from "../chatbot/messageParser";
import ActionProvider from "../chatbot/actionProvider";


function Home() {
  const [btnClicked , setBtnClicked] = useState(false);
  const handleClick = ()=>{
    setBtnClicked(!btnClicked);
  }
  const myComponentStyleVisible = {
    display: 'block'
  }
  const myComponentStyleHidden = {
    display: 'none'
  }
  return (
    <>
        <section className='home'>
            <div className="container d_flex">
                <Categories/> 
                <HomeItem/>
                  <button className='chatbot-x-button' onClick={handleClick} style={btnClicked ? myComponentStyleVisible : myComponentStyleHidden}>x</button>
                  <button className='chatbot-button' onClick={handleClick}>lets have a chat !!!</button>
                
                <div className='chatbot-container' style={btnClicked ? myComponentStyleVisible : myComponentStyleHidden}>
                
                <Chatbot
                  config={config}
                  messageParser={MessageParser}
                  actionProvider={ActionProvider}
                />
                </div>
            </div>
        </section>
    </>
  )
}

export default Home