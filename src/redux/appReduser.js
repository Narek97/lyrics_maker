import { AUDIO_CHUNK, DATA } from '../data'
import produce from 'immer'
import {
  ADD_AUDIO_CHUNK,
  DELET_AUDIO_CHUNK,
  CHANGE_AUDIO_CHUNK_TEXT,
  CHANGE_AUDIO_CHUNK_END,
} from './types'

const initialState = DATA

export const appReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_AUDIO_CHUNK:
      const Chunk = {
        ...AUDIO_CHUNK,
        id: Date.now(),
        start: action.payload.start + 1,
        end: action.payload.duration,
      }
      return produce(state, (drafState) => {
        drafState.audioChunks.push(Chunk)
      })
    case DELET_AUDIO_CHUNK:
      return produce(state, (drafState) => {
        drafState.audioChunks.splice(
          state.audioChunks.findIndex((el) => el.id === action.payload),
          1
        )
      })
    case CHANGE_AUDIO_CHUNK_TEXT:
      return produce(state, (drafState) => {
        drafState.audioChunks.find(
          (el) => el.id === action.payload.id
        ).textParams.text = action.payload.val
      })
    case CHANGE_AUDIO_CHUNK_END:
      return produce(state, (drafState) => {
        drafState.audioChunks.find((el) => el.id === action.payload.id).end =
          action.payload.val
      })

    default:
      return state
  }
}
