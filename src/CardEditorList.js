import React from 'react';
import renderHTML from 'react-render-html';


class CardEditorList extends React.Component{
	constructor(){
		super()
	}



	render() {

		const cardSet = this.props.currentCardSet;

		return(
			<>
			<div>
					{Object.keys(cardSet).map(key =>

					<div key={key} id="card-container"
						// onClick={() => this.selectCard(card, index)}
					>
						<div id="card-front" name="front">
									{renderHTML(cardSet[key].front)}
						</div>

							<div id="card-back" name="back">
									{renderHTML(cardSet[key].back)}
							</div>
							 <button
							 	id="card-button-remove"
							 	onClick={() =>
								this.props.deleteCard(key)}>
							remove
							</button>
						</div>

					)}

			</div>
			</>
		);
	}
}

export default CardEditorList;