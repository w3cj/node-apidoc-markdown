# apidoc-markdown3

>NOTE: forked and updated vulnerable ejs to latest version (filters are no longer supported)

Generate API documentation in markdown from [apidoc](https://github.com/apidoc/apidoc) data.

## Installation

	npm install apidoc-markdown3

## Usage

	Usage: apidoc-markdown3 -p [path] -o [output file]

	Options:
	  --path, -p      Path to generated apidoc output. Where api_data.json & api_project.json resides.  [required]
	  --output, -o    Output file to write.                                                             [required]
	  --template, -t  Path to EJS template file, if not specified default template will be used.
	  --prepend       Prepend file after TOC.

## Examples

Generate from included example data

	apidoc-markdown3 -p examples -o examples/example.md


[View generated example](https://github.com/softdevstory/node-apidoc-markdown/blob/master/examples/example.md)

# Why apidoc-markdown3

apidoc-markdown is not maintained for long time. New tags of apidoc are not supported. This version is applied pull request for supporting new tags.