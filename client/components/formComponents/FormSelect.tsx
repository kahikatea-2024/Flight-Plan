interface Props {
  name: string
  id: string
  value: string
  selectOption: string[]
  handleChange: React.ChangeEventHandler<HTMLSelectElement>
  formErrors: string
}

export function FormSelect(props: Props) {
  const { name, id, value, selectOption, handleChange, formErrors } = props

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
      {formErrors && <span className="error">{formErrors}</span>}
    </div>
  )
}

{
  /* <label className="label" htmlFor="startAMPM">
<select name={name} id={id} value={value} onChange={handleChange}>
  <option>Select</option>
  <option>AM</option>
  <option>PM</option>
</select> */
}

//   return (
//     <div className="field-body">
//       <span className="select">
//         <label className="label" htmlFor={name}>
//           <select name={name} id={id} value={value} onChange={handleChange}>
//             {selectOption[name].map((option: string) => (
//               <div className="is-danger" key={option}>
//                 <option>{option}</option>
//               </div>
//             ))}
//           </select>
//           {formErrors && <span className="error">{formErrors}</span>}
//         </label>
//       </span>
//     </div>
//   )
// }

// return (
//   <div className="field-body">
//     {Object.keys(selectOption).map((key) => (
//       <span className="select" key={key}>
//         <label className="label" htmlFor={key}>
//           {key}
//           <select name={name} id={id} value={value} onChange={handleChange}>
//             {selectOption.map((option: string) => (
//               <option className="is-danger" key={option} value={option}>
//                 {option}
//               </option>
//             ))}
//           </select>
//           {formErrors && <span className="error">{formErrors}</span>}
//         </label>
//       </span>
//     ))}
//   </div>
// )
// }
