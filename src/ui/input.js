import styled from 'styled-components'

const Input = styled.input`
border-radius: 3px;
border: none;
border-bottom: 2px solid white;
padding: 10px;
font-size: 16px;
font-family: 'VT323', monospace;
width: 100%;
&:focus {
    outline: none;
    border-bottom: 2px solid red;
}
`

export { Input }