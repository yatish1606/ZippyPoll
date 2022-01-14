import { More, Star1, TickSquare } from 'iconsax-react'
import React, { Fragment, useEffect, useState } from 'react'
import { useParams } from 'react-router'
import addResponse from '../actions/addResponse'
import getIP from '../actions/getIP'
import getPoll from '../actions/getPoll'
import ButtonPrimary from '../components/ButtonPrimary'
import ButtonSecondary from '../components/ButtonSecondary'
import { Poll } from '../models/Poll'
import { getDuration, isObjectEmpty } from '../utils'
import AvatarGroup from '@atlaskit/avatar-group'

interface AvatarInfo {
    key: string | number,
    name: string,
    enableTooltip: boolean
}

function PollScreen({ }) {

    const [selectedOption, setSelectedOption] = useState<{ [key: string | number]: string | undefined } | null>(null)
    const [poll, setPoll] = useState<Poll | null>(null)
    const [ipInfo, setIPInfo] = useState<string>('')
    const [avatarInfo, setAvatarInfo] = useState<Array<AvatarInfo> | null>(null)
    const params = useParams()

    useEffect(() => {
        if (params && params.pollId) {
            getPoll(params.pollId)
                .then((res: Poll) => {
                    setPoll(res)
                    console.log(poll)
                    setAvatarInfo(
                        poll?.responses?.length ?
                            new Array(poll.responses.length).slice(0, 5).map((_: any, index: number) => {
                                return {
                                    key: index,
                                    name: index + '',
                                    enableTooltip: false
                                }
                            })
                            : null
                    )
                })
        }
        getIP()
            .then((res) => {
                setIPInfo(res)
            })
    }, [])

    const selectOptions = (key: string, value: string): void => {
        if (poll?.type === "RADIO") {
            setSelectedOption(selectedOption?.hasOwnProperty(key) ? {} : { [key + '']: value })
        } else {
            let prevState = selectedOption || {}
            if (selectedOption?.hasOwnProperty(key)) {
                const { [key]: _, ...withoutKey } = prevState
                setSelectedOption({ ...withoutKey })
            } else {
                setSelectedOption({ ...prevState, [key + '']: value })
            }
        }
    }

    const submitResponse = (): void => {
        const responseData = {
            selectedOption,
            ipAddress: ipInfo
        }
        if (poll?.id && ipInfo) {
            addResponse(poll.id, responseData)
                .then((res) => {
                    console.log(res)
                })
                .catch(() => {
                    console.log('Already posted answer')
                })
        }
    }

    console.log(selectedOption, avatarInfo)

    return poll ? (
        <div className='w-full h-screen overflow-hidden bg-neutral-200 transition-all flex flex-col items-center justify-center'>
            <div className="w-fit min-w-[50vw]  p-6 rounded-sm bg-white flex flex-col">
                <div className="flex flex-row items-center justify-between">
                    <div className="flex items-center">
                        <div className="w-8 h-8 rounded-full flex items-center justify-center overflow-hidden bg-green-700">
                            {
                                poll.createdBy.profilePicture ?
                                    <img src={poll.createdBy.profilePicture} alt="alt" />
                                    : <p className="text-white font-medium text-sm tracking-wider">{poll.createdBy.firstName.charAt(0) + poll.createdBy.lastName.charAt(0)}</p>
                            }
                        </div>
                        <div className="w-3"></div>
                        <div className="flex flex-col">
                            <p className="text-sm text-slate-500 tracking-normal font-normal">asked by <span className='font-semibold text-slate-700 cursor-pointer'>{poll.createdBy.firstName} {poll.createdBy.lastName}</span></p>
                            <p className="text-xs text-slate-400 mt-1 tracking-normal">{getDuration(poll.createdWhen, true).value} {getDuration(poll.createdWhen, true).unit} ago</p>
                        </div>
                    </div>
                    <div className="flex items-center">
                        <ButtonSecondary iconBefore={<Star1 size={19} />} />
                        <div className="w-3"></div>
                        <ButtonSecondary title='Share poll' />
                        {/* <div className="w-3"></div>
                        <ButtonSecondary iconBefore={<More className='rotate-90' size={18} />} /> */}
                    </div>
                </div>
                <div className="h-6"></div>
                <p className="text-xl text-slate-700 font-semibold">{poll.title}</p>
                {poll.description ? <div className="h-2"></div> : null}
                {poll.description ? <p className="text-sm tracking-wide text-slate-500 font-normal mt-3">{poll.description}</p> : null}
                <div className="h-4"></div>
                <form action="POST">
                    {
                        Object.entries(poll.options).map((entry: [string, string], index: number) => {
                            const [key, value] = entry
                            const activeColor = selectedOption?.hasOwnProperty(key) ? 'text-green-600 border-green-600' : ''
                            const bgColor = selectedOption?.hasOwnProperty(key) ? 'bg-green-600' : ''
                            return (
                                <div key={index} className='flex flex-row items-center mt-4 text-slate-600 hover:text-slate-700 transition-all w-fit cursor-pointer' onClick={() => selectOptions(key, value)}>
                                    {
                                        poll.multipleAllowed ?
                                            <div className={`h-4 w-4 rounded-sm border-2 overflow-hidden relative border-slate-300 ${activeColor} ${bgColor} flex items-center justify-center transition-all`}>
                                                <TickSquare className='text-white w-5 h-5 absolute' />
                                            </div>
                                            :
                                            <div className={`h-4 w-4 rounded-full border-2 border-slate-300 ${activeColor} flex items-center justify-center transition-all`}>
                                                <div className={`h-2 w-2 rounded-full ${bgColor} bg-green-600 transition-all`} style={{ display: activeColor.length ? 'flex' : 'none' }}></div>
                                            </div>
                                    }

                                    <div className="w-4"></div>
                                    <p className={`text-sm font-normal tracking-wide transition-all ${activeColor}`}>{value}</p>
                                </div>
                            )
                        })
                    }
                    <div className="h-10"></div>
                    <div className="flex flex-row items-center justify-between">
                        <div className="flex flex-row items-center">
                            <AvatarGroup isTooltipDisabled={true} size='xsmall' appearance="stack" data={new Array(poll.responses).slice(0, 5).map((_: any, index: number) => ({
                                key: index, name: index + '', enableTooltip: false
                            })
                            )} />
                            <div className="w-1"></div>
                            <p className="text-xs text-slate-400 font-normal tracking-wide">{poll.responses?.length && (poll?.responses?.length > 5 ? poll.responses.length - 5 : poll.responses.length)} vote {poll.responses?.length && poll.responses?.length > 1 ? 's' : ''}</p>
                            <div className="w-2"></div>
                            <div className="w-1 h-1 rounded-full bg-slate-400"></div>
                            <div className="w-2"></div>
                            <p className="text-xs text-slate-400 font-normal tracking-wide">
                                {
                                    getDuration(poll.deadline, false).value > 0 ?
                                        <Fragment>{getDuration(poll.deadline, false).value} {getDuration(poll.deadline, false).unit} left</Fragment>
                                        : <Fragment>poll expired</Fragment>
                                }</p>
                        </div>
                        <div className="flex flex-row items-center">
                            <div className="w-4"></div>
                            <ButtonPrimary title="Submit" disabled={isObjectEmpty(selectedOption)} onClick={() => submitResponse()} />
                        </div>
                    </div>
                </form>
            </div>
        </div>
    ) : <div>loading poll ...</div>
}

export default PollScreen

