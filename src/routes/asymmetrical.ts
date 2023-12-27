import { Router } from 'express'
import { validateTokenAsymmetrical } from '../middlewares/validation'
import { SignType, User } from '../types/general'
import { signToken } from '../utils/token'

const router: Router = Router()

router.get('/public', (_, res) => {
	res.status(200).send({
		'msg': 'I\'m public'
	})
})

router.get('/private', validateTokenAsymmetrical, (_, res) => {
	res.status(200).send({
		'msg': 'I\'m Private'
	})
})

router.post('/token', async (req, res) => {
	const user: User = req.body
	const token = await signToken(user, SignType.asymmetrical)

	res.status(200).send({
		token
	})
})

export default router