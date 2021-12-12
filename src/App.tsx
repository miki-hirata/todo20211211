//import logo from './logo.svg'
//import './App.css'
import { useState } from 'react';
//Reactからusestateフックをインポート

type Todo = {//TSの型定義 by 型エイリアス
  value: string;
  readonly id: number;//読み取り専用　IDプロパティを新規設定　→　key 対策
  checked: boolean;//完了・未完了を表す
  removed: boolean;//削除を表す
};

type Filter = 'all' | 'checked' | 'unchecked' | 'removed';
//フィルターの状態を表す　型エイリアス　→　4種類設定

export const App = () => {
  //関数コンポーネントApp　全てのベース
  //const [count, setCount] = useState(0)

  const [text, setText] = useState('');
  //text というステート を設定 初期値空白
  //今後 setText('中身')で更新できる

  const [todos, setTodos] = useState<Todo[]>([]);
  //todos というステートを設定　　
  //型を指定することでステートの型安全性が保障される
  //ここでは型エイリアスのTodoを配列として定義？

  const [filter, setFilter] = useState<Filter>('all');
  //Filter というステートを設定　　初期値all

  const handleOnSubmit = () => {
  if(!text) return;//何も入力されていなかったらリターン
  
  const newTodo: Todo = {
    value: text,
    id: new Date().getTime(),//今の時刻
    checked: false,
    removed: false,
  };
  //新しいTodoを作成　型エイリアスTodoを指定
  //上書きしない気遣い　→　イミュータブルな操作

  setTodos([newTodo, ...todos]);
  //スプレッド構文　＝　配列とかのかっこ[]を外してくれるよ
  //ここではtodosという配列に、newTodoの値を追加して　todoステートに追加しなおしている
  setText('');
  /**
   * スプレッド構文を用いて todos ステートのコピーへ newTodo を追加する（どれがコピーだ？）
   * 以下と同義   *
   * const oldTodos = todos.slice();
   * oldTodos.unshift(newTodo);
   * setTodos(oldTodos);
   **/
  };

  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setText(e.target.value);
  };
  //textステート　をセットするためのコールバック関数
  //eventの型指定 ＝ React.ChangeEvent<HTMLInputElement>
  //単純な関数だけど、コールバック関数にすることでコンポーネント間のprops受け渡しが楽になる


  const handleOnEdit = (id:number, value: string) =>{
    const deepCopy: Todo[] = JSON.parse(JSON.stringify(todos));
    //ディープコピー　JSONに一回変換して、復元する

    const newTodos = deepCopy.map((todo) =>{//ディープコピーされた配列をもとに新しい配列を作成
      if (todo.id === id) {
        todo.value = value;
      }
      return todo;
    });

    // todos ステート配列をチェック（あとでコメントアウト）
    console.log('=== Original todos ===');
    todos.map((todo) => console.log(`id: ${todo.id}, value: ${todo.value}`));

    setTodos(newTodos);
    //todosステートを更新
  };

  
  const handleOnCheck = (id:number, checked: boolean) =>{
    //だいたいhandleOnEditとおなじ
    const deepCopy: Todo[] = JSON.parse(JSON.stringify(todos));
    //ディープコピー　JSONに一回変換して、復元する

    const newTodos = deepCopy.map((todo) =>{//ディープコピーされた配列をもとに新しい配列を作成
      if (todo.id === id) {
        todo.checked = !checked;//反対の値に更新　true ⇔ false
      }
      return todo;
    });
    setTodos(newTodos);
    //todosステートを更新
  };

  const handleOnRemove = (id:number, removed: boolean) =>{
    //だいたいhandleOnEditとおなじ
    const deepCopy: Todo[] = JSON.parse(JSON.stringify(todos));
    //ディープコピー　JSONに一回変換して、復元する

    const newTodos = deepCopy.map((todo) =>{//ディープコピーされた配列をもとに新しい配列を作成
      if (todo.id === id) {
        todo.removed = !removed;//反対の値に更新　true ⇔ false
      }
      return todo;
    });
    setTodos(newTodos);
    //todosステートを更新
  };

  //フィルタリング用
  const filteredTodos = todos.filter((todo) => {//ここのfilterは、切り出しの配列操作
    switch(filter){//filterの値が…
      case 'all': return !todo.removed;//全ての時　→　削除されてないものすべて
      case 'checked': return todo.checked && !todo.removed;
      case 'unchecked': return !todo.checked && !todo.removed;
      case 'removed': return todo.removed;
      default: return todo;//これはどういうこと？
     }
  });

  //ゴミ箱を空にする
  const handleOnEmpty = () => {
    const newTodos = todos.filter((todo) => !todo.removed);
    //removedがfalseのtodosだけを切り出す
    //これはシャロ―コピー（軽い）
    setTodos(newTodos);
  };
  
  return (
    <div>
      <select 
        defaultValue="all" 
        onChange={(e) => setFilter(e.target.value as Filter)}
        // e.target.value: string を Filter 型にキャスト(型変換)する
        // ここでいうvalue は、option のvalue (紛らわしいね)
      >
        <option value="all">すべてのタスク</option>
        <option value="checked">完了したタスク</option>
        <option value="unchecked">現在のタスク</option>
        <option value="removed">ごみ箱</option>
      </select>
      {filter === 'removed' ? (
        <button 
          onClick={handleOnEmpty}
          disabled={todos.filter((todo) => todo.removed).length === 0}
          //todo.removedがtrueのtodoが一つもなければ、ボタン無効化
        >
          ゴミ箱を空にする
        </button>
      ) : (
      <form
        onSubmit={(e) => {
          e.preventDefault();//とりあえずの無効化は残しておいていいのかしら
          handleOnSubmit();
        }}
      >
      <input 
        type="text" 
        value={text} 
        disabled={filter === 'checked'}
        //checkedフィルターがかかっているときには入力フォーム無効化
        onChange={(e) => handleOnChange(e)} 
      />
      {/* 入力テキストの変化をtextステートに反映する */}
      <input 
        type="submit" 
        value="追加" 
        disabled={filter === 'checked'}
        //checkedフィルターがかかっているときには入力フォーム無効化
        onSubmit={handleOnSubmit} 
      />
      </form>
      )}{/* filter removed の三項演算子 */}
      
      <ul>
        {filteredTodos.map((todo) => {
          //フィルター済みのリストを表示
          return(
            <li key={todo.id}>
            {/* Key設定によりコンソールエラー回避 */}
              <input 
                type="checkbox" 
                disabled={todo.removed}//削除されたアイテムは変更できない
                checked={todo.checked}
                onChange={()=> handleOnCheck(todo.id, todo.checked)}
                //入力値がないからhandleOnEditとは少し違う
              />
              <input 
                type="text" 
                disabled={todo.checked || todo.removed}//削除・チェックされたアイテムは変更できない
                value={todo.value} 
                onChange={(e)=> handleOnEdit(todo.id, e.target.value)}/>
              <button onClick={() => handleOnRemove(todo.id, todo.removed)}>
                {todo.removed ? '復元' : '削除'}
              </button>
            </li>
          );
        })}
      </ul>
    </div>
  );
};


//export default App
