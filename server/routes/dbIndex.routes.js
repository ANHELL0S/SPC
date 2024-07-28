import { Router } from 'express'
import { Auth } from '../middlewares/auth.middleware.js'
import { dbIndexController } from '../controllers/dbIndex.controller.js'
import { isAdmin } from '../middlewares/admin.middleware.js'

const router = Router()

router.get('/', dbIndexController.getAllDBIndex)
router.post('/', Auth, isAdmin, dbIndexController.createDBIndex)
router.put('/:id', Auth, isAdmin, dbIndexController.updateDBIndex)
router.get('/:id', Auth, isAdmin, dbIndexController.getByIdDBIndex)
router.delete('/:id', Auth, isAdmin, dbIndexController.deleteDBIndex)

export default router
