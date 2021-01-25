import { useDispatch, useSelector } from 'react-redux'

const useValidateTime = () => {
  const audioChunks = useSelector((state) => state.app.audioChunks)
  console.log(audioChunks)
}
