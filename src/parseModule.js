const https = require('https')

const parseModule = {
	async parse(domain) {
		const document = await this.getHtmlDocument(domain);
		const allLinks = await this.getAllLinks(document);

		console.log('links', allLinks);

		return allLinks;
	},
	async getHtmlDocument(domain) {
		return new Promise((resolve) => {
			https.get(domain, (response) => {
				let data     = [];
				let document = '';
				console.log('Status code: ', response.statusCode);

				response.on('data', chunk => {
					data.push(chunk)
				});

				response.on('end', () => {
					const fullDocument = Buffer.concat(data).toString();

					resolve(fullDocument);
				});
			});
		});
	},
	getAllLinks(htmlDocument) {
		let beginPositionIndex = 0;
		const links            = [];

		while (-1 !== htmlDocument.indexOf('href="', beginPositionIndex)) {
			const startLinkIndex = htmlDocument.indexOf('href="', beginPositionIndex);
			const endLinkIndex   = htmlDocument.indexOf('"', startLinkIndex + 6);

			const link = htmlDocument.substring(startLinkIndex + 6, endLinkIndex)

			links.push(link);

			beginPositionIndex = endLinkIndex + 1;
		}

		return links;
	},
}

module.exports = parseModule;
