import Recipes from "./Recipes";
import {useEffect, useState} from "react";
import axios from "axios";
import RecipeForm from "./RecipeForm";
import SearchAppBar from "./SearchAppBar";
import {Button} from "@mui/material";

function App() {
    const [recipeList, setRecipeList] = useState([]);
    const [addRecipe, setAddRecipe] = useState(false);
    const [filteredList, setFilteredList] = useState([])
    const [searchTerm, setSearchTerm] = useState("")

    const updateRecipeList = async () => {
        const response = await axios.get("http://localhost:8080/recipe");
        response.data.sort((a, b) => {
            let ta = a.title.toLowerCase(),
                tb = b.title.toLowerCase();

            if (ta < tb) {
                return -1;
            }
            if (ta > tb) {
                return 1;
            }
            return 0;
        });
        setRecipeList(response.data.sort(response.data.title));
    }

    const handleSearch = (value) => {
        setFilteredList(recipeList.filter(recipe => {
            return recipe.title.toLowerCase().includes(value.toLowerCase())
        }))
    }

    useEffect(() => {
        updateRecipeList();
    }, [])

    return (
        <div>
            <header style={{marginBottom: "50px"}}>
                <SearchAppBar handleSearch={handleSearch}
                              setSearchTerm={setSearchTerm}/>
            </header>
            {addRecipe ? "" :
                <Button variant="contained"
                        color="success"
                        style={{marginBottom: "50px"}} onClick={() => {
                    setAddRecipe(true)
                }}>Add New Recipe</Button>
            }
            {addRecipe ? <RecipeForm updateRecipeList={updateRecipeList}
                                     setAddRecipe={setAddRecipe}
                                     recipe={{}}/> :
                <Recipes recipeList={searchTerm ? filteredList : recipeList}
                         updateRecipeList={updateRecipeList}/>
            }
        </div>
    );
}

export default App;