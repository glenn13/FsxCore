import React from 'react';
import Container from '../Container';

export interface SearchNotFoundProps {
  isLoading?: boolean;
  query?: string;
}

const SearchNotFound: React.SFC<SearchNotFoundProps> = ({isLoading, query = '', children}) => {
  if (isLoading) return null;

  return (
    <Container flex col mt={10}>
      <span className="text-4xl">
        No match found for search value
        <span className="text-4xl text-red-400">{` <${query}>`}</span>
      </span>
      {children}
    </Container>
  );
};

export default SearchNotFound;
