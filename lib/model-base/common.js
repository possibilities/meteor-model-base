Model = {
  extend: function(classAttrs) {
    var classSelf = this;

    // Register the model by it's name if it has one
    classAttrs._modelName = classAttrs.modelName;
    delete classAttrs.modelName;

    // This is the prototype for all models
    var modelClass = function(instanceAttrs) {
      var modelSelf = this;

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

    // Extensions can have a class initializer
    Model._applyExtensions(modelClass);

    // Extend all models with the child class attributes
    _.extend(modelClass.prototype, Model.prototype, classAttrs);

    // Keep track of model classes because we might 
    // need to extend them if additional extensions
    // are defined after the class is defined
    Model._registry || (Model._registry = []);
    Model._registry.push(modelClass);

    // Done! Time to play!
    return modelClass;
  },

  _applyExtensions: function(modelClass) {
    _.each(Model._extensions, function(extension) {
      if (extension.initializeClass) {
        extension.initializeClass(modelClass);
      }
    });
  },

  _applyExtensionToExistingClasses: function(extension) {
    if (extension.initializeClass) {
      _.each(Model._registry, function(modelClass) {
        extension.initializeClass(modelClass);
      });
    }
  },

  // Install an extension
  extension: function(extension) {
    // Add extension to the extension registry
    this._extensions || (this._extensions = []);
    this._extensions.push(extension);

    // If we've already defined classes make sure they
    // get extended
    Model._applyExtensionToExistingClasses(extension);
  }
};
