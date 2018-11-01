import styled from 'styled-components'

const Button = styled.button`
  text-transform: uppercase;
  background: black;
  border-radius: 3px;
  font-weight: 700;
  border:2px solid white;
  color: white;
  padding: 10px 20px;
  font-size: 16px;
  font-family: 'VT323', monospace;
  box-shadow: 3px 3px 0px grey;
  min-width: 100px;
  cursor: pointer;

  &:active{
    box-shadow: 1px 1px 5px white;
    background-color: #232323;
    color: #CDCDCD;
    border-color: #CDCDCD;
    outline: none;
    transform: translate(2px, 2px)
  }

  &:focus{
    outline: none;
  }
`

export { Button }
