User = Model.extend({
  fullName: function() { 
    return this.firstName + ' ' + this.lastName
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
});
