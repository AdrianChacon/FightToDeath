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
	describe('basic shape', () => {
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
		})

		it('can level up', () => {
			expect(fighter.getExperienceToNextLevel()).toEqual(100)
			fighter = new Fighter({ ...baseConfig, level: 2 })
			expect(fighter.getExperienceToNextLevel()).toEqual(220)
			fighter = new Fighter({ ...baseConfig })
			fighter.giveExperience(100)
			expect(fighter.level).toEqual(2)
		})

		it('have life', () => {
			expect(fighter.currentLife).toBe(175)
			expect(fighter.maxLife).toBe(175)
			fighter = new Fighter({ ...baseConfig, currentLife: 75 })
			expect(fighter.currentLife).toBe(75)
		})

		it('have a toHit ratio', () => {
			expect(fighter.getToHitRatio).not.toBe(undefined)
			expect(fighter.getToHitRatio()).toBeCloseTo(0.45, 2)
			let config = { ...baseConfig, baseStats: { ...baseConfig.baseStats } }
			config.baseStats.dex = 10
			config.baseStats.lck = 10
			config.baseStats.int = 10
			fighter = new Fighter(config)
			expect(fighter.getToHitRatio()).toBeCloseTo(0.9, 2)
		})

		it('have a toDodge ratio', () => {
			expect(fighter.getToDodgeRatio).not.toBe(undefined)
			expect(fighter.getToDodgeRatio()).toBeCloseTo(0.30, 2)
			let config = { ...baseConfig, baseStats: { ...baseConfig.baseStats } }
			config.baseStats.dex = 10
			config.baseStats.lck = 10
			config.baseStats.con = 10
			config.baseStats.spd = 10
			fighter = new Fighter(config)
			expect(fighter.getToDodgeRatio()).toBeCloseTo(0.60, 2)
		})

		it('have damage', () => {
			expect(fighter.getDamage).not.toBe(undefined)
			expect(fighter.getDamage()).toBeCloseTo(5, 2)
		})

		it('have resistances', () => {
			expect(fighter.getResistances).not.toBe(undefined)
			expect(fighter.getResistances()).toEqual({
				blunt: 5,
				pierce: 5,
				cut: 5,
				fire: 5,
				poison: 5,
				cold: 5,
				electricity: 5,
				confusion: 5,
				paralisis: 5,
			})
		})
	})
})
