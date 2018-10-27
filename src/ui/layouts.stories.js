import React from 'react'
import '../App.css'
import { storiesOf } from '@storybook/react'

import { VerticalLayout, HorizontalLayout } from './layouts'

storiesOf('Layouts', module)
	.add('Vertical', () => <VerticalLayout>
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
