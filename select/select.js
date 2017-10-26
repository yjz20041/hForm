define([
  'regular!./select.html',
  '../verifier/verifier.js',
  './option.js',
  './connectCheckbox.js'
], function(template, Verifier) {
  var dom = Regular.dom;
  return Verifier.extend({
    name: 'Form.Select',
    template: template,
    data: {
      multi: false,
      canRemoveNotMulit: false
    },

    config: function (data) {
      this._selectedOptions = [];
    },

    init: function () {
      this.supr();
      var _self = this;
      var body = document.body;
      this.bodyClick = function(event) {
        var target = (event.target && event.target.nodeType !== 1 ) ?
          event.target.parentNode :
          event.target;
        if(_self.$refs && _self.$refs.group && !_self.isParent(target, _self.$refs.group)) {
          _self.hideDrop();
        }
      }

      dom.on(body, 'click', this.bodyClick);

      this.$on('$destroy', function () {
        dom.off(body, 'click', this.bodyClick);
      })
    },

    isParent: function (target, parent, limit) {
      limit = limit || document.body;
      if(target === parent) {
        return true;
      } else if(target !== limit && target.parentNode) {
        return this.isParent(target.parentNode, parent, limit)
      }
    },

    select: function (target) {
      if(!this.isSelected(target)) {
        this.addSelectedOption(target);
        this.$emit('change', this.getValue());
      }
    },

    toggleSelect: function (target) {
      if(this.isSelected(target)) {
        this.removeSelectedOption(target);
      } else {
        this.addSelectedOption(target);
      }
      this.$emit('change', this.getValue());
    },

    removeSelectedOption: function (target) {
      if(this.data.multi || this.data.canRemoveNotMulit) {
        var index = this.getOptionIndex(target);
        if(index >= 0) {
          this._selectedOptions.splice(index, 1);
        }
      }
    },

    addSelectedOption: function (target) {
      var targetValue = this.getOptionValue(target);
      var targetBody = this.getOptionBody(target);
      var targetOption = {
        value: targetValue,
        body: targetBody
      };

      if(this.data.multi) {
        this._selectedOptions.push(targetOption);
      } else {
        this._selectedOptions = [targetOption];
      }
    },

    /**
     * clear the selected options
     * @return {None}
     */
    clearSelectedOption: function(){
      this._selectedOptions = [];
    },

    isSelected: function (target) {
      return this.getOptionIndex(target) >=0;
    },

    getOptionIndex: function (target) {
      var targetValue = this.getOptionValue(target);
      var i, len;
      for(i = 0, len = this._selectedOptions.length; i < len; i++) {
        if(this.getOptionValue(this._selectedOptions[i]) === targetValue) {
          return i;
        }
      }
      return -1;
    },

    toggleDrop: function () {
      if(this.dropOptions && this.dropOptions.toggleDrop) {
        this.dropOptions.toggleDrop();
      }
    },

    hideDrop: function () {
      if(this.dropOptions && this.dropOptions.hideDrop) {
        this.dropOptions.hideDrop();
      }
    },

    getOptionValue: function (target) {
      if (typeof target === 'undefined') {
        return target;
      } else if (typeof target === 'number' || typeof target === 'string') {
        return target;
      } else if (typeof target.getValue === 'function') {
        return target.getValue()
      } else if (typeof target.value !== 'undefined') {
        return target.value;
      } else {
        return target;
      }
    },

    getOptionBody: function (target) {
      return target.$body;
    },

    getValue: function () {
      var values = [];
      var i, len;
      for(i = 0, len = this._selectedOptions.length; i < len; i++) {
        values.push(this.getOptionValue(this._selectedOptions[i]))
      }
      return values;
    }
  });
})