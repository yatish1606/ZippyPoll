import axios from 'axios'
import { API_URL } from '../constants'
import { User } from '../models/User'

const signUp = (user: User): Promise<any> => {
    return axios.post(
        API_URL + 'api/user', {
            ...user
        }
    ).then(res => {
        return new Promise((resolve, reject) => {
            if(res.status === 201) {
                resolve(user)
            } else reject()
        })
    })
}

export default signUp