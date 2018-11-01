import React from 'react'
import {
	Button,
	Title,
	VerticalLayout,
	HorizontalLayout
} from '../atoms'
import { InputGroup } from '../molecules/InputGroup'

const Login = ({ email, password, onChangeEmail, onChangePassword, emailError, passwordError }) => {
	return (
	<>
		<VerticalLayout height='20vh'>
			<Title align='center'>Fight To Death</Title>
		</VerticalLayout>
		<VerticalLayout height='60vh' justify='center' padding>
			<InputGroup
				label='e-mail'
				placeholder='e-mail'
				value={ email }
				onChange={ onChangeEmail }
				error={ emailError }
			/>
			<InputGroup
				password
				label='Password'
				placeholder='password'
				value={ password }
				onChange={ onChangePassword }
				error={ passwordError }
			/>
		</VerticalLayout>
		<VerticalLayout height='20vh'>
			<HorizontalLayout justify='space-around'>
				<Button>Login</Button>
				<Button>Sign Up</Button>
			</HorizontalLayout>
		</VerticalLayout>
  </>
	)
}

export { Login }