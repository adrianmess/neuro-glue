import React from 'react';
import Header from './Header';
import { firestore } from './firebase';

class FlashCardSetTitlesByCategory extends React.Component{
	constructor(){
		super()

	}

	render(){
		const allCards = this.props.cards;
		const categories = Object.keys(allCards).map(key => allCards[key].Category);
		const uniqueCategories = Array.from(new Set(categories));

		return(
			<>
			<div>
			{uniqueCategories.map((uniqueCategories) => <div>{uniqueCategories}</div>)}
			</div>
			</>
		)
	}
}

export default FlashCardSetTitlesByCategory
