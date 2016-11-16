/*
	MIT License http://www.opensource.org/licenses/mit-license.php
	Author Tobias Koppers @sokra
*/
var SourceNode = require("source-map").SourceNode;
var SourceMapConsumer = require("source-map").SourceMapConsumer;

class Source {
	constructor() {
		this.source = null;
		this.node = null;
		this.listNode = null;
	}

	size() {
		return this.source().length;
	}

	map(options) {
		return null;
	}

	sourceAndMap(options) {
		return {
			source: this.source(),
			map: this.map()
		};
	}

	updateHash(hash) {
		let source = this.source();
		hash.update(source || "");
	}

}

module.exports = Source;
// function Source() {}

// module.exports = Source;

// Source.prototype.source = null;

// Source.prototype.size = function() {
// 	return this.source().length;
// };

// Source.prototype.map = function(options) {
// 	return null;
// };

// Source.prototype.sourceAndMap = function(options) {
// 	return {
// 		source: this.source(),
// 		map: this.map()
// 	};
// };

// Source.prototype.node = null;

// Source.prototype.listNode = null;

// Source.prototype.updateHash = function(hash) {
// 	var source = this.source();
// 	hash.update(source || "");
// };
