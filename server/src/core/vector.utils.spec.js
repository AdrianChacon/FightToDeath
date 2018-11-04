const { scaleUp, scaleDown, factor, inverse, reduceSum } = require('./vector.utils')


describe('vector utils', () => {
  describe('scale up', () => {
    it('increases one value', () => {
      let vec1 = { value: 3 }
      let vec2 = { value: 0.05 }
      let result = 3.15
      expect(scaleUp(vec1, vec2).value).toBeCloseTo(result, 2)
    })
  
    it('increases various values', () => {
      let vec1 = { a: 3, b: 10   }
      let vec2 = { a: 0.05, b: 1 }
      let result = { a: 3.15, b: 20}
      expect(scaleUp(vec1, vec2).a).toBeCloseTo(result.a, 2)
      expect(scaleUp(vec1, vec2).b).toBeCloseTo(result.b, 2)
    })
  })

  describe('scale down', () => {
    it('decreases one value', () => {
      let vec1 = { value: 3 }
      let vec2 = { value: 0.05 }
      let result = 2.85
      expect(scaleDown(vec1, vec2).value).toBeCloseTo(result, 2)
    })
  
    it('decreases various values', () => {
      let vec1 = { a: 3, b: 10   }
      let vec2 = { a: 0.05, b: 1 }
      let result = { a: 2.85, b: 0}
      expect(scaleDown(vec1, vec2).a).toBeCloseTo(result.a, 2)
      expect(scaleDown(vec1, vec2).b).toBeCloseTo(result.b, 2)
    })
  })

  describe('factor', () => {
    it('multiplies every value by a factor', () => {
      let vec1 = { value: 3 }
      let scalar = 2
      let result = { value: 6 }

      expect(factor(vec1, scalar)).toEqual(result)
    })

    it('multiplies by a negative factor', () => {
      let vec1 = { value: 3 }
      let scalar = -1
      let result = { value: -3 }

      expect(factor(vec1, scalar)).toEqual(result)
    })
  })

  describe('inverse', () => {
    it('return the inverse vector', () => {
      let vec = { a: 10, b: 20, c: 30}
      let result = { a: -10, b: -20, c: -30}
      expect(inverse(vec)).toEqual(result)
    })
  })

  describe('reduceSum', () => {
    it('reduces a vector to the sum of its components', () => {
      expect(reduceSum({ a: 20, b: 30, c: 10})).toBe(60)
      expect(reduceSum({ a: -5, b: 3, c: 0.5})).toBeCloseTo(-1.5)
    })
  })
})

