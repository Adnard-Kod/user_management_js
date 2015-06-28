function GroupView() {
  this.location = null
  this.template = _.template($('#group-template').html());
}

GroupView.prototype = {
  init: function() {
  },
  render: function(groupName) {
    this.location = $("#groups")
    this.location.append(this.template({groupName: groupName}))
  },
}