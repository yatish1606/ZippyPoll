const isObjectEmpty = (object: Object | null) => {
    if(!object) return true
    for( var key in object) {
        if(object.hasOwnProperty(key))
            return false
    }
    return true
}

export default isObjectEmpty