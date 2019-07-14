import React from 'react';

class Card extends React.Component {
	render() {
		return (
			<>
			<div>
			<p>{this.props.details.front}</p>
			</div>
			</>
		)
	}
}

export default Card