import { useRef } from 'react'
interface Props {
  id: number
  description: string
  startTime: string
  endTime: string
  note: string
  location: string
  type: string
  isOpen: boolean
  onClick: (event: React.MouseEvent<HTMLButtonElement>) => void
  handleEditClick: (id: number) => void
}
export function EventItem(props: Props) {
  const {
    id,
    description,
    startTime,
    endTime,
    note,
    location,
    type,
    isOpen,
    onClick,
    handleEditClick,
  } = props

  const contentHeight = useRef<HTMLDivElement>(
    null as unknown as HTMLDivElement,
  )

  return (
    <div className="panel is-primary">
      <div className=" panel-heading ">
        <button className="is-pulled-right" onClick={() => handleEditClick(id)}>
          <i className="fas fa-pen-to-square"></i>
        </button>
        <button
          className={`event-title-wrapper has-text-primary-dark has-text-weight-semibold  ${isOpen ? 'active' : ''}`}
          onClick={onClick}
        >
          <div className="column has-text-left ">
            <p>Start: {startTime}</p>
            <p>End: {endTime}</p>
          </div>
          <div className="column ">
            <p className="is-size-4">{description}</p>
          </div>
          <div className=" column">
            <p className="is-uppercase  has-text-right">{type}</p>
          </div>
          {/* <i className={`arrow ${isOpen ? 'active' : ''}`} /> */}
        </button>
      </div>

      <div
        ref={contentHeight}
        className=" event-container"
        style={
          isOpen
            ? {
                height: contentHeight.current
                  ? contentHeight.current.scrollHeight + 'px'
                  : '0px',
              }
            : { height: '0px' }
        }
      >
        <div className="event-content text-has-weight-semibold">
          <p>Location: {location}</p>

          <p>{note}</p>
        </div>
      </div>
    </div>
  )
}
