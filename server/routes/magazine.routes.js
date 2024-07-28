import { Router } from 'express'
import { Auth } from '../middlewares/auth.middleware.js'
import { magazineController } from '../controllers/magazine.controller.js'
import { isAdmin } from '../middlewares/admin.middleware.js'

const router = Router()

router.get('/', magazineController.getAllmagizine)
router.post('/', Auth, isAdmin, magazineController.createMagazine)
router.put('/:id', Auth, isAdmin, magazineController.updateMagazine)
router.get('/:id', Auth, isAdmin, magazineController.getMagazineById)
router.delete('/:id', Auth, isAdmin, magazineController.deletemagizine)

export default router
