# Obsidianで作成したドキュメントを[Astro](https://astro.build/)の[Starlight](https://starlight.astro.build/) themeで公開する

Obsidianで作成していたMarkdownをsiteで公開できるようにテンプレートにしてみた。

# Demo

https://hkawa90.github.io/astro-starlight-obsidian-trial/

# Feature

- templateからsiteをGitHub Pagesで公開できます。
- buildするだけで`pagefind`で検索できるようになります。
- [HiDeoo/starlight-obsidian](https://github.com/HiDeoo/starlight-obsidian) plugin導入でほぼ`obsidian`と同様な表示となる。

# Requirement

- Obsidianの`vaults`のみをgithubに入れておいたもの
- favicon.svg
  faviconファイルを`SVG`で用意しておきます。
ENVironment設定しておく
USER_NAME       xxx
REPOSITORY	xxx
VAULT		xxx
TITLE		xxx
VLT_REPOSITORY	xxx



ローカルで`preview`したい人は、

- node.js
- npm/pnpmなどのpackage manager

# Configuration

設定自体は`astro.config.mjs`の変更だけで済みます。

```js
// @ts-check
import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';
import starlightObsidian, { obsidianSidebarGroup } from 'starlight-obsidian';

// https://astro.build/config
export default defineConfig({
	site: 'https://hkawa90.github.io',
	base: 'astro-starlight-trial',
	integrations: [
		starlight({
			plugins: [
				// Generate the Obsidian vault pages.
				starlightObsidian({
					vault: './MyDoc/',
				}),
                        ],
			title: 'My Docs',
                        // pagefindで日本語で検索できるようにするためlocaleを設定する
			locales: {
                                 root: {
					label: 'Japanese',
					lang: 'ja',
				},
			},
			social: {
				github: 'https://github.com/hkawa90/astro-starlight-trial',
			},
			sidebar: [
				{
					label: 'Guides',
					items: [
						// Each item here is one entry in the navigation menu.
						{ label: 'Example Guide', slug: 'guides/example' },
					],
				},
				{
					label: 'Reference',
					autogenerate: { directory: 'reference' },
				},
				// Add the generated sidebar group to the sidebar.
				obsidianSidebarGroup,
			],
		}),
	],
});

```
