import React from 'react'
import { Button } from '../components/button'
import { Input } from '../components/input'
import { Title } from '../components/title'
import { Label } from '../components/label'
import { VerticalLayout, HorizontalLayout } from '../components/layouts'

const Login = ({username, password, onChangeUsername, onChangePassword}) => {
	return (
    <>
      <VerticalLayout height='20vh'>
      	<Title align='center'>Fight To Death</Title>
      </VerticalLayout>
	<VerticalLayout height='60vh' justify='center' padding>
		<Label>E-mail</Label>
		<Input placeholder='E-mail' value={username} onChange={onChangeUsername}/>
		<Label>Password</Label>
		<Input type='password' placeholder='Password' value={password} onChange={onChangePassword}/>
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