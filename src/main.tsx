//import React from 'react'
import ReactDOM from 'react-dom'
//import './index.css'
//import App from './App'
import {App} from './App'

//Robotフォントのインポート
// npm install @fontsource/roboto で読み込み済み
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';


//サービスワーカーを登録するメソッドをインポート
import { registerSW } from 'virtual:pwa-register';
ReactDOM.render(
  //<React.StrictMode>
  <App />,
  //</React.StrictMode>,
  document.getElementById('root')
)

// サービスワーカーの登録
registerSW();