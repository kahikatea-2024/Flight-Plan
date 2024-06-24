// import { useState } from 'react'
import { useUser } from '../hooks/useUsers'
import ProfileForm from '../components/ProfileForm'
import { Users } from '../../models/flightplan'

export default function MyProfile() {
  const { data, isLoading, mutation } = useUser(1)

  console.log(data?.id)

  // const [formState, setFormState] = useState({ user })

  if (isLoading) {
    return <div>Loading...</div>
  }

  function handleSubmit(form: Users) {
    mutation.mutate({ form })
  }

  // const handleChange = (
  //   evt: ChangeEvent<
  //     HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
  //   >,
  // ) => {
  //   const { name, value } = evt.target
  //   setFormState((prev) => ({
  //     ...prev,
  //     [name]: value,
  //   }))
  // }

  return <ProfileForm handleSubmit={handleSubmit} user={data} />
}
