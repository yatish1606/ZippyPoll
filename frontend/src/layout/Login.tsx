import { Graph } from 'iconsax-react'
import React, { Fragment, useState } from 'react'
import GoogleIcon from '../assets/google-icon.png'
import { GoogleLogin } from 'react-google-login'
import { User } from '../models/User'
import login from '../actions/login'
import signUp from '../actions/sign-up'
import { useAuth } from '../context/UserContext'
import { Navigate } from 'react-router'

const OAUTH_CLIENT_ID = '40669521935-l3jhjpua00vdk2epjlvgi685nn70fvlq.apps.googleusercontent.com'

function Login() {

    const [isButtonLoading, setIsButtonLoading] = useState<boolean>(false)
    const [user, setUser] = useState<User | null>(null)
    const { userAuthState, setUserAuth } = useAuth()
    const [toRedirect, setToRedirect] = useState<boolean>(false)
    // const history = useHistory()

    const Logo = (): JSX.Element => {
        return <div className='w-16 h-16 rounded-md flex items-center justify-center bg-green-600'>
            <Graph size={26} className='text-white rotate-45' />
        </div>
    }

    const responseGoogle = (e: any) => {
        const userData: User | null = e.hasOwnProperty('profileObj') ? {
            email: e.profileObj.email,
            firstName: e.profileObj.givenName,
            lastName: e.profileObj.familyName,
            profilePicture: e.profileObj.imageUrl
        } : null
        setIsButtonLoading(true)
        setUser(userData)

        if (userData) {
            login(userData.email)
                .then((res: any) => {
                    // console.log('user found', res)
                    // user already exists, so log in
                    console.log(res)
                    setUserAuth({
                        isLoggedIn: true,
                        user: res
                    })
                    setIsButtonLoading(false)
                    setToRedirect(true)
                })
                .catch(() => {
                    console.log('account no exist. Gonya create user')
                    setToRedirect(false)
                    signUp(userData)
                        .then((res: any) => {
                            console.log('user signed up', res)
                            setIsButtonLoading(false)
                            console.log(userAuthState)
                        })
                        .catch(() => console.log('error creating user'))
                })
                .finally(() => {
                    // console.log(userAuthState)
                    // setToRedirect(true)
                    //history.push('/home')
                })
        }
    }

    return toRedirect ? <Navigate to={"/app/home"} /> : (
        <div className='flex flex-row-reverse w-screen h-screen overflow-hidden'>
            <div className="flex flex-col w-3/5 items-center justify-center py-[5%]">
                <div className="w-full h-24 flex items-center justify-center ">
                    <Logo />
                </div>
                {userAuthState.isLoggedIn ? 'woohoo' : 'not loged in :()'}
                <p className="text-slate-800 text-2xl leading-loose tracking-wide font-black">pollzap</p>
                <p className="text-slate-500 text-sm tracking-wide leading-relaxed">polling made easy</p>
                <div className="h-4"></div>
                <div className="flex flex-col w-3/5 h-full flex-1 items-center">
                    <div className="flex flex-col items-center w-full">
                        <p className="text-slate-700 text-2xl text-center mt-16 leading-loose tracking-normal font-black">Effortlessly create quick polls. <br /> Make <i>fast decisions</i></p>
                        <p className="text-slate-500 text-sm tracking-wide text-center mt-3 leading-relaxed">Pollzap allowes you to quickly create polls, share them with others and view results in <i>real-time</i></p>
                        <div className="h-20"></div>
                        <GoogleLogin
                            clientId={OAUTH_CLIENT_ID}
                            buttonText="Login"
                            onSuccess={responseGoogle}
                            onFailure={responseGoogle}
                            cookiePolicy={'single_host_origin'}
                            render={renderProps => (
                                <button className='w-full outline-none text-slate-500 justify-center font-medium text-sm flex flex-row items-center rounded-sm py-3 px-4 bg-gray-100 hover:bg-gray-200 transition-all cursor-pointer' onClick={renderProps.onClick} disabled={renderProps.disabled}>
                                    {isButtonLoading ? '...'
                                        :
                                        <Fragment>
                                            <img src={GoogleIcon} width={20} />
                                            <div className="w-3"></div>
                                            Sign-in with Google
                                        </Fragment>

                                    }
                                </button>
                            )}
                        />
                    </div>
                </div>
            </div>
            <div className="flex flex-col w-2/5 items-center justify-center bg-slate-100"></div>
        </div>
    )
}

export default Login
