import axios from 'axios'


const instance = axios.create({
    baseURL: 'https://burgerreplic.firebaseio.com/'
})


export default instance