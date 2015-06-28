function Group (name) {
  this.name = name
  this.users = []
}

Group.prototype = {
  deleteUser: function(username) {
    for (var i = this.users.length - 1; i >= 0; i--) {
      if (this.users[i].name === username) {
        this.users.splice(i, 1);
      }
    };
  },
  empty: function(group){
    if(group.users.length < 1) {
       return true
    } else {
      return false
    }
  }
}