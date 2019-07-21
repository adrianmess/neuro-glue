import React from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import './CardEditor.css';

class CardEditor extends React.Component {
	constructor() {
		super()
		this.state = {
			textFront: '',
			textBack: ''
			} // You can also pass a Quill Delta here

		this.handleChangeFront = this.handleChangeFront.bind(this);
		this.handleChangeBack = this.handleChangeBack.bind(this);
		this.bottomActive = this.bottomActive.bind(this);
		this.topActive = this.topActive.bind(this);
	}

		createCard = event => {
		event.preventDefault();
		const card = {
			front: this.state.textFront,
			back: this.state.textBack
		}
		this.props.addCard(card);
		//clear/refresh form
		// event.currentTarget.reset();
	};

	handleChangeFront(value) {
		this.setState({ textFront: value })
	}

	handleChangeBack(value) {
		this.setState({ textBack: value })
	}

	componentDidMount(){
		const topToolBar = document.getElementsByClassName('ql-toolbar')[0];
		const bottomToolBar = document.getElementsByClassName('ql-toolbar')[1];

		topToolBar.style.zIndex="101";
		bottomToolBar.style.zIndex="100";
	}

	topActive(){
		const topToolBar = document.getElementsByClassName('ql-toolbar')[0];
		const bottomToolBar = document.getElementsByClassName('ql-toolbar')[1];

		topToolBar.style.zIndex = "101";
		bottomToolBar.style.zIndex = "100";
	}

	bottomActive(){
		const topToolBar = document.getElementsByClassName('ql-toolbar')[0];
		const bottomToolBar = document.getElementsByClassName('ql-toolbar')[1];
		topToolBar.style.zIndex = "100";
		bottomToolBar.style.zIndex = "101";
	}


	render(){
		return(
			<>
			<div id="reactQuill-container">
					<div id="reactQuill-subContainer">
					<div id="top-quill"
						onClick={event => this.topActive(event)}
					>
						<ReactQuill
							value={this.state.textFront}
							onChange={this.handleChangeFront}>
						</ReactQuill>
					</div>

					<div id="bottom-quill"
						onClick={event => this.bottomActive(event)}
					>
						<ReactQuill
							value={this.state.textBack}
							onChange={this.handleChangeBack}>

						</ReactQuill>
					</div>
				</div>

				<button onClick={this.createCard}>Add Card</button>
			</div>
			</>
		)
	}
}

export default CardEditor;