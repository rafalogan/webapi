const {readFile, writeFile} = require('fs/promises');

class HeroRepository {

	constructor({file}) {
		this.file = file
	}

	async _currentFileContent() {
		return JSON.parse(await readFile(this.file));
	}

	async find(itemIds) {
		const all = await this._currentFileContent();

		if (!itemIds) return all;

		return all.find(({id}) => itemIds === id);
	}

	async create(data) {
		const currentFile = await this._currentFileContent();

		currentFile.push(data);
		console.log(currentFile);

		await writeFile(this.file, JSON.stringify(currentFile));

		return data.id;
	}
}

module.exports = HeroRepository;


// const heroRepository = new HeroRepository({
// 	file: '../../database/data.json'
// });
// heroRepository.create({id: 2, name: 'Chapoliun', age: 22}).then(console.log).catch(err => console.error(err));
//
// heroRepository.find().then(console.log).catch(error => console.error('error', error));
