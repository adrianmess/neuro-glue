import React from 'react';
import Header from './Header';
import { firestore } from './firebase';

class FlashCardSetTitlesByCategory extends React.Component{
	constructor(){
		super()

	}

	render(){
		const cardCategory = this.props.selectedCardCategory;
		return(
			<>
			<div>
			test
				{/* {Object.keys(this.props.cards).map(key =>
					<div
					id="cardCategory"
					key={key}
					index={key}>
					{this.props.cards[key].cardCategory}
					</div>
					)} */}

			</div>
			</>
		)
	}
}

export default FlashCardSetTitlesByCategory
