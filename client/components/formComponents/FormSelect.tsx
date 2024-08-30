interface Props {
  name: string
  id: string
  value: string
  handleChange: React.ChangeEventHandler<HTMLSelectElement>
  formErrors: string
}

export function FormSelect(props: Props) {
  const { name, id, value, handleChange, formErrors } = props

  return (
    <div className="field-body">
      <span className="select">
        <label className="label" htmlFor="startAMPM">
          <select name={name} id={id} value={value} onChange={handleChange}>
            <option>Select</option>
            <option>AM</option>
            <option>PM</option>
          </select>
          {formErrors && <span className="error">{formErrors}</span>}
        </label>
      </span>
    </div>
  )
}
