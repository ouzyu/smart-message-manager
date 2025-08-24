import { MasterMessageCategoryCreateRequest } from '@workspace/models-client/schemas';

export const MASTER_MESSAGE_CATEGORY_DATA: MasterMessageCategoryCreateRequest[] = [
  {
    categoryName: '業務/進捗報告',
    categoryDescription: 'プロジェクトの進捗状況、業務完了報告、作業結果の共有など。',
  },
  {
    categoryName: '予定/会議連絡',
    categoryDescription: '会議の開催案内、スケジュール調整、打ち合わせの連絡など。',
  },
  {
    categoryName: '相談',
    categoryDescription: '業務上の質問、判断を仰ぐ事項、アドバイスを求める内容など。',
  },
  {
    categoryName: '社内報',
    categoryDescription: '業務に直接関わりのない社内の連絡。',
  },
  {
    categoryName: 'その他',
    categoryDescription: '該当するカテゴリーが存在しない場合。',
  },
];
