const getDuration = (milli: number, before: boolean = true) => {
    milli = before ? new Date().getTime() - milli : milli - new Date().getTime()
    let minutes = Math.floor(milli / 60000);
    let hours = Math.round(minutes / 60);
    let days = Math.round(hours / 24);
  
    return (
        (days === 1 && {value: days, unit: 'day'}) ||
        (days && {value: days, unit: 'days'}) ||
        (hours === 1 && {value: hours, unit: 'hour'}) ||
        (hours && {value: hours, unit: 'hours'}) ||
        {value: minutes, unit: 'minutes'}
    )
}

export default getDuration