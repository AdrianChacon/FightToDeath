import React from 'react'
import '../../App.css'
import { storiesOf } from '@storybook/react'

import { Title } from './title'

storiesOf('Title', module)
	.add('Default', () => <Title>Figth to death</Title>)
