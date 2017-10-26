define([
  'regular!./option.html'
], function(template) {
  return Regular.extend({
    name: 'Form.Select.Option',
    template: template,
    data: {
      defaultClassName: 'm-select-option',
      useIcon: true
    },

    init: function (data) {
      var _self = this;
      if (data.selected) this.pick();
      this._watchSelected = this.$watch('selected', function (targetSelected) {
        if (targetSelected && targetSelected !== _self.isSelected(_self.data.value)) {
          _self.pick();
        }
      })

      this.$on('destroy', function () {
        _self.$unwatch(_self._watchSelected);
      })
    },

    pick: function () {
      if (this.data.disabled) return false;
      var parent = this.getParent();
      if (parent && typeof parent.toggleSelect === 'function') {
        parent.toggleSelect(this);
      }
    },

    getValue: function () {
      return this.data.value;
    },

    isSelected: function () {
      var
        parent = this.getParent(),
        ret = parent &&
          typeof parent.isSelected === 'function' &&
          parent.isSelected(this.data.value);
      return ret;
    },

    isDisabled: function () {
      return !!this.data.disabled;
    },

    getParent: function () {
      return this.$outer || this.$parent;
    }
  });
})