import jwt from 'jsonwebtoken'
import { readFile } from 'node:fs/promises'
import { TOKEN_PRIVATE_KEY, TOKEN_PUBLIC_KEY, TOKEN_SECRET, TOKEN_TIME } from './config'
import { SignType, User } from '../types/general'

export const signToken = async (user: User, type: SignType) => {
	const payload = {
		sub: user.id,
		name: user.name,
		exp: Date.now() + (parseInt(TOKEN_TIME!) * 1000)
	}

	if (type === SignType.symmetrical) return jwt.sign(payload, TOKEN_SECRET!)
	if (type === SignType.asymmetrical) {
		const SECRET = await readFile(TOKEN_PRIVATE_KEY!, { encoding: 'utf8' },)
		return jwt.sign(payload, SECRET, { algorithm: 'RS256' })
	}
}

export const verifyToken = async (token: string, type: SignType) => {
	if (type === SignType.symmetrical) return jwt.verify(token, TOKEN_SECRET!)
	if (type === SignType.asymmetrical) {
		const SECRET = await readFile(TOKEN_PUBLIC_KEY!, { encoding: 'utf8' })
		return jwt.verify(token, SECRET)
	}
}
