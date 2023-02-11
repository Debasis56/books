import { createContext, useState, useCallback } from "react";
import axios from 'axios';

const BooksContext = createContext();
function Provider ({children}){
   //const [count, setCount] = useState(5);

    // const valueToShare = {
    //     count,
    //     incrementCount: () => {
    //         setCount(count+1);
    //     },
    // };


    const [books, setBooks] = useState([]);
    const fetchBooks = useCallback(async () => {

        const response = await axios.get('http://localhost:3001/books');
    
        setBooks(response.data);
      }, []);

    

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
  




  const valueToShare = {

    books: books,
    deleteBookbyId: deleteBookbyId,
    editBookById: editBookById,
    handleCreateBook: handleCreateBook,
    fetchBooks: fetchBooks,

  };

    return <BooksContext.Provider value={valueToShare}>
        {children}
</BooksContext.Provider>
}

export {Provider};
export default BooksContext;