/**
  Copyright (c) 2015, 2020, Oracle and/or its affiliates.
  The Universal Permissive License (UPL), Version 1.0
*/
define(['ojs/ojcomposite', 'text!./hr-search-view.html', './hr-search-viewModel', 'text!./component.json', 'css!./hr-search-styles'],
  function(Composite, view, viewModel, metadata) {
    Composite.register('hr-search', {
      view: view,
      viewModel: viewModel,
      metadata: JSON.parse(metadata)
    });
  }
);