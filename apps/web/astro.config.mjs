import starlight from '@astrojs/starlight'
import { defineConfig } from 'astro/config'

export default defineConfig({
	site: 'https://cyberuni.github.io',
	base: '/spec-driven-development',
	integrations: [
		starlight({
			title: 'Spec-Driven Development',
			social: [
				{
					icon: 'github',
					label: 'GitHub',
					href: 'https://github.com/cyberuni/spec-driven-development',
				},
			],
			sidebar: [
				{
					label: 'Methodology',
					items: [
						{ label: 'Overview', slug: 'methodology/overview' },
						{ label: 'Spec Lifecycle', slug: 'methodology/spec-lifecycle' },
						{ label: 'Principles', slug: 'methodology/principles' },
					],
				},
				{
					label: 'Skills Reference',
					items: [
						{ label: 'create-spec', slug: 'skills/create-spec' },
						{ label: 'validate-spec', slug: 'skills/validate-spec' },
					],
				},
			],
		}),
	],
})
