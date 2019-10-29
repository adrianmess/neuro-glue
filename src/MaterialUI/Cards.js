import React, { useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";

import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Collapse from "@material-ui/core/Collapse";
import Typography from "@material-ui/core/Typography";
import { red } from "@material-ui/core/colors";


import renderHTML from "react-render-html";

import ReactCardFlip from "react-card-flip";


const useStyles = makeStyles(theme => ({
  card: {
    maxWidth: 345
  },
  media: {
    height: 0,
    // paddingTop: "56.25%" // 16:9
  },
  expand: {
    transform: "rotate(0deg)",
    marginLeft: "auto",
    transition: theme.transitions.create("transform", {
      duration: theme.transitions.duration.shortest
    })
  },
  expandOpen: {
    transform: "rotate(180deg)"
  },
  avatar: {
    backgroundColor: red[500]
  }
}));

export default function Cards(props) {
  const classes = useStyles();
  const [expanded, setExpanded] = React.useState(false);
  const [isFlipped, setFlipped] = React.useState(false);

  useEffect(() => {
    let currentSlide = props.activeSlideState.current.state.currentSlide;
    props.setActiveCard(currentSlide);
  });

  function handleClick(e) {
    e.preventDefault();
    setFlipped(!isFlipped);
  }



  return (
    <>
      <ReactCardFlip
        isFlipped={isFlipped}
        flipDirection="horizontal"
        cardZIndex="1"
      >
        <div
          id="cardFront"
          key="front"
          onClick={event => handleClick(event, props.cardindex)}
        >
          <Card className={classes.card}>
            <CardContent>{renderHTML(props.card.front)}</CardContent>
          </Card>
        </div>

        <div
          id="cardBack"
          key="back"
          onClick={event => handleClick(event, props.cardindex)}
        >
          <Card className={classes.card}>
            <CardContent>{renderHTML(props.card.back)}</CardContent>
          </Card>
        </div>
      </ReactCardFlip>
      {!isFlipped ? null : (
        <>

          <Collapse in={expanded} timeout="auto" unmountOnExit>
            <CardContent>
              <Typography paragraph>References:</Typography>
            </CardContent>
          </Collapse>
        </>
      )}
    </>
  );
}
