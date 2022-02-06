// import React from 'react'
// import ReactDom from 'react-dom'
// import './index.css';

// const img = "https://images-na.ssl-images-amazon.com/images/I/91-EIJiYneL._AC_UL604_SR604,400_.jpg";
// const author = "James Clear";
// const title = "Atomic Habits"

// function BookList(){
//   return (
//     <section className='booklist'>
//       <Book/>
//     </section>
//   )
// }

// const Book = () => {
//   return (
//     <article className='book'>
//       <img src={img} alt="" />
//     <h1>{title}</h1>
//     <h4>
//       {author}
//     </h4>
//     </article>
//   )
// }

// ReactDom.render(<BookList/>, document.getElementById('root')) 

import React from 'react';
import ReactDOM from 'react-dom';
// import './index.css';
import App from './App';
import 'bootstrap/dist/css/bootstrap.min.css';
 
ReactDOM.render(<App />, document.getElementById('root'));