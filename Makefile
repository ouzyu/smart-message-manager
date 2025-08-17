# Docker関連
.PHONY: up down build logs clean

# Docker環境の起動
up:
	docker-compose up -d

# Docker環境の停止
down:
	docker-compose down

# Docker環境のビルドと起動
build:
	docker-compose up -d --build

# ログ確認
logs:
	docker-compose logs -f

# Docker環境のクリーンアップ
clean:
	docker-compose down -v --remove-orphans
	docker system prune -f

# Prisma関連（modelsパッケージ内で実行）
.PHONY: db-generate db-migrate db-migrate-deploy db-migrate-reset db-push db-studio db-seed

# Prismaクライアント生成
db-generate:
	cd packages/models && npm run generate

# マイグレーション作成・適用（開発用）
db-migrate:
	cd packages/models && npm run db:migrate

# マイグレーション適用（本番用）
db-migrate-deploy:
	cd packages/models && npm run db:migrate:deploy

# データベースリセット
db-migrate-reset:
	cd packages/models && npm run db:migrate:reset

# スキーマをDBに直接プッシュ（プロトタイプ用）
db-push:
	cd packages/models && npm run db:push

# Prisma Studio起動
db-studio:
	cd packages/models && npm run db:studio

# シードデータ投入
db-seed:
	cd packages/models && npm run db:seed

# 開発環境セットアップ
.PHONY: setup dev-setup

# 初回セットアップ（依存関係インストール + DB初期化）
setup: install-deps up db-migrate db-seed

# 依存関係インストール
install-deps:
	npm install

# 開発用セットアップ（既存DBをリセットして初期化）
dev-setup: up db-migrate-reset db-seed

# 全サービス同時起動
.PHONY: dev-all dev-stack

# フロントエンド・バックエンド・DB同時起動
dev-all:
	docker-compose up -d mysql backend frontend

# 完全な開発スタック起動
dev-stack: up

# 個別サービス起動
.PHONY: dev-frontend dev-backend dev-mysql

dev-frontend:
	docker-compose up -d frontend

dev-frontend-turbo:
	cd packages/frontend && npm run dev:turbo

dev-backend:
	docker-compose up -d backend

dev-mysql:
	docker-compose up -d mysql

# よく使う組み合わせコマンド
.PHONY: fresh restart

# 完全リフレッシュ（Docker + DB初期化）
fresh: clean build dev-setup

# Docker再起動
restart: down up

# 完全初期化関連
.PHONY: db-init db-clean-all fresh-db troubleshoot
# Prismaの完全初期化（開発用）
db-init:
	@echo "=== Prisma完全初期化を開始 ==="
	cd packages/models && rm -rf src/prisma/migrations/
	cd packages/models && rm -rf src/prisma/generated/
	make down
	docker volume rm smart-message-manager_mysql_data || true
	make up
	@echo "=== データベース起動待機中... ==="
	sleep 10
	cd packages/models && npx prisma migrate dev --name init
	cd packages/models && npx prisma generate
	@echo "=== 初期化完了 ==="

# Prismaの状態をクリーンアップ
db-clean-all:
	@echo "=== Prismaクリーンアップを開始 ==="
	cd packages/models && rm -rf src/prisma/migrations/ || true
	cd packages/models && rm -rf src/prisma/generated/ || true
	cd packages/models && rm -rf node_modules/.prisma/ || true
	@echo "=== Prismaクリーンアップ完了 ==="

# データベース + Prisma完全リセット
fresh-db: db-clean-all
	@echo "=== データベース完全リセット開始 ==="
	make down
	docker volume rm smart-message-manager_mysql_data || true
	docker system prune -f
	make build
	@echo "=== データベース起動待機中... ==="
	sleep 15
	cd packages/models && npx prisma migrate dev --name init
	cd packages/models && npx prisma generate
	cd packages/models && npm run db:seed || echo "シードスクリプトが見つかりません"
	@echo "=== 完全リセット完了 ==="

# トラブルシューティング情報表示
troubleshoot:
	@echo "=== トラブルシューティング情報 ==="
	@echo "Docker コンテナ状態:"
	docker-compose ps
	@echo ""
	@echo "MySQL ボリューム:"
	docker volume ls | grep mysql || echo "MySQLボリュームなし"
	@echo ""
	@echo "マイグレーション履歴:"
	cd packages/models && ls -la src/prisma/migrations/ || echo "マイグレーションフォルダなし"
	@echo ""
	@echo "Prismaスキーマ場所:"
	cd packages/models && find . -name "*.prisma" || echo "Prismaスキーマなし"
	@echo ""
	@echo "データベース接続テスト:"
	docker-compose exec mysql mysqladmin ping -h localhost || echo "MySQL接続エラー"

# ヘルプにコマンドを追加
help:
	@echo "利用可能なコマンド:"
	@echo "  make up              		- Docker環境起動"
	@echo "  make down            		- Docker環境停止"
	@echo "  make build           		- Docker環境ビルド・起動"
	@echo "  make logs            		- ログ確認"
	@echo "  make clean           		- Docker環境クリーンアップ"
	@echo ""
	@echo "=== 開発環境 ==="
	@echo "  make setup           		- 初回セットアップ"
	@echo "  make dev-setup       		- 開発用セットアップ"
	@echo "  make fresh           		- 完全リフレッシュ"
	@echo "  make restart         		- Docker再起動"
	@echo "  make dev-all         		- フロントエンド・バックエンド・DB同時起動"
	@echo "  make dev-stack       		- 完全な開発スタック起動"
	@echo "  make dev-frontend    		- フロントエンドのみ起動"
	@echo "  make dev-frontend-turbo  - Dockerを使わず、turbopackを有効化して起動"
	@echo "  make dev-backend     		- バックエンドのみ起動"
	@echo "  make dev-mysql       		- MySQLのみ起動"
	@echo ""
	@echo "=== DB ==="
	@echo "  make db-generate     		- Prismaクライアント生成"
	@echo "  make db-migrate      		- マイグレーション作成・適用"
	@echo "  make db-migrate-deploy 	- マイグレーション適用（本番用）"
	@echo "  make db-migrate-reset  	- データベースリセット"
	@echo "  make db-push         		- スキーマ直接プッシュ"
	@echo "  make db-studio       		- Prisma Studio起動"
	@echo "  make db-seed         		- シードデータ投入"
	@echo ""
	@echo "=== トラブル解決用 ==="
	@echo "  make db-init         		- Prisma完全初期化"
	@echo "  make db-clean-all    		- Prismaクリーンアップ"
	@echo "  make fresh-db        		- データベース完全リセット"
	@echo "  make troubleshoot    		- 問題診断情報表示"
