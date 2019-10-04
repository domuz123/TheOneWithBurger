import React from 'react'
import './BackDrop.css'

const backdrop = (props) => (
    <React.Fragment >
    {props.purchesable || props.drawer? 
    <div onClick = {props.clicked} className='Backdrop'></div> 
    : null}
    </React.Fragment>
)

export default backdrop