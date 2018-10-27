import React from 'react'
import '../../App.css'
import { storiesOf } from '@storybook/react'
import { withKnobs, text } from '@storybook/addon-knobs/react'
import { action } from '@storybook/addon-actions'

import { Button } from './button'
import { Input } from './input'
import { VerticalLayout, HorizontalLayout } from './layouts'
import { Title } from './title'

storiesOf('Atoms', module)
	.addDecorator(withKnobs)
	.add('Button', () => <Button onClick={ action('clicked') }>soyunboton</Button>)
	.add('Input', () => <Input/>)
	.add('Vertical layout', () => <VerticalLayout height={ text('Height', '25vh') }>
		<div style={ { color: 'white', width: '35px', height: '35px', border: '3px solid white', margin: '3px' } }>a</div>
		<div style={ { color: 'white', width: '35px', height: '35px', border: '3px solid white', margin: '3px' } }>b</div>
		<div style={ { color: 'white', width: '35px', height: '35px', border: '3px solid white', margin: '3px' } }>c</div>
		<div style={ { color: 'white', width: '35px', height: '35px', border: '3px solid white', margin: '3px' } }>d</div>
	</VerticalLayout>)
	.add('Horizontal layout', () => <HorizontalLayout>
		<div style={ { color: 'white', width: '35px', height: '35px', border: '3px solid white', margin: '3px' } }>a</div>
		<div style={ { color: 'white', width: '35px', height: '35px', border: '3px solid white', margin: '3px' } }>b</div>
		<div style={ { color: 'white', width: '35px', height: '35px', border: '3px solid white', margin: '3px' } }>c</div>
		<div style={ { color: 'white', width: '35px', height: '35px', border: '3px solid white', margin: '3px' } }>d</div>
	</HorizontalLayout>)
	.add('Default', () => <Title>Figth to death</Title>)