/* eslint-disable react-refresh/only-export-components */
/* eslint-disable react/prop-types */

import { createContext, useContext, useState } from 'react';

const SearchResultsContext = createContext();

export const useSearchResults = () => {
  return useContext(SearchResultsContext);
};

export const SearchResultsProvider = ({ children }) => {
  const [searchResults, setSearchResults] = useState([]);
  // intially put all likes.
  const initialArray = []
  for(let i = 0;i<10;i++) initialArray.push("like") 
  const [feedbackArray, setFeedbackArray] = useState(initialArray);

  const setResults = (results) => {
    setSearchResults(results);
  };

  const setFeedbackValue = (index, value) => {
    setFeedbackArray((prevFeedbackArray) => {
      const newArray = [...prevFeedbackArray];
      newArray[index] = value;
      return newArray;
    });
  };

  return (
    <SearchResultsContext.Provider value={{ searchResults, setResults, feedbackArray, setFeedbackValue }}>
      {children}
    </SearchResultsContext.Provider>
  );
};
