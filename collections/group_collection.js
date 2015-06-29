function CollectionMaster () {
  this.group_collection = []
  this.user_collection = []
}

CollectionMaster.prototype = {
  deleteUserFromCollection: function(username){
    for (var i = this.user_collection.length - 1; i >= 0; i--) {
      if(this.user_collection[i] == username) {
        this.user_collection.splice(this.user_collection[i], 1);
      }
    }
  }
}


masterCollection = new CollectionMaster