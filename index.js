#!/usr/bin/env node

const fs = require('fs');
const ejs = require('ejs');
const _ = require('underscore');

/* eslint-disable prefer-destructuring */
const argv = require('optimist')
  .usage('Generate documentation from apidoc data.\nUsage: apidoc-markdown2 -p [path] -o [output file]')
  .demand(['path', 'output'])
  .alias({
    path: 'p',
    output: 'o',
    template: 't',
  })
  .describe({
    path: 'Path to generated apidoc output. Where api_data.json & api_project.json resides.',
    output: 'Output file to write.',
    template: 'Path to EJS template file, if not specified default template will be used.',
    prepend: 'Prepend file after TOC.',
  }).argv;
/* eslint-enable prefer-destructuring */

function undef(obj) {
  return obj || '';
}

function mlink(obj) {
  return (obj || '').toLowerCase().replace(/\s/g, '-');
}

function strip(obj) {
  return (obj || '').replace(/<[^>]*>/g, '');
}

function upcase(obj) {
  return (obj || '').toUpperCase();
}

function padding(obj) {
  const parts = (obj || '').split('.');
  const padded = new Array(parts.length - 1).fill('&nbsp;&nbsp;&nbsp;').join('');

  return [padded, parts[parts.length - 1]].join('');
}

const tmplFile = argv.template ? argv.template : `${__dirname}/templates/default.md`;

let apiData = JSON.parse(fs.readFileSync(`${argv.path}/api_data.json`));

const projData = JSON.parse(fs.readFileSync(`${argv.path}/api_project.json`));

const template = ejs.compile(fs.readFileSync(tmplFile).toString());

apiData = _.filter(apiData, entry => entry.type);

const apiByGroup = _.groupBy(apiData, entry => entry.group);

const apiByGroupAndName = {};
Object.keys(apiByGroup).forEach((key) => {
  apiByGroupAndName[key] = _.groupBy(apiByGroup[key], entry => entry.name);
});

function createApiSorter(order) {
  return function sort(name) {
    const idx = order.indexOf(name);
    if (idx === -1) return Infinity;
    return idx;
  };
}

const sorter = createApiSorter(projData.order || []);

const groupOrder = _.sortBy(Object.keys(apiByGroup), sorter);

const nameOrderInGroup = {};
Object.keys(apiByGroupAndName).forEach((group) => {
  nameOrderInGroup[group] = _.sortBy(Object.keys(apiByGroupAndName[group]), sorter);
});

const data = {
  project: projData,
  data: apiByGroupAndName,
  groupOrder,
  nameOrder: nameOrderInGroup,
  filters: {
    undef,
    mlink,
    strip,
    padding,
    upcase,
  },
};

data.prepend = argv.prepend ? fs.readFileSync(argv.prepend).toString() : null;
fs.writeFileSync(argv.output, template(data));
/* eslint-disable no-console */
console.log(`Wrote apidoc-markdown2 template output to: ${argv.output}`);
/* eslint-enable no-console */
