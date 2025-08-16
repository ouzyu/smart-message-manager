import * as fs from 'fs-extra';
import * as path from 'path';

const sourceDir = path.join(__dirname, '../prisma/generated/client');
const targetDir = path.join(__dirname, '../../dist/prisma/generated/client');

async function copyGenerated() {
  try {
    // ターゲットディレクトリを確保
    await fs.ensureDir(targetDir);

    // ファイルをコピー
    await fs.copy(sourceDir, targetDir);

    console.log('Prisma Client files copied successfully');
  } catch (error) {
    console.error('Error copying Prisma Client files:', error);
    process.exit(1);
  }
}

copyGenerated();
