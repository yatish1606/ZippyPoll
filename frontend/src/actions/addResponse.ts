import axios from 'axios'
import { API_URL } from '../constants'

const addResponse = (pollId: string, response: any): Promise<any> => {
    return axios.post(
        API_URL + `api/poll/${pollId}/response`,
        { ...response }
    )
    .then((res) => {
        return new Promise<any>((resolve, reject) => {
            if(res.status === 200) {
                resolve(res.data)
            } else reject()
        })
    })
}

export default addResponse