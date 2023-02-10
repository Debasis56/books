import React, { useState } from 'react'

function BookEdit({book, onSubmit}) {
  const [titl, setTitle] = useState(book.title);
  console.log(book.title);
  const handleChange = (event) => {
    setTitle(event.target.value);
  }
  function handleSubmit(event){
    event.preventDefault();

    onSubmit(book.id, titl);

    
  }
  return (
    <form onSubmit ={handleSubmit} className='book-edit'>
      <label >Title</label>
      <input className='input' value={titl} onChange={handleChange}/>
      <button className='button is-primary'>
        Save
      </button>
    </form>
  )
}

export default BookEdit;