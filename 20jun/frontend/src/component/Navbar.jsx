import React from 'react'
import { Link } from 'react-router-dom'

const Navbar = () => {
  return (
   <div style={{display:"flex", justifyContent:"space-between", backgroundColor:"lightGray",color:"black",top:'0',left:'0',position:'absolute',width:'100%'}}>
     <Link to='/register'>Register</Link>
     <Link to='/login'>Login</Link>
     <Link to='/create'>Create</Link>
     <Link to='/library'>View</Link>
   </div>
  )
}

export default Navbar