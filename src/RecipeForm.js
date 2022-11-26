import {Button, createTheme, Grid, TextField, ThemeProvider} from "@mui/material";
import {useState} from "react";
import Ingredients from "./Ingredients";
import Steps from "./Steps";
import axios from "axios";

const RecipeForm = ({updateRecipeList, setAddRecipe, recipe}) => {
    const [titleInput, setTitleInput] = useState(recipe.title || "No Title");
    const [desInput, setDesInput] = useState(recipe.description || "No Description");
    const [imgInput, setImgInput] = useState(recipe.picUrl || "");
    const [ingList, setIngList] = useState(recipe.ingredientList || [{
        name: "",
        unitType: "",
        units: ""
    }]);
    const [stepList, setStepList] = useState(recipe.stepList || [{}]);

    const handleSubmit = (event) => {
        if (recipe.id >= 1) {
            const patchData = {
                title: titleInput,
                picUrl: imgInput,
                description: desInput
            }
            patchRecipe(recipe, patchData);

            patchIngredients(recipe, ingList);

            patchSteps(recipe, stepList);
        } else {
            const data = {
                title: titleInput,
                picUrl: imgInput,
                description: desInput,
                ingredientList: ingList,
                stepList: stepList
            };
            postRequest(data);
        }
    }

    const postRequest = async (data) => {
        await axios.post("https://myrecipesspringboot-env1.eba-zrzgh97k.us-east-1.elasticbeanstalk.com/recipe", data);
        updateRecipeList();
    }

    const patchRecipe = async (recipe, patchData) => {
        await axios.patch(`https://myrecipesspringboot-env1.eba-zrzgh97k.us-east-1.elasticbeanstalk.com/recipe/${recipe.id}`, patchData);
    }

    const patchIngredients = async (recipe, ingList) => {
        await axios.patch(`https://myrecipesspringboot-env1.eba-zrzgh97k.us-east-1.elasticbeanstalk.com/recipe/${recipe.id}/ingredients`, ingList);
    }

    const patchSteps = async (recipe, stepList) => {
        await axios.patch(`https://myrecipesspringboot-env1.eba-zrzgh97k.us-east-1.elasticbeanstalk.com/recipe/${recipe.id}/steps`, stepList);
    }

    const theme = createTheme({
        palette: {
            neutral: {
                main: '#64748B',
                contrastText: '#fff',
            },
        },
    });

    return (
        <div>
            <Button variant="contained"
                // color="success"
                    style={{marginBottom: "20px"}} onClick={() => {
                setAddRecipe(false);
            }}>Back
            </Button>
            <form onSubmit={(event) => {
                event.preventDefault();
            }}>

                <Grid style={{marginBottom: "50px"}} container spacing={2} alignItems="center">
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
                <Grid style={{marginBottom: "50px"}} container spacing={2} alignItems="center">
                    <Grid item>
                        {ingList.map((ingredient, index) => {
                            return <Ingredients key={index} index={index} setIngList={setIngList} ingList={ingList}/>
                        })}
                    </Grid>
                    <Grid item>
                        <ThemeProvider theme={theme}>
                            <Button variant="contained"
                                    color="neutral"
                                    onClick={(event) => {
                                        event.preventDefault();
                                        setIngList([...ingList, {
                                            name: "",
                                            unitType: "",
                                            units: ""
                                        }])
                                    }}>Add More
                            </Button>
                        </ThemeProvider>
                        {ingList.length < 2 ? "" :
                            <Button variant="contained"
                                    color="error" style={{marginLeft: "10px"}} onClick={(event) => {
                                event.preventDefault();
                                let copyArray = ingList.slice();
                                copyArray.pop();
                                setIngList(copyArray);
                            }}>Remove
                            </Button>
                        }
                    </Grid>
                </Grid>
                <Grid style={{marginBottom: "10px"}} container spacing={2} alignItems="center">
                    <Grid item>
                        {stepList.map((step, index) => {
                            return <Steps key={index} index={index} stepList={stepList} setStepList={setStepList}/>
                        })}
                    </Grid>
                    <Grid item>
                        <ThemeProvider theme={theme}>
                            <Button variant="contained"
                                    color="neutral" onClick={(event) => {
                                event.preventDefault();
                                setStepList([...stepList, {
                                    instructions: ""
                                }])
                            }}>Add More
                            </Button>
                        </ThemeProvider>
                        {stepList.length < 2 ? "" :
                            <Button variant="contained"
                                    color="error"
                                    style={{marginLeft: "10px"}} onClick={(event) => {
                                event.preventDefault();
                                let copyArray = stepList.slice();
                                copyArray.pop();
                                setStepList(copyArray);
                            }}>Remove
                            </Button>
                        }
                    </Grid>
                </Grid>
            </form>
            <Grid item>
                <Button variant="contained"
                        color="success"
                        style={{margin: "0 auto"}} type={"submit"}
                        onClick={(event) => {
                            handleSubmit(event);
                            window.location.reload()
                        }}>Save Recipe
                </Button>
            </Grid>
        </div>
    )
}
export default RecipeForm;