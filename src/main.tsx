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

ReactDOM.render(
  //<React.StrictMode>
  <App />,
  //</React.StrictMode>,
  document.getElementById('root')
)
