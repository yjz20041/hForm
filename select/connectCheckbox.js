define([
  './option.js'
], function (SelectOption) {
  return Regular.extend({
    name: 'Form.Select.ConnectCheckbox',
    template: '{#include this.$body}',

    config: function () {
      var parent = this.getParent();
      if (parent) {
        this.proxyCheckbox = true;
        this._parent = parent;
      }
    },

    proxyIsChecked: function () {
      return this._parent.isSelected();
    },

    proxyIsDisabled: function () {
      return this._parent.isDisabled();
    },

    getParent: function () {
      var parent = this.$outer || this.$parent;
      if (parent && parent instanceof SelectOption) {
        return parent;
      }
    }
  });
})