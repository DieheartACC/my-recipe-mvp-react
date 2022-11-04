import {Button, Grid} from "@mui/material";
import axios from "axios";
import {useState} from "react";
import RecipeForm from "./RecipeForm";

const RecipeDetailed = ({recipe, setDetailedView, updateRecipeList}) => {
    const [editRecipe, setEditRecipe] = useState(false);

    const deleteRecipe = async () => {
        await axios.delete(`http://localhost:8080/recipe/${recipe.id}`);
        updateRecipeList();
    }
    return (
        <div style={{marginLeft: "20px"}}>
            {editRecipe ? <RecipeForm updateRecipeList={updateRecipeList}
                                      setAddRecipe={setEditRecipe}
                                      recipe={recipe}/> :
                <Grid item>
                    <h2>{recipe.title}
                        <Button variant="contained"
                                style={{marginLeft: "10px"}} onClick={() => {
                            setDetailedView(false);
                        }}>Go Back
                        </Button>
                    </h2>
                    <img src={recipe.picUrl} alt={recipe.title}
                         width={"300"} height={"300"}/>
                    <ul>
                        {recipe.ingredientList.map(ingredient => {
                            return (
                                <li key={ingredient.id} style={{fontSize:"18px"}}>
                                    {ingredient.units} {ingredient.unitType} {ingredient.name}
                                </li>
                            )
                        })}
                    </ul>
                    {recipe.stepList.map((step, index) => {
                        return (
                            <p key={step.id} style={{fontSize:"18px"}}>Step {index + 1}: {step.instructions}</p>
                        )
                    })}
                    <Button variant="outlined" onClick={() => {
                        setEditRecipe(true);
                    }}>
                        Edit
                    </Button>
                    <Button style={{marginLeft: "10px"}} variant="outlined" color="error" onClick={() => {
                        setDetailedView(false);
                        deleteRecipe();
                    }}>
                        Delete
                    </Button>
                </Grid>
            }
        </div>
    )
}
export default RecipeDetailed;