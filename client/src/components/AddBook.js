import React, { useState, memo } from 'react';
import { useQuery, useMutation } from '@apollo/client';
import { GET_AUTHOR_LIST, ADD_BOOK, GET_BOOK_LIST } from '../queries/queries';

const AddBook = () => {
    const { loading, error, data } = useQuery(GET_AUTHOR_LIST);
    const [bookName, setBookName] = useState('');
    const [genre, setGenre] = useState('');
    const [authors, setAuthors] = useState('');
    const [addBook, results] = useMutation(ADD_BOOK);

    const loadAuthors = () => {
        if(loading) {
            return <option>loading authors...</option>
        } else if(data?.authors?.length) {
            return data?.authors?.map((item) => {
                return <option key={item.id} value={item.id}>{item.name}</option>
            })
        }
    }

    const OnFormSave = () => {
        console.log('all data', bookName, genre, authors);
        addBook({
            variables : {
                name: bookName,
                genre: genre,
                authorid: authors
            },
            refetchQueries: [{query: GET_BOOK_LIST}]
        });
        if (!results.loading) {
            console.log('form submitted ', data);
        } else if(results.error) {
            console.log("error aaya ", error.message)
        }
    }

    return (
        <div className="form">
            <h3>Add Book</h3>
            <div className='field'>
                <label>Book name:</label>
                <input type="text" value={bookName} onChange={(ev) => setBookName(ev.target.value)} />
            </div>
            <div className='field'>
                <label>Genre:</label>
                <input type="text" value={genre} onChange={(ev) => setGenre(ev.target.value)} />
            </div>
            <div className='field'>
                <label>Author:</label>
                <select onChange={(ev) => setAuthors(ev.target.value)}>
                    <option value={authors}>Select Authors</option>
                    {loadAuthors()}
                </select>
            </div>
            <button onClick={OnFormSave}>+</button>
        </div>
    );
}

export default memo(AddBook);
