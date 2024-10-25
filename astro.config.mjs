// @ts-check
import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';
import starlightObsidian, { obsidianSidebarGroup } from 'starlight-obsidian';

// import env
// defineConfig実行時点では、`import.meta.env`は使えないので、環境変数から取得するように変更
// const siteName = import.meta.env.CONFIG_SITE_NAME;
// const baseName = import.meta.env.CONFIG_BASE_NAME;
// const vaultName = import.meta.env.CONFIG_VAULT_NAME;
// const titleName = import.meta.env.CONFIG_TITLE_NAME;
const siteName = process.env.CONFIG_SITE_NAME || "";
const baseName = process.env.CONFIG_BASE_NAME || "";
const vaultName = process.env.CONFIG_VAULT_NAME || "VAULT";
const titleName = process.env.CONFIG_TITLE_NAME || "TITLE";
const noteName = process.env.CONFIG_NOTE_NAME || "note";

// https://astro.build/config
export default defineConfig({
	site: siteName,
	base: baseName,
	// トップページをObsidianのWelcomeページへジャンプさせる場合は次の3行の先頭の//を削除する
	// redirects: {
	// 	'/': `/${baseName}/notes/welcome`
	// },
	integrations: [
		starlight({
			plugins: [
				// Generate the Obsidian vault pages.
				starlightObsidian({
					vault: vaultName,
					output: noteName
				}),
			],
			title: titleName,
			// pagefindで日本語で検索できるようにするためlocaleを設定する
			locales: {
				root: {
					label: 'Japanese',
					lang: 'ja',
				},
			},
//			social: {
//				github: 'https://github.com/hkawa90/astro-starlight-trial',
//			},
			sidebar: [
				// Add the generated sidebar group to the sidebar.
				obsidianSidebarGroup,
			],
		}),
	],
});
