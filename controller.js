$(document).ready(function(){

  function Controller () {
    this.mainContainer = $(".container")
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
      var group = $("#groupName").val()
      if (!group == "") {
        groupView.render($("#groupName").val());
         var data = this.autoFill(masterCollection.user_collection)
         this.setSelectBox(data)
        this.resetForm("#createGroup");
      } else {
        toolTip.alertBox("Add a group name.", $("#groupCreateToolTip"), "danger");
      }
    },
    createUser: function(e) {
      e.preventDefault();
      var username = $("#username").val()
      if (!username == ""){
        var user = username
        masterCollection.user_collection.push(username)
        userView.render(username);
        var data = this.autoFill(masterCollection.user_collection)
        this.setSelectBox(data)
        this.resetForm("#createUser")
      } else {
        toolTip.alertBox("Add a username.", $("#userCreateToolTip"), "danger");
      }
    },
    addUserToGroup: function(e) {
      e.preventDefault()
      var username = $('.selectGroup').val()
      if(!username == "") {
        var form = $(e.target).attr("class")
        var username = $("." + form +" input.selectGroup").val()
        var userDouble = this.checkUser($(e.target), username)
        if (userDouble === true){
          toolTip.alertBox("User is alreay in this group.", $("#groupCreateToolTip"), "warning");
        } else {
          var user_template = _.template($('#user-template').html());
          $(e.target).next().append(user_template({username: username}))
        }
      } else {
        toolTip.alertBox("Add a user.", $("#userCreateToolTip"), "danger");
      }
    },
    deleteUser: function(e) {
      e.preventDefault();
      var username = $(e.target).attr("id")
      var usernameStr = "li." +  username
      $(e.target).parent().remove()
      $(usernameStr).remove()
      masterCollection.deleteUserFromCollection(username)
      var data = this.autoFill(masterCollection.user_collection)
      this.setSelectBox(data)
    },
    deleteGroup: function(e){
      var users = $(e.target).parent().next().next().children()
      if (users.length === 0) {
        $(e.target).parent().parent().remove();
      } else {
        toolTip.alertBox("There are users in this group.", $("#userToolTip"), "warning");
      }
    },
    checkUser: function(target, username){
      // this is gross needs to be refactored
     var results = []
     var users =  target.parent().children().last().children()
      for (var i = users.length - 1; i >= 0; i--) {
        if ($(users[i]).attr("class") == username) {
          results.push(true)
        } else {
          results.push(false)
        };
      };
      var x = _.contains(results, true);
      if(x){
        return true
      } else {
        return false
      }
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
      return _.map( collection, function(username){
        return username
      })
    },
    setSelectBox: function(data) {
      var select = $('.selectGroup')
      if (select.length > 0) {
        select.select2({placeholder: "Select a User", data: data,
        allowClear: true})
        select.select2("val", "");
      }
    }
  }

  var toolTip = new ToolTip
  var groupView = new GroupView();
  var userView = new UserView();
  var app = new Controller();
  app.init();
})