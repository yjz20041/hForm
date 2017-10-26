define([
  'regular!./textarea.html',
  '../verifier/verifier.js',
  '../util.js'
], function (template, Verifier, u) {
  var Input = Verifier.extend({
    name: 'Form.TextArea',
    template: template,
    data: {
      defaultClassName: 'm-textarea',
      placeholder: '',
      value: '',
      showRemainingLength: true
    },

    config: function () {
      this.supr();
      this._value = this.data.value || '';
    },

    init: function () {
      this.supr();
    },

    clean: function () {
      this._showClean = false;
      this._value = '';
      this.$emit('input', this.data.value);
    },

    blur: function () {
      this._focus = false;
      this.$emit('blur');
    },

    focus: function () {
      this._focus = true;
      this.$emit('focus');
    },

    change: function () {
      if (this._value !== this.data.value) {
        this._value = this.data.value;
        this.$emit('input', this.data.value);
      }
      this.$emit('change');
    },

    input: function (event) {
      this.data.value = event.target.value;
      this._value = this.data.value;
      this.$emit('input', this.data.value);
    },

    getValue: function () {
      return this._value;
    },

    _getRemainingLength: function () {
      return this.data.maxlength - this._value.length;
    },

    _hasFooter: function () {
      return this.data.showRemainingLength && this.data.maxlength;
    }
  });

  return Input;
});