import React from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import './CardEditor.css';

class CardEditor extends React.Component {
	constructor(props) {
		super(props)
		this.state = { text: '' } // You can also pass a Quill Delta here
		this.handleChange = this.handleChange.bind(this)
	}

	handleChange(value) {
		this.setState({ text: value })
	}
	render(){
		return(
			<>
			<div id="reactQuill-container">
					<ReactQuill
						value={this.state.text}
						onChange={this.handleChange
						}>
						<div className="my-editing-area" />
					</ReactQuill>
			</div>

			</>
		)
	}
}

export default CardEditor;