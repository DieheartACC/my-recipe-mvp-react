import {Grid, TextField} from "@mui/material";
import {useState} from "react";
import Ingredients from "./Ingredients";
import Steps from "./Steps";
import axios from "axios";

const RecipeForm = ({updateRecipeList, setAddRecipe, recipe}) => {
    const [titleInput, setTitleInput] = useState(recipe.title);
    const [desInput, setDesInput] = useState(recipe.description);
    const [imgInput, setImgInput] = useState(recipe.picUrl);
    const [ingList, setIngList] = useState(recipe.ingredientList || [{
        name: "",
        unitType: "",
        units: ""
    }]);
    const [stepList, setStepList] = useState(recipe.stepList || [{}]);

    const handleSubmit = (event) => {
        if (recipe.id >= 0) {
            const recipePatch = {
                title: titleInput,
                picUrl: imgInput,
                description: desInput
            }
            patchRecipe(recipePatch);

            patchIngredients(recipe, ingList);

            patchSteps(recipe, stepList);
        } else {
            const data = {
                title: titleInput || "No Title",
                picUrl: imgInput || "",
                description: desInput || "No Description",
                ingredientList: ingList,
                stepList: stepList
            };
            postRequest(data);
        }
    }

    const postRequest = async (data) => {
        await axios.post("http://localhost:8080/recipe", data);
        updateRecipeList();
    }

    const patchRecipe = async (recipe) => {
        await axios.patch(`http://localhost:8080/recipe/${recipe.id}`, recipe);
    }

    const patchIngredients = async (recipe, ingList) => {
        await axios.patch(`http://localhost:8080/recipe/${recipe.id}/ingredients`, ingList);
    }

    const patchSteps = async (recipe, stepList) => {
        await axios.patch(`http://localhost:8080/recipe/${recipe.id}/steps`, stepList);
    }

    return (
        <div>
            <button style={{marginBottom: "20px"}} onClick={() => {
                setAddRecipe(false);
            }}>Back
            </button>
            <form onSubmit={(event) => {
                handleSubmit(event);
            }}>

                <Grid style={{marginBottom:"10px"}} container spacing={2} alignItems="center">
                    <Grid item>
                        <TextField id="outlined-basic" label="Title" variant="outlined"
                                   value={titleInput}
                                   onChange={(event) => {
                                       setTitleInput(event.target.value);
                                   }}/>
                        <TextField id="outlined-basic" label="Description" variant="outlined"
                                   value={desInput}
                                   onChange={(event) => {
                                       setDesInput(event.target.value);
                                   }}/>
                        <TextField id="outlined-basic" label="Image url" variant="outlined"
                                   value={imgInput}
                                   onChange={(event) => {
                                       setImgInput(event.target.value);
                                   }}/>
                    </Grid>
                </Grid>
                <Grid style={{marginBottom:"10px"}} container spacing={2} alignItems="center">
                    {ingList.map((ingredient, index) => {
                        return <Ingredients key={index} index={index} setIngList={setIngList} ingList={ingList}/>
                    })}
                    <Grid item>
                        <button onClick={(event) => {
                            event.preventDefault();
                            setIngList([...ingList, {
                                name: "",
                                unitType: "",
                                units: ""
                            }])
                        }}>Add More
                        </button>
                        {ingList.length < 2 ? "" :
                            <button style={{marginLeft: "10px"}} onClick={(event) => {
                                event.preventDefault();
                                let copyArray = ingList.slice();
                                copyArray.pop();
                                setIngList(copyArray);
                            }}>Remove
                            </button>
                        }
                    </Grid>
                </Grid>
                <Grid style={{marginBottom:"10px"}} container spacing={2} alignItems="center">
                    <Grid item>
                        {stepList.map((step, index) => {
                            return <Steps key={index} index={index} stepList={stepList} setStepList={setStepList}/>
                        })}
                    </Grid>
                    <Grid item>
                        <button onClick={(event) => {
                            event.preventDefault();
                            setStepList([...stepList, {
                                instructions: ""
                            }])
                        }}>Add More
                        </button>
                        {stepList.length < 2 ? "" :
                            <button style={{marginLeft: "10px"}} onClick={(event) => {
                                event.preventDefault();
                                let copyArray = stepList.slice();
                                copyArray.pop();
                                setStepList(copyArray);
                            }}>Remove
                            </button>
                        }
                    </Grid>
                </Grid>
                <Grid item>
                    <button style={{margin: "0 auto"}} type={"submit"}>Save Recipe</button>
                </Grid>
            </form>
        </div>
    )
}
export default RecipeForm;