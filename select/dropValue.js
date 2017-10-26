define([
  'regular!./dropValue.html'
], function(template) {
  return Regular.extend({
    name: 'Form.Select.DropValue',
    template: template,
    data: {
      defaultClassName: 'm-select-value',
      className: 'm-select-value-large'
    },

    toggleDrop: function () {
      var parent = this.getParent();
      if(parent && typeof parent.toggleDrop === 'function') {
        parent.toggleDrop();
      }
      this.$emit('click');
    },

    getParent: function () {
      return this.$outer || this.$parent;
    }
  });
})