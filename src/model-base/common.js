Model = {
  extend: function(attributes) {
    var self = this;

    // This is the prototype for all models
    var modelClass = function(attributes) {

      // Mix in the attributes
      _.extend(this, attributes);

      // Boot up all the extensions
      this._initializeExtensions();
    };
    
    // Call initialize on any installed extensions
    modelClass.prototype._initializeExtensions = function() {
      var self = this;

      _.each(Model._extensions, function(extension) {
        if (extension.initialize) {
          extension.initialize.call(self, attributes);
        }
      });
    };
    
    // Extend all models with the child class attributes
    _.extend(modelClass.prototype, Model.prototype, attributes);

    // Extend all the models with any installed extension methods
    _.each(this._extensions, function(methods) {
      _.extend(modelClass.prototype, methods);
    });

    // Done! Time to play!
    return modelClass;
  },

  // Install an extension
  extension: function(extension) {
    this._extensions || (this._extensions = []);
    this._extensions.push(extension);
  }
};
