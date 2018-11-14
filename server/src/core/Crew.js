class Crew {
	constructor(config){
		if (!config) throw new Error('A config object is required')
		if (!config.id) throw new Error('An id is required')

		this.id = config.id
	}
}

module.exports = Crew