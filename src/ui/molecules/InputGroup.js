import React from 'react'
import PropTypes from 'prop-types'
import { HorizontalLayout, Label, Input, VerticalLayout } from '../atoms'

const InputGroup = ({ value, onChange, error, placeholder, label, password }) => (
	<VerticalLayout>
		<HorizontalLayout justify='space-between'><Label>{label}</Label>{error && <Label error>{error}</Label>}</HorizontalLayout>
		<Input
			error={ error && !!error.length }
			placeholder={ placeholder }
			value={ value }
			onChange={ onChange }
			type={ password ? 'password' : 'text' }/>
	</VerticalLayout>
)

InputGroup.propTypes = {
	value: PropTypes.string,
	onChange: PropTypes.func,
	error: PropTypes.string,
	placeholder: PropTypes.string,
	label: PropTypes.string.isRequired,
	password: PropTypes.bool
}

export { InputGroup }