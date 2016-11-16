/*
	MIT License http://www.opensource.org/licenses/mit-license.php
	Author Tobias Koppers @sokra
*/
var SourceNode = require("source-map").SourceNode;
var SourceListMap = require("source-list-map").SourceListMap;
var Source = require("./Source");

class ConcatSource extends Source {
	//TODO: Can I args here? I should doublecheck.
	constructor() {
		super();

		this.children = Array.prototype.slice.call(arguments);
	}

	add(item) {
		this.children.push(item);
	}

	source() {
		return this.children.map(item => {
			return typeof item === "string" ? item : item.source();
		}).join("");
	}

	size() {
		return this.children.map(item => {
			return typeof item === "string" ? item.length : item.size();
		}).reduce( (sum, s) => {
			return sum + s;
		}, 0);
	}

	node() {
		let node = new SourceNode(null, null, null, this.children.map( item => {
			return typeof item === "string" ? item : item.node(options);
		}));

		return node;
	}

	listMap(options) {
		let map = new SourceListMap();
		this.children.forEach( item => {
			if (typeof item === "string") {
				map.add(item);
			} else {
				map.add(item.listMap(options));
			}
		});
		return map;
	}

	updateHash(hash) {
		this.children.forEach(item => {
			if (typeof item === "string") {
				hash.update(item);
			} else {
				item.updateHash(hash);
			}
		});
	}

}

module.exports = ConcatSource;
require("./SourceAndMapMixin")(ConcatSource.prototype);
// function ConcatSource() {
// 	Source.call(this);
// 	this.children = Array.prototype.slice.call(arguments);
// }



// ConcatSource.prototype = Object.create(Source.prototype);
// ConcatSource.prototype.constructor = ConcatSource;

// ConcatSource.prototype.add = function(item) {
// 	this.children.push(item);
// };

// ConcatSource.prototype.source = function() {
// 	return this.children.map(function(item) {
// 		return typeof item === "string" ? item : item.source();
// 	}).join("");
// };

// ConcatSource.prototype.size = function() {
// 	return this.children.map(function(item) {
// 		return typeof item === "string" ? item.length : item.size();
// 	}).reduce(function(sum, s) {
// 		return sum + s;
// 	}, 0);
// };


// ConcatSource.prototype.node = function(options) {
// 	var node = new SourceNode(null, null, null, this.children.map(function(item) {
// 		return typeof item === "string" ? item : item.node(options);
// 	}));
// 	return node;
// };

// ConcatSource.prototype.listMap = function(options) {
// 	var map = new SourceListMap();
// 	this.children.forEach(function(item) {
// 		if(typeof item === "string")
// 			map.add(item);
// 		else
// 			map.add(item.listMap(options));
// 	});
// 	return map;
// // };

// ConcatSource.prototype.updateHash = function(hash) {
// 	this.children.forEach(function(item) {
// 		if(typeof item === "string")
// 			hash.update(item);
// 		else
// 			item.updateHash(hash);
// 	});
// };
