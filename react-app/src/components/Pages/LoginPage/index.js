import { useDispatch } from "react-redux"
import { login } from "../../../store/session"
import LoginForm from "../../auth/LoginForm"
import './LoginPage.css'

const LoginPage = () => {
    const dispatch = useDispatch()

    const handleDemo = async () => {
        await dispatch(login('demo@aa.io', 'password'))
    }

    return(
        <div className='login-page-container'>
            <div className='login-form-container'>
                <h2>Login as an existing user</h2>
                <LoginForm />
            </div>
            <div className='middle-text-section'>
                <h2>Or ... </h2>
            </div>
            <div className='demo-login-section'>
                <h2>Try things out as Demo User</h2>
                <button onClick={handleDemo}>Demo</button>
            </div>
        </div>
    )
}

export default LoginPage