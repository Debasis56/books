import axios from 'axios';
import React, { useEffect, useState } from 'react'
import BookCreate from './components/BookCreate';
import BookList from './components/BookList';


function App() {
  const [books, setBooks] = useState([]);

  const handleCreateBook = async (title) => {
    console.log('Need to add book with title : ', title);

    const response = await axios.post('http://localhost:3001/books', {
      title,
    });

    console.log(response);

    const newBooks = [
      ...books,
      response.data
      // {id: Math.round(Math.random()*999), title:title}
    ]
    setBooks(newBooks);

  }

  const deleteBookbyId = async (id) => {
    await axios.delete(`http://localhost:3001/books/${id}`);
    const updated_books = books.filter((book)=>{
      return book.id !== id;
    });
    setBooks(updated_books);
  }

  const editBookById = async (id, newTitle) => {

    const response = await axios.put(`http://localhost:3001/books/${id}`,{
      title: newTitle
    });

    console.log(response);


    const updated_books = books.map((book) => {
      if(book.id === id){
        return {...book, ...response.data};
      }
      return book;
    });
    setBooks(updated_books);

  }


  const fetchBooks = async () => {

    const response = await axios.get('http://localhost:3001/books');

    setBooks(response.data);
  };

  useEffect(()=>{
    fetchBooks();
  }, []);



  return (
    <div className='app'>
      <h1>Reading List</h1>
      <BookList books={books} onDelete = {deleteBookbyId} onEdit = {editBookById}/>
      <BookCreate onCreate = {handleCreateBook} />
    </div>
  )
}

export default App