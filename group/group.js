define([
  'regular!./group.html'
], function (template) {
  var Group = Regular.extend({
    name: 'Form.Group',
    template: template,
    data: {
      errorMessage: '',
      defaultClassName: 'm-form-group'
    }
  });

  return Group;
});
