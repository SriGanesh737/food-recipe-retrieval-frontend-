import { useState } from 'react';
import {useNavigate} from 'react-router-dom'
import './App.css'
import ListItem from './components/ListItem.jsx'
import axios from 'axios'
import { useSearchResults } from './SearchResultsContext';


export default function App() {
  const navigate = useNavigate()
  const { searchResults, setResults,feedbackArray } = useSearchResults();
  const [query, setQuery] = useState('');

  const handleSearch = async () => {
    try {
      // send data in body in json format
      const response = await axios.post('http://localhost:5000/search', {"query": query});
      setResults(response.data);
      console.log(response.data);
    } catch (error) {
      console.error('Error during search:', error);
    }
  };
  const submit_relevance_backend=()=>{
    let new_relevant_ids=[]
     let new_irrelevant_ids=[]
    feedbackArray.map((feedback,i)=>{
      if(feedback=="like")
      {
           new_relevant_ids.push(searchResults[i].document_id)
      }
      else
      {
        new_irrelevant_ids.push(searchResults[i].document_id)
      }}
    )
    console.log(new_relevant_ids)
      console.log(new_irrelevant_ids)
      axios.post("http://localhost:5000/update_relevance",{"new_relevant_ids":new_relevant_ids,"new_irrelevant_ids":new_irrelevant_ids}).then((res)=>{
        return res.data
      }).then((data)=>{
        if(data.success)
        {
          console.log("updated successfully")
        }
      })

    
  }


  const recipeClickHandler = (id)=>{
      navigate('/recipes/'+id)
  }

  const handleFeedbackSubmit = () => {
    console.log("Feedback Values Submitted:", feedbackArray);
    submit_relevance_backend()
    navigate('/pr-curve'); // Navigate to the new page
  };

  const headingStyles = {
    fontFamily: 'Playfair Display'
    
  }

  return (
  <div  className="App min-h-screen mt-10">
    <div style={headingStyles} className="text-5xl text-center text-black font-semibold dark:text-blue-400 mb-6">
        Recipe Retrieval
      </div>
    <div className="max-w-2xl mx-auto">
      <form  className="flex items-center">   
            <div className="relative w-full">
                <input 
                  type="text" 
                  id="simple-search" 
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Search For a Food Recipe" required />
            </div>
            <button type='button' onClick={handleSearch}  className="p-2.5 ml-2 text-sm font-medium text-white bg-blue-700 rounded-lg border border-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"><svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg></button>
        </form>
    </div>

    {/* Search Results and Legend */}
    {searchResults.length !== 0 && (
        <div className="mt-10">
          <h1 className="text-slate-800 font-bold text-4xl text-center">Search Results</h1>
          <div className="flex pl-[70%] mb-4 ">
            <div className="bg-gray-200 p-4 rounded-lg text-sm text-gray-600">
              <p className="mb-2">
                Legend: <span className="text-blue-500">&#x2713; R</span> - Relevant, <span className="text-red-500">&#x2717; NR</span> - Non-Relevant
              </p>
              
            </div>
          </div>
          <div className="flex flex-wrap justify-center">
            {searchResults.map((recipe, i) => (
              <ListItem key={i} id={recipe.document_id} title={recipe.title} authorName={recipe.author_name} category={recipe.category} recipeClickHandler={recipeClickHandler} feedbackIndex={i} />
            ))}
          </div>
          
       {/* Submit Feedback Values Button */}
       <div className="flex justify-center my-4">
            <button
              onClick={handleFeedbackSubmit}
              className="bg-green-500 text-white p-3 rounded-md hover:bg-green-600"
            >
              Submit Feedback Values
            </button>
          </div>
        </div>
      )}
    </div>
  );
}