import styled from 'styled-components'

const VerticalLayout = styled.div`
width: 100%;
display: flex;
flex-direction: column;
height: ${props => props.height}; 
`

VerticalLayout.defaultProps = { height: '10vh' }

const HorizontalLayout = styled.div`
width: 100%;
display: flex;
flex-direction: row;
`

export { VerticalLayout, HorizontalLayout }
