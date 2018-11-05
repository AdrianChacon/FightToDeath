const Fighter = require('./Fighter')
const items = require('./items.json')
const getItem = name => items.find(item => item.name === name)

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

const experienceToLevel5 = 460
const rustedSword = getItem('Rusted Sword')
const woodenBuckler = getItem('Wooden Buckler')
const heavyAxe = getItem('Heavy Axe')
const poisonDagger = getItem('Poison Dagger')
const longSpear = getItem('Long Spear')

describe('Fighter', () => {
	let fighter

	beforeEach(() => {
		fighter = new Fighter(baseConfig)
	})
	
	describe('shape', () => {
		it('exist', () => {
			expect(Fighter).toBeDefined()
		})

		it('requires a config object', () => {
			expect(() => new Fighter()).toThrow()
		})

		it('have an id', () => {
			expect(fighter.id).toBeDefined()
			expect(() => new Fighter({})).toThrow()
		})

		it('have a name', () => {
			expect(fighter.name).toBeDefined()
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
			expect(fighter.giveExperience).toBeDefined()
			fighter.giveExperience(100)
			expect(fighter.experience).toEqual(100)
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


		it('have resistances', () => {
			expect(fighter.getResistances).not.toBe(undefined)
			expect(fighter.getResistances()).toEqual({
				blunt: 0.05,
				pierce: 0.05,
				cut: 0.05,
				fire: 0.05,
				poison: 0.05,
				cold: 0.05,
				electricity: 0.05,
				confusion: 0.05,
				paralisis: 0.05,
			})
		})

		it('have equipment slots', () => {
			expect(fighter.equipment).toBeDefined()
			expect(fighter.equipment).toEqual({
				head: null,
				shoulder: null,
				gloves: null,
				legs: null,
				foot: null,
				ringLeft1: null,
				ringLeft2: null,
				ringLeft3: null,
				ringRight1: null,
				ringRight2: null,
				ringRight3: null,
				amulet: null,
				leftHand: null,
				rightHand: null
			})
		})
	})

	describe('equipment', () => {
		it('can equip a weapon', () => {
			expect(fighter.equip).toBeDefined()
			fighter.equip(rustedSword)
			expect(fighter.equipment.rightHand).toBe(rustedSword)
		})

		it('can equip weapons and shields', () => {
			fighter.equip(rustedSword)
			fighter.equip(woodenBuckler)
			expect(fighter.equipment.rightHand).toBe(rustedSword)
			expect(fighter.equipment.leftHand).toBe(woodenBuckler)
		})

		it('can equip two weapons', () => {
			fighter.equip(rustedSword)
			fighter.giveExperience(100)
			fighter.equip(poisonDagger)
			expect(fighter.equipment.rightHand).toBe(rustedSword)
			expect(fighter.equipment.leftHand).toBe(poisonDagger)
		})

		it('can equip to specific slot', () => {
			fighter.equip(rustedSword, 'leftHand')
			expect(fighter.equipment.leftHand).toBe(rustedSword)
		})

		it('cant equip to unexistent spot', () => {
			expect(() => fighter.equip(rustedSword, 'leftToe')).toThrow()
		})

		it('cant equip an item if it doesnt meet the stat requirements', () => {
			expect(() => fighter.equip(heavyAxe)).toThrow()
		})

		it('can equip the same item if he meet the requirements', () => {
			fighter.giveExperience(experienceToLevel5)
			fighter.investStatPoint('str')
			fighter.equip(heavyAxe)
			expect(fighter.equipment.rightHand).toBe(heavyAxe)
		})

		it('cant equip an item if it doesnt meet the level requirements', () => {
			expect(() => fighter.equip(poisonDagger)).toThrow()
		})

		it('can equip the same item if he meet the requirements', () => {
			fighter.giveExperience(100)
			fighter.equip(poisonDagger)
			expect(fighter.equipment.rightHand).toBe(poisonDagger)
		})

		it('removes any other weapon if equips a two handed weapon', () => {
			fighter.equip(rustedSword, 'leftHand')
			expect(fighter.equipment.leftHand).toBe(rustedSword)
			fighter.equip(longSpear)
			expect(fighter.equipment.rightHand).toBe(longSpear)
			expect(fighter.equipment.leftHand).not.toBeDefined()
				
		})
	})

	describe('level up and get stats', () => {
		it('can level up', () => {
			expect(fighter.getExperienceToNextLevel()).toEqual(100)
			fighter = new Fighter({ ...baseConfig, level: 2 })
			expect(fighter.getExperienceToNextLevel()).toEqual(220)
			fighter = new Fighter({ ...baseConfig })
			fighter.giveExperience(100)
			expect(fighter.level).toEqual(2)
		})

		it('gets stat points when leveling up every 5 levels', () => {
			expect(fighter.statPoints).toBe(0)
			fighter.giveExperience(experienceToLevel5)
			expect(fighter.level).toBe(5)
			expect(fighter.statPoints).toBe(1)
		})

		it('can invest stat points to increase stats', () => {
			expect(fighter.investStatPoint).toBeDefined()
			fighter.giveExperience(experienceToLevel5)
			expect(() => fighter.investStatPoint('kar')).toThrow()
			fighter.investStatPoint('str')
			expect(fighter.baseStats.str).toBe(6)
		})

		it('does nothing when invest stat points having 0 of them', () => {
			fighter.investStatPoint('str')
			expect(fighter.baseStats.str).toBe(5)
		})
	})

	describe('deal damage', () => {
		it('have barehand damage', () => {
			expect(fighter.getDamage).not.toBe(undefined)
			expect(fighter.getDamage()).toEqual({
				blunt: 5
			})
		})

		it('have a weapon damage', () => {
			fighter.equip(rustedSword)
			expect(fighter.getDamage()).toEqual({
				cut: 7.5
			})
		})

		it('have a dual weapon damage', () => {
			fighter.equip(rustedSword)
			fighter.equip(rustedSword)
			expect(fighter.getDamage()).toEqual({
				cut: 15
			})
		})

		it('have multi weapon damage', () => {
			fighter.equip(rustedSword)
			fighter.giveExperience(100)
			fighter.equip(poisonDagger)
			expect(fighter.getDamage()).toEqual({
				cut: 7.5,
				pierce: 6,
				poison: 2
			})
		})
	})

	describe('get damage', () => {
		it('gets single type damage', () => {
			expect(fighter.applyDamage).not.toBe(undefined)
			fighter.applyDamage({
				blunt: 10
			})
			expect(fighter.currentLife).toBe(165.5)
		})

		it('gets multi type damage', () => {
			expect(fighter.applyDamage).not.toBe(undefined)
			fighter.applyDamage({
				blunt: 10,
				fire: 10,
				poison: 10
			})
			expect(fighter.currentLife).toBe(146.5)
		})
	})
})
