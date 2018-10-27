import React from 'react'
import '../../App.css'
import { storiesOf } from '@storybook/react'
import { action } from '@storybook/addon-actions'

import { Button } from './button'

storiesOf('Button', module)
	.add('with text', () => <Button onClick={ action('clicked') }>soyunboton</Button>)
