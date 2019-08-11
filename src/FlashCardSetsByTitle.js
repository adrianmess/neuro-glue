import React from 'react';
import {Link} from 'react-router-dom';

class FlashCardSetsByTitle extends React.Component{


	setCurrentCardSetTitle(event, cardTitle){
		event.preventDefault();
		this.props.setCurrentCardSetTitle(cardTitle);
	}

	render(){
		const cards = this.props.cards;
		const cardTitles = Object.keys(cards).map(cardSetID => [cardSetID, cards[cardSetID].CardSetTitle]);


		return(
			<>
			<div>
					{cardTitles.map((cardTitles) =>
					<div>
						<Link
							to={`/FlashCardTest/${cardTitles[1]}`}
						>
								<span onCLick={event => this.setCurrentCardSetTitle(event, cardTitles[1])}>
									{cardTitles[1]}
							</span>

						</Link>
					</div>
					)}
			</div>
			</>
		)
	}
}

export default FlashCardSetsByTitle