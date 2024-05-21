import { describe, expect, test } from '@jest/globals';
import { getUserNameFromEmail } from '@/utils/getUserNameFromEmail';
import {
	nameFromSeveralAtsEmail,
	noAtsEmail,
	noEmail,
	regularEmail,
	regularName,
	severalAtsEmail
} from '@/mocks/emails';

describe('getUserNameFromEmail Test', () => {
	test('with no email result will be undefined', () => {
		const expectedResult = undefined;
		expect(getUserNameFromEmail(noEmail)).toEqual(expectedResult);
	});

	test('with regular email result will be a substring before @', () => {
		const expectedResult = regularName;
		expect(getUserNameFromEmail(regularEmail)).toEqual(expectedResult);
	});

	test('with email with several @s result will be the first substring before @', () => {
		const expectedResult = nameFromSeveralAtsEmail;
		expect(getUserNameFromEmail(severalAtsEmail)).toEqual(expectedResult);
	});

	test('with email with no @s result will be the full email address', () => {
		const expectedResult = noAtsEmail;
		expect(getUserNameFromEmail(noAtsEmail)).toEqual(expectedResult);
	});
});
