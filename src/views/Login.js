import React from 'react'
import { Login } from '../ui/views/login'

class LoginEnhanced extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            username: '',
            password: ''
        }
        this.onChangeUsername = event => this.setState({ username: event.target.value })
        this.onChangePassword = event => this.setState({ password: event.target.value })

    }

    render() {
        return (
            <Login
            username={ this.state.username }
            password={ this.state.password }
            onChangeUsername={this.onChangeUsername}
            onChangePassword={this.onChangePassword}
            />
        )
    }
}

export default LoginEnhanced