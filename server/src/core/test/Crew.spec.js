const Fighter = require('../Fighter')
const Crew = require('../Crew')

const baseFighterConfig = {
	id: '99999',
	name: 'Fran',
	baseStats: {
		str: 5,
		res: 5,
		int: 5,
		dex: 5,
		spr: 5,
		spd: 5,
		con: 5,
		lck: 5
	}
}

const baseConfig = {
	id: 9999,
	fighters: [
		new Fighter({ ...baseFighterConfig, id: 1, name: 'Adri'}),
		new Fighter({ ...baseFighterConfig, id: 2, name: 'Fran'}),
		new Fighter({ ...baseFighterConfig, id: 3, name: 'John'}),
	]
}

const item1 = { id: 1, effect: [{
	time: 'instant',
	type: 'heal',
	amount: 100
}] }
const item2 = { id: 2}

describe('Crew', () => {
	let crew

	beforeEach(() => {
		crew = new Crew(baseConfig)
	})
  
	describe('shape', () => {
		it('exist', () => {
			expect(Crew).toBeDefined()
		})
    
		it('requires a config object', () => {
			expect(() => new Crew()).toThrow()
		})
    
		it('have an id', () => {
			expect(crew.id).toBeDefined()
			expect(() => new Crew({})).toThrow()
		})
    
		it('have fighters', () => {
			expect(crew.fighters).toBeDefined()
		})
    
		it('have inventory', () => {
			expect(crew.inventory).toBeDefined()
		})
	})

	describe('fighters', () => {
		it('have a list of fighters', () => {
			expect(crew.getFighters).toBeDefined()
			expect(Array.isArray(crew.getFighters())).toBe(true)
		})

		it('have individual fighters', () => {
			expect(crew.getFighter).toBeDefined()
			expect(crew.getFighter(1)).toBe(baseConfig.fighters[0])
		})

		it('can apply effects to fighters', () => {
			expect(crew.applyEffect).toBeDefined()
			crew.applyEffect(1, {
				time: 'instant',
				type: 'damage',
				amount: {
					fire: 100
				}
			})
			expect(crew.getFighter(1).currentLife).toBeCloseTo(80)
		})

		it('can pass turns', () => {
			expect(crew.nextTurn).toBeDefined()
			const ttl = crew.getFighter(1).getTurnsToPlay()
			crew.nextTurn()
			expect(crew.getFighter(1).getTurnsToPlay()).toBe(ttl - 1)
		})
	})
  
	describe('inventory', () => {
		it('can get items', () => {
			expect(crew.giveItem).toBeDefined()
			crew.giveItem(item1)
			expect(crew.inventory[item1.id]).toBe(1)
		})
    
		it('can use items', () => {
			expect(crew.useItem).toBeDefined()
			crew.giveItem(item1)
			crew.useItem(1)
			expect(crew.inventory[item1.id]).toBe(0)
		})

		it('cant use items it dont have', () => {
			expect(() => crew.useItem(1)).toThrow()
		})

	})
})