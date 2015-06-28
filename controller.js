$(document).ready(function(){

  function Controller () {
    this.mainContainer = $(".main_container")
    this.template = _.template($('#header-templete').html());
  }

  Controller.prototype = {
    init: function(){
      this.renderHeader();
      this.bindEvents();
    },
    bindEvents: function(){
      $("#createGroup").on('submit', function(e) {
        this.createGroup(e);
      }.bind(this))
      $("#createUser").on('submit', function(e) {
        this.createUser(e)
      }.bind(this))
      $("#groups").delegate(".deleteUser","click", function(e){
        this.deleteUser(e)
      }.bind(this))
      $("#groups").delegate(".deleteGroup","click", function(e) {
        this.deleteGroup(e)
      }.bind(this))
    },
    createGroup: function(e) {
      e.preventDefault();
      var group = new Group($("#groupName").val())
      GroupCollection.collection.push(group)
      groupView.render(group.name)
      this.resetForm("#createGroup")
      var groups = this.autoFill(GroupCollection.collection)
      $('#selectGroup').select2({data: groups, placeholder: "Select a repo"})
    },
    createUser: function(e) {
      e.preventDefault();
      var user = new User($("#username").val())
      var groupName = $("#selectGroup").children().html()
      this.addUserToGroup(user, groupName)
    },
    addUserToGroup: function(user, groupName) {
      var group = GroupCollection.findGroup(groupName)
      group.users.push(user)
      userView.render(user.name, groupName)
      this.resetForm("#createUser")
    },
    deleteUser: function(e) {
      e.preventDefault();
      var username = $(e.target).prev().html()
      var groupName = $(e.target).parent().parent().attr("id")
      var group = GroupCollection.findGroup(groupName)
      group.deleteUser(username)
      $(e.target).parent().remove()
    },
    deleteGroup: function(e){
      var groupName = $(e.target).parent().attr("id")
      var group = GroupCollection.findGroup(groupName)
      if (group.empty(group) === false) {
        console.log("tooltip there are users in this group")
      } else {
        $(e.target).parent().remove()
      }
    },
    renderHeader: function(){
      this.mainContainer.append(this.template)
    },
    resetForm: function(form){
      $(form)[0].reset()
    },
    autoFill: function(collection) {
      return _.map( collection, function(group){
        return group.name
      })
    }
  }

  var groupView = new GroupView();
  var userView = new UserView();
  var app = new Controller();
  app.init();
})