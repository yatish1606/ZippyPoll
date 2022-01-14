import { User } from "./User";

export enum PollType {
    "RADIO", "CHECKBOX"
}

export interface Poll {
    id?: string,
    title: string,
    description?: string | null,
    type: string,
    options: Map<string, string> | Object,
    responses: Array<Response> | null,
    deadline: number,
    createdBy: User,
    createdWhen: number,
    isPublic: boolean,
    multipleAllowed: boolean
}