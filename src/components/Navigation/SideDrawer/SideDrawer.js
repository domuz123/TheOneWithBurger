import React from 'react'
import './SideDrawer.css'
import BackDrop from '../../BackDrop/BackDrop'
import Logo from '../Logo/Logo'

const sideDrawer = (props) => (

    <React.Fragment>

        <BackDrop />
       <div className='SideDrawer' style={{display: props.drawer? 'inline': 'none'}} >
       <ul className='NavigationItem'> 
       <li > <a href='/'>Burger</a></li>
       <li > <a href='/'> Checkout</a> </li> </ul>
       
       </div>
    </React.Fragment>
)

export default sideDrawer