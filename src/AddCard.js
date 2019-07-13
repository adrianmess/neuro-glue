import React from 'react';

class AddCard extends React.Component{
	render() {
		return(
			<>
				<form className="cards-list-main" onSubmit={this.addCard}>
					<h2>Create Card</h2>
					<input
						className="card-front"
						type="text"
						placeholder="Front"
						ref={this.cardFrontInput}
					/>


					<input
						className="card-back"
						type="text"
						placeholder="Back"
						ref={this.cardBackInput}
					/>
					<button className="button" type="submit">Add</button>
				</form>
			</>
		)
	}
}

export default AddCard;