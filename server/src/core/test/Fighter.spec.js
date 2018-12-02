const Fighter = require('../Fighter')
const items = require('../seeds/items.json')
const perks = require('../seeds/perks.json')

const itemBag = items.reduce((bag, item) => {
	let name = item.name.replace(/ /g, '')
	name = name.slice(0,1).toLowerCase() + name.slice(1)
	bag[name] = item
	return bag
},{})

const perkBag = perks.reduce((bag, skill) => {
	let name = skill.name.replace(/ /g, '')
	name = name.slice(0,1).toLowerCase() + name.slice(1)
	bag[name] = skill
	return bag
},{})

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
const { 
	rustedSword, 
	woodenBuckler, 
	heavyAxe, 
	poisonDagger, 
	longSpear, 
	sackclothTunic, 
	ringmailGloves, 
	leatherCap, 
	leatherPants, 
	ironBoots, 
	fireShrineRing,
	lifeRing,
	ironRing,
	fashionRing,
	coolRing,
	fancyRing,
	hunterRing,
	wolfAmulet,
	snowCloak
} = itemBag

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
			expect(fighter.getStats).toBeDefined()
			const {str, res, int, dex, spr, spd, con, lck} = fighter.getStats()
			expect(str).toEqual(5)
			expect(res).toEqual(5)
			expect(int).toEqual(5)
			expect(dex).toEqual(5)
			expect(spr).toEqual(5)
			expect(spd).toEqual(5)
			expect(con).toEqual(5)
			expect(lck).toEqual(5)
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
			expect(fighter.currentLife).toBeDefined()
			expect(fighter.getMaxLife).toBeDefined()
			expect(fighter.currentLife).toBe(175)
			expect(fighter.getMaxLife()).toBe(175)
			fighter = new Fighter({ ...baseConfig, currentLife: 75 })
			expect(fighter.currentLife).toBe(75)
		})

		it('have stamina', () => {
			expect(fighter.currentStamina).toBeDefined()
			expect(fighter.maxStamina).toBeDefined()
			expect(fighter.currentStamina).toBe(27)
			expect(fighter.maxStamina).toBe(27)
			fighter = new Fighter({ ...baseConfig, currentStamina: 10 })
			expect(fighter.currentStamina).toBe(10)
		})

		it('have stamina recharge rate', () => {
			expect(fighter.getStaminaRechargeRate).toBeDefined()
			expect(fighter.getStaminaRechargeRate()).toBe(1)
			fighter = new Fighter({ ...baseConfig, currentStamina: 10 })
			fighter.nextTurn()
			expect(fighter.currentStamina).toBe(11)

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
				chest: null,
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
				rightHand: null,
				cloak: null
			})
		})
	})

	describe('equipment', () => {
		describe('weapons', () => {
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

			it('can equip an item if he meet the level requirements', () => {
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

		describe('armor', () => {
			it('can equip a chest wear', () => {
				fighter.equip(sackclothTunic)
				expect(fighter.equipment.chest).toBe(sackclothTunic)
				const resistances = fighter.getResistances()
				expect(resistances.blunt).toBeCloseTo(0.06, 2)
				expect(resistances.pierce).toBeCloseTo(0.06, 2)
				expect(resistances.cut).toBeCloseTo(0.06, 2)
				expect(resistances.cold).toBeCloseTo(0.07, 2)
			})

			it('can equip gloves', () => {
				fighter.equip(ringmailGloves)
				expect(fighter.equipment.gloves).toBe(ringmailGloves)
				const resistances = fighter.getResistances()
				expect(resistances.pierce).toBeCloseTo(0.15, 2)
				expect(resistances.cut).toBeCloseTo(0.15, 2)
			})

			it('can equip head wear', () => {
				fighter.equip(leatherCap)
				expect(fighter.equipment.head).toBe(leatherCap)
				const resistances = fighter.getResistances()
				expect(resistances.blunt).toBeCloseTo(0.08, 2)
				expect(resistances.pierce).toBeCloseTo(0.08, 2)
				expect(resistances.cut).toBeCloseTo(0.08, 2)
			})

			it('can equip leg wear', () => {
				fighter.equip(leatherPants)
				expect(fighter.equipment.head).toBe(leatherPants)
				const resistances = fighter.getResistances()
				expect(resistances.blunt).toBeCloseTo(0.1, 2)
				expect(resistances.pierce).toBeCloseTo(0.1, 2)
				expect(resistances.cut).toBeCloseTo(0.1, 2)
			})

			it('can equip foot wear', () => {
				fighter.equip(ironBoots)
				expect(fighter.equipment.foot).toBe(ironBoots)
				const resistances = fighter.getResistances()
				expect(resistances.blunt).toBeCloseTo(0.1, 2)
				expect(resistances.pierce).toBeCloseTo(0.1, 2)
				expect(resistances.cut).toBeCloseTo(0.2, 2)
			})

			it('can equip up to six rings', () => {
				fighter.equip(fireShrineRing)
				fighter.equip(lifeRing)
				fighter.equip(ironRing)
				fighter.equip(fashionRing)
				fighter.equip(coolRing)
				fighter.equip(fancyRing)
				expect(fighter.equipment.ringLeft1).toBe(fireShrineRing)
				expect(fighter.equipment.ringLeft2).toBe(lifeRing)
				expect(fighter.equipment.ringLeft3).toBe(ironRing)
				expect(fighter.equipment.ringRight1).toBe(fashionRing)
				expect(fighter.equipment.ringRight2).toBe(coolRing)
				expect(fighter.equipment.ringRight3).toBe(fancyRing)
			})

			it('cant equip the seventh ring', () => {
				fighter.equip(fireShrineRing)
				fighter.equip(lifeRing)
				fighter.equip(ironRing)
				fighter.equip(fashionRing)
				fighter.equip(coolRing)
				fighter.equip(fancyRing)
				expect(() => fighter.equip(hunterRing)).toThrow()
			})

			it('can equip amulets', () => {
				fighter.equip(wolfAmulet)
				expect(fighter.equipment.amulet).toBe(wolfAmulet)
			})

			it('can equip cloaks', () => {
				fighter.equip(snowCloak)
				expect(fighter.equipment.cloak).toBe(snowCloak)
			})

			it('cant equip to wrong spots', () => {
				expect(() => fighter.equip(wolfAmulet, 'leftHand')).toThrow()
				expect(() => fighter.equip(fireShrineRing, 'head')).toThrow()
				expect(() => fighter.equip(sackclothTunic, 'foot')).toThrow()
			})
		})
	})

	describe('effects', () => {
		it('can recive instant heal effect', () => {
			expect(fighter.applyEffect).toBeDefined()
			fighter.applyDamage({ fire: 100})
			expect(fighter.currentLife).toBeCloseTo(80)
			fighter.applyEffect({
				time: 'instant',
				type: 'heal',
				amount: 100
			})
			expect(fighter.currentLife).toBeCloseTo(175)
		})

		it('can receive instant damage effect', () => {
			fighter.applyEffect({
				time: 'instant',
				type: 'damage',
				amount: {
					fire: 100
				}
			})
			expect(fighter.currentLife).toBeCloseTo(80)
		})

		it('can receive instant stamina effect', () => {
			fighter = new Fighter({ ...baseConfig, currentStamina: 10 })
			fighter.applyEffect({
				time: 'instant',
				type: 'stamina',
				amount: 10
			})
			expect(fighter.currentStamina).toBe(20)
		})

		it('can stack effects', () => {
			expect(fighter.effectStack).toBeDefined()
			expect(fighter.consumeStack).toBeDefined()
			const effect = {
				time: 'turns',
				turns: 4,
				type: 'damage',
				amount: { blunt: 25 }
			}
			fighter.applyEffect(effect)
			expect(fighter.effectStack).toContainEqual(effect)
			fighter.consumeStack()
			fighter.consumeStack()
			fighter.consumeStack()
			fighter.consumeStack()
			expect(fighter.currentLife).toBeCloseTo(80)
		})

		it('cant stack stats modifiers', () => {
			fighter.applyEffect({
				time: 'turns',
				type: 'stat',
				turns: 1,
				amount: {
					str: 1 
				}
			})
			expect(fighter.getStats().str).toBe(6)
		})

		it('can apply an array of effects', () => {
			const poisonEffect = [
				{
					time: 'turns',
					turns: 4,
					type: 'damage',
					amount: { poison: 25 }
				},
				{
					time: 'instant',
					type: 'damage',
					amount: { poison: 100 }
				}
			]

			fighter.applyEffect(poisonEffect)
			expect(fighter.effectStack).toContainEqual(poisonEffect[0])
			expect(fighter.currentLife).toBeCloseTo(80)
		})
	})

	describe('turns', () => {
		it('have a turns to play', () => {
			expect(fighter.getTurnsToPlay).toBeDefined()
		})

		it('starts at spd', () => {
			expect(fighter.getTurnsToPlay()).toBe(20 - fighter.baseStats.spd)
		})

		it('increases 20 - fighter speed stat after each action', () => {
			fighter._turnsToPlay = 0
			fighter.useSkill(0)
			expect(fighter.getTurnsToPlay()).toBe(15)
		})

		it('cant play if turn to play is not 0', () => {
			fighter._turnsToPlay = 0
			fighter.useSkill(0)
			expect(() => fighter.useSkill(0)).toThrow()
		})

		it('next turn decreases the turn to play', () => {
			fighter._turnsToPlay = 0			
			fighter.useSkill(0)
			fighter.nextTurn()
			expect(fighter.getTurnsToPlay()).toBe(14)
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

	describe('skills', () => {
		beforeEach(() => {
			fighter._turnsToPlay = 0
		})

		it('have skills', () => {
			expect(fighter.getAllSkills).toBeDefined()
			expect(Array.isArray(fighter.getAllSkills())).not.toBeFalsy()
		})

		it('always have an attack skill', () => {
			expect(fighter.getAllSkills()).toContainEqual({
				id: 0,
				name: 'Attack',
				target: 'notSelf',
				cost: 0,
				effect: {
					time: 'instant',
					type: 'damage',
					amount: { blunt: 5 }
				}
			})
		})

		it('can get skills from equipment', () => {
			fighter.equip(woodenBuckler)
			expect(fighter.getAllSkills()).toContainEqual({
				id: 399,
				name: 'Shield Bash',
				target: 'notSelf',
				cooldown: 10,
				cost: 10,
				effect: {
					time: 'instant',
					type: 'damage',
					amount: { blunt: 10 }
				}
			})
		})

		it('can get a skill given it id', () => {
			expect(fighter.getSkill).toBeDefined()
			expect(fighter.getSkill(0)).toEqual({
				id: 0,
				name: 'Attack',
				target: 'notSelf',
				cost: 0,
				effect: {
					time: 'instant',
					type: 'damage',
					amount: { blunt: 5 }
				}
			})
		})

		it('can use skill', () => {
			expect(fighter.useSkill).toBeDefined()
			fighter.equip(woodenBuckler)
			expect(fighter.useSkill(399)).toEqual({
				time: 'instant',
				type: 'damage',
				amount: { blunt: 10 }
			})
			expect(fighter.currentStamina).toBe(17)			
		})

		it('have a cooldown register', () => {
			expect(fighter.cooldowns).toBeDefined()
			expect(fighter.cooldowns).toBeInstanceOf(Object)
		})

		it('increases cooldown time of a skill when it uses it', () => {
			fighter.equip(woodenBuckler)
			fighter.useSkill(399)
			expect(fighter.cooldowns).toEqual({
				399: 10
			})
		})

		it('decreasses cooldown every turn', () => {
			fighter.equip(woodenBuckler)
			fighter.useSkill(399)
			expect(fighter.cooldowns).toEqual({	399: 10	})
			fighter.nextTurn()
			expect(fighter.cooldowns).toEqual({	399: 9 })
		})

		it('removes cooldown registry when it gets to 0', () => {
			fighter.equip(woodenBuckler)
			fighter.useSkill(399)
			expect(fighter.cooldowns).toEqual({	399: 10	})
			fighter.nextTurn()
			fighter.nextTurn()
			fighter.nextTurn()
			fighter.nextTurn()
			fighter.nextTurn()
			expect(fighter.cooldowns).toEqual({	399: 5 })
			fighter.nextTurn()
			fighter.nextTurn()
			fighter.nextTurn()
			fighter.nextTurn()
			fighter.nextTurn()
			expect(fighter.cooldowns).toEqual({	})
		})

		it('cant use a skill if it doesnt have enought stamina', () => {
			fighter = new Fighter({ ...baseConfig, currentStamina: 9})
			fighter.equip(woodenBuckler)
			expect(() => fighter.useSkill(399)).toThrow()
		})

		it('cant use a skill if it doesnt have it', () => {
			fighter = new Fighter({ ...baseConfig, currentStamina: 9})
			expect(() => fighter.useSkill(399)).toThrow()
		})

		it('cant use a skill if its in cooldown', () => {
			fighter.equip(woodenBuckler)
			fighter.useSkill(399)
			expect(() => fighter.useSkill(399)).toThrow()
		})

		it('doesnt list the same skill twice', () => {
			const {fireAffinity, sparkMastery} = perkBag
			fighter.giveExperience(180)
			fighter.adquirePerk(fireAffinity)
			fighter.adquirePerk(sparkMastery)
			expect(fighter.getAllSkills()).toHaveLength(2)
		})
	})

	describe('perks', () => {
		const {fireAffinity} = perkBag

		it('have adquired perks', () => {
			expect(fighter.perks).toBeDefined()
		})

		it('have spent experience', () => {
			expect(fighter.spentExperience).toBeDefined()
		})

		it('can adquire a perk if it has enought experience', () => {
			expect(fighter.adquirePerk).toBeDefined()			
			fighter.giveExperience(100)
			
			fighter.adquirePerk(fireAffinity)
			expect(fighter.perks).toContainEqual(fireAffinity)
		})

		it('adquired perks gives resistance bonuses', () => {
			fighter.giveExperience(100)
			fighter.adquirePerk(fireAffinity)
			expect(fighter.getResistances().fire).toBeCloseTo(0.2, 2)
		})

		it('adquired perks gives skills', () => {
			fighter.giveExperience(100)
			fighter.adquirePerk(fireAffinity)
			expect(fighter.getAllSkills()).toContainEqual(fireAffinity.skill[0])
		})
	})

	describe('random test', () => {
		it('Equips a ring and gets additional strength and life', () => {
			fighter.equip(fancyRing)
			expect(fighter.getStats().str).toBe(6)
			expect(fighter.getMaxLife()).toBe(180)
		})

		it('Equips a 2-handed polearm, then a sword, and it only has the sword', () => {
			fighter.equip(longSpear)
			fighter.equip(rustedSword)
			expect(fighter.equipment.rightHand).toBe(rustedSword)
			expect(fighter.equipment.leftHand).not.toBeDefined()
		})

		it('Equips a ring and get additional max life', () => {
			fighter.equip(lifeRing)
			expect(fighter.getMaxLife()).toBe(275)
		})
	})
})
