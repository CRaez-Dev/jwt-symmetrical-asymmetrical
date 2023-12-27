import dotenv from 'dotenv'
dotenv.config()

export const {
	PORT: PORT,
	TOKEN_TIME: TOKEN_TIME,
	TOKEN_SECRET: TOKEN_SECRET,
	TOKEN_PRIVATE_KEY: TOKEN_PRIVATE_KEY,
	TOKEN_PUBLIC_KEY: TOKEN_PUBLIC_KEY,
} = process.env