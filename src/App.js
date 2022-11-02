import Recipes from "./Recipes";
import {useEffect, useState} from "react";
import axios from "axios";
import RecipeForm from "./RecipeForm";

function App() {
    const [recipeList, setRecipeList] = useState([]);
    const [addRecipe, setAddRecipe] = useState(false);

    const updateRecipeList = async () => {
        const response = await axios.get("http://localhost:8080/recipe");
        setRecipeList(response.data);
    }

    useEffect(() => {
        updateRecipeList();
    }, [])

    return (
        <div>
            <h1 style={{textAlign: "center", paddingBottom: "50px"}}>My Recipes</h1>
            {addRecipe ? "" :
                <button style={{marginBottom: "50px"}} onClick={() => {
                    setAddRecipe(true)
                }}>Add New Recipe</button>
            }
            {addRecipe ? <RecipeForm updateRecipeList={updateRecipeList}
                                     setAddRecipe={setAddRecipe}
                                     recipe={{}}/> :
                <Recipes recipeList={recipeList}
                         updateRecipeList={updateRecipeList}/>
            }
        </div>
    );
}

export default App;