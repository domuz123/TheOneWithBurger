import React from 'react';
import './Navitems.css'
import  { NavLink } from 'react-router-dom'


const navbar = () => (

    <div className='Navitems'>
    <ul className='NavigationItem'> 
    <li> <NavLink  exact activeClassName='active' to='/'>Burger</NavLink></li>
    <li > <NavLink to='/orders'> Orders </NavLink > </li> </ul>
      
    </div>
)

export default navbar