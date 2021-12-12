declare type Todo = {//TSの型定義 by 型エイリアス declare=アンビエント宣言
  value: string;
  readonly id: number;//読み取り専用　IDプロパティを新規設定　→　key 対策
  checked: boolean;//完了・未完了を表す
  removed: boolean;//削除を表す
};