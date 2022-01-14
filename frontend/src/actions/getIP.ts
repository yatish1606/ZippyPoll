import axios from 'axios'

const getIP = () => {
    return axios.get('https://geolocation-db.com/json/')
    .then((res) => {
        return new Promise<any>((resolve, reject) => {
            if(res.status === 200) {
                resolve(res.data.IPv4)
            } else reject()
        })
    })
}

export default getIP