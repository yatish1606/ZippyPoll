import { User } from "./User";

enum PollType {
    RADIO, CHECKBOX
}

export interface Poll {
    id?: string,
    title: string,
    description?: string | null,
    type: PollType,
    options: Map<string, string>,
    responses: Array<Response> | null,
    deadline: BigInt,
    createdBy: User,
    createdWhen: BigInt,
    isPublic: boolean,
    isMultipleAllowed: boolean
}