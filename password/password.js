define([
  'regular!./password.html',
  '../input/input.js'
], function (template, Input) {
  var Password = Input.extend({
    name: 'Form.Password',
    template: template,
    _showSwitchType: true,
    data: {
      defaultClassName: 'm-input',
      useClean: true,
      type: 'password'
    },

    config: function (data) {
      this._switchStatus = data.type === 'password' ? 'close' : 'open';
    },

    switchType: function () {
      if(this.data.type === 'password') {
        this.data.type = 'text';
        this._switchStatus = 'open';
      } else {
        this.data.type = 'password';
        this._switchStatus = 'close';
      }
    }
  });

  return Password;
});