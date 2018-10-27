import styled from 'styled-components'

const Label = styled.h1`
color: white;
padding: 10px;
font-size: 24px;
font-family: 'VT323', monospace;
text-align: ${props => props.align};
`

export { Label }