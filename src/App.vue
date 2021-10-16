<template>
  <Header />
	<h3>New Note</h3>
  <form class="" method="post" @submit.prevent="createNote">
    <input 
      class="input-field"
      type="text" 
      name="title"
      v-model="note.title"
      placeholder="Title"
      >
    <input 
      class="input-field"
      type="text" 
      name="body"
      v-model="note.body"
      placeholder="Body"
      >
    <input 
      class="input-field"
      type="text" 
      name="url"
      v-model="note.url"
      placeholder="Url"
      >
    <button class="button-submit" type="submit" name="button">Add Note</button>
	</form>

	<h2>Notes List</h2>
	<ul>
		<li
			v-for="note in notes"
			v-bind:key="note.model.ID"
		>
			<span>{{ note.title }}</span>
			<span>{{ note.body }}</span>
			<button class="button-remove" @click="removeNote(note.model.ID)">Remove</button>
		</li>
	</ul>
	<h4 v-if="notes.length === 0">Empty list.</h4>
  <Footer />
</template>

<script>
  //import axios from 'axios'
  import Header from './components/Header.vue'
  import Footer from './components/Footer.vue'
  import axios from 'axios'
	export default {
		name: 'App',
    components: { 
      Header, 
      Footer },
    data () {
      return {
        notes: [],
        note: {
          title: "",
          body: "",
          url: ""
        }
      };
    },
    setup () {
    },
    created() {
      this.getNotes();
    },
    methods: {
      getNotes() {
        axios
          .get('http://notes-service:30079/note')
          .then((res) => {
            this.notes = res.data.data;
          })
        .catch(err => {
          console.log(err);
        })
      },
      removeNote (noteId) {
        axios
          .delete('http://notes-service:30079/note/' + noteId)
          .then(() => {
            this.getNotes()
          })
          .catch(err => {
            console.log(err);
          })
      },
      createNote() {
        axios
          .post('http://notes-service:30079/note', this.note)
          .then(() => {
            console.log(this.note)
            this.getNotes()
          })
          .catch(err => {
            console.log(err);
          })
      }
    }
}
</script>

<style>
  .input-field {
  --placeholder-color: #96CDCD;
  color: white;
  font-weight: normal;
  }
  .input-field::placeholder {
  color: var(--placeholder-color);
  }
  body {
    margin: 0;
    padding: 0;
    font-family: Avenir, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    background-color: #5F9EA0;
    color: white;
  }
  #app {
    max-width: 600px;
    margin-left: auto;
    margin-right: auto;
    padding: 20px;
  }
  h1 {
    font-weight: bold;
    font-size: 28px;
    text-align: top;
    display: inline;
    padding-left: 80px;
  }
  form {
    display: flex;
    flex-direction: column;
    width: 100%;
  }
  label {
    font-size: 14px;
    font-weight: bold;
  }
  input,
  .button-submit {
    background-color: #96CDCD;
    border: 1px solid #96CDCD;
    font-weight: bold;
    height: 48px;
    box-shadow: none;
    outline: none;
    padding-left: 12px;
    padding-right: 12px;
    border-radius: 6px;
    font-size: 18px;
    margin-top: 6px;
    margin-bottom: 12px;
  }
  input {
    background-color: transparent;
    border: 2px solid #99C0C0;
    
  }
  .button-remove {
    cursor: pointer;
    background-color: #99C0C0;
    border: 1px solid #99C0C0;
    color: #1f2023;
    font-weight: bold;
    outline: none;
    border-radius: 6px;
  }
  h2 {
    font-size: 22px;
    border-bottom: 2px solid #99C0C0;
    padding-bottom: 6px;
  }
  ul {
    padding: 10px;
  }
  li {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 12px 24px;
    border-radius: 6px;
    margin-bottom: 12px;
    border: 2px solid #99C0C0;
  }
  span {
    cursor: pointer;
  }
  .done {
    text-decoration: line-through;
  }
  button {
    font-size: 12px;
    padding: 6px;
  }
  h4 {
    text-align: center;
    opacity: 0.5;
    margin: 0;
  }
</style>
