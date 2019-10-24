import React from 'react'
import './SideDrawer.css'
import BackDrop from '../../BackDrop/BackDrop'
import Logo from '../Logo/Logo'

const sideDrawer = (props) => (

    <React.Fragment>

        <BackDrop />
        
       <div className='SideDrawer' style={{display: props.drawer? 'inline': 'none'}} >
       <div style={{height:'70px', paddingLeft:'25px'}}>
       <Logo />  </div>
       <ul className='NavigationItem'> 
       <li > <a href='/'>Burger</a></li>
       <li > <a href='/'> Orders</a> </li> </ul>
      
       </div>
    </React.Fragment>
)

export default sideDrawer