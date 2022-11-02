import {Grid, TextField} from "@mui/material";

const Steps = ({index, stepList, setStepList}) => {
    let copyArray = stepList.slice();

    return (
        <Grid style={{marginBottom:"10px"}} item>
            <TextField id="outlined-basic" label={`Step ${index + 1}:`} variant="outlined"
                       value={copyArray[index].instructions || ""}
                       onChange={(event) => {
                           copyArray[index].instructions = event.target.value;
                           setStepList(copyArray);
                       }}/>
        </Grid>
    )
}
export default Steps;