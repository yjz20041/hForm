define([
  'regular!./dropSelect.html',
  './select.js',
  './dropOptions.js',
  './dropValue.js'
], function(template, Select) {
  return Select.extend({
    name: 'Form.DropSelect',
    template: template,

    data: {
      className: 'm-select-value-large'
    },

    config: function (data) {
      this.supr(data);
      var _self = this;
      this.$on('change', function () {
        _self._selectedBody = _self._selectedOptions[0] && _self._selectedOptions[0].body;
        _self.hideDrop();
      });
    },

    click: function () {
      this.$emit('click');
    },

    /**
     * clear the selected options
     * @return {None}
     */
    clearSelectedOption: function(){
      this.supr();
      delete this._selectedBody;
    }

  });
});