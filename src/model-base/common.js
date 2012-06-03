Model = {
  extend: function(classAttrs) {
    var classSelf = this;

    // This is the prototype for all models
    var modelClass = function(instanceAttrs) {
      var modelSelf = this;

      // Register the model by it's name if it has one
      this._modelName = instanceAttrs.modelName;
      delete instanceAttrs.modelName;

      // Mix in the instanceAttrs
      _.extend(this, instanceAttrs);

      // Boot up all the extensions
      this._initializeExtensions();

      // Extend model with extension methods
      _.each(Model._extensions, function(methods) {
        _.extend(modelSelf, methods);
      });

      // Run the model's class initializer
      if (classAttrs.initialize) {
        classAttrs.initialize.call(modelSelf, instanceAttrs);
      }
    };
    
    // Call initialize on any installed extensions
    modelClass.prototype._initializeExtensions = function() {
      var modelSelf = this;

      _.each(Model._extensions, function(extension) {
        if (extension.initialize) {
          extension.initialize.call(modelSelf, classAttrs);
        }
      });
    };
    
    // Extend all models with the child class attributes
    _.extend(modelClass.prototype, Model.prototype, classAttrs);

    // Done! Time to play!
    return modelClass;
  },

  // Install an extension
  extension: function(extension) {
    this._extensions || (this._extensions = []);
    this._extensions.push(extension);
  }
};
