/**
  Copyright (c) 2015, 2020, Oracle and/or its affiliates.
  The Universal Permissive License (UPL), Version 1.0
*/
define(['ojs/ojcomposite', 'text!./hr-table-view.html', './hr-table-viewModel', 'text!./component.json', 'css!./hr-table-styles'],
  function(Composite, view, viewModel, metadata) {
    Composite.register('hr-table', {
      view: view,
      viewModel: viewModel,
      metadata: JSON.parse(metadata)
    });
  }
);