import {Grid, TextField} from "@mui/material";

const Ingredients = ({index, setIngList, ingList}) => {
    let copyArray = ingList.slice();

    return (
        <Grid item>
            <TextField id="outlined-basic" label="Ingredients" variant="outlined"
                       value={copyArray[index].name || ""}
                       onChange={(event) => {
                           copyArray[index].name = event.target.value;
                           setIngList(copyArray);
                       }}/>
            <TextField id="outlined-basic" label="Amount" variant="outlined"
                       value={copyArray[index].units || ""}
                       onChange={(event) => {
                           copyArray[index].units = event.target.value;
                           setIngList(copyArray);
                       }}/>
            <TextField id="outlined-basic" label="Measurement" variant="outlined"
                       value={copyArray[index].unitType || ""}
                       onChange={(event) => {
                           copyArray[index].unitType = event.target.value;
                           setIngList(copyArray);
                       }}/>
        </Grid>
    )
}
export default Ingredients;