import { readFileSync, writeFileSync } from 'fs';
import { fetchViewer } from './graphql.js';
import { generateSVG } from './svg.js';
import { countLanguages, totalStars, totalForks } from './stats.js';

function printViewer(viewer) {
	console.log(
		`${viewer.login} | followers: ${viewer.followers.totalCount} | repos: ${viewer.repositories.totalCount}`
	);

	for (const repo of viewer.repositories.nodes) {
		const language = repo.primaryLanguage ? repo.primaryLanguage.name : 'Unknown';
		console.log(`${repo.name} | ${language} |  ${repo.stargazerCount} star`);
	}

	console.log(`total stars: ${totalStars(viewer.repositories.nodes)}`);
	console.log(`total forks: ${totalForks(viewer.repositories.nodes)}`);
	console.log(countLanguages(viewer.repositories.nodes));
}

async function main() {
	try {
		const viewer = await fetchViewer();

		printViewer(viewer);
		generateSVG(viewer);
	} catch (error) {
		console.error(error.message);
	}
}

main();
