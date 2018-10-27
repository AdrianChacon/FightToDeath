import React from 'react'
import '../../App.css'
import { storiesOf } from '@storybook/react'
import { withKnobs } from '@storybook/addon-knobs/react'
import { Login } from './login'

storiesOf('Views', module)
	.addDecorator(withKnobs)
	.add('Login', () => <Login/>)