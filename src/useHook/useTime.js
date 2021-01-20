export const Time = (duration) => {
  let hours = Math.floor(duration / 60 / 60)
  let minutes = Math.floor(duration / 60) - hours * 60
  let seconds = duration % 60

  if (hours < 10) {
    hours = `0${hours}`
  }
  if (minutes < 10) {
    minutes = `0${minutes}`
  }
  if (seconds < 10) {
    seconds = `0${seconds}`
  }

  return { hours, minutes, seconds }
}
