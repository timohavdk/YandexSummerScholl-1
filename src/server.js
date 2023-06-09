const express = require('express');
const parseModule = require('./parseModule.js')

const server = express();
const parser = parseModule;

const urlEncodeParser = express.urlencoded({extended: false});

server.post('/parse', urlEncodeParser, async function(request, response) {
	const links = await parser.parse(request.body.domainName);
	response.send(links);
});

server.listen(3000, () => {
	console.log('Server start');
});
