import React, { Fragment, useState } from 'react'

import { Home } from '../layout'

function AuthGuard({ children }: { children: JSX.Element }) {

    const [isAuthenticated, setIsAuthenticated] = useState(true)

    return isAuthenticated ?
        <Fragment>{children}</Fragment>
        : <div></div>
}

export default AuthGuard
