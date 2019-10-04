import React, {Component} from 'react'
import Modal from '../../components/Modal/Modal'
const errorHandler = (WrappedComponent, axios) => {
    return class extends Component {
        state = {
            error: null
        }
componentWillMount () { 
   this.reqInterceptors = axios.interceptors.request.use(req => {
        this.setState({
            error:null
        })
        return req
    })

    this.resInterceptors = axios.interceptors.response.use(res => res, error => {
        this.setState({
            error:error
        })
    })
}


componentWillUnmount () {
    axios.interceptors.response.eject(this.resInterceptors)
    axios.interceptors.request.eject(this.reqInterceptors)
}

errorConfirmHandler = () => {
    this.setState({
        error: null
    })
}
        render() {
            return (
        
                <React.Fragment> 
    <Modal purchesable={this.state.error}
    closeModal={this.errorConfirmHandler}
    > 
                       {this.state.error ? this.state.error.message : null}
        
                    </Modal>
                <WrappedComponent {...this.props} /> 
                    
                </React.Fragment>
                    )
        }
       
    }
}


export default errorHandler