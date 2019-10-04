import React, {Component} from 'react'
import './Contactdata.css'


class Contactdata extends Component {

render () {
    return (
        <div className='Contactdata'>
        <div> 
            <p>Enter your contact data</p>
            </div>
            <form> 
            <strong>Name: </strong> <input className='Input'  name='name' placeholder='Your name'/> 
            <strong>Email: </strong>   <input className='Input' name='email' placeholder='Your email'/> 
            <strong>Address: </strong> <input className='Input' name='address' placeholder='Your addres'/> 
            <strong>Street: </strong>   <input className='Input' name='street' placeholder='Your street'/> 
            <strong>Credit cart number: </strong>   <input className='Input' name='street' placeholder=''/> 
                <button className='Button'> Pay</button>
            </form>
        </div>
    )
}

}


export default Contactdata