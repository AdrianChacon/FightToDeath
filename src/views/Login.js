import { Login } from '../ui/views/login'
import { withStateHandlers, setDisplayName, compose } from 'recompose'

// TODO: Remove legacy code, kept it just to compare with hocs
// class LoginEnhanced extends React.Component{
// 	constructor(props){
// 		super(props)
// 		this.state = {
// 			username: '',
// 			password: ''
// 		}
// 		this.onChangeUsername = event => this.setState({ username: event.target.value })
// 		this.onChangePassword = event => this.setState({ password: event.target.value })

// 	}

// 	render() {
// 		return (
// 			<Login
// 				username={ this.state.username }
// 				password={ this.state.password }
// 				onChangeUsername={ this.onChangeUsername }
// 				onChangePassword={ this.onChangePassword }
// 			/>
// 		)
// 	}
// }

const enhancer = compose(
	setDisplayName('LoginEnhanced'),
	withStateHandlers({
		email: '',
		password: ''
	}, {
		onChangeEmail: () => event => ({ email: event.target.value }),
		onChangePassword: () => event => ({ password: event.target.value })
	})
)

export default enhancer(Login)