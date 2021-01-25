import { useDispatch, useSelector } from 'react-redux'

export const useValidateTime = () => {
  const audioChunks = useSelector((state) => state.app.audioChunks)
  console.log(audioChunks)
}
