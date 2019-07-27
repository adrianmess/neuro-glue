import React from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import './CardEditor.css';

class CardEditor extends React.Component {
	constructor() {
		super()
		this.state = {
			front: '',
			back: '',
			index: null,
			};

		this.handleChangeFront = this.handleChangeFront.bind(this);
		this.handleChangeBack = this.handleChangeBack.bind(this);
		// this.bottomActive = this.bottomActive.bind(this);
		// this.topActive = this.topActive.bind(this);
	}

	createCard = event => {
		event.preventDefault();
		const card = {
			front: this.state.front,
			back: this.state.back
		}
		this.props.addCard(card);
		//clear/refresh form
		// event.currentTarget.reset();
	};




	handleChangeFront = async (value) => {
		await this.setState({ front: value })
	}

	handleChangeBack = async (value) =>{
		await this.setState({ back: value })
	}

	// componentDidMount = () =>{
	// 	const topToolBar = document.getElementsByClassName('ql-toolbar')[0];
	// 	const bottomToolBar = document.getElementsByClassName('ql-toolbar')[1];

	// 	topToolBar.style.zIndex="101";
	// 	bottomToolBar.style.zIndex="100";
	// }

	topActive(){
		const topToolBar = document.getElementsByClassName('ql-toolbar')[0];
		const bottomToolBar = document.getElementsByClassName('ql-toolbar')[1];
		topToolBar.style.display = "inherit";
		bottomToolBar.style.display = "none";
	}

	bottomActive(){
		const topToolBar = document.getElementsByClassName('ql-toolbar')[0];
		const bottomToolBar = document.getElementsByClassName('ql-toolbar')[1];
		// topToolBar.style.display = "none";
		bottomToolBar.style.display = "inherit";
	}


	componentDidUpdate = () => {

		if (this.props.selectedCardIndex !== this.state.index) {
			this.setState({
				front: this.props.selectedCard.front,
				back: this.props.selectedCard.back,
				index: this.props.selectedCardIndex
			})
		}
	}


	render(){

		return(

			<>
			<div id="reactQuill-container">
					<div id="reactQuill-subContainer">
					<div id="top-quill"
						onClick={this.topActive}
					>
						<ReactQuill
							name="front"
								value={this.state.front ? this.state.front: ''}
							onChange={this.handleChangeFront}>
						</ReactQuill>
					</div>

					<div id="bottom-quill"
						onClick={event => this.bottomActive(event)}
					>
						<ReactQuill
							name="back"
								value={this.state.back ? this.state.back : ''}
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