// Import the required functions using ES6 import syntax
import { parse } from './vbsparser.js';
import { beautify } from './vbsbeautifier.js';

// Define the vbspretty function
export function vbspretty(options = {}) {
  (function vbspretty_beautify() {
    var tparsed = parse(options);

    (function vbspretty_beautify_options() {
      options.tokens = tparsed.tokens || [];
      options.tokenTypes = tparsed.tokenTypes || [];
      options.level = options.level && /^\d+$/.test(options.level) ? parseInt(options.level) : 0;
      options.indentChar = options.indentChar ? options.indentChar.toString() : '  ';
      options.breakLineChar = options.breakLineChar ? options.breakLineChar.toString() : '\n';
      options.breakOnSeperator = options.breakOnSeperator === true || false;
      options.removeComments = options.removeComments === true || false;
    })();
  })();

  // Return the result of beautifying the options
  return beautify(options);
}
