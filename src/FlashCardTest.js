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
  constructor() {
    super();

    this.myRef = React.createRef();

    this.nextUpButtonRef = React.createRef();
    this.sliderRef = React.createRef();
    this.state = {
      activeCardIndex: "",
      thumbClicked: false,
      cardSetLength: null,
      cardScores: []
    };
  }

  componentDidMount() {
    const { currentCardSet } = this.props;

    const currentCardSetArray = Object.keys(currentCardSet).map(
      key => currentCardSet
    );

    this.setState({ cardSetLength: currentCardSetArray.length });

    let cardSetLength = currentCardSetArray.length;

    const cardScores = new Array(cardSetLength);

    this.setState({ cardScores });
  }

  cardSetScore(a, cardID, cardScore) {}


  setActiveCard = activeCardIndex => {
    if (this.state.activeCardIndex !== activeCardIndex) {
      this.setState({ activeCardIndex });
    }

  };

  thumbsUp = e => {
    e.preventDefault();

    this.setState({ thumbClicked: true });

    let cardScores = this.state.cardScores;

    const i = this.state.activeCardIndex;
    const cardSet = this.props.currentCardSet;
    let cardArrayLength = this.state.cardSetLength;
    const cardsArray = Object.keys(cardSet).map(key =>
      Object.assign({ pass_fail: "" }, { cardID: key }, cardSet[key])
    );
    const cardsArrayEdit = cardsArray[i];
    cardsArrayEdit[`pass_fail`] = "pass";

    cardScores.splice(i, 1, cardsArrayEdit);

    this.setState({ cardScores: cardScores });
  };

  thumbsDown(e) {
    e.preventDefault();

    this.setState({ thumbClicked: true });

    let cardScores = this.state.cardScores;

    const i = this.state.activeCardIndex;
    const cardSet = this.props.currentCardSet;
    let cardArrayLength = this.state.cardSetLength;
    const cardsArray = Object.keys(cardSet).map(key =>
      Object.assign({ pass_fail: "" }, { cardID: key }, cardSet[key])
    );
    const cardsArrayEdit = cardsArray[i];
    cardsArrayEdit[`pass_fail`] = "fail";

    cardScores.splice(i, 1, cardsArrayEdit);

    this.setState({ cardScores: cardScores });
  }

  cardRender() {
    const title = this.props.currentCardSetTitle;
    const cardSet = this.props.currentCardSet;

    const cardsArray = Object.keys(cardSet).map(key =>
      Object.assign({ pass_fail: "" }, { cardID: key }, cardSet[key])
    );

    const cards = [];

    for (let i = 0; i < cardsArray.length; i++) {
      cards.push(
        <>
          <Slide index={i} value={this.props.currentSlide} ref={this.myRef}>
            <Cards
              cardindex={i}
              card={cardsArray[i]}
              cardSetScore={this.cardSetScore}
              //   clickNextButton={this.clickNextButton}
              thumbClicked={this.state.thumbClicked}
              setActiveCard={this.setActiveCard}
              activeSlideState={this.myRef}
            />
          </Slide>
        </>
      );
    }

    return (
      <div>
        {{ title } ? (
          <div>
            <h2>Test: {title}</h2>

            <div>
              <div id="carouselContainer">
                <CarouselProvider
                  naturalSlideWidth={100}
                  naturalSlideHeight={125}
                  totalSlides={cards.length}
                >
                  <Slider>{cards}</Slider>

                  <ButtonNext className="buttonNext" ref="nextUpButtonRef">
                    <ThumbUp onClick={event => this.thumbsUp(event)} />
                  </ButtonNext>
                  <ButtonNext className="buttonNext" ref="nextDownButtonRef">
                    <ThumbDown onClick={event => this.thumbsDown(event)} />
                  </ButtonNext>
                </CarouselProvider>
              </div>
            </div>
          </div>
        ) : (
          <span />
        )}
      </div>
    );
  }

  render() {
    return <>{this.cardRender()}</>;
  }
}

export default FlashCardTest;
