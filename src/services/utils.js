export function canUseDOM () {
  return !!(
    (typeof window !== 'undefined' &&
    window.document && window.document.createElement)
  )
}

/**
 * Randomize array element order in-place.
 * Using Durstenfeld shuffle algorithm.
 * Source: https://stackoverflow.com/a/12646864/175830
 */
export function shuffleArray(array) {
  for (var i = array.length - 1; i > 0; i--) {
    var j = Math.floor(Math.random() * (i + 1))
    var temp = array[i]
    array[i] = array[j]
    array[j] = temp
  }
}
