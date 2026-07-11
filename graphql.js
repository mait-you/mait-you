import axios from 'axios';
import { readFileSync } from 'fs';
import 'dotenv/config';

function countLanguages(repositories) {
	const languageCount = {};
	for (const repo of repositories) {
		const language = repo.primaryLanguage ? repo.primaryLanguage.name : 'Unknown';
		languageCount[language] ? languageCount[language]++ : (languageCount[language] = 1);
	}
	return languageCount;
}

function totalStars(repositories) {
	let totalStargazerCount = 0;
	for (const repo of repositories) totalStargazerCount += repo.stargazerCount;
	return totalStargazerCount;
}

function printViewer(viewer) {
	console.log(
		`${viewer.login} | followers: ${viewer.followers.totalCount} | repos: ${viewer.repositories.totalCount}`
	);

	for (const repo of viewer.repositories.nodes) {
		const language = repo.primaryLanguage ? repo.primaryLanguage.name : 'Unknown';
		console.log(`${repo.name} | ${language} |  ${repo.stargazerCount} star`);
	}

	console.log(`total stars: ${totalStars(viewer.repositories.nodes)}`);
	console.log(countLanguages(viewer.repositories.nodes));
}

async function fetchViewer(query) {
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

async function main() {
	try {
		const query = readFileSync('queries/viewer.graphql', 'utf-8');

		const viewer = await fetchViewer(query);

		printViewer(viewer);
	} catch (error) {
		console.error(error.message);
	}
}

main();
