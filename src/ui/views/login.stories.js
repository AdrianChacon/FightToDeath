import React from 'react'
import '../../App.css'
import { storiesOf } from '@storybook/react'
import { withKnobs, text } from '@storybook/addon-knobs/react'
import { Login } from './login'

storiesOf('Views/Login', module)
	.addDecorator(withKnobs)
	.add('Login', () => <Login
		email={ text('Email value', '') }
		password={ text('Password value', '') }
		emailError={ text('Email error', '') }
		passwordError={ text('Password error', '') }
	/>)