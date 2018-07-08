const handleRegister = (req,res,db, bcrypt) => {
	const {email,name,password} = req.body;
	if(!email || !name || !password){
		return res.status(400).json('incorrect form submission!!');
	}
	var hash = bcrypt.hashSync(password);
	db.transaction(trx => {
		trx.insert({
			hash: hash,
			email: email
		}).into('login')
		.returning('email')
		.then(loginemail => {
			return trx('users')
					.returning('*')
					.insert({
						email: loginemail[0],
						name: name,
						joined: new Date()
					}).then(user => {
						res.json(user);
					}).catch(err => {
						res.status(400).json('unable to register');
					})
				})
		.then(trx.commit)
		.catch(trx.rollback)
	})
	
}

module.exports = {
	handleRegister: handleRegister
}