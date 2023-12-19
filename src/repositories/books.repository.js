export default class BooksRepository {
    async getAllBooks(){
        const response = await fetch('http://localhost:3000/books');
        if (!response.ok) {
            throw `Error ${response.status} de la BBDD: ${response.statusText}`
        }
        const myData = await response.json(); 
        return myData;
    }
    
    async getBookById(id){
        const response = await fetch('http://localhost:3000/books/' + id);
        if (!response.ok) {
            throw `Error ${response.status} de la BBDD: ${response.statusText}`
        }
        const myData = await response.json();
        return myData;
    }
    
    async addBook(newBook){
        const response = await fetch("http://localhost:3000/books", {
        method: 'POST',
        body: JSON.stringify(newBook),
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
    
    async removeBook(id){
      const response = await fetch("http://localhost:3000/books/" +id, {
      method: 'DELETE'
      })
      if (!response.ok) {
        throw `Error ${response.status} de la BBDD: ${response.statusText}`
      }
      const data = await response.json()
      return data
    
    }
    
    async changeBook(changedBook){
      const response = await fetch("http://localhost:3000/books/" + changedBook.id, {
      method: 'PUT',
      body: JSON.stringify(changedBook),
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
    
    async updatePriceOfBook(id, newPrice){
        const response = await fetch("http://localhost:3000/books/" + id, {
        method: 'PATCH',
        body: JSON.stringify({price: newPrice}),
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

