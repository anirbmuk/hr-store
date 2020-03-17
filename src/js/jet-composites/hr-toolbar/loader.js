/**
  Copyright (c) 2015, 2020, Oracle and/or its affiliates.
  The Universal Permissive License (UPL), Version 1.0
*/
define(['ojs/ojcomposite', 'text!./hr-toolbar-view.html', './hr-toolbar-viewModel', 'text!./component.json', 'css!./hr-toolbar-styles'],
  function(Composite, view, viewModel, metadata) {
    Composite.register('hr-toolbar', {
      view: view,
      viewModel: viewModel,
      metadata: JSON.parse(metadata)
    });
  }
);