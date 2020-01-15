import React, { Component } from 'react';  
import  './loginpage.css';
import Img from './a.jpg'
class LoginPage extends Component {  
  render() { 
    function HI(){
    console.log(window.innerWidth);
  } 
    return (
    <div className="container">
      <img src={Img} height="100px" width="100px"/><br/>
      <input type="text" placeholder="username"/><br/><br/>
      <input type="password" placeholder="password"/><br/><br/>
      <input type="submit" value="submit" onClick={HI}/>
    </div>
    )
  }  
}  
export default LoginPage;    