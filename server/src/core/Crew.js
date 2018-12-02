class Crew {
	constructor(config){
		if (!config) throw new Error('A config object is required')
		if (!config.id) throw new Error('An id is required')
		if (!config.fighters || config.fighters.length === 0) throw new Error('At least one fighter is required')

		this.id = config.id
		this.fighters = config.fighters
		this.inventory = config.inventory || {}
	}
	
	getFighters(){
		return this.fighters
	}

	getFighter(id){
		const fighter = this.fighters.find(fighter => fighter.id === id)
		if(!fighter) throw new Error(`The fighter with id ${id} is not in this crew`)
		return fighter
	}

	applyEffect(fighterId, effect){
		const fighter = this.getFighter(fighterId)
		fighter.applyEffect(effect)
	}

	nextTurn(){
		this.fighters.forEach(fighter => fighter.nextTurn())
	}

	giveItem(item){
		if(!this.inventory[item.id]) this.inventory[item.id] = 0
		this.inventory[item.id]++
	}
  
	useItem(id){
		if(!this.inventory[id] || this.inventory[id] === 0) throw new Error('Didnt have the object')
		this.inventory[id] --
	}
}

module.exports = Crew