import {Avatar, Box, Card, CardContent, CardHeader, CardMedia, Grid, IconButton, Typography} from "@mui/material";
import {red} from "@mui/material/colors";

const Recipe = ({recipe, setDetailedView, setFocusedRecipe}) => {
    return (
        <Grid item onClick={() => {
            setDetailedView(true);
            setFocusedRecipe(recipe);
        }}>
            <Box sx={{width: 300}}>
                <Card variant="outlined">
                    <CardHeader
                        avatar={
                            <Avatar sx={{bgcolor: red[500]}} aria-label="recipe">
                                R
                            </Avatar>
                        }
                        action={
                            <IconButton aria-label="settings">
                                {/*<MoreVertIcon />*/}
                            </IconButton>
                        }
                        title={recipe.title}
                        // subheader="September 14, 2016"
                    />
                    <CardMedia
                        component="img"
                        height="194"
                        image={recipe.picUrl}
                        alt={recipe.title}
                    />
                    <CardContent>
                        <Typography variant="body2" color="text.secondary">
                            {recipe.description}
                        </Typography>
                    </CardContent>
                </Card>
            </Box>
        </Grid>
    )
}
export default Recipe;