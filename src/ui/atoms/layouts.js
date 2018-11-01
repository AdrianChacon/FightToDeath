import styled from 'styled-components'

const VerticalLayout = styled.div`
width: 100%;
display: flex;
flex-direction: column;
height: ${props => props.height}; 
justify-content: ${props => props.justify};
align-items: ${props => props.align};
padding: ${props => props.padding?'10px':'0'};
overflow: hidden;
box-sizing: border-box;
`

VerticalLayout.defaultProps = { height: 'auto' }

const HorizontalLayout = styled.div`
width: 100%;
display: flex;
flex-direction: row;
justify-content: ${props => props.justify};
align-items: ${props => props.align};
`

export { VerticalLayout, HorizontalLayout }
