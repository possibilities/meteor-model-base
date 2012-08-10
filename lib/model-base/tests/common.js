User = Model.extend({
  modelName: 'user',
  initializeCount: 0, // For testing
  extensionInitializeCount: 0, // For testing

  initialize: function(attributes) {
    this.initializeCount++;
  },

  fullName: function() { 
    return this.firstName + ' ' + this.lastName
  }
});

Model.extension({
  initialize: function() {
    this.extensionInitializeCount++;
    this.extensionInitializeCount++;
  },
  initializeClass: function(modelClass) {
    modelClass._isExtended = true;
  },
  extensionMethod: function() {
    return 3;
  }
});

Tinytest.add("model-base", function (test) {

  // It should let me make a subclass with it's own behavior
  var mikeLombardo = new User({
    firstName: 'Mike',
    lastName: 'Lombardo'
  });

  var fullName = mikeLombardo.fullName();
  test.equal(fullName, 'Mike Lombardo');

  // The class initializer should be called any time an
  // instance is created
  test.equal(mikeLombardo.initializeCount, 1);

  // If you install an extension it's `initialize()` should
  // get called any time an instance is created
  test.equal(mikeLombardo.extensionInitializeCount, 2);  
  
  // If you install an extension it's methods should be
  // available on any model instance
  test.equal(mikeLombardo.extensionMethod(), 3);
  
  // If you install an extension with a class initializer
  // it should be able to operate on the subclass
  test.isTrue(User._isExtended);
  
});
