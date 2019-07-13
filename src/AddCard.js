import React from 'react';

class AddCard extends React.Component{
	cardFront = React.createRef();
	cardBack = React.createRef();

	createCard = event => {
		event.preventDefault();
		const card = {
			front: this.cardFront.current.value,
			back: this.cardBack.current.value
		}
		this.props.addCard(card);
		//clear/refresh form
		event.currentTarget.reset();
	};

	render() {
		return(
			<>
				<form className="cards-list-main" onSubmit={this.createCard}>
					<h2>Create Card</h2>
					<input
						className="card-front"
						type="text"
						placeholder="Front"
						ref={this.cardFront}
					/>


					<input
						className="card-back"
						type="text"
						placeholder="Back"
						ref={this.cardBack}
					/>
					<button className="button" type="submit">Add</button>
				</form>
			</>
		)
	}
}

export default AddCard;