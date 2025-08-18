/**
 * 共通の型はmodelsに集約させ、Frontendプロジェクトでは必要最低限の型定義を行うようにする。
 * 開発段階でコミットする際は利用目的などのメモを残し、後に削除を行うこと
 *
 */

// TODO: modelsパッケージから取得するように変更すること
export type Message = {
  title: string;
  description: string;
  contents: string;
  footer: string;
};
