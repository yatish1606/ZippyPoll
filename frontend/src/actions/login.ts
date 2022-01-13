import axios from 'axios'
import { API_URL } from '../constants'

const login = (email: string): Promise<any> => {
    return axios.post(
        API_URL + `api/auth/login/${email}`
    ).then(res => {
        return new Promise<any>((resolve, reject) => {
            if(res.status === 200) {
                resolve(res.data)
            } else reject()
        })
    })
}

export default login