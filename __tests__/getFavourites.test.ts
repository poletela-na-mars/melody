import { describe, test, expect } from '@jest/globals';
import { getFavourites } from '@/utils/getFavourites';
import { agm, emptySongs, mostListenedAgm, songs, songsWithSameAGM, songsWithSameLC } from '@/mocks/songs';

describe('getFavourites Test', () => {
	test('with no songs result will be empty', () => {
		const expectedResult = { favAuthor: '', favGenre: '', favMood: '' };
		expect(getFavourites(emptySongs)).toEqual(expectedResult);
	});

	test('with same authors, genres and moods result will be sole', () => {
		const { author, genre, mood } = agm;
		const expectedResult = { favAuthor: author, favGenre: genre, favMood: mood };
		expect(getFavourites(songsWithSameAGM)).toEqual(expectedResult);
	});

	test('with different authors, genres and moods result will depend on the most frequently listened ones', () => {
		const { author, genre, mood } = mostListenedAgm;
		const expectedResult = { favAuthor: author, favGenre: genre, favMood: mood };
		expect(getFavourites(songs)).toEqual(expectedResult);
	});

	test('with same listen_counter result will depend on order', () => {
		const { author, genre, mood } = agm;
		const expectedResult = { favAuthor: author, favGenre: genre, favMood: mood };
		expect(getFavourites(songsWithSameLC)).toEqual(expectedResult);
	});
});
