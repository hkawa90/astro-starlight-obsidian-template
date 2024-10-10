# Obsidianで作成したドキュメントを[Astro](https://astro.build/)の[Starlight](https://starlight.astro.build/) themeで公開する

Obsidianで作成していたMarkdownをsiteで公開できるようにテンプレートにしてみた。

# Demo

工事中。

# Feature

- templateからリポジトリ作成して、別途用意した`Obsidian`のリポジトリからsiteをGitHub Pagesで公開できます。
- ローカルPCで`node.js`とかプログラムのインストールが不要です。
- GithubのEnvironmentにサイト情報を格納するようにしているため、ほほソースコードの編集作業などが不必要。
- deploy処理はGithub Actionsで実行するだけです。
- .github/workflow/deploy.yamlを実行するだけでObsidianのVaultsを格納した別リポジトリからサイトを構築できる。サイトでは`pagefind`で検索できるようになります。
- [HiDeoo/starlight-obsidian](https://github.com/HiDeoo/starlight-obsidian) plugin導入でほぼ`obsidian`と同様な表示となる。
	- Obsidianの再現性については[Features | Starlight Obsidian](https://starlight-obsidian.vercel.app/guides/features/)を参照。

# Requirement

- Obsidianの`vaults`のみをgithubに入れておいたもの。ここのリポジトリ名を控えておいてください。
- favicon.svg
  faviconファイルを`SVG`で用意しておきます。
- topページとなる`index.md`ないし`index.mdx`を用意しておきます。設定でObsidianのWelcomeページを利用することができます(後述)。

# Configuration

Githubの`Environment`で変数名を設定するだけです(実例はあとで追記予定)。
- 環境名productionの変数名 VLT_REPOSITORY
     リポジトリ名(owerner/repository形式)を設定する 例) hkawa90/Obsidian-sample-vaults
- 環境名productionの変数名 VAULT
      ObsidianのVault名を入力する
- 環境名productionの変数名 TITLE
	サイトのタイトルを入力します。

トップページを`Obsidian`のWelcomeページにする場合は、以下の`astro.config.mjs`ファイルの

```js
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
```

次のように`//`を削除してください。`notes/welcome`をほかのページのurlに変更すれば、それがトップぺーじになります。

```js
export default defineConfig({
	site: siteName,
	base: baseName,
	// トップページをObsidianのWelcomeページへジャンプさせる場合は次の3行の先頭の//を削除する
	redirects: {
	 	'/': `/${baseName}/notes/welcome`
	},
	integrations: [
```