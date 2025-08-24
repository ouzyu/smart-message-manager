import { Prisma, PrismaClient } from '@workspace/models-client/entities';

// ログレベルの型定義
const developmentLogLevels: Prisma.LogLevel[] = ['query', 'info', 'warn', 'error'];
const productionLogLevels: Prisma.LogLevel[] = ['error'];

// データベース設定
export const databaseConfig = {
  url: process.env.DATABASE_URL!,
  logLevel: process.env.NODE_ENV === 'development' ? developmentLogLevels : productionLogLevels,
  errorFormat: 'pretty' as const,
  maxConnections: parseInt(process.env.DB_MAX_CONNECTIONS || '10'),
  timeout: parseInt(process.env.DB_TIMEOUT || '5000'),
};

// Prismaクライアントのインスタンス作成
export const prismaClient = new PrismaClient({
  log: databaseConfig.logLevel,
  errorFormat: databaseConfig.errorFormat,
});

// トランザクション型をクライアントから作成
export type PrismaTransaction = Parameters<Parameters<typeof prismaClient.$transaction>[0]>[0];

// データベース接続確認
export const connectDatabase = async (maxRetries: number = 5, retryDelay: number = 3000): Promise<void> => {
  let lastError: Error;

  for (let attempt = 1; attempt <= maxRetries; attempt++) {
    try {
      await prismaClient.$connect();
      console.log('Database connected successfully');

      // 接続テスト
      await prismaClient.$queryRaw`SELECT 1`;
      console.log('Database health check passed');
      return; // 成功したら終了
    } catch (error) {
      lastError = error as Error;

      if (attempt === maxRetries) {
        console.error(`Database connection failed after ${maxRetries} attempts:`, error);
        throw error;
      }

      console.log(`Database connection attempt ${attempt}/${maxRetries} failed: ${lastError.message}`);
      console.log(`Retrying in ${retryDelay / 1000} seconds...`);

      // 指定時間待機
      await new Promise(resolve => setTimeout(resolve, retryDelay));
    }
  }
};

// グレースフルシャットダウン
export const disconnectDatabase = async (): Promise<void> => {
  try {
    await prismaClient.$disconnect();
    console.log('Database disconnected successfully');
  } catch (error) {
    console.error('Database disconnection error:', error);
  }
};

// データベース関連のヘルスチェック
export const checkDatabaseHealth = async (): Promise<boolean> => {
  try {
    await prismaClient.$queryRaw`SELECT 1`;
    return true;
  } catch {
    return false;
  }
};

// プロセス終了時のクリーンアップ
process.on('beforeExit', async () => {
  await disconnectDatabase();
});
