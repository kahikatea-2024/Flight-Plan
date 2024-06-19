import { Users } from '../../models/flightplan'

interface Props {
  user?: Users
  handleSubmit: (user: Users) => void
}

export default function ProfileForm(props: Props) {
  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    const formData = new FormData(e.currentTarget)
    const firstName = formData.get('firstName') as string
    const lastName = formData.get('lastName') as string
    const username = formData.get('username') as string
    const email = formData.get('email') as string
    const phoneNumber = formData.get('phoneNumber') as string
    const profilePicture = formData.get('profilePicture') as string

    const form = {
      id: props.user?.id,
      firstName: firstName,
      lastName: lastName,
      username: username,
      email: email,
      phoneNumber: Number(phoneNumber),
      profilePicture: profilePicture,
    }

    props.handleSubmit(form)
  }
  return (
    <section className="section">
      <div className="container is-fluid">
        <h1 className="title has-text-centered">My Profile</h1>
        <div className="columns">
          <div className="column is-half is-offset-one-quarter">
            <h2 className="subtitle has-text-centered">Edit</h2>

            <form onSubmit={handleSubmit}>
              <div className="field">
                <label className="label">First Name</label>
                <div className="control">
                  <input
                    className="input"
                    type="text"
                    // onChange={handleChange}
                    defaultValue={props.user?.firstName}
                  />
                </div>
              </div>
              <div className="field">
                <label className="label">Last Name</label>
                <div className="control">
                  <input
                    className="input"
                    type="text"
                    defaultValue={props.user?.lastName}
                  />
                </div>
              </div>

              <div className="field">
                <label className="label">Username</label>
                <div className="control">
                  <input
                    className="input"
                    type="text"
                    defaultValue={props.user?.username}
                  />
                </div>
              </div>

              <div className="field">
                <label className="label">Email</label>
                <div className="control">
                  <input
                    className="input"
                    type="email"
                    defaultValue={props.user?.email}
                  />
                </div>
              </div>
              <div className="field">
                <label className="label">Phone Number</label>
                <div className="control">
                  <input
                    className="input"
                    type="number"
                    defaultValue={props.user?.phoneNumber}
                  />
                </div>
              </div>
              <div className="field">
                <label className="label">Profile Picture</label>
                <div className="control">
                  <input className="input" type="text" placeholder="imageURL" />
                </div>
              </div>
              <div className="field is-grouped is-grouped-centered">
                <button className="button is-primary">Save</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  )
}
