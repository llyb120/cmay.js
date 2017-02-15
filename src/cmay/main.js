require('core-js/fn/object/assign');
require('core-js/fn/object/define-property');
require('core-js/fn/object/create');
require('core-js/fn/object/get-prototype-of');
require('core-js/fn/object/get-own-property-descriptor');
require('core-js/fn/array/for-each');
require('core-js/fn/array/map');
require('core-js/fn/string/trim');
require('core-js/fn/string/repeat');
require('core-js/fn/array/index-of')

require('./Cmay.lite.js');
require("./plugin.url.js");
require('./filter-default.js');


Cmay.bootstrap();

module.exports = Cmay;

