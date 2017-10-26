define([
  './group/group.js',
  './input/input.js',
  './password/password.js',
  './checkbox/checkbox.js',
  './select/select.js',
  './select/dropSelect.js',
  './textarea/textarea.js',
  './verifier/verifier.js'
], function (Group, Input, Password, Checkbox, Select, DropSelect, TextArea, Verifier) {
  return {
    Group: Group,
    Input: Input,
    Password: Password,
    Checkbox: Checkbox,
    Select: Select,
    DropSelect: DropSelect,
    TextArea: TextArea,
    Verifier: Verifier
  };
})