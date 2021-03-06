import immutable from 'immutable';
export default {

	isEnabled(tables, value){
		return tables.some(t => value % t == 0 && value <= t * 10)
	},

	getProblemsNumeric(tables){
		return tables.reduce((arr, table) => arr.concat(Array(10).fill(0).map((dummy, index) => table + '*' + (index + 1))), []);
	},

	getProblemsRandom(tables){
		return this.getProblemsNumeric(tables).sort(() => 0.5 - Math.random());
	},

	getProblemsRandomRotated(tables){
		return this.getProblemsNumeric(tables).sort(() => 0.5 - Math.random()).map(str => str.split('*').sort(() => 0.5 - Math.random()).join('*'));
	},

	checkAnswer(problem, answer){
		const a = problem.split('*');
		return parseInt(a[0]) * parseInt(a[1]) == answer;
	},
	getKey(){
		return Math.floor(Math.random() * 10000)
	},

	getLevelData(gameLevel, tables){
		const maxGridValues = tables.reduce((prev, current) => Math.max(prev, current * 10), 100);
		let level = {
			problemNr: 0,
			currentStep: 0,
			currentAnswer: '',
			problems: [],
			errors: 0,
			ok: '',
			//history:[]
			history: Array(5).fill({}).map(obj => {
				return {
					value: '\u00a0',
					ok: false,
					key: this.getKey()
				}
			})
		};
		switch (gameLevel) {
			case 'level1':
				level.grid = Array(maxGridValues).fill({}).map((obj, index) => {
					return {
						btnNr: index,
						value: index + 1,
						enabled: this.isEnabled(tables, index + 1)
					}
				});
				level.problems = this.getProblemsNumeric(tables);
				break;

			case 'level2':
				level.grid = Array(maxGridValues).fill({}).map((obj, index) => {
					return {
						btnNr: index,
						value: index + 1,
						enabled: true
					}
				});
				level.problems = this.getProblemsNumeric(tables);
				break;

			case 'level3':
				level.grid = Array(maxGridValues).fill({}).map((obj, index) => {
					return {
						btnNr: index,
						value: index + 1,
						enabled: this.isEnabled(tables, index + 1)
					}
				});
				level.problems = this.getProblemsRandom(tables);
				break;

			case 'level4':
				level.grid = Array(maxGridValues).fill({}).map((obj, index) => {
					return {
						btnNr: index,
						value: index + 1,
						enabled: true
					}
				});
				level.problems = this.getProblemsRandomRotated(tables);
				break;

			case 'level5':
				level.grid = this.getProblemsRandomRotated(tables).map((problem, index) => {
					return {
						btnNr: index,
						value: problem,
						enabled: true
					}
				});
				level.problems = tables.reduce((arr, table) => arr.concat(Array(10).fill(0).map((dummy, index) => (index + 1) * table)), []);
				break;

			case 'level6':
				level.grid = Array(maxGridValues).fill({}).map((obj, index) => {
					return {
						btnNr: index,
						value: index + 1,
						enabled: true
					}
				});
				level.problems = this.getProblemsRandomRotated(tables).slice(0,20);
				break;

			case 'level7':
				level.grid = Array(maxGridValues).fill({}).map((obj, index) => {
					return {
						btnNr: index,
						value: index + 1,
						enabled: true
					}
				});
				level.problems = this.getProblemsRandomRotated(tables).slice(0,30);
				break;

			case 'level8':
				level.grid = Array(maxGridValues).fill({}).map((obj, index) => {
					return {
						btnNr: index,
						value: index + 1,
						enabled: true
					}
				});
				level.problems = this.getProblemsRandomRotated(tables).slice(0,50);
				break;

		}
		return level;
	},
	// Immutable functions
	calcStars(state){
		return state.get('challengeStars').reduce((sum, val) => sum + val, 0);
	},

	updateStars(state){
		state = state.set('prevStars', state.get('stars'));
		const starSum = state.get('challengeStars').reduce((sum, val) => sum + val, 0);
		state = state.set('stars', starSum);
		return state;
	}
}

