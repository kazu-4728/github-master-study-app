# 🎓 GitHub Master Study App

[![Live Demo](https://img.shields.io/badge/Live-Demo-brightgreen)](https://3000-ithvruy11pdt8jw9fe1g4-6532622b.e2b.dev)
[![Hono](https://img.shields.io/badge/Hono-Framework-orange)](https://hono.dev)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue)](https://typescript.org)
[![Cloudflare](https://img.shields.io/badge/Cloudflare-Pages-f38020)](https://pages.cloudflare.com)
[![License](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)

**最先端技術で構築された GitHub 学習プラットフォーム**

初心者から上級者まで、Git・GitHub を効率よく習得できるモダンな学習アプリケーション。
Cloudflare の最新技術スタックを使用し、エンタープライズレベルの機能を提供します。

## 🌟 主要機能

### 📚 **完全な学習システム**
- **初心者コース**: Git/GitHub基本概念（4レッスン）
- **中級コース**: ブランチ戦略・マージコンフリクト（2レッスン）
- **上級コース**: GitHub Actions・高度なGit操作（2レッスン）
- **図解付き説明**: ビジュアルで理解しやすい学習体験

### 🧠 **インタラクティブクイズシステム**
- **37問の総合クイズ**: 基本知識・コマンド・ワークフロー
- **リアルタイム採点**: 即座にフィードバック
- **詳細解説**: 正解・不正解の理由を丁寧に説明
- **進捗追跡**: 個人の学習データを完全管理

### 💻 **実践練習環境**
- **コマンドライン練習**: 実際のGitコマンド入力・検証
- **ブランチ操作**: 作成からマージまでの実践
- **プルリクエスト**: コラボレーション基礎
- **バリデーション機能**: コマンドの正誤を即座に判定

### 📊 **進捗管理・データ永続化**
- **Cloudflare D1**: エンタープライズグレードのデータベース
- **リアルタイム同期**: 学習進捗の即座な更新
- **JSON エクスポート**: 学習データのバックアップ
- **QRコード共有**: デバイス間データ移行
- **URL共有**: リンク経由でのデータ復元

### 🚀 **最先端技術スタック**
- **Hono Framework**: 高速・軽量 TypeScript フレームワーク
- **Cloudflare Pages**: エッジでのゼロコールドスタート
- **TypeScript**: 型安全なフルスタック開発
- **Progressive Web App**: オフライン対応・ネイティブ体験

## 🌐 ライブデモ

**[🚀 Live Demo はこちら](https://3000-ithvruy11pdt8jw9fe1g4-6532622b.e2b.dev)**

今すぐアクセスして学習を開始！全機能を無料でお試しいただけます。

## 🏗️ 技術仕様

### 💻 **フロントエンド**
- **HTML5/CSS3**: モダンCSS (Grid/Flexbox)
- **JavaScript ES6+**: 非同期処理・モジュラー設計
- **Font Awesome 6.4.0**: 豊富なアイコンライブラリ
- **LocalStorage**: クライアントサイド永続化

### ⚡ **バックエンド**
- **Hono**: 超高速TypeScriptフレームワーク
- **Cloudflare Workers**: エッジコンピューティング
- **Cloudflare D1**: SQLite互換グローバルデータベース
- **RESTful API**: 型安全なAPI設計

### 🔧 **開発・運用**
- **TypeScript**: フルスタック型安全開発
- **Vite**: 高速ビルドツール
- **PM2**: プロセス管理・モニタリング
- **Wrangler**: Cloudflareデプロイメント

## 🚀 クイックスタート

### 📦 **ローカル環境セットアップ**

```bash
# リポジトリクローン
git clone https://github.com/kazu-4728/github-master-study-app.git
cd github-master-study-app

# 依存関係インストール
npm install

# プロジェクトビルド
npm run build

# 開発サーバー起動 (PM2使用)
npm run clean-port
pm2 start ecosystem.config.cjs

# サーバー確認
npm run test
```

### 🌐 **Cloudflare Pages デプロイ**

```bash
# Cloudflare API設定（必須）
export CLOUDFLARE_API_TOKEN="your-api-token"

# プロダクションビルド
npm run build

# Cloudflare Pages デプロイ
npm run deploy:prod
```

## 📱 使い方ガイド

### 1️⃣ **学習開始**
1. **ホーム画面**で現在の進捗を確認
2. **学習セクション**で段階的にレッスンを進める
3. **実践セクション**でハンズオン練習

### 2️⃣ **理解度チェック**
1. **クイズセクション**で知識をテスト
2. 間違えた問題は詳細解説で理解を深める
3. **37問**の総合的な評価システム

### 3️⃣ **データ管理**
- **⬇ボタン**: 学習データをJSONファイルでダウンロード
- **⬆ボタン**: バックアップファイルから復元
- **⋮メニュー**: QRコード・URL共有でデバイス間移行

### 4️⃣ **高度な機能**
- **リアルタイム進捗**: Cloudflare D1での同期
- **オフライン学習**: PWA機能によるオフライン対応
- **マルチデバイス**: スマホ・タブレット完全対応

## 🎯 学習コンテンツ詳細

### 📚 **初心者コース（4レッスン）**
1. **Gitとは？** - バージョン管理システムの基本概念
2. **GitHubとは？** - クラウドリポジトリとソーシャルコーディング
3. **リポジトリの作成** - プロジェクトの始め方と初期設定
4. **コミットとプッシュ** - 変更の記録とアップロード

### 🌿 **中級コース（2レッスン）**
5. **ブランチ戦略** - Git Flow と効果的なブランチ管理
6. **マージコンフリクトの解決** - コンフリクト解決テクニック

### 🚀 **上級コース（2レッスン）**
7. **GitHub Actions入門** - CI/CDパイプライン構築
8. **高度なGit操作** - リベース・チェリーピック・サブモジュール

### 🧠 **クイズシステム（37問）**
- **基本知識クイズ** (10問): Git/GitHub用語・概念
- **コマンドクイズ** (15問): 実際のGitコマンド
- **ワークフロークイズ** (12問): 開発フロー理解

## 🏗️ プロジェクト構造

```
github-master-study-app/
├── src/                          # TypeScript ソースコード
│   ├── index.tsx                 # メインアプリケーション
│   ├── types.ts                  # 型定義
│   └── routes/                   # API ルート
│       ├── api.ts               # メインAPI
│       ├── lessons.ts           # レッスンシステム
│       ├── quiz.ts              # クイズシステム
│       ├── practice.ts          # 実践練習
│       └── progress.ts          # 進捗管理
├── public/static/                # 静的アセット
│   ├── style.css                # メインスタイル
│   └── js/                      # JavaScript
│       ├── app.js               # フロントエンド ロジック
│       └── data-manager.js      # データ管理機能
├── migrations/                   # データベーススキーマ
│   └── 0001_initial_schema.sql  # 初期スキーマ
├── dist/                         # ビルド出力
│   ├── _worker.js               # Cloudflare Worker
│   └── static/                  # 静的ファイル
├── ecosystem.config.cjs          # PM2 設定
├── wrangler.jsonc               # Cloudflare 設定
├── package.json                 # 依存関係
└── README.md                    # このファイル
```

## 📊 データベース設計

### 🗄️ **Cloudflare D1 スキーマ**

```sql
-- ユーザー進捗管理
CREATE TABLE user_progress (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    user_id TEXT NOT NULL,
    course_type TEXT NOT NULL,    -- 'beginner', 'intermediate', 'advanced'
    lesson_id TEXT NOT NULL,
    completed BOOLEAN DEFAULT FALSE,
    completion_date DATETIME DEFAULT CURRENT_TIMESTAMP,
    time_spent INTEGER DEFAULT 0
);

-- クイズ結果追跡
CREATE TABLE quiz_results (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    user_id TEXT NOT NULL,
    quiz_type TEXT NOT NULL,      -- 'basic', 'commands', 'workflow'
    question_id TEXT NOT NULL,
    answer TEXT NOT NULL,
    is_correct BOOLEAN NOT NULL,
    completed_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- 学習統計
CREATE TABLE user_stats (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    user_id TEXT UNIQUE NOT NULL,
    total_study_time INTEGER DEFAULT 0,
    lessons_completed INTEGER DEFAULT 0,
    quizzes_completed INTEGER DEFAULT 0,
    current_level TEXT DEFAULT 'beginner',
    streak_days INTEGER DEFAULT 0
);
```

## 🚀 パフォーマンス特徴

### ⚡ **超高速レスポンス**
- **Cloudflare Edge**: 世界200都市以上での高速配信
- **ゼロコールドスタート**: Hono最適化による即座の応答
- **軽量バンドル**: 最小限のJavaScript配信

### 📱 **完全レスポンシブ**
- **モバイルファースト**: スマートフォン最適化
- **タブレット対応**: iPadなど大画面デバイス
- **デスクトップ**: フル機能デスクトップ体験

### 🔒 **セキュリティ**
- **HTTPS強制**: 全通信の暗号化
- **CSP対応**: コンテンツセキュリティポリシー
- **入力サニタイゼーション**: XSS攻撃対策

## 🛠️ 開発コマンド

```bash
# 開発サーバー（Sandbox用）
npm run dev:sandbox

# データベース付き開発
npm run dev:d1

# プロダクションビルド
npm run build

# テストサーバー確認
npm run test

# ポートクリーンアップ
npm run clean-port

# データベース操作
npm run db:migrate:local    # ローカルマイグレーション
npm run db:seed            # テストデータ投入
npm run db:reset           # データベースリセット

# Git操作ヘルパー
npm run git:status         # Git状態確認
npm run git:commit "msg"   # 一括コミット

# デプロイ
npm run deploy:prod        # Cloudflare Pages本番デプロイ
```

## 🔧 環境設定

### 📋 **必要な環境変数**
```bash
# .env.local (ローカル開発用)
CLOUDFLARE_API_TOKEN=your_api_token
CLOUDFLARE_ACCOUNT_ID=your_account_id

# Wrangler設定
npx wrangler login          # Cloudflareログイン
npx wrangler whoami         # アカウント確認
```

### 🔑 **API設定**
1. **Cloudflare Dashboard** でAPI トークン作成
2. **Pages:Edit** 権限を付与
3. **D1:Edit** 権限を付与（データベース使用時）

## 🎯 対象ユーザー

### 👥 **主要ターゲット**
- **プログラミング初心者**: Git/GitHub を初めて学ぶ方
- **エンジニア志望者**: 転職・スキルアップを目指す方
- **学生**: 情報系学部・プログラミング学習者
- **チーム開発者**: 協力開発スキルを身につけたい方

### 📈 **期待される学習効果**
- Git/GitHub の基本概念完全理解
- 実際のコマンド操作による実践スキル
- チーム開発での協力フロー習得
- CI/CD・自動化技術の基礎知識
- モダン開発ツールチェーンの理解

## 🔮 ロードマップ・今後の拡張

### 🆕 **近期実装予定**
- **PWA完全対応**: オフライン学習機能
- **仮想ターミナル**: ブラウザ内Git環境
- **マルチ言語対応**: 英語・中国語・韓国語
- **AI学習アシスタント**: 個別学習サポート

### 🚀 **中長期ビジョン**
- **コミュニティ機能**: 学習者同士の交流プラットフォーム
- **ライブコーディング**: リアルタイム協力学習
- **企業研修パッケージ**: 法人向けカスタマイズ版
- **認定資格システム**: 学習成果の可視化・認定

## 🤝 コントリビューション

プルリクエスト・イシュー報告を歓迎します！

### 🐛 **バグ報告**
[Issues](https://github.com/kazu-4728/github-master-study-app/issues) でバグを報告してください。

### 💡 **機能提案**
新機能のアイデアがあれば、ぜひ提案してください。

### 🔧 **開発参加手順**
1. リポジトリをフォーク
2. 機能ブランチを作成 (`git checkout -b feature/amazing-feature`)
3. 変更をコミット (`git commit -m 'Add amazing feature'`)
4. ブランチにプッシュ (`git push origin feature/amazing-feature`)
5. プルリクエストを作成

## 📄 ライセンス

このプロジェクトは [MIT License](LICENSE) の下で公開されています。

## 🙏 謝辞

- **[Hono](https://hono.dev)** - 高速TypeScriptフレームワーク
- **[Cloudflare](https://cloudflare.com)** - エッジコンピューティングプラットフォーム
- **[Font Awesome](https://fontawesome.com)** - 豊富なアイコンライブラリ
- すべての学習者とコントリビューター

## 📞 サポート・お問い合わせ

何か問題や質問がある場合：

1. **[Live Demo](https://3000-ithvruy11pdt8jw9fe1g4-6532622b.e2b.dev)** で実際に試す
2. **[Issues](https://github.com/kazu-4728/github-master-study-app/issues)** で問題を報告
3. **README** で詳細情報を確認

---

## 🎉 今すぐ始めよう！

**[🚀 ライブデモにアクセス](https://3000-ithvruy11pdt8jw9fe1g4-6532622b.e2b.dev)**

GitHub・Git学習の新しい体験を今すぐお楽しみください！

[![Built with ❤️](https://img.shields.io/badge/Built%20with-❤️-red)](https://github.com/kazu-4728/github-master-study-app)
[![Cloudflare Pages](https://img.shields.io/badge/Deployed%20on-Cloudflare%20Pages-f38020)](https://pages.cloudflare.com)

**最先端技術で構築された最高の GitHub 学習体験をお届けします！**