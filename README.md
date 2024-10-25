# Obsidianで作成したドキュメントを[Astro](https://astro.build/)の[Starlight](https://starlight.astro.build/) themeで公開する

Obsidianで作成していたMarkdownをsiteで公開できるようにテンプレートにしてみた。

- `Use this template`ボタン押下でSite(Github Pages)作成リポジトリができる
- [Astro](https://astro.build/)の[Starlight](https://starlight.astro.build/) themeで見栄えがいいSiteができる。

# Feature

- templateからリポジトリ作成して、別途用意した`Obsidian`のリポジトリからsiteをGitHub Pagesで公開できます。
- ローカルPCで`node.js`とかプログラムのインストールが不要です。
- rootの`config.yaml`にサイト情報を格納するようにしているため、ほほソースコードの編集作業などが不必要。
- deploy処理はGithub Actionsで実行するだけです。
- .github/workflow/deploy.yamlを実行するだけでObsidianのVaultsを格納した別リポジトリからサイトを構築できる。サイトでは`pagefind`で検索できるようになります。
- [HiDeoo/starlight-obsidian](https://github.com/HiDeoo/starlight-obsidian) plugin導入でほぼ`obsidian`と同様な表示となる。
	- Obsidianの再現性については[Features | Starlight Obsidian](https://starlight-obsidian.vercel.app/guides/features/)を参照。

# Demo

https://hkawa90.github.io/astro-starlight-obsidian-template/

ここで使用しているObsidianのリポジトリは[hkawa90/Obsidian-Vaults-DevDoc: Obsidian Vaults](https://github.com/hkawa90/Obsidian-Vaults-DevDoc)です。

# Getting Started

1. Gihubのアカウントを作成(`Sign up`)してログイン(`Sign in`)する。
2. こちらの上部にある`Use this template`をクリックして、
![](img/UseTemplate.svg)
3. `Create a new repository`を選択
4. `Repository name`を入力して、`Create repository`をクリック
![](img/CreateANewRepository.png)
5. 新たなリポジトリが作成される。ここでページ上部の`Settings`をクリック
![](img/Settings.png)
6. `Environments`をクリック
![](img/Settings-Environments.png)
7. `New environments`をクリック
![](img/Settings-Environments-NewEnvironments.png)
8. `Name`に`production`と入力して、`Configure environment`をクリック
![](img/Environments-Add.png)
9. config.yamlを編集してサイトの情報を設定します。`vault_directory`は`vault`が格納されるdirectoryとなります。`Obsidian vault`を同じリポジトリに格納した場合のpathを指定します。`vault_repository`はObsidian vaultが格納されているリポジトリを指定します。`Obsidian vault`を同じリポジトリに格納した場合は`null`を指定します。
```yaml
# Site title
title: MY TITLE
# Obsidian note name
note: note
# path of VAULT
vault_directory: VAULT
# repository name or null
vault_repository: hkawa90/Obsidian-Vaults-DevDoc
```
11. `Pages`を選択します。
![](img/Settings-Pages.png)
12. `Build and deployment`項目の`branch`で`None`プルダウンから`main`を選択して、`Save`ボタンをクリック
![](img/Build-Deploy.png)
13. ページ上部の`<> Code`を選択して、次に`.githbu/workflow/`、最後に`deploy.yml`を選択します。
![](img/Code.png)
![](img/workflow.png)
![](img/deploy-yml.png)
14. ページ上部の`View Runs`を選択します。
![](img/View-Runs.png)
15. `Run workflow`プルダウンメニューから`Run workflow`を選択。
![](img/deploy-action.png)
16. 正常終了すると次のような画面となります。`Settings/Pages`ページ上部に公開されたURLが表示されます。`Visit site`をクリックすると作成されたページが確認できます。
![](img/Action-Completre.png)


# Requirement

- Obsidianの`vaults`のみをgithubに入れておいたもの。ここのリポジトリ名を控えておいてください。
- public/favicon.svg
  faviconファイルを`SVG`で用意しておきます。
- topページとなる`src/content/docs/index.md`ないし`src/content/docs/index.mdx`を用意しておきます。設定でObsidianのWelcomeページを利用することができます(後述)。
- 設定ファイルの`config.yaml`

# Configuration

作成する`Site`のトップページを`Obsidian`のWelcomeページにする場合は、`astro.config.mjs`ファイルで

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

次のように`//`(コメント)を削除してください。`notes/welcome`をほかのページのurlに変更すれば、それがトップぺーじになります。

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

