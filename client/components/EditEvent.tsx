import { EventData, Events } from '../../models/flightplan'
import { useEvents } from '../hooks/useEvents'
import { splitTimeAndDay } from '../utilities/eventTimes'
import { EventForm } from './EventForm'
// import { EventForm } from './EventForm'

interface EditEventProps {
  date: string
  // tripId: number
  // id: number
  setEvents: React.Dispatch<React.SetStateAction<Events[]>>
  handleEditClick: (id: number) => void
  event: Events
}

// interface FormData {
//   description: string
//   location: string
//   type: string
//   startHour: string
//   startMinutes: string
//   startAMPM: string
//   endHour: string
//   endMinutes: string
//   endAMPM: string
//   note: string
// }

// const initialFormErrors = {
//   description: '',
//   location: '',
//   type: '',
//   startHour: '',
//   startMinutes: '',
//   startAMPM: '',
//   endHour: '',
//   endMinutes: '',
//   endAMPM: '',
//   note: '',
// }

export function EditEvent({
  date,
  // tripId,
  event,
  setEvents,
  handleEditClick,
}: EditEventProps) {
  const userId = 1

  const startTime = splitTimeAndDay(event.startTime)
  const endTime = splitTimeAndDay(event.endTime)

  const { id, ...rest } = event

  const eventData = {
    ...rest,
    startHour: startTime.hour,
    startMinutes: startTime.minutes,
    startAMPM: startTime.timeOfDay,
    endHour: endTime.hour,
    endMinutes: endTime.minutes,
    endAMPM: endTime.timeOfDay,
  }

  // const updatedObject: MyObject = {
  //   ...((({ key2, ...rest }) => rest)(originalObject)),
  //   key4: 'value4',
  //   key5: 'value5',
  // };

  // const [formData, setFormData] = useState<FormData>({
  //   description: event.description,
  //   location: event.location,
  //   type: event.type,
  //   startHour: startTime.hour,
  //   startMinutes: startTime.minutes,
  //   startAMPM: startTime.timeOfDay,
  //   endHour: endTime.hour,
  //   endMinutes: endTime.minutes,
  //   endAMPM: endTime.timeOfDay,
  //   note: event.note,
  // })

  // const [formErrors, setFormErrors] = useState<FormData>(initialFormErrors)

  // const handleChange = (
  //   e:
  //     | React.ChangeEvent<HTMLInputElement>
  //     | React.ChangeEvent<HTMLSelectElement>,
  // ) => {
  //   const { name, value } = e.target
  //   setFormData((prevState) => ({
  //     ...prevState,
  //     [name]: value,
  //   }))

  //   eventFormValidation(name, value, setFormErrors)
  // }

  // const startTimeCombined = combineTimeAndDay(
  //   formData.startHour,
  //   formData.startMinutes,
  //   formData.startAMPM,
  // )
  // const endTimeCombined = combineTimeAndDay(
  //   formData.endHour,
  //   formData.endMinutes,
  //   formData.endAMPM,
  // )

  // const eventData: Events = {
  //   id: id,
  //   tripId: Number(tripId),
  //   description: formData.description,
  //   location: formData.location,
  //   type: formData.type,
  //   date: date as string,
  //   startTime: startTimeCombined,
  //   endTime: endTimeCombined,
  //   note: formData.note,
  //   createdBy: userId,
  // }

  const editEventMutation = useEvents(event.tripId.toString(), date, setEvents)

  const handleEditSubmit = async (data: EventData) => {
    const updatedEvent = { ...data, id: id }
    try {
      editEventMutation.mutate(updatedEvent, {
        onSuccess: async () => {
          handleEditClick(id)
        },
      })
    } catch (error) {
      console.error('Failed to edit event:', error)
    }
  }

  return (
    <section>
      <div className="card edit-event-container is-fluid is-centered ">
        <div className="columns is-fluid">
          <div className="column">
            <h2 className="is-size-2 has-text-centered has-text-primary">
              Edit Event
            </h2>
            <EventForm
              date={date}
              tripId={event.tripId}
              userId={userId}
              initialFormData={eventData}
              onSubmit={handleEditSubmit}
            />
          </div>
        </div>
      </div>
    </section>
  )
}
