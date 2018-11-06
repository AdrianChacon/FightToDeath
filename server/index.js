const app = require('express')()
const cors = require('cors')
const bodyParser = require('body-parser')
const atob = require('atob')

app.use(cors())
app.use(bodyParser.json())

app.post('/api/login', (req, res) => {
	const [ email, password ] = atob(req.body.code).split(':')
	const errors = []
	if (email !== 'qwer') errors.push('email')  
	if (password !== '1234') errors.push('password')  

	if (errors.length === 0){
		return res.status(200).json({
			status: 'Succesfully logged in'
		})
	} 

	res.status(401).json({
		status: 'Wrong username or password',
		errors
	})

})

app.listen(4000, () => console.log('Server listening on port 4000'))