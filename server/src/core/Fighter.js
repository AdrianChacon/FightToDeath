const { scaleDown, reduceSum, add } = require('./vector.utils')

const validStats = ['str', 'res', 'int', 'dex', 'spr', 'spd', 'con', 'lck']
const validEquipmentSpots = ['head','shoulder','gloves','legs','foot','ringLeft1','ringLeft2','ringLeft3','ringRight1','ringRight2','ringRight3','amulet','leftHand','rightHand','cloak']
const validEffectTypes = ['resistance']

class Fighter {
	constructor(config) {
		if (!config) throw new Error('A config object is required')
		if (!config.id) throw new Error('An id is required')
		if (!config.baseStats) throw new Error('A baseStats object is required')
		if (!config.baseStats.str) throw new Error('Str is required')
		if (!config.baseStats.res) throw new Error('Res is required')
		if (!config.baseStats.int) throw new Error('Int is required')
		if (!config.baseStats.dex) throw new Error('Dex is required')
		if (!config.baseStats.spr) throw new Error('Spr is required')
		if (!config.baseStats.spd) throw new Error('Spd is required')
		if (!config.baseStats.con) throw new Error('Con is required')
		if (!config.baseStats.lck) throw new Error('Lck is required')
		this.id = config.id
		this.name = config.name
		this.baseStats = { ...config.baseStats }
		this.equipment = {
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
		}
		
		this.statPoints = config.statPoints || 0
		this.level = config.level || 1
		this.experience = config.experience || 0

		this.effectStack = []
		this.maxLife = this.getMaxLife()
		this.maxStamina = this.getMaxStamina()
		this.currentLife = config.currentLife || this.maxLife
		this.currentStamina = config.currentStamina || this.maxStamina
	}

	nextTurn(){
		this.consumeStack()
		this.regenerateStamina()
	}

	consumeStack(){
		this.effectStack = this.effectStack.reduce((stack, effect) => {
			this.applyEffect({ ...effect, time: 'instant'})
			if(effect.turns > 0) stack.push({ ...effect, turns: effect.turns - 1})
			return stack
		}, [])
	}

	_getExperienceToLevel(level) {
		return 100 * (level - 1) + (level - 2) * 20
	}

	getExperienceToNextLevel() {
		return this._getExperienceToLevel(this.level + 1)
	}

	giveExperience(ammount) {
		this.experience += ammount
		while (this.getExperienceToNextLevel() <= this.experience) {
			this._levelUp()
		}
	}

	applyEffect(effect){
		if(Array.isArray(effect)){
			effect.forEach(effect => this.applyEffect(effect))
			return
		}
		if(effect.time === 'instant'){
			switch(effect.type){
			case 'heal':
				this.heal(effect.ammount)
				break
			case 'damage':
				this.applyDamage(effect.ammount)
				break
			case 'stamina':
				this.applyStamina(effect.ammount)
				break
			}
		} else {
			this.effectStack.push(effect)
		}
	}

	_levelUp() {
		this.level++
		if(this.level % 5 === 0) this.statPoints ++
	}

	investStatPoint(stat){
		if(!validStats.includes(stat)) throw new Error(`${stat} is not a valid stat`)
		if(this.statPoints > 0) {
			this.statPoints --
			this.baseStats[stat] ++
		}
	}

	heal(ammount){
		this.currentLife += ammount
		if(this.currentLife > this.maxLife) this.currentLife = this.maxLife
	}

	regenerateStamina(){
		this.applyEffect({
			time: 'instant',
			type: 'stamina',
			ammount: this.getStaminaRechargeRate()
		})
	}

	applyStamina(ammount){
		this.currentStamina += ammount
		if(this.currentStamina > this.maxStamina) this.currentStamina = this.maxStamina
	}

	applyDamage(damages){
		const resistances = this.getResistances()
		const computedDamage = reduceSum(scaleDown(damages, resistances))
		this.currentLife = this.currentLife > computedDamage ? 
			this.currentLife - computedDamage :
			0
	}

	getMaxLife() {
		const { str, res, con } = this.baseStats
		return Math.floor((con * 20 + res * 10 + str * 5) * (1 + (this.level - 1) / 100))
	}

	getMaxStamina() {
		const { dex, res, con, spr, int } = this.baseStats
		const resOrSpr = Math.max(res, spr)
		const conOrInt = Math.max(con, int)
		return Math.floor((resOrSpr * 3 + conOrInt * 1.5 + dex) * (1 + (this.level - 1) / 500))
	}

	getStaminaRechargeRate(){
		const { spr, res } = this.baseStats
		const resOrSpr = Math.max(spr, res)
		return Math.floor(resOrSpr/5)
	}

	getToHitRatio() {
		const { dex, lck, int } = this.baseStats
		return (dex * 5.5 + lck * 1.5 + int * 2) / 100
	}

	getToDodgeRatio() {
		const { dex, con, lck, spd } = this.baseStats
		return (dex * 2.0 + con * 1.0 + lck * 1.5 + spd * 1.5) / 100
	}

	getDamage() {
		const { str } = this.baseStats
		const { rightHand, leftHand } = this.equipment
		if(rightHand || leftHand){			
			const damages = [
				...rightHand ? rightHand.damage : [],
				...leftHand ? leftHand.damage : []
			]
			
			return damages.reduce((acc, {type, scalar, ammount, base}) => {
				if(!acc[type]) acc[type] = 0
				if(scalar) acc[type] += this.baseStats[scalar] * ammount
				if(base) acc[type] += base
				return acc
			},{})
		}
		return {
			blunt: str
		}
	}

	getAllEffects(){
		return Object.values(this.equipment)
			.reduce((acc, item) => (item && item.effect) ? [...acc, ...item.effect] : acc ,[])
	}

	getEffects(type){
		const allEffects = this.getAllEffects()
		if(!type) return allEffects
		if(!validEffectTypes.includes(type)) throw new Error(`${stat} is not a valid effect type`)
		return allEffects.filter(effect => effect.type === type)
	}

	getResistances(){
		const { res, con, spr, int} = this.baseStats

		const resistanceEffects = this.getEffects('resistance').map(effect => effect.ammount)

		const baseResistances = {
			blunt: res * 0.005 + con * 0.005,
			pierce: res * 0.005 + con * 0.005,
			cut: res * 0.005 + con * 0.005,
			fire: res * 0.005 + con * 0.005,
			poison: res * 0.005 + con * 0.005,
			cold: res * 0.005 + con * 0.005,
			electricity: res * 0.005 + con * 0.005,
			confusion: spr * 0.005 + int * 0.005,
			paralisis: spr * 0.005 + int * 0.005
		}
		return resistanceEffects.reduce(add, baseResistances)
	}

	equip(item, slot){
		if(item.require){
			for(const i in item.require){
				const { type, target, ammount } = item.require[i]
				switch(type){
					case 'stat':
						const stats = this.baseStats
						const targetAmmount = stats[target]
						if(targetAmmount < ammount) throw new Error('Fighter did not meet the stat requirement')
						break
					case 'level':
						if(this.level < ammount) throw new Error('Fighter did not meet the level requirement')
				}
			}
		}


		if(!slot){
			if(['weapon', 'shield'].includes(item.type)){
				if(item.twoHanded){
					this.equipment.rightHand = undefined
					this.equipment.leftHand = undefined
				}

				if(!this.equipment.rightHand)	{
					this.equipment.rightHand = item
				}else{
					this.equipment.leftHand = item
				}
				return
			}
			if(item.type === 'ring'){
				const ringSlots = Object.keys(this.equipment).filter(key => /ring/.test(key))

				for(let idx in ringSlots){
					const name = ringSlots[idx]
					if(!this.equipment[name]) {
						this.equipment[name] = item
						return
					}
				}
				throw new Error(`No empty ring spot`)
			}
			this.equipment[item.type] = item
		}else{
			if(!validEquipmentSpots.includes(slot)) throw new Error(`${stat} is not a valid equipment spot`)
			if(['weapon', 'shield'].includes(item.type) && !/Hand/.test(slot)) throw new Error(`Cant equip ${item.type} in ${slot}`)
			if(/ring/.test(item.type) && !/ring/.test(slot)) throw new Error(`Cant equip rings in ${slot}`)
			if(['head','chest','gloves','legs','foot','amulet','cloak'].includes(item.type) && item.type !== slot) throw new Error(`Cant equip ${item.type} item in ${slot} slot`)
			this.equipment[slot] = item
		}
	}
}

module.exports = Fighter

