function GroupCollectionMaster () {
  this.collection = []
}

GroupCollectionMaster.prototype = {
  findGroup: function(name){
    for (var i = this.collection.length - 1; i >= 0; i--) {
      if (this.collection[i].name === name){
        return this.collection[i]
      }
    }
  }
}

GroupCollection = new GroupCollectionMaster