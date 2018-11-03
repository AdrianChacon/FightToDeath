const Fighter = require('./Fighter')

const baseConfig = {
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

describe('Fighter', () => {
	describe('shape', () => {
		let fighter

		beforeEach(() => {
			fighter = new Fighter(baseConfig)
		})

		it('exist', () => {
			expect(Fighter).not.toEqual(undefined)
		})

		it('requires a config object', () => {
			expect(() => new Fighter()).toThrow()
		})

		it('have an id', () => {
			expect(fighter.id).not.toEqual(undefined)
			expect(() => new Fighter({})).toThrow()

		})

		it('have a name', () => {
			expect(fighter.name).not.toEqual(undefined)
		})

		it('have base stats', () => {
			expect(typeof fighter.baseStats).toEqual('object')
			expect(fighter.baseStats.str).toEqual(5)
			expect(fighter.baseStats.res).toEqual(5)
			expect(fighter.baseStats.int).toEqual(5)
			expect(fighter.baseStats.dex).toEqual(5)
			expect(fighter.baseStats.spr).toEqual(5)
			expect(fighter.baseStats.spd).toEqual(5)
			expect(fighter.baseStats.con).toEqual(5)
			expect(fighter.baseStats.lck).toEqual(5)
			expect(() => new Fighter({ id: '99999' })).toThrow()
		})

		it('have level', () => {
			expect(fighter.level).toEqual(1)
			expect(new Fighter({ ...baseConfig, level: 5 }).level).toEqual(5)
		})

		it('have experience points', () => {
			expect(fighter.experience).toEqual(0)
			expect(fighter.giveExperience).not.toEqual(undefined)
			fighter.giveExperience(100)
			expect(fighter.experience).toEqual(100)
			expect(fighter.level).toEqual(2)
		})

		it('have max life', () => {
			expect(fighter.maxLife).toBe(175)
		})


	})
})
