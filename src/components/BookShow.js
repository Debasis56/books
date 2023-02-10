import React, { useState } from 'react'
import BookEdit from './BookEdit';
function BookShow({book, onDelete, onEdit}) {

  const [showEdit, setShowEdit] = useState(false);
  function handleDeleteClick(){
    onDelete(book.id);

  }
  function handleEditClick(){
    setShowEdit(!showEdit);
  };

  const handleSubmit = (id, newTitle) => {
    setShowEdit(false);
    onEdit(id, newTitle);
  }

  let content = <h3>{book.title}</h3>
  if(showEdit){
    content = <BookEdit book={book} onSubmit={handleSubmit}/>
  }


  return (
    <div className='book-show'>{content}
    <img src = {`https://picsum.photos/seed/${book.id}/300/200`} 
    alt='books'/>
    <div className='actions'>
    <button className='edit' onClick={handleEditClick}>Edit</button>
      <button className='delete' onClick={handleDeleteClick}>Delete</button>
      
    </div>


    
    </div>

  )
}

export default BookShow;