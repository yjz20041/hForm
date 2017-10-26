define([
  'regular!./checkbox.html',
  '../verifier/verifier.js'
], function (template, Verifier) {
  return Verifier.extend({
    name: 'Form.Checkbox',
    template: template,
    data: {
      checked: false,
      disabled: false,
      className: '',
      defaultClassName: 'm-checkbox-group'
    },

    config: function () {
      // TODO:
      var parent = this.getParent();
      if (
        parent.proxyCheckbox &&
        typeof parent.proxyIsChecked === 'function' &&
        typeof parent.proxyIsDisabled === 'function'
      ) {
        this._useProxy = true;
        this.isChecked = function () {
          return parent.proxyIsChecked();
        }

        this.isDisabled = function () {
          return parent.proxyIsDisabled();
        }
      }
    },

    init: function () {
      this.supr();
      this.$emit('change', this.isChecked());
    },

    isChecked: function () {
      return !!this.data.checked;
    },

    isDisabled: function () {
      return !!this.data.disabled;
    },

    switchCheckHandle: function () {
      if (!this._useProxy) {
        this.switchCheck();
      }
    },

    switchCheck: function () {
      if (!this.isDisabled()) {
        this.data.checked = !this.isChecked();
        this.$emit('change', this.data.checked);
      }
    },

    check: function (targetStatus) {
      if (
        !this.isDisabled() &&
        this.data.checked !== targetStatus
      ) {
        this.data.checked = targetStatus;
        this.$emit('change', this.data.checked);
      }
    },

    getValue: function () {
      return !!this.data.checked;
    },

    getParent: function () {
      return this.$outer || this.$parent;
    }
  })
});
