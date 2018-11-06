import { Login } from '../ui/views/login'
import { withStateHandlers, setDisplayName, compose, withHandlers } from 'recompose'
import axios from 'axios'

const enhancer = compose(
	setDisplayName('LoginEnhanced'),
	withStateHandlers({
		email: '',
		password: '',
		emailError: null,
		passwordError: null
	}, {
		onChangeEmail: () => event => ({ email: event.target.value, emailError: null }),
		onChangePassword: () => event => ({ password: event.target.value, passwordError: null }),
		setEmailError: () => error => ({ emailError: error }),
		setPasswordError: () => error => ({ passwordError: error })
	}),
	withHandlers({
		submitLogin: ({ email, password, setEmailError, setPasswordError }) => () => {
			if (!email)	setEmailError('Required') 
			if (!password) setPasswordError('Required')
			if (!email || !password) return
			axios.post('http://localhost:4000/api/login', {
				code: btoa(email + ':' + password)
			}).then(console.log)
				.catch(({ response }) => {
					const { data } = response
					const { errors } = data

					if (errors.includes('email')) setEmailError('Wrong')
					if (errors.includes('password')) setPasswordError('Wrong')
				})
		} })
)

export default enhancer(Login)