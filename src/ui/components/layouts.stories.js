import React from 'react'
import '../../App.css'
import { storiesOf } from '@storybook/react'
import { withKnobs, text } from '@storybook/addon-knobs/react'
import { VerticalLayout, HorizontalLayout } from './layouts'

storiesOf('Layouts', module)
	.addDecorator(withKnobs)
	.add('Vertical', () => <VerticalLayout height={ text('Height', '10vh') }>
		<span>a</span>
		<span>b</span>
		<span>c</span>
		<span>d</span>
	</VerticalLayout>)
	.add('Horizontal', () => <HorizontalLayout>
		<span>a</span>
		<span>b</span>
		<span>c</span>
		<span>d</span>
	</HorizontalLayout>)
