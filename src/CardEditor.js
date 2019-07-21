import React from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import './CardEditor.css';

class CardEditor extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
			text: '',
			subtext:'',
			} // You can also pass a Quill Delta here
		this.handleChange = this.handleChange.bind(this);
		this.bottomActive = this.bottomActive.bind(this);
		this.topActive = this.topActive.bind(this);
		this.myRef = React.createRef();
	}

	handleChange(value) {
		this.setState({ text: value })
	}

	componentDidMount(){
		const topToolBar = document.getElementsByClassName('ql-toolbar')[0];
		const bottomToolBar = document.getElementsByClassName('ql-toolbar')[1];

		topToolBar.style.zIndex="101";
		bottomToolBar.style.zIndex="100";
		bottomToolBar.style.top="240px";
		topToolBar.style.position ="relative";
		bottomToolBar.style.position ="fixed";

	}

	topActive(){
		const topToolBar = document.getElementsByClassName('ql-toolbar')[0];
		const bottomToolBar = document.getElementsByClassName('ql-toolbar')[1];

		topToolBar.style.zIndex = "101";
		bottomToolBar.style.zIndex = "100";
	}

	bottomActive(){

		const bottomDiv = document.getElementById('bottom-quill');
		const topToolBar = document.getElementsByClassName('ql-toolbar')[0];
		const bottomToolBar = document.getElementsByClassName('ql-toolbar')[1];
		topToolBar.style.zIndex = "100";
		bottomToolBar.style.zIndex = "101";
	}


	render(){
		return(
			<>
			<div id="reactQuill-container">
				<div id="top-quill"
				onClick={event => this.topActive(event)}>
					<ReactQuill id="top-quill"
						value={this.state.text}
						subtext={this.state.subtext}
						onChange={this.handleChange}>
					</ReactQuill>
				</div>

				<div id="bottom-quill"
					onClick={event => this.bottomActive(event)}>
					<ReactQuill	ref={this.myRef}></ReactQuill>
				</div>
			</div>
			</>
		)
	}
}

export default CardEditor;