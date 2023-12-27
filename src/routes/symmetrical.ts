import { Router } from 'express'
import { validateTokenSymmetrical } from '../middlewares/validation'
import { signToken } from '../utils/token'
import { SignType, User } from '../types/general'

const router: Router = Router()

router.get('/public', (_, res) => {
	res.status(200).send({
		'msg': 'I\'m public'
	})
})

router.get('/private', validateTokenSymmetrical, (_, res) => {
	res.status(200).send({
		'msg': 'I\'m Private'
	})
})

router.post('/token', async (req, res) => {
	const user: User = req.body
	const token = await signToken(user, SignType.symmetrical)

	res.status(200).send({
		token
	})
})

export default router