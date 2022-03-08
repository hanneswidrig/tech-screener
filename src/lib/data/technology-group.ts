import type { TechnologyGroup } from '$lib/types/Quiz.type';

export const technologyGroups: () => TechnologyGroup[] = () => [
	{
		key: 'programmingLanguages',
		title: 'Programming Languages',
		items: [
			{ key: 'csharp', label: 'C#', selected: false },
			{ key: 'typescript', label: 'TypeScript', selected: false },
		],
	},
	{
		key: 'jsFrameworks',
		title: 'Front End Frameworks',
		items: [
			{ key: 'react', label: 'React', selected: false },
			{ key: 'angular', label: 'Angular', selected: false },
		],
	},
];
