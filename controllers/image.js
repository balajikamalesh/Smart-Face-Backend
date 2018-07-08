const Clarifai = require('clarifai');

const app = new Clarifai.App({
 apiKey: 'cd5576d206ff409eb80c60298dffab94'
});


const handleApiCall = (req,res) => {
	app.models
	.predict(Clarifai.FACE_DETECT_MODEL, req.body.input)
	.then(data => {
		res.json(data);
	})
	.catch(err => res.status(400).json('error'))

}

const image = (req,res,db) => {
	const {id} = req.body;
		db('users')
		.where('id', '=', id)
		.increment('entries',1)
		.returning('entries')
		.then(entries => {
			res.json(entries[0]);
	})
}

module.exports = {
	handleImage: image,
	handleApiCall: handleApiCall
}