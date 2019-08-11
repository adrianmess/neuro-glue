import React from 'react';
import {Link} from 'react-router-dom';

class FlashCardSetsByTitle extends React.Component{

	setCardTitle(event, cardTitle, cardSetID){
		event.preventDefault();
		this.props.setCurrentCardSetTitle(cardTitle, cardSetID);

	}

	render(){
		const cards = this.props.cards;
		const cardTitles = Object.keys(cards).map(cardSetID => [cardSetID, cards[cardSetID].CardSetTitle]);
		return(
			<>
			<div>
					{cardTitles.map((cardTitles) =>
					<div>
							<span onClick={event => this.setCardTitle(event, cardTitles[1], cardTitles[0])}>
								<Link
									to={`/FlashCardTest/${cardTitles[1]}`}
								> {cardTitles[1]}
								</Link>
						</span>

					</div>
					)}
			</div>
			</>
		)
	}
}

export default FlashCardSetsByTitle