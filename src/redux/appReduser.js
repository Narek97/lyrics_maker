import { AUDIO_CHUNK, DATA } from '../data'
import produce from 'immer'
import {
  ADD_AUDIO_CHUNK,
  DELET_AUDIO_CHUNK,
  CHANGE_AUDIO_CHUNK_TEXT,
  CHANGE_AUDIO_CHUNK_END,
  RESIZE_TIME_LINER,
} from './types'

const initialState = DATA

export const appReducer = (state = initialState, action) => {
  return produce(state, (drafState) => {
    switch (action.type) {
      case ADD_AUDIO_CHUNK:
        const Chunk = {
          ...AUDIO_CHUNK,
          id: Date.now(),
          start: action.payload.start + 1,
          end: action.payload.duration,
        }
        drafState.audioChunks.push(Chunk)
        break
      case DELET_AUDIO_CHUNK:
        drafState.audioChunks.splice(
          state.audioChunks.findIndex((el) => el.id === action.payload),
          1
        )
        break
      case CHANGE_AUDIO_CHUNK_TEXT:
        drafState.audioChunks.find(
          (el) => el.id === action.payload.id
        ).textParams.text = action.payload.val
        break
      case CHANGE_AUDIO_CHUNK_END:
        drafState.audioChunks.find((el) => el.id === action.payload.id).end =
          action.payload.val
        break
      case RESIZE_TIME_LINER:
        drafState.audioChunks.find((el) => el.id === action.payload.id).end =
          action.payload.val
          
        break
      default:
        return state
    }
  })
}
