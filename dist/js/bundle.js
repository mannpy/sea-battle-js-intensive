/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
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
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/js/main.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/js/main.js":
/*!************************!*\
  !*** ./src/js/main.js ***!
  \************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("const record = document.getElementById(\"record\");\nconst shot = document.getElementById(\"shot\");\nconst hit = document.getElementById(\"hit\");\nconst dead = document.getElementById(\"dead\");\nconst enemy = document.getElementById(\"enemy\");\nconst header = document.querySelector(\".header\");\nconst again = document.getElementById(\"again\");\nconst game = {\n  ships: [],\n  shipCount: 0,\n  xBoardLength: enemy.querySelector(\"tr\").querySelectorAll(\"td\").length,\n  yBoardLength: enemy.querySelectorAll(\"tr\").length,\n  optionShip: {\n    count: [1, 2, 3, 4],\n    size: [4, 3, 2, 1]\n  },\n  collision: new Set(),\n\n  generateShip() {\n    for (let i = 0, arrayLen = this.optionShip.count.length; i < arrayLen; i++) {\n      for (let j = 0, shipsLen = this.optionShip.count[i]; j < shipsLen; j++) {\n        const size = this.optionShip.size[i];\n        const ship = this.generateOptionsShip(size);\n        this.ships.push(ship);\n        this.shipCount++;\n      }\n    }\n  },\n\n  generateOptionsShip(shipSize) {\n    const ship = {\n      hit: [],\n      location: []\n    };\n    const directions = [\"horizontal\", \"vertical\"];\n    const direction = directions[Math.floor(Math.random() * directions.length)];\n    let x, y;\n\n    if (direction === \"vertical\") {\n      x = Math.floor(Math.random() * game.xBoardLength);\n      y = Math.floor(Math.random() * (game.yBoardLength - shipSize));\n    } else {\n      x = Math.floor(Math.random() * (game.xBoardLength - shipSize));\n      y = Math.floor(Math.random() * game.yBoardLength);\n    }\n\n    for (let i = 0; i < shipSize; i++) {\n      if (direction === \"vertical\") {\n        ship.location.push(y + i + \"\" + x);\n      } else {\n        ship.location.push(y + \"\" + (x + i));\n      }\n\n      ship.hit.push(\"\");\n    }\n\n    if (this.checkCollision(ship.location)) {\n      return this.generateOptionsShip(shipSize);\n    }\n\n    this.addCollision(ship.location);\n    return ship;\n  },\n\n  checkCollision(location) {\n    for (const coord of location) {\n      if (this.collision.has(coord)) {\n        return true;\n      }\n    }\n  },\n\n  addCollision(location) {\n    for (let i = 0; i < location.length; i++) {\n      const coordX = location[i][1];\n      const coordY = location[i][0];\n\n      for (let y = +coordY - 1; y < +coordY + 2; y++) {\n        for (let x = +coordX - 1; x < +coordX + 2; x++) {\n          if (y >= 0 && y < this.yBoardLength && x >= 0 && x < this.xBoardLength) {\n            const coord = y + \"\" + x;\n            this.collision.add(coord);\n          }\n        }\n      }\n    }\n  }\n\n};\nconst play = {\n  record: +localStorage.getItem(\"seaBattleRecord\") || 0,\n  shot: 0,\n  hit: 0,\n  dead: 0,\n\n  set updateData(data) {\n    this[data] += 1;\n    this.render();\n  },\n\n  render() {\n    record.textContent = this.record, shot.textContent = this.shot, hit.textContent = this.hit, dead.textContent = this.dead;\n  }\n\n};\nconst show = {\n  hit(elem) {\n    this.changeClass(elem, \"hit\");\n  },\n\n  miss(elem) {\n    this.changeClass(elem, \"miss\");\n  },\n\n  dead(elem) {\n    this.changeClass(elem, \"dead\");\n  },\n\n  changeClass(elem, value) {\n    elem.className = value;\n  }\n\n};\n\nfunction fire(event) {\n  const target = event.target;\n  if (target.tagName !== \"TD\" || target.className || !game.shipCount) return;\n  show.miss(target);\n  play.updateData = \"shot\";\n\n  for (let i = 0, len = game.ships.length; i < len; i++) {\n    const ship = game.ships[i];\n    const index = ship.location.indexOf(target.id);\n\n    if (index >= 0) {\n      show.hit(target);\n      play.updateData = \"hit\";\n      ship.hit[index] = \"x\";\n      const life = ship.hit.indexOf(\"\");\n\n      if (life < 0) {\n        play.updateData = \"dead\";\n\n        for (const cell of ship.location) {\n          show.dead(document.getElementById(cell));\n        }\n\n        game.shipCount -= 1;\n\n        if (!game.shipCount) {\n          header.textContent = \"Game Over\";\n          header.style.color = \"red\";\n\n          if (play.shot < play.record || play.record === 0) {\n            localStorage.setItem(\"seaBattleRecord\", play.shot);\n            play.record = play.shot;\n            play.render();\n          }\n        }\n      }\n    }\n  }\n}\n\nconst init = () => {\n  enemy.addEventListener(\"click\", fire);\n  play.render();\n  game.generateShip();\n  again.addEventListener(\"click\", () => {\n    header.textContent = \"SEA BATTLE\";\n    header.style.color = \"black\";\n    play.shot = 0;\n    play.hit = 0;\n    play.dead = 0;\n    game.ships.length = 0;\n    game.shipCount = 0;\n    game.collision.clear();\n\n    for (const cell of enemy.querySelectorAll(\"td\")) {\n      cell.className = \"\";\n    }\n\n    play.render();\n    game.generateShip();\n  });\n  record.addEventListener(\"dblclick\", () => {\n    localStorage.clear();\n    play.record = 0;\n    play.render();\n  });\n};\n\ninit();\n\n//# sourceURL=webpack:///./src/js/main.js?");

/***/ })

/******/ });