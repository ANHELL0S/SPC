import { Router } from 'express'
import { Auth } from '../middlewares/auth.middleware.js'
import { careerController } from '../controllers/careers.controller.js'
import { isAdmin } from '../middlewares/admin.middleware.js'

const router = Router()

router.get('/', careerController.getAllCareer)
router.post('/', Auth, isAdmin, careerController.createCareer)
router.get('/:id', Auth, isAdmin, careerController.getByCareer)
router.put('/:id', Auth, isAdmin, careerController.updateCareer)
router.delete('/:id', Auth, isAdmin, careerController.deleteCareer)

export default router
