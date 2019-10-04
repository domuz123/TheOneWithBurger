import React, {Component} from 'react';
import './Modal.css';
import BackDrop from '../BackDrop/BackDrop'



class Modal extends Component {

  // shouldComponentUpdate (nextProps, nextState) {
  //  return nextProps.purchesable !== this.props.purchesable || nextProps.children !== this.props.children
  // }

  render() {

  

    return (
      <React.Fragment> 
      <BackDrop purchesable={this.props.purchesable} 
                // drawer={this.props.drawer}
                clicked = {this.props.closeModal}
                 />
  
       <div className='Modal' 
       style={{transform: this.props.purchesable ? 'translateY(0)': 'translateY(-100vh)', opacity: this.props.purchesable ? '1' : '0'}}
       >
   {this.props.children} 
      </div> 
  
     </React.Fragment>
   )
  }
}


  
    


export default Modal