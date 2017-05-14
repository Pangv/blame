var app = new Vue({
  el: "#app",
  data: {
    newEvent: null,
    bestOfEvent: null,
    totalSins: 0,
    items: [],
    bestOf: [{
        best: 'Ähm'
      },
      {
        best: 'Quasi'
      },
      {
        best: 'Halt'
      },
      {
        best: 'Hä?'
      },
      {
        best: 'Upps, das ist die falsche Präsentation'
      },
    ],
  },
  methods: {
    addOne: function(item) {
      item.count += 1;
      this.totalSins++;
    },
    addTop5: function(best) {
      this.items.push({
        evtName: best,
        count: 0
      });
    },
    add: function() {
      var input = document.getElementById('newEvent');
      if (input.value !== '') {
        this.items.push({
          evtName: this.newEvent,
          count: 0
        });
        input.style.border = '';
        input.focus();
      } else {
        input.style.border = '1px solid red';
      }
    },
    softReset: function() {
      this.items.forEach(function(item) {
        item.count = 0;
      })
    },
    fullReset: function() {
      this.items = [];
      this.totalSins = 0;
    }
  }
});
