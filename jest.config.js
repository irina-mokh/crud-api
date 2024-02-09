export default {
  preset: 'ts-jest',
  testEnvironment: 'node',
	transform: {
		'\\.[jt]sx?$': 'ts-jest'
	},
	moduleNameMapper: {
		'(.+)\\.js': '$1'
	},
	extensionsToTreatAsEsm: ['.ts']
};