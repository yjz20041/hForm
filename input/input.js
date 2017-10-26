define([
  'regular!./input.html',
  '../verifier/verifier.js',
  '../util.js'
], function (template, Verifier, u) {
  var dom = Regular.dom;

  var Input = Verifier.extend({
    name: 'Form.Input',
    template: template,
    data: {
      defaultClassName: 'm-input',
      type: 'text',
      placeholder: '',
      value: '',
      useClean: true,
      _isPlaceholder: false
    },

    config: function () {
      this.supr();
      if(this.data.value) {
        this._showClean = true;
      } else {
        this._showClean = false;
      }
      // 日期格式不启用清除按钮，样式不兼容
      if (this.data.type === 'date') {
        this.data.useClean = false;
      }
    },

    init: function () {
      this.supr();
      var _self = this;
      var
        browser = u._$getBrowser();
      if (browser.browser == 'msie' && parseInt(browser.version) < 10){
        _self.placeholder();
      }
      if (browser.browser !== 'msie' && this.data.type === 'password') {
        this.$refs.input.type = 'text';
      }
    },

    clean: function () {
      this.data.value = '';
      this._showClean = false;
      this._value = '';
      this.$emit('input', this.data.value);
    },

    blur: function (evt) {
      this._focus = false;
      this.$emit('blur');
    },

    focus: function (evt) {
      this._focus = true;
      var
        browser = u._$getBrowser();
      if (browser.browser !== 'msie' && this.data.type === 'password') {
        evt.target.type = 'password';
      }
      this.$emit('focus');
    },

    change: function () {
      if(this._value !== this.data.value) {
        this._value = this.data.value;
        this.$emit('input', this.data.value);
      }
      this.$emit('change');
    },

    focusPlaceholder: function () {
      this._removePlaceHolder();
    },

    input: function (event) {
      this.data.value = event.target.value;
      if (this.data.value) {
        this._showClean = true;
      } else {
        this._showClean = false;
      }
      this._value = this.data.value;
      this.$emit('input', this.data.value);
      if (event.which !== 16) {
        this.$emit('inputExceptShift', this.data.value);
      }
    },
    placeholder: function () {
      var _self = this;
      this.$on('blur', function() {
        _self._setPlaceHolder();
      });
      this._placeHolderWatch = this.$watch('value', function (nextValue, prevValue) {
        if(!nextValue && prevValue) {
          _self._setPlaceHolder();
        }
      });
      this.$on('$destory', function () {
        this.$unwatch(this._placeHolderWatch);
      })
      _self._setPlaceHolder();
    },

    _setPlaceHolder: function () {
      if (!!this.data.value) return;
      this.$update('_isPlaceholder', true);
      try {
        if (this.$refs.placeholder) {
          this.$refs.placeholder.focus();
        }
      } catch (e) {}
    },

    _removePlaceHolder: function () {
      var _self = this;
      if(this.data._isPlaceholder) {
        this.$update('_isPlaceholder', false);
        setTimeout(function () {
          _self.$refs.input.focus();
          _self.focus();
        }, 0);
      }
    },

    _showCleanBtn: function () {
      return this.data.useClean && this._showClean ?'<i class="icomoon icon-clean" on-mousedown={this.clean()}></i>' : '';
    },

    getValue: function () {
      return this._isPlaceholder? '' : this.data.value || '';
    }
  });

  return Input;
});