import React from "react";
import Cards from "./MaterialUI/Cards";
import ReactCardFlip from "react-card-flip";

import {
  CarouselProvider,
  Slider,
  Slide,
  ButtonBack,
  ButtonNext
} from "pure-react-carousel";
import "./FlashCardTest.css";
import "pure-react-carousel/dist/react-carousel.es.css";
import { Cake } from "@material-ui/icons";
import { ThumbUp, ThumbDown } from "@material-ui/icons";


class FlashCardTest extends React.Component {





	render(){
		const title = this.props.currentCardSetTitle
		return(
			<>
			<div>
					{{title}?
					<h2>Test: {title}</h2>
					:
					<span></span>
					}
			</div>
			</>
		)
	}
}

}

export default FlashCardTest;
