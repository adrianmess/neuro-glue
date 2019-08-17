import React from 'react';
import Button from '@material-ui/core/Button';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import {
	BrowserRouter as Router,
	Route,
	Link,
	Redirect,
} from 'react-router-dom';

export default function SimpleMenu (props) {


	const [anchorEl, setAnchorEl] = React.useState(null);
	const selectedCardCategory = props.selectedCardCategory;
	function handleClick(event) {
		setAnchorEl(event.currentTarget);
	}

	function handleClose() {
		setAnchorEl(null);
	}


	const { cards } = props;

	const cat = Object.keys(cards).map(key => cards[key].Category);
	console.log(cat);
	const uniqueCategories = Array.from(new Set(cat));

	const categoryList = uniqueCategories.map((uniqueCategories)=>
		<MenuItem
		key={uniqueCategories}
		value={uniqueCategories}
		onClick={() => { props.select(uniqueCategories); }}>
			<Link to={`/${uniqueCategories}`}>
					{uniqueCategories}
			</Link>
			{/* <Link to={`/flashcards/:${uniqueCategories}`}>
					{uniqueCategories}
			</Link> */}
		</MenuItem>
	);
	return (

		<div>
			<Button aria-controls="simple-menu" aria-haspopup="true" onClick={handleClick}>
				Open Menu
      </Button>
			<Menu
				id="simple-menu"
				anchorEl={anchorEl}
				keepMounted
				open={Boolean(anchorEl)}
				onClose={handleClose}
			> {categoryList}

			</Menu>
		</div>
	);
}