<template>
  <Header />
	<h1>Notes App</h1>
	<form @submit.prevent="addNote()">
		<label>New note</label>
		<input
			v-model="newNote"
			name="newNote"
			autocomplete="off"
		>
		<button>Add Note</button>
	</form>
	<h2>Notes List</h2>
	<ul :key="componentKey">
          <!-- <th scope="row">{{user.id}}</th>
          <td>{{user.name}}</td>
          <td>{{user.email}}</td>
          <td>{{user.address.city}}</td>
        </tr> -->

		<li
			v-for="note in notes"
			v-bind:key="note.model.ID"
		>
			<span>{{ note.title }}</span>
			<span>{{ note.body }}</span>
			<button @click="removeNote(note.model.ID)">Remove</button>
		</li>
	</ul>
	<!-- <h4 v-if="notes.length === 0">Empty list.</h4> -->
  <Footer />
</template>

<script>
  //import axios from 'axios';
  import Header from '@/components/Header.vue'
  import Footer from '@/components/Footer.vue'
  import axios from 'axios'
	export default {
		name: 'App',
    components: { Header, Footer },
    data () {
      return {
        message: null,
        notes: null
      };
    },
    setup () {
      function removeNote (noteId) {
        axios
          .delete('http://localhost:30079/note/' + noteId)
          .then(() => {
            this.getNotes();
            console.log("Note deleted!")
          });
      }
      return {
        removeNote
      }
    },
    created() {
      this.getNotes();
    },
    methods: {
      forceRerender() {
        this.componentKey += 1;
      },
      getNotes() {
        axios
          .get('http://localhost:30079/note')
          .then((res) => {
            this.notes = res.data.data;
          });
      }
    }
}
</script>

<style lang="scss">
  $border: 2px solid
    rgba(
      $color: white,
      $alpha: 0.35,
    );
  $size1: 6px;
  $size2: 12px;
  $size3: 18px;
  $size4: 24px;
  $size5: 48px;
  $backgroundColor: #5F9EA0;
  $textColor: white;
  $primaryColor: #96CDCD;
  $secondTextColor: #1f2023;
  body {
    margin: 0;
    padding: 0;
    font-family: Avenir, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    background-color: $backgroundColor;
    color: $textColor;
    #app {
      max-width: 600px;
      margin-left: auto;
      margin-right: auto;
      padding: 20px;
      h1 {
        font-weight: bold;
        font-size: 28px;
        text-align: center;
      }
      form {
        display: flex;
        flex-direction: column;
        width: 100%;
        label {
          font-size: 14px;
          font-weight: bold;
        }
        input,
        button {
          height: $size5;
          box-shadow: none;
          outline: none;
          padding-left: $size2;
          padding-right: $size2;
          border-radius: $size1;
          font-size: 18px;
          margin-top: $size1;
          margin-bottom: $size2;
        }
        input {
          background-color: transparent;
          border: $border;
          color: inherit;
        }
      }
      button {
        cursor: pointer;
        background-color: $primaryColor;
        border: 1px solid $primaryColor;
        color: $secondTextColor;
        font-weight: bold;
        outline: none;
        border-radius: $size1;
      }
      h2 {
        font-size: 22px;
        border-bottom: $border;
        padding-bottom: $size1;
      }
      ul {
        padding: 10px;
        li {
          display: flex;
          justify-content: space-between;
          align-items: center;
          border: $border;
          padding: $size2 $size4;
          border-radius: $size1;
          margin-bottom: $size2;
          span {
            cursor: pointer;
          }
          .done {
            text-decoration: line-through;
          }
          button {
            font-size: $size2;
            padding: $size1;
          }
        }
      }
      h4 {
        text-align: center;
        opacity: 0.5;
        margin: 0;
      }
    }
  }
</style>
