function showSearch(show) {
	return `https://api.tvmaze.com/search/shows?q=${show}`;
}

function searchShowById(id) {
	return `https://api.tvmaze.com/lookup/shows?imdb=${id}`;
}

function getActors(showId) {
	return `https://api.tvmaze.com/shows/${showId}/cast`;
}

function retrieveShowEpisodes(showId) {
	return `https://api.tvmaze.com/shows/${showId}/episodes?specials=1`;
}

function retrievePopularShows(apiKey) {
	return `https://api.themoviedb.org/3/tv/popular?api_key=${apiKey}`;
}

module.exports = {
	showSearch,
	searchShowById,
	getActors,
	retrieveShowEpisodes,
	retrievePopularShows
};