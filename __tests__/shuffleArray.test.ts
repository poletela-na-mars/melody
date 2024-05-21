import { describe, expect, test } from '@jest/globals';
import { shuffleArray } from '@/utils/shuffleArray';
import { emptySongs, songs } from '@/mocks/songs';
import { Song } from '@/types';

describe('shuffleArray Test', () => {
	test('with empty array result will be empty array', () => {
		const expectedResult: Song[] = [];
		const es = emptySongs;
		shuffleArray(es);
		expect(es).toEqual(expectedResult);
	});

	test('with array of data result will be shuffled data', () => {
		expect(shuffleArray(songs)).not.toEqual(songs);
	});
});
