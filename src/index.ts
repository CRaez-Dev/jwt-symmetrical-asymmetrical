import express, { Express } from 'express'
import router from './routes'
import morgan from 'morgan'
import { PORT } from './utils/config'

const http: Express = express()

http.use(express.urlencoded({ extended: false }))
http.use(express.json())

http.use(morgan('dev'))

http.use('/jwt', router)

http.listen(PORT, () => {
	console.log(`Server running on http://localhost:${PORT}`)
})
