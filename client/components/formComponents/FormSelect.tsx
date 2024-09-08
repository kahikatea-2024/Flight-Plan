interface Props {
  name: string
  id: string
  value: string
  selectOption: string[]
  handleChange: React.ChangeEventHandler<HTMLSelectElement>
}

export function FormSelect(props: Props) {
  const { name, id, value, selectOption, handleChange } = props

  const showOptions = (selectOption: string[]) =>
    selectOption.map((option) => (
      <option key={option} value={option}>
        {option}
      </option>
    ))

  return (
    <div className="field-body">
      <span className="select">
        <label className="label" htmlFor={name}>
          <select name={name} id={id} value={value} onChange={handleChange}>
            {showOptions(selectOption)}
          </select>
        </label>
      </span>
    </div>
  )
}
