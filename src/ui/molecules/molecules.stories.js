import React from 'react'
import '../../App.css'
import { storiesOf } from '@storybook/react'
import { withKnobs, text } from '@storybook/addon-knobs/react'
import { action } from '@storybook/addon-actions'
import { InputGroup } from './InputGroup'

storiesOf('Molecules/Input Group', module)
	.addDecorator(withKnobs)
	.add('Input Group', () => <InputGroup
		onChange={ action('change') }
		value={ text('Input value', '') }
		placeholder={ text('Input placeholder', 'e-mail') }
		error={ text('Input error', 'error') }
		label={ text('Input label', 'User email') }
	/>)
