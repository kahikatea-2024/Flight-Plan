interface Props {
  label: string
  id: string
}

export function FormLabel(props: Props) {
  const { label, id } = props
  return (
    <div className="field-label">
      <label className="label" htmlFor={id}>
        {label}
      </label>
    </div>
  )
}
