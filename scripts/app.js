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
      var exists = false;
      var duplicate;
      for (var i = 0; i < this.items.length; i++) {
        if (best === this.items[i].evtName) {
          exists = true;
          duplicate = this.items[i];
        }
      }
      if (exists) {
        duplicate.count++;
        this.totalSins++;
      } else {
        this.items.push({
          evtName: best,
          count: 0
        });
      }
    },
    add: function() {
      var input = document.getElementById('newEvent');
      var exists = false;
      var duplicate;
      for (var i = 0; i < this.items.length; i++) {
        if (input.value === this.items[i].evtName) {
          exists = true;
          duplicate = this.items[i];
        }
      }
      if (exists) {
        duplicate.count++;
        this.totalSins++;
        this.newEvent = '';
      } else {
        if (input.value !== '') {
          this.items.push({
            evtName: this.newEvent,
            count: 0
          });
          this.newEvent = '';
          input.style.border = '';
          input.focus();
        } else {
          input.style.border = '1px solid red';
        }
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
    },
    isDuplicate: function() {
      var exists = false;
      var duplicate;
      for (var i = 0; i < this.items.length; i++) {
        if (input.value === this.items[i].evtName) {
          exists = true;
          duplicate = this.items[i];
        }
      }
      return exists;
    }
  }
});
