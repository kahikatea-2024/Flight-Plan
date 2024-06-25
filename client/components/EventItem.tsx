import { useRef } from 'react'
interface Props {
  description: string
  startTime: string
  endTime: string
  note: string
  location: string
  type: string
  isOpen: boolean
  onClick: (event: React.MouseEvent<HTMLButtonElement>) => void
}
export function EventItem(props: Props) {
  const {
    description,
    startTime,
    endTime,
    note,
    location,
    type,
    isOpen,
    onClick,
  } = props

  const contentHeight = useRef<HTMLDivElement>(
    null as unknown as HTMLDivElement,
  )

  return (
    <div className="box event-title-wrapper">
      <div className="columns ">
        <button
          className={`event-title-wrapper  ${isOpen ? 'active' : ''}`}
          onClick={onClick}
        >
          <div className="column">
            <p>{startTime}</p>
            <p>{endTime}</p>
          </div>
          <div className="column">
            <p>{type}</p>
          </div>
          <div className="column is-flex-end">
            <p className="is-size-4 has-text-right has-text-primary">
              {description}
            </p>
          </div>
          {/* <i className={`arrow ${isOpen ? 'active' : ''}`} /> */}
        </button>
      </div>

      <div
        ref={contentHeight}
        className="event-container"
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
        <div className="event-content">
          <p>{location}</p>
          <p>{note}</p>
        </div>
      </div>
    </div>
  )
}
