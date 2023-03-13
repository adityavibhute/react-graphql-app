import { useQuery } from '@apollo/client';
import { BOOK_DETAIL } from '../queries/queries';

const BookDetail = ({selectedId}) => {
    const { loading, error, data } = useQuery(BOOK_DETAIL, {
        variables: { id : selectedId },
    });

    return(
        <div className='book-details'>
            <h3>Book details are</h3>
            { loading? <p>loading details</p> : null }
            { error? <p>{error.message}</p> : null }
            { data?.book !== undefined ?
                <>
                    <p>Book Name : {data.book.name}</p>
                    <p>Book genre : {data.book.genre}</p>
                    <h3>Author details are</h3>
                    <p>Author Name : {data.book.author.name}</p>
                    <p>Author Age : {data.book.author.age}</p>
                </>
            : null}
        </div>
    )
};

export default BookDetail;