define([

], function () {
  return {
    _$getBrowser: function () {
      // Useragent RegExp
      var 
        rwebkit = /(webkit)[ \/]([\w.]+)/,
        ropera = /(opera)(?:.*version)?[ \/]([\w.]+)/,
        rmsie = /(msie) ([\w.]+)/,
        rmozilla = /(mozilla)(?:.*? rv:([\w.]+))?/;
      function uaMatch (ua) {
        ua = ua.toLowerCase();

        var match = rwebkit.exec( ua ) ||
                ropera.exec( ua ) ||
                rmsie.exec( ua ) ||
                ua.indexOf("compatible") < 0 && rmozilla.exec( ua ) ||
                [];

        return { browser: match[1] || "", version: match[2] || "0" };
      }

      var userAgent = window.navigator.userAgent;
      return uaMatch(userAgent);
    }
  }
})
