import immutable from 'immutable';
import expect from 'expect';
import INITIAL_STATE from '../src/App/INITIAL_STATE'

describe('challenges', ()=> {
	const challenges = INITIAL_STATE.get('challenges');
	const categories = INITIAL_STATE.get('categories');

	it('should have correct challenges', ()=> {
		let ch = challenges.get('1_1');
		expect(ch.get('level')).toBe(1);
		expect(ch.get('id')).toBe('1_1');
		expect(ch.get('requiredStars')).toBe(0);

		ch = challenges.get('1_2');
		expect(ch.get('level')).toBe(2);
		expect(ch.get('id')).toBe('1_2');
		expect(ch.get('requiredStars')).toBe(2);

	});
});

describe('challengeContainers', ()=> {
	const challengeContainers = INITIAL_STATE.get('challengeContainers');

	it('should have correct challenge containers', ()=> {
		expect(challengeContainers.size).toBe(12);
		console.log(JSON.stringify(challengeContainers));
	});
});
