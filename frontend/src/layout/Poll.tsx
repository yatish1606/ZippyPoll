import { Star1, TickSquare } from 'iconsax-react'
import React, { Fragment, useEffect, useState } from 'react'
import { useParams } from 'react-router'
import addResponse from '../actions/addResponse'
import getIP from '../actions/getIP'
import getPoll from '../actions/getPoll'
import { Poll } from '../models/Poll'
import { getDuration, isObjectEmpty } from '../utils'
import AvatarGroup from '@atlaskit/avatar-group'
import { Loading, ButtonPrimary, ButtonSecondary } from '../components'
import getStats from '../actions/getStats'

interface PollStat {

}

function PollScreen({ }) {

    const [selectedOption, setSelectedOption] = useState<{ [key: string | number]: string | undefined } | null>(null)
    const [poll, setPoll] = useState<Poll | null>(null)
    const [ipInfo, setIPInfo] = useState<string>('')
    const [responseGiven, setResponseGiven] = useState<boolean>(false)
    const [responseSuccess, setResponseSuccess] = useState<boolean>(false)
    const [pollStats, setPollStats] = useState<Map<number, { count: number, percentage: number }>>(new Map())
    const params = useParams()

    useEffect(() => {
        if (params && params.pollId) {
            getPoll(params.pollId)
                .then((res: Poll) => {
                    setTimeout(() => {
                        setPoll(res)
                    }, 1000);
                    console.log(poll)
                })
        }
        getIP()
            .then((res) => {
                setIPInfo(res)
            })
    }, [])

    console.log(poll)

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
                    setResponseSuccess(true)
                    if (poll.id) {
                        getStats(poll?.id)
                            .then((res) => {
                                console.log(res)
                                let myMap = new Map(pollStats?.entries())
                                Object.entries(res).map((entry: [key: string, value: any]) => {
                                    myMap.set(parseInt(entry[0]), entry[1])
                                })
                                setTimeout(() => {
                                    setPollStats(myMap)
                                }, 1000)
                            })
                    }
                })
                .catch(() => {
                    console.log('Already posted answer')
                    setResponseSuccess(false)
                })
                .finally(() => setResponseGiven(true))
        }
    }

    console.log(pollStats)

    return (
        <div className='w-full h-screen overflow-hidden bg-gray-200 transition-all flex flex-col items-center justify-center'>
            <div className="w-fit min-w-[50vw]  p-8 rounded-sm bg-white flex flex-col transition-all">
                {
                    poll && !responseGiven ?
                        <Fragment>
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
                                </div>
                            </div>
                            <div className="h-8"></div>
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
                                            <div key={index} className='flex flex-row items-center mt-4 text-slate-500 hover:text-slate-800 transition-all w-fit cursor-pointer' onClick={() => selectOptions(key, value)}>
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
                                        {
                                            poll?.responses?.length ?
                                                <Fragment>
                                                    <AvatarGroup isTooltipDisabled={true} size='xsmall' appearance="stack" data={new Array(poll.responses).slice(0, 5).map((_: any, index: number) => ({
                                                        key: index, name: index + '', enableTooltip: false
                                                    })
                                                    )} />
                                                    <div className="w-1"></div>
                                                    <p className="text-xs text-slate-400 font-normal tracking-wide">{poll.responses?.length && (poll?.responses?.length > 5 ? poll.responses.length - 5 : poll.responses.length)} vote{poll.responses?.length && poll.responses?.length > 1 ? 's' : ''}</p>
                                                </Fragment>
                                                : <p className="text-xs text-slate-400 font-normal tracking-wide">no votes yet</p>
                                        }
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
                        </Fragment>
                        : !responseGiven && !poll
                            ? <Loading />
                            : responseGiven && responseSuccess && poll?.showResults && !pollStats.size
                                ? <Loading /> : responseGiven && responseSuccess && poll?.showResults && pollStats.size
                                    ? <div className='w-full flex flex-col'>
                                        <div className="w-full flex flex-row items-center justify-between">
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
                                            </div>
                                        </div>
                                        <div className="h-8"></div>
                                        <p className="text-xl text-slate-700 font-semibold">{poll.title}</p>
                                        {poll.description ? <div className="h-2"></div> : null}
                                        {poll.description ? <p className="text-sm tracking-wide text-slate-500 font-normal mt-3">{poll.description}</p> : null}
                                        <div className="h-8"></div>
                                        {
                                            Object.entries(poll.options).map((entry: [key: string, value: any]) => {
                                                console.log(selectedOption && selectedOption[entry[0]])
                                                const isSelected = (selectedOption && selectedOption[entry[0]]) ? true : false
                                                const activeBGColor = isSelected ? 'bg-green-100 text-green-700' : 'bg-gray-100'
                                                const activeBorderColor = isSelected ? 'border-green-600' : ''
                                                return pollStats?.has(parseInt(entry[0])) ? (
                                                    <div className={`flex flex-row items-center justify-between w-full min-h-[3rem] my-2 border-0 border-gray-200 rounded-sm`}>
                                                        <div className="flex flex-row items-center w-full h-full">
                                                            <div className={`h-full border-r-0 border-gray-200 flex items-center w-16 ${activeBorderColor}`}>
                                                                <p className={`align-centre text-[1.1rem] font-semibold p-3 pl-0 ${isSelected ? 'text-green-600' : 'text-slate-700'}`}>
                                                                    {pollStats.get(parseInt(entry[0]))?.percentage} <span className='text-sm'>%</span>
                                                                </p>
                                                            </div>
                                                            <div className="flex flex-row w-full items-center h-full relative">
                                                                <div className={`rounded-sm h-full p-2 flex items-center ${activeBGColor}`} style={{ width: pollStats?.get(parseInt(entry[0]))?.percentage + '%' || 0 }}>
                                                                </div>
                                                                <p className={`absolute left-3 text-sm font-normal my-2 ${isSelected ? 'text-slate-800' : 'text-slate-500'}`}>
                                                                    {entry[1]}
                                                                </p>
                                                            </div>
                                                        </div>
                                                        <p className="w-24 whitespace-nowrap align-centre text-sm text-slate-700 font-medium p-3 text-right">
                                                            {pollStats.get(parseInt(entry[0]))?.count} votes
                                                        </p>
                                                    </div>
                                                ) : null
                                            })
                                        }
                                    </div>
                                    : responseGiven && responseSuccess ?
                                        <div className='w-full flex flex-col items-center'>
                                            <p className="text-2xl text-slate-700 font-bold">Your answer was saved</p>
                                            <div className="h-4"></div>
                                            <p className="text-sm text-slate-400">The poll creator has set the results to be private</p>
                                            <div className="h-10"></div>
                                            <div className="flex items-center">
                                                <ButtonSecondary title='Close this screen' />
                                                <div className="w-3"></div>
                                                <ButtonPrimary title='Create a poll' />
                                            </div>
                                        </div> :
                                        <div className='w-full flex flex-col items-center'>
                                            <p className="text-2xl text-slate-700 font-bold">Your answer couldn't be saved</p>
                                            <div className="h-10"></div>
                                            <div className="flex flex-col items-start">
                                                <p className="text-sm text-slate-400">Possible reasons could be</p>
                                                <ul className='list-inside list-disc mt-4'>
                                                    <li className="text-sm text-slate-400 leading-6">You have already answered this poll</li>
                                                    <li className="text-sm text-slate-400 leading-6">This poll has expired</li>
                                                    <li className="text-sm text-slate-400 leading-6">There's a network issue at our end</li>
                                                </ul>
                                            </div>
                                            <div className="h-10"></div>
                                            <div className="flex items-center">
                                                <ButtonSecondary title='Refresh this screen' onClick={() => window.location.reload()} />
                                                <div className="w-3"></div>
                                                <ButtonPrimary title='Create a poll' />
                                            </div>
                                        </div>
                }
            </div>
        </div>
    )
}

export default PollScreen

