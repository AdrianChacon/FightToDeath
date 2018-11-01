import styled from 'styled-components'
import PropTypes from 'prop-types'

const Label = styled.h1`
  color: ${props => props.error ? 'red' : 'white'};
  padding: 10px;
  font-size: 24px;
  font-family: 'VT323', monospace;
  text-align: ${props => props.align};
`

Label.propTypes = {
	error: PropTypes.bool
}

export { Label }