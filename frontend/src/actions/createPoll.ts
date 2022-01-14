import { Poll } from "../models/Poll"
import axios from 'axios'
import { API_URL } from "../constants"

const createPoll = (poll: Poll): Promise<any> => {
    
    return axios.post(API_URL + 'api/poll', {
        ...poll
    })
    .then(res => {
        console.log(res)
        return new Promise<any>((resolve, reject) => {
            if(res.status === 201)
                resolve(res.data)
            else reject()
        })
    })
    .catch(() => console.log('err'))
}

export default createPoll