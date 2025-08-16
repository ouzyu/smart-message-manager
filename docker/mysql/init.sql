CREATE USER IF NOT EXISTS 'app_user'@'%' IDENTIFIED BY 'app_password';
GRANT ALL PRIVILEGES ON `smart_message_manager_db`.* TO 'app_user'@'%';
GRANT CREATE ON *.* TO 'app_user'@'%';
GRANT DROP ON `prisma_migrate_shadow_db_%`.* TO 'app_user'@'%';
FLUSH PRIVILEGES;