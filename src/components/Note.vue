<template>
    
</template>

<script>
export default {
    name: 'Notes',
    setup() {
       return {
           notesTable: {
        showClosed: false,
        title: 'Notes',
        loading: false,
        pagination: {
          sortBy: 'note_id',
          descending: false,
          page: 1,
          rowsPerPage: 10,
          rowsNumber: 10
        },
        columns: [
          {
            name: 'title',
            align: 'left',
            label: 'Titolo',
            field: 'title',
            sortable: true
          },
          {
            name: 'body',
            align: 'left',
            label: 'Body',
            field: 'body',
            sortable: true
          },
          {
            name: 'url',
            align: 'left',
            label: 'URL',
            field: 'url',
            sortable: true
          },
        ],
        data: [],
        filter: ''
      }
       } 
    },
  created () {
    this.loadTicketCategories()
    this.getTickets(this.ticketsTable)
  },
}
</script>
