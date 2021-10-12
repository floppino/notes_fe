import { httpClient } from '@/boot/axios.js'
 
const routes = {
   // Get all notes
   async getNotes () {
     const response = await httpClient.get('/note')
     console.log("1")
     return response
   },
 
   // Get specific note by id
   async getNote (noteId) {
     const response = await httpClient.get('/note/' + noteId)
     return response
   },
   // Create note
   async addNote (data) {
     const response = await httpClient.post('/note/', data)
     return response
   },
   // Update note by id
   async updateNote (data) {
    const response = await httpClient.put('/note/' + data.note_id, data)
    return response
   },
   // Delete note by id
   async deleteNote (noteId) {
    const response = await httpClient.delete('/note/' + noteId)
    return response
   },
 }
 
 export default {
   ...routes
 }
 