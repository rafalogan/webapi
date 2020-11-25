const { join } = require('path');

const HeroRepository = require('./../repositories/heroRepository');
const HeroService = require('./../services/heroService');

const filename = join(__dirname, '../../database', 'data.json');

const generateIstance = () => {
	const heroRepository = new HeroRepository({file: filename});

	return new HeroService({heroRepository});
}

module.exports = { generateIstance }
