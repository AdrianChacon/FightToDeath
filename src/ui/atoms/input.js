import styled from 'styled-components'
import PropTypes from 'prop-types'

const Input = styled.input`
    border-radius: 3px;
    border: none;
    border-bottom: 2px solid ${props => props.error ? 'red' : 'white'};;
    padding: 10px;
    font-size: 16px;
    font-family: 'VT323', monospace;
    color: white;
    background: none;
    &:focus {
        outline: none;
        border-bottom: 2px solid cyan;
    }
`

Input.propTypes = {
	error: PropTypes.bool
}

export { Input }