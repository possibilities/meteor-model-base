Model = {
  extend: function(inheritFrom) {
    var modelClass = function(attributes) {
      _.extend(this, attributes);
    };
    _.extend(modelClass.prototype, Model.prototype, inheritFrom);
    _.each(this._extensions, function(methods) {
      _.extend(modelClass.prototype, methods);
    });
    return modelClass;
  },
  extension: function(extension) {
    this._extensions || (this._extensions = []);
    this._extensions.push(extension);
  }
};
