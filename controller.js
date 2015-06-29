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
      $("#groupsCollection").delegate("#addUsers", 'submit', function(e) {
        this.addUserToGroup(e)
      }.bind(this))
      $("#usersCollection").delegate(".deleteUser","click", function(e){
        this.deleteUser(e)
      }.bind(this))
      $("#groupsCollection").delegate(".deleteGroup","click", function(e) {
        this.deleteGroup(e)
      }.bind(this))
      $("#groupsCollection").delegate(".deleteUser","click", function(e) {
        this.deleteUserFromGroup(e)
      }.bind(this))
    },
    createGroup: function(e) {
      e.preventDefault();
      var group = new Group($("#groupName").val());
      masterCollection.group_collection.push(group);
      groupView.render(group.name);
      this.resetForm("#createGroup");
       var data = this.autoFill(masterCollection.user_collection)
      $('.selectGroup').select2({data: data ,placeholder: "Select a repo"})
    },
    createUser: function(e) {
      e.preventDefault();
      var user = new User($("#username").val());
      masterCollection.user_collection.push(user)
      userView.render(user.name);
      var data = this.autoFill(masterCollection.user_collection)
      this.setSelectBox(data)
      this.resetForm("#createUser")
    },
    addUserToGroup: function(e) {
      e.preventDefault()
      var form = $(e.target).attr("id")
      var username = $("#" + form +" input.selectGroup").val()
      var userDouble = this.checkUser($(e.target), username)
      if (userDouble === true){
        console.log("user is alreay in this group")
      } else {
        var user_template = _.template($('#user-template').html());
        $(e.target).next().append(user_template({username: username}))
        var data = this.autoFill(masterCollection.user_collection)
        this.resetSlectBox(data)
      }
    },
    deleteUser: function(e) {
      e.preventDefault();
      var username = $(e.target).remove()
      var usernameStr = "." +  $(e.target).attr("id")
      $(usernameStr).remove()
    },
    deleteGroup: function(e){
      var users = $(e.target).parent().next().next().children()
      if (users.length === 0) {
        $(e.target).parent().parent().remove();
      } else {
        console.log("tooltip there are users in this group");
      }
    },
    checkUser: function(target, username){
      // this is gross needs to be refactored
     var users =  target.parent().children().last().children()
      for (var i = users.length - 1; i >= 0; i--) {
        if ($(users[i]).attr("class") === username) {
          console.log("already a user in this group")
          return true
        } else {
          return false
        };
      };
    },
    deleteUserFromGroup: function(e){
      e.preventDefault()
      $(e.target).parent().remove()
    },
    renderHeader: function(){
      this.mainContainer.append(this.template);
    },
    resetForm: function(form){
      $(form)[0].reset();
    },
    autoFill: function(collection) {
      return _.map( collection, function(group){
        return group.name
      })
    },
    setSelectBox: function(data) {
      $('.selectGroup').select2({data: data, placeholder: "Select a repo"})
    },
    resetSlectBox: function(){
      // $('.selectGroup').select2({placeholder: "Select a user"})
    }
  }

  var groupView = new GroupView();
  var userView = new UserView();
  var app = new Controller();
  app.init();
})