import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";

export default function RecipePage() {


  const { id } = useParams();
  const [recipe, setRecipe] = useState(
    {
      "id": 1,
      "title": "Spaghetti and Meatballs",
      "description": "A classic Italian dish made of spaghetti, tomato sauce, and meatballs. Perfect for dinner tonight! we are going to make this recipe today.  this is a very good recipe. and it is very easy to make. also it is very tasty.",
      "ingredients": ["Spaghetti","Meatballs","Tomato Sauce"   
      ],
      "instructions": [
        "Boil water",
        "Add spaghetti to boiling water",
        "Cook meatballs",
        "Add tomato sauce to meatballs",
        "Drain spaghetti",
        "Combine spaghetti and meatballs"
      ],
      "image": "https://www.allrecipes.com/thmb/bJ2wc_MdCu352f3AcykSD-5oCyU=/750x0/filters:no_upscale():max_bytes(150000):strip_icc():format(webp)/8350566-miso-noodle-soup_R314555_4x3-66820aee68e843b9af23c208c31a100f.jpg"
    }
  )



  const parseString = (responseString) => {

    console.log(responseString)

    // Extract the substring containing the array elements
    const startIndex = responseString.indexOf('("') + 2;
    const endIndex = responseString.lastIndexOf('")');
    const arraySubstring = responseString.substring(startIndex, endIndex);

    // Replace escaped double quotes and split the string into an array
    const arrayElements = arraySubstring
      .replace(/\\"/g, '"') // Replace escaped double quotes with regular double quotes
      .split('", "');

    if(Object.values(arrayElements).length == 1 ){
      // remove double quotes from string
      responseString = responseString.replace(/"/g, "")
      // split the string at fullstops
      responseString = responseString.split(".")
      // filter out empty strings
      responseString = responseString.filter((element) => element !== "")
      return responseString
    } 
    console.log(Object.values(arrayElements))
    return Object.values(arrayElements)
    

  }

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`http://127.0.0.1:5000/recipes/${id}`);
        console.log(response.data);
        let { instructions, ingredients } = response.data;

        const parsedInstructions = parseString(instructions);
        const parsedIngredients = parseString(ingredients);

        setRecipe({ ...response.data, instructions:parsedInstructions, ingredients:parsedIngredients });
        
      } catch (error) {
        console.error('Error fetching recipe:', error);
      }
    };

    fetchData();
  }, [id]);

  return (
    <div className="min-h-screen bg-gradient-to-r from-pink-200 to-yellow-200 text-black">
      <div className="container mx-auto px-4 lg:px-8 py-8">
      <div className="mb-4">
      <Link to="/" className="text-blue-600 hover:underline font-bold">
            &#8592; Back to Search Results
          </Link>
        </div>
        <h1 className="text-4xl font-extrabold mb-6">{recipe.title}</h1>
        <img
          src="https://media.istockphoto.com/id/1316145932/photo/table-top-view-of-spicy-food.jpg?s=612x612&w=0&k=20&c=eaKRSIAoRGHMibSfahMyQS6iFADyVy1pnPdy1O5rZ98="
          alt={recipe.title}
          className="w-full h-96 object-cover rounded mb-8"
        />
        <p className="text-xl mb-8">{recipe.description}</p>
        <div>
          <h2 className="text-2xl font-bold mb-4">Ingredients</h2>
          <ul className="list-disc pl-6 mb-8 flex flex-wrap">
            {recipe.ingredients.map((ingredient, i) => (
              <li key={i} className="text-lg w-1/2">
                {ingredient}
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h2 className="text-2xl font-bold mb-4">Instructions</h2>
          <ol className="list-decimal pl-6 mb-8">
            {recipe.instructions.map((instruction, i) => (
              <li key={i} className="text-lg">
                {instruction}
              </li>
            ))}
          </ol>
        </div>
        {/* <div className="mt-8">
          <a
            href={`https://www.food.com/recipe-${id}`}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 hover:underline font-bold"
          >
            View Full Recipe on Food.com
          </a>
        </div> */}
      </div>
    </div>
  );
}