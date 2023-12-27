import { NextFunction, Request, Response } from 'express'
import { verifyToken } from '../utils/token'
import { SignType } from '../types/general'
import { JwtPayload } from 'jsonwebtoken'

export const validateTokenSymmetrical = async (req: Request, res: Response, next: NextFunction) => {

	const { authorization } = req.headers

	if (!authorization) return res.status(500).send({
		'msg': 'No authorization header provided'
	})

	const [type, token] = authorization!.split(' ')

	if (type !== 'Bearer') return res.status(500).send({
		'msg': 'Token is not a Bearer type'
	})

	const payload: JwtPayload = (await verifyToken(token, SignType.symmetrical)) as JwtPayload

	if (!payload) return res.status(500).send({
		'msg': 'Token Invalid'
	})

	if (Date.now() > payload.exp!) return res.status(500).send({
		'msg': 'Token expired'
	})

	next()
}

export const validateTokenAsymmetrical = async (req: Request, res: Response, next: NextFunction) => {

	const { authorization } = req.headers

	if (!authorization) return res.status(500).send({
		'msg': 'No authorization header provided'
	})

	const [type, token] = authorization!.split(' ')

	if (type !== 'Bearer') return res.status(500).send({
		'msg': 'Token is not a Bearer type'
	})

	const payload: JwtPayload = (await verifyToken(token, SignType.asymmetrical)) as JwtPayload

	if (!payload) return res.status(500).send({
		'msg': 'Token Invalid'
	})

	if (Date.now() > payload.exp!) return res.status(500).send({
		'msg': 'Token expired'
	})

	next()
}
