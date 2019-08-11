import React from 'react';


class FlashCardTest extends React.Component{

	render(){
		const title = this.props.currentCardSetTitle
		return(
			<>
			<div>
					{{title}?
					<h2>Test: {title}</h2>
					:
					<span></span>
					}
			</div>
			</>
		)
	}
}

export default FlashCardTest;