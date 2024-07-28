const InputField = ({ type, value, onChange, placeholder, icon: Icon }) => {
	return (
		<div className='mb-4 flex items-center rounded-2xl border px-3 py-2'>
			{Icon && <Icon />}
			<input
				className='border-none pl-2 text-neutral-500 outline-none'
				type={type}
				value={value}
				onChange={onChange}
				placeholder={placeholder}
			/>
		</div>
	)
}

export { InputField }
