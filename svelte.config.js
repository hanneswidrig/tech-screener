import adapter from '@sveltejs/adapter-auto';
import preprocess from 'svelte-preprocess';
import Icons from 'unplugin-icons/vite';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	preprocess: preprocess({ postcss: true }),
	kit: {
		adapter: adapter(),
		vite: {
			plugins: [Icons({ compiler: 'svelte' })],
		},
	},
};

export default config;
