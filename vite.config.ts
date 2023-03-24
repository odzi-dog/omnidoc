import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';
import Icons from 'unplugin-icons/vite';
import viteTs from 'vite-plugin-ts';

export default defineConfig({
	plugins: [
		viteTs(),
		sveltekit(),
		Icons({
			compiler: 'svelte',
		}),
	],
	server: {
		proxy: {
			'/.ory': {
				target: "https://focused-euler-uqf1ohys7f.projects.oryapis.com",
				changeOrigin: true,
				cookieDomainRewrite: "localhost",
				rewrite: (path) => path.replace(/^\/.ory/, ''),
			}
		}
	}
});
