import React, { useState } from 'react'
import userService from './services/user.ts'

const App = () => {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const addUser = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const userObject = {
      name, 
      email, 
      password
    }


    const user = await userService.create(userObject)
    setName('')
    setEmail('')
    setPassword('')
    alert(`${user.name} registered successfully`)
  }

  return (
    <div>
      <h2>Register</h2>
      <form onSubmit={addUser}>
        <div>
          name <input type='text' value={name} onChange={({target}) => setName(target.value)} />
        </div>
        <div>
          email <input type='email' value={email} onChange={({target}) => setEmail(target.value)} />
        </div>
        <div>
          password <input type='password' value={password} onChange={({target}) => setPassword(target.value)} />
        </div>
        <button type='submit'>register</button>
      </form>
    </div>
  )
}

export default App
