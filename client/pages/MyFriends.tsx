// import { Users } from '../../models/flightplan'
import request from 'superagent'
import { useState } from 'react'
import { useMyFriends } from '../hooks/useMyFriends'

export function MyFriends() {
  const { data, isLoading, isError } = useMyFriends()
  console.log(data)

  if (data)
    return (
      <div className="container is-fluid">
        <h1 className="title has-text-centered has-text-primary">My Trips</h1>
        <h2 className="card-header-title is-centered is-size-4">Add Friend</h2>
        <h3 className="has-text-centered mb-5">
          Enter email to add to My Friends
        </h3>
        <div className="column is-fluid">
          <div className="column is-half is-offset-one-quarter">
            <form className="field-is-horizontal is-centered">
              <div className="field">
                <div className="control">
                  <input
                    type="text"
                    className="input has-text-centered"
                    placeholder="Email"
                  />
                </div>
              </div>
              <div className="field is-grouped is-grouped-centered mt-6">
                <button className="button is-primary is-centered mb-5">
                  Add Friend
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    )
}
