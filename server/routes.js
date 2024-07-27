import express from 'express'
import tagRoutes from './routes/tags.routes.js'
import authRoutes from './routes/auth.routes.js'
import usersRoutes from './routes/users.routes.js'
import configRoutes from './routes/configs.routes.js'
import reviewsRoutes from './routes/reviews.routes.js'
import articleRoutes from './routes/article.routes.js'
import commentsRoutes from './routes/comment.routes.js'
import templateRoutes from './routes/template.routes.js'
import categoryRoutes from './routes/categories.routes.js'
import movementsRoutes from './routes/movements.routes.js'
import parameterRoutes from './routes/parameter.routes.js'
import collectionArticleRoutes from './routes/collection_article.routes.js'
import facultyRoutes from './routes/faculty.routes.js'
import dbIndexRoutes from './routes/dbIndex.routes.js'
import lineResearchRoutes from './routes/line_research.routes.js'
import magazineRoutes from './routes/magazine.routes.js'
import fieldDependenceRoutes from './routes/field_dependence.routes.js'
import fieldSpecificRoutes from './routes/field_specific.routes.js'
import careerRoutes from './routes/career.routes.js'
import fieldDetailedRoutes from './routes/field_detailed.routes.js'
import fieldWideRoutes from './routes/field_wide.routes.js'

const router = express.Router()

// Endpoints públicos - autenticación
router.use('/auth', authRoutes)

// Endpoints privados - autenticación
router.use('/tags', tagRoutes)
router.use('/users', usersRoutes)
router.use('/configs', configRoutes)
router.use('/review', reviewsRoutes)
router.use('/faculty', facultyRoutes)
router.use('/db-index', dbIndexRoutes)
router.use('/articles', articleRoutes)
router.use('/comments', commentsRoutes)
router.use('/template', templateRoutes)
router.use('/categories', categoryRoutes)
router.use('/parameter', parameterRoutes)
router.use('/movements', movementsRoutes)
router.use('/line-research', lineResearchRoutes)
router.use('/collection-article', collectionArticleRoutes)
router.use('/magazine', magazineRoutes)
router.use('/field-dependence', fieldDependenceRoutes)
router.use('/field-detailed', fieldDetailedRoutes)
router.use('/field-specific', fieldSpecificRoutes)
router.use('/field-wide', fieldWideRoutes)
router.use('/career', careerRoutes)

// Endpoint para verificar el estado del servidor
router.get('/status', (req, res) => {
	res.json({ status: 'Server is running' })
})

export default router
