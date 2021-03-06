var getProfile = (req,res) => {
	const  {id} = req.params;

	db.select('*')
		.from('users')
		.where({id: id})
		.then(user => {
			if(user.length){
				res.json(user[0]);	
			} else {
				res.status(400).json('not found');
			}
	})
}


module.exports = {
	handleProfile: getProfile
}