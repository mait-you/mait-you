function countLanguages(repositories) {
	const languageCount = {};
	for (const repo of repositories) {
		const language = repo.primaryLanguage ? repo.primaryLanguage.name : 'Unknown';
		languageCount[language] ? languageCount[language]++ : (languageCount[language] = 1);
	}
	const entries = Object.entries(languageCount);
	entries.sort((a, b) => b[1] - a[1]);
	return entries;
}

function totalStars(repositories) {
	let totalStargazerCount = 0;
	for (const repo of repositories) totalStargazerCount += repo.stargazerCount;
	return totalStargazerCount;
}

function totalForks(repositories) {
	let totalForksCount = 0;
	for (const repo of repositories) totalForksCount += repo.forkCount;
	return totalForksCount;
}

export { countLanguages, totalStars, totalForks };
