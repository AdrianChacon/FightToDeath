import React from 'react'
import '../../App.css'
import { storiesOf } from '@storybook/react'

import { Input } from './input'

storiesOf('Input', module)
	.add('Default', () => <Input/>)
