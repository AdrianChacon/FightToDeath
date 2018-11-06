const scaleUp = (vec1, vec2) => Object
  .keys(vec1)
  .reduce((res, key) => {
    res[key] = vec1[key] * (1 + vec2[key])
    return res
  }, {})

const scaleDown = (vec1, vec2) => scaleUp(vec1, factor(vec2, -1))

const factor = (vec, scalar) => Object
  .keys(vec)
  .reduce((res, key) => {
    res[key] = vec[key] * scalar
    return res
  }, {})

const inverse = vec => factor(vec, -1)

const add = (vec1, vec2) => {
  const keys = Array.from(new Set([...Object.keys(vec1), ...Object.keys(vec2)]))
  return keys.reduce((acc, key) => {
    acc[key] = (vec1[key] || 0) + (vec2[key] || 0)
    return acc
  },{})
}

const reduceSum = vec => Object
.keys(vec)
.reduce((sum, key) => sum + vec[key], 0)

module.exports = {
  scaleUp,
  scaleDown,
  factor,
  inverse,
  add,
  reduceSum
}