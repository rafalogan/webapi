const http = require('http');

const PORT = 3000;
const DEFAULT_HEADER = {'content-Type': 'application/json'}

const Hero = require('./entities/hero');
const HeroFactory = require('./factories/heroFactory');
const heroService = HeroFactory.generateIstance();

const routes = {
	'/heroes:get': async (request, response) => {
		const {id} = request.queryString;
		const heroes = await heroService.find(id);

		response.write(JSON.stringify({result: heroes}));
		return  response.end();
	},

	'/heroes:post': async (request, response) => {
		try {
			// async interator
			for await (const data of request) {
				const item = JSON.parse(data);
				const hero = new Hero(item);
				const {error, valid} = hero.isValid();

				if (!valid) {
					response.writeHead(400, DEFAULT_HEADER);
					response.write(JSON.stringify({error: error.join(',')}))
					return response.end();
				}

				const id = await heroService.create(hero);
				response.writeHead(201, DEFAULT_HEADER);
				response.write(JSON.stringify({success: 'User created with success!!', id}));

				/*
				* Só usado retun pois é um objeto body por requisição
				* No caso de arquivo por demanda ele pode entrar mais vezes em um mesmo evento
				* retirando return
				* */
				return response.end();
			}
		} catch (error) {
			return errorHancler(response)(error)
		}
	},

	default: (request, response) => {
		response.write('Hello!');
		return response.end();
	}
}

const errorHancler = response => {
	return error => {
		console.error('Deu Ruim!***', error);
		response.writeHead(500, DEFAULT_HEADER);
		response.write(JSON.stringify({error: 'Internal Server Error!!'}));

		return response.end();
	}
}

const handler = (request, response) => {
	const {url, method} = request;
	const [first, route, id] = url.split('/');

	request.queryString = {id: isNaN(id) ? id : Number(id)};
	const key = `/${route}:${method.toLowerCase()}`

	console.log('key', key);
	response.writeHead(200, DEFAULT_HEADER);

	const chosen = routes[key] || routes.default;

	return chosen(request, response)
		.catch(errorHancler(response));
};

const onUp = () => console.log( 'Server runing at', PORT);
const onError = error => console.error('Server Error', error);

http.createServer(handler)
	.listen(PORT)
	.on('listening', onUp)
	.on('error', onError);

