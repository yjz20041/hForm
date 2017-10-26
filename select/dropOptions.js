define([
  'regular!./dropOptions.html'
], function(template) {
  return Regular.extend({
    name: 'Form.Select.DropOptions',
    template: template,

    init: function () {
      // 向父组件注册drop
      var parent = this.getParent();
      if(parent) {
        parent.dropOptions = this;
      }
    },

    getParent: function () {
      return this.$outer || this.$parent;
    },

    toggleSelect: function (target) {
      var parent = this.getParent();
      if(parent && typeof parent.toggleSelect === 'function') {
        return parent.toggleSelect(target);
      }
    },

    isSelected: function (target) {
      var parent = this.getParent();
      if(parent && typeof parent.isSelected === 'function') {
        return parent.isSelected(target);
      }
    },

    toggleDrop: function () {
      this._showDrop = !this._showDrop;
      this.$update();
    },

    hideDrop: function () {
      this._showDrop = false;
      this.$update();
    },
  });
})