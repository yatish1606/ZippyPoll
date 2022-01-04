import axios, { AxiosResponse } from "axios"
import { API_URL } from "../constants"
import { Poll } from "../models/Poll"


const fetchPolls = ({
    sortBy,
    pageId = 1,
    byUser = null,
    searchQuery = ''
}: {
    sortBy: string,
    pageId?: number,
    byUser?: string | null,
    searchQuery?: string
}): Promise<Array<Poll> | null> => {

    axios.get(
        API_URL + 'api/poll',
        {
            params: {
                sortBy,
                pageId,
                byUser: byUser || null,
                searchQuery: searchQuery || null
            }
        }
    ).then((response: AxiosResponse<any, any>) => {
        console.log(response)
    })
    return new Promise<Array<Poll> | null>((resolve, reject) => {

    })
}

export default fetchPolls