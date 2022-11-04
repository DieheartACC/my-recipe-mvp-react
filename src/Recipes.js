import {Grid} from "@mui/material";
import Recipe from "./Recipe";
import {useState} from "react";
import RecipeDetailed from "./RecipeDetailed";

const Recipes = ({recipeList, updateRecipeList, setAddOrEditRecipe}) => {
    const [detailedView, setDetailedView] = useState(false);
    const [focusedRecipe, setFocusedRecipe] = useState({});

    return (
        <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 12 }}>
            {detailedView ?
            <RecipeDetailed recipe={focusedRecipe}
                            setDetailedView={setDetailedView}
                            updateRecipeList={updateRecipeList}/> :

            recipeList.map(recipe => {
                return (
                    <Recipe key={recipe.id}
                            recipe={recipe}
                            setDetailedView={setDetailedView}
                            setFocusedRecipe={setFocusedRecipe}/>
                )
            })}
        </Grid>
    )
}
export default Recipes;