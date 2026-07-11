import { readFileSync, writeFileSync } from 'fs';
import { countLanguages, totalStars, totalForks } from './stats.js';

function generateSVG(viewer) {
	const template = readFileSync('template.svg', 'utf-8');
	let svg = template;

	svg = svg.replace('{{LOGIN}}', viewer.login);
	svg = svg.replace('{{FOLLOWERS}}', viewer.followers.totalCount.toString());
	svg = svg.replace('{{REPOS}}', viewer.repositories.totalCount.toString());
	svg = svg.replace('{{STARS}}', totalStars(viewer.repositories.nodes).toString());

	writeFileSync('stats.svg', svg);
}

export { generateSVG };
