// importing packages
const express = require('express');
const router = express.Router();
const fetch = (...args) =>
	import('node-fetch').then(({default: fetch}) => fetch(...args));
router.get(`/`, async function (req, res) {
	const url =
		'https://spoonacular-recipe-food-nutrition-v1.p.rapidapi.com/recipes/complexSearch';
	const options = {
		method: 'GET',
		headers: {
			'X-RapidAPI-Host': 'spoonacular-recipe-food-nutrition-v1.p.rapidapi.com',
			'X-RapidAPI-Key': 'f3d7a5a31cmshdf07c50ec6b12d6p1a3871jsn9e751e1e1428'
		}
	};
	// promise syntax
	fetch(url, options)
		.then(res => res.json())
		.then(json => console.log(json))
		.catch(err => console.error('error:' + err));
	try {
		let response = await fetch(url, options);
		response = await response.json();
		res.status(200).json(response);
	} catch (err) {
		console.log(err);
		res.status(500).json({msg: `Internal Server Error.`});
	}
});
module.exports = router;