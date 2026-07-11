import axios from 'axios';
import { readFileSync } from 'fs';
import 'dotenv/config';

async function fetchViewer() {
	const query = readFileSync('queries/viewer.graphql', 'utf-8');

	try {
		const {
			data: {
				data: { viewer },
			},
		} = await axios.post(
			'https://api.github.com/graphql',
			{ query },
			{
				headers: {
					Authorization: `Bearer ${process.env.GITHUB_TOKEN}`,
				},
			}
		);

		return viewer;
	} catch (error) {
		console.error(error.response ? error.response.data : error.message);
		throw error;
	}
}

export { fetchViewer };
