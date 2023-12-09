/* eslint-disable react/prop-types */
import { useSearchResults } from '../SearchResultsContext';

export default function ListItem({ title, authorName, category, id, recipeClickHandler,feedbackIndex }) {
  const { setFeedbackValue, feedbackArray } = useSearchResults();
  const feedback = feedbackArray[feedbackIndex];

  const clickHandler = () => {
    recipeClickHandler(id);
  };

  const handleFeedback = (value) => {
    setFeedbackValue(feedbackIndex, value);
  };

  return (
    <div className="mx-auto mb-5 w-3/5 p-3 border-2 border-white rounded-md font-serif text-gray-800 shadow-lime-200 shadow-md">
      <div className="flex justify-between px-0.5">
        <div className="flex w-5/6">
          <div className="flex flex-col justify-center">
            <h1 className="text-gray-800 font-bold text-3xl mb-2">{title}</h1>
            <div className="flex items-center">
              <p className="text-md mr-4">
                <span className="font-semibold text-gray-700">Author:</span> {authorName}
              </p>
              <p className="text-md">
                <span className="font-semibold text-gray-700">Category:</span> {category}
              </p>
            </div>
          </div>
        </div>
        <div className="flex flex-col justify-center space-y-2">
          {/* Like and Dislike Buttons */}
          <div className="flex space-x-2">
            <button
              onClick={() => handleFeedback('like')}
              className={`px-2.5 py-1 text-sm font-medium ${
                feedback === 'like'
                  ? 'text-white bg-blue-500'
                  : 'text-gray-600 bg-gray-200 hover:bg-gray-300'
              } rounded-lg border  focus:outline-none `}
            >
              &#x2713; R
            </button>
            <button
              onClick={() => handleFeedback('dislike')}
              className={`py-1 px-2.5 text-sm font-medium ${
                feedback === 'dislike'
                  ? 'text-white bg-red-500'
                  : 'text-gray-600 bg-gray-200 hover:bg-gray-300'
              } rounded-lg border focus:outline-none `}
            >
              &#x2717; NR
            </button>
          </div>

          {/* View Recipe Button */}
          <button
            onClick={clickHandler}
            className="py-2 px-2.5 text-sm font-medium delay-75 transition text-white bg-emerald-600 rounded-lg border hover:bg-white hover:bg-opacity-75 hover:text-emerald-700 hover:font-semibold focus:ring-4 focus:outline-none focus:ring-emerald-300 dark:bg-emerald-600 dark:hover:bg-emerald-700 dark:focus:ring-emerald-800"
          >
            View Recipe
          </button>
        </div>
      </div>
    </div>
  );
}

