import { Toaster, toast } from 'sonner'
import { useEffect, useState } from 'react'
import Navbar from '../../components/Navbar'
import { BiCheck, BiEditAlt } from 'react-icons/bi'
import { fetch, update } from '../../services/api/config.api'
import { Spinner } from '../../components/ui/spinner'
import { ButtonLoadingSpinner } from '../../components/ui/ButtomSpinner'

const SettingPage = () => {
	const [editedConfigs, setEditedConfigs] = useState({})
	const [isEditing, setIsEditing] = useState(false)
	const [isSaving, setIsSaving] = useState(false)
	const [loading, setLoading] = useState(true)

	const fetchData = async () => {
		setLoading(true)
		try {
			const configsData = await fetch()
			setEditedConfigs(Object.assign({}, ...configsData))
		} catch (error) {
			console.error('Error fetching configs:', error)
		} finally {
			setLoading(false)
		}
	}

	useEffect(() => {
		fetchData()
	}, [])

	const handleInputChange = event => {
		const { name, value } = event.target
		setEditedConfigs({ ...editedConfigs, [name]: value })
	}

	const handleEditClick = () => {
		setIsEditing(!isEditing) // Toggle entre true y false
		toast.info(isEditing ? 'Modo edición desactivado.' : 'Modo edición activado.') // Mensaje según el estado de edición
	}

	const handleSaveClick = async () => {
		setIsSaving(true)
		try {
			delete editedConfigs.createdAt
			delete editedConfigs.updatedAt
			await update(editedConfigs.id_config, editedConfigs)
			setIsEditing(false)
			fetchData()
			toast.success('Configuración actualizada correctamente.')
		} catch (error) {
			toast.error('Error al actualizar configuraciones.')
		} finally {
			setIsSaving(false)
		}
	}

	return (
		<>
			<Navbar />

			{loading ? (
				<Spinner />
			) : (
				<>
					<main className='container mx-auto px-4 lg:px-8 xl:max-w-7xl'>
						<div className='lg:py-20 sm:py-10'>
							<div className='flex flex-col gap-4 gap-x-20'>
								<div className='flex items-center justify-between'>
									<div className='flex gap-4 text-md font-semibold text-neutral-500'>
										<span>{isEditing ? 'Modo edición' : 'Configuraciones'}</span>
									</div>

									{isEditing ? (
										<button
											onClick={handleSaveClick}
											disabled={isSaving}
											className={`flex flex-row items-center gap-2 text-sm px-3 py-1 rounded-md transition-colors duration-150 ${
												isSaving
													? 'bg-neutral-500 text-neutral-200 cursor-not-allowed'
													: 'bg-neutral-600 text-neutral-50 hover:bg-neutral-700'
											}`}>
											{isSaving ? <ButtonLoadingSpinner /> : <BiCheck size={14} />}
											<span>{isSaving ? 'Guardando...' : 'Guardar'}</span>
										</button>
									) : (
										<button
											onClick={handleEditClick}
											className='flex flex-row items-center gap-2 text-sm bg-neutral-100 px-3 py-1 rounded-md text-neutral-500 hover:text-neutral-50 transition-colors duration-150 hover:bg-neutral-600'>
											<BiEditAlt size={14} />
											<span>Editar</span>
										</button>
									)}
								</div>

								<hr />

								<div className='overflow-scroll'>
									<form>
										<div className='grid grid-cols-1 md:grid-cols-4 gap-6'>
											{Object.keys(editedConfigs).map(key => {
												if (key !== 'createdAt' && key !== 'updatedAt') {
													if (key === 'id_config') {
														return null
													} else {
														return (
															<div key={key} className='mb-4'>
																<label className='block text-neutral-600 text-xs font-medium mb-2' htmlFor={key}>
																	{key === 'name_institution'
																		? 'Nombre de la Institución'
																		: key === 'abbreviation'
																		? 'Abreviatura'
																		: key === 'slogan'
																		? 'Eslogan'
																		: key === 'link_fb'
																		? 'Enlace de Facebook'
																		: key === 'link_ig'
																		? 'Enlace de Instagram'
																		: key === 'link_yt'
																		? 'Enlace de YouTube'
																		: key === 'link_x'
																		? 'Enlace X'
																		: key}
																</label>

																<input
																	type='text'
																	id={key}
																	name={key}
																	value={editedConfigs[key]}
																	onChange={handleInputChange}
																	className='text-neutral-500 text-sm font-medium rounded-lg appearance-none border border-neutral-300 w-full py-2 px-3 focus:outline-none focus:border-neutral-400'
																	readOnly={!isEditing}
																/>
															</div>
														)
													}
												} else {
													return null
												}
											})}
										</div>
									</form>
								</div>
							</div>
						</div>
						<Toaster richColors expand={true} />
					</main>
				</>
			)}
		</>
	)
}

export { SettingPage }
