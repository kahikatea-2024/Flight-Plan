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
    <div className="wrapper">
      <button
        className={`title-container ${isOpen ? 'active' : ''}`}
        onClick={onClick}
      >
        <div className="title-content">
          <p>{startTime}</p>
          <p>{endTime}</p>
          <p>{type}</p>
          <p>{description}</p>
        </div>
        {/* <i className={`arrow ${isOpen ? 'active' : ''}`} /> */}
      </button>

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
