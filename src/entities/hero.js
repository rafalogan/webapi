class Hero {

	constructor({ id, name, age, power}) {
		this.id = Math.floor(Math.random() * 100) + Date.now();
		this.name = name;
		this.age = age;
		this.power = power;
	}

	isValid() {
		const propertyNames = Object.getOwnPropertyNames(this);
		const amoutInvalid = propertyNames
			.map(property => (!!this[property]) ? null : `${property} is missing!`)
			.filter(item => !!item);

		return {
			valid: amoutInvalid.length === 0,
			error: amoutInvalid
		}
	}
}

module.exports = Hero;

// const hero = new Hero({name: "chapolin", age: 100, power: "Super Força"});
// console.log('valid', hero.isValid());
// console.log('hero', hero);
