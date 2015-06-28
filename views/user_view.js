function UserView() {
  this.location = null
  this.template = _.template($('#user-template').html());
}

UserView.prototype = {
  init: function() {
  },
  render: function(username, groupName) {
    this.location = this.setGroup(username, groupName)
  },
  setGroup: function(username, groupName){
    var group = GroupCollection.findGroup(groupName)
    var htmlId ="ul#" + group.name
    this.location = $(htmlId)
    this.location.append(this.template({username: username}))
  }
}