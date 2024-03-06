import axios from 'axios';
import * as showApi from '../tvshow/tvmazeapi';

import {
  searchTvShows,
  retrieveShowEpisodes,
  retrieveShowInformation,
  getPopularShows
} from '../tvshow/tvshowapi';
import 'jest';

describe('SearchTvShows', () => {
  it('should return an array of tvshows matching a string that was passed in', async () => {
    const url = 'https://api.tvmaze.com/search/shows?q=seinfeld';

    const axiosResponse = {
      data: [
        {
          score: Math.random(),
          show: {
            id: 530,
            url: 'https://www.tvmaze.com/shows/530/seinfeld',
            name: 'Seinfeld',
            image: {
              medium:
                'https://static.tvmaze.com/uploads/images/medium_portrait/83/207960.jpg'
            },
            status: 'Ended',
            summary:
              '<p><b>Seinfeld</b> is the story of a fictionalized version of stand-up comedian Jerry Seinfeld, his life in New York City and his quirky group of friends who join him in wrestling with life\'s most perplexing, yet often trivial questions. Often described as "a show about nothing," Seinfeld mines the humor in life\'s mundane situations like waiting in line, searching for a lost item, or the trials and tribulations of dating.</p>',
            ended: '1998-05-14',
            schedule: {
              time: '21:00',
              days: ['Thursday']
            },
            network: {
              id: 1,
              name: 'NBC',
              country: {
                name: 'United States',
                code: 'US',
                timezone: 'America/New_York'
              },
              officialSite: 'https://www.nbc.com/'
            },
            externals: {
              tvrage: 5145,
              thetvdb: 79169,
              imdb: 'tt0098904'
            },
            _embedded: {
              episodes: [],
              cast: []
            }
          }
        },
        {
          score: Math.random(),
          show: {
            id: 1645,
            url: 'https://www.tvmaze.com/shows/1645/comedians-in-cars-getting-coffee',
            name: 'Comedians in Cars Getting Coffee',
            image: {
              medium:
                'https://static.tvmaze.com/uploads/images/medium_portrait/203/509996.jpg',
              original:
                'https://static.tvmaze.com/uploads/images/original_untouched/203/509996.jpg'
            },
            status: 'Ended',
            summary:
              "<p>In <b>Comedians in Cars Getting Coffee</b>, comedian Jerry Seinfeld takes his comedy pals out for coffee in a selection of his classic automobiles. Larry David sums it up best when he says, 'You've finally made a show about nothing.</p>",
            ended: '2019-07-19',
            schedule: {
              time: '',
              days: []
            },
            network: null,
            externals: {
              tvrage: 32630,
              thetvdb: 260845,
              imdb: 'tt2314952'
            },
            _embedded: {
              episodes: [],
              cast: []
            }
          }
        }
      ]
    };

    const response = [
      {
        id: 530,
        url: 'https://www.tvmaze.com/shows/530/seinfeld',
        name: 'Seinfeld',
        status: 'Ended',
        summary:
          '<p><b>Seinfeld</b> is the story of a fictionalized version of stand-up comedian Jerry Seinfeld, his life in New York City and his quirky group of friends who join him in wrestling with life\'s most perplexing, yet often trivial questions. Often described as "a show about nothing," Seinfeld mines the humor in life\'s mundane situations like waiting in line, searching for a lost item, or the trials and tribulations of dating.</p>',
        image: {
          medium:
            'https://static.tvmaze.com/uploads/images/medium_portrait/83/207960.jpg'
        },
        ended: '1998-05-14',
        schedule: {
          time: '21:00',
          days: ['Thursday']
        },
        network: {
          id: 1,
          name: 'NBC',
          country: {
            name: 'United States',
            code: 'US',
            timezone: 'America/New_York'
          },
          officialSite: 'https://www.nbc.com/'
        },
        externals: {
          tvrage: 5145,
          thetvdb: 79169,
          imdb: 'tt0098904'
        },
        _embedded: {
          episodes: [],
          cast: []
        }
      },
      {
        id: 1645,
        url: 'https://www.tvmaze.com/shows/1645/comedians-in-cars-getting-coffee',
        name: 'Comedians in Cars Getting Coffee',
        status: 'Ended',
        summary:
          "<p>In <b>Comedians in Cars Getting Coffee</b>, comedian Jerry Seinfeld takes his comedy pals out for coffee in a selection of his classic automobiles. Larry David sums it up best when he says, 'You've finally made a show about nothing.</p>",
        image: {
          medium:
            'https://static.tvmaze.com/uploads/images/medium_portrait/203/509996.jpg',
          original:
            'https://static.tvmaze.com/uploads/images/original_untouched/203/509996.jpg'
        },
        ended: '2019-07-19',
        schedule: {
          time: '',
          days: []
        },
        network: null,
        externals: {
          tvrage: 32630,
          thetvdb: 260845,
          imdb: 'tt2314952'
        },
        _embedded: {
          episodes: [],
          cast: []
        }
      }
    ];

    const showSearchSpy = jest
      .spyOn(showApi, 'showSearch')
      .mockReturnValue(url);

    const axiosSpy = jest.spyOn(axios, 'get').mockResolvedValue(axiosResponse);

    try {
      const result = await searchTvShows('seinfeld');
      expect(showSearchSpy).toHaveBeenCalled();
      expect(axiosSpy).toHaveBeenCalledWith(url);
      expect(result).toStrictEqual(response);
    } catch (error) {
      // console.log('test err ', error);
    }
  });

  it('should throw an error', () => {});
});
/*
describe('RetrieveShowEpisodes', () => {
  it('should return an array of episodes for  given tvshow', () => {
    const spy = jest
      .spyOn(showApi, 'retrieveShowEpisodes')
      .mockResolvedValue('');
  });
});

describe('RetrieveShowInformation', () => {
  it('should return full tvshow information for a given tvshow', () => {
    // const showSearchMock = jest.spyOn();
  });
});

describe('GetPopularShows', () => {
  it('should return an array of popular tvshows', () => {
    // const showSearchMock = jest.spyOn();
  });
});*/
