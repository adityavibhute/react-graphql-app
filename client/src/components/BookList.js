import { useQuery, useLazyQuery } from '@apollo/client';
import { useState } from 'react';
import { GET_BOOK_LIST, DELETE_BOOK } from '../queries/queries';
import BookDetail from '../components/BookDetails';

const BookList = () => {
  const { loading, error, data, refetch } = useQuery(GET_BOOK_LIST);
  const [selectedId, setSelectedId] = useState('');
  const [delParams, delBook] = useLazyQuery(DELETE_BOOK);
  const delEachBook = (currId) => {
    const res = delParams({ variables: { id: currId } });
    res.then(() => {
      // below will refresh the book list
      refetch();
    }).catch((err) => {
      console.log('err is ', err.message)
    })
  }

  return (
    <div className="App">
      {loading ? <p>Loading...</p> : null}
      {error ? <p>Error : {error.message}</p> : null}
      {data?.books?.length && (
        <ul className='book-list'>
          {
            data?.books?.map((item) => {
              return <div key={item.id}><li onClick={() =>setSelectedId(item.id)}>{item.name}</li><button onClick={() => delEachBook(item.id)}>-</button></div>
            })
          }
        </ul>
      )}
      {selectedId && <BookDetail selectedId={selectedId} />}
      {!delBook?.loading && delBook?.data ? <p>Delete book</p> : null}
      {delBook?.error ?  <p>{delBook?.error.message}</p> : null}
    </div>
  );
}

export default BookList;
