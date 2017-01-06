/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "/dist/";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	const Vibrant = __webpack_require__(1);
	
	// module.exports = DribbbleToCodepen;
	
	
	class DribbbleToCodepen extends HTMLElement {
	  constructor() {
	    super();
	  }
	}
	
	// Define the new element
	customElements.define('dribbble-to-codepen', DribbbleToCodepen);
	const db2cp = document.querySelector('dribbble-to-codepen');
	const dbShot = db2cp.getAttribute('data-shot');
	let dbContainer = document.createElement('div');
	let dbColorSwatch = document.createElement('div');
	let dbShotWrapper = document.createElement('div');
	let dbImgContainer = document.createElement('div');
	let dbShotInformations = document.createElement('div');
	let dbShotName = document.createElement('h1');
	let dbAuthorName = document.createElement('h3');
	let dbShotUrl = document.createElement('h3');
	let dbImage = document.createElement('img');
	
	const colorSwatchBadgeStyle = `
	  width: 20px;
	  height: 20px;
	  display: inline-block;
	  margin-right: 1em;
	  border: 1px solid #ccc;
	  border-radius: 4px;
	  float:left;
	`;
	
	function setStyle(element, styleBlock, edits) {
	  if (edits) {
	    return element.setAttribute('style', styleBlock.join('') + edits);
	  } else {
	    return element.setAttribute('style', styleBlock.join(''));
	  }
	}
	
	function addClass(element, className) {
	  return element.classList.add(className);
	}
	
	const key = '445956109659ed1b8303540966fd6ad3f1036a740feefddae9880346e8738b05';
	fetch(`https://api.dribbble.com/v1/shots/${ dbShot }?access_token=${ key }`).then(data => data.json()).then(data => {
	  console.log(data);
	  const shotUrl = data.images.hidpi;
	  const shotName = data.title;
	  const authorName = data.user.name;
	  let dbColorsArray = [];
	  let colorsArray = [];
	  let colorsTeplate = ``;
	  dbImage.src = shotUrl;
	
	  dbImage.addEventListener('load', function () {
	    Vibrant.from(dbImage).getPalette(function (err, palette) {
	      if (err) {
	        console.warn(err);
	        return;
	      }
	      const types = ['Vibrant', 'Muted', 'DarkVibrant', 'DarkMuted', 'LightVibrant', 'LightMuted'];
	
	      types.forEach(function (type) {
	        colorsArray.push(`<li data-color="rgb(${ palette[type].rgb.join(',') })" style="width:100%;margin-bottom:1em;font-family:courier;line-height: 1.3"><span style="${ colorSwatchBadgeStyle } background-color: rgb(${ palette[type].rgb.join(',') })"></span>${ Vibrant.Util.rgbToHex(...palette[type].rgb) }</li>`);
	      });
	
	      dbColorSwatch.innerHTML = `<ul style="list-style:none;padding:0;">${ colorsArray.join('') }</ul>`;
	    });
	  });
	
	  dbShotName.textContent = `🏀  ${ shotName }`;
	  dbAuthorName.textContent = `👤 ${ authorName }`;
	});
	
	// Build the dropdown
	
	
	const db2cpStyle = ['display: flex;', 'flex-direction: column;', 'align-items: center;', 'width: 100%;', 'position: fixed;', 'height: 100vh;', 'background: #F3F3F3;', 'transform: translateY(-98vh);', 'border-bottom: 1px solid #ccc;', 'transition: transform 0.3s ease;', 'box-sizing: border-box;', 'color: #666;'];
	
	const db2cpContainerStyle = ['display: flex;', 'flex-wrap: wrap;', 'flex-direction: row;', 'align-items: flex-start;', 'height: 100%;', 'padding: 1em 2em;'];
	
	const db2cpShotWrapperStyle = ['display: flex;', 'flex-wrap: wrap;', 'flex-direction: row;', 'align-items: center;', 'width: 100%;', 'flex: 100%;'];
	
	const db2cpImgStyle = ['display:block;', 'width: 80%;', 'max-width: 600px;', 'border: 1px solid #D7D8E1;', 'box-shadow: 0 10px 50px #888;'];
	
	const db2cpImgContainerStyle = ['flex: 70%;'];
	
	const db2cpColorSwatchStyle = ['flex: 20%;', 'padding-left: 2em;', 'align-self: center;'];
	
	const db2cpShotInformationsStyle = ['flex: 100%;', 'height: 200px;', 'align-self: flex-end;', 'margin-top: 3em;'];
	
	addClass(dbContainer, 'db2cp--container');
	addClass(dbImgContainer, 'db2cp--imgContainer');
	addClass(dbShotWrapper, 'db2cp--shotWrapper');
	addClass(dbShotInformations, 'db2cp--shotInformations');
	addClass(dbColorSwatch, 'db2cp--colorSwatch');
	
	setStyle(db2cp, db2cpStyle, 'font-family: "San Francisco", -apple-system, BlinkMacSystemFont, ".SFNSText-Regular", Roboto, "Helvetica Neue", Helvetica, Arial, sans-serif;');
	setStyle(dbContainer, db2cpContainerStyle, false);
	setStyle(dbShotInformations, db2cpShotInformationsStyle, false);
	setStyle(dbImgContainer, db2cpImgContainerStyle, false);
	setStyle(dbShotWrapper, db2cpShotWrapperStyle, false);
	setStyle(dbColorSwatch, db2cpColorSwatchStyle, false);
	setStyle(dbImage, db2cpImgStyle, false);
	
	dbImage.setAttribute('onerror', 'this.src="data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiPz48c3ZnIHdpZHRoPSIyNzRweCIgaGVpZ2h0PSIyMTZweCIgdmlld0JveD0iMCAwIDI3NCAyMTYiIHZlcnNpb249IjEuMSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayI+ICAgICAgICA8dGl0bGU+R3JvdXA8L3RpdGxlPiAgICA8ZGVzYz5DcmVhdGVkIHdpdGggU2tldGNoLjwvZGVzYz4gICAgPGRlZnM+ICAgICAgICA8cmVjdCBpZD0icGF0aC0xIiB4PSIwIiB5PSIwIiB3aWR0aD0iMjc0IiBoZWlnaHQ9IjIxNiI+PC9yZWN0PiAgICAgICAgPG1hc2sgaWQ9Im1hc2stMiIgbWFza0NvbnRlbnRVbml0cz0idXNlclNwYWNlT25Vc2UiIG1hc2tVbml0cz0ib2JqZWN0Qm91bmRpbmdCb3giIHg9IjAiIHk9IjAiIHdpZHRoPSIyNzQiIGhlaWdodD0iMjE2IiBmaWxsPSJ3aGl0ZSI+ICAgICAgICAgICAgPHVzZSB4bGluazpocmVmPSIjcGF0aC0xIj48L3VzZT4gICAgICAgIDwvbWFzaz4gICAgPC9kZWZzPiAgICA8ZyBpZD0iUGFnZS0xIiBzdHJva2U9Im5vbmUiIHN0cm9rZS13aWR0aD0iMSIgZmlsbD0ibm9uZSIgZmlsbC1ydWxlPSJldmVub2RkIj4gICAgICAgIDxnIGlkPSJHcm91cCI+ICAgICAgICAgICAgPHVzZSBpZD0iUmVjdGFuZ2xlLTIiIHN0cm9rZT0iI0JCQkJCQiIgbWFzaz0idXJsKCNtYXNrLTIpIiBzdHJva2Utd2lkdGg9IjIiIGZpbGw9IiNGM0YzRjMiIHhsaW5rOmhyZWY9IiNwYXRoLTEiPjwvdXNlPiAgICAgICAgICAgIDx0ZXh0IGlkPSJVaC1vaC06KCIgb3BhY2l0eT0iMC4zOTE5ODM2OTYiIGZvbnQtZmFtaWx5PSJIZWx2ZXRpY2FOZXVlLUJvbGQsIEhlbHZldGljYSBOZXVlIiBmb250LXNpemU9IjU1IiBmb250LXdlaWdodD0iYm9sZCIgZmlsbD0iIzAwMDAwMCI+ICAgICAgICAgICAgICAgIDx0c3BhbiB4PSIzNSIgeT0iMTExIj5VaCBvaCA6KDwvdHNwYW4+ICAgICAgICAgICAgPC90ZXh0PiAgICAgICAgICAgIDx0ZXh0IGlkPSJpbWFnZS1ub3QtbG9hZGVkIiBvcGFjaXR5PSIwLjM5MTk4MzY5NiIgZm9udC1mYW1pbHk9IkhlbHZldGljYU5ldWUtQm9sZCwgSGVsdmV0aWNhIE5ldWUiIGZvbnQtc2l6ZT0iMjUiIGZvbnQtd2VpZ2h0PSJib2xkIiBmaWxsPSIjMDAwMDAwIj4gICAgICAgICAgICAgICAgPHRzcGFuIHg9IjM1IiB5PSIxNDciPmltYWdlIG5vdCBsb2FkZWQ8L3RzcGFuPiAgICAgICAgICAgIDwvdGV4dD4gICAgICAgIDwvZz4gICAgPC9nPjwvc3ZnPg=="');
	
	dbShotUrl.innerHTML = `🔗 <a href="https://dribbble.com/shots/${ dbShot }" style="color:inherit;text-decoration: none">${ dbShot }</a>`;
	dbImgContainer.appendChild(dbImage);
	dbShotInformations.appendChild(dbShotName);
	dbShotInformations.appendChild(dbAuthorName);
	dbShotInformations.appendChild(dbShotUrl);
	dbShotWrapper.appendChild(dbImgContainer);
	dbShotWrapper.appendChild(dbColorSwatch);
	dbContainer.appendChild(dbShotInformations);
	dbContainer.appendChild(dbShotWrapper);
	db2cp.appendChild(dbContainer);
	
	db2cp.onmouseover = function () {
	  this.style.webkitTransform = 'translateY(-10vh)';
	  this.style.transform = 'translateY(-10vh)';
	};
	
	db2cp.onmouseleave = function () {
	  this.style.webkitTransform = 'translateY(-98vh)';
	  this.style.transform = 'translateY(-98vh)';
	};
	
	module.exports = DribbbleToCodepen;

/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	var Vibrant;
	
	Vibrant = __webpack_require__(2);
	
	Vibrant.DefaultOpts.Image = __webpack_require__(15);
	
	module.exports = Vibrant;


/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	
	/*
	  From Vibrant.js by Jari Zwarts
	  Ported to node.js by AKFish
	
	  Color algorithm class that finds variations on colors in an image.
	
	  Credits
	  --------
	  Lokesh Dhakar (http://www.lokeshdhakar.com) - Created ColorThief
	  Google - Palette support library in Android
	 */
	var Builder, DefaultGenerator, Filter, Swatch, Vibrant, util,
	  bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };
	
	Swatch = __webpack_require__(3);
	
	util = __webpack_require__(4);
	
	DefaultGenerator = __webpack_require__(5).Default;
	
	Filter = __webpack_require__(7);
	
	module.exports = Vibrant = (function() {
	  Vibrant.DefaultOpts = {
	    colorCount: 64,
	    quality: 5,
	    generator: new DefaultGenerator(),
	    Image: null,
	    Quantizer: __webpack_require__(9).MMCQ,
	    filters: []
	  };
	
	  Vibrant.from = function(src) {
	    return new Builder(src);
	  };
	
	  Vibrant.prototype.quantize = __webpack_require__(14);
	
	  Vibrant.prototype._swatches = [];
	
	  function Vibrant(sourceImage, opts) {
	    this.sourceImage = sourceImage;
	    if (opts == null) {
	      opts = {};
	    }
	    this.swatches = bind(this.swatches, this);
	    this.opts = util.defaults(opts, this.constructor.DefaultOpts);
	    this.generator = this.opts.generator;
	  }
	
	  Vibrant.prototype.getPalette = function(cb) {
	    var image;
	    return image = new this.opts.Image(this.sourceImage, (function(_this) {
	      return function(err, image) {
	        var error, error1;
	        if (err != null) {
	          return cb(err);
	        }
	        try {
	          _this._process(image, _this.opts);
	          return cb(null, _this.swatches());
	        } catch (error1) {
	          error = error1;
	          return cb(error);
	        }
	      };
	    })(this));
	  };
	
	  Vibrant.prototype.getSwatches = function(cb) {
	    return this.getPalette(cb);
	  };
	
	  Vibrant.prototype._process = function(image, opts) {
	    var imageData, quantizer, swatches;
	    image.scaleDown(this.opts);
	    imageData = image.getImageData();
	    quantizer = new this.opts.Quantizer();
	    quantizer.initialize(imageData.data, this.opts);
	    swatches = quantizer.getQuantizedColors();
	    this.generator.generate(swatches);
	    return image.removeCanvas();
	  };
	
	  Vibrant.prototype.swatches = function() {
	    return {
	      Vibrant: this.generator.getVibrantSwatch(),
	      Muted: this.generator.getMutedSwatch(),
	      DarkVibrant: this.generator.getDarkVibrantSwatch(),
	      DarkMuted: this.generator.getDarkMutedSwatch(),
	      LightVibrant: this.generator.getLightVibrantSwatch(),
	      LightMuted: this.generator.getLightMutedSwatch()
	    };
	  };
	
	  return Vibrant;
	
	})();
	
	module.exports.Builder = Builder = (function() {
	  function Builder(src1, opts1) {
	    this.src = src1;
	    this.opts = opts1 != null ? opts1 : {};
	    this.opts.filters = util.clone(Vibrant.DefaultOpts.filters);
	  }
	
	  Builder.prototype.maxColorCount = function(n) {
	    this.opts.colorCount = n;
	    return this;
	  };
	
	  Builder.prototype.maxDimension = function(d) {
	    this.opts.maxDimension = d;
	    return this;
	  };
	
	  Builder.prototype.addFilter = function(f) {
	    if (typeof f === 'function') {
	      this.opts.filters.push(f);
	    }
	    return this;
	  };
	
	  Builder.prototype.removeFilter = function(f) {
	    var i;
	    if ((i = this.opts.filters.indexOf(f)) > 0) {
	      this.opts.filters.splice(i);
	    }
	    return this;
	  };
	
	  Builder.prototype.clearFilters = function() {
	    this.opts.filters = [];
	    return this;
	  };
	
	  Builder.prototype.quality = function(q) {
	    this.opts.quality = q;
	    return this;
	  };
	
	  Builder.prototype.useImage = function(image) {
	    this.opts.Image = image;
	    return this;
	  };
	
	  Builder.prototype.useGenerator = function(generator) {
	    this.opts.generator = generator;
	    return this;
	  };
	
	  Builder.prototype.useQuantizer = function(quantizer) {
	    this.opts.Quantizer = quantizer;
	    return this;
	  };
	
	  Builder.prototype.build = function() {
	    if (this.v == null) {
	      this.v = new Vibrant(this.src, this.opts);
	    }
	    return this.v;
	  };
	
	  Builder.prototype.getSwatches = function(cb) {
	    return this.build().getPalette(cb);
	  };
	
	  Builder.prototype.getPalette = function(cb) {
	    return this.build().getPalette(cb);
	  };
	
	  Builder.prototype.from = function(src) {
	    return new Vibrant(src, this.opts);
	  };
	
	  return Builder;
	
	})();
	
	module.exports.Util = util;
	
	module.exports.Swatch = Swatch;
	
	module.exports.Quantizer = __webpack_require__(9);
	
	module.exports.Generator = __webpack_require__(5);
	
	module.exports.Filter = __webpack_require__(7);


/***/ },
/* 3 */
/***/ function(module, exports, __webpack_require__) {

	var Swatch, util;
	
	util = __webpack_require__(4);
	
	
	/*
	  From Vibrant.js by Jari Zwarts
	  Ported to node.js by AKFish
	
	  Swatch class
	 */
	
	module.exports = Swatch = (function() {
	  Swatch.prototype.hsl = void 0;
	
	  Swatch.prototype.rgb = void 0;
	
	  Swatch.prototype.population = 1;
	
	  Swatch.prototype.yiq = 0;
	
	  function Swatch(rgb, population) {
	    this.rgb = rgb;
	    this.population = population;
	  }
	
	  Swatch.prototype.getHsl = function() {
	    if (!this.hsl) {
	      return this.hsl = util.rgbToHsl(this.rgb[0], this.rgb[1], this.rgb[2]);
	    } else {
	      return this.hsl;
	    }
	  };
	
	  Swatch.prototype.getPopulation = function() {
	    return this.population;
	  };
	
	  Swatch.prototype.getRgb = function() {
	    return this.rgb;
	  };
	
	  Swatch.prototype.getHex = function() {
	    return util.rgbToHex(this.rgb[0], this.rgb[1], this.rgb[2]);
	  };
	
	  Swatch.prototype.getTitleTextColor = function() {
	    this._ensureTextColors();
	    if (this.yiq < 200) {
	      return "#fff";
	    } else {
	      return "#000";
	    }
	  };
	
	  Swatch.prototype.getBodyTextColor = function() {
	    this._ensureTextColors();
	    if (this.yiq < 150) {
	      return "#fff";
	    } else {
	      return "#000";
	    }
	  };
	
	  Swatch.prototype._ensureTextColors = function() {
	    if (!this.yiq) {
	      return this.yiq = (this.rgb[0] * 299 + this.rgb[1] * 587 + this.rgb[2] * 114) / 1000;
	    }
	  };
	
	  return Swatch;
	
	})();


/***/ },
/* 4 */
/***/ function(module, exports) {

	var DELTAE94, RSHIFT, SIGBITS;
	
	DELTAE94 = {
	  NA: 0,
	  PERFECT: 1,
	  CLOSE: 2,
	  GOOD: 10,
	  SIMILAR: 50
	};
	
	SIGBITS = 5;
	
	RSHIFT = 8 - SIGBITS;
	
	module.exports = {
	  clone: function(o) {
	    var _o, key, value;
	    if (typeof o === 'object') {
	      if (Array.isArray(o)) {
	        return o.map((function(_this) {
	          return function(v) {
	            return _this.clone(v);
	          };
	        })(this));
	      } else {
	        _o = {};
	        for (key in o) {
	          value = o[key];
	          _o[key] = this.clone(value);
	        }
	        return _o;
	      }
	    }
	    return o;
	  },
	  defaults: function() {
	    var _o, i, key, len, o, value;
	    o = {};
	    for (i = 0, len = arguments.length; i < len; i++) {
	      _o = arguments[i];
	      for (key in _o) {
	        value = _o[key];
	        if (o[key] == null) {
	          o[key] = this.clone(value);
	        }
	      }
	    }
	    return o;
	  },
	  hexToRgb: function(hex) {
	    var m;
	    m = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
	    if (m != null) {
	      return [m[1], m[2], m[3]].map(function(s) {
	        return parseInt(s, 16);
	      });
	    }
	    return null;
	  },
	  rgbToHex: function(r, g, b) {
	    return "#" + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1, 7);
	  },
	  rgbToHsl: function(r, g, b) {
	    var d, h, l, max, min, s;
	    r /= 255;
	    g /= 255;
	    b /= 255;
	    max = Math.max(r, g, b);
	    min = Math.min(r, g, b);
	    h = void 0;
	    s = void 0;
	    l = (max + min) / 2;
	    if (max === min) {
	      h = s = 0;
	    } else {
	      d = max - min;
	      s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
	      switch (max) {
	        case r:
	          h = (g - b) / d + (g < b ? 6 : 0);
	          break;
	        case g:
	          h = (b - r) / d + 2;
	          break;
	        case b:
	          h = (r - g) / d + 4;
	      }
	      h /= 6;
	    }
	    return [h, s, l];
	  },
	  hslToRgb: function(h, s, l) {
	    var b, g, hue2rgb, p, q, r;
	    r = void 0;
	    g = void 0;
	    b = void 0;
	    hue2rgb = function(p, q, t) {
	      if (t < 0) {
	        t += 1;
	      }
	      if (t > 1) {
	        t -= 1;
	      }
	      if (t < 1 / 6) {
	        return p + (q - p) * 6 * t;
	      }
	      if (t < 1 / 2) {
	        return q;
	      }
	      if (t < 2 / 3) {
	        return p + (q - p) * (2 / 3 - t) * 6;
	      }
	      return p;
	    };
	    if (s === 0) {
	      r = g = b = l;
	    } else {
	      q = l < 0.5 ? l * (1 + s) : l + s - (l * s);
	      p = 2 * l - q;
	      r = hue2rgb(p, q, h + 1 / 3);
	      g = hue2rgb(p, q, h);
	      b = hue2rgb(p, q, h - (1 / 3));
	    }
	    return [r * 255, g * 255, b * 255];
	  },
	  rgbToXyz: function(r, g, b) {
	    var x, y, z;
	    r /= 255;
	    g /= 255;
	    b /= 255;
	    r = r > 0.04045 ? Math.pow((r + 0.005) / 1.055, 2.4) : r / 12.92;
	    g = g > 0.04045 ? Math.pow((g + 0.005) / 1.055, 2.4) : g / 12.92;
	    b = b > 0.04045 ? Math.pow((b + 0.005) / 1.055, 2.4) : b / 12.92;
	    r *= 100;
	    g *= 100;
	    b *= 100;
	    x = r * 0.4124 + g * 0.3576 + b * 0.1805;
	    y = r * 0.2126 + g * 0.7152 + b * 0.0722;
	    z = r * 0.0193 + g * 0.1192 + b * 0.9505;
	    return [x, y, z];
	  },
	  xyzToCIELab: function(x, y, z) {
	    var L, REF_X, REF_Y, REF_Z, a, b;
	    REF_X = 95.047;
	    REF_Y = 100;
	    REF_Z = 108.883;
	    x /= REF_X;
	    y /= REF_Y;
	    z /= REF_Z;
	    x = x > 0.008856 ? Math.pow(x, 1 / 3) : 7.787 * x + 16 / 116;
	    y = y > 0.008856 ? Math.pow(y, 1 / 3) : 7.787 * y + 16 / 116;
	    z = z > 0.008856 ? Math.pow(z, 1 / 3) : 7.787 * z + 16 / 116;
	    L = 116 * y - 16;
	    a = 500 * (x - y);
	    b = 200 * (y - z);
	    return [L, a, b];
	  },
	  rgbToCIELab: function(r, g, b) {
	    var ref, x, y, z;
	    ref = this.rgbToXyz(r, g, b), x = ref[0], y = ref[1], z = ref[2];
	    return this.xyzToCIELab(x, y, z);
	  },
	  deltaE94: function(lab1, lab2) {
	    var L1, L2, WEIGHT_C, WEIGHT_H, WEIGHT_L, a1, a2, b1, b2, dL, da, db, xC1, xC2, xDC, xDE, xDH, xDL, xSC, xSH;
	    WEIGHT_L = 1;
	    WEIGHT_C = 1;
	    WEIGHT_H = 1;
	    L1 = lab1[0], a1 = lab1[1], b1 = lab1[2];
	    L2 = lab2[0], a2 = lab2[1], b2 = lab2[2];
	    dL = L1 - L2;
	    da = a1 - a2;
	    db = b1 - b2;
	    xC1 = Math.sqrt(a1 * a1 + b1 * b1);
	    xC2 = Math.sqrt(a2 * a2 + b2 * b2);
	    xDL = L2 - L1;
	    xDC = xC2 - xC1;
	    xDE = Math.sqrt(dL * dL + da * da + db * db);
	    if (Math.sqrt(xDE) > Math.sqrt(Math.abs(xDL)) + Math.sqrt(Math.abs(xDC))) {
	      xDH = Math.sqrt(xDE * xDE - xDL * xDL - xDC * xDC);
	    } else {
	      xDH = 0;
	    }
	    xSC = 1 + 0.045 * xC1;
	    xSH = 1 + 0.015 * xC1;
	    xDL /= WEIGHT_L;
	    xDC /= WEIGHT_C * xSC;
	    xDH /= WEIGHT_H * xSH;
	    return Math.sqrt(xDL * xDL + xDC * xDC + xDH * xDH);
	  },
	  rgbDiff: function(rgb1, rgb2) {
	    var lab1, lab2;
	    lab1 = this.rgbToCIELab.apply(this, rgb1);
	    lab2 = this.rgbToCIELab.apply(this, rgb2);
	    return this.deltaE94(lab1, lab2);
	  },
	  hexDiff: function(hex1, hex2) {
	    var rgb1, rgb2;
	    rgb1 = this.hexToRgb(hex1);
	    rgb2 = this.hexToRgb(hex2);
	    return this.rgbDiff(rgb1, rgb2);
	  },
	  DELTAE94_DIFF_STATUS: DELTAE94,
	  getColorDiffStatus: function(d) {
	    if (d < DELTAE94.NA) {
	      return "N/A";
	    }
	    if (d <= DELTAE94.PERFECT) {
	      return "Perfect";
	    }
	    if (d <= DELTAE94.CLOSE) {
	      return "Close";
	    }
	    if (d <= DELTAE94.GOOD) {
	      return "Good";
	    }
	    if (d < DELTAE94.SIMILAR) {
	      return "Similar";
	    }
	    return "Wrong";
	  },
	  SIGBITS: SIGBITS,
	  RSHIFT: RSHIFT,
	  getColorIndex: function(r, g, b) {
	    return (r << (2 * SIGBITS)) + (g << SIGBITS) + b;
	  }
	};


/***/ },
/* 5 */
/***/ function(module, exports, __webpack_require__) {

	var Generator;
	
	module.exports = Generator = (function() {
	  function Generator() {}
	
	  Generator.prototype.generate = function(swatches) {};
	
	  Generator.prototype.getVibrantSwatch = function() {};
	
	  Generator.prototype.getLightVibrantSwatch = function() {};
	
	  Generator.prototype.getDarkVibrantSwatch = function() {};
	
	  Generator.prototype.getMutedSwatch = function() {};
	
	  Generator.prototype.getLightMutedSwatch = function() {};
	
	  Generator.prototype.getDarkMutedSwatch = function() {};
	
	  return Generator;
	
	})();
	
	module.exports.Default = __webpack_require__(6);


/***/ },
/* 6 */
/***/ function(module, exports, __webpack_require__) {

	var DefaultGenerator, DefaultOpts, Generator, Swatch, util,
	  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
	  hasProp = {}.hasOwnProperty,
	  slice = [].slice;
	
	Swatch = __webpack_require__(3);
	
	util = __webpack_require__(4);
	
	Generator = __webpack_require__(5);
	
	DefaultOpts = {
	  targetDarkLuma: 0.26,
	  maxDarkLuma: 0.45,
	  minLightLuma: 0.55,
	  targetLightLuma: 0.74,
	  minNormalLuma: 0.3,
	  targetNormalLuma: 0.5,
	  maxNormalLuma: 0.7,
	  targetMutesSaturation: 0.3,
	  maxMutesSaturation: 0.4,
	  targetVibrantSaturation: 1.0,
	  minVibrantSaturation: 0.35,
	  weightSaturation: 3,
	  weightLuma: 6,
	  weightPopulation: 1
	};
	
	module.exports = DefaultGenerator = (function(superClass) {
	  extend(DefaultGenerator, superClass);
	
	  DefaultGenerator.prototype.HighestPopulation = 0;
	
	  function DefaultGenerator(opts) {
	    this.opts = util.defaults(opts, DefaultOpts);
	    this.VibrantSwatch = null;
	    this.LightVibrantSwatch = null;
	    this.DarkVibrantSwatch = null;
	    this.MutedSwatch = null;
	    this.LightMutedSwatch = null;
	    this.DarkMutedSwatch = null;
	  }
	
	  DefaultGenerator.prototype.generate = function(swatches) {
	    this.swatches = swatches;
	    this.maxPopulation = this.findMaxPopulation;
	    this.generateVarationColors();
	    return this.generateEmptySwatches();
	  };
	
	  DefaultGenerator.prototype.getVibrantSwatch = function() {
	    return this.VibrantSwatch;
	  };
	
	  DefaultGenerator.prototype.getLightVibrantSwatch = function() {
	    return this.LightVibrantSwatch;
	  };
	
	  DefaultGenerator.prototype.getDarkVibrantSwatch = function() {
	    return this.DarkVibrantSwatch;
	  };
	
	  DefaultGenerator.prototype.getMutedSwatch = function() {
	    return this.MutedSwatch;
	  };
	
	  DefaultGenerator.prototype.getLightMutedSwatch = function() {
	    return this.LightMutedSwatch;
	  };
	
	  DefaultGenerator.prototype.getDarkMutedSwatch = function() {
	    return this.DarkMutedSwatch;
	  };
	
	  DefaultGenerator.prototype.generateVarationColors = function() {
	    this.VibrantSwatch = this.findColorVariation(this.opts.targetNormalLuma, this.opts.minNormalLuma, this.opts.maxNormalLuma, this.opts.targetVibrantSaturation, this.opts.minVibrantSaturation, 1);
	    this.LightVibrantSwatch = this.findColorVariation(this.opts.targetLightLuma, this.opts.minLightLuma, 1, this.opts.targetVibrantSaturation, this.opts.minVibrantSaturation, 1);
	    this.DarkVibrantSwatch = this.findColorVariation(this.opts.targetDarkLuma, 0, this.opts.maxDarkLuma, this.opts.targetVibrantSaturation, this.opts.minVibrantSaturation, 1);
	    this.MutedSwatch = this.findColorVariation(this.opts.targetNormalLuma, this.opts.minNormalLuma, this.opts.maxNormalLuma, this.opts.targetMutesSaturation, 0, this.opts.maxMutesSaturation);
	    this.LightMutedSwatch = this.findColorVariation(this.opts.targetLightLuma, this.opts.minLightLuma, 1, this.opts.targetMutesSaturation, 0, this.opts.maxMutesSaturation);
	    return this.DarkMutedSwatch = this.findColorVariation(this.opts.targetDarkLuma, 0, this.opts.maxDarkLuma, this.opts.targetMutesSaturation, 0, this.opts.maxMutesSaturation);
	  };
	
	  DefaultGenerator.prototype.generateEmptySwatches = function() {
	    var hsl;
	    if (this.VibrantSwatch === null) {
	      if (this.DarkVibrantSwatch !== null) {
	        hsl = this.DarkVibrantSwatch.getHsl();
	        hsl[2] = this.opts.targetNormalLuma;
	        this.VibrantSwatch = new Swatch(util.hslToRgb(hsl[0], hsl[1], hsl[2]), 0);
	      }
	    }
	    if (this.DarkVibrantSwatch === null) {
	      if (this.VibrantSwatch !== null) {
	        hsl = this.VibrantSwatch.getHsl();
	        hsl[2] = this.opts.targetDarkLuma;
	        return this.DarkVibrantSwatch = new Swatch(util.hslToRgb(hsl[0], hsl[1], hsl[2]), 0);
	      }
	    }
	  };
	
	  DefaultGenerator.prototype.findMaxPopulation = function() {
	    var j, len, population, ref, swatch;
	    population = 0;
	    ref = this.swatches;
	    for (j = 0, len = ref.length; j < len; j++) {
	      swatch = ref[j];
	      population = Math.max(population, swatch.getPopulation());
	    }
	    return population;
	  };
	
	  DefaultGenerator.prototype.findColorVariation = function(targetLuma, minLuma, maxLuma, targetSaturation, minSaturation, maxSaturation) {
	    var j, len, luma, max, maxValue, ref, sat, swatch, value;
	    max = null;
	    maxValue = 0;
	    ref = this.swatches;
	    for (j = 0, len = ref.length; j < len; j++) {
	      swatch = ref[j];
	      sat = swatch.getHsl()[1];
	      luma = swatch.getHsl()[2];
	      if (sat >= minSaturation && sat <= maxSaturation && luma >= minLuma && luma <= maxLuma && !this.isAlreadySelected(swatch)) {
	        value = this.createComparisonValue(sat, targetSaturation, luma, targetLuma, swatch.getPopulation(), this.HighestPopulation);
	        if (max === null || value > maxValue) {
	          max = swatch;
	          maxValue = value;
	        }
	      }
	    }
	    return max;
	  };
	
	  DefaultGenerator.prototype.createComparisonValue = function(saturation, targetSaturation, luma, targetLuma, population, maxPopulation) {
	    return this.weightedMean(this.invertDiff(saturation, targetSaturation), this.opts.weightSaturation, this.invertDiff(luma, targetLuma), this.opts.weightLuma, population / maxPopulation, this.opts.weightPopulation);
	  };
	
	  DefaultGenerator.prototype.invertDiff = function(value, targetValue) {
	    return 1 - Math.abs(value - targetValue);
	  };
	
	  DefaultGenerator.prototype.weightedMean = function() {
	    var i, sum, sumWeight, value, values, weight;
	    values = 1 <= arguments.length ? slice.call(arguments, 0) : [];
	    sum = 0;
	    sumWeight = 0;
	    i = 0;
	    while (i < values.length) {
	      value = values[i];
	      weight = values[i + 1];
	      sum += value * weight;
	      sumWeight += weight;
	      i += 2;
	    }
	    return sum / sumWeight;
	  };
	
	  DefaultGenerator.prototype.isAlreadySelected = function(swatch) {
	    return this.VibrantSwatch === swatch || this.DarkVibrantSwatch === swatch || this.LightVibrantSwatch === swatch || this.MutedSwatch === swatch || this.DarkMutedSwatch === swatch || this.LightMutedSwatch === swatch;
	  };
	
	  return DefaultGenerator;
	
	})(Generator);


/***/ },
/* 7 */
/***/ function(module, exports, __webpack_require__) {

	module.exports.Default = __webpack_require__(8);


/***/ },
/* 8 */
/***/ function(module, exports) {

	module.exports = function(r, g, b, a) {
	  return a >= 125 && !(r > 250 && g > 250 && b > 250);
	};


/***/ },
/* 9 */
/***/ function(module, exports, __webpack_require__) {

	var Quantizer;
	
	module.exports = Quantizer = (function() {
	  function Quantizer() {}
	
	  Quantizer.prototype.initialize = function(pixels, opts) {};
	
	  Quantizer.prototype.getQuantizedColors = function() {};
	
	  return Quantizer;
	
	})();
	
	module.exports.MMCQ = __webpack_require__(10);


/***/ },
/* 10 */
/***/ function(module, exports, __webpack_require__) {

	var MMCQ, MMCQImpl, Quantizer, Swatch,
	  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
	  hasProp = {}.hasOwnProperty;
	
	Swatch = __webpack_require__(3);
	
	Quantizer = __webpack_require__(9);
	
	MMCQImpl = __webpack_require__(11);
	
	module.exports = MMCQ = (function(superClass) {
	  extend(MMCQ, superClass);
	
	  function MMCQ() {
	    return MMCQ.__super__.constructor.apply(this, arguments);
	  }
	
	  MMCQ.prototype.initialize = function(pixels, opts) {
	    var mmcq;
	    this.opts = opts;
	    mmcq = new MMCQImpl();
	    return this.swatches = mmcq.quantize(pixels, this.opts);
	  };
	
	  MMCQ.prototype.getQuantizedColors = function() {
	    return this.swatches;
	  };
	
	  return MMCQ;
	
	})(Quantizer);


/***/ },
/* 11 */
/***/ function(module, exports, __webpack_require__) {

	var MMCQ, PQueue, RSHIFT, SIGBITS, Swatch, VBox, getColorIndex, ref, util;
	
	ref = util = __webpack_require__(4), getColorIndex = ref.getColorIndex, SIGBITS = ref.SIGBITS, RSHIFT = ref.RSHIFT;
	
	Swatch = __webpack_require__(3);
	
	VBox = __webpack_require__(12);
	
	PQueue = __webpack_require__(13);
	
	module.exports = MMCQ = (function() {
	  MMCQ.DefaultOpts = {
	    maxIterations: 1000,
	    fractByPopulations: 0.75
	  };
	
	  function MMCQ(opts) {
	    this.opts = util.defaults(opts, this.constructor.DefaultOpts);
	  }
	
	  MMCQ.prototype.quantize = function(pixels, opts) {
	    var color, colorCount, hist, pq, pq2, shouldIgnore, swatches, v, vbox;
	    if (pixels.length === 0 || opts.colorCount < 2 || opts.colorCount > 256) {
	      throw new Error("Wrong MMCQ parameters");
	    }
	    shouldIgnore = function() {
	      return false;
	    };
	    if (Array.isArray(opts.filters) && opts.filters.length > 0) {
	      shouldIgnore = function(r, g, b, a) {
	        var f, i, len, ref1;
	        ref1 = opts.filters;
	        for (i = 0, len = ref1.length; i < len; i++) {
	          f = ref1[i];
	          if (!f(r, g, b, a)) {
	            return true;
	          }
	        }
	        return false;
	      };
	    }
	    vbox = VBox.build(pixels, shouldIgnore);
	    hist = vbox.hist;
	    colorCount = Object.keys(hist).length;
	    pq = new PQueue(function(a, b) {
	      return a.count() - b.count();
	    });
	    pq.push(vbox);
	    this._splitBoxes(pq, this.opts.fractByPopulations * opts.colorCount);
	    pq2 = new PQueue(function(a, b) {
	      return a.count() * a.volume() - b.count() * b.volume();
	    });
	    pq2.contents = pq.contents;
	    this._splitBoxes(pq2, opts.colorCount - pq2.size());
	    swatches = [];
	    this.vboxes = [];
	    while (pq2.size()) {
	      v = pq2.pop();
	      color = v.avg();
	      if (!(typeof shouldIgnore === "function" ? shouldIgnore(color[0], color[1], color[2], 255) : void 0)) {
	        this.vboxes.push(v);
	        swatches.push(new Swatch(color, v.count()));
	      }
	    }
	    return swatches;
	  };
	
	  MMCQ.prototype._splitBoxes = function(pq, target) {
	    var colorCount, iteration, maxIterations, ref1, vbox, vbox1, vbox2;
	    colorCount = 1;
	    iteration = 0;
	    maxIterations = this.opts.maxIterations;
	    while (iteration < maxIterations) {
	      iteration++;
	      vbox = pq.pop();
	      if (!vbox.count()) {
	        continue;
	      }
	      ref1 = vbox.split(), vbox1 = ref1[0], vbox2 = ref1[1];
	      pq.push(vbox1);
	      if (vbox2) {
	        pq.push(vbox2);
	        colorCount++;
	      }
	      if (colorCount >= target || iteration > maxIterations) {
	        return;
	      }
	    }
	  };
	
	  return MMCQ;
	
	})();


/***/ },
/* 12 */
/***/ function(module, exports, __webpack_require__) {

	var RSHIFT, SIGBITS, VBox, getColorIndex, ref, util;
	
	ref = util = __webpack_require__(4), getColorIndex = ref.getColorIndex, SIGBITS = ref.SIGBITS, RSHIFT = ref.RSHIFT;
	
	module.exports = VBox = (function() {
	  VBox.build = function(pixels, shouldIgnore) {
	    var a, b, bmax, bmin, g, gmax, gmin, hist, hn, i, index, n, offset, r, rmax, rmin;
	    hn = 1 << (3 * SIGBITS);
	    hist = new Uint32Array(hn);
	    rmax = gmax = bmax = 0;
	    rmin = gmin = bmin = Number.MAX_VALUE;
	    n = pixels.length / 4;
	    i = 0;
	    while (i < n) {
	      offset = i * 4;
	      i++;
	      r = pixels[offset + 0];
	      g = pixels[offset + 1];
	      b = pixels[offset + 2];
	      a = pixels[offset + 3];
	      if (shouldIgnore(r, g, b, a)) {
	        continue;
	      }
	      r = r >> RSHIFT;
	      g = g >> RSHIFT;
	      b = b >> RSHIFT;
	      index = getColorIndex(r, g, b);
	      hist[index] += 1;
	      if (r > rmax) {
	        rmax = r;
	      }
	      if (r < rmin) {
	        rmin = r;
	      }
	      if (g > gmax) {
	        gmax = g;
	      }
	      if (g < gmin) {
	        gmin = g;
	      }
	      if (b > bmax) {
	        bmax = b;
	      }
	      if (b < bmin) {
	        bmin = b;
	      }
	    }
	    return new VBox(rmin, rmax, gmin, gmax, bmin, bmax, hist);
	  };
	
	  function VBox(r1, r2, g1, g2, b1, b2, hist1) {
	    this.r1 = r1;
	    this.r2 = r2;
	    this.g1 = g1;
	    this.g2 = g2;
	    this.b1 = b1;
	    this.b2 = b2;
	    this.hist = hist1;
	  }
	
	  VBox.prototype.invalidate = function() {
	    delete this._count;
	    delete this._avg;
	    return delete this._volume;
	  };
	
	  VBox.prototype.volume = function() {
	    if (this._volume == null) {
	      this._volume = (this.r2 - this.r1 + 1) * (this.g2 - this.g1 + 1) * (this.b2 - this.b1 + 1);
	    }
	    return this._volume;
	  };
	
	  VBox.prototype.count = function() {
	    var c, hist;
	    if (this._count == null) {
	      hist = this.hist;
	      c = 0;
	      
	      for (var r = this.r1; r <= this.r2; r++) {
	        for (var g = this.g1; g <= this.g2; g++) {
	          for (var b = this.b1; b <= this.b2; b++) {
	            var index = getColorIndex(r, g, b);
	            c += hist[index];
	          }
	        }
	      }
	      ;
	      this._count = c;
	    }
	    return this._count;
	  };
	
	  VBox.prototype.clone = function() {
	    return new VBox(this.r1, this.r2, this.g1, this.g2, this.b1, this.b2, this.hist);
	  };
	
	  VBox.prototype.avg = function() {
	    var bsum, gsum, hist, mult, ntot, rsum;
	    if (this._avg == null) {
	      hist = this.hist;
	      ntot = 0;
	      mult = 1 << (8 - SIGBITS);
	      rsum = gsum = bsum = 0;
	      
	      for (var r = this.r1; r <= this.r2; r++) {
	        for (var g = this.g1; g <= this.g2; g++) {
	          for (var b = this.b1; b <= this.b2; b++) {
	            var index = getColorIndex(r, g, b);
	            var h = hist[index];
	            ntot += h;
	            rsum += (h * (r + 0.5) * mult);
	            gsum += (h * (g + 0.5) * mult);
	            bsum += (h * (b + 0.5) * mult);
	          }
	        }
	      }
	      ;
	      if (ntot) {
	        this._avg = [~~(rsum / ntot), ~~(gsum / ntot), ~~(bsum / ntot)];
	      } else {
	        this._avg = [~~(mult * (this.r1 + this.r2 + 1) / 2), ~~(mult * (this.g1 + this.g2 + 1) / 2), ~~(mult * (this.b1 + this.b2 + 1) / 2)];
	      }
	    }
	    return this._avg;
	  };
	
	  VBox.prototype.split = function() {
	    var accSum, bw, d, doCut, gw, hist, i, j, maxd, maxw, ref1, reverseSum, rw, splitPoint, sum, total, vbox;
	    hist = this.hist;
	    if (!this.count()) {
	      return null;
	    }
	    if (this.count() === 1) {
	      return [this.clone()];
	    }
	    rw = this.r2 - this.r1 + 1;
	    gw = this.g2 - this.g1 + 1;
	    bw = this.b2 - this.b1 + 1;
	    maxw = Math.max(rw, gw, bw);
	    accSum = null;
	    sum = total = 0;
	    maxd = null;
	    switch (maxw) {
	      case rw:
	        maxd = 'r';
	        accSum = new Uint32Array(this.r2 + 1);
	        
	        for (var r = this.r1; r <= this.r2; r++) {
	          sum = 0
	          for (var g = this.g1; g <= this.g2; g++) {
	            for (var b = this.b1; b <= this.b2; b++) {
	              var index = getColorIndex(r, g, b);
	              sum += hist[index];
	            }
	          }
	          total += sum;
	          accSum[r] = total;
	        }
	        ;
	        break;
	      case gw:
	        maxd = 'g';
	        accSum = new Uint32Array(this.g2 + 1);
	        
	        for (var g = this.g1; g <= this.g2; g++) {
	          sum = 0
	          for (var r = this.r1; r <= this.r2; r++) {
	            for (var b = this.b1; b <= this.b2; b++) {
	              var index = getColorIndex(r, g, b);
	              sum += hist[index];
	            }
	          }
	          total += sum;
	          accSum[g] = total;
	        }
	        ;
	        break;
	      case bw:
	        maxd = 'b';
	        accSum = new Uint32Array(this.b2 + 1);
	        
	        for (var b = this.b1; b <= this.b2; b++) {
	          sum = 0
	          for (var r = this.r1; r <= this.r2; r++) {
	            for (var g = this.g1; g <= this.g2; g++) {
	              var index = getColorIndex(r, g, b);
	              sum += hist[index];
	            }
	          }
	          total += sum;
	          accSum[b] = total;
	        }
	        ;
	    }
	    splitPoint = -1;
	    reverseSum = new Uint32Array(accSum.length);
	    for (i = j = 0, ref1 = accSum.length - 1; 0 <= ref1 ? j <= ref1 : j >= ref1; i = 0 <= ref1 ? ++j : --j) {
	      d = accSum[i];
	      if (splitPoint < 0 && d > total / 2) {
	        splitPoint = i;
	      }
	      reverseSum[i] = total - d;
	    }
	    vbox = this;
	    doCut = function(d) {
	      var c2, d1, d2, dim1, dim2, left, right, vbox1, vbox2;
	      dim1 = d + "1";
	      dim2 = d + "2";
	      d1 = vbox[dim1];
	      d2 = vbox[dim2];
	      vbox1 = vbox.clone();
	      vbox2 = vbox.clone();
	      left = splitPoint - d1;
	      right = d2 - splitPoint;
	      if (left <= right) {
	        d2 = Math.min(d2 - 1, ~~(splitPoint + right / 2));
	        d2 = Math.max(0, d2);
	      } else {
	        d2 = Math.max(d1, ~~(splitPoint - 1 - left / 2));
	        d2 = Math.min(vbox[dim2], d2);
	      }
	      while (!accSum[d2]) {
	        d2++;
	      }
	      c2 = reverseSum[d2];
	      while (!c2 && accSum[d2 - 1]) {
	        c2 = reverseSum[--d2];
	      }
	      vbox1[dim2] = d2;
	      vbox2[dim1] = d2 + 1;
	      return [vbox1, vbox2];
	    };
	    return doCut(maxd);
	  };
	
	  VBox.prototype.contains = function(p) {
	    var b, g, r;
	    r = p[0] >> RSHIFT;
	    g = p[1] >> RSHIFT;
	    b = p[2] >> RSHIFT;
	    return r >= this.r1 && r <= this.r2 && g >= this.g1 && g <= this.g2 && b >= this.b1 && b <= this.b2;
	  };
	
	  return VBox;
	
	})();


/***/ },
/* 13 */
/***/ function(module, exports) {

	var PQueue;
	
	module.exports = PQueue = (function() {
	  function PQueue(comparator) {
	    this.comparator = comparator;
	    this.contents = [];
	    this.sorted = false;
	  }
	
	  PQueue.prototype._sort = function() {
	    this.contents.sort(this.comparator);
	    return this.sorted = true;
	  };
	
	  PQueue.prototype.push = function(o) {
	    this.contents.push(o);
	    return this.sorted = false;
	  };
	
	  PQueue.prototype.peek = function(index) {
	    if (!this.sorted) {
	      this._sort();
	    }
	    if (index == null) {
	      index = this.contents.length - 1;
	    }
	    return this.contents[index];
	  };
	
	  PQueue.prototype.pop = function() {
	    if (!this.sorted) {
	      this._sort();
	    }
	    return this.contents.pop();
	  };
	
	  PQueue.prototype.size = function() {
	    return this.contents.length;
	  };
	
	  PQueue.prototype.map = function(f) {
	    if (!this.sorted) {
	      this._sort();
	    }
	    return this.contents.map(f);
	  };
	
	  return PQueue;
	
	})();


/***/ },
/* 14 */
/***/ function(module, exports) {

	/*
	 * quantize.js Copyright 2008 Nick Rabinowitz
	 * Ported to node.js by Olivier Lesnicki
	 * Licensed under the MIT license: http://www.opensource.org/licenses/mit-license.php
	 */
	
	// fill out a couple protovis dependencies
	/*
	 * Block below copied from Protovis: http://mbostock.github.com/protovis/
	 * Copyright 2010 Stanford Visualization Group
	 * Licensed under the BSD License: http://www.opensource.org/licenses/bsd-license.php
	 */
	if (!pv) {
	    var pv = {
	        map: function(array, f) {
	            var o = {};
	            return f ? array.map(function(d, i) {
	                o.index = i;
	                return f.call(o, d);
	            }) : array.slice();
	        },
	        naturalOrder: function(a, b) {
	            return (a < b) ? -1 : ((a > b) ? 1 : 0);
	        },
	        sum: function(array, f) {
	            var o = {};
	            return array.reduce(f ? function(p, d, i) {
	                o.index = i;
	                return p + f.call(o, d);
	            } : function(p, d) {
	                return p + d;
	            }, 0);
	        },
	        max: function(array, f) {
	            return Math.max.apply(null, f ? pv.map(array, f) : array);
	        }
	    }
	}
	
	/**
	 * Basic Javascript port of the MMCQ (modified median cut quantization)
	 * algorithm from the Leptonica library (http://www.leptonica.com/).
	 * Returns a color map you can use to map original pixels to the reduced
	 * palette. Still a work in progress.
	 * 
	 * @author Nick Rabinowitz
	 * @example
	 
	// array of pixels as [R,G,B] arrays
	var myPixels = [[190,197,190], [202,204,200], [207,214,210], [211,214,211], [205,207,207]
	                // etc
	                ];
	var maxColors = 4;
	 
	var cmap = MMCQ.quantize(myPixels, maxColors);
	var newPalette = cmap.palette();
	var newPixels = myPixels.map(function(p) { 
	    return cmap.map(p); 
	});
	 
	 */
	var MMCQ = (function() {
	    // private constants
	    var sigbits = 5,
	        rshift = 8 - sigbits,
	        maxIterations = 1000,
	        fractByPopulations = 0.75;
	
	    // get reduced-space color index for a pixel
	
	    function getColorIndex(r, g, b) {
	        return (r << (2 * sigbits)) + (g << sigbits) + b;
	    }
	
	    // Simple priority queue
	
	    function PQueue(comparator) {
	        var contents = [],
	            sorted = false;
	
	        function sort() {
	            contents.sort(comparator);
	            sorted = true;
	        }
	
	        return {
	            push: function(o) {
	                contents.push(o);
	                sorted = false;
	            },
	            peek: function(index) {
	                if (!sorted) sort();
	                if (index === undefined) index = contents.length - 1;
	                return contents[index];
	            },
	            pop: function() {
	                if (!sorted) sort();
	                return contents.pop();
	            },
	            size: function() {
	                return contents.length;
	            },
	            map: function(f) {
	                return contents.map(f);
	            },
	            debug: function() {
	                if (!sorted) sort();
	                return contents;
	            }
	        };
	    }
	
	    // 3d color space box
	
	    function VBox(r1, r2, g1, g2, b1, b2, histo) {
	        var vbox = this;
	        vbox.r1 = r1;
	        vbox.r2 = r2;
	        vbox.g1 = g1;
	        vbox.g2 = g2;
	        vbox.b1 = b1;
	        vbox.b2 = b2;
	        vbox.histo = histo;
	    }
	    VBox.prototype = {
	        volume: function(force) {
	            var vbox = this;
	            if (!vbox._volume || force) {
	                vbox._volume = ((vbox.r2 - vbox.r1 + 1) * (vbox.g2 - vbox.g1 + 1) * (vbox.b2 - vbox.b1 + 1));
	            }
	            return vbox._volume;
	        },
	        count: function(force) {
	            var vbox = this,
	                histo = vbox.histo;
	            if (!vbox._count_set || force) {
	                var npix = 0,
	                    i, j, k, index;
	                for (i = vbox.r1; i <= vbox.r2; i++) {
	                    for (j = vbox.g1; j <= vbox.g2; j++) {
	                        for (k = vbox.b1; k <= vbox.b2; k++) {
	                            index = getColorIndex(i, j, k);
	                            npix += (histo[index] || 0);
	                        }
	                    }
	                }
	                vbox._count = npix;
	                vbox._count_set = true;
	            }
	            return vbox._count;
	        },
	        copy: function() {
	            var vbox = this;
	            return new VBox(vbox.r1, vbox.r2, vbox.g1, vbox.g2, vbox.b1, vbox.b2, vbox.histo);
	        },
	        avg: function(force) {
	            var vbox = this,
	                histo = vbox.histo;
	            if (!vbox._avg || force) {
	                var ntot = 0,
	                    mult = 1 << (8 - sigbits),
	                    rsum = 0,
	                    gsum = 0,
	                    bsum = 0,
	                    hval,
	                    i, j, k, histoindex;
	                for (i = vbox.r1; i <= vbox.r2; i++) {
	                    for (j = vbox.g1; j <= vbox.g2; j++) {
	                        for (k = vbox.b1; k <= vbox.b2; k++) {
	                            histoindex = getColorIndex(i, j, k);
	                            hval = histo[histoindex] || 0;
	                            ntot += hval;
	                            rsum += (hval * (i + 0.5) * mult);
	                            gsum += (hval * (j + 0.5) * mult);
	                            bsum += (hval * (k + 0.5) * mult);
	                        }
	                    }
	                }
	                if (ntot) {
	                    vbox._avg = [~~(rsum / ntot), ~~ (gsum / ntot), ~~ (bsum / ntot)];
	                } else {
	                    //console.log('empty box');
	                    vbox._avg = [~~(mult * (vbox.r1 + vbox.r2 + 1) / 2), ~~ (mult * (vbox.g1 + vbox.g2 + 1) / 2), ~~ (mult * (vbox.b1 + vbox.b2 + 1) / 2)];
	                }
	            }
	            return vbox._avg;
	        },
	        contains: function(pixel) {
	            var vbox = this,
	                rval = pixel[0] >> rshift;
	            gval = pixel[1] >> rshift;
	            bval = pixel[2] >> rshift;
	            return (rval >= vbox.r1 && rval <= vbox.r2 &&
	                gval >= vbox.g1 && gval <= vbox.g2 &&
	                bval >= vbox.b1 && bval <= vbox.b2);
	        }
	    };
	
	    // Color map
	
	    function CMap() {
	        this.vboxes = new PQueue(function(a, b) {
	            return pv.naturalOrder(
	                a.vbox.count() * a.vbox.volume(),
	                b.vbox.count() * b.vbox.volume()
	            )
	        });;
	    }
	    CMap.prototype = {
	        push: function(vbox) {
	            this.vboxes.push({
	                vbox: vbox,
	                color: vbox.avg()
	            });
	        },
	        palette: function() {
	            return this.vboxes.map(function(vb) {
	                return vb.color
	            });
	        },
	        size: function() {
	            return this.vboxes.size();
	        },
	        map: function(color) {
	            var vboxes = this.vboxes;
	            for (var i = 0; i < vboxes.size(); i++) {
	                if (vboxes.peek(i).vbox.contains(color)) {
	                    return vboxes.peek(i).color;
	                }
	            }
	            return this.nearest(color);
	        },
	        nearest: function(color) {
	            var vboxes = this.vboxes,
	                d1, d2, pColor;
	            for (var i = 0; i < vboxes.size(); i++) {
	                d2 = Math.sqrt(
	                    Math.pow(color[0] - vboxes.peek(i).color[0], 2) +
	                    Math.pow(color[1] - vboxes.peek(i).color[1], 2) +
	                    Math.pow(color[2] - vboxes.peek(i).color[2], 2)
	                );
	                if (d2 < d1 || d1 === undefined) {
	                    d1 = d2;
	                    pColor = vboxes.peek(i).color;
	                }
	            }
	            return pColor;
	        },
	        forcebw: function() {
	            // XXX: won't  work yet
	            var vboxes = this.vboxes;
	            vboxes.sort(function(a, b) {
	                return pv.naturalOrder(pv.sum(a.color), pv.sum(b.color))
	            });
	
	            // force darkest color to black if everything < 5
	            var lowest = vboxes[0].color;
	            if (lowest[0] < 5 && lowest[1] < 5 && lowest[2] < 5)
	                vboxes[0].color = [0, 0, 0];
	
	            // force lightest color to white if everything > 251
	            var idx = vboxes.length - 1,
	                highest = vboxes[idx].color;
	            if (highest[0] > 251 && highest[1] > 251 && highest[2] > 251)
	                vboxes[idx].color = [255, 255, 255];
	        }
	    };
	
	    // histo (1-d array, giving the number of pixels in
	    // each quantized region of color space), or null on error
	
	    function getHisto(pixels) {
	        var histosize = 1 << (3 * sigbits),
	            histo = new Array(histosize),
	            index, rval, gval, bval;
	        pixels.forEach(function(pixel) {
	            rval = pixel[0] >> rshift;
	            gval = pixel[1] >> rshift;
	            bval = pixel[2] >> rshift;
	            index = getColorIndex(rval, gval, bval);
	            histo[index] = (histo[index] || 0) + 1;
	        });
	        return histo;
	    }
	
	    function vboxFromPixels(pixels, histo) {
	        var rmin = 1000000,
	            rmax = 0,
	            gmin = 1000000,
	            gmax = 0,
	            bmin = 1000000,
	            bmax = 0,
	            rval, gval, bval;
	        // find min/max
	        pixels.forEach(function(pixel) {
	            rval = pixel[0] >> rshift;
	            gval = pixel[1] >> rshift;
	            bval = pixel[2] >> rshift;
	            if (rval < rmin) rmin = rval;
	            else if (rval > rmax) rmax = rval;
	            if (gval < gmin) gmin = gval;
	            else if (gval > gmax) gmax = gval;
	            if (bval < bmin) bmin = bval;
	            else if (bval > bmax) bmax = bval;
	        });
	        return new VBox(rmin, rmax, gmin, gmax, bmin, bmax, histo);
	    }
	
	    function medianCutApply(histo, vbox) {
	        if (!vbox.count()) return;
	
	        var rw = vbox.r2 - vbox.r1 + 1,
	            gw = vbox.g2 - vbox.g1 + 1,
	            bw = vbox.b2 - vbox.b1 + 1,
	            maxw = pv.max([rw, gw, bw]);
	        // only one pixel, no split
	        if (vbox.count() == 1) {
	            return [vbox.copy()]
	        }
	        /* Find the partial sum arrays along the selected axis. */
	        var total = 0,
	            partialsum = [],
	            lookaheadsum = [],
	            i, j, k, sum, index;
	        if (maxw == rw) {
	            for (i = vbox.r1; i <= vbox.r2; i++) {
	                sum = 0;
	                for (j = vbox.g1; j <= vbox.g2; j++) {
	                    for (k = vbox.b1; k <= vbox.b2; k++) {
	                        index = getColorIndex(i, j, k);
	                        sum += (histo[index] || 0);
	                    }
	                }
	                total += sum;
	                partialsum[i] = total;
	            }
	        } else if (maxw == gw) {
	            for (i = vbox.g1; i <= vbox.g2; i++) {
	                sum = 0;
	                for (j = vbox.r1; j <= vbox.r2; j++) {
	                    for (k = vbox.b1; k <= vbox.b2; k++) {
	                        index = getColorIndex(j, i, k);
	                        sum += (histo[index] || 0);
	                    }
	                }
	                total += sum;
	                partialsum[i] = total;
	            }
	        } else { /* maxw == bw */
	            for (i = vbox.b1; i <= vbox.b2; i++) {
	                sum = 0;
	                for (j = vbox.r1; j <= vbox.r2; j++) {
	                    for (k = vbox.g1; k <= vbox.g2; k++) {
	                        index = getColorIndex(j, k, i);
	                        sum += (histo[index] || 0);
	                    }
	                }
	                total += sum;
	                partialsum[i] = total;
	            }
	        }
	        partialsum.forEach(function(d, i) {
	            lookaheadsum[i] = total - d
	        });
	
	        function doCut(color) {
	            var dim1 = color + '1',
	                dim2 = color + '2',
	                left, right, vbox1, vbox2, d2, count2 = 0;
	            for (i = vbox[dim1]; i <= vbox[dim2]; i++) {
	                if (partialsum[i] > total / 2) {
	                    vbox1 = vbox.copy();
	                    vbox2 = vbox.copy();
	                    left = i - vbox[dim1];
	                    right = vbox[dim2] - i;
	                    if (left <= right)
	                        d2 = Math.min(vbox[dim2] - 1, ~~ (i + right / 2));
	                    else d2 = Math.max(vbox[dim1], ~~ (i - 1 - left / 2));
	                    // avoid 0-count boxes
	                    while (!partialsum[d2]) d2++;
	                    count2 = lookaheadsum[d2];
	                    while (!count2 && partialsum[d2 - 1]) count2 = lookaheadsum[--d2];
	                    // set dimensions
	                    vbox1[dim2] = d2;
	                    vbox2[dim1] = vbox1[dim2] + 1;
	                    // console.log('vbox counts:', vbox.count(), vbox1.count(), vbox2.count());
	                    return [vbox1, vbox2];
	                }
	            }
	
	        }
	        // determine the cut planes
	        return maxw == rw ? doCut('r') :
	            maxw == gw ? doCut('g') :
	            doCut('b');
	    }
	
	    function quantize(pixels, maxcolors) {
	        // short-circuit
	        if (!pixels.length || maxcolors < 2 || maxcolors > 256) {
	            // console.log('wrong number of maxcolors');
	            return false;
	        }
	
	        // XXX: check color content and convert to grayscale if insufficient
	
	        var histo = getHisto(pixels),
	            histosize = 1 << (3 * sigbits);
	
	        // check that we aren't below maxcolors already
	        var nColors = 0;
	        histo.forEach(function() {
	            nColors++
	        });
	        if (nColors <= maxcolors) {
	            // XXX: generate the new colors from the histo and return
	        }
	
	        // get the beginning vbox from the colors
	        var vbox = vboxFromPixels(pixels, histo),
	            pq = new PQueue(function(a, b) {
	                return pv.naturalOrder(a.count(), b.count())
	            });
	        pq.push(vbox);
	
	        // inner function to do the iteration
	
	        function iter(lh, target) {
	            var ncolors = 1,
	                niters = 0,
	                vbox;
	            while (niters < maxIterations) {
	                vbox = lh.pop();
	                if (!vbox.count()) { /* just put it back */
	                    lh.push(vbox);
	                    niters++;
	                    continue;
	                }
	                // do the cut
	                var vboxes = medianCutApply(histo, vbox),
	                    vbox1 = vboxes[0],
	                    vbox2 = vboxes[1];
	
	                if (!vbox1) {
	                    // console.log("vbox1 not defined; shouldn't happen!");
	                    return;
	                }
	                lh.push(vbox1);
	                if (vbox2) { /* vbox2 can be null */
	                    lh.push(vbox2);
	                    ncolors++;
	                }
	                if (ncolors >= target) return;
	                if (niters++ > maxIterations) {
	                    // console.log("infinite loop; perhaps too few pixels!");
	                    return;
	                }
	            }
	        }
	
	        // first set of colors, sorted by population
	        iter(pq, fractByPopulations * maxcolors);
	        // console.log(pq.size(), pq.debug().length, pq.debug().slice());
	
	        // Re-sort by the product of pixel occupancy times the size in color space.
	        var pq2 = new PQueue(function(a, b) {
	            return pv.naturalOrder(a.count() * a.volume(), b.count() * b.volume())
	        });
	        while (pq.size()) {
	            pq2.push(pq.pop());
	        }
	
	        // next set - generate the median cuts using the (npix * vol) sorting.
	        iter(pq2, maxcolors - pq2.size());
	
	        // calculate the actual colors
	        var cmap = new CMap();
	        while (pq2.size()) {
	            cmap.push(pq2.pop());
	        }
	
	        return cmap;
	    }
	
	    return {
	        quantize: quantize
	    }
	})();
	
	module.exports = MMCQ.quantize


/***/ },
/* 15 */
/***/ function(module, exports, __webpack_require__) {

	var BrowserImage, Image, Url, isRelativeUrl, isSameOrigin,
	  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
	  hasProp = {}.hasOwnProperty;
	
	Image = __webpack_require__(16);
	
	Url = __webpack_require__(17);
	
	isRelativeUrl = function(url) {
	  var u;
	  u = Url.parse(url);
	  return u.protocol === null && u.host === null && u.port === null;
	};
	
	isSameOrigin = function(a, b) {
	  var ua, ub;
	  ua = Url.parse(a);
	  ub = Url.parse(b);
	  return ua.protocol === ub.protocol && ua.hostname === ub.hostname && ua.port === ub.port;
	};
	
	module.exports = BrowserImage = (function(superClass) {
	  extend(BrowserImage, superClass);
	
	  function BrowserImage(path, cb) {
	    if (typeof path === 'object' && path instanceof HTMLImageElement) {
	      this.img = path;
	      path = this.img.src;
	    } else {
	      this.img = document.createElement('img');
	      this.img.src = path;
	    }
	    if (!isRelativeUrl(path) && !isSameOrigin(window.location.href, path)) {
	      this.img.crossOrigin = 'anonymous';
	    }
	    this.img.onload = (function(_this) {
	      return function() {
	        _this._initCanvas();
	        return typeof cb === "function" ? cb(null, _this) : void 0;
	      };
	    })(this);
	    if (this.img.complete) {
	      this.img.onload();
	    }
	    this.img.onerror = (function(_this) {
	      return function(e) {
	        var err;
	        err = new Error("Fail to load image: " + path);
	        err.raw = e;
	        return typeof cb === "function" ? cb(err) : void 0;
	      };
	    })(this);
	  }
	
	  BrowserImage.prototype._initCanvas = function() {
	    this.canvas = document.createElement('canvas');
	    this.context = this.canvas.getContext('2d');
	    document.body.appendChild(this.canvas);
	    this.width = this.canvas.width = this.img.width;
	    this.height = this.canvas.height = this.img.height;
	    return this.context.drawImage(this.img, 0, 0, this.width, this.height);
	  };
	
	  BrowserImage.prototype.clear = function() {
	    return this.context.clearRect(0, 0, this.width, this.height);
	  };
	
	  BrowserImage.prototype.getWidth = function() {
	    return this.width;
	  };
	
	  BrowserImage.prototype.getHeight = function() {
	    return this.height;
	  };
	
	  BrowserImage.prototype.resize = function(w, h, r) {
	    this.width = this.canvas.width = w;
	    this.height = this.canvas.height = h;
	    this.context.scale(r, r);
	    return this.context.drawImage(this.img, 0, 0);
	  };
	
	  BrowserImage.prototype.update = function(imageData) {
	    return this.context.putImageData(imageData, 0, 0);
	  };
	
	  BrowserImage.prototype.getPixelCount = function() {
	    return this.width * this.height;
	  };
	
	  BrowserImage.prototype.getImageData = function() {
	    return this.context.getImageData(0, 0, this.width, this.height);
	  };
	
	  BrowserImage.prototype.removeCanvas = function() {
	    return this.canvas.parentNode.removeChild(this.canvas);
	  };
	
	  return BrowserImage;
	
	})(Image);


/***/ },
/* 16 */
/***/ function(module, exports) {

	var Image;
	
	module.exports = Image = (function() {
	  function Image() {}
	
	  Image.prototype.clear = function() {};
	
	  Image.prototype.update = function(imageData) {};
	
	  Image.prototype.getWidth = function() {};
	
	  Image.prototype.getHeight = function() {};
	
	  Image.prototype.scaleDown = function(opts) {
	    var height, maxSide, ratio, width;
	    width = this.getWidth();
	    height = this.getHeight();
	    ratio = 1;
	    if (opts.maxDimension != null) {
	      maxSide = Math.max(width, height);
	      if (maxSide > opts.maxDimension) {
	        ratio = opts.maxDimension / maxSide;
	      }
	    } else {
	      ratio = 1 / opts.quality;
	    }
	    if (ratio < 1) {
	      return this.resize(width * ratio, height * ratio, ratio);
	    }
	  };
	
	  Image.prototype.resize = function(w, h, r) {};
	
	  Image.prototype.getPixelCount = function() {};
	
	  Image.prototype.getImageData = function() {};
	
	  Image.prototype.removeCanvas = function() {};
	
	  return Image;
	
	})();


/***/ },
/* 17 */
/***/ function(module, exports, __webpack_require__) {

	// Copyright Joyent, Inc. and other Node contributors.
	//
	// Permission is hereby granted, free of charge, to any person obtaining a
	// copy of this software and associated documentation files (the
	// "Software"), to deal in the Software without restriction, including
	// without limitation the rights to use, copy, modify, merge, publish,
	// distribute, sublicense, and/or sell copies of the Software, and to permit
	// persons to whom the Software is furnished to do so, subject to the
	// following conditions:
	//
	// The above copyright notice and this permission notice shall be included
	// in all copies or substantial portions of the Software.
	//
	// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
	// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
	// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
	// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
	// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
	// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
	// USE OR OTHER DEALINGS IN THE SOFTWARE.
	
	'use strict';
	
	var punycode = __webpack_require__(18);
	var util = __webpack_require__(20);
	
	exports.parse = urlParse;
	exports.resolve = urlResolve;
	exports.resolveObject = urlResolveObject;
	exports.format = urlFormat;
	
	exports.Url = Url;
	
	function Url() {
	  this.protocol = null;
	  this.slashes = null;
	  this.auth = null;
	  this.host = null;
	  this.port = null;
	  this.hostname = null;
	  this.hash = null;
	  this.search = null;
	  this.query = null;
	  this.pathname = null;
	  this.path = null;
	  this.href = null;
	}
	
	// Reference: RFC 3986, RFC 1808, RFC 2396
	
	// define these here so at least they only have to be
	// compiled once on the first module load.
	var protocolPattern = /^([a-z0-9.+-]+:)/i,
	    portPattern = /:[0-9]*$/,
	
	    // Special case for a simple path URL
	    simplePathPattern = /^(\/\/?(?!\/)[^\?\s]*)(\?[^\s]*)?$/,
	
	    // RFC 2396: characters reserved for delimiting URLs.
	    // We actually just auto-escape these.
	    delims = ['<', '>', '"', '`', ' ', '\r', '\n', '\t'],
	
	    // RFC 2396: characters not allowed for various reasons.
	    unwise = ['{', '}', '|', '\\', '^', '`'].concat(delims),
	
	    // Allowed by RFCs, but cause of XSS attacks.  Always escape these.
	    autoEscape = ['\''].concat(unwise),
	    // Characters that are never ever allowed in a hostname.
	    // Note that any invalid chars are also handled, but these
	    // are the ones that are *expected* to be seen, so we fast-path
	    // them.
	    nonHostChars = ['%', '/', '?', ';', '#'].concat(autoEscape),
	    hostEndingChars = ['/', '?', '#'],
	    hostnameMaxLen = 255,
	    hostnamePartPattern = /^[+a-z0-9A-Z_-]{0,63}$/,
	    hostnamePartStart = /^([+a-z0-9A-Z_-]{0,63})(.*)$/,
	    // protocols that can allow "unsafe" and "unwise" chars.
	    unsafeProtocol = {
	      'javascript': true,
	      'javascript:': true
	    },
	    // protocols that never have a hostname.
	    hostlessProtocol = {
	      'javascript': true,
	      'javascript:': true
	    },
	    // protocols that always contain a // bit.
	    slashedProtocol = {
	      'http': true,
	      'https': true,
	      'ftp': true,
	      'gopher': true,
	      'file': true,
	      'http:': true,
	      'https:': true,
	      'ftp:': true,
	      'gopher:': true,
	      'file:': true
	    },
	    querystring = __webpack_require__(21);
	
	function urlParse(url, parseQueryString, slashesDenoteHost) {
	  if (url && util.isObject(url) && url instanceof Url) return url;
	
	  var u = new Url;
	  u.parse(url, parseQueryString, slashesDenoteHost);
	  return u;
	}
	
	Url.prototype.parse = function(url, parseQueryString, slashesDenoteHost) {
	  if (!util.isString(url)) {
	    throw new TypeError("Parameter 'url' must be a string, not " + typeof url);
	  }
	
	  // Copy chrome, IE, opera backslash-handling behavior.
	  // Back slashes before the query string get converted to forward slashes
	  // See: https://code.google.com/p/chromium/issues/detail?id=25916
	  var queryIndex = url.indexOf('?'),
	      splitter =
	          (queryIndex !== -1 && queryIndex < url.indexOf('#')) ? '?' : '#',
	      uSplit = url.split(splitter),
	      slashRegex = /\\/g;
	  uSplit[0] = uSplit[0].replace(slashRegex, '/');
	  url = uSplit.join(splitter);
	
	  var rest = url;
	
	  // trim before proceeding.
	  // This is to support parse stuff like "  http://foo.com  \n"
	  rest = rest.trim();
	
	  if (!slashesDenoteHost && url.split('#').length === 1) {
	    // Try fast path regexp
	    var simplePath = simplePathPattern.exec(rest);
	    if (simplePath) {
	      this.path = rest;
	      this.href = rest;
	      this.pathname = simplePath[1];
	      if (simplePath[2]) {
	        this.search = simplePath[2];
	        if (parseQueryString) {
	          this.query = querystring.parse(this.search.substr(1));
	        } else {
	          this.query = this.search.substr(1);
	        }
	      } else if (parseQueryString) {
	        this.search = '';
	        this.query = {};
	      }
	      return this;
	    }
	  }
	
	  var proto = protocolPattern.exec(rest);
	  if (proto) {
	    proto = proto[0];
	    var lowerProto = proto.toLowerCase();
	    this.protocol = lowerProto;
	    rest = rest.substr(proto.length);
	  }
	
	  // figure out if it's got a host
	  // user@server is *always* interpreted as a hostname, and url
	  // resolution will treat //foo/bar as host=foo,path=bar because that's
	  // how the browser resolves relative URLs.
	  if (slashesDenoteHost || proto || rest.match(/^\/\/[^@\/]+@[^@\/]+/)) {
	    var slashes = rest.substr(0, 2) === '//';
	    if (slashes && !(proto && hostlessProtocol[proto])) {
	      rest = rest.substr(2);
	      this.slashes = true;
	    }
	  }
	
	  if (!hostlessProtocol[proto] &&
	      (slashes || (proto && !slashedProtocol[proto]))) {
	
	    // there's a hostname.
	    // the first instance of /, ?, ;, or # ends the host.
	    //
	    // If there is an @ in the hostname, then non-host chars *are* allowed
	    // to the left of the last @ sign, unless some host-ending character
	    // comes *before* the @-sign.
	    // URLs are obnoxious.
	    //
	    // ex:
	    // http://a@b@c/ => user:a@b host:c
	    // http://a@b?@c => user:a host:c path:/?@c
	
	    // v0.12 TODO(isaacs): This is not quite how Chrome does things.
	    // Review our test case against browsers more comprehensively.
	
	    // find the first instance of any hostEndingChars
	    var hostEnd = -1;
	    for (var i = 0; i < hostEndingChars.length; i++) {
	      var hec = rest.indexOf(hostEndingChars[i]);
	      if (hec !== -1 && (hostEnd === -1 || hec < hostEnd))
	        hostEnd = hec;
	    }
	
	    // at this point, either we have an explicit point where the
	    // auth portion cannot go past, or the last @ char is the decider.
	    var auth, atSign;
	    if (hostEnd === -1) {
	      // atSign can be anywhere.
	      atSign = rest.lastIndexOf('@');
	    } else {
	      // atSign must be in auth portion.
	      // http://a@b/c@d => host:b auth:a path:/c@d
	      atSign = rest.lastIndexOf('@', hostEnd);
	    }
	
	    // Now we have a portion which is definitely the auth.
	    // Pull that off.
	    if (atSign !== -1) {
	      auth = rest.slice(0, atSign);
	      rest = rest.slice(atSign + 1);
	      this.auth = decodeURIComponent(auth);
	    }
	
	    // the host is the remaining to the left of the first non-host char
	    hostEnd = -1;
	    for (var i = 0; i < nonHostChars.length; i++) {
	      var hec = rest.indexOf(nonHostChars[i]);
	      if (hec !== -1 && (hostEnd === -1 || hec < hostEnd))
	        hostEnd = hec;
	    }
	    // if we still have not hit it, then the entire thing is a host.
	    if (hostEnd === -1)
	      hostEnd = rest.length;
	
	    this.host = rest.slice(0, hostEnd);
	    rest = rest.slice(hostEnd);
	
	    // pull out port.
	    this.parseHost();
	
	    // we've indicated that there is a hostname,
	    // so even if it's empty, it has to be present.
	    this.hostname = this.hostname || '';
	
	    // if hostname begins with [ and ends with ]
	    // assume that it's an IPv6 address.
	    var ipv6Hostname = this.hostname[0] === '[' &&
	        this.hostname[this.hostname.length - 1] === ']';
	
	    // validate a little.
	    if (!ipv6Hostname) {
	      var hostparts = this.hostname.split(/\./);
	      for (var i = 0, l = hostparts.length; i < l; i++) {
	        var part = hostparts[i];
	        if (!part) continue;
	        if (!part.match(hostnamePartPattern)) {
	          var newpart = '';
	          for (var j = 0, k = part.length; j < k; j++) {
	            if (part.charCodeAt(j) > 127) {
	              // we replace non-ASCII char with a temporary placeholder
	              // we need this to make sure size of hostname is not
	              // broken by replacing non-ASCII by nothing
	              newpart += 'x';
	            } else {
	              newpart += part[j];
	            }
	          }
	          // we test again with ASCII char only
	          if (!newpart.match(hostnamePartPattern)) {
	            var validParts = hostparts.slice(0, i);
	            var notHost = hostparts.slice(i + 1);
	            var bit = part.match(hostnamePartStart);
	            if (bit) {
	              validParts.push(bit[1]);
	              notHost.unshift(bit[2]);
	            }
	            if (notHost.length) {
	              rest = '/' + notHost.join('.') + rest;
	            }
	            this.hostname = validParts.join('.');
	            break;
	          }
	        }
	      }
	    }
	
	    if (this.hostname.length > hostnameMaxLen) {
	      this.hostname = '';
	    } else {
	      // hostnames are always lower case.
	      this.hostname = this.hostname.toLowerCase();
	    }
	
	    if (!ipv6Hostname) {
	      // IDNA Support: Returns a punycoded representation of "domain".
	      // It only converts parts of the domain name that
	      // have non-ASCII characters, i.e. it doesn't matter if
	      // you call it with a domain that already is ASCII-only.
	      this.hostname = punycode.toASCII(this.hostname);
	    }
	
	    var p = this.port ? ':' + this.port : '';
	    var h = this.hostname || '';
	    this.host = h + p;
	    this.href += this.host;
	
	    // strip [ and ] from the hostname
	    // the host field still retains them, though
	    if (ipv6Hostname) {
	      this.hostname = this.hostname.substr(1, this.hostname.length - 2);
	      if (rest[0] !== '/') {
	        rest = '/' + rest;
	      }
	    }
	  }
	
	  // now rest is set to the post-host stuff.
	  // chop off any delim chars.
	  if (!unsafeProtocol[lowerProto]) {
	
	    // First, make 100% sure that any "autoEscape" chars get
	    // escaped, even if encodeURIComponent doesn't think they
	    // need to be.
	    for (var i = 0, l = autoEscape.length; i < l; i++) {
	      var ae = autoEscape[i];
	      if (rest.indexOf(ae) === -1)
	        continue;
	      var esc = encodeURIComponent(ae);
	      if (esc === ae) {
	        esc = escape(ae);
	      }
	      rest = rest.split(ae).join(esc);
	    }
	  }
	
	
	  // chop off from the tail first.
	  var hash = rest.indexOf('#');
	  if (hash !== -1) {
	    // got a fragment string.
	    this.hash = rest.substr(hash);
	    rest = rest.slice(0, hash);
	  }
	  var qm = rest.indexOf('?');
	  if (qm !== -1) {
	    this.search = rest.substr(qm);
	    this.query = rest.substr(qm + 1);
	    if (parseQueryString) {
	      this.query = querystring.parse(this.query);
	    }
	    rest = rest.slice(0, qm);
	  } else if (parseQueryString) {
	    // no query string, but parseQueryString still requested
	    this.search = '';
	    this.query = {};
	  }
	  if (rest) this.pathname = rest;
	  if (slashedProtocol[lowerProto] &&
	      this.hostname && !this.pathname) {
	    this.pathname = '/';
	  }
	
	  //to support http.request
	  if (this.pathname || this.search) {
	    var p = this.pathname || '';
	    var s = this.search || '';
	    this.path = p + s;
	  }
	
	  // finally, reconstruct the href based on what has been validated.
	  this.href = this.format();
	  return this;
	};
	
	// format a parsed object into a url string
	function urlFormat(obj) {
	  // ensure it's an object, and not a string url.
	  // If it's an obj, this is a no-op.
	  // this way, you can call url_format() on strings
	  // to clean up potentially wonky urls.
	  if (util.isString(obj)) obj = urlParse(obj);
	  if (!(obj instanceof Url)) return Url.prototype.format.call(obj);
	  return obj.format();
	}
	
	Url.prototype.format = function() {
	  var auth = this.auth || '';
	  if (auth) {
	    auth = encodeURIComponent(auth);
	    auth = auth.replace(/%3A/i, ':');
	    auth += '@';
	  }
	
	  var protocol = this.protocol || '',
	      pathname = this.pathname || '',
	      hash = this.hash || '',
	      host = false,
	      query = '';
	
	  if (this.host) {
	    host = auth + this.host;
	  } else if (this.hostname) {
	    host = auth + (this.hostname.indexOf(':') === -1 ?
	        this.hostname :
	        '[' + this.hostname + ']');
	    if (this.port) {
	      host += ':' + this.port;
	    }
	  }
	
	  if (this.query &&
	      util.isObject(this.query) &&
	      Object.keys(this.query).length) {
	    query = querystring.stringify(this.query);
	  }
	
	  var search = this.search || (query && ('?' + query)) || '';
	
	  if (protocol && protocol.substr(-1) !== ':') protocol += ':';
	
	  // only the slashedProtocols get the //.  Not mailto:, xmpp:, etc.
	  // unless they had them to begin with.
	  if (this.slashes ||
	      (!protocol || slashedProtocol[protocol]) && host !== false) {
	    host = '//' + (host || '');
	    if (pathname && pathname.charAt(0) !== '/') pathname = '/' + pathname;
	  } else if (!host) {
	    host = '';
	  }
	
	  if (hash && hash.charAt(0) !== '#') hash = '#' + hash;
	  if (search && search.charAt(0) !== '?') search = '?' + search;
	
	  pathname = pathname.replace(/[?#]/g, function(match) {
	    return encodeURIComponent(match);
	  });
	  search = search.replace('#', '%23');
	
	  return protocol + host + pathname + search + hash;
	};
	
	function urlResolve(source, relative) {
	  return urlParse(source, false, true).resolve(relative);
	}
	
	Url.prototype.resolve = function(relative) {
	  return this.resolveObject(urlParse(relative, false, true)).format();
	};
	
	function urlResolveObject(source, relative) {
	  if (!source) return relative;
	  return urlParse(source, false, true).resolveObject(relative);
	}
	
	Url.prototype.resolveObject = function(relative) {
	  if (util.isString(relative)) {
	    var rel = new Url();
	    rel.parse(relative, false, true);
	    relative = rel;
	  }
	
	  var result = new Url();
	  var tkeys = Object.keys(this);
	  for (var tk = 0; tk < tkeys.length; tk++) {
	    var tkey = tkeys[tk];
	    result[tkey] = this[tkey];
	  }
	
	  // hash is always overridden, no matter what.
	  // even href="" will remove it.
	  result.hash = relative.hash;
	
	  // if the relative url is empty, then there's nothing left to do here.
	  if (relative.href === '') {
	    result.href = result.format();
	    return result;
	  }
	
	  // hrefs like //foo/bar always cut to the protocol.
	  if (relative.slashes && !relative.protocol) {
	    // take everything except the protocol from relative
	    var rkeys = Object.keys(relative);
	    for (var rk = 0; rk < rkeys.length; rk++) {
	      var rkey = rkeys[rk];
	      if (rkey !== 'protocol')
	        result[rkey] = relative[rkey];
	    }
	
	    //urlParse appends trailing / to urls like http://www.example.com
	    if (slashedProtocol[result.protocol] &&
	        result.hostname && !result.pathname) {
	      result.path = result.pathname = '/';
	    }
	
	    result.href = result.format();
	    return result;
	  }
	
	  if (relative.protocol && relative.protocol !== result.protocol) {
	    // if it's a known url protocol, then changing
	    // the protocol does weird things
	    // first, if it's not file:, then we MUST have a host,
	    // and if there was a path
	    // to begin with, then we MUST have a path.
	    // if it is file:, then the host is dropped,
	    // because that's known to be hostless.
	    // anything else is assumed to be absolute.
	    if (!slashedProtocol[relative.protocol]) {
	      var keys = Object.keys(relative);
	      for (var v = 0; v < keys.length; v++) {
	        var k = keys[v];
	        result[k] = relative[k];
	      }
	      result.href = result.format();
	      return result;
	    }
	
	    result.protocol = relative.protocol;
	    if (!relative.host && !hostlessProtocol[relative.protocol]) {
	      var relPath = (relative.pathname || '').split('/');
	      while (relPath.length && !(relative.host = relPath.shift()));
	      if (!relative.host) relative.host = '';
	      if (!relative.hostname) relative.hostname = '';
	      if (relPath[0] !== '') relPath.unshift('');
	      if (relPath.length < 2) relPath.unshift('');
	      result.pathname = relPath.join('/');
	    } else {
	      result.pathname = relative.pathname;
	    }
	    result.search = relative.search;
	    result.query = relative.query;
	    result.host = relative.host || '';
	    result.auth = relative.auth;
	    result.hostname = relative.hostname || relative.host;
	    result.port = relative.port;
	    // to support http.request
	    if (result.pathname || result.search) {
	      var p = result.pathname || '';
	      var s = result.search || '';
	      result.path = p + s;
	    }
	    result.slashes = result.slashes || relative.slashes;
	    result.href = result.format();
	    return result;
	  }
	
	  var isSourceAbs = (result.pathname && result.pathname.charAt(0) === '/'),
	      isRelAbs = (
	          relative.host ||
	          relative.pathname && relative.pathname.charAt(0) === '/'
	      ),
	      mustEndAbs = (isRelAbs || isSourceAbs ||
	                    (result.host && relative.pathname)),
	      removeAllDots = mustEndAbs,
	      srcPath = result.pathname && result.pathname.split('/') || [],
	      relPath = relative.pathname && relative.pathname.split('/') || [],
	      psychotic = result.protocol && !slashedProtocol[result.protocol];
	
	  // if the url is a non-slashed url, then relative
	  // links like ../.. should be able
	  // to crawl up to the hostname, as well.  This is strange.
	  // result.protocol has already been set by now.
	  // Later on, put the first path part into the host field.
	  if (psychotic) {
	    result.hostname = '';
	    result.port = null;
	    if (result.host) {
	      if (srcPath[0] === '') srcPath[0] = result.host;
	      else srcPath.unshift(result.host);
	    }
	    result.host = '';
	    if (relative.protocol) {
	      relative.hostname = null;
	      relative.port = null;
	      if (relative.host) {
	        if (relPath[0] === '') relPath[0] = relative.host;
	        else relPath.unshift(relative.host);
	      }
	      relative.host = null;
	    }
	    mustEndAbs = mustEndAbs && (relPath[0] === '' || srcPath[0] === '');
	  }
	
	  if (isRelAbs) {
	    // it's absolute.
	    result.host = (relative.host || relative.host === '') ?
	                  relative.host : result.host;
	    result.hostname = (relative.hostname || relative.hostname === '') ?
	                      relative.hostname : result.hostname;
	    result.search = relative.search;
	    result.query = relative.query;
	    srcPath = relPath;
	    // fall through to the dot-handling below.
	  } else if (relPath.length) {
	    // it's relative
	    // throw away the existing file, and take the new path instead.
	    if (!srcPath) srcPath = [];
	    srcPath.pop();
	    srcPath = srcPath.concat(relPath);
	    result.search = relative.search;
	    result.query = relative.query;
	  } else if (!util.isNullOrUndefined(relative.search)) {
	    // just pull out the search.
	    // like href='?foo'.
	    // Put this after the other two cases because it simplifies the booleans
	    if (psychotic) {
	      result.hostname = result.host = srcPath.shift();
	      //occationaly the auth can get stuck only in host
	      //this especially happens in cases like
	      //url.resolveObject('mailto:local1@domain1', 'local2@domain2')
	      var authInHost = result.host && result.host.indexOf('@') > 0 ?
	                       result.host.split('@') : false;
	      if (authInHost) {
	        result.auth = authInHost.shift();
	        result.host = result.hostname = authInHost.shift();
	      }
	    }
	    result.search = relative.search;
	    result.query = relative.query;
	    //to support http.request
	    if (!util.isNull(result.pathname) || !util.isNull(result.search)) {
	      result.path = (result.pathname ? result.pathname : '') +
	                    (result.search ? result.search : '');
	    }
	    result.href = result.format();
	    return result;
	  }
	
	  if (!srcPath.length) {
	    // no path at all.  easy.
	    // we've already handled the other stuff above.
	    result.pathname = null;
	    //to support http.request
	    if (result.search) {
	      result.path = '/' + result.search;
	    } else {
	      result.path = null;
	    }
	    result.href = result.format();
	    return result;
	  }
	
	  // if a url ENDs in . or .., then it must get a trailing slash.
	  // however, if it ends in anything else non-slashy,
	  // then it must NOT get a trailing slash.
	  var last = srcPath.slice(-1)[0];
	  var hasTrailingSlash = (
	      (result.host || relative.host || srcPath.length > 1) &&
	      (last === '.' || last === '..') || last === '');
	
	  // strip single dots, resolve double dots to parent dir
	  // if the path tries to go above the root, `up` ends up > 0
	  var up = 0;
	  for (var i = srcPath.length; i >= 0; i--) {
	    last = srcPath[i];
	    if (last === '.') {
	      srcPath.splice(i, 1);
	    } else if (last === '..') {
	      srcPath.splice(i, 1);
	      up++;
	    } else if (up) {
	      srcPath.splice(i, 1);
	      up--;
	    }
	  }
	
	  // if the path is allowed to go above the root, restore leading ..s
	  if (!mustEndAbs && !removeAllDots) {
	    for (; up--; up) {
	      srcPath.unshift('..');
	    }
	  }
	
	  if (mustEndAbs && srcPath[0] !== '' &&
	      (!srcPath[0] || srcPath[0].charAt(0) !== '/')) {
	    srcPath.unshift('');
	  }
	
	  if (hasTrailingSlash && (srcPath.join('/').substr(-1) !== '/')) {
	    srcPath.push('');
	  }
	
	  var isAbsolute = srcPath[0] === '' ||
	      (srcPath[0] && srcPath[0].charAt(0) === '/');
	
	  // put the host back
	  if (psychotic) {
	    result.hostname = result.host = isAbsolute ? '' :
	                                    srcPath.length ? srcPath.shift() : '';
	    //occationaly the auth can get stuck only in host
	    //this especially happens in cases like
	    //url.resolveObject('mailto:local1@domain1', 'local2@domain2')
	    var authInHost = result.host && result.host.indexOf('@') > 0 ?
	                     result.host.split('@') : false;
	    if (authInHost) {
	      result.auth = authInHost.shift();
	      result.host = result.hostname = authInHost.shift();
	    }
	  }
	
	  mustEndAbs = mustEndAbs || (result.host && srcPath.length);
	
	  if (mustEndAbs && !isAbsolute) {
	    srcPath.unshift('');
	  }
	
	  if (!srcPath.length) {
	    result.pathname = null;
	    result.path = null;
	  } else {
	    result.pathname = srcPath.join('/');
	  }
	
	  //to support request.http
	  if (!util.isNull(result.pathname) || !util.isNull(result.search)) {
	    result.path = (result.pathname ? result.pathname : '') +
	                  (result.search ? result.search : '');
	  }
	  result.auth = relative.auth || result.auth;
	  result.slashes = result.slashes || relative.slashes;
	  result.href = result.format();
	  return result;
	};
	
	Url.prototype.parseHost = function() {
	  var host = this.host;
	  var port = portPattern.exec(host);
	  if (port) {
	    port = port[0];
	    if (port !== ':') {
	      this.port = port.substr(1);
	    }
	    host = host.substr(0, host.length - port.length);
	  }
	  if (host) this.hostname = host;
	};


/***/ },
/* 18 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_RESULT__;/* WEBPACK VAR INJECTION */(function(module, global) {/*! https://mths.be/punycode v1.3.2 by @mathias */
	;(function(root) {
	
		/** Detect free variables */
		var freeExports = typeof exports == 'object' && exports &&
			!exports.nodeType && exports;
		var freeModule = typeof module == 'object' && module &&
			!module.nodeType && module;
		var freeGlobal = typeof global == 'object' && global;
		if (
			freeGlobal.global === freeGlobal ||
			freeGlobal.window === freeGlobal ||
			freeGlobal.self === freeGlobal
		) {
			root = freeGlobal;
		}
	
		/**
		 * The `punycode` object.
		 * @name punycode
		 * @type Object
		 */
		var punycode,
	
		/** Highest positive signed 32-bit float value */
		maxInt = 2147483647, // aka. 0x7FFFFFFF or 2^31-1
	
		/** Bootstring parameters */
		base = 36,
		tMin = 1,
		tMax = 26,
		skew = 38,
		damp = 700,
		initialBias = 72,
		initialN = 128, // 0x80
		delimiter = '-', // '\x2D'
	
		/** Regular expressions */
		regexPunycode = /^xn--/,
		regexNonASCII = /[^\x20-\x7E]/, // unprintable ASCII chars + non-ASCII chars
		regexSeparators = /[\x2E\u3002\uFF0E\uFF61]/g, // RFC 3490 separators
	
		/** Error messages */
		errors = {
			'overflow': 'Overflow: input needs wider integers to process',
			'not-basic': 'Illegal input >= 0x80 (not a basic code point)',
			'invalid-input': 'Invalid input'
		},
	
		/** Convenience shortcuts */
		baseMinusTMin = base - tMin,
		floor = Math.floor,
		stringFromCharCode = String.fromCharCode,
	
		/** Temporary variable */
		key;
	
		/*--------------------------------------------------------------------------*/
	
		/**
		 * A generic error utility function.
		 * @private
		 * @param {String} type The error type.
		 * @returns {Error} Throws a `RangeError` with the applicable error message.
		 */
		function error(type) {
			throw RangeError(errors[type]);
		}
	
		/**
		 * A generic `Array#map` utility function.
		 * @private
		 * @param {Array} array The array to iterate over.
		 * @param {Function} callback The function that gets called for every array
		 * item.
		 * @returns {Array} A new array of values returned by the callback function.
		 */
		function map(array, fn) {
			var length = array.length;
			var result = [];
			while (length--) {
				result[length] = fn(array[length]);
			}
			return result;
		}
	
		/**
		 * A simple `Array#map`-like wrapper to work with domain name strings or email
		 * addresses.
		 * @private
		 * @param {String} domain The domain name or email address.
		 * @param {Function} callback The function that gets called for every
		 * character.
		 * @returns {Array} A new string of characters returned by the callback
		 * function.
		 */
		function mapDomain(string, fn) {
			var parts = string.split('@');
			var result = '';
			if (parts.length > 1) {
				// In email addresses, only the domain name should be punycoded. Leave
				// the local part (i.e. everything up to `@`) intact.
				result = parts[0] + '@';
				string = parts[1];
			}
			// Avoid `split(regex)` for IE8 compatibility. See #17.
			string = string.replace(regexSeparators, '\x2E');
			var labels = string.split('.');
			var encoded = map(labels, fn).join('.');
			return result + encoded;
		}
	
		/**
		 * Creates an array containing the numeric code points of each Unicode
		 * character in the string. While JavaScript uses UCS-2 internally,
		 * this function will convert a pair of surrogate halves (each of which
		 * UCS-2 exposes as separate characters) into a single code point,
		 * matching UTF-16.
		 * @see `punycode.ucs2.encode`
		 * @see <https://mathiasbynens.be/notes/javascript-encoding>
		 * @memberOf punycode.ucs2
		 * @name decode
		 * @param {String} string The Unicode input string (UCS-2).
		 * @returns {Array} The new array of code points.
		 */
		function ucs2decode(string) {
			var output = [],
			    counter = 0,
			    length = string.length,
			    value,
			    extra;
			while (counter < length) {
				value = string.charCodeAt(counter++);
				if (value >= 0xD800 && value <= 0xDBFF && counter < length) {
					// high surrogate, and there is a next character
					extra = string.charCodeAt(counter++);
					if ((extra & 0xFC00) == 0xDC00) { // low surrogate
						output.push(((value & 0x3FF) << 10) + (extra & 0x3FF) + 0x10000);
					} else {
						// unmatched surrogate; only append this code unit, in case the next
						// code unit is the high surrogate of a surrogate pair
						output.push(value);
						counter--;
					}
				} else {
					output.push(value);
				}
			}
			return output;
		}
	
		/**
		 * Creates a string based on an array of numeric code points.
		 * @see `punycode.ucs2.decode`
		 * @memberOf punycode.ucs2
		 * @name encode
		 * @param {Array} codePoints The array of numeric code points.
		 * @returns {String} The new Unicode string (UCS-2).
		 */
		function ucs2encode(array) {
			return map(array, function(value) {
				var output = '';
				if (value > 0xFFFF) {
					value -= 0x10000;
					output += stringFromCharCode(value >>> 10 & 0x3FF | 0xD800);
					value = 0xDC00 | value & 0x3FF;
				}
				output += stringFromCharCode(value);
				return output;
			}).join('');
		}
	
		/**
		 * Converts a basic code point into a digit/integer.
		 * @see `digitToBasic()`
		 * @private
		 * @param {Number} codePoint The basic numeric code point value.
		 * @returns {Number} The numeric value of a basic code point (for use in
		 * representing integers) in the range `0` to `base - 1`, or `base` if
		 * the code point does not represent a value.
		 */
		function basicToDigit(codePoint) {
			if (codePoint - 48 < 10) {
				return codePoint - 22;
			}
			if (codePoint - 65 < 26) {
				return codePoint - 65;
			}
			if (codePoint - 97 < 26) {
				return codePoint - 97;
			}
			return base;
		}
	
		/**
		 * Converts a digit/integer into a basic code point.
		 * @see `basicToDigit()`
		 * @private
		 * @param {Number} digit The numeric value of a basic code point.
		 * @returns {Number} The basic code point whose value (when used for
		 * representing integers) is `digit`, which needs to be in the range
		 * `0` to `base - 1`. If `flag` is non-zero, the uppercase form is
		 * used; else, the lowercase form is used. The behavior is undefined
		 * if `flag` is non-zero and `digit` has no uppercase form.
		 */
		function digitToBasic(digit, flag) {
			//  0..25 map to ASCII a..z or A..Z
			// 26..35 map to ASCII 0..9
			return digit + 22 + 75 * (digit < 26) - ((flag != 0) << 5);
		}
	
		/**
		 * Bias adaptation function as per section 3.4 of RFC 3492.
		 * http://tools.ietf.org/html/rfc3492#section-3.4
		 * @private
		 */
		function adapt(delta, numPoints, firstTime) {
			var k = 0;
			delta = firstTime ? floor(delta / damp) : delta >> 1;
			delta += floor(delta / numPoints);
			for (/* no initialization */; delta > baseMinusTMin * tMax >> 1; k += base) {
				delta = floor(delta / baseMinusTMin);
			}
			return floor(k + (baseMinusTMin + 1) * delta / (delta + skew));
		}
	
		/**
		 * Converts a Punycode string of ASCII-only symbols to a string of Unicode
		 * symbols.
		 * @memberOf punycode
		 * @param {String} input The Punycode string of ASCII-only symbols.
		 * @returns {String} The resulting string of Unicode symbols.
		 */
		function decode(input) {
			// Don't use UCS-2
			var output = [],
			    inputLength = input.length,
			    out,
			    i = 0,
			    n = initialN,
			    bias = initialBias,
			    basic,
			    j,
			    index,
			    oldi,
			    w,
			    k,
			    digit,
			    t,
			    /** Cached calculation results */
			    baseMinusT;
	
			// Handle the basic code points: let `basic` be the number of input code
			// points before the last delimiter, or `0` if there is none, then copy
			// the first basic code points to the output.
	
			basic = input.lastIndexOf(delimiter);
			if (basic < 0) {
				basic = 0;
			}
	
			for (j = 0; j < basic; ++j) {
				// if it's not a basic code point
				if (input.charCodeAt(j) >= 0x80) {
					error('not-basic');
				}
				output.push(input.charCodeAt(j));
			}
	
			// Main decoding loop: start just after the last delimiter if any basic code
			// points were copied; start at the beginning otherwise.
	
			for (index = basic > 0 ? basic + 1 : 0; index < inputLength; /* no final expression */) {
	
				// `index` is the index of the next character to be consumed.
				// Decode a generalized variable-length integer into `delta`,
				// which gets added to `i`. The overflow checking is easier
				// if we increase `i` as we go, then subtract off its starting
				// value at the end to obtain `delta`.
				for (oldi = i, w = 1, k = base; /* no condition */; k += base) {
	
					if (index >= inputLength) {
						error('invalid-input');
					}
	
					digit = basicToDigit(input.charCodeAt(index++));
	
					if (digit >= base || digit > floor((maxInt - i) / w)) {
						error('overflow');
					}
	
					i += digit * w;
					t = k <= bias ? tMin : (k >= bias + tMax ? tMax : k - bias);
	
					if (digit < t) {
						break;
					}
	
					baseMinusT = base - t;
					if (w > floor(maxInt / baseMinusT)) {
						error('overflow');
					}
	
					w *= baseMinusT;
	
				}
	
				out = output.length + 1;
				bias = adapt(i - oldi, out, oldi == 0);
	
				// `i` was supposed to wrap around from `out` to `0`,
				// incrementing `n` each time, so we'll fix that now:
				if (floor(i / out) > maxInt - n) {
					error('overflow');
				}
	
				n += floor(i / out);
				i %= out;
	
				// Insert `n` at position `i` of the output
				output.splice(i++, 0, n);
	
			}
	
			return ucs2encode(output);
		}
	
		/**
		 * Converts a string of Unicode symbols (e.g. a domain name label) to a
		 * Punycode string of ASCII-only symbols.
		 * @memberOf punycode
		 * @param {String} input The string of Unicode symbols.
		 * @returns {String} The resulting Punycode string of ASCII-only symbols.
		 */
		function encode(input) {
			var n,
			    delta,
			    handledCPCount,
			    basicLength,
			    bias,
			    j,
			    m,
			    q,
			    k,
			    t,
			    currentValue,
			    output = [],
			    /** `inputLength` will hold the number of code points in `input`. */
			    inputLength,
			    /** Cached calculation results */
			    handledCPCountPlusOne,
			    baseMinusT,
			    qMinusT;
	
			// Convert the input in UCS-2 to Unicode
			input = ucs2decode(input);
	
			// Cache the length
			inputLength = input.length;
	
			// Initialize the state
			n = initialN;
			delta = 0;
			bias = initialBias;
	
			// Handle the basic code points
			for (j = 0; j < inputLength; ++j) {
				currentValue = input[j];
				if (currentValue < 0x80) {
					output.push(stringFromCharCode(currentValue));
				}
			}
	
			handledCPCount = basicLength = output.length;
	
			// `handledCPCount` is the number of code points that have been handled;
			// `basicLength` is the number of basic code points.
	
			// Finish the basic string - if it is not empty - with a delimiter
			if (basicLength) {
				output.push(delimiter);
			}
	
			// Main encoding loop:
			while (handledCPCount < inputLength) {
	
				// All non-basic code points < n have been handled already. Find the next
				// larger one:
				for (m = maxInt, j = 0; j < inputLength; ++j) {
					currentValue = input[j];
					if (currentValue >= n && currentValue < m) {
						m = currentValue;
					}
				}
	
				// Increase `delta` enough to advance the decoder's <n,i> state to <m,0>,
				// but guard against overflow
				handledCPCountPlusOne = handledCPCount + 1;
				if (m - n > floor((maxInt - delta) / handledCPCountPlusOne)) {
					error('overflow');
				}
	
				delta += (m - n) * handledCPCountPlusOne;
				n = m;
	
				for (j = 0; j < inputLength; ++j) {
					currentValue = input[j];
	
					if (currentValue < n && ++delta > maxInt) {
						error('overflow');
					}
	
					if (currentValue == n) {
						// Represent delta as a generalized variable-length integer
						for (q = delta, k = base; /* no condition */; k += base) {
							t = k <= bias ? tMin : (k >= bias + tMax ? tMax : k - bias);
							if (q < t) {
								break;
							}
							qMinusT = q - t;
							baseMinusT = base - t;
							output.push(
								stringFromCharCode(digitToBasic(t + qMinusT % baseMinusT, 0))
							);
							q = floor(qMinusT / baseMinusT);
						}
	
						output.push(stringFromCharCode(digitToBasic(q, 0)));
						bias = adapt(delta, handledCPCountPlusOne, handledCPCount == basicLength);
						delta = 0;
						++handledCPCount;
					}
				}
	
				++delta;
				++n;
	
			}
			return output.join('');
		}
	
		/**
		 * Converts a Punycode string representing a domain name or an email address
		 * to Unicode. Only the Punycoded parts of the input will be converted, i.e.
		 * it doesn't matter if you call it on a string that has already been
		 * converted to Unicode.
		 * @memberOf punycode
		 * @param {String} input The Punycoded domain name or email address to
		 * convert to Unicode.
		 * @returns {String} The Unicode representation of the given Punycode
		 * string.
		 */
		function toUnicode(input) {
			return mapDomain(input, function(string) {
				return regexPunycode.test(string)
					? decode(string.slice(4).toLowerCase())
					: string;
			});
		}
	
		/**
		 * Converts a Unicode string representing a domain name or an email address to
		 * Punycode. Only the non-ASCII parts of the domain name will be converted,
		 * i.e. it doesn't matter if you call it with a domain that's already in
		 * ASCII.
		 * @memberOf punycode
		 * @param {String} input The domain name or email address to convert, as a
		 * Unicode string.
		 * @returns {String} The Punycode representation of the given domain name or
		 * email address.
		 */
		function toASCII(input) {
			return mapDomain(input, function(string) {
				return regexNonASCII.test(string)
					? 'xn--' + encode(string)
					: string;
			});
		}
	
		/*--------------------------------------------------------------------------*/
	
		/** Define the public API */
		punycode = {
			/**
			 * A string representing the current Punycode.js version number.
			 * @memberOf punycode
			 * @type String
			 */
			'version': '1.3.2',
			/**
			 * An object of methods to convert from JavaScript's internal character
			 * representation (UCS-2) to Unicode code points, and back.
			 * @see <https://mathiasbynens.be/notes/javascript-encoding>
			 * @memberOf punycode
			 * @type Object
			 */
			'ucs2': {
				'decode': ucs2decode,
				'encode': ucs2encode
			},
			'decode': decode,
			'encode': encode,
			'toASCII': toASCII,
			'toUnicode': toUnicode
		};
	
		/** Expose `punycode` */
		// Some AMD build optimizers, like r.js, check for specific condition patterns
		// like the following:
		if (
			true
		) {
			!(__WEBPACK_AMD_DEFINE_RESULT__ = function() {
				return punycode;
			}.call(exports, __webpack_require__, exports, module), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
		} else if (freeExports && freeModule) {
			if (module.exports == freeExports) { // in Node.js or RingoJS v0.8.0+
				freeModule.exports = punycode;
			} else { // in Narwhal or RingoJS v0.7.0-
				for (key in punycode) {
					punycode.hasOwnProperty(key) && (freeExports[key] = punycode[key]);
				}
			}
		} else { // in Rhino or a web browser
			root.punycode = punycode;
		}
	
	}(this));
	
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(19)(module), (function() { return this; }())))

/***/ },
/* 19 */
/***/ function(module, exports) {

	module.exports = function(module) {
		if(!module.webpackPolyfill) {
			module.deprecate = function() {};
			module.paths = [];
			// module.parent = undefined by default
			module.children = [];
			module.webpackPolyfill = 1;
		}
		return module;
	}


/***/ },
/* 20 */
/***/ function(module, exports) {

	'use strict';
	
	module.exports = {
	  isString: function(arg) {
	    return typeof(arg) === 'string';
	  },
	  isObject: function(arg) {
	    return typeof(arg) === 'object' && arg !== null;
	  },
	  isNull: function(arg) {
	    return arg === null;
	  },
	  isNullOrUndefined: function(arg) {
	    return arg == null;
	  }
	};


/***/ },
/* 21 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	exports.decode = exports.parse = __webpack_require__(22);
	exports.encode = exports.stringify = __webpack_require__(23);


/***/ },
/* 22 */
/***/ function(module, exports) {

	// Copyright Joyent, Inc. and other Node contributors.
	//
	// Permission is hereby granted, free of charge, to any person obtaining a
	// copy of this software and associated documentation files (the
	// "Software"), to deal in the Software without restriction, including
	// without limitation the rights to use, copy, modify, merge, publish,
	// distribute, sublicense, and/or sell copies of the Software, and to permit
	// persons to whom the Software is furnished to do so, subject to the
	// following conditions:
	//
	// The above copyright notice and this permission notice shall be included
	// in all copies or substantial portions of the Software.
	//
	// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
	// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
	// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
	// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
	// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
	// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
	// USE OR OTHER DEALINGS IN THE SOFTWARE.
	
	'use strict';
	
	// If obj.hasOwnProperty has been overridden, then calling
	// obj.hasOwnProperty(prop) will break.
	// See: https://github.com/joyent/node/issues/1707
	function hasOwnProperty(obj, prop) {
	  return Object.prototype.hasOwnProperty.call(obj, prop);
	}
	
	module.exports = function(qs, sep, eq, options) {
	  sep = sep || '&';
	  eq = eq || '=';
	  var obj = {};
	
	  if (typeof qs !== 'string' || qs.length === 0) {
	    return obj;
	  }
	
	  var regexp = /\+/g;
	  qs = qs.split(sep);
	
	  var maxKeys = 1000;
	  if (options && typeof options.maxKeys === 'number') {
	    maxKeys = options.maxKeys;
	  }
	
	  var len = qs.length;
	  // maxKeys <= 0 means that we should not limit keys count
	  if (maxKeys > 0 && len > maxKeys) {
	    len = maxKeys;
	  }
	
	  for (var i = 0; i < len; ++i) {
	    var x = qs[i].replace(regexp, '%20'),
	        idx = x.indexOf(eq),
	        kstr, vstr, k, v;
	
	    if (idx >= 0) {
	      kstr = x.substr(0, idx);
	      vstr = x.substr(idx + 1);
	    } else {
	      kstr = x;
	      vstr = '';
	    }
	
	    k = decodeURIComponent(kstr);
	    v = decodeURIComponent(vstr);
	
	    if (!hasOwnProperty(obj, k)) {
	      obj[k] = v;
	    } else if (Array.isArray(obj[k])) {
	      obj[k].push(v);
	    } else {
	      obj[k] = [obj[k], v];
	    }
	  }
	
	  return obj;
	};


/***/ },
/* 23 */
/***/ function(module, exports) {

	// Copyright Joyent, Inc. and other Node contributors.
	//
	// Permission is hereby granted, free of charge, to any person obtaining a
	// copy of this software and associated documentation files (the
	// "Software"), to deal in the Software without restriction, including
	// without limitation the rights to use, copy, modify, merge, publish,
	// distribute, sublicense, and/or sell copies of the Software, and to permit
	// persons to whom the Software is furnished to do so, subject to the
	// following conditions:
	//
	// The above copyright notice and this permission notice shall be included
	// in all copies or substantial portions of the Software.
	//
	// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
	// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
	// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
	// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
	// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
	// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
	// USE OR OTHER DEALINGS IN THE SOFTWARE.
	
	'use strict';
	
	var stringifyPrimitive = function(v) {
	  switch (typeof v) {
	    case 'string':
	      return v;
	
	    case 'boolean':
	      return v ? 'true' : 'false';
	
	    case 'number':
	      return isFinite(v) ? v : '';
	
	    default:
	      return '';
	  }
	};
	
	module.exports = function(obj, sep, eq, name) {
	  sep = sep || '&';
	  eq = eq || '=';
	  if (obj === null) {
	    obj = undefined;
	  }
	
	  if (typeof obj === 'object') {
	    return Object.keys(obj).map(function(k) {
	      var ks = encodeURIComponent(stringifyPrimitive(k)) + eq;
	      if (Array.isArray(obj[k])) {
	        return obj[k].map(function(v) {
	          return ks + encodeURIComponent(stringifyPrimitive(v));
	        }).join(sep);
	      } else {
	        return ks + encodeURIComponent(stringifyPrimitive(obj[k]));
	      }
	    }).join(sep);
	
	  }
	
	  if (!name) return '';
	  return encodeURIComponent(stringifyPrimitive(name)) + eq +
	         encodeURIComponent(stringifyPrimitive(obj));
	};


/***/ }
/******/ ]);
//# sourceMappingURL=db2cp.js.map