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
      var input = document.getElementById('newEvent');
      if (input.value !== '') {
        this.items.push({ evtName: this.newEvent, count: 0 });
        input.style.border = '';
        input.value = '';
        input.select();
        input.focus();

      }else {
        input.style.border = '1px solid red';
      }
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
