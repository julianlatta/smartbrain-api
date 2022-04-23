// Signs users into the database if they enter correct form login for valid account
const handleSignin = (db, bcrypt) => (req, res) => {
   const { email, password } = req.body;
   if (!email || !password) {
      return res.status(400).json('Incorrect form submission');
   }
   db.select('email', 'hash').from('login')
      .where('email', '=', email)
      .then(data => {
         const isValid = bcrypt.compareSync(password, data[0].hash);
         if (isValid) {
            return db.select('*').from('users')
               .where('email', '=', email)
               .then(user => {
                  res.json(user[0])
               })
               .catch(err > res.status(400).json('Unable to get user'))
         } else {
            res.status(400).json('Invalid credentials')
         }
      })
      .catch(err => res.status(400).json('Invalid credentials'))
}

module.exports = {
   handleSignin: handleSignin
}