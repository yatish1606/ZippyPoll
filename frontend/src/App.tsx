import React from 'react'
import { HashRouter, Switch, Route } from 'react-router-dom'
import AuthGuard from './components/AuthGuard'
import Sidebar from './components/Sidebar'
import { Home } from './layout'

function App(): JSX.Element {
  return (
    <div className='w-screen h-screen flex flex-row'>
      <HashRouter>
        <Switch>
          <Sidebar />
        </Switch>
        <div className="flex-1">
          <AuthGuard>
            <Switch>
              <Route path="/home" component={Home} />
            </Switch>
          </AuthGuard>
        </div>
      </HashRouter>
    </div>

  )
}

export default App
