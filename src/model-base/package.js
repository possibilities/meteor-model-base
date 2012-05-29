Package.describe({
  summary: "A base for writing model extensions"
});

Package.on_use(function (api) {
  // Core
  api.add_files('common.js', ['client', 'server']);
});

Package.on_test(function (api) {
  api.use('test-helpers', ['client', 'server']);

  api.add_files('tests/common.js', ['client', 'server']);
});
