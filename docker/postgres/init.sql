-- ユーザーが存在しない場合のみ作成
DO
$do$
BEGIN
   IF NOT EXISTS (
      SELECT FROM pg_catalog.pg_roles
      WHERE  rolname = 'app_user') THEN

      CREATE ROLE app_user LOGIN PASSWORD 'app_password';
   END IF;
END
$do$;

-- データベースの所有者をapp_userに設定
ALTER DATABASE smart_message_manager_db OWNER TO app_user;

-- app_userにデータベースの全権限を付与
GRANT ALL PRIVILEGES ON DATABASE smart_message_manager_db TO app_user;

-- スキーマレベルの権限も付与
GRANT ALL ON SCHEMA public TO app_user;
GRANT ALL PRIVILEGES ON ALL TABLES IN SCHEMA public TO app_user;
GRANT ALL PRIVILEGES ON ALL SEQUENCES IN SCHEMA public TO app_user;
GRANT ALL PRIVILEGES ON ALL FUNCTIONS IN SCHEMA public TO app_user;

-- 将来作成されるオブジェクトに対するデフォルト権限も設定
ALTER DEFAULT PRIVILEGES IN SCHEMA public GRANT ALL ON TABLES TO app_user;
ALTER DEFAULT PRIVILEGES IN SCHEMA public GRANT ALL ON SEQUENCES TO app_user;
ALTER DEFAULT PRIVILEGES IN SCHEMA public GRANT ALL ON FUNCTIONS TO app_user;

-- Prismaのシャドウデータベース用の権限
ALTER ROLE app_user CREATEDB;