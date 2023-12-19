export default class ModulesRepository {
    async getAllModules(){
        const response = await fetch('http://localhost:3000/modules');
        if (!response.ok) {
            throw `Error ${response.status} de la BBDD: ${response.statusText}`
        }
        const myData = await response.json(); 
        return myData;
    }

    async getModuleByCode(code){
        const response = await fetch('http://localhost:3000/modules?code=', code);
        if (!response.ok) {
            throw `Error ${response.status} de la BBDD: ${response.statusText}`
        }
        const myData = await response.json(); 
        return myData;

    }

    async addModule(newModule){
        const response = await fetch("http://localhost:3000/modules", {
        method: 'POST',
        body: JSON.stringify(newModule),
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

    async removeModule(code){
        const response = await fetch("http://localhost:3000/modules/" +code, {
        method: 'DELETE'
        })
        if (!response.ok) {
            throw `Error ${response.status} de la BBDD: ${response.statusText}`
        }
        const data = await response.json()
        return data

    }

    async changeModule(changeModule){
        const response = await fetch("http://localhost:3000/modules/" + changeModule.id, {
      method: 'PUT',
      body: JSON.stringify(changeModule),
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