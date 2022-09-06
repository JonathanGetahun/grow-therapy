import React from "react";
import {
  Box,
  Card,
  CardActionArea,
  CardContent,
  Typography,
} from "@mui/material";
import PushPinIcon from "@mui/icons-material/PushPin";

const ArticleCard = ({ articleName, views, pin, handlePinArticle }) => {
  return (
    <Card
      sx={{
        flexWrap: "wrap",
        width: 300,
        alignSelf: "center",
        marginTop: "1.5rem",
      }}
      data-testid={pin ? "article-card-pinned" : "article-card"}
    >
      <Box>
        <CardActionArea>
          <CardContent
            sx={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
              height: "15vh",
            }}
          >
            <Typography variant="h5" sx={{ flex: "3" }}>
              {articleName?.replace(/_/g, " ")}
            </Typography>

            <CardContent sx={{ flex: "1", alignContent: "end" }}>
              <Typography variant="body2">Views:</Typography>
              <Typography variant="body2">{views}</Typography>
            </CardContent>
            <PushPinIcon
              sx={{ visibility: pin ? "hidden" : "" }}
              onClick={() => handlePinArticle({ article: articleName, views })}
              data-testid={"article-card-pin"}
            />
          </CardContent>
        </CardActionArea>
      </Box>
    </Card>
  );
};

export default ArticleCard;
