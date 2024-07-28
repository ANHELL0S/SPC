import { Router } from 'express'
import { Auth } from '../middlewares/auth.middleware.js'
import { lineResearchController } from '../controllers/line_research.controller.js'
import { isAdmin } from '../middlewares/admin.middleware.js'

const router = Router()

router.get('/', lineResearchController.getAll)
router.post('/', Auth, isAdmin, lineResearchController.create)
router.put('/:id', Auth, isAdmin, lineResearchController.update)
router.get('/:id', Auth, isAdmin, lineResearchController.getById)
router.delete('/:id', Auth, isAdmin, lineResearchController.delete)

export default router
