import cors from 'cors';
import { config } from 'dotenv';
import express from 'express';
import helmet from 'helmet';
import morgan from 'morgan';

import { checkDatabaseHealth, connectDatabase, disconnectDatabase } from './lib/database.config';
import { router } from './routes/router';

// 環境変数読み込み
config();

const app = express();
const PORT = process.env.PORT || 3001;
const NODE_ENV = process.env.NODE_ENV || 'development';
const FRONTEND_URL = process.env.FRONTEND_URL || 'http://localhost:3000';

// セキュリティミドルウェア
app.use(helmet());

// CORS設定
app.use(
  cors({
    origin: FRONTEND_URL,
    credentials: true,
  })
);

// ログ設定
app.use(morgan(NODE_ENV === 'production' ? 'combined' : 'dev'));

// JSON解析ミドルウェア
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true }));

// ヘルスチェックエンドポイント（DB接続確認付き）
app.get('/health', async (req, res) => {
  try {
    const isDatabaseHealthy = await checkDatabaseHealth();

    res.status(isDatabaseHealthy ? 200 : 503).json({
      status: isDatabaseHealthy ? 'OK' : 'ERROR',
      timestamp: new Date().toISOString(),
      environment: NODE_ENV,
      database: isDatabaseHealthy ? 'connected' : 'disconnected',
      version: process.env.npm_package_version || '1.0.0',
    });
  } catch (error) {
    console.error('Health check failed:', error);
    res.status(503).json({
      status: 'ERROR',
      timestamp: new Date().toISOString(),
      environment: NODE_ENV,
      database: 'error',
      error: NODE_ENV === 'development' ? (error as Error).message : 'Health check failed',
    });
  }
});

// APIルート
app.use('/api', router);

// エラーハンドリング
// app.use('*', (req, res) => {
//   res.status(404).json({
//     success: false,
//     error: {
//       code: 'NOT_FOUND',
//       message: 'Route not found',
//     },
//   });
// });

// サーバー起動関数
const startServer = async (): Promise<void> => {
  try {
    console.log('Starting server...');

    // データベース接続
    await connectDatabase();

    // サーバー起動
    const server = app.listen(PORT, () => {
      console.log('Server started successfully');
      console.log(`Environment: ${NODE_ENV}`);
      console.log(`Server: http://localhost:${PORT}`);
      console.log(`Health check: http://localhost:${PORT}/health`);
      console.log(`CORS enabled for: ${FRONTEND_URL}`);
      console.log(`API routes: http://localhost:${PORT}/api`);
    });

    // サーバーエラーハンドリング
    server.on('error', (error: Error) => {
      console.error('Server error:', error);
      process.exit(1);
    });
  } catch (error) {
    console.error('Failed to start server:', error);
    process.exit(1);
  }
};

// グレースフルシャットダウン関数
const gracefulShutdown = async (signal: string): Promise<void> => {
  console.log(`\n${signal} received, initiating graceful shutdown...`);

  try {
    console.log('Closing database connections...');
    await disconnectDatabase();

    console.log('Graceful shutdown completed');
    process.exit(0);
  } catch (error) {
    console.error('Error during shutdown:', error);
    process.exit(1);
  }
};

// プロセス終了シグナルのハンドリング
process.on('SIGTERM', () => gracefulShutdown('SIGTERM'));
process.on('SIGINT', () => gracefulShutdown('SIGINT'));

// 未処理のエラーハンドリング
process.on('unhandledRejection', (reason: unknown, promise: Promise<unknown>) => {
  console.error('Unhandled Rejection:', {
    reason,
    promise,
    timestamp: new Date().toISOString(),
  });

  if (NODE_ENV === 'production') {
    gracefulShutdown('UNHANDLED_REJECTION');
  }
});

process.on('uncaughtException', (error: Error) => {
  console.error('Uncaught Exception:', {
    message: error.message,
    stack: error.stack,
    timestamp: new Date().toISOString(),
  });

  // Uncaught Exceptionは回復不可能なので即座に終了
  process.exit(1);
});

// バージョン情報表示
console.log(`Smart Message Manager API v${process.env.npm_package_version || '1.0.0'}`);
console.log(`Node.js ${process.version}`);

// サーバー開始
startServer().catch(error => {
  console.error('Fatal error during startup:', error);
  process.exit(1);
});
