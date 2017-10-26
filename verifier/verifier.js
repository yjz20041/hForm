define([
  'regular!./verifier.html'
], function (template) {
  var Verifier = Regular.extend({
    name: 'Form.Verifier',
    template: template,
    data: {
      defaultVerifyTrigger: 'change'
    },
    _defaultPatterns: {
      require: function (data) {
        return !!data
          && (Object.prototype.toString.call(data) !== "[object Array]" || data.length > 0);
      }
    },

    init: function () {
      var _self = this;
      if(this.data.verifyRules) {
        this._rulesMap = this._createRulesMap(this.data.verifyRules);
        this._bindAutoVerify(this._rulesMap);
      }
    },

    _bindAutoVerify: function (rulesMap) {
      var _self = this,
        key;
      for(key in rulesMap) {
        this.$on(key, (function(key) {
          return function () {
            _self.verify({rules: rulesMap[key], callback: _self.data.verifyCallback, key: key});
          }
        })(key))
      }
    },

    _forEach: function (arr, fn) {
      var i = 0,
        len = arr.length;
      for(; i < len; i++) {
        fn(arr[i], i);
      }
    },

    _trim: function (str) {
       return str.replace(/^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g, '');
    },

    _createRulesMap: function (rules) {
      var _self = this,
        map = {},
        defaultTrigger = this.data.defaultTrigger;
      this._forEach(rules, function (rule) {
        var trigger = rule.trigger || defaultTrigger;
        trigger = trigger.split(',');
        _self._forEach(trigger, function(v) {
          v = _self._trim(v);
          (!map[v]) && (map[v] = []);
          map[v].push(rule);
        });
      });
      return map;
    },

    _checkRule: function (rule, data, callback) {
      var pattern = this._getPattern(rule.pattern);
      if(pattern instanceof RegExp) {
        return callback(pattern.test(data));
      } else if(typeof pattern === 'function') {
        var r = pattern(data);
        if(typeof r === 'function') {
          r(callback);
        } else {
          callback(r);
        }
      } else {
        callback(true);
      }
    },

    _getPattern: function (pattern) {
      if(typeof pattern === 'string' && this._defaultPatterns[pattern]) {
        return this._defaultPatterns[pattern];
      } else {
        return pattern;
      }
    },

    verify: function (options, i) {
      i = i || 0;
      var _self = this;
      var rules = options.rules || this.data.verifyRules;
      var name = options.name || this.data.verifyName;
      var data = options.data || this.getValue();
      var callback = options.callback;
      var key = options.key;
      if(!rules || !rules[i]) {
        return callback(
          {
            success: true,
            key: key,
            data: data
          },
          name
        );
      }
      // add in 2017/07/27
      // disabled the rule when verifyAll
      if (key === 'verifyAll' && rules[i].disabledWhenVerifyAll === true) {
        _self.verify(options, i + 1);
        return;
      }

      this._checkRule(rules[i], data, function (r) {
        if(typeof r === 'string') {
          callback(
            {
              success: false,
              error: {message: r},
              key: key,
              data: data
            },
            name
          );
        } else if(!r) {
          // 验证不通过，跳出验证
          callback(
            {
              success: false,
              error: {message: rules[i].message},
              key: key,
              data: data
            },
            name
          );
        } else if(i === rules.length - 1) {
          // 验证结束，返回正确
          callback(
            {
              success: true,
              key: key,
              data: data
            },
            name
          );
        } else {
          _self.verify(options, i + 1);
        }
      })
    }
  });

  Verifier.mixinResult = function (results) {
    var success = true,
      error = {},
      data = {},
      key, _result;
    for(key in results) {
      _result = results[key];
      if(!_result.success) {
        error[key] = _result.error;
        data[key] = _result.data;
        success = false;
      }
    }
    return {success: success, error: error, data: data};
  };

  Verifier.verifyAll = function (widgets, callback) {
    var _self = this,
      keys = [],
      results = {},
      resultCount = 0,
      i = 0,
      len = widgets.length;

    for(; i < len; i++) {
      if(widgets[i] instanceof Verifier) {
        widgets[i].verify({
          callback: function (verifyResult, verifyName) {
            results[verifyName] = verifyResult;
            resultCount ++;
            if(resultCount === len) {
              callback(Verifier.mixinResult(results));
            }
          },
          key: 'verifyAll'
        });
      } else {
        resultCount ++;
        if(resultCount === len) {
          callback(Verifier.mixinResult(results));
        }
      }
    }
  };

  return Verifier;
});