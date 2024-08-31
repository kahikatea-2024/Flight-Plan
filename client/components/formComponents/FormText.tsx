interface Props {
  placeholder: string
  name: string
  id: string
  value: string
  handleChange: React.ChangeEventHandler<HTMLInputElement>
  formErrors: string
}

export function FormText(props: Props) {
  const { placeholder, name, id, value, handleChange, formErrors } = props

  return (
    <div className="field-body">
      <div className="field is-expanded">
        <div className="control">
          <input
            type="text"
            className="input"
            placeholder={placeholder}
            name={name}
            id={id}
            value={value}
            onChange={handleChange}
          />
        </div>
        {formErrors && <div className="error">{formErrors}</div>}
      </div>
    </div>
  )
}
