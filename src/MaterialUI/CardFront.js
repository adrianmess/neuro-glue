import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import { red } from '@material-ui/core/colors';
import renderHTML from 'react-render-html';


const useStyles = makeStyles(theme => ({
	card: {
		maxWidth: 345,
	},
	media: {
		height: 0,
		paddingTop: '56.25%', // 16:9
	},
	expand: {
		transform: 'rotate(0deg)',
		marginLeft: 'auto',
		transition: theme.transitions.create('transform', {
			duration: theme.transitions.duration.shortest,
		}),
	},
	expandOpen: {
		transform: 'rotate(180deg)',
	},
	avatar: {
		backgroundColor: red[500],
	},
}));

export default function CardFront(props) {
	const classes = useStyles();
	const [expanded, setExpanded] = React.useState(false);

	function handleExpandClick() {
		setExpanded(!expanded);
	}

	return (
		<>



		<Card className={classes.card}>

			<CardContent >
					{renderHTML(props.cardFront)}

			</CardContent>

		</Card>

		</>
	);
}