import {
  showSearch,
  searchShowById,
  getActors,
  retrievePopularShows,
  retrieveShowEpisodes,
} from '../tvshow/tvmazeapi';
import 'jest';

describe('showSearch', () => {
  it('should return a url for retrieving shows', () => {
    const show = 'superman';
    const result = showSearch(show);
    expect(result).toEqual('https://api.tvmaze.com/search/shows?q=superman');
  });
});

describe('searchShowById', () => {
  it('should return a url to search for a show by id', () => {
    const id = '1234';
    const result = searchShowById(id);
    expect(result).toEqual('https://api.tvmaze.com/lookup/shows?imdb=1234');
  });
});

describe('getActors', () => {
  it("should return a url for retrieving a show's cast", () => {
    const id = '1111';
    const result = getActors(id);
    expect(result).toEqual('https://api.tvmaze.com/shows/1111/cast');
  });
});

describe('retrieveShowEpisodes', () => {
  it('should return a url for retrieving shows', () => {
    const id = 'superman';
    const result = retrieveShowEpisodes(id);
    expect(result).toEqual(
      `https://api.tvmaze.com/shows/${id}/episodes?specials=1`,
    );
  });
});

describe('retrievePopularShows', () => {
  it('should return a url for retrieving shows', () => {
    const apiKey = 'f2g4r5e42';
    const result = retrievePopularShows(apiKey);
    expect(result).toEqual(
      `https://api.themoviedb.org/3/tv/popular?api_key=${apiKey}`,
    );
  });
});
