import React from 'react'
import Logo from '../Logo/Logo'
import Navitems from '../Navbar/Navitems'
import SideDrawer from '../SideDrawer/SideDrawer'
import './Toolbar.css'
import BackDrop from '../../BackDrop/BackDrop'

const toolbar = (props) => (
    

            <div className='Toolbar'>
            <BackDrop drawer={props.drawer} 
                      clicked={props.handleDrawerState}/>
            <div className='DrawerToggle' 
                 onClick={() => props.handleDrawerState()}> 
            <div>
              </div>
              <div>
              </div>
              <div>
              </div>
              </div>
              <div className= 'DesktopOnly' style={{display: props.drawer? 'inline': 'none'}}>
              <SideDrawer drawer={props.drawer}/>
              </div>
              <div className='N'>
              <Navitems />
              </div>
              <Logo />
            </div>
        )
  
export default toolbar