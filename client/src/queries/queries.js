import { gql } from '@apollo/client';

export const GET_AUTHOR_LIST = gql`
  query GetAuthorList {
    authors {
      id
      name
    }
  }
`;

export const GET_BOOK_LIST = gql`
  query GetBookList {
    books {
      id
      name
      genre
    }
  }
`;

export const ADD_BOOK = gql`
  mutation addBook ($name: String!, $genre: String!, $authorid: ID!) {
    addBook (name: $name, genre: $genre, authorid: $authorid) {
      name,
      id,
      genre
    }
  }
`;

export const BOOK_DETAIL = gql`
  query book($id: ID!) {
    book(id: $id) {
      name,
      genre,
      author{
        name,
        age
      }
    }
  }
`;

export const DELETE_BOOK = gql`
  query deleteBook($id: ID!) {
    deleteBook(id: $id) {
      name,
      id,
    }
  }
`;
