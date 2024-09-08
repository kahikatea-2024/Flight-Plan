interface Props {
  name: string
  id: string
  value: string
  check: string
  handleChange: React.ChangeEventHandler<HTMLInputElement>
}

export function FormRadio(props: Props) {
  const { name, id, value, check, handleChange } = props

  return (
    <label className="radio" htmlFor={id}>
      <input
        type="radio"
        name={name}
        id={id}
        value={value}
        checked={check === `${value}`}
        onChange={handleChange}
      />
      {id}
    </label>
  )
}
