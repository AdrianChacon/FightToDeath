class Crew {
	constructor(config){
		if (!config) throw new Error('A config object is required')
		if (!config.id) throw new Error('An id is required')
		if (!config.fighters || config.fighters.length === 0) throw new Error('At least one fighter is required')

		this.id = config.id
		this.fighters = config.fighters
		this.inventory = config.inventory || {}
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