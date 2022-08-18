import React from 'react'; // 框架的核心包
import ReactDOM from 'react-dom/client'; // 专门做渲染的相关包
import './index.css';
import App from './App';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <App/>
)

// root.render(
//   // 严格模式节点暂时去掉，useEffect的执行时机，会有额外的副作用，会检测两次
//   <React.StrictMode>
//     <App />
//   </React.StrictMode>
// );
