<template>
  <h3>Notes:</h3>
</template>

<script>
import axios from 'axios';
export default {
  name: 'Notes',
  data() {
    return {
      notes: null,
    };
  },
  created: function() {
    axios
    .get('http://192.168.132.252:30079/notes')
    .then(res => {
      this.notes = res.data
    })
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 40px 40px;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
