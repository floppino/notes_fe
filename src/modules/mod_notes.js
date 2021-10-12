import apiService from 'src/api/routes.js'

const state = {

  notes: [],
  loading: false,
  statuses: [],
  types: [],
  current: {},
  messages: [],
  categories: []
}

const actions = {
  // Get all notes
  loadNotes ({ commit }, filter) {
    return new Promise((resolve, reject) => {
      apiService
        .getNotes(filter)
        .then(response => {
          if (response.data === '') {
            commit('setNotes', [])
          } else {
            commit('setNotes', response.data)
          }
          resolve(response)
        }, error => {
          console.log('Error', error)
          commit('unloadNotes')
          reject(error)
        })
    })
  },

  // Get single note by id
  loadNote ({ commit }, noteId) {
    return new Promise((resolve, reject) => {
      apiService
        .getNote(noteId)
        .then(response => {
          commit('setCurrentNote', response.data[0])
          resolve(response)
        }, error => {
          console.log('Error', error)
          commit('unloadCurrentNote')
          reject(error)
        })
    })
  },

  // Create new note
  createNote ({ dispatch }, payload) {
    apiService
      .addNote(payload)
      .then(() => {
        dispatch('loadNotes')
      })
      .catch(error => {
        console.log(error)
      })
  },

}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
