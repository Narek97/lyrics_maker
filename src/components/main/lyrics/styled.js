import styled from 'styled-components'
import { button, scroll } from '../../../styled'
import { LYRICS_PANEL_WIDTH } from '../../../constants'

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: ${LYRICS_PANEL_WIDTH}px;
  border-left: 1px solid rgb(222, 227, 240);
  overflow: auto;
  background-color: #0052e01a;
  ${scroll}
`

export const Add = styled.button`
  display: flex;
  align-items: center;
  width: 150px;
  padding: 10px 25px;
  margin: auto;
  margin-bottom: 20px;
  border-radius: 25px;
  color: rgba(37, 46, 72, 0.59);
  background-color: #ffffff;
  ${button}
`

// export const InputNumber = styled.div`
//   width: 65px;
//   border: 1px solid #dde3f0;
//   padding: 5px;
//   border-radius: 5px;
//   display: flex;
// `
// export const Hourse = styled.input`
//   width: 15px;
//   color: #252e48;
//   :active,
//   :hover,
//   :focus {
//     outline: 0;
//     outline-offset: 0;
//   }
//   outline: none;
//   border: none;
// `
// export const Minute = styled(Hourse)``
// export const Second = styled(Hourse)``

// export const Change = styled.div`
//   display: flex;
//   justify-content: space-around;
//   align-items: center;
//   height: 50px;
// `
// export const Button = styled.button`
//   ${button}
//   background-color: #EEF5FF;
//   border-radius: 25px;
//   padding: 5px;
// `
