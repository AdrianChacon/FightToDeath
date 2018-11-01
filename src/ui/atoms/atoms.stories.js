import React from 'react'
import '../../App.css'
import { storiesOf } from '@storybook/react'
import { withKnobs, text } from '@storybook/addon-knobs/react'
import { action } from '@storybook/addon-actions'

import { Button } from './button'
import { Input } from './input'
import { VerticalLayout, HorizontalLayout } from './layouts'
import { Title } from './title'

storiesOf('Atoms/Forms', module)
	.add('Input', () => <Input/>)

storiesOf('Atoms/Labels', module)
	.add('Title', () => <Title>Figth to death</Title>)

storiesOf('Atoms/Buttons', module)
	.addDecorator(withKnobs)
	.add('Button', () => <Button onClick={ action('clicked') }>Im a button</Button>)

storiesOf('Atoms/Layout')
	.addDecorator(withKnobs)
	.add('Layout/Vertical layout', () => <VerticalLayout height={ text('Height', '25vh') }>
		<div style={ { color: 'white', width: '35px', height: '35px', border: '3px solid white', margin: '3px', display: 'flex', justifyContent: 'center', alignItems: 'center' } }>a</div>
		<div style={ { color: 'white', width: '35px', height: '35px', border: '3px solid white', margin: '3px', display: 'flex', justifyContent: 'center', alignItems: 'center' } }>b</div>
		<div style={ { color: 'white', width: '35px', height: '35px', border: '3px solid white', margin: '3px', display: 'flex', justifyContent: 'center', alignItems: 'center' } }>c</div>
		<div style={ { color: 'white', width: '35px', height: '35px', border: '3px solid white', margin: '3px', display: 'flex', justifyContent: 'center', alignItems: 'center' } }>d</div>
	</VerticalLayout>)
	.add('Layout/Horizontal layout', () => <HorizontalLayout>
		<div style={ { color: 'white', width: '35px', height: '35px', border: '3px solid white', margin: '3px', display: 'flex', justifyContent: 'center', alignItems: 'center' } }>a</div>
		<div style={ { color: 'white', width: '35px', height: '35px', border: '3px solid white', margin: '3px', display: 'flex', justifyContent: 'center', alignItems: 'center' } }>b</div>
		<div style={ { color: 'white', width: '35px', height: '35px', border: '3px solid white', margin: '3px', display: 'flex', justifyContent: 'center', alignItems: 'center' } }>c</div>
		<div style={ { color: 'white', width: '35px', height: '35px', border: '3px solid white', margin: '3px', display: 'flex', justifyContent: 'center', alignItems: 'center' } }>d</div>
	</HorizontalLayout>)