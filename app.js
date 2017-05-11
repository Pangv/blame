var app = new Vue({
  el: "#app",
  data: {
    newEvent: null,
    items: []
  },
  methods: {
    addOne: function(item) {
      item.count += 1;
    },
    add: function() {
      this.items.push({ evtName: this.newEvent, count: 0 });
    },
    softReset: function(){
      this.items.forEach(function(item){
        item.count = 0;
      })
    },
    fullReset: function() {
      this.items = [];
    }
  }
});
