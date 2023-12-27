import { Router } from 'express'
import symmetrical from './symmetrical'
import asymmetrical from './asymmetrical'


const router = Router()

router.use('/symmetrical', symmetrical)
router.use('/asymmetrical', asymmetrical)



export default router