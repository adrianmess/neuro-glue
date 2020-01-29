import React from "react";
import Cards from "./MaterialUI/Cards";

import {
  CarouselProvider,
  Slider,
  Slide,
  ButtonNext
} from "pure-react-carousel";
import "./FlashCardTest.css";
import "pure-react-carousel/dist/react-carousel.es.css";
import { ThumbUp, ThumbDown } from "@material-ui/icons";
import { makeStyles } from "@material-ui/core/styles";

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

    if (currentCardSet !== undefined) {
      const currentCardSetArray = Object.keys(currentCardSet).map(
        key => currentCardSet
      );
      this.setState({ cardSetLength: currentCardSetArray.length });

      let cardSetLength = currentCardSetArray.length;

      const cardScore = new Array(cardSetLength);

      this.setState({ cardScore });
    }
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

    let { cards, currentCardSetID } = this.props;
    let cardScoreS = cards[currentCardSetID]["Scores"];

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
      const scorePercentAsNum = (
        (numbOfPasses / cardArrayLength) *
        100
      ).toFixed(0);
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

      const scoreSetObject = {
        Date: date,
        ScorePercent: scorePercent,
        scorePercentAsNum: scorePercentAsNum,
        ScoreRatio: scoreRatio
      };

      const arrayOfScores = [];
      if (cardScoreS === undefined || cardScoreS.length < 1) {
        arrayOfScores.push(scoreSetObject);
        this.props.addTestScore(arrayOfScores);
      } else {
        const cardScoreSCopy = [...cardScoreS];
        cardScoreSCopy.push(scoreSetObject);
        this.props.addTestScore(cardScoreSCopy);
      }
    }
  };

  cardRender() {
    const { testComplete, scorePercent, scoreRatioStatement } = this.state;
    const title = this.props.currentCardSetTitle;
    const cardSet = this.props.currentCardSet;

    if (cardSet === undefined) {
      return <div>Card Set Empty - Please Add Cards</div>;
    }
    const cardsArray = Object.keys(cardSet).map(key =>
      Object.assign({ pass_fail: "" }, { cardID: key }, cardSet[key])
    );

    const cards = [];

    for (let i = 0; i < cardsArray.length; i++) {
      cards.push(
        <div key={i} id="slide-container">
          <Slide
            index={i}
            value={this.props.currentSlide}
            ref={this.activeSlideRef}
          >
            <div className="cards">
              <Cards
                cardindex={i}
                card={cardsArray[i]}
                cardSetScore={this.cardSetScore}
                //   clickNextButton={this.clickNextButton}
                thumbClicked={this.state.thumbClicked}
                setActiveCard={this.setActiveCard}
                activeSlideState={this.activeSlideRef}
              />
            </div>
          </Slide>
        </div>
      );
    }

    return (
      <div>
        {testComplete === true ? (
          <div>
            <div id="endOfTestContainer">
              <div>{scorePercent}</div>

              <div>{scoreRatioStatement}</div>
            </div>
            <button>Try Again</button> <button>Home</button>
          </div>
        ) : (
          <div>
            <h2> {title}</h2>

            <div>
              <div id="carouselContainer">
                <CarouselProvider
                  naturalSlideWidth={4}
                  naturalSlideHeight={2}
                  totalSlides={cards.length}
                >
                  <Slider>{cards}</Slider>
                  <div id="slider-buttons">
                    <div className="button-container" id="bu">
                      <ButtonNext
                        id="thumbsUp"
                        className="buttonNext"
                        ref="nextUpButtonRef"
                        disabled={false}
                      >
                        <ThumbUp
                          className="thumbs"
                          onClick={event => this.thumbsUp(event)}
                        />
                      </ButtonNext>
                    </div>

                    <div className="button-container">
                      <ButtonNext
                        id="thumbsDown"
                        className="buttonNext"
                        ref="nextDownButtonRef"
                        disabled={false}
                      >
                        <ThumbDown
                          className="thumbs"
                          onClick={event => this.thumbsDown(event)}
                        />
                      </ButtonNext>
                    </div>
                  </div>
                </CarouselProvider>
              </div>
            </div>
          </div>
        )}
      </div>
    );
  }

  render() {
    return <div id="card_test_containter">{this.cardRender()}</div>;
  }
}

export default FlashCardTest;
