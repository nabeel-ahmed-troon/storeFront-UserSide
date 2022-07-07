import * as React from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { TextField } from "@mui/material";

export default function OwnedNftCard({
  nft,
  title,
  description,
  media,
  dropName,
  price,
}) {
  const [openAmount, setOpenAmount] = React.useState(false);
  const [numberOfTokens, setNumberOfTokens] = React.useState(null);

  return (
    <Card
      style={{ margin: "5px", background: "#F4F4F4" }}
      sx={{ maxWidth: 365 }}
    >
      <CardMedia component="img" height="200" image={media} />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {"Title: "}
          {title}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {"Description: "}
          {description}
        </Typography>
        {"Price: "}
        {price}
        {openAmount && (
          <div
            style={{
              marginTop: "1%",
            }}
          >
            <TextField
              name="amount"
              value={numberOfTokens}
              fullWidth
              placeholder="No. of tokens"
              onChange={(e) => setNumberOfTokens(e.target.value)}
            />
          </div>
        )}

        <CardActions>
          <Button size="small">Purchase</Button>
        </CardActions>
      </CardContent>
    </Card>
  );
}
