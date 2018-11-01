import React from 'react'
import PropTypes from 'prop-types'
import { HorizontalLayout, Label, Input, VerticalLayout } from '../atoms'

const InputGroup = ({ value, onChange, error, placeholder, label }) => (
	<VerticalLayout>
		<HorizontalLayout justify='space-between'><Label>{label}</Label>{error && <Label error>{error}</Label>}</HorizontalLayout>
		<Input error={ !!error.length } placeholder={ placeholder } value={ value } onChange={ onChange }/>
	</VerticalLayout>
)

InputGroup.propTypes = {
	value: PropTypes.string,
	onChange: PropTypes.func,
	error: PropTypes.string,
	placeholder: PropTypes.string,
	label: PropTypes.string
}

export { InputGroup }