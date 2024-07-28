import { AuthProvider, useAuth } from './context/AuthContext'
import { ProtectedRoute } from './utils/ProtectedRoute'
import { HashRouter as Router, Routes, Route, Navigate } from 'react-router-dom'

import { HomePage } from './pages/web/HomePage'
import { LoginPage } from './pages/auth/LoginPage'
import { RegisterPage } from './pages/auth/RegisterPage'

import { LandingPage } from './pages/web/LandingPage'
import { _404 } from './pages/utils/_404'

import { TagsPage } from './pages/admin/TagsPage'
import { UsersPage } from './pages/admin/UsersPage'
import { SettingPage } from './pages/admin/SettingPage'
import { HistoryPage } from './pages/admin/HistoryPage'
import { CategoryPage } from './pages/admin/CategoryPage'
import { ParameterPage } from './pages/admin/ParameterPage'
import { DashboardPage } from './pages/admin/DashboardPage'
import { ArticlePage as ArticleAdminPage } from './pages/admin/ArticlePage'
import { ProfilePage as ProfileAdminPage } from './pages/admin/ProfilePage'
import { TemplatePage } from './pages/admin/TemplatePage'
import { FacultyPage } from './pages/admin/FacultyPage'
import { DBIndexPage } from './pages/admin/DBIndexPage'
import { LineResearchPage } from './pages/admin/LineResearchPage'
import { MagazinePage } from './pages/admin/MagazinePage'
import { FieldDependencePage } from './pages/admin/FieldDependencePage'
import { FieldDetailedPage } from './pages/admin/FieldDetailedPage'
import { FieldpecificPage } from './pages/admin/FieldSpecificPage'
import { FieldWidePage } from './pages/admin/FieldWidePage'
import { CareerPage } from './pages/admin/CareerPage'

import { ProfilePage } from './pages/web/ProfilePage'
import { ArticlePage } from './pages/web/ArticlePage'
import { CreateArticlePage } from './pages/web/CreateArticlePage'
import { CollectionArticle } from './pages/web/CollectionArticle'
import { MyArticlePage } from './pages/web/MyArticlesPage'

import PasswordResetRequestPage from './pages/auth/PasswordResetRequestPage'
import PasswordResetPage from './pages/auth/PasswordResetPage'

function App() {
	return (
		<AuthProvider>
			<Router>
				<Routes>
					<Route path='*' element={<_404 />} />
					<Route path='/' element={<LandingPage />} />

					<Route path='/login' element={<LoginPageWithRedirect />} />
					<Route path='/request-password-reset' element={<PasswordResetRequestPage />} />
					<Route path='/reset-password/:token' element={<PasswordResetPage />} />

					<Route path='/artículos' element={<HomePage />} />
					<Route path='/register' element={<RegisterPageWithRedirect />} />
					<Route path='/article/:id_article' element={<ArticlePage />} />

					<Route element={<ProtectedRoute />}>
						<Route path='/profile' element={<ProfilePage />} />
						<Route path='/collection-article' element={<CollectionArticle />} />
					</Route>

					<Route element={<ProtectedRoute onlyTeacher />}>
						<Route path='/crear-articulo' element={<CreateArticlePage />} />
						<Route path='/mis-articulos' element={<MyArticlePage />} />
					</Route>

					<Route element={<ProtectedRoute adminOnly />}>
						<Route path='/dashboard' element={<DashboardPage />} />
						<Route path='/dashboard/perfil/:id' element={<ProfileAdminPage />} />
						<Route path='/dashboard/formatos' element={<TemplatePage />} />
						<Route path='/dashboard/parametros' element={<ParameterPage />} />
						<Route path='/dashboard/usuarios' element={<UsersPage />} />
						<Route path='/dashboard/articulos' element={<ArticleAdminPage />} />
						<Route path='/dashboard/etiquetas' element={<TagsPage />} />
						<Route path='/dashboard/historial' element={<HistoryPage />} />
						<Route path='/dashboard/categorias' element={<CategoryPage />} />
						<Route path='/dashboard/configuraciones' element={<SettingPage />} />
						<Route path='/dashboard/facultades' element={<FacultyPage />} />
						<Route path='/dashboard/db-indexada' element={<DBIndexPage />} />
						<Route path='/dashboard/linea-investigacion' element={<LineResearchPage />} />
						<Route path='/dashboard/revistas' element={<MagazinePage />} />
						<Route path='/dashboard/dependencias' element={<FieldDependencePage />} />
						<Route path='/dashboard/campos-detallados' element={<FieldDetailedPage />} />
						<Route path='/dashboard/campos-especificos' element={<FieldpecificPage />} />
						<Route path='/dashboard/campos-amplios' element={<FieldWidePage />} />
						<Route path='/dashboard/carreras' element={<CareerPage />} />
					</Route>
				</Routes>
			</Router>
		</AuthProvider>
	)
}

function LoginPageWithRedirect() {
	const { isAuthenticated } = useAuth()
	return isAuthenticated ? <Navigate to='/artículos' /> : <LoginPage />
}

function RegisterPageWithRedirect() {
	const { isAuthenticated } = useAuth()
	return isAuthenticated ? <Navigate to='/artículos' /> : <RegisterPage />
}

export default App
