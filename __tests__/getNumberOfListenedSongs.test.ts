import { describe, expect, test } from '@jest/globals';
import { getNumberOfListenedSongs } from '@/utils/getNumberOfListenedSongs';
import { emptySongs, songs, songsWithZeroLC, zeroLC } from '@/mocks/songs';

describe('getNumberOfListenedSongs Test', () => {
	test('with no songs result will be 0', () => {
		const expectedResult = { listenedSongs: zeroLC, withRepeat: zeroLC };
		expect(getNumberOfListenedSongs(emptySongs)).toEqual(expectedResult);
	});

	test('with listen_counter = 0 result will be 0', () => {
		const expectedResult = { listenedSongs: zeroLC, withRepeat: zeroLC };
		expect(getNumberOfListenedSongs(songsWithZeroLC)).toEqual(expectedResult);
	});

	test('with regular different listen_counter result will depend on them', () => {
		const expectedResult = { listenedSongs: 3, withRepeat: 6 };
		expect(getNumberOfListenedSongs(songs)).toEqual(expectedResult);
	});
});
