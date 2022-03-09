export type Technology = { key: string; label: string; selected: boolean };
export type TechnologyGroup = { key: string; title: string; items: Technology[] };

export const technologyGroups: () => TechnologyGroup[] = () => [
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
			{ key: 'cplusplus', label: 'C++', selected: false },
		],
	},
	{
		key: 'frontEndFrameworks',
		title: 'Front End Frameworks',
		items: [
			{ key: 'react', label: 'React', selected: false },
			{ key: 'angular', label: 'Angular', selected: false },
			{ key: 'vue', label: 'Vue', selected: false },
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
		key: 'databases',
		title: 'Databases',
		items: [
			{ key: 'sql', label: 'SQL', selected: false },
			{ key: 'nosql', label: 'NoSQL', selected: false },
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
