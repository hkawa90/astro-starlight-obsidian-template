// @ts-check
import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';
import starlightObsidian, { obsidianSidebarGroup } from 'starlight-obsidian';

// import env
// const siteName = import.meta.env.CONFIG_SITE_NAME;
// const baseName = import.meta.env.CONFIG_BASE_NAME;
// const vaultName = import.meta.env.CONFIG_VAULT_NAME;
// const titleName = import.meta.env.CONFIG_TITLE_NAME;
const siteName = process.env.CONFIG_SITE_NAME || "";
const baseName = process.env.CONFIG_BASE_NAME || "";
const vaultName = process.env.CONFIG_VAULT_NAME || "VAULT";
const titleName = process.env.CONFIG_TITLE_NAME || "TITLE";

// https://astro.build/config
export default defineConfig({
	site: siteName,
	base: baseName,
	integrations: [
		starlight({
			plugins: [
				// Generate the Obsidian vault pages.
				starlightObsidian({
					vault: vaultName,
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
