function UserView() {
  this.location = null
  this.template = _.template($('#users-template').html());
}

UserView.prototype = {
  init: function() {
  },
  render: function(username, groupName) {
    this.location = this.setGroup(username, groupName)
  },
  setGroup: function(username, groupName){
    this.location = $("#usersCollection")
    this.location.append(this.template({username: username}))
  }
}