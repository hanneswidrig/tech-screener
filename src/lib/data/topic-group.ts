export type TopicKey =
	| 'javascript'
	| 'typescript'
	| 'java'
	| 'csharp'
	| 'golang'
	| 'python'
	| 'react'
	| 'angular'
	| 'dotnet'
	| 'node'
	| 'aws'
	| 'azuredeveloper'
	| 'azurearchitect';

export type TopicGroupKey =
	| 'programmingLanguages'
	| 'frontEndFrameworks'
	| 'backEndFrameworks'
	| 'cloudSolutions';

export type Topic = { key: TopicKey; label: string; selected: boolean };
export type TopicGroup = { key: TopicGroupKey; title: string; items: Topic[] };

export const topicGroups: () => TopicGroup[] = () => [
	{
		key: 'programmingLanguages',
		title: 'Programming Languages',
		items: [
			{ key: 'javascript', label: 'JavaScript', selected: false },
			{ key: 'typescript', label: 'TypeScript', selected: false },
			{ key: 'java', label: 'Java', selected: false },
			{ key: 'csharp', label: 'C#', selected: false },
			{ key: 'golang', label: 'Go', selected: false },
			{ key: 'python', label: 'Python', selected: false },
		],
	},
	{
		key: 'frontEndFrameworks',
		title: 'Front End Frameworks',
		items: [
			{ key: 'react', label: 'React', selected: false },
			{ key: 'angular', label: 'Angular', selected: false },
		],
	},
	{
		key: 'backEndFrameworks',
		title: 'Back End Frameworks',
		items: [
			{ key: 'dotnet', label: '.NET', selected: false },
			{ key: 'node', label: 'Node.js', selected: false },
		],
	},
	{
		key: 'cloudSolutions',
		title: 'Cloud Solutions',
		items: [
			{ key: 'aws', label: 'Amazon Web Services (AWS)', selected: false },
			{ key: 'azuredeveloper', label: 'Azure (Developer)', selected: false },
			{ key: 'azurearchitect', label: 'Azure (Architect)', selected: false },
		],
	},
];
