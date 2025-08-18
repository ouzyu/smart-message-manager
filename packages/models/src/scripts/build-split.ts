import * as fs from 'fs-extra';
import * as path from 'path';

const MODELS_DIST = path.join(__dirname, '../../dist');
const TYPES_DIST = path.join(__dirname, '../../../models-types/dist');
const CLIENT_DIST = path.join(__dirname, '../../../models-client/dist');

/**
 * フロントエンド用の型定義パッケージをビルドする
 * schemas と interfaces のみを含む（Prismaクライアントは除外）
 * この工程は一元管理とセキュリティ対策のために行う
 */
export const buildTypesPackage = async (): Promise<void> => {
  console.log('Building models-types package...');

  // dist/lib/schemas と dist/lib/interfaces のみコピー
  await fs.ensureDir(TYPES_DIST);
  await fs.copy(path.join(MODELS_DIST, 'lib/schemas'), path.join(TYPES_DIST, 'schemas'));
  await fs.copy(path.join(MODELS_DIST, 'lib/interfaces'), path.join(TYPES_DIST, 'interfaces'));

  // JavaScript用のindex.js
  const indexContent = `
export * from './schemas';
export * from './interfaces';
`;
  await fs.writeFile(path.join(TYPES_DIST, 'index.js'), indexContent);

  // TypeScript用のindex.d.ts
  const indexDtsContent = `
export * from './schemas';
export * from './interfaces';
`;
  await fs.writeFile(path.join(TYPES_DIST, 'index.d.ts'), indexDtsContent);
};

/**
 * サーバーサイド用の完全なモデルパッケージをビルドする
 * schemas、interfaces、entities（Prismaクライアント含む）をすべて含む
 * この工程はDB操作機能をサーバーサイドで利用するために行う
 */
export const buildClientPackage = async (): Promise<void> => {
  console.log('Building models-client package...');

  // 全てをコピー（schemas + interfaces + entities）
  await fs.ensureDir(CLIENT_DIST);
  await fs.copy(MODELS_DIST, CLIENT_DIST);
};

/**
 * 両方のパッケージを順次ビルドする
 * 一元管理されたmodelsから用途別パッケージを自動生成する
 */
export const buildSplit = async (): Promise<void> => {
  await buildTypesPackage();
  await buildClientPackage();
  console.log('Split build completed!');
};

/**
 * 実行する
 */
if (require.main === module) {
  buildSplit().catch(console.error);
}
