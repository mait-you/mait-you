const axios = require('axios');
require('dotenv').config();

async function main() {
	try {
		const response = await axios.get(
			'https://api.github.com/user', // REST endpoint
			{
				headers: {
					Authorization: `Bearer ${process.env.GITHUB_TOKEN}`,
				},
			}
		);

		const user = response.data;

		console.log('Username:', user.login);
		console.log('Followers:', user.followers);
		console.log('Repositories:', user.public_repos);
			
	} catch (error) {
		if (error.response) {
			console.log('Status:', error.response.status, error.response.statusText);
			console.log('Body:', error.response.data);
		} else {
			console.log(error.message);
		}
	}
}

main();
