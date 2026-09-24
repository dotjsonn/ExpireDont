import axios from 'axios'

const baseUrl = '/api/users/'

interface UserInput {
  name: string,
  email: string,
  password: string
}

const create = async (userObject: UserInput) => {
  const response = await axios.post(baseUrl, userObject)
  return response.data
}

export default {
  create
}
