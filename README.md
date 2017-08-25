# Paw-ApacheBenchmarkCodeGenerator
This is a Paw Extension that generates Apache Benchmark command line code.

# Current limitations

1. Basic Authentication via `-A` is not supported, however auth header is added to the command line (most likely it'll work fine, but not using the proper CLI argument).
1. KeepAlive support not implemented
1. Although all HTTP methods are passed to the AB, request body is not. AB requires a path to the file with the request body, so temporary file has to be created for that purpose.
1. Default concurrency & request counts can be changed in the export dialog window only, but that's a Paw limitation.
1. No values are escaped, they're just blindly inserted between quotes.
1. Code is dirty, shame on me!

# AB help

https://httpd.apache.org/docs/2.4/programs/ab.html
