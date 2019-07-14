import React from 'react';

class Card extends React.Component {
	render() {
		const { front, back} = this.props.details;
		return (
			<>
			<div>
			<p>{front}</p>
			</div>
			</>
		)
	}
}

export default Card