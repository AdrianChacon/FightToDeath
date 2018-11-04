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
		this.baseStats = config.baseStats

		this.level = config.level || 1
		this.experience = config.experience || 0

		this.maxLife = this.getMaxLife()
		this.currentLife = config.currentLife || this.maxLife
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

	_levelUp() {
		this.level++
	}

	getMaxLife() {
		const { str, res, con } = this.baseStats
		return (con * 20 + res * 10 + str * 5) * (1 + (this.level - 1) / 100)
	}

	getToHitRatio() {
		const { dex, lck, int } = this.baseStats
		return (dex * 5.5 + lck * 1.5 + int * 2) / 100
	}

	getToDodgeRatio() {
		const { dex, con, lck, spd } = this.baseStats
		return (dex * 2.0 + con * 1.0 + lck * 1.5 + spd * 1.5) / 100
	}
}

module.exports = Fighter