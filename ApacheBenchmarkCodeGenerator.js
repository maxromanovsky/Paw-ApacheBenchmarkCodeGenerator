(function() {
  //Based on https://github.com/luckymarmot/Paw-cURLCodeGenerator

  var ApacheBenchmarkCodeGenerator = function() {
    var self = this;
    this.default_request_count = 10000;
    this.default_concurrency = 100;

    this.generateCommand = function(request) {
      var command = "# " + request.name + "\n";
      command += "ab -c" + (self.options.concurrency || self.default_concurrency);
      command += " -n" + (self.options.request_count || self.default_request_count);
      command += " -m" + request.method;

      var header_name;
      for (header_name in request.headers) {
          command += ' -H "' + header_name + ": " + request.headers[header_name] + '"';
      }

      command += ' "' + request.url + '"';
      return command;
      /*
      TODO:
      -A auth-username:password
             Supply BASIC Authentication credentials to the server. The user-
             name and password are separated by a single : and  sent  on  the
             wire  base64  encoded.  The string is sent regardless of whether
             the server needs  it  (i.e.,  has  sent  an  401  authentication
             needed).

      -k     Enable  the  HTTP  KeepAlive  feature,  i.e.,  perform  multiple
              requests within one HTTP session. Default is no KeepAlive.
      */
    }

    this.generate = function(context, requests, options) {
      var commands;
      for (option in options) {
      console.log(option + "=" + options[option]);
      }

      self.options = (options || {}).inputs || {};
      commands = requests.map(function(request) {
        return self.generateCommand(request);
      });
      return commands.join('\n\n') + '\n';
    }
  }

  ApacheBenchmarkCodeGenerator.identifier = "com.maxromanovsky.PawExtensions.ApacheBenchmarkCodeGenerator";
  ApacheBenchmarkCodeGenerator.title = "ApacheBench";
  ApacheBenchmarkCodeGenerator.fileExtension = "sh";
  ApacheBenchmarkCodeGenerator.languageHighlighter = "bash";
  ApacheBenchmarkCodeGenerator.inputs = [
    InputField("request_count", "Number of requests", "Number", {
      persisted: true,
      defaultValue: this.default_request_count,
      float: false,
      minValue: 1
    }),
    InputField("concurrency", "Concurrency", "Number", {
      persisted: true,
      defaultValue: this.default_concurrency,
      float: false,
      minValue: 1
    })
  ];

  registerCodeGenerator(ApacheBenchmarkCodeGenerator);
}).call(this);
