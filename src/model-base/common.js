Model = {
  extend: function(classAttrs) {
    var self = this;

    // This is the prototype for all models
    var modelClass = function(instanceAttrs) {

      // Register the model by it's name if it has one
      this._modelName = instanceAttrs.modelName;
      delete instanceAttrs.modelName;

      // Mix in the instanceAttrs
      _.extend(this, instanceAttrs);

      // Boot up all the extensions
      this._initializeExtensions();

      // Run the model instance's initializer
      if (instanceAttrs.initialize) {
        instanceAttrs.initialize.call(self, classAttrs);
      }
    };
    
    // Call initialize on any installed extensions
    modelClass.prototype._initializeExtensions = function() {
      var self = this;

      _.each(Model._extensions, function(extension) {
        if (extension.initialize) {
          extension.initialize.call(self, classAttrs);
        }
      });
    };
    
    // Extend all models with the child class attributes
    _.extend(modelClass.prototype, Model.prototype, classAttrs);

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
