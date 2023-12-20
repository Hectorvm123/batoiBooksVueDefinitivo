export default class UsersRepository {
  async getAllUsers(){
      const response = await fetch('http://localhost:3000/users');
      if (!response.ok) {
          throw `Error ${response.status} de la BBDD: ${response.statusText}`
      }
      const myData = await response.json(); 
      return myData;
  }

  async getUserById(id){
      const response = await fetch('http://localhost:3000/users/'+id);
      if (!response.ok) {
          throw `Error ${response.status} de la BBDD: ${response.statusText}`
      }
      const myData = await response.json(); 
      return myData;
  }

  async addUser(newUser){
      const response = await fetch("http://localhost:3000/users", {
          method: 'POST',
          body: JSON.stringify(newUser),
          headers:{
            'Content-Type': 'application/json'
          }
        })
        if (!response.ok) {
          throw `Error ${response.status} de la BBDD: ${response.statusText}`
        }
        const data = await response.json()
        return data

  }

  async removeUser(id){
    const response = await fetch("http://localhost:3000/users/" +id, {
      method: 'DELETE'
      })
      if (!response.ok) {
        throw `Error ${response.status} de la BBDD: ${response.statusText}`
      }
      const data = await response.json()
      return data

  }

  async changeUser(changedUser){
    const response = await fetch("http://localhost:3000/users/" + changedUser.id, {
      method: 'PUT',
      body: JSON.stringify(changedUser),
      headers:{
        'Content-Type': 'application/json'
      }
      })
      if (!response.ok) {
        throw `Error ${response.status} de la BBDD: ${response.statusText}`
      }
      const data = await response.json()
      return data
  }

  async updateUserPassword(id, newPassword){
    const response = await fetch("http://localhost:3000/users/" + id, {
        method: 'PATCH',
        body: JSON.stringify({password: newPassword}),
        headers:{
          'Content-Type': 'application/json'
        }
      })
      if (!response.ok) {
        throw `Error ${response.status} de la BBDD: ${response.statusText}`
      }
      const data = await response.json()
      return data

  }
}