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

    this.activeSlideRef = React.createRef();

    this.nextUpButtonRef = React.createRef();
    this.sliderRef = React.createRef();
    this.state = {
      activeCardIndex: "",
      thumbClicked: false,
      cardSetLength: null,
      cardScore: [],
      testComplete: false,
      scorePercent: "",
      scoreRatioStatement: ""
    };
  }

  componentDidMount() {
    const { currentCardSet } = this.props;

    const currentCardSetArray = Object.keys(currentCardSet).map(
      key => currentCardSet
    );

    this.setState({ cardSetLength: currentCardSetArray.length });

    let cardSetLength = currentCardSetArray.length;

    const cardScore = new Array(cardSetLength);

    this.setState({ cardScore });
  }

  cardSetScore(a, cardID, cardScore) {}

  setActiveCard = activeCardIndex => {
    if (this.state.activeCardIndex !== activeCardIndex) {
      this.setState({ activeCardIndex });
    }
  };

  thumbsUp = e => {
    e.preventDefault();
    this.cardScore("pass");
  };

  thumbsDown(e) {
    e.preventDefault();
    this.cardScore("fail");
  }

  cardScore = pass_fail => {
    this.setState({ thumbClicked: true });

    let cardScore = this.state.cardScore;

    const i = this.state.activeCardIndex;
    const scoreIndex = i + 1;
    const cardSet = this.props.currentCardSet;
    let cardArrayLength = this.state.cardSetLength;

    const cardsArray = Object.keys(cardSet).map(
      key => Object.assign({ pass_fail: "" }, { cardID: key })
      // Object.assign({ pass_fail: "" }, { cardID: key }, cardSet[key])
    );
    const cardsArrayEdit = cardsArray[i];
    cardsArrayEdit[`pass_fail`] = pass_fail;

    cardScore.splice(i, 1, cardsArrayEdit);

    this.setState({ cardScore: cardScore });
    if (cardArrayLength === scoreIndex) {
      const passes = cardScore.map(keys => keys["pass_fail"]);
      const numbOfPasses = passes.reduce((n, x) => n + (x === "pass"), 0);

      // console.log(typeof numbOfPasses)
      const scorePercent = Number(
        numbOfPasses / cardArrayLength
      ).toLocaleString(undefined, {
        style: "percent",
        minimumFractionDigits: 0
      });

      const scoreRatioStatement =
        "You scored " + numbOfPasses + " out of " + cardArrayLength;
      const scoreRatio = `${numbOfPasses}\/${cardArrayLength}`;

      const date = Date.now().toString();
      // const scoreRatioWithDate = { [`${date}`]: scoreRatio };
      this.setState({ testComplete: true, scorePercent, scoreRatioStatement });

      this.props.addTestScore(date, scoreRatio);

      // console.log("complete");
      // console.log("You scored " + numbOfPasses + " out of " + cardArrayLength);
      // console.log("You scored " + scorePercent);
    }
  };

  cardRender() {
    const { testComplete, scorePercent, scoreRatioStatement } = this.state;
    const title = this.props.currentCardSetTitle;
    const cardSet = this.props.currentCardSet;

    const cardsArray = Object.keys(cardSet).map(key =>
      Object.assign({ pass_fail: "" }, { cardID: key }, cardSet[key])
    );

    const cards = [];

    for (let i = 0; i < cardsArray.length; i++) {
      cards.push(
        <div key={i}>
          <Slide
            index={i}
            value={this.props.currentSlide}
            ref={this.activeSlideRef}
          >
            <Cards
              cardindex={i}
              card={cardsArray[i]}
              cardSetScore={this.cardSetScore}
              //   clickNextButton={this.clickNextButton}
              thumbClicked={this.state.thumbClicked}
              setActiveCard={this.setActiveCard}
              activeSlideState={this.activeSlideRef}
            />
          </Slide>
        </div>
      );
    }

    return (
      <div>
        {testComplete === true ? (
          <div id="endOfTestContainer">
            <div>{scorePercent}</div>

            <div>{scoreRatioStatement}</div>
          </div>
        ) : (
          <div>
            <h2> {title}</h2>

            <div>
              <div id="carouselContainer">
                <CarouselProvider
                  naturalSlideWidth={100}
                  naturalSlideHeight={125}
                  totalSlides={cards.length}
                >
                  <Slider>{cards}</Slider>

                  <ButtonNext
                    className="buttonNext"
                    ref="nextUpButtonRef"
                    disabled={false}
                  >
                    <ThumbUp
                      className="thumbs"
                      onClick={event => this.thumbsUp(event)}
                    />
                  </ButtonNext>
                  <ButtonNext
                    className="buttonNext"
                    ref="nextDownButtonRef"
                    disabled={false}
                  >
                    <ThumbDown
                      className="thumbs"
                      onClick={event => this.thumbsDown(event)}
                    />
                  </ButtonNext>
                </CarouselProvider>
              </div>
            </div>
          </div>
        )}
      </div>
    );
  }

  render() {
    return <>{this.cardRender()}</>;
  }
}

export default FlashCardTest;
