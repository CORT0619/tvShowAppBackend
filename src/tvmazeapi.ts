export function showSearch(show: string): string {
	return `https://api.tvmaze.com/search/shows?q=${show}`;
}

export function searchShowById(id: string): string {
	return `https://api.tvmaze.com/lookup/shows?imdb=${id}`;
}

export function getActors(showId: string): string {
	return `https://api.tvmaze.com/shows/${showId}/cast`;
}

export function retrieveShowEpisodes(showId: string): string {
	return `https://api.tvmaze.com/shows/${showId}/episodes?specials=1`;
}

export function retrieveFullShowDetails(showId: string): string {
	return `https://api.tvmaze.com/shows/${showId}?embed[]=episodes&embed[]=cast`;
}

export function retrievePopularShows(apiKey: string): string {
	return `https://api.themoviedb.org/3/tv/popular?api_key=${apiKey}`;
}