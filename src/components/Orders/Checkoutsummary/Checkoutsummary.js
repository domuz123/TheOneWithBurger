import React from 'react'
import BurgerBuilder from '../../../contaniers/BurgerContainer/BurgerBuilder'
import './Checkoutsummary.css'
import Toolbar from '../../Navigation/Toolbar/Toolbar'



const checkout = (props) =>  {
      
    
        return (
         <React.Fragment>
             <Toolbar   drawer={props.drawer} 
                        handleDrawer={props.handleDrawerState} />
               <div className='Checkoutsummary'style={{textAlign:'center'}}>
               <h1>Your tasty hambruger!</h1>
           <BurgerBuilder ingredients={props.ingredients}/>
         <div>  {parseFloat(props.price).toFixed(2)}$ </div>
        <button className='Button' onClick={() => props.checkoutCancel()}>Cancel</button>
        <button className='Button'  onClick={()=>props.checkoutContinue()}>Continue</button>
          </div>
</React.Fragment> 
      )

        }


export default checkout