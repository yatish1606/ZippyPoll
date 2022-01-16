import axios from 'axios'
import { API_URL } from '../constants'

const getStats = (pollId: string): Promise<any> => {
    return axios.get(
        API_URL + 'api/poll/' + pollId + '/stats',
    )
    .then((res) => {
        return new Promise<any>((resolve, reject) => {
            if(res.status === 200) {
                resolve(res.data)
            } else reject()
        })
    })
}

export default getStats