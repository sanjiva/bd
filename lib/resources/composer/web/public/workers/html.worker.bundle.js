/******/ (function(modules) { // webpackBootstrap
/******/ 	this["webpackChunk"] = function webpackChunkCallback(chunkIds, moreModules) {
/******/ 		for(var moduleId in moreModules) {
/******/ 			modules[moduleId] = moreModules[moduleId];
/******/ 		}
/******/ 		while(chunkIds.length)
/******/ 			installedChunks[chunkIds.pop()] = 1;
/******/ 	};
/******/
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// object to store loaded chunks
/******/ 	// "1" means "already loaded"
/******/ 	var installedChunks = {
/******/ 		2: 1,
/******/ 		5: 1
/******/ 	};
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
/******/ 	// This file contains only the entry chunk.
/******/ 	// The chunk loading function for additional chunks
/******/ 	__webpack_require__.e = function requireEnsure(chunkId) {
/******/ 		return new Promise(function(resolve) {
/******/ 			// "1" is the signal for "already loaded"
/******/ 			if(!installedChunks[chunkId]) {
/******/ 				importScripts("" + chunkId + ".worker.bundle.js");
/******/ 			}
/******/ 			resolve();
/******/ 		});
/******/ 	};
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
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
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 110);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(global, process) {

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

/**
 * Extracted from https://github.com/winjs/winjs
 * Version: 4.4.0(ec3258a9f3a36805a187848984e3bb938044178d)
 * Copyright (c) Microsoft Corporation.
 * All Rights Reserved.
 * Licensed under the MIT License.
 */
var __winjs_exports;

(function () {

    var _modules = Object.create(null); //{};
    _modules["WinJS/Core/_WinJS"] = {};

    var _winjs = function _winjs(moduleId, deps, factory) {
        var exports = {};
        var exportsPassedIn = false;

        var depsValues = deps.map(function (dep) {
            if (dep === 'exports') {
                exportsPassedIn = true;
                return exports;
            }
            return _modules[dep];
        });

        var result = factory.apply({}, depsValues);

        _modules[moduleId] = exportsPassedIn ? exports : result;
    };

    _winjs("WinJS/Core/_Global", [], function () {
        "use strict";

        // Appease jshint
        /* global window, self, global */

        var globalObject = typeof window !== 'undefined' ? window : typeof self !== 'undefined' ? self : typeof global !== 'undefined' ? global : {};
        return globalObject;
    });

    _winjs("WinJS/Core/_BaseCoreUtils", ["WinJS/Core/_Global"], function baseCoreUtilsInit(_Global) {
        "use strict";

        var hasWinRT = !!_Global.Windows;

        function markSupportedForProcessing(func) {
            /// <signature helpKeyword="WinJS.Utilities.markSupportedForProcessing">
            /// <summary locid="WinJS.Utilities.markSupportedForProcessing">
            /// Marks a function as being compatible with declarative processing, such as WinJS.UI.processAll
            /// or WinJS.Binding.processAll.
            /// </summary>
            /// <param name="func" type="Function" locid="WinJS.Utilities.markSupportedForProcessing_p:func">
            /// The function to be marked as compatible with declarative processing.
            /// </param>
            /// <returns type="Function" locid="WinJS.Utilities.markSupportedForProcessing_returnValue">
            /// The input function.
            /// </returns>
            /// </signature>
            func.supportedForProcessing = true;
            return func;
        }

        var actualSetImmediate = null;

        return {
            hasWinRT: hasWinRT,
            markSupportedForProcessing: markSupportedForProcessing,
            _setImmediate: function _setImmediate(callback) {
                // BEGIN monaco change
                if (actualSetImmediate === null) {
                    if (_Global.setImmediate) {
                        actualSetImmediate = _Global.setImmediate.bind(_Global);
                    } else if (typeof process !== 'undefined' && typeof process.nextTick === 'function') {
                        actualSetImmediate = process.nextTick.bind(process);
                    } else {
                        actualSetImmediate = _Global.setTimeout.bind(_Global);
                    }
                }
                actualSetImmediate(callback);
                // END monaco change
            }
        };
    });
    _winjs("WinJS/Core/_WriteProfilerMark", ["WinJS/Core/_Global"], function profilerInit(_Global) {
        "use strict";

        return _Global.msWriteProfilerMark || function () {};
    });
    _winjs("WinJS/Core/_Base", ["WinJS/Core/_WinJS", "WinJS/Core/_Global", "WinJS/Core/_BaseCoreUtils", "WinJS/Core/_WriteProfilerMark"], function baseInit(_WinJS, _Global, _BaseCoreUtils, _WriteProfilerMark) {
        "use strict";

        function initializeProperties(target, members, prefix) {
            var keys = Object.keys(members);
            var isArray = Array.isArray(target);
            var properties;
            var i, len;
            for (i = 0, len = keys.length; i < len; i++) {
                var key = keys[i];
                var enumerable = key.charCodeAt(0) !== /*_*/95;
                var member = members[key];
                if (member && (typeof member === "undefined" ? "undefined" : _typeof(member)) === 'object') {
                    if (member.value !== undefined || typeof member.get === 'function' || typeof member.set === 'function') {
                        if (member.enumerable === undefined) {
                            member.enumerable = enumerable;
                        }
                        if (prefix && member.setName && typeof member.setName === 'function') {
                            member.setName(prefix + "." + key);
                        }
                        properties = properties || {};
                        properties[key] = member;
                        continue;
                    }
                }
                if (!enumerable) {
                    properties = properties || {};
                    properties[key] = { value: member, enumerable: enumerable, configurable: true, writable: true };
                    continue;
                }
                if (isArray) {
                    target.forEach(function (target) {
                        target[key] = member;
                    });
                } else {
                    target[key] = member;
                }
            }
            if (properties) {
                if (isArray) {
                    target.forEach(function (target) {
                        Object.defineProperties(target, properties);
                    });
                } else {
                    Object.defineProperties(target, properties);
                }
            }
        }

        (function () {

            var _rootNamespace = _WinJS;
            if (!_rootNamespace.Namespace) {
                _rootNamespace.Namespace = Object.create(Object.prototype);
            }

            function createNamespace(parentNamespace, name) {
                var currentNamespace = parentNamespace || {};
                if (name) {
                    var namespaceFragments = name.split(".");
                    if (currentNamespace === _Global && namespaceFragments[0] === "WinJS") {
                        currentNamespace = _WinJS;
                        namespaceFragments.splice(0, 1);
                    }
                    for (var i = 0, len = namespaceFragments.length; i < len; i++) {
                        var namespaceName = namespaceFragments[i];
                        if (!currentNamespace[namespaceName]) {
                            Object.defineProperty(currentNamespace, namespaceName, { value: {}, writable: false, enumerable: true, configurable: true });
                        }
                        currentNamespace = currentNamespace[namespaceName];
                    }
                }
                return currentNamespace;
            }

            function defineWithParent(parentNamespace, name, members) {
                /// <signature helpKeyword="WinJS.Namespace.defineWithParent">
                /// <summary locid="WinJS.Namespace.defineWithParent">
                /// Defines a new namespace with the specified name under the specified parent namespace.
                /// </summary>
                /// <param name="parentNamespace" type="Object" locid="WinJS.Namespace.defineWithParent_p:parentNamespace">
                /// The parent namespace.
                /// </param>
                /// <param name="name" type="String" locid="WinJS.Namespace.defineWithParent_p:name">
                /// The name of the new namespace.
                /// </param>
                /// <param name="members" type="Object" locid="WinJS.Namespace.defineWithParent_p:members">
                /// The members of the new namespace.
                /// </param>
                /// <returns type="Object" locid="WinJS.Namespace.defineWithParent_returnValue">
                /// The newly-defined namespace.
                /// </returns>
                /// </signature>
                var currentNamespace = createNamespace(parentNamespace, name);

                if (members) {
                    initializeProperties(currentNamespace, members, name || "<ANONYMOUS>");
                }

                return currentNamespace;
            }

            function define(name, members) {
                /// <signature helpKeyword="WinJS.Namespace.define">
                /// <summary locid="WinJS.Namespace.define">
                /// Defines a new namespace with the specified name.
                /// </summary>
                /// <param name="name" type="String" locid="WinJS.Namespace.define_p:name">
                /// The name of the namespace. This could be a dot-separated name for nested namespaces.
                /// </param>
                /// <param name="members" type="Object" locid="WinJS.Namespace.define_p:members">
                /// The members of the new namespace.
                /// </param>
                /// <returns type="Object" locid="WinJS.Namespace.define_returnValue">
                /// The newly-defined namespace.
                /// </returns>
                /// </signature>
                return defineWithParent(_Global, name, members);
            }

            var LazyStates = {
                uninitialized: 1,
                working: 2,
                initialized: 3
            };

            function lazy(f) {
                var name;
                var state = LazyStates.uninitialized;
                var result;
                return {
                    setName: function setName(value) {
                        name = value;
                    },
                    get: function get() {
                        switch (state) {
                            case LazyStates.initialized:
                                return result;

                            case LazyStates.uninitialized:
                                state = LazyStates.working;
                                try {
                                    _WriteProfilerMark("WinJS.Namespace._lazy:" + name + ",StartTM");
                                    result = f();
                                } finally {
                                    _WriteProfilerMark("WinJS.Namespace._lazy:" + name + ",StopTM");
                                    state = LazyStates.uninitialized;
                                }
                                f = null;
                                state = LazyStates.initialized;
                                return result;

                            case LazyStates.working:
                                throw "Illegal: reentrancy on initialization";

                            default:
                                throw "Illegal";
                        }
                    },
                    set: function set(value) {
                        switch (state) {
                            case LazyStates.working:
                                throw "Illegal: reentrancy on initialization";

                            default:
                                state = LazyStates.initialized;
                                result = value;
                                break;
                        }
                    },
                    enumerable: true,
                    configurable: true
                };
            }

            // helper for defining AMD module members
            function moduleDefine(exports, name, members) {
                var target = [exports];
                var publicNS = null;
                if (name) {
                    publicNS = createNamespace(_Global, name);
                    target.push(publicNS);
                }
                initializeProperties(target, members, name || "<ANONYMOUS>");
                return publicNS;
            }

            // Establish members of the "WinJS.Namespace" namespace
            Object.defineProperties(_rootNamespace.Namespace, {

                defineWithParent: { value: defineWithParent, writable: true, enumerable: true, configurable: true },

                define: { value: define, writable: true, enumerable: true, configurable: true },

                _lazy: { value: lazy, writable: true, enumerable: true, configurable: true },

                _moduleDefine: { value: moduleDefine, writable: true, enumerable: true, configurable: true }

            });
        })();

        (function () {

            function define(constructor, instanceMembers, staticMembers) {
                /// <signature helpKeyword="WinJS.Class.define">
                /// <summary locid="WinJS.Class.define">
                /// Defines a class using the given constructor and the specified instance members.
                /// </summary>
                /// <param name="constructor" type="Function" locid="WinJS.Class.define_p:constructor">
                /// A constructor function that is used to instantiate this class.
                /// </param>
                /// <param name="instanceMembers" type="Object" locid="WinJS.Class.define_p:instanceMembers">
                /// The set of instance fields, properties, and methods made available on the class.
                /// </param>
                /// <param name="staticMembers" type="Object" locid="WinJS.Class.define_p:staticMembers">
                /// The set of static fields, properties, and methods made available on the class.
                /// </param>
                /// <returns type="Function" locid="WinJS.Class.define_returnValue">
                /// The newly-defined class.
                /// </returns>
                /// </signature>
                constructor = constructor || function () {};
                _BaseCoreUtils.markSupportedForProcessing(constructor);
                if (instanceMembers) {
                    initializeProperties(constructor.prototype, instanceMembers);
                }
                if (staticMembers) {
                    initializeProperties(constructor, staticMembers);
                }
                return constructor;
            }

            function derive(baseClass, constructor, instanceMembers, staticMembers) {
                /// <signature helpKeyword="WinJS.Class.derive">
                /// <summary locid="WinJS.Class.derive">
                /// Creates a sub-class based on the supplied baseClass parameter, using prototypal inheritance.
                /// </summary>
                /// <param name="baseClass" type="Function" locid="WinJS.Class.derive_p:baseClass">
                /// The class to inherit from.
                /// </param>
                /// <param name="constructor" type="Function" locid="WinJS.Class.derive_p:constructor">
                /// A constructor function that is used to instantiate this class.
                /// </param>
                /// <param name="instanceMembers" type="Object" locid="WinJS.Class.derive_p:instanceMembers">
                /// The set of instance fields, properties, and methods to be made available on the class.
                /// </param>
                /// <param name="staticMembers" type="Object" locid="WinJS.Class.derive_p:staticMembers">
                /// The set of static fields, properties, and methods to be made available on the class.
                /// </param>
                /// <returns type="Function" locid="WinJS.Class.derive_returnValue">
                /// The newly-defined class.
                /// </returns>
                /// </signature>
                if (baseClass) {
                    constructor = constructor || function () {};
                    var basePrototype = baseClass.prototype;
                    constructor.prototype = Object.create(basePrototype);
                    _BaseCoreUtils.markSupportedForProcessing(constructor);
                    Object.defineProperty(constructor.prototype, "constructor", { value: constructor, writable: true, configurable: true, enumerable: true });
                    if (instanceMembers) {
                        initializeProperties(constructor.prototype, instanceMembers);
                    }
                    if (staticMembers) {
                        initializeProperties(constructor, staticMembers);
                    }
                    return constructor;
                } else {
                    return define(constructor, instanceMembers, staticMembers);
                }
            }

            function mix(constructor) {
                /// <signature helpKeyword="WinJS.Class.mix">
                /// <summary locid="WinJS.Class.mix">
                /// Defines a class using the given constructor and the union of the set of instance members
                /// specified by all the mixin objects. The mixin parameter list is of variable length.
                /// </summary>
                /// <param name="constructor" locid="WinJS.Class.mix_p:constructor">
                /// A constructor function that is used to instantiate this class.
                /// </param>
                /// <returns type="Function" locid="WinJS.Class.mix_returnValue">
                /// The newly-defined class.
                /// </returns>
                /// </signature>
                constructor = constructor || function () {};
                var i, len;
                for (i = 1, len = arguments.length; i < len; i++) {
                    initializeProperties(constructor.prototype, arguments[i]);
                }
                return constructor;
            }

            // Establish members of "WinJS.Class" namespace
            _WinJS.Namespace.define("WinJS.Class", {
                define: define,
                derive: derive,
                mix: mix
            });
        })();

        return {
            Namespace: _WinJS.Namespace,
            Class: _WinJS.Class
        };
    });
    _winjs("WinJS/Core/_ErrorFromName", ["WinJS/Core/_Base"], function errorsInit(_Base) {
        "use strict";

        var ErrorFromName = _Base.Class.derive(Error, function (name, message) {
            /// <signature helpKeyword="WinJS.ErrorFromName">
            /// <summary locid="WinJS.ErrorFromName">
            /// Creates an Error object with the specified name and message properties.
            /// </summary>
            /// <param name="name" type="String" locid="WinJS.ErrorFromName_p:name">The name of this error. The name is meant to be consumed programmatically and should not be localized.</param>
            /// <param name="message" type="String" optional="true" locid="WinJS.ErrorFromName_p:message">The message for this error. The message is meant to be consumed by humans and should be localized.</param>
            /// <returns type="Error" locid="WinJS.ErrorFromName_returnValue">Error instance with .name and .message properties populated</returns>
            /// </signature>
            this.name = name;
            this.message = message || name;
        }, {
            /* empty */
        }, {
            supportedForProcessing: false
        });

        _Base.Namespace.define("WinJS", {
            // ErrorFromName establishes a simple pattern for returning error codes.
            //
            ErrorFromName: ErrorFromName
        });

        return ErrorFromName;
    });

    _winjs("WinJS/Core/_Events", ["exports", "WinJS/Core/_Base"], function eventsInit(exports, _Base) {
        "use strict";

        function createEventProperty(name) {
            var eventPropStateName = "_on" + name + "state";

            return {
                get: function get() {
                    var state = this[eventPropStateName];
                    return state && state.userHandler;
                },
                set: function set(handler) {
                    var state = this[eventPropStateName];
                    if (handler) {
                        if (!state) {
                            state = { wrapper: function wrapper(evt) {
                                    return state.userHandler(evt);
                                }, userHandler: handler };
                            Object.defineProperty(this, eventPropStateName, { value: state, enumerable: false, writable: true, configurable: true });
                            this.addEventListener(name, state.wrapper, false);
                        }
                        state.userHandler = handler;
                    } else if (state) {
                        this.removeEventListener(name, state.wrapper, false);
                        this[eventPropStateName] = null;
                    }
                },
                enumerable: true
            };
        }

        function createEventProperties() {
            /// <signature helpKeyword="WinJS.Utilities.createEventProperties">
            /// <summary locid="WinJS.Utilities.createEventProperties">
            /// Creates an object that has one property for each name passed to the function.
            /// </summary>
            /// <param name="events" locid="WinJS.Utilities.createEventProperties_p:events">
            /// A variable list of property names.
            /// </param>
            /// <returns type="Object" locid="WinJS.Utilities.createEventProperties_returnValue">
            /// The object with the specified properties. The names of the properties are prefixed with 'on'.
            /// </returns>
            /// </signature>
            var props = {};
            for (var i = 0, len = arguments.length; i < len; i++) {
                var name = arguments[i];
                props["on" + name] = createEventProperty(name);
            }
            return props;
        }

        var EventMixinEvent = _Base.Class.define(function EventMixinEvent_ctor(type, detail, target) {
            this.detail = detail;
            this.target = target;
            this.timeStamp = Date.now();
            this.type = type;
        }, {
            bubbles: { value: false, writable: false },
            cancelable: { value: false, writable: false },
            currentTarget: {
                get: function get() {
                    return this.target;
                }
            },
            defaultPrevented: {
                get: function get() {
                    return this._preventDefaultCalled;
                }
            },
            trusted: { value: false, writable: false },
            eventPhase: { value: 0, writable: false },
            target: null,
            timeStamp: null,
            type: null,

            preventDefault: function preventDefault() {
                this._preventDefaultCalled = true;
            },
            stopImmediatePropagation: function stopImmediatePropagation() {
                this._stopImmediatePropagationCalled = true;
            },
            stopPropagation: function stopPropagation() {}
        }, {
            supportedForProcessing: false
        });

        var eventMixin = {
            _listeners: null,

            addEventListener: function addEventListener(type, listener, useCapture) {
                /// <signature helpKeyword="WinJS.Utilities.eventMixin.addEventListener">
                /// <summary locid="WinJS.Utilities.eventMixin.addEventListener">
                /// Adds an event listener to the control.
                /// </summary>
                /// <param name="type" locid="WinJS.Utilities.eventMixin.addEventListener_p:type">
                /// The type (name) of the event.
                /// </param>
                /// <param name="listener" locid="WinJS.Utilities.eventMixin.addEventListener_p:listener">
                /// The listener to invoke when the event is raised.
                /// </param>
                /// <param name="useCapture" locid="WinJS.Utilities.eventMixin.addEventListener_p:useCapture">
                /// if true initiates capture, otherwise false.
                /// </param>
                /// </signature>
                useCapture = useCapture || false;
                this._listeners = this._listeners || {};
                var eventListeners = this._listeners[type] = this._listeners[type] || [];
                for (var i = 0, len = eventListeners.length; i < len; i++) {
                    var l = eventListeners[i];
                    if (l.useCapture === useCapture && l.listener === listener) {
                        return;
                    }
                }
                eventListeners.push({ listener: listener, useCapture: useCapture });
            },
            dispatchEvent: function dispatchEvent(type, details) {
                /// <signature helpKeyword="WinJS.Utilities.eventMixin.dispatchEvent">
                /// <summary locid="WinJS.Utilities.eventMixin.dispatchEvent">
                /// Raises an event of the specified type and with the specified additional properties.
                /// </summary>
                /// <param name="type" locid="WinJS.Utilities.eventMixin.dispatchEvent_p:type">
                /// The type (name) of the event.
                /// </param>
                /// <param name="details" locid="WinJS.Utilities.eventMixin.dispatchEvent_p:details">
                /// The set of additional properties to be attached to the event object when the event is raised.
                /// </param>
                /// <returns type="Boolean" locid="WinJS.Utilities.eventMixin.dispatchEvent_returnValue">
                /// true if preventDefault was called on the event.
                /// </returns>
                /// </signature>
                var listeners = this._listeners && this._listeners[type];
                if (listeners) {
                    var eventValue = new EventMixinEvent(type, details, this);
                    // Need to copy the array to protect against people unregistering while we are dispatching
                    listeners = listeners.slice(0, listeners.length);
                    for (var i = 0, len = listeners.length; i < len && !eventValue._stopImmediatePropagationCalled; i++) {
                        listeners[i].listener(eventValue);
                    }
                    return eventValue.defaultPrevented || false;
                }
                return false;
            },
            removeEventListener: function removeEventListener(type, listener, useCapture) {
                /// <signature helpKeyword="WinJS.Utilities.eventMixin.removeEventListener">
                /// <summary locid="WinJS.Utilities.eventMixin.removeEventListener">
                /// Removes an event listener from the control.
                /// </summary>
                /// <param name="type" locid="WinJS.Utilities.eventMixin.removeEventListener_p:type">
                /// The type (name) of the event.
                /// </param>
                /// <param name="listener" locid="WinJS.Utilities.eventMixin.removeEventListener_p:listener">
                /// The listener to remove.
                /// </param>
                /// <param name="useCapture" locid="WinJS.Utilities.eventMixin.removeEventListener_p:useCapture">
                /// Specifies whether to initiate capture.
                /// </param>
                /// </signature>
                useCapture = useCapture || false;
                var listeners = this._listeners && this._listeners[type];
                if (listeners) {
                    for (var i = 0, len = listeners.length; i < len; i++) {
                        var l = listeners[i];
                        if (l.listener === listener && l.useCapture === useCapture) {
                            listeners.splice(i, 1);
                            if (listeners.length === 0) {
                                delete this._listeners[type];
                            }
                            // Only want to remove one element for each call to removeEventListener
                            break;
                        }
                    }
                }
            }
        };

        _Base.Namespace._moduleDefine(exports, "WinJS.Utilities", {
            _createEventProperty: createEventProperty,
            createEventProperties: createEventProperties,
            eventMixin: eventMixin
        });
    });

    _winjs("WinJS/Core/_Trace", ["WinJS/Core/_Global"], function traceInit(_Global) {
        "use strict";

        function nop(v) {
            return v;
        }

        return {
            _traceAsyncOperationStarting: _Global.Debug && _Global.Debug.msTraceAsyncOperationStarting && _Global.Debug.msTraceAsyncOperationStarting.bind(_Global.Debug) || nop,
            _traceAsyncOperationCompleted: _Global.Debug && _Global.Debug.msTraceAsyncOperationCompleted && _Global.Debug.msTraceAsyncOperationCompleted.bind(_Global.Debug) || nop,
            _traceAsyncCallbackStarting: _Global.Debug && _Global.Debug.msTraceAsyncCallbackStarting && _Global.Debug.msTraceAsyncCallbackStarting.bind(_Global.Debug) || nop,
            _traceAsyncCallbackCompleted: _Global.Debug && _Global.Debug.msTraceAsyncCallbackCompleted && _Global.Debug.msTraceAsyncCallbackCompleted.bind(_Global.Debug) || nop
        };
    });
    _winjs("WinJS/Promise/_StateMachine", ["WinJS/Core/_Global", "WinJS/Core/_BaseCoreUtils", "WinJS/Core/_Base", "WinJS/Core/_ErrorFromName", "WinJS/Core/_Events", "WinJS/Core/_Trace"], function promiseStateMachineInit(_Global, _BaseCoreUtils, _Base, _ErrorFromName, _Events, _Trace) {
        "use strict";

        _Global.Debug && (_Global.Debug.setNonUserCodeExceptions = true);

        var ListenerType = _Base.Class.mix(_Base.Class.define(null, {/*empty*/}, { supportedForProcessing: false }), _Events.eventMixin);
        var promiseEventListeners = new ListenerType();
        // make sure there is a listeners collection so that we can do a more trivial check below
        promiseEventListeners._listeners = {};
        var errorET = "error";
        var canceledName = "Canceled";
        var tagWithStack = false;
        var tag = {
            promise: 0x01,
            thenPromise: 0x02,
            errorPromise: 0x04,
            exceptionPromise: 0x08,
            completePromise: 0x10
        };
        tag.all = tag.promise | tag.thenPromise | tag.errorPromise | tag.exceptionPromise | tag.completePromise;

        //
        // Global error counter, for each error which enters the system we increment this once and then
        // the error number travels with the error as it traverses the tree of potential handlers.
        //
        // When someone has registered to be told about errors (WinJS.Promise.callonerror) promises
        // which are in error will get tagged with a ._errorId field. This tagged field is the
        // contract by which nested promises with errors will be identified as chaining for the
        // purposes of the callonerror semantics. If a nested promise in error is encountered without
        // a ._errorId it will be assumed to be foreign and treated as an interop boundary and
        // a new error id will be minted.
        //
        var error_number = 1;

        //
        // The state machine has a interesting hiccup in it with regards to notification, in order
        // to flatten out notification and avoid recursion for synchronous completion we have an
        // explicit set of *_notify states which are responsible for notifying their entire tree
        // of children. They can do this because they know that immediate children are always
        // ThenPromise instances and we can therefore reach into their state to access the
        // _listeners collection.
        //
        // So, what happens is that a Promise will be fulfilled through the _completed or _error
        // messages at which point it will enter a *_notify state and be responsible for to move
        // its children into an (as appropriate) success or error state and also notify that child's
        // listeners of the state transition, until leaf notes are reached.
        //

        var state_created, // -> working
        state_working, // -> error | error_notify | success | success_notify | canceled | waiting
        state_waiting, // -> error | error_notify | success | success_notify | waiting_canceled
        state_waiting_canceled, // -> error | error_notify | success | success_notify | canceling
        state_canceled, // -> error | error_notify | success | success_notify | canceling
        state_canceling, // -> error_notify
        state_success_notify, // -> success
        state_success, // -> .
        state_error_notify, // -> error
        state_error; // -> .

        // Noop function, used in the various states to indicate that they don't support a given
        // message. Named with the somewhat cute name '_' because it reads really well in the states.

        function _() {}

        // Initial state
        //
        state_created = {
            name: "created",
            enter: function enter(promise) {
                promise._setState(state_working);
            },
            cancel: _,
            done: _,
            then: _,
            _completed: _,
            _error: _,
            _notify: _,
            _progress: _,
            _setCompleteValue: _,
            _setErrorValue: _
        };

        // Ready state, waiting for a message (completed/error/progress), able to be canceled
        //
        state_working = {
            name: "working",
            enter: _,
            cancel: function cancel(promise) {
                promise._setState(state_canceled);
            },
            done: done,
            then: then,
            _completed: completed,
            _error: error,
            _notify: _,
            _progress: progress,
            _setCompleteValue: setCompleteValue,
            _setErrorValue: setErrorValue
        };

        // Waiting state, if a promise is completed with a value which is itself a promise
        // (has a then() method) it signs up to be informed when that child promise is
        // fulfilled at which point it will be fulfilled with that value.
        //
        state_waiting = {
            name: "waiting",
            enter: function enter(promise) {
                var waitedUpon = promise._value;
                // We can special case our own intermediate promises which are not in a
                //  terminal state by just pushing this promise as a listener without
                //  having to create new indirection functions
                if (waitedUpon instanceof ThenPromise && waitedUpon._state !== state_error && waitedUpon._state !== state_success) {
                    pushListener(waitedUpon, { promise: promise });
                } else {
                    var error = function error(value) {
                        if (waitedUpon._errorId) {
                            promise._chainedError(value, waitedUpon);
                        } else {
                            // Because this is an interop boundary we want to indicate that this
                            //  error has been handled by the promise infrastructure before we
                            //  begin a new handling chain.
                            //
                            callonerror(promise, value, detailsForHandledError, waitedUpon, error);
                            promise._error(value);
                        }
                    };
                    error.handlesOnError = true;
                    waitedUpon.then(promise._completed.bind(promise), error, promise._progress.bind(promise));
                }
            },
            cancel: function cancel(promise) {
                promise._setState(state_waiting_canceled);
            },
            done: done,
            then: then,
            _completed: completed,
            _error: error,
            _notify: _,
            _progress: progress,
            _setCompleteValue: setCompleteValue,
            _setErrorValue: setErrorValue
        };

        // Waiting canceled state, when a promise has been in a waiting state and receives a
        // request to cancel its pending work it will forward that request to the child promise
        // and then waits to be informed of the result. This promise moves itself into the
        // canceling state but understands that the child promise may instead push it to a
        // different state.
        //
        state_waiting_canceled = {
            name: "waiting_canceled",
            enter: function enter(promise) {
                // Initiate a transition to canceling. Triggering a cancel on the promise
                // that we are waiting upon may result in a different state transition
                // before the state machine pump runs again.
                promise._setState(state_canceling);
                var waitedUpon = promise._value;
                if (waitedUpon.cancel) {
                    waitedUpon.cancel();
                }
            },
            cancel: _,
            done: done,
            then: then,
            _completed: completed,
            _error: error,
            _notify: _,
            _progress: progress,
            _setCompleteValue: setCompleteValue,
            _setErrorValue: setErrorValue
        };

        // Canceled state, moves to the canceling state and then tells the promise to do
        // whatever it might need to do on cancelation.
        //
        state_canceled = {
            name: "canceled",
            enter: function enter(promise) {
                // Initiate a transition to canceling. The _cancelAction may change the state
                // before the state machine pump runs again.
                promise._setState(state_canceling);
                promise._cancelAction();
            },
            cancel: _,
            done: done,
            then: then,
            _completed: completed,
            _error: error,
            _notify: _,
            _progress: progress,
            _setCompleteValue: setCompleteValue,
            _setErrorValue: setErrorValue
        };

        // Canceling state, commits to the promise moving to an error state with an error
        // object whose 'name' and 'message' properties contain the string "Canceled"
        //
        state_canceling = {
            name: "canceling",
            enter: function enter(promise) {
                var error = new Error(canceledName);
                error.name = error.message;
                promise._value = error;
                promise._setState(state_error_notify);
            },
            cancel: _,
            done: _,
            then: _,
            _completed: _,
            _error: _,
            _notify: _,
            _progress: _,
            _setCompleteValue: _,
            _setErrorValue: _
        };

        // Success notify state, moves a promise to the success state and notifies all children
        //
        state_success_notify = {
            name: "complete_notify",
            enter: function enter(promise) {
                promise.done = CompletePromise.prototype.done;
                promise.then = CompletePromise.prototype.then;
                if (promise._listeners) {
                    var queue = [promise];
                    var p;
                    while (queue.length) {
                        p = queue.shift();
                        p._state._notify(p, queue);
                    }
                }
                promise._setState(state_success);
            },
            cancel: _,
            done: null, /*error to get here */
            then: null, /*error to get here */
            _completed: _,
            _error: _,
            _notify: notifySuccess,
            _progress: _,
            _setCompleteValue: _,
            _setErrorValue: _
        };

        // Success state, moves a promise to the success state and does NOT notify any children.
        // Some upstream promise is owning the notification pass.
        //
        state_success = {
            name: "success",
            enter: function enter(promise) {
                promise.done = CompletePromise.prototype.done;
                promise.then = CompletePromise.prototype.then;
                promise._cleanupAction();
            },
            cancel: _,
            done: null, /*error to get here */
            then: null, /*error to get here */
            _completed: _,
            _error: _,
            _notify: notifySuccess,
            _progress: _,
            _setCompleteValue: _,
            _setErrorValue: _
        };

        // Error notify state, moves a promise to the error state and notifies all children
        //
        state_error_notify = {
            name: "error_notify",
            enter: function enter(promise) {
                promise.done = ErrorPromise.prototype.done;
                promise.then = ErrorPromise.prototype.then;
                if (promise._listeners) {
                    var queue = [promise];
                    var p;
                    while (queue.length) {
                        p = queue.shift();
                        p._state._notify(p, queue);
                    }
                }
                promise._setState(state_error);
            },
            cancel: _,
            done: null, /*error to get here*/
            then: null, /*error to get here*/
            _completed: _,
            _error: _,
            _notify: notifyError,
            _progress: _,
            _setCompleteValue: _,
            _setErrorValue: _
        };

        // Error state, moves a promise to the error state and does NOT notify any children.
        // Some upstream promise is owning the notification pass.
        //
        state_error = {
            name: "error",
            enter: function enter(promise) {
                promise.done = ErrorPromise.prototype.done;
                promise.then = ErrorPromise.prototype.then;
                promise._cleanupAction();
            },
            cancel: _,
            done: null, /*error to get here*/
            then: null, /*error to get here*/
            _completed: _,
            _error: _,
            _notify: notifyError,
            _progress: _,
            _setCompleteValue: _,
            _setErrorValue: _
        };

        //
        // The statemachine implementation follows a very particular pattern, the states are specified
        // as static stateless bags of functions which are then indirected through the state machine
        // instance (a Promise). As such all of the functions on each state have the promise instance
        // passed to them explicitly as a parameter and the Promise instance members do a little
        // dance where they indirect through the state and insert themselves in the argument list.
        //
        // We could instead call directly through the promise states however then every caller
        // would have to remember to do things like pumping the state machine to catch state transitions.
        //

        var PromiseStateMachine = _Base.Class.define(null, {
            _listeners: null,
            _nextState: null,
            _state: null,
            _value: null,

            cancel: function cancel() {
                /// <signature helpKeyword="WinJS.PromiseStateMachine.cancel">
                /// <summary locid="WinJS.PromiseStateMachine.cancel">
                /// Attempts to cancel the fulfillment of a promised value. If the promise hasn't
                /// already been fulfilled and cancellation is supported, the promise enters
                /// the error state with a value of Error("Canceled").
                /// </summary>
                /// </signature>
                this._state.cancel(this);
                this._run();
            },
            done: function Promise_done(onComplete, onError, onProgress) {
                /// <signature helpKeyword="WinJS.PromiseStateMachine.done">
                /// <summary locid="WinJS.PromiseStateMachine.done">
                /// Allows you to specify the work to be done on the fulfillment of the promised value,
                /// the error handling to be performed if the promise fails to fulfill
                /// a value, and the handling of progress notifications along the way.
                ///
                /// After the handlers have finished executing, this function throws any error that would have been returned
                /// from then() as a promise in the error state.
                /// </summary>
                /// <param name='onComplete' type='Function' locid="WinJS.PromiseStateMachine.done_p:onComplete">
                /// The function to be called if the promise is fulfilled successfully with a value.
                /// The fulfilled value is passed as the single argument. If the value is null,
                /// the fulfilled value is returned. The value returned
                /// from the function becomes the fulfilled value of the promise returned by
                /// then(). If an exception is thrown while executing the function, the promise returned
                /// by then() moves into the error state.
                /// </param>
                /// <param name='onError' type='Function' optional='true' locid="WinJS.PromiseStateMachine.done_p:onError">
                /// The function to be called if the promise is fulfilled with an error. The error
                /// is passed as the single argument. If it is null, the error is forwarded.
                /// The value returned from the function is the fulfilled value of the promise returned by then().
                /// </param>
                /// <param name='onProgress' type='Function' optional='true' locid="WinJS.PromiseStateMachine.done_p:onProgress">
                /// the function to be called if the promise reports progress. Data about the progress
                /// is passed as the single argument. Promises are not required to support
                /// progress.
                /// </param>
                /// </signature>
                this._state.done(this, onComplete, onError, onProgress);
            },
            then: function Promise_then(onComplete, onError, onProgress) {
                /// <signature helpKeyword="WinJS.PromiseStateMachine.then">
                /// <summary locid="WinJS.PromiseStateMachine.then">
                /// Allows you to specify the work to be done on the fulfillment of the promised value,
                /// the error handling to be performed if the promise fails to fulfill
                /// a value, and the handling of progress notifications along the way.
                /// </summary>
                /// <param name='onComplete' type='Function' locid="WinJS.PromiseStateMachine.then_p:onComplete">
                /// The function to be called if the promise is fulfilled successfully with a value.
                /// The value is passed as the single argument. If the value is null, the value is returned.
                /// The value returned from the function becomes the fulfilled value of the promise returned by
                /// then(). If an exception is thrown while this function is being executed, the promise returned
                /// by then() moves into the error state.
                /// </param>
                /// <param name='onError' type='Function' optional='true' locid="WinJS.PromiseStateMachine.then_p:onError">
                /// The function to be called if the promise is fulfilled with an error. The error
                /// is passed as the single argument. If it is null, the error is forwarded.
                /// The value returned from the function becomes the fulfilled value of the promise returned by then().
                /// </param>
                /// <param name='onProgress' type='Function' optional='true' locid="WinJS.PromiseStateMachine.then_p:onProgress">
                /// The function to be called if the promise reports progress. Data about the progress
                /// is passed as the single argument. Promises are not required to support
                /// progress.
                /// </param>
                /// <returns type="WinJS.Promise" locid="WinJS.PromiseStateMachine.then_returnValue">
                /// The promise whose value is the result of executing the complete or
                /// error function.
                /// </returns>
                /// </signature>
                return this._state.then(this, onComplete, onError, onProgress);
            },

            _chainedError: function _chainedError(value, context) {
                var result = this._state._error(this, value, detailsForChainedError, context);
                this._run();
                return result;
            },
            _completed: function _completed(value) {
                var result = this._state._completed(this, value);
                this._run();
                return result;
            },
            _error: function _error(value) {
                var result = this._state._error(this, value, detailsForError);
                this._run();
                return result;
            },
            _progress: function _progress(value) {
                this._state._progress(this, value);
            },
            _setState: function _setState(state) {
                this._nextState = state;
            },
            _setCompleteValue: function _setCompleteValue(value) {
                this._state._setCompleteValue(this, value);
                this._run();
            },
            _setChainedErrorValue: function _setChainedErrorValue(value, context) {
                var result = this._state._setErrorValue(this, value, detailsForChainedError, context);
                this._run();
                return result;
            },
            _setExceptionValue: function _setExceptionValue(value) {
                var result = this._state._setErrorValue(this, value, detailsForException);
                this._run();
                return result;
            },
            _run: function _run() {
                while (this._nextState) {
                    this._state = this._nextState;
                    this._nextState = null;
                    this._state.enter(this);
                }
            }
        }, {
            supportedForProcessing: false
        });

        //
        // Implementations of shared state machine code.
        //

        function completed(promise, value) {
            var targetState;
            if (value && (typeof value === "undefined" ? "undefined" : _typeof(value)) === "object" && typeof value.then === "function") {
                targetState = state_waiting;
            } else {
                targetState = state_success_notify;
            }
            promise._value = value;
            promise._setState(targetState);
        }
        function createErrorDetails(exception, error, promise, id, parent, handler) {
            return {
                exception: exception,
                error: error,
                promise: promise,
                handler: handler,
                id: id,
                parent: parent
            };
        }
        function detailsForHandledError(promise, errorValue, context, handler) {
            var exception = context._isException;
            var errorId = context._errorId;
            return createErrorDetails(exception ? errorValue : null, exception ? null : errorValue, promise, errorId, context, handler);
        }
        function detailsForChainedError(promise, errorValue, context) {
            var exception = context._isException;
            var errorId = context._errorId;
            setErrorInfo(promise, errorId, exception);
            return createErrorDetails(exception ? errorValue : null, exception ? null : errorValue, promise, errorId, context);
        }
        function detailsForError(promise, errorValue) {
            var errorId = ++error_number;
            setErrorInfo(promise, errorId);
            return createErrorDetails(null, errorValue, promise, errorId);
        }
        function detailsForException(promise, exceptionValue) {
            var errorId = ++error_number;
            setErrorInfo(promise, errorId, true);
            return createErrorDetails(exceptionValue, null, promise, errorId);
        }
        function done(promise, onComplete, onError, onProgress) {
            var asyncOpID = _Trace._traceAsyncOperationStarting("WinJS.Promise.done");
            pushListener(promise, { c: onComplete, e: onError, p: onProgress, asyncOpID: asyncOpID });
        }
        function error(promise, value, onerrorDetails, context) {
            promise._value = value;
            callonerror(promise, value, onerrorDetails, context);
            promise._setState(state_error_notify);
        }
        function notifySuccess(promise, queue) {
            var value = promise._value;
            var listeners = promise._listeners;
            if (!listeners) {
                return;
            }
            promise._listeners = null;
            var i, len;
            for (i = 0, len = Array.isArray(listeners) ? listeners.length : 1; i < len; i++) {
                var listener = len === 1 ? listeners : listeners[i];
                var onComplete = listener.c;
                var target = listener.promise;

                _Trace._traceAsyncOperationCompleted(listener.asyncOpID, _Global.Debug && _Global.Debug.MS_ASYNC_OP_STATUS_SUCCESS);

                if (target) {
                    _Trace._traceAsyncCallbackStarting(listener.asyncOpID);
                    try {
                        target._setCompleteValue(onComplete ? onComplete(value) : value);
                    } catch (ex) {
                        target._setExceptionValue(ex);
                    } finally {
                        _Trace._traceAsyncCallbackCompleted();
                    }
                    if (target._state !== state_waiting && target._listeners) {
                        queue.push(target);
                    }
                } else {
                    CompletePromise.prototype.done.call(promise, onComplete);
                }
            }
        }
        function notifyError(promise, queue) {
            var value = promise._value;
            var listeners = promise._listeners;
            if (!listeners) {
                return;
            }
            promise._listeners = null;
            var i, len;
            for (i = 0, len = Array.isArray(listeners) ? listeners.length : 1; i < len; i++) {
                var listener = len === 1 ? listeners : listeners[i];
                var onError = listener.e;
                var target = listener.promise;

                var errorID = _Global.Debug && (value && value.name === canceledName ? _Global.Debug.MS_ASYNC_OP_STATUS_CANCELED : _Global.Debug.MS_ASYNC_OP_STATUS_ERROR);
                _Trace._traceAsyncOperationCompleted(listener.asyncOpID, errorID);

                if (target) {
                    var asyncCallbackStarted = false;
                    try {
                        if (onError) {
                            _Trace._traceAsyncCallbackStarting(listener.asyncOpID);
                            asyncCallbackStarted = true;
                            if (!onError.handlesOnError) {
                                callonerror(target, value, detailsForHandledError, promise, onError);
                            }
                            target._setCompleteValue(onError(value));
                        } else {
                            target._setChainedErrorValue(value, promise);
                        }
                    } catch (ex) {
                        target._setExceptionValue(ex);
                    } finally {
                        if (asyncCallbackStarted) {
                            _Trace._traceAsyncCallbackCompleted();
                        }
                    }
                    if (target._state !== state_waiting && target._listeners) {
                        queue.push(target);
                    }
                } else {
                    ErrorPromise.prototype.done.call(promise, null, onError);
                }
            }
        }
        function callonerror(promise, value, onerrorDetailsGenerator, context, handler) {
            if (promiseEventListeners._listeners[errorET]) {
                if (value instanceof Error && value.message === canceledName) {
                    return;
                }
                promiseEventListeners.dispatchEvent(errorET, onerrorDetailsGenerator(promise, value, context, handler));
            }
        }
        function progress(promise, value) {
            var listeners = promise._listeners;
            if (listeners) {
                var i, len;
                for (i = 0, len = Array.isArray(listeners) ? listeners.length : 1; i < len; i++) {
                    var listener = len === 1 ? listeners : listeners[i];
                    var onProgress = listener.p;
                    if (onProgress) {
                        try {
                            onProgress(value);
                        } catch (ex) {}
                    }
                    if (!(listener.c || listener.e) && listener.promise) {
                        listener.promise._progress(value);
                    }
                }
            }
        }
        function pushListener(promise, listener) {
            var listeners = promise._listeners;
            if (listeners) {
                // We may have either a single listener (which will never be wrapped in an array)
                // or 2+ listeners (which will be wrapped). Since we are now adding one more listener
                // we may have to wrap the single listener before adding the second.
                listeners = Array.isArray(listeners) ? listeners : [listeners];
                listeners.push(listener);
            } else {
                listeners = listener;
            }
            promise._listeners = listeners;
        }
        // The difference beween setCompleteValue()/setErrorValue() and complete()/error() is that setXXXValue() moves
        // a promise directly to the success/error state without starting another notification pass (because one
        // is already ongoing).
        function setErrorInfo(promise, errorId, isException) {
            promise._isException = isException || false;
            promise._errorId = errorId;
        }
        function setErrorValue(promise, value, onerrorDetails, context) {
            promise._value = value;
            callonerror(promise, value, onerrorDetails, context);
            promise._setState(state_error);
        }
        function setCompleteValue(promise, value) {
            var targetState;
            if (value && (typeof value === "undefined" ? "undefined" : _typeof(value)) === "object" && typeof value.then === "function") {
                targetState = state_waiting;
            } else {
                targetState = state_success;
            }
            promise._value = value;
            promise._setState(targetState);
        }
        function then(promise, onComplete, onError, onProgress) {
            var result = new ThenPromise(promise);
            var asyncOpID = _Trace._traceAsyncOperationStarting("WinJS.Promise.then");
            pushListener(promise, { promise: result, c: onComplete, e: onError, p: onProgress, asyncOpID: asyncOpID });
            return result;
        }

        //
        // Internal implementation detail promise, ThenPromise is created when a promise needs
        // to be returned from a then() method.
        //
        var ThenPromise = _Base.Class.derive(PromiseStateMachine, function (creator) {

            if (tagWithStack && (tagWithStack === true || tagWithStack & tag.thenPromise)) {
                this._stack = Promise._getStack();
            }

            this._creator = creator;
            this._setState(state_created);
            this._run();
        }, {
            _creator: null,

            _cancelAction: function _cancelAction() {
                if (this._creator) {
                    this._creator.cancel();
                }
            },
            _cleanupAction: function _cleanupAction() {
                this._creator = null;
            }
        }, {
            supportedForProcessing: false
        });

        //
        // Slim promise implementations for already completed promises, these are created
        // under the hood on synchronous completion paths as well as by WinJS.Promise.wrap
        // and WinJS.Promise.wrapError.
        //

        var ErrorPromise = _Base.Class.define(function ErrorPromise_ctor(value) {

            if (tagWithStack && (tagWithStack === true || tagWithStack & tag.errorPromise)) {
                this._stack = Promise._getStack();
            }

            this._value = value;
            callonerror(this, value, detailsForError);
        }, {
            cancel: function cancel() {
                /// <signature helpKeyword="WinJS.PromiseStateMachine.cancel">
                /// <summary locid="WinJS.PromiseStateMachine.cancel">
                /// Attempts to cancel the fulfillment of a promised value. If the promise hasn't
                /// already been fulfilled and cancellation is supported, the promise enters
                /// the error state with a value of Error("Canceled").
                /// </summary>
                /// </signature>
            },
            done: function ErrorPromise_done(unused, onError) {
                /// <signature helpKeyword="WinJS.PromiseStateMachine.done">
                /// <summary locid="WinJS.PromiseStateMachine.done">
                /// Allows you to specify the work to be done on the fulfillment of the promised value,
                /// the error handling to be performed if the promise fails to fulfill
                /// a value, and the handling of progress notifications along the way.
                ///
                /// After the handlers have finished executing, this function throws any error that would have been returned
                /// from then() as a promise in the error state.
                /// </summary>
                /// <param name='onComplete' type='Function' locid="WinJS.PromiseStateMachine.done_p:onComplete">
                /// The function to be called if the promise is fulfilled successfully with a value.
                /// The fulfilled value is passed as the single argument. If the value is null,
                /// the fulfilled value is returned. The value returned
                /// from the function becomes the fulfilled value of the promise returned by
                /// then(). If an exception is thrown while executing the function, the promise returned
                /// by then() moves into the error state.
                /// </param>
                /// <param name='onError' type='Function' optional='true' locid="WinJS.PromiseStateMachine.done_p:onError">
                /// The function to be called if the promise is fulfilled with an error. The error
                /// is passed as the single argument. If it is null, the error is forwarded.
                /// The value returned from the function is the fulfilled value of the promise returned by then().
                /// </param>
                /// <param name='onProgress' type='Function' optional='true' locid="WinJS.PromiseStateMachine.done_p:onProgress">
                /// the function to be called if the promise reports progress. Data about the progress
                /// is passed as the single argument. Promises are not required to support
                /// progress.
                /// </param>
                /// </signature>
                var value = this._value;
                if (onError) {
                    try {
                        if (!onError.handlesOnError) {
                            callonerror(null, value, detailsForHandledError, this, onError);
                        }
                        var result = onError(value);
                        if (result && (typeof result === "undefined" ? "undefined" : _typeof(result)) === "object" && typeof result.done === "function") {
                            // If a promise is returned we need to wait on it.
                            result.done();
                        }
                        return;
                    } catch (ex) {
                        value = ex;
                    }
                }
                if (value instanceof Error && value.message === canceledName) {
                    // suppress cancel
                    return;
                }
                // force the exception to be thrown asyncronously to avoid any try/catch blocks
                //
                Promise._doneHandler(value);
            },
            then: function ErrorPromise_then(unused, onError) {
                /// <signature helpKeyword="WinJS.PromiseStateMachine.then">
                /// <summary locid="WinJS.PromiseStateMachine.then">
                /// Allows you to specify the work to be done on the fulfillment of the promised value,
                /// the error handling to be performed if the promise fails to fulfill
                /// a value, and the handling of progress notifications along the way.
                /// </summary>
                /// <param name='onComplete' type='Function' locid="WinJS.PromiseStateMachine.then_p:onComplete">
                /// The function to be called if the promise is fulfilled successfully with a value.
                /// The value is passed as the single argument. If the value is null, the value is returned.
                /// The value returned from the function becomes the fulfilled value of the promise returned by
                /// then(). If an exception is thrown while this function is being executed, the promise returned
                /// by then() moves into the error state.
                /// </param>
                /// <param name='onError' type='Function' optional='true' locid="WinJS.PromiseStateMachine.then_p:onError">
                /// The function to be called if the promise is fulfilled with an error. The error
                /// is passed as the single argument. If it is null, the error is forwarded.
                /// The value returned from the function becomes the fulfilled value of the promise returned by then().
                /// </param>
                /// <param name='onProgress' type='Function' optional='true' locid="WinJS.PromiseStateMachine.then_p:onProgress">
                /// The function to be called if the promise reports progress. Data about the progress
                /// is passed as the single argument. Promises are not required to support
                /// progress.
                /// </param>
                /// <returns type="WinJS.Promise" locid="WinJS.PromiseStateMachine.then_returnValue">
                /// The promise whose value is the result of executing the complete or
                /// error function.
                /// </returns>
                /// </signature>

                // If the promise is already in a error state and no error handler is provided
                // we optimize by simply returning the promise instead of creating a new one.
                //
                if (!onError) {
                    return this;
                }
                var result;
                var value = this._value;
                try {
                    if (!onError.handlesOnError) {
                        callonerror(null, value, detailsForHandledError, this, onError);
                    }
                    result = new CompletePromise(onError(value));
                } catch (ex) {
                    // If the value throw from the error handler is the same as the value
                    // provided to the error handler then there is no need for a new promise.
                    //
                    if (ex === value) {
                        result = this;
                    } else {
                        result = new ExceptionPromise(ex);
                    }
                }
                return result;
            }
        }, {
            supportedForProcessing: false
        });

        var ExceptionPromise = _Base.Class.derive(ErrorPromise, function ExceptionPromise_ctor(value) {

            if (tagWithStack && (tagWithStack === true || tagWithStack & tag.exceptionPromise)) {
                this._stack = Promise._getStack();
            }

            this._value = value;
            callonerror(this, value, detailsForException);
        }, {
            /* empty */
        }, {
            supportedForProcessing: false
        });

        var CompletePromise = _Base.Class.define(function CompletePromise_ctor(value) {

            if (tagWithStack && (tagWithStack === true || tagWithStack & tag.completePromise)) {
                this._stack = Promise._getStack();
            }

            if (value && (typeof value === "undefined" ? "undefined" : _typeof(value)) === "object" && typeof value.then === "function") {
                var result = new ThenPromise(null);
                result._setCompleteValue(value);
                return result;
            }
            this._value = value;
        }, {
            cancel: function cancel() {
                /// <signature helpKeyword="WinJS.PromiseStateMachine.cancel">
                /// <summary locid="WinJS.PromiseStateMachine.cancel">
                /// Attempts to cancel the fulfillment of a promised value. If the promise hasn't
                /// already been fulfilled and cancellation is supported, the promise enters
                /// the error state with a value of Error("Canceled").
                /// </summary>
                /// </signature>
            },
            done: function CompletePromise_done(onComplete) {
                /// <signature helpKeyword="WinJS.PromiseStateMachine.done">
                /// <summary locid="WinJS.PromiseStateMachine.done">
                /// Allows you to specify the work to be done on the fulfillment of the promised value,
                /// the error handling to be performed if the promise fails to fulfill
                /// a value, and the handling of progress notifications along the way.
                ///
                /// After the handlers have finished executing, this function throws any error that would have been returned
                /// from then() as a promise in the error state.
                /// </summary>
                /// <param name='onComplete' type='Function' locid="WinJS.PromiseStateMachine.done_p:onComplete">
                /// The function to be called if the promise is fulfilled successfully with a value.
                /// The fulfilled value is passed as the single argument. If the value is null,
                /// the fulfilled value is returned. The value returned
                /// from the function becomes the fulfilled value of the promise returned by
                /// then(). If an exception is thrown while executing the function, the promise returned
                /// by then() moves into the error state.
                /// </param>
                /// <param name='onError' type='Function' optional='true' locid="WinJS.PromiseStateMachine.done_p:onError">
                /// The function to be called if the promise is fulfilled with an error. The error
                /// is passed as the single argument. If it is null, the error is forwarded.
                /// The value returned from the function is the fulfilled value of the promise returned by then().
                /// </param>
                /// <param name='onProgress' type='Function' optional='true' locid="WinJS.PromiseStateMachine.done_p:onProgress">
                /// the function to be called if the promise reports progress. Data about the progress
                /// is passed as the single argument. Promises are not required to support
                /// progress.
                /// </param>
                /// </signature>
                if (!onComplete) {
                    return;
                }
                try {
                    var result = onComplete(this._value);
                    if (result && (typeof result === "undefined" ? "undefined" : _typeof(result)) === "object" && typeof result.done === "function") {
                        result.done();
                    }
                } catch (ex) {
                    // force the exception to be thrown asynchronously to avoid any try/catch blocks
                    Promise._doneHandler(ex);
                }
            },
            then: function CompletePromise_then(onComplete) {
                /// <signature helpKeyword="WinJS.PromiseStateMachine.then">
                /// <summary locid="WinJS.PromiseStateMachine.then">
                /// Allows you to specify the work to be done on the fulfillment of the promised value,
                /// the error handling to be performed if the promise fails to fulfill
                /// a value, and the handling of progress notifications along the way.
                /// </summary>
                /// <param name='onComplete' type='Function' locid="WinJS.PromiseStateMachine.then_p:onComplete">
                /// The function to be called if the promise is fulfilled successfully with a value.
                /// The value is passed as the single argument. If the value is null, the value is returned.
                /// The value returned from the function becomes the fulfilled value of the promise returned by
                /// then(). If an exception is thrown while this function is being executed, the promise returned
                /// by then() moves into the error state.
                /// </param>
                /// <param name='onError' type='Function' optional='true' locid="WinJS.PromiseStateMachine.then_p:onError">
                /// The function to be called if the promise is fulfilled with an error. The error
                /// is passed as the single argument. If it is null, the error is forwarded.
                /// The value returned from the function becomes the fulfilled value of the promise returned by then().
                /// </param>
                /// <param name='onProgress' type='Function' optional='true' locid="WinJS.PromiseStateMachine.then_p:onProgress">
                /// The function to be called if the promise reports progress. Data about the progress
                /// is passed as the single argument. Promises are not required to support
                /// progress.
                /// </param>
                /// <returns type="WinJS.Promise" locid="WinJS.PromiseStateMachine.then_returnValue">
                /// The promise whose value is the result of executing the complete or
                /// error function.
                /// </returns>
                /// </signature>
                try {
                    // If the value returned from the completion handler is the same as the value
                    // provided to the completion handler then there is no need for a new promise.
                    //
                    var newValue = onComplete ? onComplete(this._value) : this._value;
                    return newValue === this._value ? this : new CompletePromise(newValue);
                } catch (ex) {
                    return new ExceptionPromise(ex);
                }
            }
        }, {
            supportedForProcessing: false
        });

        //
        // Promise is the user-creatable WinJS.Promise object.
        //

        function timeout(timeoutMS) {
            var id;
            return new Promise(function (c) {
                if (timeoutMS) {
                    id = _Global.setTimeout(c, timeoutMS);
                } else {
                    _BaseCoreUtils._setImmediate(c);
                }
            }, function () {
                if (id) {
                    _Global.clearTimeout(id);
                }
            });
        }

        function timeoutWithPromise(timeout, promise) {
            var cancelPromise = function cancelPromise() {
                promise.cancel();
            };
            var cancelTimeout = function cancelTimeout() {
                timeout.cancel();
            };
            timeout.then(cancelPromise);
            promise.then(cancelTimeout, cancelTimeout);
            return promise;
        }

        var staticCanceledPromise;

        var Promise = _Base.Class.derive(PromiseStateMachine, function Promise_ctor(init, oncancel) {
            /// <signature helpKeyword="WinJS.Promise">
            /// <summary locid="WinJS.Promise">
            /// A promise provides a mechanism to schedule work to be done on a value that
            /// has not yet been computed. It is a convenient abstraction for managing
            /// interactions with asynchronous APIs.
            /// </summary>
            /// <param name="init" type="Function" locid="WinJS.Promise_p:init">
            /// The function that is called during construction of the  promise. The function
            /// is given three arguments (complete, error, progress). Inside this function
            /// you should add event listeners for the notifications supported by this value.
            /// </param>
            /// <param name="oncancel" optional="true" locid="WinJS.Promise_p:oncancel">
            /// The function to call if a consumer of this promise wants
            /// to cancel its undone work. Promises are not required to
            /// support cancellation.
            /// </param>
            /// </signature>

            if (tagWithStack && (tagWithStack === true || tagWithStack & tag.promise)) {
                this._stack = Promise._getStack();
            }

            this._oncancel = oncancel;
            this._setState(state_created);
            this._run();

            try {
                var complete = this._completed.bind(this);
                var error = this._error.bind(this);
                var progress = this._progress.bind(this);
                init(complete, error, progress);
            } catch (ex) {
                this._setExceptionValue(ex);
            }
        }, {
            _oncancel: null,

            _cancelAction: function _cancelAction() {
                // BEGIN monaco change
                try {
                    if (this._oncancel) {
                        this._oncancel();
                    } else {
                        throw new Error('Promise did not implement oncancel');
                    }
                } catch (ex) {
                    // Access fields to get them created
                    var msg = ex.message;
                    var stack = ex.stack;
                    promiseEventListeners.dispatchEvent('error', ex);
                }
                // END monaco change
            },
            _cleanupAction: function _cleanupAction() {
                this._oncancel = null;
            }
        }, {

            addEventListener: function Promise_addEventListener(eventType, listener, capture) {
                /// <signature helpKeyword="WinJS.Promise.addEventListener">
                /// <summary locid="WinJS.Promise.addEventListener">
                /// Adds an event listener to the control.
                /// </summary>
                /// <param name="eventType" locid="WinJS.Promise.addEventListener_p:eventType">
                /// The type (name) of the event.
                /// </param>
                /// <param name="listener" locid="WinJS.Promise.addEventListener_p:listener">
                /// The listener to invoke when the event is raised.
                /// </param>
                /// <param name="capture" locid="WinJS.Promise.addEventListener_p:capture">
                /// Specifies whether or not to initiate capture.
                /// </param>
                /// </signature>
                promiseEventListeners.addEventListener(eventType, listener, capture);
            },
            any: function Promise_any(values) {
                /// <signature helpKeyword="WinJS.Promise.any">
                /// <summary locid="WinJS.Promise.any">
                /// Returns a promise that is fulfilled when one of the input promises
                /// has been fulfilled.
                /// </summary>
                /// <param name="values" type="Array" locid="WinJS.Promise.any_p:values">
                /// An array that contains promise objects or objects whose property
                /// values include promise objects.
                /// </param>
                /// <returns type="WinJS.Promise" locid="WinJS.Promise.any_returnValue">
                /// A promise that on fulfillment yields the value of the input (complete or error).
                /// </returns>
                /// </signature>
                return new Promise(function (complete, error) {
                    var keys = Object.keys(values);
                    if (keys.length === 0) {
                        complete();
                    }
                    var canceled = 0;
                    keys.forEach(function (key) {
                        Promise.as(values[key]).then(function () {
                            complete({ key: key, value: values[key] });
                        }, function (e) {
                            if (e instanceof Error && e.name === canceledName) {
                                if (++canceled === keys.length) {
                                    complete(Promise.cancel);
                                }
                                return;
                            }
                            error({ key: key, value: values[key] });
                        });
                    });
                }, function () {
                    var keys = Object.keys(values);
                    keys.forEach(function (key) {
                        var promise = Promise.as(values[key]);
                        if (typeof promise.cancel === "function") {
                            promise.cancel();
                        }
                    });
                });
            },
            as: function Promise_as(value) {
                /// <signature helpKeyword="WinJS.Promise.as">
                /// <summary locid="WinJS.Promise.as">
                /// Returns a promise. If the object is already a promise it is returned;
                /// otherwise the object is wrapped in a promise.
                /// </summary>
                /// <param name="value" locid="WinJS.Promise.as_p:value">
                /// The value to be treated as a promise.
                /// </param>
                /// <returns type="WinJS.Promise" locid="WinJS.Promise.as_returnValue">
                /// A promise.
                /// </returns>
                /// </signature>
                if (value && (typeof value === "undefined" ? "undefined" : _typeof(value)) === "object" && typeof value.then === "function") {
                    return value;
                }
                return new CompletePromise(value);
            },
            /// <field type="WinJS.Promise" helpKeyword="WinJS.Promise.cancel" locid="WinJS.Promise.cancel">
            /// Canceled promise value, can be returned from a promise completion handler
            /// to indicate cancelation of the promise chain.
            /// </field>
            cancel: {
                get: function get() {
                    return staticCanceledPromise = staticCanceledPromise || new ErrorPromise(new _ErrorFromName(canceledName));
                }
            },
            dispatchEvent: function Promise_dispatchEvent(eventType, details) {
                /// <signature helpKeyword="WinJS.Promise.dispatchEvent">
                /// <summary locid="WinJS.Promise.dispatchEvent">
                /// Raises an event of the specified type and properties.
                /// </summary>
                /// <param name="eventType" locid="WinJS.Promise.dispatchEvent_p:eventType">
                /// The type (name) of the event.
                /// </param>
                /// <param name="details" locid="WinJS.Promise.dispatchEvent_p:details">
                /// The set of additional properties to be attached to the event object.
                /// </param>
                /// <returns type="Boolean" locid="WinJS.Promise.dispatchEvent_returnValue">
                /// Specifies whether preventDefault was called on the event.
                /// </returns>
                /// </signature>
                return promiseEventListeners.dispatchEvent(eventType, details);
            },
            is: function Promise_is(value) {
                /// <signature helpKeyword="WinJS.Promise.is">
                /// <summary locid="WinJS.Promise.is">
                /// Determines whether a value fulfills the promise contract.
                /// </summary>
                /// <param name="value" locid="WinJS.Promise.is_p:value">
                /// A value that may be a promise.
                /// </param>
                /// <returns type="Boolean" locid="WinJS.Promise.is_returnValue">
                /// true if the specified value is a promise, otherwise false.
                /// </returns>
                /// </signature>
                return value && (typeof value === "undefined" ? "undefined" : _typeof(value)) === "object" && typeof value.then === "function";
            },
            join: function Promise_join(values) {
                /// <signature helpKeyword="WinJS.Promise.join">
                /// <summary locid="WinJS.Promise.join">
                /// Creates a promise that is fulfilled when all the values are fulfilled.
                /// </summary>
                /// <param name="values" type="Object" locid="WinJS.Promise.join_p:values">
                /// An object whose fields contain values, some of which may be promises.
                /// </param>
                /// <returns type="WinJS.Promise" locid="WinJS.Promise.join_returnValue">
                /// A promise whose value is an object with the same field names as those of the object in the values parameter, where
                /// each field value is the fulfilled value of a promise.
                /// </returns>
                /// </signature>
                return new Promise(function (complete, error, progress) {
                    var keys = Object.keys(values);
                    var errors = Array.isArray(values) ? [] : {};
                    var results = Array.isArray(values) ? [] : {};
                    var undefineds = 0;
                    var pending = keys.length;
                    var argDone = function argDone(key) {
                        if (--pending === 0) {
                            var errorCount = Object.keys(errors).length;
                            if (errorCount === 0) {
                                complete(results);
                            } else {
                                var canceledCount = 0;
                                keys.forEach(function (key) {
                                    var e = errors[key];
                                    if (e instanceof Error && e.name === canceledName) {
                                        canceledCount++;
                                    }
                                });
                                if (canceledCount === errorCount) {
                                    complete(Promise.cancel);
                                } else {
                                    error(errors);
                                }
                            }
                        } else {
                            progress({ Key: key, Done: true });
                        }
                    };
                    keys.forEach(function (key) {
                        var value = values[key];
                        if (value === undefined) {
                            undefineds++;
                        } else {
                            Promise.then(value, function (value) {
                                results[key] = value;argDone(key);
                            }, function (value) {
                                errors[key] = value;argDone(key);
                            });
                        }
                    });
                    pending -= undefineds;
                    if (pending === 0) {
                        complete(results);
                        return;
                    }
                }, function () {
                    Object.keys(values).forEach(function (key) {
                        var promise = Promise.as(values[key]);
                        if (typeof promise.cancel === "function") {
                            promise.cancel();
                        }
                    });
                });
            },
            removeEventListener: function Promise_removeEventListener(eventType, listener, capture) {
                /// <signature helpKeyword="WinJS.Promise.removeEventListener">
                /// <summary locid="WinJS.Promise.removeEventListener">
                /// Removes an event listener from the control.
                /// </summary>
                /// <param name='eventType' locid="WinJS.Promise.removeEventListener_eventType">
                /// The type (name) of the event.
                /// </param>
                /// <param name='listener' locid="WinJS.Promise.removeEventListener_listener">
                /// The listener to remove.
                /// </param>
                /// <param name='capture' locid="WinJS.Promise.removeEventListener_capture">
                /// Specifies whether or not to initiate capture.
                /// </param>
                /// </signature>
                promiseEventListeners.removeEventListener(eventType, listener, capture);
            },
            supportedForProcessing: false,
            then: function Promise_then(value, onComplete, onError, onProgress) {
                /// <signature helpKeyword="WinJS.Promise.then">
                /// <summary locid="WinJS.Promise.then">
                /// A static version of the promise instance method then().
                /// </summary>
                /// <param name="value" locid="WinJS.Promise.then_p:value">
                /// the value to be treated as a promise.
                /// </param>
                /// <param name="onComplete" type="Function" locid="WinJS.Promise.then_p:complete">
                /// The function to be called if the promise is fulfilled with a value.
                /// If it is null, the promise simply
                /// returns the value. The value is passed as the single argument.
                /// </param>
                /// <param name="onError" type="Function" optional="true" locid="WinJS.Promise.then_p:error">
                /// The function to be called if the promise is fulfilled with an error. The error
                /// is passed as the single argument.
                /// </param>
                /// <param name="onProgress" type="Function" optional="true" locid="WinJS.Promise.then_p:progress">
                /// The function to be called if the promise reports progress. Data about the progress
                /// is passed as the single argument. Promises are not required to support
                /// progress.
                /// </param>
                /// <returns type="WinJS.Promise" locid="WinJS.Promise.then_returnValue">
                /// A promise whose value is the result of executing the provided complete function.
                /// </returns>
                /// </signature>
                return Promise.as(value).then(onComplete, onError, onProgress);
            },
            thenEach: function Promise_thenEach(values, onComplete, onError, onProgress) {
                /// <signature helpKeyword="WinJS.Promise.thenEach">
                /// <summary locid="WinJS.Promise.thenEach">
                /// Performs an operation on all the input promises and returns a promise
                /// that has the shape of the input and contains the result of the operation
                /// that has been performed on each input.
                /// </summary>
                /// <param name="values" locid="WinJS.Promise.thenEach_p:values">
                /// A set of values (which could be either an array or an object) of which some or all are promises.
                /// </param>
                /// <param name="onComplete" type="Function" locid="WinJS.Promise.thenEach_p:complete">
                /// The function to be called if the promise is fulfilled with a value.
                /// If the value is null, the promise returns the value.
                /// The value is passed as the single argument.
                /// </param>
                /// <param name="onError" type="Function" optional="true" locid="WinJS.Promise.thenEach_p:error">
                /// The function to be called if the promise is fulfilled with an error. The error
                /// is passed as the single argument.
                /// </param>
                /// <param name="onProgress" type="Function" optional="true" locid="WinJS.Promise.thenEach_p:progress">
                /// The function to be called if the promise reports progress. Data about the progress
                /// is passed as the single argument. Promises are not required to support
                /// progress.
                /// </param>
                /// <returns type="WinJS.Promise" locid="WinJS.Promise.thenEach_returnValue">
                /// A promise that is the result of calling Promise.join on the values parameter.
                /// </returns>
                /// </signature>
                var result = Array.isArray(values) ? [] : {};
                Object.keys(values).forEach(function (key) {
                    result[key] = Promise.as(values[key]).then(onComplete, onError, onProgress);
                });
                return Promise.join(result);
            },
            timeout: function Promise_timeout(time, promise) {
                /// <signature helpKeyword="WinJS.Promise.timeout">
                /// <summary locid="WinJS.Promise.timeout">
                /// Creates a promise that is fulfilled after a timeout.
                /// </summary>
                /// <param name="timeout" type="Number" optional="true" locid="WinJS.Promise.timeout_p:timeout">
                /// The timeout period in milliseconds. If this value is zero or not specified
                /// setImmediate is called, otherwise setTimeout is called.
                /// </param>
                /// <param name="promise" type="Promise" optional="true" locid="WinJS.Promise.timeout_p:promise">
                /// A promise that will be canceled if it doesn't complete before the
                /// timeout has expired.
                /// </param>
                /// <returns type="WinJS.Promise" locid="WinJS.Promise.timeout_returnValue">
                /// A promise that is completed asynchronously after the specified timeout.
                /// </returns>
                /// </signature>
                var to = timeout(time);
                return promise ? timeoutWithPromise(to, promise) : to;
            },
            wrap: function Promise_wrap(value) {
                /// <signature helpKeyword="WinJS.Promise.wrap">
                /// <summary locid="WinJS.Promise.wrap">
                /// Wraps a non-promise value in a promise. You can use this function if you need
                /// to pass a value to a function that requires a promise.
                /// </summary>
                /// <param name="value" locid="WinJS.Promise.wrap_p:value">
                /// Some non-promise value to be wrapped in a promise.
                /// </param>
                /// <returns type="WinJS.Promise" locid="WinJS.Promise.wrap_returnValue">
                /// A promise that is successfully fulfilled with the specified value
                /// </returns>
                /// </signature>
                return new CompletePromise(value);
            },
            wrapError: function Promise_wrapError(error) {
                /// <signature helpKeyword="WinJS.Promise.wrapError">
                /// <summary locid="WinJS.Promise.wrapError">
                /// Wraps a non-promise error value in a promise. You can use this function if you need
                /// to pass an error to a function that requires a promise.
                /// </summary>
                /// <param name="error" locid="WinJS.Promise.wrapError_p:error">
                /// A non-promise error value to be wrapped in a promise.
                /// </param>
                /// <returns type="WinJS.Promise" locid="WinJS.Promise.wrapError_returnValue">
                /// A promise that is in an error state with the specified value.
                /// </returns>
                /// </signature>
                return new ErrorPromise(error);
            },

            _veryExpensiveTagWithStack: {
                get: function get() {
                    return tagWithStack;
                },
                set: function set(value) {
                    tagWithStack = value;
                }
            },
            _veryExpensiveTagWithStack_tag: tag,
            _getStack: function _getStack() {
                if (_Global.Debug && _Global.Debug.debuggerEnabled) {
                    try {
                        throw new Error();
                    } catch (e) {
                        return e.stack;
                    }
                }
            },

            _cancelBlocker: function Promise__cancelBlocker(input, oncancel) {
                //
                // Returns a promise which on cancelation will still result in downstream cancelation while
                //  protecting the promise 'input' from being  canceled which has the effect of allowing
                //  'input' to be shared amoung various consumers.
                //
                if (!Promise.is(input)) {
                    return Promise.wrap(input);
                }
                var complete;
                var error;
                var output = new Promise(function (c, e) {
                    complete = c;
                    error = e;
                }, function () {
                    complete = null;
                    error = null;
                    oncancel && oncancel();
                });
                input.then(function (v) {
                    complete && complete(v);
                }, function (e) {
                    error && error(e);
                });
                return output;
            }

        });
        Object.defineProperties(Promise, _Events.createEventProperties(errorET));

        Promise._doneHandler = function (value) {
            _BaseCoreUtils._setImmediate(function Promise_done_rethrow() {
                throw value;
            });
        };

        return {
            PromiseStateMachine: PromiseStateMachine,
            Promise: Promise,
            state_created: state_created
        };
    });

    _winjs("WinJS/Promise", ["WinJS/Core/_Base", "WinJS/Promise/_StateMachine"], function promiseInit(_Base, _StateMachine) {
        "use strict";

        _Base.Namespace.define("WinJS", {
            Promise: _StateMachine.Promise
        });

        return _StateMachine.Promise;
    });

    __winjs_exports = _modules["WinJS/Core/_WinJS"];
    __winjs_exports.TPromise = __winjs_exports.Promise;
    __winjs_exports.PPromise = __winjs_exports.Promise;

    // ESM-comment-begin
    // if (typeof exports === 'undefined' && typeof define === 'function' && define.amd) {
    //     define([], __winjs_exports);
    // } else {
    //     module.exports = __winjs_exports;
    // }
    // ESM-comment-end
})();

// ESM-uncomment-begin
var Promise = exports.Promise = __winjs_exports.Promise;
var TPromise = exports.TPromise = __winjs_exports.TPromise;
var PPromise = exports.PPromise = __winjs_exports.PPromise;
// ESM-uncomment-end
/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(10), __webpack_require__(9)))

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/

/**
 * A position in the editor.
 */

Object.defineProperty(exports, "__esModule", {
    value: true
});
var Position = /** @class */function () {
    function Position(lineNumber, column) {
        this.lineNumber = lineNumber;
        this.column = column;
    }
    /**
     * Test if this position equals other position
     */
    Position.prototype.equals = function (other) {
        return Position.equals(this, other);
    };
    /**
     * Test if position `a` equals position `b`
     */
    Position.equals = function (a, b) {
        if (!a && !b) {
            return true;
        }
        return !!a && !!b && a.lineNumber === b.lineNumber && a.column === b.column;
    };
    /**
     * Test if this position is before other position.
     * If the two positions are equal, the result will be false.
     */
    Position.prototype.isBefore = function (other) {
        return Position.isBefore(this, other);
    };
    /**
     * Test if position `a` is before position `b`.
     * If the two positions are equal, the result will be false.
     */
    Position.isBefore = function (a, b) {
        if (a.lineNumber < b.lineNumber) {
            return true;
        }
        if (b.lineNumber < a.lineNumber) {
            return false;
        }
        return a.column < b.column;
    };
    /**
     * Test if this position is before other position.
     * If the two positions are equal, the result will be true.
     */
    Position.prototype.isBeforeOrEqual = function (other) {
        return Position.isBeforeOrEqual(this, other);
    };
    /**
     * Test if position `a` is before position `b`.
     * If the two positions are equal, the result will be true.
     */
    Position.isBeforeOrEqual = function (a, b) {
        if (a.lineNumber < b.lineNumber) {
            return true;
        }
        if (b.lineNumber < a.lineNumber) {
            return false;
        }
        return a.column <= b.column;
    };
    /**
     * A function that compares positions, useful for sorting
     */
    Position.compare = function (a, b) {
        var aLineNumber = a.lineNumber | 0;
        var bLineNumber = b.lineNumber | 0;
        if (aLineNumber === bLineNumber) {
            var aColumn = a.column | 0;
            var bColumn = b.column | 0;
            return aColumn - bColumn;
        }
        return aLineNumber - bLineNumber;
    };
    /**
     * Clone this position.
     */
    Position.prototype.clone = function () {
        return new Position(this.lineNumber, this.column);
    };
    /**
     * Convert to a human-readable representation.
     */
    Position.prototype.toString = function () {
        return '(' + this.lineNumber + ',' + this.column + ')';
    };
    // ---
    /**
     * Create a `Position` from an `IPosition`.
     */
    Position.lift = function (pos) {
        return new Position(pos.lineNumber, pos.column);
    };
    /**
     * Test if `obj` is an `IPosition`.
     */
    Position.isIPosition = function (obj) {
        return obj && typeof obj.lineNumber === 'number' && typeof obj.column === 'number';
    };
    return Position;
}();
exports.Position = Position;

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.errorHandler = exports.ErrorHandler = undefined;
exports.setUnexpectedErrorHandler = setUnexpectedErrorHandler;
exports.onUnexpectedError = onUnexpectedError;
exports.onUnexpectedExternalError = onUnexpectedExternalError;
exports.transformErrorForSerialization = transformErrorForSerialization;
exports.isPromiseCanceledError = isPromiseCanceledError;
exports.canceled = canceled;
exports.illegalArgument = illegalArgument;
exports.illegalState = illegalState;
exports.readonly = readonly;
exports.disposed = disposed;
exports.isErrorWithActions = isErrorWithActions;
exports.create = create;
exports.getErrorMessage = getErrorMessage;

var _winjsBase = __webpack_require__(0);

// ------ BEGIN Hook up error listeners to winjs promises
var outstandingPromiseErrors = {};
function promiseErrorHandler(e) {
    //
    // e.detail looks like: { exception, error, promise, handler, id, parent }
    //
    var details = e.detail;
    var id = details.id;
    // If the error has a parent promise then this is not the origination of the
    //  error so we check if it has a handler, and if so we mark that the error
    //  was handled by removing it from outstandingPromiseErrors
    //
    if (details.parent) {
        if (details.handler && outstandingPromiseErrors) {
            delete outstandingPromiseErrors[id];
        }
        return;
    }
    // Indicate that this error was originated and needs to be handled
    outstandingPromiseErrors[id] = details;
    // The first time the queue fills up this iteration, schedule a timeout to
    // check if any errors are still unhandled.
    if (Object.keys(outstandingPromiseErrors).length === 1) {
        setTimeout(function () {
            var errors = outstandingPromiseErrors;
            outstandingPromiseErrors = {};
            Object.keys(errors).forEach(function (errorId) {
                var error = errors[errorId];
                if (error.exception) {
                    onUnexpectedError(error.exception);
                } else if (error.error) {
                    onUnexpectedError(error.error);
                }
                console.log('WARNING: Promise with no error callback:' + error.id);
                console.log(error);
                if (error.exception) {
                    console.log(error.exception.stack);
                }
            });
        }, 0);
    }
}
_winjsBase.TPromise.addEventListener('error', promiseErrorHandler);
// Avoid circular dependency on EventEmitter by implementing a subset of the interface.
var ErrorHandler = /** @class */function () {
    function ErrorHandler() {
        this.listeners = [];
        this.unexpectedErrorHandler = function (e) {
            setTimeout(function () {
                if (e.stack) {
                    throw new Error(e.message + '\n\n' + e.stack);
                }
                throw e;
            }, 0);
        };
    }
    ErrorHandler.prototype.addListener = function (listener) {
        var _this = this;
        this.listeners.push(listener);
        return function () {
            _this._removeListener(listener);
        };
    };
    ErrorHandler.prototype.emit = function (e) {
        this.listeners.forEach(function (listener) {
            listener(e);
        });
    };
    ErrorHandler.prototype._removeListener = function (listener) {
        this.listeners.splice(this.listeners.indexOf(listener), 1);
    };
    ErrorHandler.prototype.setUnexpectedErrorHandler = function (newUnexpectedErrorHandler) {
        this.unexpectedErrorHandler = newUnexpectedErrorHandler;
    };
    ErrorHandler.prototype.getUnexpectedErrorHandler = function () {
        return this.unexpectedErrorHandler;
    };
    ErrorHandler.prototype.onUnexpectedError = function (e) {
        this.unexpectedErrorHandler(e);
        this.emit(e);
    };
    // For external errors, we don't want the listeners to be called
    ErrorHandler.prototype.onUnexpectedExternalError = function (e) {
        this.unexpectedErrorHandler(e);
    };
    return ErrorHandler;
}();
exports.ErrorHandler = ErrorHandler;
var errorHandler = exports.errorHandler = new ErrorHandler();
function setUnexpectedErrorHandler(newUnexpectedErrorHandler) {
    errorHandler.setUnexpectedErrorHandler(newUnexpectedErrorHandler);
}
function onUnexpectedError(e) {
    // ignore errors from cancelled promises
    if (!isPromiseCanceledError(e)) {
        errorHandler.onUnexpectedError(e);
    }
    return undefined;
}
function onUnexpectedExternalError(e) {
    // ignore errors from cancelled promises
    if (!isPromiseCanceledError(e)) {
        errorHandler.onUnexpectedExternalError(e);
    }
    return undefined;
}
function transformErrorForSerialization(error) {
    if (error instanceof Error) {
        var name_1 = error.name,
            message = error.message;
        var stack = error.stacktrace || error.stack;
        return {
            $isError: true,
            name: name_1,
            message: message,
            stack: stack
        };
    }
    // return as is
    return error;
}
var canceledName = 'Canceled';
/**
 * Checks if the given error is a promise in canceled state
 */
function isPromiseCanceledError(error) {
    return error instanceof Error && error.name === canceledName && error.message === canceledName;
}
/**
 * Returns an error that signals cancellation.
 */
function canceled() {
    var error = new Error(canceledName);
    error.name = error.message;
    return error;
}
function illegalArgument(name) {
    if (name) {
        return new Error("Illegal argument: " + name);
    } else {
        return new Error('Illegal argument');
    }
}
function illegalState(name) {
    if (name) {
        return new Error("Illegal state: " + name);
    } else {
        return new Error('Illegal state');
    }
}
function readonly(name) {
    return name ? new Error("readonly property '" + name + " cannot be changed'") : new Error('readonly property cannot be changed');
}
function disposed(what) {
    var result = new Error(what + " has been disposed");
    result.name = 'DISPOSED';
    return result;
}
function isErrorWithActions(obj) {
    return obj instanceof Error && Array.isArray(obj.actions);
}
function create(message, options) {
    if (options === void 0) {
        options = Object.create(null);
    }
    var result = new Error(message);
    if (options.actions) {
        result.actions = options.actions;
    }
    return result;
}
function getErrorMessage(err) {
    if (!err) {
        return 'Error';
    }
    if (err.message) {
        return err.message;
    }
    if (err.stack) {
        return err.stack.split('\n')[0];
    }
    return String(err);
}

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.Relay = exports.EventBufferer = exports.EventMultiplexer = exports.Emitter = exports.Event = undefined;
exports.fromCallback = fromCallback;
exports.fromPromise = fromPromise;
exports.toPromise = toPromise;
exports.once = once;
exports.anyEvent = anyEvent;
exports.debounceEvent = debounceEvent;
exports.mapEvent = mapEvent;
exports.forEach = forEach;
exports.filterEvent = filterEvent;
exports.chain = chain;
exports.stopwatch = stopwatch;
exports.buffer = buffer;
exports.echo = echo;
exports.fromNodeEventEmitter = fromNodeEventEmitter;
exports.latch = latch;

var _lifecycle = __webpack_require__(4);

var _winjsBase = __webpack_require__(0);

var _functional = __webpack_require__(14);

var _errors = __webpack_require__(2);

var _linkedList = __webpack_require__(23);

var Event = exports.Event = undefined;
(function (Event) {
    var _disposable = { dispose: function dispose() {} };
    Event.None = function () {
        return _disposable;
    };
})(Event || (exports.Event = Event = {}));
/**
 * The Emitter can be used to expose an Event to the public
 * to fire it from the insides.
 * Sample:
    class Document {

        private _onDidChange = new Emitter<(value:string)=>any>();

        public onDidChange = this._onDidChange.event;

        // getter-style
        // get onDidChange(): Event<(value:string)=>any> {
        // 	return this._onDidChange.event;
        // }

        private _doIt() {
            //...
            this._onDidChange.fire(value);
        }
    }
 */
var Emitter = /** @class */function () {
    function Emitter(_options) {
        this._options = _options;
    }
    Object.defineProperty(Emitter.prototype, "event", {
        /**
         * For the public to allow to subscribe
         * to events from this Emitter
         */
        get: function get() {
            var _this = this;
            if (!this._event) {
                this._event = function (listener, thisArgs, disposables) {
                    if (!_this._listeners) {
                        _this._listeners = new _linkedList.LinkedList();
                    }
                    var firstListener = _this._listeners.isEmpty();
                    if (firstListener && _this._options && _this._options.onFirstListenerAdd) {
                        _this._options.onFirstListenerAdd(_this);
                    }
                    var remove = _this._listeners.push(!thisArgs ? listener : [listener, thisArgs]);
                    if (firstListener && _this._options && _this._options.onFirstListenerDidAdd) {
                        _this._options.onFirstListenerDidAdd(_this);
                    }
                    if (_this._options && _this._options.onListenerDidAdd) {
                        _this._options.onListenerDidAdd(_this, listener, thisArgs);
                    }
                    var result;
                    result = {
                        dispose: function dispose() {
                            result.dispose = Emitter._noop;
                            if (!_this._disposed) {
                                remove();
                                if (_this._options && _this._options.onLastListenerRemove && _this._listeners.isEmpty()) {
                                    _this._options.onLastListenerRemove(_this);
                                }
                            }
                        }
                    };
                    if (Array.isArray(disposables)) {
                        disposables.push(result);
                    }
                    return result;
                };
            }
            return this._event;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * To be kept private to fire an event to
     * subscribers
     */
    Emitter.prototype.fire = function (event) {
        if (this._listeners) {
            // put all [listener,event]-pairs into delivery queue
            // then emit all event. an inner/nested event might be
            // the driver of this
            if (!this._deliveryQueue) {
                this._deliveryQueue = [];
            }
            for (var iter = this._listeners.iterator(), e = iter.next(); !e.done; e = iter.next()) {
                this._deliveryQueue.push([e.value, event]);
            }
            while (this._deliveryQueue.length > 0) {
                var _a = this._deliveryQueue.shift(),
                    listener = _a[0],
                    event_1 = _a[1];
                try {
                    if (typeof listener === 'function') {
                        listener.call(undefined, event_1);
                    } else {
                        listener[0].call(listener[1], event_1);
                    }
                } catch (e) {
                    (0, _errors.onUnexpectedError)(e);
                }
            }
        }
    };
    Emitter.prototype.dispose = function () {
        if (this._listeners) {
            this._listeners = undefined;
        }
        if (this._deliveryQueue) {
            this._deliveryQueue.length = 0;
        }
        this._disposed = true;
    };
    Emitter._noop = function () {};
    return Emitter;
}();
exports.Emitter = Emitter;

var EventMultiplexer = /** @class */function () {
    function EventMultiplexer() {
        var _this = this;
        this.hasListeners = false;
        this.events = [];
        this.emitter = new Emitter({
            onFirstListenerAdd: function onFirstListenerAdd() {
                return _this.onFirstListenerAdd();
            },
            onLastListenerRemove: function onLastListenerRemove() {
                return _this.onLastListenerRemove();
            }
        });
    }
    Object.defineProperty(EventMultiplexer.prototype, "event", {
        get: function get() {
            return this.emitter.event;
        },
        enumerable: true,
        configurable: true
    });
    EventMultiplexer.prototype.add = function (event) {
        var _this = this;
        var e = { event: event, listener: null };
        this.events.push(e);
        if (this.hasListeners) {
            this.hook(e);
        }
        var dispose = function dispose() {
            if (_this.hasListeners) {
                _this.unhook(e);
            }
            var idx = _this.events.indexOf(e);
            _this.events.splice(idx, 1);
        };
        return (0, _lifecycle.toDisposable)((0, _functional.once)(dispose));
    };
    EventMultiplexer.prototype.onFirstListenerAdd = function () {
        var _this = this;
        this.hasListeners = true;
        this.events.forEach(function (e) {
            return _this.hook(e);
        });
    };
    EventMultiplexer.prototype.onLastListenerRemove = function () {
        var _this = this;
        this.hasListeners = false;
        this.events.forEach(function (e) {
            return _this.unhook(e);
        });
    };
    EventMultiplexer.prototype.hook = function (e) {
        var _this = this;
        e.listener = e.event(function (r) {
            return _this.emitter.fire(r);
        });
    };
    EventMultiplexer.prototype.unhook = function (e) {
        e.listener.dispose();
        e.listener = null;
    };
    EventMultiplexer.prototype.dispose = function () {
        this.emitter.dispose();
    };
    return EventMultiplexer;
}();
exports.EventMultiplexer = EventMultiplexer;
function fromCallback(fn) {
    var listener;
    var emitter = new Emitter({
        onFirstListenerAdd: function onFirstListenerAdd() {
            return listener = fn(function (e) {
                return emitter.fire(e);
            });
        },
        onLastListenerRemove: function onLastListenerRemove() {
            return listener.dispose();
        }
    });
    return emitter.event;
}
function fromPromise(promise) {
    var emitter = new Emitter();
    var shouldEmit = false;
    promise.then(null, function () {
        return null;
    }).then(function () {
        if (!shouldEmit) {
            setTimeout(function () {
                return emitter.fire();
            }, 0);
        } else {
            emitter.fire();
        }
    });
    shouldEmit = true;
    return emitter.event;
}
function toPromise(event) {
    return new _winjsBase.TPromise(function (complete) {
        var sub = event(function (e) {
            sub.dispose();
            complete(e);
        });
    });
}
function once(event) {
    return function (listener, thisArgs, disposables) {
        if (thisArgs === void 0) {
            thisArgs = null;
        }
        var result = event(function (e) {
            result.dispose();
            return listener.call(thisArgs, e);
        }, null, disposables);
        return result;
    };
}
function anyEvent() {
    var events = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        events[_i] = arguments[_i];
    }
    return function (listener, thisArgs, disposables) {
        if (thisArgs === void 0) {
            thisArgs = null;
        }
        return (0, _lifecycle.combinedDisposable)(events.map(function (event) {
            return event(function (e) {
                return listener.call(thisArgs, e);
            }, null, disposables);
        }));
    };
}
function debounceEvent(event, merger, delay, leading) {
    if (delay === void 0) {
        delay = 100;
    }
    if (leading === void 0) {
        leading = false;
    }
    var subscription;
    var output = undefined;
    var handle = undefined;
    var numDebouncedCalls = 0;
    var emitter = new Emitter({
        onFirstListenerAdd: function onFirstListenerAdd() {
            subscription = event(function (cur) {
                numDebouncedCalls++;
                output = merger(output, cur);
                if (leading && !handle) {
                    emitter.fire(output);
                }
                clearTimeout(handle);
                handle = setTimeout(function () {
                    var _output = output;
                    output = undefined;
                    handle = undefined;
                    if (!leading || numDebouncedCalls > 1) {
                        emitter.fire(_output);
                    }
                    numDebouncedCalls = 0;
                }, delay);
            });
        },
        onLastListenerRemove: function onLastListenerRemove() {
            subscription.dispose();
        }
    });
    return emitter.event;
}
/**
 * The EventDelayer is useful in situations in which you want
 * to delay firing your events during some code.
 * You can wrap that code and be sure that the event will not
 * be fired during that wrap.
 *
 * ```
 * const emitter: Emitter;
 * const delayer = new EventDelayer();
 * const delayedEvent = delayer.wrapEvent(emitter.event);
 *
 * delayedEvent(console.log);
 *
 * delayer.bufferEvents(() => {
 *   emitter.fire(); // event will not be fired yet
 * });
 *
 * // event will only be fired at this point
 * ```
 */
var EventBufferer = /** @class */function () {
    function EventBufferer() {
        this.buffers = [];
    }
    EventBufferer.prototype.wrapEvent = function (event) {
        var _this = this;
        return function (listener, thisArgs, disposables) {
            return event(function (i) {
                var buffer = _this.buffers[_this.buffers.length - 1];
                if (buffer) {
                    buffer.push(function () {
                        return listener.call(thisArgs, i);
                    });
                } else {
                    listener.call(thisArgs, i);
                }
            }, void 0, disposables);
        };
    };
    EventBufferer.prototype.bufferEvents = function (fn) {
        var buffer = [];
        this.buffers.push(buffer);
        fn();
        this.buffers.pop();
        buffer.forEach(function (flush) {
            return flush();
        });
    };
    return EventBufferer;
}();
exports.EventBufferer = EventBufferer;
function mapEvent(event, map) {
    return function (listener, thisArgs, disposables) {
        if (thisArgs === void 0) {
            thisArgs = null;
        }
        return event(function (i) {
            return listener.call(thisArgs, map(i));
        }, null, disposables);
    };
}
function forEach(event, each) {
    return function (listener, thisArgs, disposables) {
        if (thisArgs === void 0) {
            thisArgs = null;
        }
        return event(function (i) {
            each(i);listener.call(thisArgs, i);
        }, null, disposables);
    };
}
function filterEvent(event, filter) {
    return function (listener, thisArgs, disposables) {
        if (thisArgs === void 0) {
            thisArgs = null;
        }
        return event(function (e) {
            return filter(e) && listener.call(thisArgs, e);
        }, null, disposables);
    };
}
var ChainableEvent = /** @class */function () {
    function ChainableEvent(_event) {
        this._event = _event;
    }
    Object.defineProperty(ChainableEvent.prototype, "event", {
        get: function get() {
            return this._event;
        },
        enumerable: true,
        configurable: true
    });
    ChainableEvent.prototype.map = function (fn) {
        return new ChainableEvent(mapEvent(this._event, fn));
    };
    ChainableEvent.prototype.forEach = function (fn) {
        return new ChainableEvent(forEach(this._event, fn));
    };
    ChainableEvent.prototype.filter = function (fn) {
        return new ChainableEvent(filterEvent(this._event, fn));
    };
    ChainableEvent.prototype.latch = function () {
        return new ChainableEvent(latch(this._event));
    };
    ChainableEvent.prototype.on = function (listener, thisArgs, disposables) {
        return this._event(listener, thisArgs, disposables);
    };
    return ChainableEvent;
}();
function chain(event) {
    return new ChainableEvent(event);
}
function stopwatch(event) {
    var start = new Date().getTime();
    return mapEvent(once(event), function (_) {
        return new Date().getTime() - start;
    });
}
/**
 * Buffers the provided event until a first listener comes
 * along, at which point fire all the events at once and
 * pipe the event from then on.
 *
 * ```typescript
 * const emitter = new Emitter<number>();
 * const event = emitter.event;
 * const bufferedEvent = buffer(event);
 *
 * emitter.fire(1);
 * emitter.fire(2);
 * emitter.fire(3);
 * // nothing...
 *
 * const listener = bufferedEvent(num => console.log(num));
 * // 1, 2, 3
 *
 * emitter.fire(4);
 * // 4
 * ```
 */
function buffer(event, nextTick, buffer) {
    if (nextTick === void 0) {
        nextTick = false;
    }
    if (buffer === void 0) {
        buffer = [];
    }
    buffer = buffer.slice();
    var listener = event(function (e) {
        if (buffer) {
            buffer.push(e);
        } else {
            emitter.fire(e);
        }
    });
    var flush = function flush() {
        buffer.forEach(function (e) {
            return emitter.fire(e);
        });
        buffer = null;
    };
    var emitter = new Emitter({
        onFirstListenerAdd: function onFirstListenerAdd() {
            if (!listener) {
                listener = event(function (e) {
                    return emitter.fire(e);
                });
            }
        },
        onFirstListenerDidAdd: function onFirstListenerDidAdd() {
            if (buffer) {
                if (nextTick) {
                    setTimeout(flush);
                } else {
                    flush();
                }
            }
        },
        onLastListenerRemove: function onLastListenerRemove() {
            listener.dispose();
            listener = null;
        }
    });
    return emitter.event;
}
/**
 * Similar to `buffer` but it buffers indefinitely and repeats
 * the buffered events to every new listener.
 */
function echo(event, nextTick, buffer) {
    if (nextTick === void 0) {
        nextTick = false;
    }
    if (buffer === void 0) {
        buffer = [];
    }
    buffer = buffer.slice();
    event(function (e) {
        buffer.push(e);
        emitter.fire(e);
    });
    var flush = function flush(listener, thisArgs) {
        return buffer.forEach(function (e) {
            return listener.call(thisArgs, e);
        });
    };
    var emitter = new Emitter({
        onListenerDidAdd: function onListenerDidAdd(emitter, listener, thisArgs) {
            if (nextTick) {
                setTimeout(function () {
                    return flush(listener, thisArgs);
                });
            } else {
                flush(listener, thisArgs);
            }
        }
    });
    return emitter.event;
}
var Relay = /** @class */function () {
    function Relay() {
        this.emitter = new Emitter();
        this.event = this.emitter.event;
        this.disposable = _lifecycle.empty;
    }
    Object.defineProperty(Relay.prototype, "input", {
        set: function set(event) {
            this.disposable.dispose();
            this.disposable = event(this.emitter.fire, this.emitter);
        },
        enumerable: true,
        configurable: true
    });
    Relay.prototype.dispose = function () {
        this.disposable.dispose();
        this.emitter.dispose();
    };
    return Relay;
}();
exports.Relay = Relay;
function fromNodeEventEmitter(emitter, eventName, map) {
    if (map === void 0) {
        map = function map(id) {
            return id;
        };
    }
    var fn = function fn() {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        return result.fire(map.apply(void 0, args));
    };
    var onFirstListenerAdd = function onFirstListenerAdd() {
        return emitter.on(eventName, fn);
    };
    var onLastListenerRemove = function onLastListenerRemove() {
        return emitter.removeListener(eventName, fn);
    };
    var result = new Emitter({ onFirstListenerAdd: onFirstListenerAdd, onLastListenerRemove: onLastListenerRemove });
    return result.event;
}
function latch(event) {
    var firstCall = true;
    var cache;
    return filterEvent(event, function (value) {
        var shouldEmit = firstCall || value !== cache;
        firstCall = false;
        cache = value;
        return shouldEmit;
    });
}

/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.ImmortalReference = exports.ReferenceCollection = exports.Disposable = exports.dispose = exports.empty = undefined;
exports.isDisposable = isDisposable;
exports.combinedDisposable = combinedDisposable;
exports.toDisposable = toDisposable;

var _functional = __webpack_require__(14);

var empty = exports.empty = Object.freeze({
    dispose: function dispose() {}
});
function isDisposable(thing) {
    return typeof thing.dispose === 'function' && thing.dispose.length === 0;
}
function _dispose(first) {
    var rest = [];
    for (var _i = 1; _i < arguments.length; _i++) {
        rest[_i - 1] = arguments[_i];
    }
    if (Array.isArray(first)) {
        first.forEach(function (d) {
            return d && d.dispose();
        });
        return [];
    } else if (rest.length === 0) {
        if (first) {
            first.dispose();
            return first;
        }
        return undefined;
    } else {
        _dispose(first);
        _dispose(rest);
        return [];
    }
}
exports.dispose = _dispose;
function combinedDisposable(disposables) {
    return { dispose: function dispose() {
            return _dispose(disposables);
        } };
}
function toDisposable() {
    var fns = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        fns[_i] = arguments[_i];
    }
    return {
        dispose: function dispose() {
            for (var _i = 0, fns_1 = fns; _i < fns_1.length; _i++) {
                var fn = fns_1[_i];
                fn();
            }
        }
    };
}
var Disposable = /** @class */function () {
    function Disposable() {
        this._toDispose = [];
    }
    Disposable.prototype.dispose = function () {
        this._toDispose = _dispose(this._toDispose);
    };
    Disposable.prototype._register = function (t) {
        this._toDispose.push(t);
        return t;
    };
    return Disposable;
}();
exports.Disposable = Disposable;

var ReferenceCollection = /** @class */function () {
    function ReferenceCollection() {
        this.references = Object.create(null);
    }
    ReferenceCollection.prototype.acquire = function (key) {
        var _this = this;
        var reference = this.references[key];
        if (!reference) {
            reference = this.references[key] = { counter: 0, object: this.createReferencedObject(key) };
        }
        var object = reference.object;
        var dispose = (0, _functional.once)(function () {
            if (--reference.counter === 0) {
                _this.destroyReferencedObject(reference.object);
                delete _this.references[key];
            }
        });
        reference.counter++;
        return { object: object, dispose: dispose };
    };
    return ReferenceCollection;
}();
exports.ReferenceCollection = ReferenceCollection;

var ImmortalReference = /** @class */function () {
    function ImmortalReference(object) {
        this.object = object;
    }
    ImmortalReference.prototype.dispose = function () {};
    return ImmortalReference;
}();
exports.ImmortalReference = ImmortalReference;

/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(process, global) {/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

exports.isRootUser = isRootUser;
exports.setImmediate = setImmediate;
var _isWindows = false;
var _isMacintosh = false;
var _isLinux = false;
var _isNative = false;
var _isWeb = false;
var _locale = undefined;
var _language = undefined;
var _translationsConfigFile = undefined;
var LANGUAGE_DEFAULT = exports.LANGUAGE_DEFAULT = 'en';
// OS detection
if ((typeof process === 'undefined' ? 'undefined' : _typeof(process)) === 'object' && typeof process.nextTick === 'function' && typeof process.platform === 'string') {
    _isWindows = process.platform === 'win32';
    _isMacintosh = process.platform === 'darwin';
    _isLinux = process.platform === 'linux';
    var rawNlsConfig = process.env['VSCODE_NLS_CONFIG'];
    if (rawNlsConfig) {
        try {
            var nlsConfig = JSON.parse(rawNlsConfig);
            var resolved = nlsConfig.availableLanguages['*'];
            _locale = nlsConfig.locale;
            // VSCode's default language is 'en'
            _language = resolved ? resolved : LANGUAGE_DEFAULT;
            _translationsConfigFile = nlsConfig._translationsConfigFile;
        } catch (e) {}
    }
    _isNative = true;
} else if ((typeof navigator === 'undefined' ? 'undefined' : _typeof(navigator)) === 'object') {
    var userAgent = navigator.userAgent;
    _isWindows = userAgent.indexOf('Windows') >= 0;
    _isMacintosh = userAgent.indexOf('Macintosh') >= 0;
    _isLinux = userAgent.indexOf('Linux') >= 0;
    _isWeb = true;
    _locale = navigator.language;
    _language = _locale;
}
var Platform = exports.Platform = undefined;
(function (Platform) {
    Platform[Platform["Web"] = 0] = "Web";
    Platform[Platform["Mac"] = 1] = "Mac";
    Platform[Platform["Linux"] = 2] = "Linux";
    Platform[Platform["Windows"] = 3] = "Windows";
})(Platform || (exports.Platform = Platform = {}));
var _platform = Platform.Web;
if (_isNative) {
    if (_isMacintosh) {
        _platform = Platform.Mac;
    } else if (_isWindows) {
        _platform = Platform.Windows;
    } else if (_isLinux) {
        _platform = Platform.Linux;
    }
}
var isWindows = exports.isWindows = _isWindows;
var isMacintosh = exports.isMacintosh = _isMacintosh;
var isLinux = exports.isLinux = _isLinux;
var isNative = exports.isNative = _isNative;
var isWeb = exports.isWeb = _isWeb;
var platform = exports.platform = _platform;
function isRootUser() {
    return _isNative && !_isWindows && process.getuid() === 0;
}
/**
 * The language used for the user interface. The format of
 * the string is all lower case (e.g. zh-tw for Traditional
 * Chinese)
 */
var language = exports.language = _language;
/**
 * The OS locale or the locale specified by --locale. The format of
 * the string is all lower case (e.g. zh-tw for Traditional
 * Chinese). The UI is not necessarily shown in the provided locale.
 */
var locale = exports.locale = _locale;
/**
 * The translatios that are available through language packs.
 */
var translationsConfigFile = exports.translationsConfigFile = _translationsConfigFile;
var _globals = (typeof self === 'undefined' ? 'undefined' : _typeof(self)) === 'object' ? self : (typeof global === 'undefined' ? 'undefined' : _typeof(global)) === 'object' ? global : {};
var globals = exports.globals = _globals;
var _setImmediate = null;
function setImmediate(callback) {
    if (_setImmediate === null) {
        if (globals.setImmediate) {
            _setImmediate = globals.setImmediate.bind(globals);
        } else if (typeof process !== 'undefined' && typeof process.nextTick === 'function') {
            _setImmediate = process.nextTick.bind(process);
        } else {
            _setImmediate = globals.setTimeout.bind(globals);
        }
    }
    return _setImmediate(callback);
}
var OS = exports.OS = _isMacintosh ? 2 /* Macintosh */ : _isWindows ? 1 /* Windows */ : 3 /* Linux */;
/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(9), __webpack_require__(10)))

/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _platform = __webpack_require__(5);

var platform = _interopRequireWildcard(_platform);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

var __extends = undefined && undefined.__extends || function () {
    var extendStatics = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function (d, b) {
        d.__proto__ = b;
    } || function (d, b) {
        for (var p in b) {
            if (b.hasOwnProperty(p)) d[p] = b[p];
        }
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() {
            this.constructor = d;
        }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
}();

function _encode(ch) {
    return '%' + ch.charCodeAt(0).toString(16).toUpperCase();
}
// see https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/encodeURIComponent
function encodeURIComponent2(str) {
    return encodeURIComponent(str).replace(/[!'()*]/g, _encode);
}
function encodeNoop(str) {
    return str.replace(/[#?]/, _encode);
}
var _schemePattern = /^\w[\w\d+.-]*$/;
var _singleSlashStart = /^\//;
var _doubleSlashStart = /^\/\//;
function _validateUri(ret) {
    // scheme, https://tools.ietf.org/html/rfc3986#section-3.1
    // ALPHA *( ALPHA / DIGIT / "+" / "-" / "." )
    if (ret.scheme && !_schemePattern.test(ret.scheme)) {
        throw new Error('[UriError]: Scheme contains illegal characters.');
    }
    // path, http://tools.ietf.org/html/rfc3986#section-3.3
    // If a URI contains an authority component, then the path component
    // must either be empty or begin with a slash ("/") character.  If a URI
    // does not contain an authority component, then the path cannot begin
    // with two slash characters ("//").
    if (ret.path) {
        if (ret.authority) {
            if (!_singleSlashStart.test(ret.path)) {
                throw new Error('[UriError]: If a URI contains an authority component, then the path component must either be empty or begin with a slash ("/") character');
            }
        } else {
            if (_doubleSlashStart.test(ret.path)) {
                throw new Error('[UriError]: If a URI does not contain an authority component, then the path cannot begin with two slash characters ("//")');
            }
        }
    }
}
var _empty = '';
var _slash = '/';
var _regexp = /^(([^:/?#]+?):)?(\/\/([^/?#]*))?([^?#]*)(\?([^#]*))?(#(.*))?/;
var _driveLetterPath = /^\/[a-zA-Z]:/;
var _upperCaseDrive = /^(\/)?([A-Z]:)/;
var _driveLetter = /^[a-zA-Z]:/;
/**
 * Uniform Resource Identifier (URI) http://tools.ietf.org/html/rfc3986.
 * This class is a simple parser which creates the basic component paths
 * (http://tools.ietf.org/html/rfc3986#section-3) with minimal validation
 * and encoding.
 *
 *       foo://example.com:8042/over/there?name=ferret#nose
 *       \_/   \______________/\_________/ \_________/ \__/
 *        |           |            |            |        |
 *     scheme     authority       path        query   fragment
 *        |   _____________________|__
 *       / \ /                        \
 *       urn:example:animal:ferret:nose
 *
 *
 */
var URI = /** @class */function () {
    /**
     * @internal
     */
    function URI(schemeOrData, authority, path, query, fragment) {
        if ((typeof schemeOrData === 'undefined' ? 'undefined' : _typeof(schemeOrData)) === 'object') {
            this.scheme = schemeOrData.scheme || _empty;
            this.authority = schemeOrData.authority || _empty;
            this.path = schemeOrData.path || _empty;
            this.query = schemeOrData.query || _empty;
            this.fragment = schemeOrData.fragment || _empty;
            // no validation because it's this URI
            // that creates uri components.
            // _validateUri(this);
        } else {
            this.scheme = schemeOrData || _empty;
            this.authority = authority || _empty;
            this.path = path || _empty;
            this.query = query || _empty;
            this.fragment = fragment || _empty;
            _validateUri(this);
        }
    }
    URI.isUri = function (thing) {
        if (thing instanceof URI) {
            return true;
        }
        if (!thing) {
            return false;
        }
        return typeof thing.authority === 'string' && typeof thing.fragment === 'string' && typeof thing.path === 'string' && typeof thing.query === 'string' && typeof thing.scheme === 'string';
    };
    Object.defineProperty(URI.prototype, "fsPath", {
        // ---- filesystem path -----------------------
        /**
         * Returns a string representing the corresponding file system path of this URI.
         * Will handle UNC paths and normalize windows drive letters to lower-case. Also
         * uses the platform specific path separator. Will *not* validate the path for
         * invalid characters and semantics. Will *not* look at the scheme of this URI.
         */
        get: function get() {
            return _makeFsPath(this);
        },
        enumerable: true,
        configurable: true
    });
    // ---- modify to new -------------------------
    URI.prototype.with = function (change) {
        if (!change) {
            return this;
        }
        var scheme = change.scheme,
            authority = change.authority,
            path = change.path,
            query = change.query,
            fragment = change.fragment;
        if (scheme === void 0) {
            scheme = this.scheme;
        } else if (scheme === null) {
            scheme = _empty;
        }
        if (authority === void 0) {
            authority = this.authority;
        } else if (authority === null) {
            authority = _empty;
        }
        if (path === void 0) {
            path = this.path;
        } else if (path === null) {
            path = _empty;
        }
        if (query === void 0) {
            query = this.query;
        } else if (query === null) {
            query = _empty;
        }
        if (fragment === void 0) {
            fragment = this.fragment;
        } else if (fragment === null) {
            fragment = _empty;
        }
        if (scheme === this.scheme && authority === this.authority && path === this.path && query === this.query && fragment === this.fragment) {
            return this;
        }
        return new _URI(scheme, authority, path, query, fragment);
    };
    // ---- parse & validate ------------------------
    URI.parse = function (value) {
        var match = _regexp.exec(value);
        if (!match) {
            return new _URI(_empty, _empty, _empty, _empty, _empty);
        }
        return new _URI(match[2] || _empty, decodeURIComponent(match[4] || _empty), decodeURIComponent(match[5] || _empty), decodeURIComponent(match[7] || _empty), decodeURIComponent(match[9] || _empty));
    };
    URI.file = function (path) {
        var authority = _empty;
        // normalize to fwd-slashes on windows,
        // on other systems bwd-slashes are valid
        // filename character, eg /f\oo/ba\r.txt
        if (platform.isWindows) {
            path = path.replace(/\\/g, _slash);
        }
        // check for authority as used in UNC shares
        // or use the path as given
        if (path[0] === _slash && path[1] === _slash) {
            var idx = path.indexOf(_slash, 2);
            if (idx === -1) {
                authority = path.substring(2);
                path = _slash;
            } else {
                authority = path.substring(2, idx);
                path = path.substring(idx) || _slash;
            }
        }
        // Ensure that path starts with a slash
        // or that it is at least a slash
        if (_driveLetter.test(path)) {
            path = _slash + path;
        } else if (path[0] !== _slash) {
            // tricky -> makes invalid paths
            // but otherwise we have to stop
            // allowing relative paths...
            path = _slash + path;
        }
        return new _URI('file', authority, path, _empty, _empty);
    };
    URI.from = function (components) {
        return new _URI(components.scheme, components.authority, components.path, components.query, components.fragment);
    };
    // ---- printing/externalize ---------------------------
    /**
     *
     * @param skipEncoding Do not encode the result, default is `false`
     */
    URI.prototype.toString = function (skipEncoding) {
        if (skipEncoding === void 0) {
            skipEncoding = false;
        }
        return _asFormatted(this, skipEncoding);
    };
    URI.prototype.toJSON = function () {
        var res = {
            $mid: 1,
            fsPath: this.fsPath,
            external: this.toString()
        };
        if (this.path) {
            res.path = this.path;
        }
        if (this.scheme) {
            res.scheme = this.scheme;
        }
        if (this.authority) {
            res.authority = this.authority;
        }
        if (this.query) {
            res.query = this.query;
        }
        if (this.fragment) {
            res.fragment = this.fragment;
        }
        return res;
    };
    URI.revive = function (data) {
        if (!data) {
            return data;
        } else if (data instanceof URI) {
            return data;
        } else {
            var result = new _URI(data);
            result._fsPath = data.fsPath;
            result._formatted = data.external;
            return result;
        }
    };
    return URI;
}();
exports.default = URI;
// tslint:disable-next-line:class-name

var _URI = /** @class */function (_super) {
    __extends(_URI, _super);
    function _URI() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this._formatted = null;
        _this._fsPath = null;
        return _this;
    }
    Object.defineProperty(_URI.prototype, "fsPath", {
        get: function get() {
            if (!this._fsPath) {
                this._fsPath = _makeFsPath(this);
            }
            return this._fsPath;
        },
        enumerable: true,
        configurable: true
    });
    _URI.prototype.toString = function (skipEncoding) {
        if (skipEncoding === void 0) {
            skipEncoding = false;
        }
        if (!skipEncoding) {
            if (!this._formatted) {
                this._formatted = _asFormatted(this, false);
            }
            return this._formatted;
        } else {
            // we don't cache that
            return _asFormatted(this, true);
        }
    };
    return _URI;
}(URI);
/**
 * Compute `fsPath` for the given uri
 * @param uri
 */
function _makeFsPath(uri) {
    var value;
    if (uri.authority && uri.path && uri.scheme === 'file') {
        // unc path: file://shares/c$/far/boo
        value = "//" + uri.authority + uri.path;
    } else if (_driveLetterPath.test(uri.path)) {
        // windows drive letter: file:///c:/far/boo
        value = uri.path[1].toLowerCase() + uri.path.substr(2);
    } else {
        // other path
        value = uri.path;
    }
    if (platform.isWindows) {
        value = value.replace(/\//g, '\\');
    }
    return value;
}
/**
 * Create the external version of a uri
 */
function _asFormatted(uri, skipEncoding) {
    var encoder = !skipEncoding ? encodeURIComponent2 : encodeNoop;
    var parts = [];
    var scheme = uri.scheme,
        authority = uri.authority,
        path = uri.path,
        query = uri.query,
        fragment = uri.fragment;
    if (scheme) {
        parts.push(scheme, ':');
    }
    if (authority || scheme === 'file') {
        parts.push('//');
    }
    if (authority) {
        var idx = authority.indexOf('@');
        if (idx !== -1) {
            var userinfo = authority.substr(0, idx);
            authority = authority.substr(idx + 1);
            idx = userinfo.indexOf(':');
            if (idx === -1) {
                parts.push(encoder(userinfo));
            } else {
                parts.push(encoder(userinfo.substr(0, idx)), ':', encoder(userinfo.substr(idx + 1)));
            }
            parts.push('@');
        }
        authority = authority.toLowerCase();
        idx = authority.indexOf(':');
        if (idx === -1) {
            parts.push(encoder(authority));
        } else {
            parts.push(encoder(authority.substr(0, idx)), authority.substr(idx));
        }
    }
    if (path) {
        // lower-case windows drive letters in /C:/fff or C:/fff
        var m = _upperCaseDrive.exec(path);
        if (m) {
            if (m[1]) {
                path = '/' + m[2].toLowerCase() + path.substr(3); // "/c:".length === 3
            } else {
                path = m[2].toLowerCase() + path.substr(2); // // "c:".length === 2
            }
        }
        // encode every segement but not slashes
        // make sure that # and ? are always encoded
        // when occurring in paths - otherwise the result
        // cannot be parsed back again
        var lastIdx = 0;
        while (true) {
            var idx = path.indexOf(_slash, lastIdx);
            if (idx === -1) {
                parts.push(encoder(path.substring(lastIdx)));
                break;
            }
            parts.push(encoder(path.substring(lastIdx, idx)), _slash);
            lastIdx = idx + 1;
        }
    }
    if (query) {
        parts.push('?', encoder(query));
    }
    if (fragment) {
        parts.push('#', encoder(fragment));
    }
    return parts.join(_empty);
}

/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.Range = undefined;

var _position = __webpack_require__(1);

/**
 * A range in the editor. (startLineNumber,startColumn) is <= (endLineNumber,endColumn)
 */
var Range = /** @class */function () {
    function Range(startLineNumber, startColumn, endLineNumber, endColumn) {
        if (startLineNumber > endLineNumber || startLineNumber === endLineNumber && startColumn > endColumn) {
            this.startLineNumber = endLineNumber;
            this.startColumn = endColumn;
            this.endLineNumber = startLineNumber;
            this.endColumn = startColumn;
        } else {
            this.startLineNumber = startLineNumber;
            this.startColumn = startColumn;
            this.endLineNumber = endLineNumber;
            this.endColumn = endColumn;
        }
    }
    /**
     * Test if this range is empty.
     */
    Range.prototype.isEmpty = function () {
        return Range.isEmpty(this);
    };
    /**
     * Test if `range` is empty.
     */
    Range.isEmpty = function (range) {
        return range.startLineNumber === range.endLineNumber && range.startColumn === range.endColumn;
    };
    /**
     * Test if position is in this range. If the position is at the edges, will return true.
     */
    Range.prototype.containsPosition = function (position) {
        return Range.containsPosition(this, position);
    };
    /**
     * Test if `position` is in `range`. If the position is at the edges, will return true.
     */
    Range.containsPosition = function (range, position) {
        if (position.lineNumber < range.startLineNumber || position.lineNumber > range.endLineNumber) {
            return false;
        }
        if (position.lineNumber === range.startLineNumber && position.column < range.startColumn) {
            return false;
        }
        if (position.lineNumber === range.endLineNumber && position.column > range.endColumn) {
            return false;
        }
        return true;
    };
    /**
     * Test if range is in this range. If the range is equal to this range, will return true.
     */
    Range.prototype.containsRange = function (range) {
        return Range.containsRange(this, range);
    };
    /**
     * Test if `otherRange` is in `range`. If the ranges are equal, will return true.
     */
    Range.containsRange = function (range, otherRange) {
        if (otherRange.startLineNumber < range.startLineNumber || otherRange.endLineNumber < range.startLineNumber) {
            return false;
        }
        if (otherRange.startLineNumber > range.endLineNumber || otherRange.endLineNumber > range.endLineNumber) {
            return false;
        }
        if (otherRange.startLineNumber === range.startLineNumber && otherRange.startColumn < range.startColumn) {
            return false;
        }
        if (otherRange.endLineNumber === range.endLineNumber && otherRange.endColumn > range.endColumn) {
            return false;
        }
        return true;
    };
    /**
     * A reunion of the two ranges.
     * The smallest position will be used as the start point, and the largest one as the end point.
     */
    Range.prototype.plusRange = function (range) {
        return Range.plusRange(this, range);
    };
    /**
     * A reunion of the two ranges.
     * The smallest position will be used as the start point, and the largest one as the end point.
     */
    Range.plusRange = function (a, b) {
        var startLineNumber;
        var startColumn;
        var endLineNumber;
        var endColumn;
        if (b.startLineNumber < a.startLineNumber) {
            startLineNumber = b.startLineNumber;
            startColumn = b.startColumn;
        } else if (b.startLineNumber === a.startLineNumber) {
            startLineNumber = b.startLineNumber;
            startColumn = Math.min(b.startColumn, a.startColumn);
        } else {
            startLineNumber = a.startLineNumber;
            startColumn = a.startColumn;
        }
        if (b.endLineNumber > a.endLineNumber) {
            endLineNumber = b.endLineNumber;
            endColumn = b.endColumn;
        } else if (b.endLineNumber === a.endLineNumber) {
            endLineNumber = b.endLineNumber;
            endColumn = Math.max(b.endColumn, a.endColumn);
        } else {
            endLineNumber = a.endLineNumber;
            endColumn = a.endColumn;
        }
        return new Range(startLineNumber, startColumn, endLineNumber, endColumn);
    };
    /**
     * A intersection of the two ranges.
     */
    Range.prototype.intersectRanges = function (range) {
        return Range.intersectRanges(this, range);
    };
    /**
     * A intersection of the two ranges.
     */
    Range.intersectRanges = function (a, b) {
        var resultStartLineNumber = a.startLineNumber;
        var resultStartColumn = a.startColumn;
        var resultEndLineNumber = a.endLineNumber;
        var resultEndColumn = a.endColumn;
        var otherStartLineNumber = b.startLineNumber;
        var otherStartColumn = b.startColumn;
        var otherEndLineNumber = b.endLineNumber;
        var otherEndColumn = b.endColumn;
        if (resultStartLineNumber < otherStartLineNumber) {
            resultStartLineNumber = otherStartLineNumber;
            resultStartColumn = otherStartColumn;
        } else if (resultStartLineNumber === otherStartLineNumber) {
            resultStartColumn = Math.max(resultStartColumn, otherStartColumn);
        }
        if (resultEndLineNumber > otherEndLineNumber) {
            resultEndLineNumber = otherEndLineNumber;
            resultEndColumn = otherEndColumn;
        } else if (resultEndLineNumber === otherEndLineNumber) {
            resultEndColumn = Math.min(resultEndColumn, otherEndColumn);
        }
        // Check if selection is now empty
        if (resultStartLineNumber > resultEndLineNumber) {
            return null;
        }
        if (resultStartLineNumber === resultEndLineNumber && resultStartColumn > resultEndColumn) {
            return null;
        }
        return new Range(resultStartLineNumber, resultStartColumn, resultEndLineNumber, resultEndColumn);
    };
    /**
     * Test if this range equals other.
     */
    Range.prototype.equalsRange = function (other) {
        return Range.equalsRange(this, other);
    };
    /**
     * Test if range `a` equals `b`.
     */
    Range.equalsRange = function (a, b) {
        return !!a && !!b && a.startLineNumber === b.startLineNumber && a.startColumn === b.startColumn && a.endLineNumber === b.endLineNumber && a.endColumn === b.endColumn;
    };
    /**
     * Return the end position (which will be after or equal to the start position)
     */
    Range.prototype.getEndPosition = function () {
        return new _position.Position(this.endLineNumber, this.endColumn);
    };
    /**
     * Return the start position (which will be before or equal to the end position)
     */
    Range.prototype.getStartPosition = function () {
        return new _position.Position(this.startLineNumber, this.startColumn);
    };
    /**
     * Transform to a user presentable string representation.
     */
    Range.prototype.toString = function () {
        return '[' + this.startLineNumber + ',' + this.startColumn + ' -> ' + this.endLineNumber + ',' + this.endColumn + ']';
    };
    /**
     * Create a new range using this range's start position, and using endLineNumber and endColumn as the end position.
     */
    Range.prototype.setEndPosition = function (endLineNumber, endColumn) {
        return new Range(this.startLineNumber, this.startColumn, endLineNumber, endColumn);
    };
    /**
     * Create a new range using this range's end position, and using startLineNumber and startColumn as the start position.
     */
    Range.prototype.setStartPosition = function (startLineNumber, startColumn) {
        return new Range(startLineNumber, startColumn, this.endLineNumber, this.endColumn);
    };
    /**
     * Create a new empty range using this range's start position.
     */
    Range.prototype.collapseToStart = function () {
        return Range.collapseToStart(this);
    };
    /**
     * Create a new empty range using this range's start position.
     */
    Range.collapseToStart = function (range) {
        return new Range(range.startLineNumber, range.startColumn, range.startLineNumber, range.startColumn);
    };
    // ---
    Range.fromPositions = function (start, end) {
        if (end === void 0) {
            end = start;
        }
        return new Range(start.lineNumber, start.column, end.lineNumber, end.column);
    };
    /**
     * Create a `Range` from an `IRange`.
     */
    Range.lift = function (range) {
        if (!range) {
            return null;
        }
        return new Range(range.startLineNumber, range.startColumn, range.endLineNumber, range.endColumn);
    };
    /**
     * Test if `obj` is an `IRange`.
     */
    Range.isIRange = function (obj) {
        return obj && typeof obj.startLineNumber === 'number' && typeof obj.startColumn === 'number' && typeof obj.endLineNumber === 'number' && typeof obj.endColumn === 'number';
    };
    /**
     * Test if the two ranges are touching in any way.
     */
    Range.areIntersectingOrTouching = function (a, b) {
        // Check if `a` is before `b`
        if (a.endLineNumber < b.startLineNumber || a.endLineNumber === b.startLineNumber && a.endColumn < b.startColumn) {
            return false;
        }
        // Check if `b` is before `a`
        if (b.endLineNumber < a.startLineNumber || b.endLineNumber === a.startLineNumber && b.endColumn < a.startColumn) {
            return false;
        }
        // These ranges must intersect
        return true;
    };
    /**
     * A function that compares ranges, useful for sorting ranges
     * It will first compare ranges on the startPosition and then on the endPosition
     */
    Range.compareRangesUsingStarts = function (a, b) {
        var aStartLineNumber = a.startLineNumber | 0;
        var bStartLineNumber = b.startLineNumber | 0;
        if (aStartLineNumber === bStartLineNumber) {
            var aStartColumn = a.startColumn | 0;
            var bStartColumn = b.startColumn | 0;
            if (aStartColumn === bStartColumn) {
                var aEndLineNumber = a.endLineNumber | 0;
                var bEndLineNumber = b.endLineNumber | 0;
                if (aEndLineNumber === bEndLineNumber) {
                    var aEndColumn = a.endColumn | 0;
                    var bEndColumn = b.endColumn | 0;
                    return aEndColumn - bEndColumn;
                }
                return aEndLineNumber - bEndLineNumber;
            }
            return aStartColumn - bStartColumn;
        }
        return aStartLineNumber - bStartLineNumber;
    };
    /**
     * A function that compares ranges, useful for sorting ranges
     * It will first compare ranges on the endPosition and then on the startPosition
     */
    Range.compareRangesUsingEnds = function (a, b) {
        if (a.endLineNumber === b.endLineNumber) {
            if (a.endColumn === b.endColumn) {
                if (a.startLineNumber === b.startLineNumber) {
                    return a.startColumn - b.startColumn;
                }
                return a.startLineNumber - b.startLineNumber;
            }
            return a.endColumn - b.endColumn;
        }
        return a.endLineNumber - b.endLineNumber;
    };
    /**
     * Test if the range spans multiple lines.
     */
    Range.spansMultipleLines = function (range) {
        return range.endLineNumber > range.startLineNumber;
    };
    return Range;
}();
exports.Range = Range;

/***/ }),
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.toUint8 = toUint8;
exports.toUint32 = toUint32;
exports.toUint32Array = toUint32Array;
var Uint8Matrix = /** @class */function () {
    function Uint8Matrix(rows, cols, defaultValue) {
        var data = new Uint8Array(rows * cols);
        for (var i = 0, len = rows * cols; i < len; i++) {
            data[i] = defaultValue;
        }
        this._data = data;
        this.rows = rows;
        this.cols = cols;
    }
    Uint8Matrix.prototype.get = function (row, col) {
        return this._data[row * this.cols + col];
    };
    Uint8Matrix.prototype.set = function (row, col, value) {
        this._data[row * this.cols + col] = value;
    };
    return Uint8Matrix;
}();
exports.Uint8Matrix = Uint8Matrix;
function toUint8(v) {
    if (v < 0) {
        return 0;
    }
    if (v > 255 /* MAX_UINT_8 */) {
            return 255 /* MAX_UINT_8 */;
        }
    return v | 0;
}
function toUint32(v) {
    if (v < 0) {
        return 0;
    }
    if (v > 4294967295 /* MAX_UINT_32 */) {
            return 4294967295 /* MAX_UINT_32 */;
        }
    return v | 0;
}
function toUint32Array(arr) {
    var len = arr.length;
    var r = new Uint32Array(len);
    for (var i = 0; i < len; i++) {
        r[i] = toUint32(arr[i]);
    }
    return r;
}

/***/ }),
/* 9 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


// shim for using process in browser
var process = module.exports = {};

// cached from whatever global is present so that test runners that stub it
// don't break things.  But we need to wrap it in a try catch in case it is
// wrapped in strict mode code which doesn't define any globals.  It's inside a
// function because try/catches deoptimize in certain engines.

var cachedSetTimeout;
var cachedClearTimeout;

function defaultSetTimout() {
    throw new Error('setTimeout has not been defined');
}
function defaultClearTimeout() {
    throw new Error('clearTimeout has not been defined');
}
(function () {
    try {
        if (typeof setTimeout === 'function') {
            cachedSetTimeout = setTimeout;
        } else {
            cachedSetTimeout = defaultSetTimout;
        }
    } catch (e) {
        cachedSetTimeout = defaultSetTimout;
    }
    try {
        if (typeof clearTimeout === 'function') {
            cachedClearTimeout = clearTimeout;
        } else {
            cachedClearTimeout = defaultClearTimeout;
        }
    } catch (e) {
        cachedClearTimeout = defaultClearTimeout;
    }
})();
function runTimeout(fun) {
    if (cachedSetTimeout === setTimeout) {
        //normal enviroments in sane situations
        return setTimeout(fun, 0);
    }
    // if setTimeout wasn't available but was latter defined
    if ((cachedSetTimeout === defaultSetTimout || !cachedSetTimeout) && setTimeout) {
        cachedSetTimeout = setTimeout;
        return setTimeout(fun, 0);
    }
    try {
        // when when somebody has screwed with setTimeout but no I.E. maddness
        return cachedSetTimeout(fun, 0);
    } catch (e) {
        try {
            // When we are in I.E. but the script has been evaled so I.E. doesn't trust the global object when called normally
            return cachedSetTimeout.call(null, fun, 0);
        } catch (e) {
            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error
            return cachedSetTimeout.call(this, fun, 0);
        }
    }
}
function runClearTimeout(marker) {
    if (cachedClearTimeout === clearTimeout) {
        //normal enviroments in sane situations
        return clearTimeout(marker);
    }
    // if clearTimeout wasn't available but was latter defined
    if ((cachedClearTimeout === defaultClearTimeout || !cachedClearTimeout) && clearTimeout) {
        cachedClearTimeout = clearTimeout;
        return clearTimeout(marker);
    }
    try {
        // when when somebody has screwed with setTimeout but no I.E. maddness
        return cachedClearTimeout(marker);
    } catch (e) {
        try {
            // When we are in I.E. but the script has been evaled so I.E. doesn't  trust the global object when called normally
            return cachedClearTimeout.call(null, marker);
        } catch (e) {
            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error.
            // Some versions of I.E. have different rules for clearTimeout vs setTimeout
            return cachedClearTimeout.call(this, marker);
        }
    }
}
var queue = [];
var draining = false;
var currentQueue;
var queueIndex = -1;

function cleanUpNextTick() {
    if (!draining || !currentQueue) {
        return;
    }
    draining = false;
    if (currentQueue.length) {
        queue = currentQueue.concat(queue);
    } else {
        queueIndex = -1;
    }
    if (queue.length) {
        drainQueue();
    }
}

function drainQueue() {
    if (draining) {
        return;
    }
    var timeout = runTimeout(cleanUpNextTick);
    draining = true;

    var len = queue.length;
    while (len) {
        currentQueue = queue;
        queue = [];
        while (++queueIndex < len) {
            if (currentQueue) {
                currentQueue[queueIndex].run();
            }
        }
        queueIndex = -1;
        len = queue.length;
    }
    currentQueue = null;
    draining = false;
    runClearTimeout(timeout);
}

process.nextTick = function (fun) {
    var args = new Array(arguments.length - 1);
    if (arguments.length > 1) {
        for (var i = 1; i < arguments.length; i++) {
            args[i - 1] = arguments[i];
        }
    }
    queue.push(new Item(fun, args));
    if (queue.length === 1 && !draining) {
        runTimeout(drainQueue);
    }
};

// v8 likes predictible objects
function Item(fun, array) {
    this.fun = fun;
    this.array = array;
}
Item.prototype.run = function () {
    this.fun.apply(null, this.array);
};
process.title = 'browser';
process.browser = true;
process.env = {};
process.argv = [];
process.version = ''; // empty string to avoid regexp issues
process.versions = {};

function noop() {}

process.on = noop;
process.addListener = noop;
process.once = noop;
process.off = noop;
process.removeListener = noop;
process.removeAllListeners = noop;
process.emit = noop;
process.prependListener = noop;
process.prependOnceListener = noop;

process.listeners = function (name) {
    return [];
};

process.binding = function (name) {
    throw new Error('process.binding is not supported');
};

process.cwd = function () {
    return '/';
};
process.chdir = function (dir) {
    throw new Error('process.chdir is not supported');
};
process.umask = function () {
    return 0;
};

/***/ }),
/* 10 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var g;

// This works in non-strict mode
g = function () {
	return this;
}();

try {
	// This works if eval is allowed (see CSP)
	g = g || Function("return this")() || (1, eval)("this");
} catch (e) {
	// This works if the window reference is available
	if ((typeof window === "undefined" ? "undefined" : _typeof(window)) === "object") g = window;
}

// g can still be undefined, but nothing to do about it...
// We return undefined, instead of nothing here, so it's
// easier to handle this case. if(!global) { ...}

module.exports = g;

/***/ }),
/* 11 */,
/* 12 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.CancellationTokenSource = exports.CancellationToken = undefined;

var _event = __webpack_require__(3);

var shortcutEvent = Object.freeze(function (callback, context) {
    var handle = setTimeout(callback.bind(context), 0);
    return { dispose: function dispose() {
            clearTimeout(handle);
        } };
});
var CancellationToken = exports.CancellationToken = undefined;
(function (CancellationToken) {
    CancellationToken.None = Object.freeze({
        isCancellationRequested: false,
        onCancellationRequested: _event.Event.None
    });
    CancellationToken.Cancelled = Object.freeze({
        isCancellationRequested: true,
        onCancellationRequested: shortcutEvent
    });
})(CancellationToken || (exports.CancellationToken = CancellationToken = {}));
var MutableToken = /** @class */function () {
    function MutableToken() {
        this._isCancelled = false;
    }
    MutableToken.prototype.cancel = function () {
        if (!this._isCancelled) {
            this._isCancelled = true;
            if (this._emitter) {
                this._emitter.fire(undefined);
                this.dispose();
            }
        }
    };
    Object.defineProperty(MutableToken.prototype, "isCancellationRequested", {
        get: function get() {
            return this._isCancelled;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MutableToken.prototype, "onCancellationRequested", {
        get: function get() {
            if (this._isCancelled) {
                return shortcutEvent;
            }
            if (!this._emitter) {
                this._emitter = new _event.Emitter();
            }
            return this._emitter.event;
        },
        enumerable: true,
        configurable: true
    });
    MutableToken.prototype.dispose = function () {
        if (this._emitter) {
            this._emitter.dispose();
            this._emitter = undefined;
        }
    };
    return MutableToken;
}();
var CancellationTokenSource = /** @class */function () {
    function CancellationTokenSource() {}
    Object.defineProperty(CancellationTokenSource.prototype, "token", {
        get: function get() {
            if (!this._token) {
                // be lazy and create the token only when
                // actually needed
                this._token = new MutableToken();
            }
            return this._token;
        },
        enumerable: true,
        configurable: true
    });
    CancellationTokenSource.prototype.cancel = function () {
        if (!this._token) {
            // save an object by returning the default
            // cancelled token when cancellation happens
            // before someone asks for the token
            this._token = CancellationToken.Cancelled;
        } else if (this._token instanceof MutableToken) {
            // actually cancel
            this._token.cancel();
        }
    };
    CancellationTokenSource.prototype.dispose = function () {
        if (!this._token) {
            // ensure to initialize with an empty token if we had none
            this._token = CancellationToken.None;
        } else if (this._token instanceof MutableToken) {
            // actually dispose
            this._token.dispose();
        }
    };
    return CancellationTokenSource;
}();
exports.CancellationTokenSource = CancellationTokenSource;

/***/ }),
/* 13 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.LcsDiff = exports.MyArray = exports.Debug = undefined;
exports.stringDiff = stringDiff;

var _diffChange = __webpack_require__(21);

function createStringSequence(a) {
    return {
        getLength: function getLength() {
            return a.length;
        },
        getElementHash: function getElementHash(pos) {
            return a[pos];
        }
    };
}
function stringDiff(original, modified, pretty) {
    return new LcsDiff(createStringSequence(original), createStringSequence(modified)).ComputeDiff(pretty);
}
//
// The code below has been ported from a C# implementation in VS
//
var Debug = /** @class */function () {
    function Debug() {}
    Debug.Assert = function (condition, message) {
        if (!condition) {
            throw new Error(message);
        }
    };
    return Debug;
}();
exports.Debug = Debug;

var MyArray = /** @class */function () {
    function MyArray() {}
    /**
     * Copies a range of elements from an Array starting at the specified source index and pastes
     * them to another Array starting at the specified destination index. The length and the indexes
     * are specified as 64-bit integers.
     * sourceArray:
     *		The Array that contains the data to copy.
     * sourceIndex:
     *		A 64-bit integer that represents the index in the sourceArray at which copying begins.
     * destinationArray:
     *		The Array that receives the data.
     * destinationIndex:
     *		A 64-bit integer that represents the index in the destinationArray at which storing begins.
     * length:
     *		A 64-bit integer that represents the number of elements to copy.
     */
    MyArray.Copy = function (sourceArray, sourceIndex, destinationArray, destinationIndex, length) {
        for (var i = 0; i < length; i++) {
            destinationArray[destinationIndex + i] = sourceArray[sourceIndex + i];
        }
    };
    return MyArray;
}();
exports.MyArray = MyArray;
//*****************************************************************************
// LcsDiff.cs
//
// An implementation of the difference algorithm described in
// "An O(ND) Difference Algorithm and its variations" by Eugene W. Myers
//
// Copyright (C) 2008 Microsoft Corporation @minifier_do_not_preserve
//*****************************************************************************
// Our total memory usage for storing history is (worst-case):
// 2 * [(MaxDifferencesHistory + 1) * (MaxDifferencesHistory + 1) - 1] * sizeof(int)
// 2 * [1448*1448 - 1] * 4 = 16773624 = 16MB

var MaxDifferencesHistory = 1447;
//let MaxDifferencesHistory = 100;
/**
 * A utility class which helps to create the set of DiffChanges from
 * a difference operation. This class accepts original DiffElements and
 * modified DiffElements that are involved in a particular change. The
 * MarktNextChange() method can be called to mark the separation between
 * distinct changes. At the end, the Changes property can be called to retrieve
 * the constructed changes.
 */
var DiffChangeHelper = /** @class */function () {
    /**
     * Constructs a new DiffChangeHelper for the given DiffSequences.
     */
    function DiffChangeHelper() {
        this.m_changes = [];
        this.m_originalStart = Number.MAX_VALUE;
        this.m_modifiedStart = Number.MAX_VALUE;
        this.m_originalCount = 0;
        this.m_modifiedCount = 0;
    }
    /**
     * Marks the beginning of the next change in the set of differences.
     */
    DiffChangeHelper.prototype.MarkNextChange = function () {
        // Only add to the list if there is something to add
        if (this.m_originalCount > 0 || this.m_modifiedCount > 0) {
            // Add the new change to our list
            this.m_changes.push(new _diffChange.DiffChange(this.m_originalStart, this.m_originalCount, this.m_modifiedStart, this.m_modifiedCount));
        }
        // Reset for the next change
        this.m_originalCount = 0;
        this.m_modifiedCount = 0;
        this.m_originalStart = Number.MAX_VALUE;
        this.m_modifiedStart = Number.MAX_VALUE;
    };
    /**
     * Adds the original element at the given position to the elements
     * affected by the current change. The modified index gives context
     * to the change position with respect to the original sequence.
     * @param originalIndex The index of the original element to add.
     * @param modifiedIndex The index of the modified element that provides corresponding position in the modified sequence.
     */
    DiffChangeHelper.prototype.AddOriginalElement = function (originalIndex, modifiedIndex) {
        // The 'true' start index is the smallest of the ones we've seen
        this.m_originalStart = Math.min(this.m_originalStart, originalIndex);
        this.m_modifiedStart = Math.min(this.m_modifiedStart, modifiedIndex);
        this.m_originalCount++;
    };
    /**
     * Adds the modified element at the given position to the elements
     * affected by the current change. The original index gives context
     * to the change position with respect to the modified sequence.
     * @param originalIndex The index of the original element that provides corresponding position in the original sequence.
     * @param modifiedIndex The index of the modified element to add.
     */
    DiffChangeHelper.prototype.AddModifiedElement = function (originalIndex, modifiedIndex) {
        // The 'true' start index is the smallest of the ones we've seen
        this.m_originalStart = Math.min(this.m_originalStart, originalIndex);
        this.m_modifiedStart = Math.min(this.m_modifiedStart, modifiedIndex);
        this.m_modifiedCount++;
    };
    /**
     * Retrieves all of the changes marked by the class.
     */
    DiffChangeHelper.prototype.getChanges = function () {
        if (this.m_originalCount > 0 || this.m_modifiedCount > 0) {
            // Finish up on whatever is left
            this.MarkNextChange();
        }
        return this.m_changes;
    };
    /**
     * Retrieves all of the changes marked by the class in the reverse order
     */
    DiffChangeHelper.prototype.getReverseChanges = function () {
        if (this.m_originalCount > 0 || this.m_modifiedCount > 0) {
            // Finish up on whatever is left
            this.MarkNextChange();
        }
        this.m_changes.reverse();
        return this.m_changes;
    };
    return DiffChangeHelper;
}();
var hasOwnProperty = Object.prototype.hasOwnProperty;
/**
 * An implementation of the difference algorithm described in
 * "An O(ND) Difference Algorithm and its variations" by Eugene W. Myers
 */
var LcsDiff = /** @class */function () {
    /**
     * Constructs the DiffFinder
     */
    function LcsDiff(originalSequence, newSequence, continueProcessingPredicate) {
        if (continueProcessingPredicate === void 0) {
            continueProcessingPredicate = null;
        }
        this.OriginalSequence = originalSequence;
        this.ModifiedSequence = newSequence;
        this.ContinueProcessingPredicate = continueProcessingPredicate;
        this.m_originalIds = [];
        this.m_modifiedIds = [];
        this.m_forwardHistory = [];
        this.m_reverseHistory = [];
        this.ComputeUniqueIdentifiers();
    }
    LcsDiff.prototype.ComputeUniqueIdentifiers = function () {
        var originalSequenceLength = this.OriginalSequence.getLength();
        var modifiedSequenceLength = this.ModifiedSequence.getLength();
        this.m_originalIds = new Array(originalSequenceLength);
        this.m_modifiedIds = new Array(modifiedSequenceLength);
        // Create a new hash table for unique elements from the original
        // sequence.
        var hashTable = {};
        var currentUniqueId = 1;
        var i;
        // Fill up the hash table for unique elements
        for (i = 0; i < originalSequenceLength; i++) {
            var originalElementHash = this.OriginalSequence.getElementHash(i);
            if (!hasOwnProperty.call(hashTable, originalElementHash)) {
                // No entry in the hashtable so this is a new unique element.
                // Assign the element a new unique identifier and add it to the
                // hash table
                this.m_originalIds[i] = currentUniqueId++;
                hashTable[originalElementHash] = this.m_originalIds[i];
            } else {
                this.m_originalIds[i] = hashTable[originalElementHash];
            }
        }
        // Now match up modified elements
        for (i = 0; i < modifiedSequenceLength; i++) {
            var modifiedElementHash = this.ModifiedSequence.getElementHash(i);
            if (!hasOwnProperty.call(hashTable, modifiedElementHash)) {
                this.m_modifiedIds[i] = currentUniqueId++;
                hashTable[modifiedElementHash] = this.m_modifiedIds[i];
            } else {
                this.m_modifiedIds[i] = hashTable[modifiedElementHash];
            }
        }
    };
    LcsDiff.prototype.ElementsAreEqual = function (originalIndex, newIndex) {
        return this.m_originalIds[originalIndex] === this.m_modifiedIds[newIndex];
    };
    LcsDiff.prototype.OriginalElementsAreEqual = function (index1, index2) {
        return this.m_originalIds[index1] === this.m_originalIds[index2];
    };
    LcsDiff.prototype.ModifiedElementsAreEqual = function (index1, index2) {
        return this.m_modifiedIds[index1] === this.m_modifiedIds[index2];
    };
    LcsDiff.prototype.ComputeDiff = function (pretty) {
        return this._ComputeDiff(0, this.OriginalSequence.getLength() - 1, 0, this.ModifiedSequence.getLength() - 1, pretty);
    };
    /**
     * Computes the differences between the original and modified input
     * sequences on the bounded range.
     * @returns An array of the differences between the two input sequences.
     */
    LcsDiff.prototype._ComputeDiff = function (originalStart, originalEnd, modifiedStart, modifiedEnd, pretty) {
        var quitEarlyArr = [false];
        var changes = this.ComputeDiffRecursive(originalStart, originalEnd, modifiedStart, modifiedEnd, quitEarlyArr);
        if (pretty) {
            // We have to clean up the computed diff to be more intuitive
            // but it turns out this cannot be done correctly until the entire set
            // of diffs have been computed
            return this.ShiftChanges(changes);
        }
        return changes;
    };
    /**
     * Private helper method which computes the differences on the bounded range
     * recursively.
     * @returns An array of the differences between the two input sequences.
     */
    LcsDiff.prototype.ComputeDiffRecursive = function (originalStart, originalEnd, modifiedStart, modifiedEnd, quitEarlyArr) {
        quitEarlyArr[0] = false;
        // Find the start of the differences
        while (originalStart <= originalEnd && modifiedStart <= modifiedEnd && this.ElementsAreEqual(originalStart, modifiedStart)) {
            originalStart++;
            modifiedStart++;
        }
        // Find the end of the differences
        while (originalEnd >= originalStart && modifiedEnd >= modifiedStart && this.ElementsAreEqual(originalEnd, modifiedEnd)) {
            originalEnd--;
            modifiedEnd--;
        }
        // In the special case where we either have all insertions or all deletions or the sequences are identical
        if (originalStart > originalEnd || modifiedStart > modifiedEnd) {
            var changes = void 0;
            if (modifiedStart <= modifiedEnd) {
                Debug.Assert(originalStart === originalEnd + 1, 'originalStart should only be one more than originalEnd');
                // All insertions
                changes = [new _diffChange.DiffChange(originalStart, 0, modifiedStart, modifiedEnd - modifiedStart + 1)];
            } else if (originalStart <= originalEnd) {
                Debug.Assert(modifiedStart === modifiedEnd + 1, 'modifiedStart should only be one more than modifiedEnd');
                // All deletions
                changes = [new _diffChange.DiffChange(originalStart, originalEnd - originalStart + 1, modifiedStart, 0)];
            } else {
                Debug.Assert(originalStart === originalEnd + 1, 'originalStart should only be one more than originalEnd');
                Debug.Assert(modifiedStart === modifiedEnd + 1, 'modifiedStart should only be one more than modifiedEnd');
                // Identical sequences - No differences
                changes = [];
            }
            return changes;
        }
        // This problem can be solved using the Divide-And-Conquer technique.
        var midOriginalArr = [0],
            midModifiedArr = [0];
        var result = this.ComputeRecursionPoint(originalStart, originalEnd, modifiedStart, modifiedEnd, midOriginalArr, midModifiedArr, quitEarlyArr);
        var midOriginal = midOriginalArr[0];
        var midModified = midModifiedArr[0];
        if (result !== null) {
            // Result is not-null when there was enough memory to compute the changes while
            // searching for the recursion point
            return result;
        } else if (!quitEarlyArr[0]) {
            // We can break the problem down recursively by finding the changes in the
            // First Half:   (originalStart, modifiedStart) to (midOriginal, midModified)
            // Second Half:  (midOriginal + 1, minModified + 1) to (originalEnd, modifiedEnd)
            // NOTE: ComputeDiff() is inclusive, therefore the second range starts on the next point
            var leftChanges = this.ComputeDiffRecursive(originalStart, midOriginal, modifiedStart, midModified, quitEarlyArr);
            var rightChanges = [];
            if (!quitEarlyArr[0]) {
                rightChanges = this.ComputeDiffRecursive(midOriginal + 1, originalEnd, midModified + 1, modifiedEnd, quitEarlyArr);
            } else {
                // We did't have time to finish the first half, so we don't have time to compute this half.
                // Consider the entire rest of the sequence different.
                rightChanges = [new _diffChange.DiffChange(midOriginal + 1, originalEnd - (midOriginal + 1) + 1, midModified + 1, modifiedEnd - (midModified + 1) + 1)];
            }
            return this.ConcatenateChanges(leftChanges, rightChanges);
        }
        // If we hit here, we quit early, and so can't return anything meaningful
        return [new _diffChange.DiffChange(originalStart, originalEnd - originalStart + 1, modifiedStart, modifiedEnd - modifiedStart + 1)];
    };
    LcsDiff.prototype.WALKTRACE = function (diagonalForwardBase, diagonalForwardStart, diagonalForwardEnd, diagonalForwardOffset, diagonalReverseBase, diagonalReverseStart, diagonalReverseEnd, diagonalReverseOffset, forwardPoints, reversePoints, originalIndex, originalEnd, midOriginalArr, modifiedIndex, modifiedEnd, midModifiedArr, deltaIsEven, quitEarlyArr) {
        var forwardChanges = null,
            reverseChanges = null;
        // First, walk backward through the forward diagonals history
        var changeHelper = new DiffChangeHelper();
        var diagonalMin = diagonalForwardStart;
        var diagonalMax = diagonalForwardEnd;
        var diagonalRelative = midOriginalArr[0] - midModifiedArr[0] - diagonalForwardOffset;
        var lastOriginalIndex = Number.MIN_VALUE;
        var historyIndex = this.m_forwardHistory.length - 1;
        var diagonal;
        do {
            // Get the diagonal index from the relative diagonal number
            diagonal = diagonalRelative + diagonalForwardBase;
            // Figure out where we came from
            if (diagonal === diagonalMin || diagonal < diagonalMax && forwardPoints[diagonal - 1] < forwardPoints[diagonal + 1]) {
                // Vertical line (the element is an insert)
                originalIndex = forwardPoints[diagonal + 1];
                modifiedIndex = originalIndex - diagonalRelative - diagonalForwardOffset;
                if (originalIndex < lastOriginalIndex) {
                    changeHelper.MarkNextChange();
                }
                lastOriginalIndex = originalIndex;
                changeHelper.AddModifiedElement(originalIndex + 1, modifiedIndex);
                diagonalRelative = diagonal + 1 - diagonalForwardBase; //Setup for the next iteration
            } else {
                // Horizontal line (the element is a deletion)
                originalIndex = forwardPoints[diagonal - 1] + 1;
                modifiedIndex = originalIndex - diagonalRelative - diagonalForwardOffset;
                if (originalIndex < lastOriginalIndex) {
                    changeHelper.MarkNextChange();
                }
                lastOriginalIndex = originalIndex - 1;
                changeHelper.AddOriginalElement(originalIndex, modifiedIndex + 1);
                diagonalRelative = diagonal - 1 - diagonalForwardBase; //Setup for the next iteration
            }
            if (historyIndex >= 0) {
                forwardPoints = this.m_forwardHistory[historyIndex];
                diagonalForwardBase = forwardPoints[0]; //We stored this in the first spot
                diagonalMin = 1;
                diagonalMax = forwardPoints.length - 1;
            }
        } while (--historyIndex >= -1);
        // Ironically, we get the forward changes as the reverse of the
        // order we added them since we technically added them backwards
        forwardChanges = changeHelper.getReverseChanges();
        if (quitEarlyArr[0]) {
            // TODO: Calculate a partial from the reverse diagonals.
            //       For now, just assume everything after the midOriginal/midModified point is a diff
            var originalStartPoint = midOriginalArr[0] + 1;
            var modifiedStartPoint = midModifiedArr[0] + 1;
            if (forwardChanges !== null && forwardChanges.length > 0) {
                var lastForwardChange = forwardChanges[forwardChanges.length - 1];
                originalStartPoint = Math.max(originalStartPoint, lastForwardChange.getOriginalEnd());
                modifiedStartPoint = Math.max(modifiedStartPoint, lastForwardChange.getModifiedEnd());
            }
            reverseChanges = [new _diffChange.DiffChange(originalStartPoint, originalEnd - originalStartPoint + 1, modifiedStartPoint, modifiedEnd - modifiedStartPoint + 1)];
        } else {
            // Now walk backward through the reverse diagonals history
            changeHelper = new DiffChangeHelper();
            diagonalMin = diagonalReverseStart;
            diagonalMax = diagonalReverseEnd;
            diagonalRelative = midOriginalArr[0] - midModifiedArr[0] - diagonalReverseOffset;
            lastOriginalIndex = Number.MAX_VALUE;
            historyIndex = deltaIsEven ? this.m_reverseHistory.length - 1 : this.m_reverseHistory.length - 2;
            do {
                // Get the diagonal index from the relative diagonal number
                diagonal = diagonalRelative + diagonalReverseBase;
                // Figure out where we came from
                if (diagonal === diagonalMin || diagonal < diagonalMax && reversePoints[diagonal - 1] >= reversePoints[diagonal + 1]) {
                    // Horizontal line (the element is a deletion))
                    originalIndex = reversePoints[diagonal + 1] - 1;
                    modifiedIndex = originalIndex - diagonalRelative - diagonalReverseOffset;
                    if (originalIndex > lastOriginalIndex) {
                        changeHelper.MarkNextChange();
                    }
                    lastOriginalIndex = originalIndex + 1;
                    changeHelper.AddOriginalElement(originalIndex + 1, modifiedIndex + 1);
                    diagonalRelative = diagonal + 1 - diagonalReverseBase; //Setup for the next iteration
                } else {
                    // Vertical line (the element is an insertion)
                    originalIndex = reversePoints[diagonal - 1];
                    modifiedIndex = originalIndex - diagonalRelative - diagonalReverseOffset;
                    if (originalIndex > lastOriginalIndex) {
                        changeHelper.MarkNextChange();
                    }
                    lastOriginalIndex = originalIndex;
                    changeHelper.AddModifiedElement(originalIndex + 1, modifiedIndex + 1);
                    diagonalRelative = diagonal - 1 - diagonalReverseBase; //Setup for the next iteration
                }
                if (historyIndex >= 0) {
                    reversePoints = this.m_reverseHistory[historyIndex];
                    diagonalReverseBase = reversePoints[0]; //We stored this in the first spot
                    diagonalMin = 1;
                    diagonalMax = reversePoints.length - 1;
                }
            } while (--historyIndex >= -1);
            // There are cases where the reverse history will find diffs that
            // are correct, but not intuitive, so we need shift them.
            reverseChanges = changeHelper.getChanges();
        }
        return this.ConcatenateChanges(forwardChanges, reverseChanges);
    };
    /**
     * Given the range to compute the diff on, this method finds the point:
     * (midOriginal, midModified)
     * that exists in the middle of the LCS of the two sequences and
     * is the point at which the LCS problem may be broken down recursively.
     * This method will try to keep the LCS trace in memory. If the LCS recursion
     * point is calculated and the full trace is available in memory, then this method
     * will return the change list.
     * @param originalStart The start bound of the original sequence range
     * @param originalEnd The end bound of the original sequence range
     * @param modifiedStart The start bound of the modified sequence range
     * @param modifiedEnd The end bound of the modified sequence range
     * @param midOriginal The middle point of the original sequence range
     * @param midModified The middle point of the modified sequence range
     * @returns The diff changes, if available, otherwise null
     */
    LcsDiff.prototype.ComputeRecursionPoint = function (originalStart, originalEnd, modifiedStart, modifiedEnd, midOriginalArr, midModifiedArr, quitEarlyArr) {
        var originalIndex, modifiedIndex;
        var diagonalForwardStart = 0,
            diagonalForwardEnd = 0;
        var diagonalReverseStart = 0,
            diagonalReverseEnd = 0;
        var numDifferences;
        // To traverse the edit graph and produce the proper LCS, our actual
        // start position is just outside the given boundary
        originalStart--;
        modifiedStart--;
        // We set these up to make the compiler happy, but they will
        // be replaced before we return with the actual recursion point
        midOriginalArr[0] = 0;
        midModifiedArr[0] = 0;
        // Clear out the history
        this.m_forwardHistory = [];
        this.m_reverseHistory = [];
        // Each cell in the two arrays corresponds to a diagonal in the edit graph.
        // The integer value in the cell represents the originalIndex of the furthest
        // reaching point found so far that ends in that diagonal.
        // The modifiedIndex can be computed mathematically from the originalIndex and the diagonal number.
        var maxDifferences = originalEnd - originalStart + (modifiedEnd - modifiedStart);
        var numDiagonals = maxDifferences + 1;
        var forwardPoints = new Array(numDiagonals);
        var reversePoints = new Array(numDiagonals);
        // diagonalForwardBase: Index into forwardPoints of the diagonal which passes through (originalStart, modifiedStart)
        // diagonalReverseBase: Index into reversePoints of the diagonal which passes through (originalEnd, modifiedEnd)
        var diagonalForwardBase = modifiedEnd - modifiedStart;
        var diagonalReverseBase = originalEnd - originalStart;
        // diagonalForwardOffset: Geometric offset which allows modifiedIndex to be computed from originalIndex and the
        //    diagonal number (relative to diagonalForwardBase)
        // diagonalReverseOffset: Geometric offset which allows modifiedIndex to be computed from originalIndex and the
        //    diagonal number (relative to diagonalReverseBase)
        var diagonalForwardOffset = originalStart - modifiedStart;
        var diagonalReverseOffset = originalEnd - modifiedEnd;
        // delta: The difference between the end diagonal and the start diagonal. This is used to relate diagonal numbers
        //   relative to the start diagonal with diagonal numbers relative to the end diagonal.
        // The Even/Oddn-ness of this delta is important for determining when we should check for overlap
        var delta = diagonalReverseBase - diagonalForwardBase;
        var deltaIsEven = delta % 2 === 0;
        // Here we set up the start and end points as the furthest points found so far
        // in both the forward and reverse directions, respectively
        forwardPoints[diagonalForwardBase] = originalStart;
        reversePoints[diagonalReverseBase] = originalEnd;
        // Remember if we quit early, and thus need to do a best-effort result instead of a real result.
        quitEarlyArr[0] = false;
        // A couple of points:
        // --With this method, we iterate on the number of differences between the two sequences.
        //   The more differences there actually are, the longer this will take.
        // --Also, as the number of differences increases, we have to search on diagonals further
        //   away from the reference diagonal (which is diagonalForwardBase for forward, diagonalReverseBase for reverse).
        // --We extend on even diagonals (relative to the reference diagonal) only when numDifferences
        //   is even and odd diagonals only when numDifferences is odd.
        var diagonal, tempOriginalIndex;
        for (numDifferences = 1; numDifferences <= maxDifferences / 2 + 1; numDifferences++) {
            var furthestOriginalIndex = 0;
            var furthestModifiedIndex = 0;
            // Run the algorithm in the forward direction
            diagonalForwardStart = this.ClipDiagonalBound(diagonalForwardBase - numDifferences, numDifferences, diagonalForwardBase, numDiagonals);
            diagonalForwardEnd = this.ClipDiagonalBound(diagonalForwardBase + numDifferences, numDifferences, diagonalForwardBase, numDiagonals);
            for (diagonal = diagonalForwardStart; diagonal <= diagonalForwardEnd; diagonal += 2) {
                // STEP 1: We extend the furthest reaching point in the present diagonal
                // by looking at the diagonals above and below and picking the one whose point
                // is further away from the start point (originalStart, modifiedStart)
                if (diagonal === diagonalForwardStart || diagonal < diagonalForwardEnd && forwardPoints[diagonal - 1] < forwardPoints[diagonal + 1]) {
                    originalIndex = forwardPoints[diagonal + 1];
                } else {
                    originalIndex = forwardPoints[diagonal - 1] + 1;
                }
                modifiedIndex = originalIndex - (diagonal - diagonalForwardBase) - diagonalForwardOffset;
                // Save the current originalIndex so we can test for false overlap in step 3
                tempOriginalIndex = originalIndex;
                // STEP 2: We can continue to extend the furthest reaching point in the present diagonal
                // so long as the elements are equal.
                while (originalIndex < originalEnd && modifiedIndex < modifiedEnd && this.ElementsAreEqual(originalIndex + 1, modifiedIndex + 1)) {
                    originalIndex++;
                    modifiedIndex++;
                }
                forwardPoints[diagonal] = originalIndex;
                if (originalIndex + modifiedIndex > furthestOriginalIndex + furthestModifiedIndex) {
                    furthestOriginalIndex = originalIndex;
                    furthestModifiedIndex = modifiedIndex;
                }
                // STEP 3: If delta is odd (overlap first happens on forward when delta is odd)
                // and diagonal is in the range of reverse diagonals computed for numDifferences-1
                // (the previous iteration; we haven't computed reverse diagonals for numDifferences yet)
                // then check for overlap.
                if (!deltaIsEven && Math.abs(diagonal - diagonalReverseBase) <= numDifferences - 1) {
                    if (originalIndex >= reversePoints[diagonal]) {
                        midOriginalArr[0] = originalIndex;
                        midModifiedArr[0] = modifiedIndex;
                        if (tempOriginalIndex <= reversePoints[diagonal] && MaxDifferencesHistory > 0 && numDifferences <= MaxDifferencesHistory + 1) {
                            // BINGO! We overlapped, and we have the full trace in memory!
                            return this.WALKTRACE(diagonalForwardBase, diagonalForwardStart, diagonalForwardEnd, diagonalForwardOffset, diagonalReverseBase, diagonalReverseStart, diagonalReverseEnd, diagonalReverseOffset, forwardPoints, reversePoints, originalIndex, originalEnd, midOriginalArr, modifiedIndex, modifiedEnd, midModifiedArr, deltaIsEven, quitEarlyArr);
                        } else {
                            // Either false overlap, or we didn't have enough memory for the full trace
                            // Just return the recursion point
                            return null;
                        }
                    }
                }
            }
            // Check to see if we should be quitting early, before moving on to the next iteration.
            var matchLengthOfLongest = (furthestOriginalIndex - originalStart + (furthestModifiedIndex - modifiedStart) - numDifferences) / 2;
            if (this.ContinueProcessingPredicate !== null && !this.ContinueProcessingPredicate(furthestOriginalIndex, this.OriginalSequence, matchLengthOfLongest)) {
                // We can't finish, so skip ahead to generating a result from what we have.
                quitEarlyArr[0] = true;
                // Use the furthest distance we got in the forward direction.
                midOriginalArr[0] = furthestOriginalIndex;
                midModifiedArr[0] = furthestModifiedIndex;
                if (matchLengthOfLongest > 0 && MaxDifferencesHistory > 0 && numDifferences <= MaxDifferencesHistory + 1) {
                    // Enough of the history is in memory to walk it backwards
                    return this.WALKTRACE(diagonalForwardBase, diagonalForwardStart, diagonalForwardEnd, diagonalForwardOffset, diagonalReverseBase, diagonalReverseStart, diagonalReverseEnd, diagonalReverseOffset, forwardPoints, reversePoints, originalIndex, originalEnd, midOriginalArr, modifiedIndex, modifiedEnd, midModifiedArr, deltaIsEven, quitEarlyArr);
                } else {
                    // We didn't actually remember enough of the history.
                    //Since we are quiting the diff early, we need to shift back the originalStart and modified start
                    //back into the boundary limits since we decremented their value above beyond the boundary limit.
                    originalStart++;
                    modifiedStart++;
                    return [new _diffChange.DiffChange(originalStart, originalEnd - originalStart + 1, modifiedStart, modifiedEnd - modifiedStart + 1)];
                }
            }
            // Run the algorithm in the reverse direction
            diagonalReverseStart = this.ClipDiagonalBound(diagonalReverseBase - numDifferences, numDifferences, diagonalReverseBase, numDiagonals);
            diagonalReverseEnd = this.ClipDiagonalBound(diagonalReverseBase + numDifferences, numDifferences, diagonalReverseBase, numDiagonals);
            for (diagonal = diagonalReverseStart; diagonal <= diagonalReverseEnd; diagonal += 2) {
                // STEP 1: We extend the furthest reaching point in the present diagonal
                // by looking at the diagonals above and below and picking the one whose point
                // is further away from the start point (originalEnd, modifiedEnd)
                if (diagonal === diagonalReverseStart || diagonal < diagonalReverseEnd && reversePoints[diagonal - 1] >= reversePoints[diagonal + 1]) {
                    originalIndex = reversePoints[diagonal + 1] - 1;
                } else {
                    originalIndex = reversePoints[diagonal - 1];
                }
                modifiedIndex = originalIndex - (diagonal - diagonalReverseBase) - diagonalReverseOffset;
                // Save the current originalIndex so we can test for false overlap
                tempOriginalIndex = originalIndex;
                // STEP 2: We can continue to extend the furthest reaching point in the present diagonal
                // as long as the elements are equal.
                while (originalIndex > originalStart && modifiedIndex > modifiedStart && this.ElementsAreEqual(originalIndex, modifiedIndex)) {
                    originalIndex--;
                    modifiedIndex--;
                }
                reversePoints[diagonal] = originalIndex;
                // STEP 4: If delta is even (overlap first happens on reverse when delta is even)
                // and diagonal is in the range of forward diagonals computed for numDifferences
                // then check for overlap.
                if (deltaIsEven && Math.abs(diagonal - diagonalForwardBase) <= numDifferences) {
                    if (originalIndex <= forwardPoints[diagonal]) {
                        midOriginalArr[0] = originalIndex;
                        midModifiedArr[0] = modifiedIndex;
                        if (tempOriginalIndex >= forwardPoints[diagonal] && MaxDifferencesHistory > 0 && numDifferences <= MaxDifferencesHistory + 1) {
                            // BINGO! We overlapped, and we have the full trace in memory!
                            return this.WALKTRACE(diagonalForwardBase, diagonalForwardStart, diagonalForwardEnd, diagonalForwardOffset, diagonalReverseBase, diagonalReverseStart, diagonalReverseEnd, diagonalReverseOffset, forwardPoints, reversePoints, originalIndex, originalEnd, midOriginalArr, modifiedIndex, modifiedEnd, midModifiedArr, deltaIsEven, quitEarlyArr);
                        } else {
                            // Either false overlap, or we didn't have enough memory for the full trace
                            // Just return the recursion point
                            return null;
                        }
                    }
                }
            }
            // Save current vectors to history before the next iteration
            if (numDifferences <= MaxDifferencesHistory) {
                // We are allocating space for one extra int, which we fill with
                // the index of the diagonal base index
                var temp = new Array(diagonalForwardEnd - diagonalForwardStart + 2);
                temp[0] = diagonalForwardBase - diagonalForwardStart + 1;
                MyArray.Copy(forwardPoints, diagonalForwardStart, temp, 1, diagonalForwardEnd - diagonalForwardStart + 1);
                this.m_forwardHistory.push(temp);
                temp = new Array(diagonalReverseEnd - diagonalReverseStart + 2);
                temp[0] = diagonalReverseBase - diagonalReverseStart + 1;
                MyArray.Copy(reversePoints, diagonalReverseStart, temp, 1, diagonalReverseEnd - diagonalReverseStart + 1);
                this.m_reverseHistory.push(temp);
            }
        }
        // If we got here, then we have the full trace in history. We just have to convert it to a change list
        // NOTE: This part is a bit messy
        return this.WALKTRACE(diagonalForwardBase, diagonalForwardStart, diagonalForwardEnd, diagonalForwardOffset, diagonalReverseBase, diagonalReverseStart, diagonalReverseEnd, diagonalReverseOffset, forwardPoints, reversePoints, originalIndex, originalEnd, midOriginalArr, modifiedIndex, modifiedEnd, midModifiedArr, deltaIsEven, quitEarlyArr);
    };
    /**
     * Shifts the given changes to provide a more intuitive diff.
     * While the first element in a diff matches the first element after the diff,
     * we shift the diff down.
     *
     * @param changes The list of changes to shift
     * @returns The shifted changes
     */
    LcsDiff.prototype.ShiftChanges = function (changes) {
        var mergedDiffs;
        do {
            mergedDiffs = false;
            // Shift all the changes down first
            for (var i = 0; i < changes.length; i++) {
                var change = changes[i];
                var originalStop = i < changes.length - 1 ? changes[i + 1].originalStart : this.OriginalSequence.getLength();
                var modifiedStop = i < changes.length - 1 ? changes[i + 1].modifiedStart : this.ModifiedSequence.getLength();
                var checkOriginal = change.originalLength > 0;
                var checkModified = change.modifiedLength > 0;
                while (change.originalStart + change.originalLength < originalStop && change.modifiedStart + change.modifiedLength < modifiedStop && (!checkOriginal || this.OriginalElementsAreEqual(change.originalStart, change.originalStart + change.originalLength)) && (!checkModified || this.ModifiedElementsAreEqual(change.modifiedStart, change.modifiedStart + change.modifiedLength))) {
                    change.originalStart++;
                    change.modifiedStart++;
                }
            }
            // Build up the new list (we have to build a new list because we
            // might have changes we can merge together now)
            var result = new Array();
            var mergedChangeArr = [null];
            for (var i = 0; i < changes.length; i++) {
                if (i < changes.length - 1 && this.ChangesOverlap(changes[i], changes[i + 1], mergedChangeArr)) {
                    mergedDiffs = true;
                    result.push(mergedChangeArr[0]);
                    i++;
                } else {
                    result.push(changes[i]);
                }
            }
            changes = result;
        } while (mergedDiffs);
        // Shift changes back up until we hit empty or whitespace-only lines
        for (var i = changes.length - 1; i >= 0; i--) {
            var change = changes[i];
            var originalStop = 0;
            var modifiedStop = 0;
            if (i > 0) {
                var prevChange = changes[i - 1];
                if (prevChange.originalLength > 0) {
                    originalStop = prevChange.originalStart + prevChange.originalLength;
                }
                if (prevChange.modifiedLength > 0) {
                    modifiedStop = prevChange.modifiedStart + prevChange.modifiedLength;
                }
            }
            var checkOriginal = change.originalLength > 0;
            var checkModified = change.modifiedLength > 0;
            var bestDelta = 0;
            var bestScore = this._boundaryScore(change.originalStart, change.originalLength, change.modifiedStart, change.modifiedLength);
            for (var delta = 1;; delta++) {
                var originalStart = change.originalStart - delta;
                var modifiedStart = change.modifiedStart - delta;
                if (originalStart < originalStop || modifiedStart < modifiedStop) {
                    break;
                }
                if (checkOriginal && !this.OriginalElementsAreEqual(originalStart, originalStart + change.originalLength)) {
                    break;
                }
                if (checkModified && !this.ModifiedElementsAreEqual(modifiedStart, modifiedStart + change.modifiedLength)) {
                    break;
                }
                var score = this._boundaryScore(originalStart, change.originalLength, modifiedStart, change.modifiedLength);
                if (score > bestScore) {
                    bestScore = score;
                    bestDelta = delta;
                }
            }
            change.originalStart -= bestDelta;
            change.modifiedStart -= bestDelta;
        }
        return changes;
    };
    LcsDiff.prototype._OriginalIsBoundary = function (index) {
        if (index <= 0 || index >= this.OriginalSequence.getLength() - 1) {
            return true;
        }
        return (/^\s*$/.test(this.OriginalSequence.getElementHash(index))
        );
    };
    LcsDiff.prototype._OriginalRegionIsBoundary = function (originalStart, originalLength) {
        if (this._OriginalIsBoundary(originalStart) || this._OriginalIsBoundary(originalStart - 1)) {
            return true;
        }
        if (originalLength > 0) {
            var originalEnd = originalStart + originalLength;
            if (this._OriginalIsBoundary(originalEnd - 1) || this._OriginalIsBoundary(originalEnd)) {
                return true;
            }
        }
        return false;
    };
    LcsDiff.prototype._ModifiedIsBoundary = function (index) {
        if (index <= 0 || index >= this.ModifiedSequence.getLength() - 1) {
            return true;
        }
        return (/^\s*$/.test(this.ModifiedSequence.getElementHash(index))
        );
    };
    LcsDiff.prototype._ModifiedRegionIsBoundary = function (modifiedStart, modifiedLength) {
        if (this._ModifiedIsBoundary(modifiedStart) || this._ModifiedIsBoundary(modifiedStart - 1)) {
            return true;
        }
        if (modifiedLength > 0) {
            var modifiedEnd = modifiedStart + modifiedLength;
            if (this._ModifiedIsBoundary(modifiedEnd - 1) || this._ModifiedIsBoundary(modifiedEnd)) {
                return true;
            }
        }
        return false;
    };
    LcsDiff.prototype._boundaryScore = function (originalStart, originalLength, modifiedStart, modifiedLength) {
        var originalScore = this._OriginalRegionIsBoundary(originalStart, originalLength) ? 1 : 0;
        var modifiedScore = this._ModifiedRegionIsBoundary(modifiedStart, modifiedLength) ? 1 : 0;
        return originalScore + modifiedScore;
    };
    /**
     * Concatenates the two input DiffChange lists and returns the resulting
     * list.
     * @param The left changes
     * @param The right changes
     * @returns The concatenated list
     */
    LcsDiff.prototype.ConcatenateChanges = function (left, right) {
        var mergedChangeArr = [];
        var result = null;
        if (left.length === 0 || right.length === 0) {
            return right.length > 0 ? right : left;
        } else if (this.ChangesOverlap(left[left.length - 1], right[0], mergedChangeArr)) {
            // Since we break the problem down recursively, it is possible that we
            // might recurse in the middle of a change thereby splitting it into
            // two changes. Here in the combining stage, we detect and fuse those
            // changes back together
            result = new Array(left.length + right.length - 1);
            MyArray.Copy(left, 0, result, 0, left.length - 1);
            result[left.length - 1] = mergedChangeArr[0];
            MyArray.Copy(right, 1, result, left.length, right.length - 1);
            return result;
        } else {
            result = new Array(left.length + right.length);
            MyArray.Copy(left, 0, result, 0, left.length);
            MyArray.Copy(right, 0, result, left.length, right.length);
            return result;
        }
    };
    /**
     * Returns true if the two changes overlap and can be merged into a single
     * change
     * @param left The left change
     * @param right The right change
     * @param mergedChange The merged change if the two overlap, null otherwise
     * @returns True if the two changes overlap
     */
    LcsDiff.prototype.ChangesOverlap = function (left, right, mergedChangeArr) {
        Debug.Assert(left.originalStart <= right.originalStart, 'Left change is not less than or equal to right change');
        Debug.Assert(left.modifiedStart <= right.modifiedStart, 'Left change is not less than or equal to right change');
        if (left.originalStart + left.originalLength >= right.originalStart || left.modifiedStart + left.modifiedLength >= right.modifiedStart) {
            var originalStart = left.originalStart;
            var originalLength = left.originalLength;
            var modifiedStart = left.modifiedStart;
            var modifiedLength = left.modifiedLength;
            if (left.originalStart + left.originalLength >= right.originalStart) {
                originalLength = right.originalStart + right.originalLength - left.originalStart;
            }
            if (left.modifiedStart + left.modifiedLength >= right.modifiedStart) {
                modifiedLength = right.modifiedStart + right.modifiedLength - left.modifiedStart;
            }
            mergedChangeArr[0] = new _diffChange.DiffChange(originalStart, originalLength, modifiedStart, modifiedLength);
            return true;
        } else {
            mergedChangeArr[0] = null;
            return false;
        }
    };
    /**
     * Helper method used to clip a diagonal index to the range of valid
     * diagonals. This also decides whether or not the diagonal index,
     * if it exceeds the boundary, should be clipped to the boundary or clipped
     * one inside the boundary depending on the Even/Odd status of the boundary
     * and numDifferences.
     * @param diagonal The index of the diagonal to clip.
     * @param numDifferences The current number of differences being iterated upon.
     * @param diagonalBaseIndex The base reference diagonal.
     * @param numDiagonals The total number of diagonals.
     * @returns The clipped diagonal index.
     */
    LcsDiff.prototype.ClipDiagonalBound = function (diagonal, numDifferences, diagonalBaseIndex, numDiagonals) {
        if (diagonal >= 0 && diagonal < numDiagonals) {
            // Nothing to clip, its in range
            return diagonal;
        }
        // diagonalsBelow: The number of diagonals below the reference diagonal
        // diagonalsAbove: The number of diagonals above the reference diagonal
        var diagonalsBelow = diagonalBaseIndex;
        var diagonalsAbove = numDiagonals - diagonalBaseIndex - 1;
        var diffEven = numDifferences % 2 === 0;
        if (diagonal < 0) {
            var lowerBoundEven = diagonalsBelow % 2 === 0;
            return diffEven === lowerBoundEven ? 0 : 1;
        } else {
            var upperBoundEven = diagonalsAbove % 2 === 0;
            return diffEven === upperBoundEven ? numDiagonals - 1 : numDiagonals - 2;
        }
    };
    return LcsDiff;
}();
exports.LcsDiff = LcsDiff;

/***/ }),
/* 14 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.once = once;
function once(fn) {
    var _this = this;
    var didCall = false;
    var result;
    return function () {
        if (didCall) {
            return result;
        }
        didCall = true;
        result = fn.apply(_this, arguments);
        return result;
    };
}

/***/ }),
/* 15 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.initialize = initialize;

var _editorSimpleWorker = __webpack_require__(17);

var _simpleWorker = __webpack_require__(18);

var initialized = false;
function initialize(foreignModule) {
    if (initialized) {
        return;
    }
    initialized = true;
    var editorWorker = new _editorSimpleWorker.EditorSimpleWorkerImpl(foreignModule);
    var simpleWorker = new _simpleWorker.SimpleWorkerServer(function (msg) {
        self.postMessage(msg);
    }, editorWorker);
    self.onmessage = function (e) {
        simpleWorker.onmessage(e.data);
    };
}
self.onmessage = function (e) {
    // Ignore first message in this case and initialize if not yet initialized
    if (!initialized) {
        initialize(null);
    }
};

/***/ }),
/* 16 */,
/* 17 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.EditorSimpleWorkerImpl = exports.BaseEditorSimpleWorker = undefined;
exports.create = create;

var _uri = __webpack_require__(6);

var _uri2 = _interopRequireDefault(_uri);

var _winjsBase = __webpack_require__(0);

var _range = __webpack_require__(7);

var _diffComputer = __webpack_require__(29);

var _diff = __webpack_require__(13);

var _position = __webpack_require__(1);

var _mirrorTextModel = __webpack_require__(30);

var _linkComputer = __webpack_require__(32);

var _inplaceReplaceSupport = __webpack_require__(33);

var _wordHelper = __webpack_require__(31);

var _standaloneBase = __webpack_require__(34);

var _platform = __webpack_require__(5);

function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : { default: obj };
}

var __extends = undefined && undefined.__extends || function () {
    var extendStatics = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function (d, b) {
        d.__proto__ = b;
    } || function (d, b) {
        for (var p in b) {
            if (b.hasOwnProperty(p)) d[p] = b[p];
        }
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() {
            this.constructor = d;
        }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
}();

/**
 * @internal
 */
var MirrorModel = /** @class */function (_super) {
    __extends(MirrorModel, _super);
    function MirrorModel() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Object.defineProperty(MirrorModel.prototype, "uri", {
        get: function get() {
            return this._uri;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MirrorModel.prototype, "version", {
        get: function get() {
            return this._versionId;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MirrorModel.prototype, "eol", {
        get: function get() {
            return this._eol;
        },
        enumerable: true,
        configurable: true
    });
    MirrorModel.prototype.getValue = function () {
        return this.getText();
    };
    MirrorModel.prototype.getLinesContent = function () {
        return this._lines.slice(0);
    };
    MirrorModel.prototype.getLineCount = function () {
        return this._lines.length;
    };
    MirrorModel.prototype.getLineContent = function (lineNumber) {
        return this._lines[lineNumber - 1];
    };
    MirrorModel.prototype.getWordAtPosition = function (position, wordDefinition) {
        var wordAtText = (0, _wordHelper.getWordAtText)(position.column, (0, _wordHelper.ensureValidWordDefinition)(wordDefinition), this._lines[position.lineNumber - 1], 0);
        if (wordAtText) {
            return new _range.Range(position.lineNumber, wordAtText.startColumn, position.lineNumber, wordAtText.endColumn);
        }
        return null;
    };
    MirrorModel.prototype.getWordUntilPosition = function (position, wordDefinition) {
        var wordAtPosition = this.getWordAtPosition(position, wordDefinition);
        if (!wordAtPosition) {
            return {
                word: '',
                startColumn: position.column,
                endColumn: position.column
            };
        }
        return {
            word: this._lines[position.lineNumber - 1].substring(wordAtPosition.startColumn - 1, position.column - 1),
            startColumn: wordAtPosition.startColumn,
            endColumn: position.column
        };
    };
    MirrorModel.prototype.createWordIterator = function (wordDefinition) {
        var _this = this;
        var obj = {
            done: false,
            value: ''
        };
        var lineNumber = 0;
        var lineText;
        var wordRangesIdx = 0;
        var wordRanges = [];
        var next = function next() {
            if (wordRangesIdx < wordRanges.length) {
                obj.done = false;
                obj.value = lineText.substring(wordRanges[wordRangesIdx].start, wordRanges[wordRangesIdx].end);
                wordRangesIdx += 1;
            } else if (lineNumber >= _this._lines.length) {
                obj.done = true;
                obj.value = undefined;
            } else {
                lineText = _this._lines[lineNumber];
                wordRanges = _this._wordenize(lineText, wordDefinition);
                wordRangesIdx = 0;
                lineNumber += 1;
                return next();
            }
            return obj;
        };
        return { next: next };
    };
    MirrorModel.prototype._wordenize = function (content, wordDefinition) {
        var result = [];
        var match;
        wordDefinition.lastIndex = 0; // reset lastIndex just to be sure
        while (match = wordDefinition.exec(content)) {
            if (match[0].length === 0) {
                // it did match the empty string
                break;
            }
            result.push({ start: match.index, end: match.index + match[0].length });
        }
        return result;
    };
    MirrorModel.prototype.getValueInRange = function (range) {
        range = this._validateRange(range);
        if (range.startLineNumber === range.endLineNumber) {
            return this._lines[range.startLineNumber - 1].substring(range.startColumn - 1, range.endColumn - 1);
        }
        var lineEnding = this._eol;
        var startLineIndex = range.startLineNumber - 1;
        var endLineIndex = range.endLineNumber - 1;
        var resultLines = [];
        resultLines.push(this._lines[startLineIndex].substring(range.startColumn - 1));
        for (var i = startLineIndex + 1; i < endLineIndex; i++) {
            resultLines.push(this._lines[i]);
        }
        resultLines.push(this._lines[endLineIndex].substring(0, range.endColumn - 1));
        return resultLines.join(lineEnding);
    };
    MirrorModel.prototype.offsetAt = function (position) {
        position = this._validatePosition(position);
        this._ensureLineStarts();
        return this._lineStarts.getAccumulatedValue(position.lineNumber - 2) + (position.column - 1);
    };
    MirrorModel.prototype.positionAt = function (offset) {
        offset = Math.floor(offset);
        offset = Math.max(0, offset);
        this._ensureLineStarts();
        var out = this._lineStarts.getIndexOf(offset);
        var lineLength = this._lines[out.index].length;
        // Ensure we return a valid position
        return {
            lineNumber: 1 + out.index,
            column: 1 + Math.min(out.remainder, lineLength)
        };
    };
    MirrorModel.prototype._validateRange = function (range) {
        var start = this._validatePosition({ lineNumber: range.startLineNumber, column: range.startColumn });
        var end = this._validatePosition({ lineNumber: range.endLineNumber, column: range.endColumn });
        if (start.lineNumber !== range.startLineNumber || start.column !== range.startColumn || end.lineNumber !== range.endLineNumber || end.column !== range.endColumn) {
            return {
                startLineNumber: start.lineNumber,
                startColumn: start.column,
                endLineNumber: end.lineNumber,
                endColumn: end.column
            };
        }
        return range;
    };
    MirrorModel.prototype._validatePosition = function (position) {
        if (!_position.Position.isIPosition(position)) {
            throw new Error('bad position');
        }
        var lineNumber = position.lineNumber,
            column = position.column;
        var hasChanged = false;
        if (lineNumber < 1) {
            lineNumber = 1;
            column = 1;
            hasChanged = true;
        } else if (lineNumber > this._lines.length) {
            lineNumber = this._lines.length;
            column = this._lines[lineNumber - 1].length + 1;
            hasChanged = true;
        } else {
            var maxCharacter = this._lines[lineNumber - 1].length + 1;
            if (column < 1) {
                column = 1;
                hasChanged = true;
            } else if (column > maxCharacter) {
                column = maxCharacter;
                hasChanged = true;
            }
        }
        if (!hasChanged) {
            return position;
        } else {
            return { lineNumber: lineNumber, column: column };
        }
    };
    return MirrorModel;
}(_mirrorTextModel.MirrorTextModel);
/**
 * @internal
 */
var BaseEditorSimpleWorker = /** @class */function () {
    function BaseEditorSimpleWorker(foreignModuleFactory) {
        this._foreignModuleFactory = foreignModuleFactory;
        this._foreignModule = null;
    }
    // ---- BEGIN diff --------------------------------------------------------------------------
    BaseEditorSimpleWorker.prototype.computeDiff = function (originalUrl, modifiedUrl, ignoreTrimWhitespace) {
        var original = this._getModel(originalUrl);
        var modified = this._getModel(modifiedUrl);
        if (!original || !modified) {
            return null;
        }
        var originalLines = original.getLinesContent();
        var modifiedLines = modified.getLinesContent();
        var diffComputer = new _diffComputer.DiffComputer(originalLines, modifiedLines, {
            shouldPostProcessCharChanges: true,
            shouldIgnoreTrimWhitespace: ignoreTrimWhitespace,
            shouldMakePrettyDiff: true
        });
        return _winjsBase.TPromise.as(diffComputer.computeDiff());
    };
    BaseEditorSimpleWorker.prototype.computeDirtyDiff = function (originalUrl, modifiedUrl, ignoreTrimWhitespace) {
        var original = this._getModel(originalUrl);
        var modified = this._getModel(modifiedUrl);
        if (!original || !modified) {
            return null;
        }
        var originalLines = original.getLinesContent();
        var modifiedLines = modified.getLinesContent();
        var diffComputer = new _diffComputer.DiffComputer(originalLines, modifiedLines, {
            shouldPostProcessCharChanges: false,
            shouldIgnoreTrimWhitespace: ignoreTrimWhitespace,
            shouldMakePrettyDiff: true
        });
        return _winjsBase.TPromise.as(diffComputer.computeDiff());
    };
    BaseEditorSimpleWorker.prototype.computeMoreMinimalEdits = function (modelUrl, edits) {
        var model = this._getModel(modelUrl);
        if (!model) {
            return _winjsBase.TPromise.as(edits);
        }
        var result = [];
        var lastEol;
        for (var _i = 0, edits_1 = edits; _i < edits_1.length; _i++) {
            var _a = edits_1[_i],
                range = _a.range,
                text = _a.text,
                eol = _a.eol;
            if (typeof eol === 'number') {
                lastEol = eol;
            }
            if (!range) {
                // eol-change only
                continue;
            }
            var original = model.getValueInRange(range);
            text = text.replace(/\r\n|\n|\r/g, model.eol);
            if (original === text) {
                // noop
                continue;
            }
            // make sure diff won't take too long
            if (Math.max(text.length, original.length) > BaseEditorSimpleWorker._diffLimit) {
                result.push({ range: range, text: text });
                continue;
            }
            // compute diff between original and edit.text
            var changes = (0, _diff.stringDiff)(original, text, false);
            var editOffset = model.offsetAt(_range.Range.lift(range).getStartPosition());
            for (var _b = 0, changes_1 = changes; _b < changes_1.length; _b++) {
                var change = changes_1[_b];
                var start = model.positionAt(editOffset + change.originalStart);
                var end = model.positionAt(editOffset + change.originalStart + change.originalLength);
                var newEdit = {
                    text: text.substr(change.modifiedStart, change.modifiedLength),
                    range: { startLineNumber: start.lineNumber, startColumn: start.column, endLineNumber: end.lineNumber, endColumn: end.column }
                };
                if (model.getValueInRange(newEdit.range) !== newEdit.text) {
                    result.push(newEdit);
                }
            }
        }
        if (typeof lastEol === 'number') {
            result.push({ eol: lastEol, text: undefined, range: undefined });
        }
        return _winjsBase.TPromise.as(result);
    };
    // ---- END minimal edits ---------------------------------------------------------------
    BaseEditorSimpleWorker.prototype.computeLinks = function (modelUrl) {
        var model = this._getModel(modelUrl);
        if (!model) {
            return null;
        }
        return _winjsBase.TPromise.as((0, _linkComputer.computeLinks)(model));
    };
    BaseEditorSimpleWorker.prototype.textualSuggest = function (modelUrl, position, wordDef, wordDefFlags) {
        var model = this._getModel(modelUrl);
        if (model) {
            var suggestions = [];
            var wordDefRegExp = new RegExp(wordDef, wordDefFlags);
            var currentWord = model.getWordUntilPosition(position, wordDefRegExp).word;
            var seen = Object.create(null);
            seen[currentWord] = true;
            for (var iter = model.createWordIterator(wordDefRegExp), e = iter.next(); !e.done && suggestions.length <= BaseEditorSimpleWorker._suggestionsLimit; e = iter.next()) {
                var word = e.value;
                if (seen[word]) {
                    continue;
                }
                seen[word] = true;
                if (!isNaN(Number(word))) {
                    continue;
                }
                suggestions.push({
                    type: 'text',
                    label: word,
                    insertText: word,
                    noAutoAccept: true,
                    overwriteBefore: currentWord.length
                });
            }
            return _winjsBase.TPromise.as({ suggestions: suggestions });
        }
        return undefined;
    };
    // ---- END suggest --------------------------------------------------------------------------
    BaseEditorSimpleWorker.prototype.navigateValueSet = function (modelUrl, range, up, wordDef, wordDefFlags) {
        var model = this._getModel(modelUrl);
        if (!model) {
            return null;
        }
        var wordDefRegExp = new RegExp(wordDef, wordDefFlags);
        if (range.startColumn === range.endColumn) {
            range = {
                startLineNumber: range.startLineNumber,
                startColumn: range.startColumn,
                endLineNumber: range.endLineNumber,
                endColumn: range.endColumn + 1
            };
        }
        var selectionText = model.getValueInRange(range);
        var wordRange = model.getWordAtPosition({ lineNumber: range.startLineNumber, column: range.startColumn }, wordDefRegExp);
        var word = null;
        if (wordRange !== null) {
            word = model.getValueInRange(wordRange);
        }
        var result = _inplaceReplaceSupport.BasicInplaceReplace.INSTANCE.navigateValueSet(range, selectionText, wordRange, word, up);
        return _winjsBase.TPromise.as(result);
    };
    // ---- BEGIN foreign module support --------------------------------------------------------------------------
    BaseEditorSimpleWorker.prototype.loadForeignModule = function (moduleId, createData) {
        var _this = this;
        var ctx = {
            getMirrorModels: function getMirrorModels() {
                return _this._getModels();
            }
        };
        if (this._foreignModuleFactory) {
            this._foreignModule = this._foreignModuleFactory(ctx, createData);
            // static foreing module
            var methods = [];
            for (var prop in this._foreignModule) {
                if (typeof this._foreignModule[prop] === 'function') {
                    methods.push(prop);
                }
            }
            return _winjsBase.TPromise.as(methods);
        }
        return new _winjsBase.TPromise(function (c, e) {
            __webpack_require__.e/* require */(0).then(function() { var __WEBPACK_AMD_REQUIRE_ARRAY__ = [__webpack_require__(45)(moduleId)]; (function (foreignModule) {
                _this._foreignModule = foreignModule.create(ctx, createData);
                var methods = [];
                for (var prop in _this._foreignModule) {
                    if (typeof _this._foreignModule[prop] === 'function') {
                        methods.push(prop);
                    }
                }
                c(methods);
            }.apply(null, __WEBPACK_AMD_REQUIRE_ARRAY__));}).catch(e.bind(this));
        });
    };
    // foreign method request
    BaseEditorSimpleWorker.prototype.fmr = function (method, args) {
        if (!this._foreignModule || typeof this._foreignModule[method] !== 'function') {
            return _winjsBase.TPromise.wrapError(new Error('Missing requestHandler or method: ' + method));
        }
        try {
            return _winjsBase.TPromise.as(this._foreignModule[method].apply(this._foreignModule, args));
        } catch (e) {
            return _winjsBase.TPromise.wrapError(e);
        }
    };
    // ---- END diff --------------------------------------------------------------------------
    // ---- BEGIN minimal edits ---------------------------------------------------------------
    BaseEditorSimpleWorker._diffLimit = 10000;
    // ---- BEGIN suggest --------------------------------------------------------------------------
    BaseEditorSimpleWorker._suggestionsLimit = 10000;
    return BaseEditorSimpleWorker;
}();
exports.BaseEditorSimpleWorker = BaseEditorSimpleWorker;
/**
 * @internal
 */

var EditorSimpleWorkerImpl = /** @class */function (_super) {
    __extends(EditorSimpleWorkerImpl, _super);
    function EditorSimpleWorkerImpl(foreignModuleFactory) {
        var _this = _super.call(this, foreignModuleFactory) || this;
        _this._models = Object.create(null);
        return _this;
    }
    EditorSimpleWorkerImpl.prototype.dispose = function () {
        this._models = Object.create(null);
    };
    EditorSimpleWorkerImpl.prototype._getModel = function (uri) {
        return this._models[uri];
    };
    EditorSimpleWorkerImpl.prototype._getModels = function () {
        var _this = this;
        var all = [];
        Object.keys(this._models).forEach(function (key) {
            return all.push(_this._models[key]);
        });
        return all;
    };
    EditorSimpleWorkerImpl.prototype.acceptNewModel = function (data) {
        this._models[data.url] = new MirrorModel(_uri2.default.parse(data.url), data.lines, data.EOL, data.versionId);
    };
    EditorSimpleWorkerImpl.prototype.acceptModelChanged = function (strURL, e) {
        if (!this._models[strURL]) {
            return;
        }
        var model = this._models[strURL];
        model.onEvents(e);
    };
    EditorSimpleWorkerImpl.prototype.acceptRemovedModel = function (strURL) {
        if (!this._models[strURL]) {
            return;
        }
        delete this._models[strURL];
    };
    return EditorSimpleWorkerImpl;
}(BaseEditorSimpleWorker);
exports.EditorSimpleWorkerImpl = EditorSimpleWorkerImpl;
/**
 * Called on the worker side
 * @internal
 */

function create() {
    return new EditorSimpleWorkerImpl(null);
}
if (typeof importScripts === 'function') {
    // Running in a web worker
    _platform.globals.monaco = (0, _standaloneBase.createMonacoBaseAPI)();
}

/***/ }),
/* 18 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.SimpleWorkerServer = exports.SimpleWorkerClient = undefined;
exports.logOnceWebWorkerWarning = logOnceWebWorkerWarning;
exports.create = create;

var _errors = __webpack_require__(2);

var _lifecycle = __webpack_require__(4);

var _winjsBase = __webpack_require__(0);

var _async = __webpack_require__(20);

var _platform = __webpack_require__(5);

var __extends = undefined && undefined.__extends || function () {
    var extendStatics = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function (d, b) {
        d.__proto__ = b;
    } || function (d, b) {
        for (var p in b) {
            if (b.hasOwnProperty(p)) d[p] = b[p];
        }
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() {
            this.constructor = d;
        }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
}();

var INITIALIZE = '$initialize';
var webWorkerWarningLogged = false;
function logOnceWebWorkerWarning(err) {
    if (!_platform.isWeb) {
        // running tests
        return;
    }
    if (!webWorkerWarningLogged) {
        webWorkerWarningLogged = true;
        console.warn('Could not create web worker(s). Falling back to loading web worker code in main thread, which might cause UI freezes. Please see https://github.com/Microsoft/monaco-editor#faq');
    }
    console.warn(err.message);
}
var SimpleWorkerProtocol = /** @class */function () {
    function SimpleWorkerProtocol(handler) {
        this._workerId = -1;
        this._handler = handler;
        this._lastSentReq = 0;
        this._pendingReplies = Object.create(null);
    }
    SimpleWorkerProtocol.prototype.setWorkerId = function (workerId) {
        this._workerId = workerId;
    };
    SimpleWorkerProtocol.prototype.sendMessage = function (method, args) {
        var req = String(++this._lastSentReq);
        var reply = {
            c: null,
            e: null
        };
        var result = new _winjsBase.TPromise(function (c, e, p) {
            reply.c = c;
            reply.e = e;
        }, function () {
            // Cancel not supported
        });
        this._pendingReplies[req] = reply;
        this._send({
            vsWorker: this._workerId,
            req: req,
            method: method,
            args: args
        });
        return result;
    };
    SimpleWorkerProtocol.prototype.handleMessage = function (serializedMessage) {
        var message;
        try {
            message = JSON.parse(serializedMessage);
        } catch (e) {
            // nothing
        }
        if (!message || !message.vsWorker) {
            return;
        }
        if (this._workerId !== -1 && message.vsWorker !== this._workerId) {
            return;
        }
        this._handleMessage(message);
    };
    SimpleWorkerProtocol.prototype._handleMessage = function (msg) {
        var _this = this;
        if (msg.seq) {
            var replyMessage = msg;
            if (!this._pendingReplies[replyMessage.seq]) {
                console.warn('Got reply to unknown seq');
                return;
            }
            var reply = this._pendingReplies[replyMessage.seq];
            delete this._pendingReplies[replyMessage.seq];
            if (replyMessage.err) {
                var err = replyMessage.err;
                if (replyMessage.err.$isError) {
                    err = new Error();
                    err.name = replyMessage.err.name;
                    err.message = replyMessage.err.message;
                    err.stack = replyMessage.err.stack;
                }
                reply.e(err);
                return;
            }
            reply.c(replyMessage.res);
            return;
        }
        var requestMessage = msg;
        var req = requestMessage.req;
        var result = this._handler.handleMessage(requestMessage.method, requestMessage.args);
        result.then(function (r) {
            _this._send({
                vsWorker: _this._workerId,
                seq: req,
                res: r,
                err: undefined
            });
        }, function (e) {
            if (e.detail instanceof Error) {
                // Loading errors have a detail property that points to the actual error
                e.detail = (0, _errors.transformErrorForSerialization)(e.detail);
            }
            _this._send({
                vsWorker: _this._workerId,
                seq: req,
                res: undefined,
                err: (0, _errors.transformErrorForSerialization)(e)
            });
        });
    };
    SimpleWorkerProtocol.prototype._send = function (msg) {
        var strMsg = JSON.stringify(msg);
        // console.log('SENDING: ' + strMsg);
        this._handler.sendMessage(strMsg);
    };
    return SimpleWorkerProtocol;
}();
/**
 * Main thread side
 */
var SimpleWorkerClient = /** @class */function (_super) {
    __extends(SimpleWorkerClient, _super);
    function SimpleWorkerClient(workerFactory, moduleId) {
        var _this = _super.call(this) || this;
        var lazyProxyFulfill = null;
        var lazyProxyReject = null;
        _this._worker = _this._register(workerFactory.create('vs/base/common/worker/simpleWorker', function (msg) {
            _this._protocol.handleMessage(msg);
        }, function (err) {
            // in Firefox, web workers fail lazily :(
            // we will reject the proxy
            lazyProxyReject(err);
        }));
        _this._protocol = new SimpleWorkerProtocol({
            sendMessage: function sendMessage(msg) {
                _this._worker.postMessage(msg);
            },
            handleMessage: function handleMessage(method, args) {
                // Intentionally not supporting worker -> main requests
                return _winjsBase.TPromise.as(null);
            }
        });
        _this._protocol.setWorkerId(_this._worker.getId());
        // Gather loader configuration
        var loaderConfiguration = null;
        if (typeof self.require !== 'undefined' && typeof self.require.getConfig === 'function') {
            // Get the configuration from the Monaco AMD Loader
            loaderConfiguration = self.require.getConfig();
        } else if (typeof self.requirejs !== 'undefined') {
            // Get the configuration from requirejs
            loaderConfiguration = self.requirejs.s.contexts._.config;
        }
        _this._lazyProxy = new _winjsBase.TPromise(function (c, e, p) {
            lazyProxyFulfill = c;
            lazyProxyReject = e;
        }, function () {});
        // Send initialize message
        _this._onModuleLoaded = _this._protocol.sendMessage(INITIALIZE, [_this._worker.getId(), moduleId, loaderConfiguration]);
        _this._onModuleLoaded.then(function (availableMethods) {
            var proxy = {};
            for (var i = 0; i < availableMethods.length; i++) {
                proxy[availableMethods[i]] = createProxyMethod(availableMethods[i], proxyMethodRequest);
            }
            lazyProxyFulfill(proxy);
        }, function (e) {
            lazyProxyReject(e);
            _this._onError('Worker failed to load ' + moduleId, e);
        });
        // Create proxy to loaded code
        var proxyMethodRequest = function proxyMethodRequest(method, args) {
            return _this._request(method, args);
        };
        var createProxyMethod = function createProxyMethod(method, proxyMethodRequest) {
            return function () {
                var args = Array.prototype.slice.call(arguments, 0);
                return proxyMethodRequest(method, args);
            };
        };
        return _this;
    }
    SimpleWorkerClient.prototype.getProxyObject = function () {
        // Do not allow chaining promises to cancel the proxy creation
        return new _async.ShallowCancelThenPromise(this._lazyProxy);
    };
    SimpleWorkerClient.prototype._request = function (method, args) {
        var _this = this;
        return new _winjsBase.TPromise(function (c, e, p) {
            _this._onModuleLoaded.then(function () {
                _this._protocol.sendMessage(method, args).then(c, e);
            }, e);
        }, function () {
            // Cancel intentionally not supported
        });
    };
    SimpleWorkerClient.prototype._onError = function (message, error) {
        console.error(message);
        console.info(error);
    };
    return SimpleWorkerClient;
}(_lifecycle.Disposable);
exports.SimpleWorkerClient = SimpleWorkerClient;
/**
 * Worker side
 */

var SimpleWorkerServer = /** @class */function () {
    function SimpleWorkerServer(postSerializedMessage, requestHandler) {
        var _this = this;
        this._requestHandler = requestHandler;
        this._protocol = new SimpleWorkerProtocol({
            sendMessage: function sendMessage(msg) {
                postSerializedMessage(msg);
            },
            handleMessage: function handleMessage(method, args) {
                return _this._handleMessage(method, args);
            }
        });
    }
    SimpleWorkerServer.prototype.onmessage = function (msg) {
        this._protocol.handleMessage(msg);
    };
    SimpleWorkerServer.prototype._handleMessage = function (method, args) {
        if (method === INITIALIZE) {
            return this.initialize(args[0], args[1], args[2]);
        }
        if (!this._requestHandler || typeof this._requestHandler[method] !== 'function') {
            return _winjsBase.TPromise.wrapError(new Error('Missing requestHandler or method: ' + method));
        }
        try {
            return _winjsBase.TPromise.as(this._requestHandler[method].apply(this._requestHandler, args));
        } catch (e) {
            return _winjsBase.TPromise.wrapError(e);
        }
    };
    SimpleWorkerServer.prototype.initialize = function (workerId, moduleId, loaderConfig) {
        var _this = this;
        this._protocol.setWorkerId(workerId);
        if (this._requestHandler) {
            // static request handler
            var methods = [];
            for (var prop in this._requestHandler) {
                if (typeof this._requestHandler[prop] === 'function') {
                    methods.push(prop);
                }
            }
            return _winjsBase.TPromise.as(methods);
        }
        if (loaderConfig) {
            // Remove 'baseUrl', handling it is beyond scope for now
            if (typeof loaderConfig.baseUrl !== 'undefined') {
                delete loaderConfig['baseUrl'];
            }
            if (typeof loaderConfig.paths !== 'undefined') {
                if (typeof loaderConfig.paths.vs !== 'undefined') {
                    delete loaderConfig.paths['vs'];
                }
            }
            // Since this is in a web worker, enable catching errors
            loaderConfig.catchError = true;
            self.require.config(loaderConfig);
        }
        var cc;
        var ee;
        var r = new _winjsBase.TPromise(function (c, e, p) {
            cc = c;
            ee = e;
        });
        // Use the global require to be sure to get the global config
        self.require([moduleId], function () {
            var result = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                result[_i] = arguments[_i];
            }
            var handlerModule = result[0];
            _this._requestHandler = handlerModule.create();
            var methods = [];
            for (var prop in _this._requestHandler) {
                if (typeof _this._requestHandler[prop] === 'function') {
                    methods.push(prop);
                }
            }
            cc(methods);
        }, ee);
        return r;
    };
    return SimpleWorkerServer;
}();
exports.SimpleWorkerServer = SimpleWorkerServer;
/**
 * Called on the worker side
 */

function create(postMessage) {
    return new SimpleWorkerServer(postMessage, null);
}

/***/ }),
/* 19 */,
/* 20 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.ThrottledEmitter = exports.RunOnceScheduler = exports.IntervalTimer = exports.TimeoutTimer = exports.ResourceQueue = exports.Queue = exports.Limiter = exports.ShallowCancelThenPromise = exports.Barrier = exports.ThrottledDelayer = exports.Delayer = exports.SimpleThrottler = exports.Throttler = undefined;
exports.isPromiseLike = isPromiseLike;
exports.toPromiseLike = toPromiseLike;
exports.asWinJsPromise = asWinJsPromise;
exports.wireCancellationToken = wireCancellationToken;
exports.timeout = timeout;
exports.always = always;
exports.sequence = sequence;
exports.first = first;
exports.setDisposableTimeout = setDisposableTimeout;
exports.nfcall = nfcall;
exports.ninvoke = ninvoke;

var _errors = __webpack_require__(2);

var errors = _interopRequireWildcard(_errors);

var _winjsBase = __webpack_require__(0);

var _cancellation = __webpack_require__(12);

var _lifecycle = __webpack_require__(4);

var _event = __webpack_require__(3);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

var __extends = undefined && undefined.__extends || function () {
    var extendStatics = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function (d, b) {
        d.__proto__ = b;
    } || function (d, b) {
        for (var p in b) {
            if (b.hasOwnProperty(p)) d[p] = b[p];
        }
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() {
            this.constructor = d;
        }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
}();
function isPromiseLike(obj) {
    return obj && typeof obj.then === 'function';
}
function toPromiseLike(arg) {
    if (isPromiseLike(arg)) {
        return arg;
    } else {
        return _winjsBase.TPromise.as(arg);
    }
}
function asWinJsPromise(callback) {
    var source = new _cancellation.CancellationTokenSource();
    return new _winjsBase.TPromise(function (resolve, reject, progress) {
        var item = callback(source.token);
        if (item instanceof _winjsBase.TPromise) {
            item.then(function (result) {
                source.dispose();
                resolve(result);
            }, function (err) {
                source.dispose();
                reject(err);
            }, progress);
        } else if (isPromiseLike(item)) {
            item.then(function (result) {
                source.dispose();
                resolve(result);
            }, function (err) {
                source.dispose();
                reject(err);
            });
        } else {
            source.dispose();
            resolve(item);
        }
    }, function () {
        source.cancel();
    });
}
/**
 * Hook a cancellation token to a WinJS Promise
 */
function wireCancellationToken(token, promise, resolveAsUndefinedWhenCancelled) {
    var subscription = token.onCancellationRequested(function () {
        return promise.cancel();
    });
    if (resolveAsUndefinedWhenCancelled) {
        promise = promise.then(undefined, function (err) {
            if (!errors.isPromiseCanceledError(err)) {
                return _winjsBase.TPromise.wrapError(err);
            }
            return undefined;
        });
    }
    return always(promise, function () {
        return subscription.dispose();
    });
}
/**
 * A helper to prevent accumulation of sequential async tasks.
 *
 * Imagine a mail man with the sole task of delivering letters. As soon as
 * a letter submitted for delivery, he drives to the destination, delivers it
 * and returns to his base. Imagine that during the trip, N more letters were submitted.
 * When the mail man returns, he picks those N letters and delivers them all in a
 * single trip. Even though N+1 submissions occurred, only 2 deliveries were made.
 *
 * The throttler implements this via the queue() method, by providing it a task
 * factory. Following the example:
 *
 * 		const throttler = new Throttler();
 * 		const letters = [];
 *
 * 		function deliver() {
 * 			const lettersToDeliver = letters;
 * 			letters = [];
 * 			return makeTheTrip(lettersToDeliver);
 * 		}
 *
 * 		function onLetterReceived(l) {
 * 			letters.push(l);
 * 			throttler.queue(deliver);
 * 		}
 */
var Throttler = /** @class */function () {
    function Throttler() {
        this.activePromise = null;
        this.queuedPromise = null;
        this.queuedPromiseFactory = null;
    }
    Throttler.prototype.queue = function (promiseFactory) {
        var _this = this;
        if (this.activePromise) {
            this.queuedPromiseFactory = promiseFactory;
            if (!this.queuedPromise) {
                var onComplete_1 = function onComplete_1() {
                    _this.queuedPromise = null;
                    var result = _this.queue(_this.queuedPromiseFactory);
                    _this.queuedPromiseFactory = null;
                    return result;
                };
                this.queuedPromise = new _winjsBase.TPromise(function (c, e, p) {
                    _this.activePromise.then(onComplete_1, onComplete_1, p).done(c);
                }, function () {
                    _this.activePromise.cancel();
                });
            }
            return new _winjsBase.TPromise(function (c, e, p) {
                _this.queuedPromise.then(c, e, p);
            }, function () {
                // no-op
            });
        }
        this.activePromise = promiseFactory();
        return new _winjsBase.TPromise(function (c, e, p) {
            _this.activePromise.done(function (result) {
                _this.activePromise = null;
                c(result);
            }, function (err) {
                _this.activePromise = null;
                e(err);
            }, p);
        }, function () {
            _this.activePromise.cancel();
        });
    };
    return Throttler;
}();
exports.Throttler = Throttler;
// TODO@Joao: can the previous throttler be replaced with this?

var SimpleThrottler = /** @class */function () {
    function SimpleThrottler() {
        this.current = _winjsBase.TPromise.wrap(null);
    }
    SimpleThrottler.prototype.queue = function (promiseTask) {
        return this.current = this.current.then(function () {
            return promiseTask();
        });
    };
    return SimpleThrottler;
}();
exports.SimpleThrottler = SimpleThrottler;
/**
 * A helper to delay execution of a task that is being requested often.
 *
 * Following the throttler, now imagine the mail man wants to optimize the number of
 * trips proactively. The trip itself can be long, so the he decides not to make the trip
 * as soon as a letter is submitted. Instead he waits a while, in case more
 * letters are submitted. After said waiting period, if no letters were submitted, he
 * decides to make the trip. Imagine that N more letters were submitted after the first
 * one, all within a short period of time between each other. Even though N+1
 * submissions occurred, only 1 delivery was made.
 *
 * The delayer offers this behavior via the trigger() method, into which both the task
 * to be executed and the waiting period (delay) must be passed in as arguments. Following
 * the example:
 *
 * 		const delayer = new Delayer(WAITING_PERIOD);
 * 		const letters = [];
 *
 * 		function letterReceived(l) {
 * 			letters.push(l);
 * 			delayer.trigger(() => { return makeTheTrip(); });
 * 		}
 */

var Delayer = /** @class */function () {
    function Delayer(defaultDelay) {
        this.defaultDelay = defaultDelay;
        this.timeout = null;
        this.completionPromise = null;
        this.onSuccess = null;
        this.task = null;
    }
    Delayer.prototype.trigger = function (task, delay) {
        var _this = this;
        if (delay === void 0) {
            delay = this.defaultDelay;
        }
        this.task = task;
        this.cancelTimeout();
        if (!this.completionPromise) {
            this.completionPromise = new _winjsBase.TPromise(function (c) {
                _this.onSuccess = c;
            }, function () {
                // no-op
            }).then(function () {
                _this.completionPromise = null;
                _this.onSuccess = null;
                var task = _this.task;
                _this.task = null;
                return task();
            });
        }
        this.timeout = setTimeout(function () {
            _this.timeout = null;
            _this.onSuccess(null);
        }, delay);
        return this.completionPromise;
    };
    Delayer.prototype.isTriggered = function () {
        return this.timeout !== null;
    };
    Delayer.prototype.cancel = function () {
        this.cancelTimeout();
        if (this.completionPromise) {
            this.completionPromise.cancel();
            this.completionPromise = null;
        }
    };
    Delayer.prototype.cancelTimeout = function () {
        if (this.timeout !== null) {
            clearTimeout(this.timeout);
            this.timeout = null;
        }
    };
    return Delayer;
}();
exports.Delayer = Delayer;
/**
 * A helper to delay execution of a task that is being requested often, while
 * preventing accumulation of consecutive executions, while the task runs.
 *
 * Simply combine the two mail man strategies from the Throttler and Delayer
 * helpers, for an analogy.
 */

var ThrottledDelayer = /** @class */function (_super) {
    __extends(ThrottledDelayer, _super);
    function ThrottledDelayer(defaultDelay) {
        var _this = _super.call(this, defaultDelay) || this;
        _this.throttler = new Throttler();
        return _this;
    }
    ThrottledDelayer.prototype.trigger = function (promiseFactory, delay) {
        var _this = this;
        return _super.prototype.trigger.call(this, function () {
            return _this.throttler.queue(promiseFactory);
        }, delay);
    };
    return ThrottledDelayer;
}(Delayer);
exports.ThrottledDelayer = ThrottledDelayer;
/**
 * A barrier that is initially closed and then becomes opened permanently.
 */

var Barrier = /** @class */function () {
    function Barrier() {
        var _this = this;
        this._isOpen = false;
        this._promise = new _winjsBase.TPromise(function (c, e, p) {
            _this._completePromise = c;
        }, function () {
            console.warn('You should really not try to cancel this ready promise!');
        });
    }
    Barrier.prototype.isOpen = function () {
        return this._isOpen;
    };
    Barrier.prototype.open = function () {
        this._isOpen = true;
        this._completePromise(true);
    };
    Barrier.prototype.wait = function () {
        return this._promise;
    };
    return Barrier;
}();
exports.Barrier = Barrier;

var ShallowCancelThenPromise = /** @class */function (_super) {
    __extends(ShallowCancelThenPromise, _super);
    function ShallowCancelThenPromise(outer) {
        var _this = this;
        var completeCallback, errorCallback, progressCallback;
        _this = _super.call(this, function (c, e, p) {
            completeCallback = c;
            errorCallback = e;
            progressCallback = p;
        }, function () {
            // cancel this promise but not the
            // outer promise
            errorCallback(errors.canceled());
        }) || this;
        outer.then(completeCallback, errorCallback, progressCallback);
        return _this;
    }
    return ShallowCancelThenPromise;
}(_winjsBase.TPromise);
exports.ShallowCancelThenPromise = ShallowCancelThenPromise;
/**
 * Replacement for `WinJS.Promise.timeout`.
 */

function timeout(n) {
    return new _winjsBase.Promise(function (resolve) {
        return setTimeout(resolve, n);
    });
}
function isWinJSPromise(candidate) {
    return _winjsBase.TPromise.is(candidate) && typeof candidate.done === 'function';
}
function always(winjsPromiseOrPromiseLike, f) {
    if (isWinJSPromise(winjsPromiseOrPromiseLike)) {
        return new _winjsBase.TPromise(function (c, e, p) {
            winjsPromiseOrPromiseLike.done(function (result) {
                try {
                    f(result);
                } catch (e1) {
                    errors.onUnexpectedError(e1);
                }
                c(result);
            }, function (err) {
                try {
                    f(err);
                } catch (e1) {
                    errors.onUnexpectedError(e1);
                }
                e(err);
            }, function (progress) {
                p(progress);
            });
        }, function () {
            winjsPromiseOrPromiseLike.cancel();
        });
    } else {
        // simple
        winjsPromiseOrPromiseLike.then(function (_) {
            return f();
        }, function (_) {
            return f();
        });
        return winjsPromiseOrPromiseLike;
    }
}
/**
 * Runs the provided list of promise factories in sequential order. The returned
 * promise will complete to an array of results from each promise.
 */
function sequence(promiseFactories) {
    var results = [];
    // reverse since we start with last element using pop()
    promiseFactories = promiseFactories.reverse();
    function next() {
        if (promiseFactories.length) {
            return promiseFactories.pop()();
        }
        return null;
    }
    function thenHandler(result) {
        if (result !== undefined && result !== null) {
            results.push(result);
        }
        var n = next();
        if (n) {
            return n.then(thenHandler);
        }
        return _winjsBase.TPromise.as(results);
    }
    return _winjsBase.TPromise.as(null).then(thenHandler);
}
function first(promiseFactories, shouldStop) {
    if (shouldStop === void 0) {
        shouldStop = function shouldStop(t) {
            return !!t;
        };
    }
    promiseFactories = promiseFactories.reverse().slice();
    var loop = function loop() {
        if (promiseFactories.length === 0) {
            return _winjsBase.TPromise.as(null);
        }
        var factory = promiseFactories.pop();
        var promise = factory();
        return promise.then(function (result) {
            if (shouldStop(result)) {
                return _winjsBase.TPromise.as(result);
            }
            return loop();
        });
    };
    return loop();
}
/**
 * A helper to queue N promises and run them all with a max degree of parallelism. The helper
 * ensures that at any time no more than M promises are running at the same time.
 */
var Limiter = /** @class */function () {
    function Limiter(maxDegreeOfParalellism) {
        this.maxDegreeOfParalellism = maxDegreeOfParalellism;
        this.outstandingPromises = [];
        this.runningPromises = 0;
        this._onFinished = new _event.Emitter();
    }
    Object.defineProperty(Limiter.prototype, "onFinished", {
        get: function get() {
            return this._onFinished.event;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Limiter.prototype, "size", {
        get: function get() {
            return this.runningPromises + this.outstandingPromises.length;
        },
        enumerable: true,
        configurable: true
    });
    Limiter.prototype.queue = function (promiseFactory) {
        var _this = this;
        return new _winjsBase.TPromise(function (c, e, p) {
            _this.outstandingPromises.push({
                factory: promiseFactory,
                c: c,
                e: e,
                p: p
            });
            _this.consume();
        });
    };
    Limiter.prototype.consume = function () {
        var _this = this;
        while (this.outstandingPromises.length && this.runningPromises < this.maxDegreeOfParalellism) {
            var iLimitedTask = this.outstandingPromises.shift();
            this.runningPromises++;
            var promise = iLimitedTask.factory();
            promise.done(iLimitedTask.c, iLimitedTask.e, iLimitedTask.p);
            promise.done(function () {
                return _this.consumed();
            }, function () {
                return _this.consumed();
            });
        }
    };
    Limiter.prototype.consumed = function () {
        this.runningPromises--;
        if (this.outstandingPromises.length > 0) {
            this.consume();
        } else {
            this._onFinished.fire();
        }
    };
    Limiter.prototype.dispose = function () {
        this._onFinished.dispose();
    };
    return Limiter;
}();
exports.Limiter = Limiter;
/**
 * A queue is handles one promise at a time and guarantees that at any time only one promise is executing.
 */

var Queue = /** @class */function (_super) {
    __extends(Queue, _super);
    function Queue() {
        return _super.call(this, 1) || this;
    }
    return Queue;
}(Limiter);
exports.Queue = Queue;
/**
 * A helper to organize queues per resource. The ResourceQueue makes sure to manage queues per resource
 * by disposing them once the queue is empty.
 */

var ResourceQueue = /** @class */function () {
    function ResourceQueue() {
        this.queues = Object.create(null);
    }
    ResourceQueue.prototype.queueFor = function (resource) {
        var _this = this;
        var key = resource.toString();
        if (!this.queues[key]) {
            var queue_1 = new Queue();
            queue_1.onFinished(function () {
                queue_1.dispose();
                delete _this.queues[key];
            });
            this.queues[key] = queue_1;
        }
        return this.queues[key];
    };
    return ResourceQueue;
}();
exports.ResourceQueue = ResourceQueue;
function setDisposableTimeout(handler, timeout) {
    var args = [];
    for (var _i = 2; _i < arguments.length; _i++) {
        args[_i - 2] = arguments[_i];
    }
    var handle = setTimeout.apply(void 0, [handler, timeout].concat(args));
    return { dispose: function dispose() {
            clearTimeout(handle);
        } };
}
var TimeoutTimer = /** @class */function (_super) {
    __extends(TimeoutTimer, _super);
    function TimeoutTimer() {
        var _this = _super.call(this) || this;
        _this._token = -1;
        return _this;
    }
    TimeoutTimer.prototype.dispose = function () {
        this.cancel();
        _super.prototype.dispose.call(this);
    };
    TimeoutTimer.prototype.cancel = function () {
        if (this._token !== -1) {
            clearTimeout(this._token);
            this._token = -1;
        }
    };
    TimeoutTimer.prototype.cancelAndSet = function (runner, timeout) {
        var _this = this;
        this.cancel();
        this._token = setTimeout(function () {
            _this._token = -1;
            runner();
        }, timeout);
    };
    TimeoutTimer.prototype.setIfNotSet = function (runner, timeout) {
        var _this = this;
        if (this._token !== -1) {
            // timer is already set
            return;
        }
        this._token = setTimeout(function () {
            _this._token = -1;
            runner();
        }, timeout);
    };
    return TimeoutTimer;
}(_lifecycle.Disposable);
exports.TimeoutTimer = TimeoutTimer;

var IntervalTimer = /** @class */function (_super) {
    __extends(IntervalTimer, _super);
    function IntervalTimer() {
        var _this = _super.call(this) || this;
        _this._token = -1;
        return _this;
    }
    IntervalTimer.prototype.dispose = function () {
        this.cancel();
        _super.prototype.dispose.call(this);
    };
    IntervalTimer.prototype.cancel = function () {
        if (this._token !== -1) {
            clearInterval(this._token);
            this._token = -1;
        }
    };
    IntervalTimer.prototype.cancelAndSet = function (runner, interval) {
        this.cancel();
        this._token = setInterval(function () {
            runner();
        }, interval);
    };
    return IntervalTimer;
}(_lifecycle.Disposable);
exports.IntervalTimer = IntervalTimer;

var RunOnceScheduler = /** @class */function () {
    function RunOnceScheduler(runner, timeout) {
        this.timeoutToken = -1;
        this.runner = runner;
        this.timeout = timeout;
        this.timeoutHandler = this.onTimeout.bind(this);
    }
    /**
     * Dispose RunOnceScheduler
     */
    RunOnceScheduler.prototype.dispose = function () {
        this.cancel();
        this.runner = null;
    };
    /**
     * Cancel current scheduled runner (if any).
     */
    RunOnceScheduler.prototype.cancel = function () {
        if (this.isScheduled()) {
            clearTimeout(this.timeoutToken);
            this.timeoutToken = -1;
        }
    };
    /**
     * Cancel previous runner (if any) & schedule a new runner.
     */
    RunOnceScheduler.prototype.schedule = function (delay) {
        if (delay === void 0) {
            delay = this.timeout;
        }
        this.cancel();
        this.timeoutToken = setTimeout(this.timeoutHandler, delay);
    };
    /**
     * Returns true if scheduled.
     */
    RunOnceScheduler.prototype.isScheduled = function () {
        return this.timeoutToken !== -1;
    };
    RunOnceScheduler.prototype.onTimeout = function () {
        this.timeoutToken = -1;
        if (this.runner) {
            this.runner();
        }
    };
    return RunOnceScheduler;
}();
exports.RunOnceScheduler = RunOnceScheduler;
function nfcall(fn) {
    var args = [];
    for (var _i = 1; _i < arguments.length; _i++) {
        args[_i - 1] = arguments[_i];
    }
    return new _winjsBase.TPromise(function (c, e) {
        return fn.apply(void 0, args.concat([function (err, result) {
            return err ? e(err) : c(result);
        }]));
    }, function () {
        return null;
    });
}
function ninvoke(thisArg, fn) {
    var args = [];
    for (var _i = 2; _i < arguments.length; _i++) {
        args[_i - 2] = arguments[_i];
    }
    return new _winjsBase.TPromise(function (c, e) {
        return fn.call.apply(fn, [thisArg].concat(args, [function (err, result) {
            return err ? e(err) : c(result);
        }]));
    }, function () {
        return null;
    });
}
/**
 * An emitter that will ignore any events that occur during a specific code
 * execution triggered via throttle() until the promise has finished (either
 * successfully or with an error). Only after the promise has finished, the
 * last event that was fired during the operation will get emitted.
 *
 */
var ThrottledEmitter = /** @class */function (_super) {
    __extends(ThrottledEmitter, _super);
    function ThrottledEmitter() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    ThrottledEmitter.prototype.throttle = function (promise) {
        var _this = this;
        this.suspended = true;
        return always(promise, function () {
            return _this.resume();
        });
    };
    ThrottledEmitter.prototype.fire = function (event) {
        if (this.suspended) {
            this.lastEvent = event;
            this.hasLastEvent = true;
            return;
        }
        return _super.prototype.fire.call(this, event);
    };
    ThrottledEmitter.prototype.resume = function () {
        this.suspended = false;
        if (this.hasLastEvent) {
            this.fire(this.lastEvent);
        }
        this.hasLastEvent = false;
        this.lastEvent = void 0;
    };
    return ThrottledEmitter;
}(_event.Emitter);
exports.ThrottledEmitter = ThrottledEmitter;

/***/ }),
/* 21 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/

/**
 * Represents information about a specific difference between two sequences.
 */

Object.defineProperty(exports, "__esModule", {
  value: true
});
var DiffChange = /** @class */function () {
  /**
   * Constructs a new DiffChange with the given sequence information
   * and content.
   */
  function DiffChange(originalStart, originalLength, modifiedStart, modifiedLength) {
    //Debug.Assert(originalLength > 0 || modifiedLength > 0, "originalLength and modifiedLength cannot both be <= 0");
    this.originalStart = originalStart;
    this.originalLength = originalLength;
    this.modifiedStart = modifiedStart;
    this.modifiedLength = modifiedLength;
  }
  /**
   * The end point (exclusive) of the change in the original sequence.
   */
  DiffChange.prototype.getOriginalEnd = function () {
    return this.originalStart + this.originalLength;
  };
  /**
   * The end point (exclusive) of the change in the modified sequence.
   */
  DiffChange.prototype.getModifiedEnd = function () {
    return this.modifiedStart + this.modifiedLength;
  };
  return DiffChange;
}();
exports.DiffChange = DiffChange;

/***/ }),
/* 22 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.KeyChord = KeyChord;
exports.createKeybinding = createKeybinding;
exports.createSimpleKeybinding = createSimpleKeybinding;
var KeyCodeStrMap = /** @class */function () {
    function KeyCodeStrMap() {
        this._keyCodeToStr = [];
        this._strToKeyCode = Object.create(null);
    }
    KeyCodeStrMap.prototype.define = function (keyCode, str) {
        this._keyCodeToStr[keyCode] = str;
        this._strToKeyCode[str.toLowerCase()] = keyCode;
    };
    KeyCodeStrMap.prototype.keyCodeToStr = function (keyCode) {
        return this._keyCodeToStr[keyCode];
    };
    KeyCodeStrMap.prototype.strToKeyCode = function (str) {
        return this._strToKeyCode[str.toLowerCase()] || 0 /* Unknown */;
    };
    return KeyCodeStrMap;
}();
var uiMap = new KeyCodeStrMap();
var userSettingsUSMap = new KeyCodeStrMap();
var userSettingsGeneralMap = new KeyCodeStrMap();
(function () {
    function define(keyCode, uiLabel, usUserSettingsLabel, generalUserSettingsLabel) {
        if (usUserSettingsLabel === void 0) {
            usUserSettingsLabel = uiLabel;
        }
        if (generalUserSettingsLabel === void 0) {
            generalUserSettingsLabel = usUserSettingsLabel;
        }
        uiMap.define(keyCode, uiLabel);
        userSettingsUSMap.define(keyCode, usUserSettingsLabel);
        userSettingsGeneralMap.define(keyCode, generalUserSettingsLabel);
    }
    define(0 /* Unknown */, 'unknown');
    define(1 /* Backspace */, 'Backspace');
    define(2 /* Tab */, 'Tab');
    define(3 /* Enter */, 'Enter');
    define(4 /* Shift */, 'Shift');
    define(5 /* Ctrl */, 'Ctrl');
    define(6 /* Alt */, 'Alt');
    define(7 /* PauseBreak */, 'PauseBreak');
    define(8 /* CapsLock */, 'CapsLock');
    define(9 /* Escape */, 'Escape');
    define(10 /* Space */, 'Space');
    define(11 /* PageUp */, 'PageUp');
    define(12 /* PageDown */, 'PageDown');
    define(13 /* End */, 'End');
    define(14 /* Home */, 'Home');
    define(15 /* LeftArrow */, 'LeftArrow', 'Left');
    define(16 /* UpArrow */, 'UpArrow', 'Up');
    define(17 /* RightArrow */, 'RightArrow', 'Right');
    define(18 /* DownArrow */, 'DownArrow', 'Down');
    define(19 /* Insert */, 'Insert');
    define(20 /* Delete */, 'Delete');
    define(21 /* KEY_0 */, '0');
    define(22 /* KEY_1 */, '1');
    define(23 /* KEY_2 */, '2');
    define(24 /* KEY_3 */, '3');
    define(25 /* KEY_4 */, '4');
    define(26 /* KEY_5 */, '5');
    define(27 /* KEY_6 */, '6');
    define(28 /* KEY_7 */, '7');
    define(29 /* KEY_8 */, '8');
    define(30 /* KEY_9 */, '9');
    define(31 /* KEY_A */, 'A');
    define(32 /* KEY_B */, 'B');
    define(33 /* KEY_C */, 'C');
    define(34 /* KEY_D */, 'D');
    define(35 /* KEY_E */, 'E');
    define(36 /* KEY_F */, 'F');
    define(37 /* KEY_G */, 'G');
    define(38 /* KEY_H */, 'H');
    define(39 /* KEY_I */, 'I');
    define(40 /* KEY_J */, 'J');
    define(41 /* KEY_K */, 'K');
    define(42 /* KEY_L */, 'L');
    define(43 /* KEY_M */, 'M');
    define(44 /* KEY_N */, 'N');
    define(45 /* KEY_O */, 'O');
    define(46 /* KEY_P */, 'P');
    define(47 /* KEY_Q */, 'Q');
    define(48 /* KEY_R */, 'R');
    define(49 /* KEY_S */, 'S');
    define(50 /* KEY_T */, 'T');
    define(51 /* KEY_U */, 'U');
    define(52 /* KEY_V */, 'V');
    define(53 /* KEY_W */, 'W');
    define(54 /* KEY_X */, 'X');
    define(55 /* KEY_Y */, 'Y');
    define(56 /* KEY_Z */, 'Z');
    define(57 /* Meta */, 'Meta');
    define(58 /* ContextMenu */, 'ContextMenu');
    define(59 /* F1 */, 'F1');
    define(60 /* F2 */, 'F2');
    define(61 /* F3 */, 'F3');
    define(62 /* F4 */, 'F4');
    define(63 /* F5 */, 'F5');
    define(64 /* F6 */, 'F6');
    define(65 /* F7 */, 'F7');
    define(66 /* F8 */, 'F8');
    define(67 /* F9 */, 'F9');
    define(68 /* F10 */, 'F10');
    define(69 /* F11 */, 'F11');
    define(70 /* F12 */, 'F12');
    define(71 /* F13 */, 'F13');
    define(72 /* F14 */, 'F14');
    define(73 /* F15 */, 'F15');
    define(74 /* F16 */, 'F16');
    define(75 /* F17 */, 'F17');
    define(76 /* F18 */, 'F18');
    define(77 /* F19 */, 'F19');
    define(78 /* NumLock */, 'NumLock');
    define(79 /* ScrollLock */, 'ScrollLock');
    define(80 /* US_SEMICOLON */, ';', ';', 'OEM_1');
    define(81 /* US_EQUAL */, '=', '=', 'OEM_PLUS');
    define(82 /* US_COMMA */, ',', ',', 'OEM_COMMA');
    define(83 /* US_MINUS */, '-', '-', 'OEM_MINUS');
    define(84 /* US_DOT */, '.', '.', 'OEM_PERIOD');
    define(85 /* US_SLASH */, '/', '/', 'OEM_2');
    define(86 /* US_BACKTICK */, '`', '`', 'OEM_3');
    define(110 /* ABNT_C1 */, 'ABNT_C1');
    define(111 /* ABNT_C2 */, 'ABNT_C2');
    define(87 /* US_OPEN_SQUARE_BRACKET */, '[', '[', 'OEM_4');
    define(88 /* US_BACKSLASH */, '\\', '\\', 'OEM_5');
    define(89 /* US_CLOSE_SQUARE_BRACKET */, ']', ']', 'OEM_6');
    define(90 /* US_QUOTE */, '\'', '\'', 'OEM_7');
    define(91 /* OEM_8 */, 'OEM_8');
    define(92 /* OEM_102 */, 'OEM_102');
    define(93 /* NUMPAD_0 */, 'NumPad0');
    define(94 /* NUMPAD_1 */, 'NumPad1');
    define(95 /* NUMPAD_2 */, 'NumPad2');
    define(96 /* NUMPAD_3 */, 'NumPad3');
    define(97 /* NUMPAD_4 */, 'NumPad4');
    define(98 /* NUMPAD_5 */, 'NumPad5');
    define(99 /* NUMPAD_6 */, 'NumPad6');
    define(100 /* NUMPAD_7 */, 'NumPad7');
    define(101 /* NUMPAD_8 */, 'NumPad8');
    define(102 /* NUMPAD_9 */, 'NumPad9');
    define(103 /* NUMPAD_MULTIPLY */, 'NumPad_Multiply');
    define(104 /* NUMPAD_ADD */, 'NumPad_Add');
    define(105 /* NUMPAD_SEPARATOR */, 'NumPad_Separator');
    define(106 /* NUMPAD_SUBTRACT */, 'NumPad_Subtract');
    define(107 /* NUMPAD_DECIMAL */, 'NumPad_Decimal');
    define(108 /* NUMPAD_DIVIDE */, 'NumPad_Divide');
})();
var KeyCodeUtils = exports.KeyCodeUtils = undefined;
(function (KeyCodeUtils) {
    function toString(keyCode) {
        return uiMap.keyCodeToStr(keyCode);
    }
    KeyCodeUtils.toString = toString;
    function fromString(key) {
        return uiMap.strToKeyCode(key);
    }
    KeyCodeUtils.fromString = fromString;
    function toUserSettingsUS(keyCode) {
        return userSettingsUSMap.keyCodeToStr(keyCode);
    }
    KeyCodeUtils.toUserSettingsUS = toUserSettingsUS;
    function toUserSettingsGeneral(keyCode) {
        return userSettingsGeneralMap.keyCodeToStr(keyCode);
    }
    KeyCodeUtils.toUserSettingsGeneral = toUserSettingsGeneral;
    function fromUserSettings(key) {
        return userSettingsUSMap.strToKeyCode(key) || userSettingsGeneralMap.strToKeyCode(key);
    }
    KeyCodeUtils.fromUserSettings = fromUserSettings;
})(KeyCodeUtils || (exports.KeyCodeUtils = KeyCodeUtils = {}));
function KeyChord(firstPart, secondPart) {
    var chordPart = (secondPart & 0x0000ffff) << 16 >>> 0;
    return (firstPart | chordPart) >>> 0;
}
function createKeybinding(keybinding, OS) {
    if (keybinding === 0) {
        return null;
    }
    var firstPart = (keybinding & 0x0000ffff) >>> 0;
    var chordPart = (keybinding & 0xffff0000) >>> 16;
    if (chordPart !== 0) {
        return new ChordKeybinding(createSimpleKeybinding(firstPart, OS), createSimpleKeybinding(chordPart, OS));
    }
    return createSimpleKeybinding(firstPart, OS);
}
function createSimpleKeybinding(keybinding, OS) {
    var ctrlCmd = keybinding & 2048 /* CtrlCmd */ ? true : false;
    var winCtrl = keybinding & 256 /* WinCtrl */ ? true : false;
    var ctrlKey = OS === 2 /* Macintosh */ ? winCtrl : ctrlCmd;
    var shiftKey = keybinding & 1024 /* Shift */ ? true : false;
    var altKey = keybinding & 512 /* Alt */ ? true : false;
    var metaKey = OS === 2 /* Macintosh */ ? ctrlCmd : winCtrl;
    var keyCode = keybinding & 255 /* KeyCode */;
    return new SimpleKeybinding(ctrlKey, shiftKey, altKey, metaKey, keyCode);
}
var SimpleKeybinding = /** @class */function () {
    function SimpleKeybinding(ctrlKey, shiftKey, altKey, metaKey, keyCode) {
        this.type = 1 /* Simple */;
        this.ctrlKey = ctrlKey;
        this.shiftKey = shiftKey;
        this.altKey = altKey;
        this.metaKey = metaKey;
        this.keyCode = keyCode;
    }
    SimpleKeybinding.prototype.equals = function (other) {
        if (other.type !== 1 /* Simple */) {
                return false;
            }
        return this.ctrlKey === other.ctrlKey && this.shiftKey === other.shiftKey && this.altKey === other.altKey && this.metaKey === other.metaKey && this.keyCode === other.keyCode;
    };
    SimpleKeybinding.prototype.getHashCode = function () {
        var ctrl = this.ctrlKey ? '1' : '0';
        var shift = this.shiftKey ? '1' : '0';
        var alt = this.altKey ? '1' : '0';
        var meta = this.metaKey ? '1' : '0';
        return "" + ctrl + shift + alt + meta + this.keyCode;
    };
    SimpleKeybinding.prototype.isModifierKey = function () {
        return this.keyCode === 0 /* Unknown */
        || this.keyCode === 5 /* Ctrl */
        || this.keyCode === 57 /* Meta */
        || this.keyCode === 6 /* Alt */
        || this.keyCode === 4 /* Shift */;
    };
    /**
     * Does this keybinding refer to the key code of a modifier and it also has the modifier flag?
     */
    SimpleKeybinding.prototype.isDuplicateModifierCase = function () {
        return this.ctrlKey && this.keyCode === 5 /* Ctrl */ || this.shiftKey && this.keyCode === 4 /* Shift */ || this.altKey && this.keyCode === 6 /* Alt */ || this.metaKey && this.keyCode === 57 /* Meta */;
    };
    return SimpleKeybinding;
}();
exports.SimpleKeybinding = SimpleKeybinding;

var ChordKeybinding = /** @class */function () {
    function ChordKeybinding(firstPart, chordPart) {
        this.type = 2 /* Chord */;
        this.firstPart = firstPart;
        this.chordPart = chordPart;
    }
    ChordKeybinding.prototype.getHashCode = function () {
        return this.firstPart.getHashCode() + ";" + this.chordPart.getHashCode();
    };
    return ChordKeybinding;
}();
exports.ChordKeybinding = ChordKeybinding;

var ResolvedKeybindingPart = /** @class */function () {
    function ResolvedKeybindingPart(ctrlKey, shiftKey, altKey, metaKey, kbLabel, kbAriaLabel) {
        this.ctrlKey = ctrlKey;
        this.shiftKey = shiftKey;
        this.altKey = altKey;
        this.metaKey = metaKey;
        this.keyLabel = kbLabel;
        this.keyAriaLabel = kbAriaLabel;
    }
    return ResolvedKeybindingPart;
}();
exports.ResolvedKeybindingPart = ResolvedKeybindingPart;
/**
 * A resolved keybinding. Can be a simple keybinding or a chord keybinding.
 */

var ResolvedKeybinding = /** @class */function () {
    function ResolvedKeybinding() {}
    return ResolvedKeybinding;
}();
exports.ResolvedKeybinding = ResolvedKeybinding;

/***/ }),
/* 23 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/


Object.defineProperty(exports, "__esModule", {
    value: true
});
var Node = /** @class */function () {
    function Node(element) {
        this.element = element;
    }
    return Node;
}();
var LinkedList = /** @class */function () {
    function LinkedList() {}
    LinkedList.prototype.isEmpty = function () {
        return !this._first;
    };
    LinkedList.prototype.clear = function () {
        this._first = undefined;
        this._last = undefined;
    };
    LinkedList.prototype.unshift = function (element) {
        return this.insert(element, false);
    };
    LinkedList.prototype.push = function (element) {
        return this.insert(element, true);
    };
    LinkedList.prototype.insert = function (element, atTheEnd) {
        var _this = this;
        var newNode = new Node(element);
        if (!this._first) {
            this._first = newNode;
            this._last = newNode;
        } else if (atTheEnd) {
            // push
            var oldLast = this._last;
            this._last = newNode;
            newNode.prev = oldLast;
            oldLast.next = newNode;
        } else {
            // unshift
            var oldFirst = this._first;
            this._first = newNode;
            newNode.next = oldFirst;
            oldFirst.prev = newNode;
        }
        return function () {
            for (var candidate = _this._first; candidate instanceof Node; candidate = candidate.next) {
                if (candidate !== newNode) {
                    continue;
                }
                if (candidate.prev && candidate.next) {
                    // middle
                    var anchor = candidate.prev;
                    anchor.next = candidate.next;
                    candidate.next.prev = anchor;
                } else if (!candidate.prev && !candidate.next) {
                    // only node
                    _this._first = undefined;
                    _this._last = undefined;
                } else if (!candidate.next) {
                    // last
                    _this._last = _this._last.prev;
                    _this._last.next = undefined;
                } else if (!candidate.prev) {
                    // first
                    _this._first = _this._first.next;
                    _this._first.prev = undefined;
                }
                // done
                break;
            }
        };
    };
    LinkedList.prototype.iterator = function () {
        var element = {
            done: undefined,
            value: undefined
        };
        var node = this._first;
        return {
            next: function next() {
                if (!node) {
                    element.done = true;
                    element.value = undefined;
                } else {
                    element.done = false;
                    element.value = node.element;
                    node = node.next;
                }
                return element;
            }
        };
    };
    LinkedList.prototype.toArray = function () {
        var result = [];
        for (var node = this._first; node instanceof Node; node = node.next) {
            result.push(node.element);
        }
        return result;
    };
    return LinkedList;
}();
exports.LinkedList = LinkedList;

/***/ }),
/* 24 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.LRUCache = exports.LinkedMap = exports.Touch = exports.ResourceMap = exports.TernarySearchTree = exports.PathIterator = exports.StringIterator = undefined;
exports.values = values;
exports.keys = keys;
exports.getOrSet = getOrSet;

var _uri = __webpack_require__(6);

var _uri2 = _interopRequireDefault(_uri);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var __extends = undefined && undefined.__extends || function () {
    var extendStatics = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function (d, b) {
        d.__proto__ = b;
    } || function (d, b) {
        for (var p in b) {
            if (b.hasOwnProperty(p)) d[p] = b[p];
        }
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() {
            this.constructor = d;
        }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
}();
function values(forEachable) {
    var result = [];
    forEachable.forEach(function (value) {
        return result.push(value);
    });
    return result;
}
function keys(map) {
    var result = [];
    map.forEach(function (value, key) {
        return result.push(key);
    });
    return result;
}
function getOrSet(map, key, value) {
    var result = map.get(key);
    if (result === void 0) {
        result = value;
        map.set(key, result);
    }
    return result;
}
var StringIterator = /** @class */function () {
    function StringIterator() {
        this._value = '';
        this._pos = 0;
    }
    StringIterator.prototype.reset = function (key) {
        this._value = key;
        this._pos = 0;
        return this;
    };
    StringIterator.prototype.next = function () {
        this._pos += 1;
        return this;
    };
    StringIterator.prototype.join = function (parts) {
        return parts.join('');
    };
    StringIterator.prototype.hasNext = function () {
        return this._pos < this._value.length - 1;
    };
    StringIterator.prototype.cmp = function (a) {
        var aCode = a.charCodeAt(0);
        var thisCode = this._value.charCodeAt(this._pos);
        return aCode - thisCode;
    };
    StringIterator.prototype.value = function () {
        return this._value[this._pos];
    };
    return StringIterator;
}();
exports.StringIterator = StringIterator;

var PathIterator = /** @class */function () {
    function PathIterator() {}
    PathIterator.prototype.reset = function (key) {
        this._value = key.replace(/\\$|\/$/, '');
        this._from = 0;
        this._to = 0;
        return this.next();
    };
    PathIterator.prototype.hasNext = function () {
        return this._to < this._value.length;
    };
    PathIterator.prototype.join = function (parts) {
        return parts.join('/');
    };
    PathIterator.prototype.next = function () {
        // this._data = key.split(/[\\/]/).filter(s => !!s);
        this._from = this._to;
        var justSeps = true;
        for (; this._to < this._value.length; this._to++) {
            var ch = this._value.charCodeAt(this._to);
            if (ch === PathIterator._fwd || ch === PathIterator._bwd) {
                if (justSeps) {
                    this._from++;
                } else {
                    break;
                }
            } else {
                justSeps = false;
            }
        }
        return this;
    };
    PathIterator.prototype.cmp = function (a) {
        var aPos = 0;
        var aLen = a.length;
        var thisPos = this._from;
        while (aPos < aLen && thisPos < this._to) {
            var cmp = a.charCodeAt(aPos) - this._value.charCodeAt(thisPos);
            if (cmp !== 0) {
                return cmp;
            }
            aPos += 1;
            thisPos += 1;
        }
        if (aLen === this._to - this._from) {
            return 0;
        } else if (aPos < aLen) {
            return -1;
        } else {
            return 1;
        }
    };
    PathIterator.prototype.value = function () {
        return this._value.substring(this._from, this._to);
    };
    PathIterator._fwd = '/'.charCodeAt(0);
    PathIterator._bwd = '\\'.charCodeAt(0);
    return PathIterator;
}();
exports.PathIterator = PathIterator;

var TernarySearchTreeNode = /** @class */function () {
    function TernarySearchTreeNode() {}
    TernarySearchTreeNode.prototype.isEmpty = function () {
        return !this.left && !this.mid && !this.right && !this.element;
    };
    return TernarySearchTreeNode;
}();
var TernarySearchTree = /** @class */function () {
    function TernarySearchTree(segments) {
        this._iter = segments;
    }
    TernarySearchTree.forPaths = function () {
        return new TernarySearchTree(new PathIterator());
    };
    TernarySearchTree.forStrings = function () {
        return new TernarySearchTree(new StringIterator());
    };
    TernarySearchTree.prototype.clear = function () {
        this._root = undefined;
    };
    TernarySearchTree.prototype.set = function (key, element) {
        var iter = this._iter.reset(key);
        var node;
        if (!this._root) {
            this._root = new TernarySearchTreeNode();
            this._root.str = iter.value();
        }
        node = this._root;
        while (true) {
            var val = iter.cmp(node.str);
            if (val > 0) {
                // left
                if (!node.left) {
                    node.left = new TernarySearchTreeNode();
                    node.left.str = iter.value();
                }
                node = node.left;
            } else if (val < 0) {
                // right
                if (!node.right) {
                    node.right = new TernarySearchTreeNode();
                    node.right.str = iter.value();
                }
                node = node.right;
            } else if (iter.hasNext()) {
                // mid
                iter.next();
                if (!node.mid) {
                    node.mid = new TernarySearchTreeNode();
                    node.mid.str = iter.value();
                }
                node = node.mid;
            } else {
                break;
            }
        }
        var oldElement = node.element;
        node.element = element;
        return oldElement;
    };
    TernarySearchTree.prototype.get = function (key) {
        var iter = this._iter.reset(key);
        var node = this._root;
        while (node) {
            var val = iter.cmp(node.str);
            if (val > 0) {
                // left
                node = node.left;
            } else if (val < 0) {
                // right
                node = node.right;
            } else if (iter.hasNext()) {
                // mid
                iter.next();
                node = node.mid;
            } else {
                break;
            }
        }
        return node ? node.element : undefined;
    };
    TernarySearchTree.prototype.delete = function (key) {
        var iter = this._iter.reset(key);
        var stack = [];
        var node = this._root;
        // find and unset node
        while (node) {
            var val = iter.cmp(node.str);
            if (val > 0) {
                // left
                stack.push([1, node]);
                node = node.left;
            } else if (val < 0) {
                // right
                stack.push([-1, node]);
                node = node.right;
            } else if (iter.hasNext()) {
                // mid
                iter.next();
                stack.push([0, node]);
                node = node.mid;
            } else {
                // remove element
                node.element = undefined;
                // clean up empty nodes
                while (stack.length > 0 && node.isEmpty()) {
                    var _a = stack.pop(),
                        dir = _a[0],
                        parent_1 = _a[1];
                    switch (dir) {
                        case 1:
                            parent_1.left = undefined;
                            break;
                        case 0:
                            parent_1.mid = undefined;
                            break;
                        case -1:
                            parent_1.right = undefined;
                            break;
                    }
                    node = parent_1;
                }
                break;
            }
        }
    };
    TernarySearchTree.prototype.findSubstr = function (key) {
        var iter = this._iter.reset(key);
        var node = this._root;
        var candidate;
        while (node) {
            var val = iter.cmp(node.str);
            if (val > 0) {
                // left
                node = node.left;
            } else if (val < 0) {
                // right
                node = node.right;
            } else if (iter.hasNext()) {
                // mid
                iter.next();
                candidate = node.element || candidate;
                node = node.mid;
            } else {
                break;
            }
        }
        return node && node.element || candidate;
    };
    TernarySearchTree.prototype.findSuperstr = function (key) {
        var iter = this._iter.reset(key);
        var node = this._root;
        while (node) {
            var val = iter.cmp(node.str);
            if (val > 0) {
                // left
                node = node.left;
            } else if (val < 0) {
                // right
                node = node.right;
            } else if (iter.hasNext()) {
                // mid
                iter.next();
                node = node.mid;
            } else {
                // collect
                if (!node.mid) {
                    return undefined;
                }
                var ret = new TernarySearchTree(this._iter);
                ret._root = node.mid;
                return ret;
            }
        }
        return undefined;
    };
    TernarySearchTree.prototype.forEach = function (callback) {
        this._forEach(this._root, [], callback);
    };
    TernarySearchTree.prototype._forEach = function (node, parts, callback) {
        if (node) {
            // left
            this._forEach(node.left, parts, callback);
            // node
            parts.push(node.str);
            if (node.element) {
                callback(node.element, this._iter.join(parts));
            }
            // mid
            this._forEach(node.mid, parts, callback);
            parts.pop();
            // right
            this._forEach(node.right, parts, callback);
        }
    };
    return TernarySearchTree;
}();
exports.TernarySearchTree = TernarySearchTree;

var ResourceMap = /** @class */function () {
    function ResourceMap() {
        this.map = new Map();
        this.ignoreCase = false; // in the future this should be an uri-comparator
    }
    ResourceMap.prototype.set = function (resource, value) {
        this.map.set(this.toKey(resource), value);
    };
    ResourceMap.prototype.get = function (resource) {
        return this.map.get(this.toKey(resource));
    };
    ResourceMap.prototype.has = function (resource) {
        return this.map.has(this.toKey(resource));
    };
    Object.defineProperty(ResourceMap.prototype, "size", {
        get: function get() {
            return this.map.size;
        },
        enumerable: true,
        configurable: true
    });
    ResourceMap.prototype.clear = function () {
        this.map.clear();
    };
    ResourceMap.prototype.delete = function (resource) {
        return this.map.delete(this.toKey(resource));
    };
    ResourceMap.prototype.forEach = function (clb) {
        this.map.forEach(clb);
    };
    ResourceMap.prototype.values = function () {
        return values(this.map);
    };
    ResourceMap.prototype.toKey = function (resource) {
        var key = resource.toString();
        if (this.ignoreCase) {
            key = key.toLowerCase();
        }
        return key;
    };
    ResourceMap.prototype.keys = function () {
        return keys(this.map).map(_uri2.default.parse);
    };
    return ResourceMap;
}();
exports.ResourceMap = ResourceMap;
var Touch = exports.Touch = undefined;
(function (Touch) {
    Touch[Touch["None"] = 0] = "None";
    Touch[Touch["AsOld"] = 1] = "AsOld";
    Touch[Touch["AsNew"] = 2] = "AsNew";
})(Touch || (exports.Touch = Touch = {}));
var LinkedMap = /** @class */function () {
    function LinkedMap() {
        this._map = new Map();
        this._head = undefined;
        this._tail = undefined;
        this._size = 0;
    }
    LinkedMap.prototype.clear = function () {
        this._map.clear();
        this._head = undefined;
        this._tail = undefined;
        this._size = 0;
    };
    LinkedMap.prototype.isEmpty = function () {
        return !this._head && !this._tail;
    };
    Object.defineProperty(LinkedMap.prototype, "size", {
        get: function get() {
            return this._size;
        },
        enumerable: true,
        configurable: true
    });
    LinkedMap.prototype.has = function (key) {
        return this._map.has(key);
    };
    LinkedMap.prototype.get = function (key, touch) {
        if (touch === void 0) {
            touch = Touch.None;
        }
        var item = this._map.get(key);
        if (!item) {
            return undefined;
        }
        if (touch !== Touch.None) {
            this.touch(item, touch);
        }
        return item.value;
    };
    LinkedMap.prototype.set = function (key, value, touch) {
        if (touch === void 0) {
            touch = Touch.None;
        }
        var item = this._map.get(key);
        if (item) {
            item.value = value;
            if (touch !== Touch.None) {
                this.touch(item, touch);
            }
        } else {
            item = { key: key, value: value, next: undefined, previous: undefined };
            switch (touch) {
                case Touch.None:
                    this.addItemLast(item);
                    break;
                case Touch.AsOld:
                    this.addItemFirst(item);
                    break;
                case Touch.AsNew:
                    this.addItemLast(item);
                    break;
                default:
                    this.addItemLast(item);
                    break;
            }
            this._map.set(key, item);
            this._size++;
        }
    };
    LinkedMap.prototype.delete = function (key) {
        return !!this.remove(key);
    };
    LinkedMap.prototype.remove = function (key) {
        var item = this._map.get(key);
        if (!item) {
            return undefined;
        }
        this._map.delete(key);
        this.removeItem(item);
        this._size--;
        return item.value;
    };
    LinkedMap.prototype.shift = function () {
        if (!this._head && !this._tail) {
            return undefined;
        }
        if (!this._head || !this._tail) {
            throw new Error('Invalid list');
        }
        var item = this._head;
        this._map.delete(item.key);
        this.removeItem(item);
        this._size--;
        return item.value;
    };
    LinkedMap.prototype.forEach = function (callbackfn, thisArg) {
        var current = this._head;
        while (current) {
            if (thisArg) {
                callbackfn.bind(thisArg)(current.value, current.key, this);
            } else {
                callbackfn(current.value, current.key, this);
            }
            current = current.next;
        }
    };
    LinkedMap.prototype.values = function () {
        var result = [];
        var current = this._head;
        while (current) {
            result.push(current.value);
            current = current.next;
        }
        return result;
    };
    LinkedMap.prototype.keys = function () {
        var result = [];
        var current = this._head;
        while (current) {
            result.push(current.key);
            current = current.next;
        }
        return result;
    };
    /* VS Code / Monaco editor runs on es5 which has no Symbol.iterator
    public keys(): IterableIterator<K> {
        let current = this._head;
        let iterator: IterableIterator<K> = {
            [Symbol.iterator]() {
                return iterator;
            },
            next():IteratorResult<K> {
                if (current) {
                    let result = { value: current.key, done: false };
                    current = current.next;
                    return result;
                } else {
                    return { value: undefined, done: true };
                }
            }
        };
        return iterator;
    }
     public values(): IterableIterator<V> {
        let current = this._head;
        let iterator: IterableIterator<V> = {
            [Symbol.iterator]() {
                return iterator;
            },
            next():IteratorResult<V> {
                if (current) {
                    let result = { value: current.value, done: false };
                    current = current.next;
                    return result;
                } else {
                    return { value: undefined, done: true };
                }
            }
        };
        return iterator;
    }
    */
    LinkedMap.prototype.trimOld = function (newSize) {
        if (newSize >= this.size) {
            return;
        }
        if (newSize === 0) {
            this.clear();
            return;
        }
        var current = this._head;
        var currentSize = this.size;
        while (current && currentSize > newSize) {
            this._map.delete(current.key);
            current = current.next;
            currentSize--;
        }
        this._head = current;
        this._size = currentSize;
        current.previous = void 0;
    };
    LinkedMap.prototype.addItemFirst = function (item) {
        // First time Insert
        if (!this._head && !this._tail) {
            this._tail = item;
        } else if (!this._head) {
            throw new Error('Invalid list');
        } else {
            item.next = this._head;
            this._head.previous = item;
        }
        this._head = item;
    };
    LinkedMap.prototype.addItemLast = function (item) {
        // First time Insert
        if (!this._head && !this._tail) {
            this._head = item;
        } else if (!this._tail) {
            throw new Error('Invalid list');
        } else {
            item.previous = this._tail;
            this._tail.next = item;
        }
        this._tail = item;
    };
    LinkedMap.prototype.removeItem = function (item) {
        if (item === this._head && item === this._tail) {
            this._head = void 0;
            this._tail = void 0;
        } else if (item === this._head) {
            this._head = item.next;
        } else if (item === this._tail) {
            this._tail = item.previous;
        } else {
            var next = item.next;
            var previous = item.previous;
            if (!next || !previous) {
                throw new Error('Invalid list');
            }
            next.previous = previous;
            previous.next = next;
        }
    };
    LinkedMap.prototype.touch = function (item, touch) {
        if (!this._head || !this._tail) {
            throw new Error('Invalid list');
        }
        if (touch !== Touch.AsOld && touch !== Touch.AsNew) {
            return;
        }
        if (touch === Touch.AsOld) {
            if (item === this._head) {
                return;
            }
            var next = item.next;
            var previous = item.previous;
            // Unlink the item
            if (item === this._tail) {
                // previous must be defined since item was not head but is tail
                // So there are more than on item in the map
                previous.next = void 0;
                this._tail = previous;
            } else {
                // Both next and previous are not undefined since item was neither head nor tail.
                next.previous = previous;
                previous.next = next;
            }
            // Insert the node at head
            item.previous = void 0;
            item.next = this._head;
            this._head.previous = item;
            this._head = item;
        } else if (touch === Touch.AsNew) {
            if (item === this._tail) {
                return;
            }
            var next = item.next;
            var previous = item.previous;
            // Unlink the item.
            if (item === this._head) {
                // next must be defined since item was not tail but is head
                // So there are more than on item in the map
                next.previous = void 0;
                this._head = next;
            } else {
                // Both next and previous are not undefined since item was neither head nor tail.
                next.previous = previous;
                previous.next = next;
            }
            item.next = void 0;
            item.previous = this._tail;
            this._tail.next = item;
            this._tail = item;
        }
    };
    LinkedMap.prototype.toJSON = function () {
        var data = [];
        this.forEach(function (value, key) {
            data.push([key, value]);
        });
        return data;
    };
    LinkedMap.prototype.fromJSON = function (data) {
        this.clear();
        for (var _i = 0, data_1 = data; _i < data_1.length; _i++) {
            var _a = data_1[_i],
                key = _a[0],
                value = _a[1];
            this.set(key, value);
        }
    };
    return LinkedMap;
}();
exports.LinkedMap = LinkedMap;

var LRUCache = /** @class */function (_super) {
    __extends(LRUCache, _super);
    function LRUCache(limit, ratio) {
        if (ratio === void 0) {
            ratio = 1;
        }
        var _this = _super.call(this) || this;
        _this._limit = limit;
        _this._ratio = Math.min(Math.max(0, ratio), 1);
        return _this;
    }
    Object.defineProperty(LRUCache.prototype, "limit", {
        get: function get() {
            return this._limit;
        },
        set: function set(limit) {
            this._limit = limit;
            this.checkTrim();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(LRUCache.prototype, "ratio", {
        get: function get() {
            return this._ratio;
        },
        set: function set(ratio) {
            this._ratio = Math.min(Math.max(0, ratio), 1);
            this.checkTrim();
        },
        enumerable: true,
        configurable: true
    });
    LRUCache.prototype.get = function (key) {
        return _super.prototype.get.call(this, key, Touch.AsNew);
    };
    LRUCache.prototype.peek = function (key) {
        return _super.prototype.get.call(this, key, Touch.None);
    };
    LRUCache.prototype.set = function (key, value) {
        _super.prototype.set.call(this, key, value, Touch.AsNew);
        this.checkTrim();
    };
    LRUCache.prototype.checkTrim = function () {
        if (this.size > this._limit) {
            this.trimOld(Math.round(this._limit * this._ratio));
        }
    };
    return LRUCache;
}(LinkedMap);
exports.LRUCache = LRUCache;

/***/ }),
/* 25 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.UTF8_BOM_CHARACTER = exports.canNormalize = exports.empty = undefined;
exports.isFalsyOrWhitespace = isFalsyOrWhitespace;
exports.pad = pad;
exports.format = format;
exports.escape = escape;
exports.escapeRegExpCharacters = escapeRegExpCharacters;
exports.trim = trim;
exports.ltrim = ltrim;
exports.rtrim = rtrim;
exports.convertSimple2RegExpPattern = convertSimple2RegExpPattern;
exports.stripWildcards = stripWildcards;
exports.startsWith = startsWith;
exports.endsWith = endsWith;
exports.createRegExp = createRegExp;
exports.regExpLeadsToEndlessLoop = regExpLeadsToEndlessLoop;
exports.regExpContainsBackreference = regExpContainsBackreference;
exports.normalizeNFC = normalizeNFC;
exports.normalizeNFD = normalizeNFD;
exports.firstNonWhitespaceIndex = firstNonWhitespaceIndex;
exports.getLeadingWhitespace = getLeadingWhitespace;
exports.lastNonWhitespaceIndex = lastNonWhitespaceIndex;
exports.compare = compare;
exports.compareIgnoreCase = compareIgnoreCase;
exports.equalsIgnoreCase = equalsIgnoreCase;
exports.startsWithIgnoreCase = startsWithIgnoreCase;
exports.commonPrefixLength = commonPrefixLength;
exports.commonSuffixLength = commonSuffixLength;
exports.overlap = overlap;
exports.isHighSurrogate = isHighSurrogate;
exports.isLowSurrogate = isLowSurrogate;
exports.containsRTL = containsRTL;
exports.containsEmoji = containsEmoji;
exports.isBasicASCII = isBasicASCII;
exports.containsFullWidthCharacter = containsFullWidthCharacter;
exports.isFullWidthCharacter = isFullWidthCharacter;
exports.lcut = lcut;
exports.removeAnsiEscapeCodes = removeAnsiEscapeCodes;
exports.startsWithUTF8BOM = startsWithUTF8BOM;
exports.stripUTF8BOM = stripUTF8BOM;
exports.safeBtoa = safeBtoa;
exports.repeat = repeat;
exports.fuzzyContains = fuzzyContains;
exports.containsUppercaseCharacter = containsUppercaseCharacter;

var _map = __webpack_require__(24);

/**
 * The empty string.
 */
var empty = exports.empty = '';
function isFalsyOrWhitespace(str) {
    if (!str || typeof str !== 'string') {
        return true;
    }
    return str.trim().length === 0;
}
/**
 * @returns the provided number with the given number of preceding zeros.
 */
function pad(n, l, char) {
    if (char === void 0) {
        char = '0';
    }
    var str = '' + n;
    var r = [str];
    for (var i = str.length; i < l; i++) {
        r.push(char);
    }
    return r.reverse().join('');
}
var _formatRegexp = /{(\d+)}/g;
/**
 * Helper to produce a string with a variable number of arguments. Insert variable segments
 * into the string using the {n} notation where N is the index of the argument following the string.
 * @param value string to which formatting is applied
 * @param args replacements for {n}-entries
 */
function format(value) {
    var args = [];
    for (var _i = 1; _i < arguments.length; _i++) {
        args[_i - 1] = arguments[_i];
    }
    if (args.length === 0) {
        return value;
    }
    return value.replace(_formatRegexp, function (match, group) {
        var idx = parseInt(group, 10);
        return isNaN(idx) || idx < 0 || idx >= args.length ? match : args[idx];
    });
}
/**
 * Converts HTML characters inside the string to use entities instead. Makes the string safe from
 * being used e.g. in HTMLElement.innerHTML.
 */
function escape(html) {
    return html.replace(/[<|>|&]/g, function (match) {
        switch (match) {
            case '<':
                return '&lt;';
            case '>':
                return '&gt;';
            case '&':
                return '&amp;';
            default:
                return match;
        }
    });
}
/**
 * Escapes regular expression characters in a given string
 */
function escapeRegExpCharacters(value) {
    return value.replace(/[\-\\\{\}\*\+\?\|\^\$\.\[\]\(\)\#]/g, '\\$&');
}
/**
 * Removes all occurrences of needle from the beginning and end of haystack.
 * @param haystack string to trim
 * @param needle the thing to trim (default is a blank)
 */
function trim(haystack, needle) {
    if (needle === void 0) {
        needle = ' ';
    }
    var trimmed = ltrim(haystack, needle);
    return rtrim(trimmed, needle);
}
/**
 * Removes all occurrences of needle from the beginning of haystack.
 * @param haystack string to trim
 * @param needle the thing to trim
 */
function ltrim(haystack, needle) {
    if (!haystack || !needle) {
        return haystack;
    }
    var needleLen = needle.length;
    if (needleLen === 0 || haystack.length === 0) {
        return haystack;
    }
    var offset = 0,
        idx = -1;
    while ((idx = haystack.indexOf(needle, offset)) === offset) {
        offset = offset + needleLen;
    }
    return haystack.substring(offset);
}
/**
 * Removes all occurrences of needle from the end of haystack.
 * @param haystack string to trim
 * @param needle the thing to trim
 */
function rtrim(haystack, needle) {
    if (!haystack || !needle) {
        return haystack;
    }
    var needleLen = needle.length,
        haystackLen = haystack.length;
    if (needleLen === 0 || haystackLen === 0) {
        return haystack;
    }
    var offset = haystackLen,
        idx = -1;
    while (true) {
        idx = haystack.lastIndexOf(needle, offset - 1);
        if (idx === -1 || idx + needleLen !== offset) {
            break;
        }
        if (idx === 0) {
            return '';
        }
        offset = idx;
    }
    return haystack.substring(0, offset);
}
function convertSimple2RegExpPattern(pattern) {
    return pattern.replace(/[\-\\\{\}\+\?\|\^\$\.\,\[\]\(\)\#\s]/g, '\\$&').replace(/[\*]/g, '.*');
}
function stripWildcards(pattern) {
    return pattern.replace(/\*/g, '');
}
/**
 * Determines if haystack starts with needle.
 */
function startsWith(haystack, needle) {
    if (haystack.length < needle.length) {
        return false;
    }
    if (haystack === needle) {
        return true;
    }
    for (var i = 0; i < needle.length; i++) {
        if (haystack[i] !== needle[i]) {
            return false;
        }
    }
    return true;
}
/**
 * Determines if haystack ends with needle.
 */
function endsWith(haystack, needle) {
    var diff = haystack.length - needle.length;
    if (diff > 0) {
        return haystack.indexOf(needle, diff) === diff;
    } else if (diff === 0) {
        return haystack === needle;
    } else {
        return false;
    }
}
function createRegExp(searchString, isRegex, options) {
    if (options === void 0) {
        options = {};
    }
    if (!searchString) {
        throw new Error('Cannot create regex from empty string');
    }
    if (!isRegex) {
        searchString = escapeRegExpCharacters(searchString);
    }
    if (options.wholeWord) {
        if (!/\B/.test(searchString.charAt(0))) {
            searchString = '\\b' + searchString;
        }
        if (!/\B/.test(searchString.charAt(searchString.length - 1))) {
            searchString = searchString + '\\b';
        }
    }
    var modifiers = '';
    if (options.global) {
        modifiers += 'g';
    }
    if (!options.matchCase) {
        modifiers += 'i';
    }
    if (options.multiline) {
        modifiers += 'm';
    }
    return new RegExp(searchString, modifiers);
}
function regExpLeadsToEndlessLoop(regexp) {
    // Exit early if it's one of these special cases which are meant to match
    // against an empty string
    if (regexp.source === '^' || regexp.source === '^$' || regexp.source === '$' || regexp.source === '^\\s*$') {
        return false;
    }
    // We check against an empty string. If the regular expression doesn't advance
    // (e.g. ends in an endless loop) it will match an empty string.
    var match = regexp.exec('');
    return match && regexp.lastIndex === 0;
}
function regExpContainsBackreference(regexpValue) {
    return !!regexpValue.match(/([^\\]|^)(\\\\)*\\\d+/);
}
/**
 * The normalize() method returns the Unicode Normalization Form of a given string. The form will be
 * the Normalization Form Canonical Composition.
 *
 * @see {@link https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/normalize}
 */
var canNormalize = exports.canNormalize = typeof ''.normalize === 'function';
var nfcCache = new _map.LRUCache(10000); // bounded to 10000 elements
function normalizeNFC(str) {
    return normalize(str, 'NFC', nfcCache);
}
var nfdCache = new _map.LRUCache(10000); // bounded to 10000 elements
function normalizeNFD(str) {
    return normalize(str, 'NFD', nfdCache);
}
var nonAsciiCharactersPattern = /[^\u0000-\u0080]/;
function normalize(str, form, normalizedCache) {
    if (!canNormalize || !str) {
        return str;
    }
    var cached = normalizedCache.get(str);
    if (cached) {
        return cached;
    }
    var res;
    if (nonAsciiCharactersPattern.test(str)) {
        res = str.normalize(form);
    } else {
        res = str;
    }
    // Use the cache for fast lookup
    normalizedCache.set(str, res);
    return res;
}
/**
 * Returns first index of the string that is not whitespace.
 * If string is empty or contains only whitespaces, returns -1
 */
function firstNonWhitespaceIndex(str) {
    for (var i = 0, len = str.length; i < len; i++) {
        var chCode = str.charCodeAt(i);
        if (chCode !== 32 /* Space */ && chCode !== 9 /* Tab */) {
                return i;
            }
    }
    return -1;
}
/**
 * Returns the leading whitespace of the string.
 * If the string contains only whitespaces, returns entire string
 */
function getLeadingWhitespace(str, start, end) {
    if (start === void 0) {
        start = 0;
    }
    if (end === void 0) {
        end = str.length;
    }
    for (var i = start; i < end; i++) {
        var chCode = str.charCodeAt(i);
        if (chCode !== 32 /* Space */ && chCode !== 9 /* Tab */) {
                return str.substring(start, i);
            }
    }
    return str.substring(start, end);
}
/**
 * Returns last index of the string that is not whitespace.
 * If string is empty or contains only whitespaces, returns -1
 */
function lastNonWhitespaceIndex(str, startIndex) {
    if (startIndex === void 0) {
        startIndex = str.length - 1;
    }
    for (var i = startIndex; i >= 0; i--) {
        var chCode = str.charCodeAt(i);
        if (chCode !== 32 /* Space */ && chCode !== 9 /* Tab */) {
                return i;
            }
    }
    return -1;
}
function compare(a, b) {
    if (a < b) {
        return -1;
    } else if (a > b) {
        return 1;
    } else {
        return 0;
    }
}
function compareIgnoreCase(a, b) {
    var len = Math.min(a.length, b.length);
    for (var i = 0; i < len; i++) {
        var codeA = a.charCodeAt(i);
        var codeB = b.charCodeAt(i);
        if (codeA === codeB) {
            // equal
            continue;
        }
        if (isUpperAsciiLetter(codeA)) {
            codeA += 32;
        }
        if (isUpperAsciiLetter(codeB)) {
            codeB += 32;
        }
        var diff = codeA - codeB;
        if (diff === 0) {
            // equal -> ignoreCase
            continue;
        } else if (isLowerAsciiLetter(codeA) && isLowerAsciiLetter(codeB)) {
            //
            return diff;
        } else {
            return compare(a.toLowerCase(), b.toLowerCase());
        }
    }
    if (a.length < b.length) {
        return -1;
    } else if (a.length > b.length) {
        return 1;
    } else {
        return 0;
    }
}
function isLowerAsciiLetter(code) {
    return code >= 97 /* a */ && code <= 122 /* z */;
}
function isUpperAsciiLetter(code) {
    return code >= 65 /* A */ && code <= 90 /* Z */;
}
function isAsciiLetter(code) {
    return isLowerAsciiLetter(code) || isUpperAsciiLetter(code);
}
function equalsIgnoreCase(a, b) {
    var len1 = a ? a.length : 0;
    var len2 = b ? b.length : 0;
    if (len1 !== len2) {
        return false;
    }
    return doEqualsIgnoreCase(a, b);
}
function doEqualsIgnoreCase(a, b, stopAt) {
    if (stopAt === void 0) {
        stopAt = a.length;
    }
    if (typeof a !== 'string' || typeof b !== 'string') {
        return false;
    }
    for (var i = 0; i < stopAt; i++) {
        var codeA = a.charCodeAt(i);
        var codeB = b.charCodeAt(i);
        if (codeA === codeB) {
            continue;
        }
        // a-z A-Z
        if (isAsciiLetter(codeA) && isAsciiLetter(codeB)) {
            var diff = Math.abs(codeA - codeB);
            if (diff !== 0 && diff !== 32) {
                return false;
            }
        }
        // Any other charcode
        else {
                if (String.fromCharCode(codeA).toLowerCase() !== String.fromCharCode(codeB).toLowerCase()) {
                    return false;
                }
            }
    }
    return true;
}
function startsWithIgnoreCase(str, candidate) {
    var candidateLength = candidate.length;
    if (candidate.length > str.length) {
        return false;
    }
    return doEqualsIgnoreCase(str, candidate, candidateLength);
}
/**
 * @returns the length of the common prefix of the two strings.
 */
function commonPrefixLength(a, b) {
    var i,
        len = Math.min(a.length, b.length);
    for (i = 0; i < len; i++) {
        if (a.charCodeAt(i) !== b.charCodeAt(i)) {
            return i;
        }
    }
    return len;
}
/**
 * @returns the length of the common suffix of the two strings.
 */
function commonSuffixLength(a, b) {
    var i,
        len = Math.min(a.length, b.length);
    var aLastIndex = a.length - 1;
    var bLastIndex = b.length - 1;
    for (i = 0; i < len; i++) {
        if (a.charCodeAt(aLastIndex - i) !== b.charCodeAt(bLastIndex - i)) {
            return i;
        }
    }
    return len;
}
function substrEquals(a, aStart, aEnd, b, bStart, bEnd) {
    while (aStart < aEnd && bStart < bEnd) {
        if (a[aStart] !== b[bStart]) {
            return false;
        }
        aStart += 1;
        bStart += 1;
    }
    return true;
}
/**
 * Return the overlap between the suffix of `a` and the prefix of `b`.
 * For instance `overlap("foobar", "arr, I'm a pirate") === 2`.
 */
function overlap(a, b) {
    var aEnd = a.length;
    var bEnd = b.length;
    var aStart = aEnd - bEnd;
    if (aStart === 0) {
        return a === b ? aEnd : 0;
    } else if (aStart < 0) {
        bEnd += aStart;
        aStart = 0;
    }
    while (aStart < aEnd && bEnd > 0) {
        if (substrEquals(a, aStart, aEnd, b, 0, bEnd)) {
            return bEnd;
        }
        bEnd -= 1;
        aStart += 1;
    }
    return 0;
}
// --- unicode
// http://en.wikipedia.org/wiki/Surrogate_pair
// Returns the code point starting at a specified index in a string
// Code points U+0000 to U+D7FF and U+E000 to U+FFFF are represented on a single character
// Code points U+10000 to U+10FFFF are represented on two consecutive characters
//export function getUnicodePoint(str:string, index:number, len:number):number {
//	let chrCode = str.charCodeAt(index);
//	if (0xD800 <= chrCode && chrCode <= 0xDBFF && index + 1 < len) {
//		let nextChrCode = str.charCodeAt(index + 1);
//		if (0xDC00 <= nextChrCode && nextChrCode <= 0xDFFF) {
//			return (chrCode - 0xD800) << 10 + (nextChrCode - 0xDC00) + 0x10000;
//		}
//	}
//	return chrCode;
//}
function isHighSurrogate(charCode) {
    return 0xD800 <= charCode && charCode <= 0xDBFF;
}
function isLowSurrogate(charCode) {
    return 0xDC00 <= charCode && charCode <= 0xDFFF;
}
/**
 * Generated using https://github.com/alexandrudima/unicode-utils/blob/master/generate-rtl-test.js
 */
var CONTAINS_RTL = /(?:[\u05BE\u05C0\u05C3\u05C6\u05D0-\u05F4\u0608\u060B\u060D\u061B-\u064A\u066D-\u066F\u0671-\u06D5\u06E5\u06E6\u06EE\u06EF\u06FA-\u0710\u0712-\u072F\u074D-\u07A5\u07B1-\u07EA\u07F4\u07F5\u07FA-\u0815\u081A\u0824\u0828\u0830-\u0858\u085E-\u08BD\u200F\uFB1D\uFB1F-\uFB28\uFB2A-\uFD3D\uFD50-\uFDFC\uFE70-\uFEFC]|\uD802[\uDC00-\uDD1B\uDD20-\uDE00\uDE10-\uDE33\uDE40-\uDEE4\uDEEB-\uDF35\uDF40-\uDFFF]|\uD803[\uDC00-\uDCFF]|\uD83A[\uDC00-\uDCCF\uDD00-\uDD43\uDD50-\uDFFF]|\uD83B[\uDC00-\uDEBB])/;
/**
 * Returns true if `str` contains any Unicode character that is classified as "R" or "AL".
 */
function containsRTL(str) {
    return CONTAINS_RTL.test(str);
}
/**
 * Generated using https://github.com/alexandrudima/unicode-utils/blob/master/generate-emoji-test.js
 */
var CONTAINS_EMOJI = /(?:[\u231A\u231B\u23F0\u23F3\u2600-\u27BF\u2B50\u2B55]|\uD83C[\uDDE6-\uDDFF\uDF00-\uDFFF]|\uD83D[\uDC00-\uDE4F\uDE80-\uDEF8]|\uD83E[\uDD00-\uDDE6])/;
function containsEmoji(str) {
    return CONTAINS_EMOJI.test(str);
}
var IS_BASIC_ASCII = /^[\t\n\r\x20-\x7E]*$/;
/**
 * Returns true if `str` contains only basic ASCII characters in the range 32 - 126 (including 32 and 126) or \n, \r, \t
 */
function isBasicASCII(str) {
    return IS_BASIC_ASCII.test(str);
}
function containsFullWidthCharacter(str) {
    for (var i = 0, len = str.length; i < len; i++) {
        if (isFullWidthCharacter(str.charCodeAt(i))) {
            return true;
        }
    }
    return false;
}
function isFullWidthCharacter(charCode) {
    // Do a cheap trick to better support wrapping of wide characters, treat them as 2 columns
    // http://jrgraphix.net/research/unicode_blocks.php
    //          2E80 — 2EFF   CJK Radicals Supplement
    //          2F00 — 2FDF   Kangxi Radicals
    //          2FF0 — 2FFF   Ideographic Description Characters
    //          3000 — 303F   CJK Symbols and Punctuation
    //          3040 — 309F   Hiragana
    //          30A0 — 30FF   Katakana
    //          3100 — 312F   Bopomofo
    //          3130 — 318F   Hangul Compatibility Jamo
    //          3190 — 319F   Kanbun
    //          31A0 — 31BF   Bopomofo Extended
    //          31F0 — 31FF   Katakana Phonetic Extensions
    //          3200 — 32FF   Enclosed CJK Letters and Months
    //          3300 — 33FF   CJK Compatibility
    //          3400 — 4DBF   CJK Unified Ideographs Extension A
    //          4DC0 — 4DFF   Yijing Hexagram Symbols
    //          4E00 — 9FFF   CJK Unified Ideographs
    //          A000 — A48F   Yi Syllables
    //          A490 — A4CF   Yi Radicals
    //          AC00 — D7AF   Hangul Syllables
    // [IGNORE] D800 — DB7F   High Surrogates
    // [IGNORE] DB80 — DBFF   High Private Use Surrogates
    // [IGNORE] DC00 — DFFF   Low Surrogates
    // [IGNORE] E000 — F8FF   Private Use Area
    //          F900 — FAFF   CJK Compatibility Ideographs
    // [IGNORE] FB00 — FB4F   Alphabetic Presentation Forms
    // [IGNORE] FB50 — FDFF   Arabic Presentation Forms-A
    // [IGNORE] FE00 — FE0F   Variation Selectors
    // [IGNORE] FE20 — FE2F   Combining Half Marks
    // [IGNORE] FE30 — FE4F   CJK Compatibility Forms
    // [IGNORE] FE50 — FE6F   Small Form Variants
    // [IGNORE] FE70 — FEFF   Arabic Presentation Forms-B
    //          FF00 — FFEF   Halfwidth and Fullwidth Forms
    //               [https://en.wikipedia.org/wiki/Halfwidth_and_fullwidth_forms]
    //               of which FF01 - FF5E fullwidth ASCII of 21 to 7E
    // [IGNORE]    and FF65 - FFDC halfwidth of Katakana and Hangul
    // [IGNORE] FFF0 — FFFF   Specials
    charCode = +charCode; // @perf
    return charCode >= 0x2E80 && charCode <= 0xD7AF || charCode >= 0xF900 && charCode <= 0xFAFF || charCode >= 0xFF01 && charCode <= 0xFF5E;
}
/**
 * Given a string and a max length returns a shorted version. Shorting
 * happens at favorable positions - such as whitespace or punctuation characters.
 */
function lcut(text, n) {
    if (text.length < n) {
        return text;
    }
    var re = /\b/g;
    var i = 0;
    while (re.test(text)) {
        if (text.length - re.lastIndex < n) {
            break;
        }
        i = re.lastIndex;
        re.lastIndex += 1;
    }
    return text.substring(i).replace(/^\s/, empty);
}
// Escape codes
// http://en.wikipedia.org/wiki/ANSI_escape_code
var EL = /\x1B\x5B[12]?K/g; // Erase in line
var COLOR_START = /\x1b\[\d+m/g; // Color
var COLOR_END = /\x1b\[0?m/g; // Color
function removeAnsiEscapeCodes(str) {
    if (str) {
        str = str.replace(EL, '');
        str = str.replace(COLOR_START, '');
        str = str.replace(COLOR_END, '');
    }
    return str;
}
// -- UTF-8 BOM
var UTF8_BOM_CHARACTER = exports.UTF8_BOM_CHARACTER = String.fromCharCode(65279 /* UTF8_BOM */);
function startsWithUTF8BOM(str) {
    return str && str.length > 0 && str.charCodeAt(0) === 65279 /* UTF8_BOM */;
}
function stripUTF8BOM(str) {
    return startsWithUTF8BOM(str) ? str.substr(1) : str;
}
function safeBtoa(str) {
    return btoa(encodeURIComponent(str)); // we use encodeURIComponent because btoa fails for non Latin 1 values
}
function repeat(s, count) {
    var result = '';
    for (var i = 0; i < count; i++) {
        result += s;
    }
    return result;
}
/**
 * Checks if the characters of the provided query string are included in the
 * target string. The characters do not have to be contiguous within the string.
 */
function fuzzyContains(target, query) {
    if (!target || !query) {
        return false; // return early if target or query are undefined
    }
    if (target.length < query.length) {
        return false; // impossible for query to be contained in target
    }
    var queryLen = query.length;
    var targetLower = target.toLowerCase();
    var index = 0;
    var lastIndexOf = -1;
    while (index < queryLen) {
        var indexOf = targetLower.indexOf(query[index], lastIndexOf + 1);
        if (indexOf < 0) {
            return false;
        }
        lastIndexOf = indexOf;
        index++;
    }
    return true;
}
function containsUppercaseCharacter(target, ignoreEscapedChars) {
    if (ignoreEscapedChars === void 0) {
        ignoreEscapedChars = false;
    }
    if (!target) {
        return false;
    }
    if (ignoreEscapedChars) {
        target = target.replace(/\\./g, '');
    }
    return target.toLowerCase() !== target;
}

/***/ }),
/* 26 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.CharacterSet = exports.CharacterClassifier = undefined;

var _uint = __webpack_require__(8);

/**
 * A fast character classifier that uses a compact array for ASCII values.
 */
var CharacterClassifier = /** @class */function () {
    function CharacterClassifier(_defaultValue) {
        var defaultValue = (0, _uint.toUint8)(_defaultValue);
        this._defaultValue = defaultValue;
        this._asciiMap = CharacterClassifier._createAsciiMap(defaultValue);
        this._map = new Map();
    }
    CharacterClassifier._createAsciiMap = function (defaultValue) {
        var asciiMap = new Uint8Array(256);
        for (var i = 0; i < 256; i++) {
            asciiMap[i] = defaultValue;
        }
        return asciiMap;
    };
    CharacterClassifier.prototype.set = function (charCode, _value) {
        var value = (0, _uint.toUint8)(_value);
        if (charCode >= 0 && charCode < 256) {
            this._asciiMap[charCode] = value;
        } else {
            this._map.set(charCode, value);
        }
    };
    CharacterClassifier.prototype.get = function (charCode) {
        if (charCode >= 0 && charCode < 256) {
            return this._asciiMap[charCode];
        } else {
            return this._map.get(charCode) || this._defaultValue;
        }
    };
    return CharacterClassifier;
}();
exports.CharacterClassifier = CharacterClassifier;

var CharacterSet = /** @class */function () {
    function CharacterSet() {
        this._actual = new CharacterClassifier(0 /* False */);
    }
    CharacterSet.prototype.add = function (charCode) {
        this._actual.set(charCode, 1 /* True */);
    };
    CharacterSet.prototype.has = function (charCode) {
        return this._actual.get(charCode) === 1 /* True */;
    };
    return CharacterSet;
}();
exports.CharacterSet = CharacterSet;

/***/ }),
/* 27 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.Selection = exports.SelectionDirection = undefined;

var _range = __webpack_require__(7);

var _position = __webpack_require__(1);

var __extends = undefined && undefined.__extends || function () {
    var extendStatics = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function (d, b) {
        d.__proto__ = b;
    } || function (d, b) {
        for (var p in b) {
            if (b.hasOwnProperty(p)) d[p] = b[p];
        }
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() {
            this.constructor = d;
        }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
}();

/**
 * The direction of a selection.
 */
var SelectionDirection = exports.SelectionDirection = undefined;
(function (SelectionDirection) {
    /**
     * The selection starts above where it ends.
     */
    SelectionDirection[SelectionDirection["LTR"] = 0] = "LTR";
    /**
     * The selection starts below where it ends.
     */
    SelectionDirection[SelectionDirection["RTL"] = 1] = "RTL";
})(SelectionDirection || (exports.SelectionDirection = SelectionDirection = {}));
/**
 * A selection in the editor.
 * The selection is a range that has an orientation.
 */
var Selection = /** @class */function (_super) {
    __extends(Selection, _super);
    function Selection(selectionStartLineNumber, selectionStartColumn, positionLineNumber, positionColumn) {
        var _this = _super.call(this, selectionStartLineNumber, selectionStartColumn, positionLineNumber, positionColumn) || this;
        _this.selectionStartLineNumber = selectionStartLineNumber;
        _this.selectionStartColumn = selectionStartColumn;
        _this.positionLineNumber = positionLineNumber;
        _this.positionColumn = positionColumn;
        return _this;
    }
    /**
     * Clone this selection.
     */
    Selection.prototype.clone = function () {
        return new Selection(this.selectionStartLineNumber, this.selectionStartColumn, this.positionLineNumber, this.positionColumn);
    };
    /**
     * Transform to a human-readable representation.
     */
    Selection.prototype.toString = function () {
        return '[' + this.selectionStartLineNumber + ',' + this.selectionStartColumn + ' -> ' + this.positionLineNumber + ',' + this.positionColumn + ']';
    };
    /**
     * Test if equals other selection.
     */
    Selection.prototype.equalsSelection = function (other) {
        return Selection.selectionsEqual(this, other);
    };
    /**
     * Test if the two selections are equal.
     */
    Selection.selectionsEqual = function (a, b) {
        return a.selectionStartLineNumber === b.selectionStartLineNumber && a.selectionStartColumn === b.selectionStartColumn && a.positionLineNumber === b.positionLineNumber && a.positionColumn === b.positionColumn;
    };
    /**
     * Get directions (LTR or RTL).
     */
    Selection.prototype.getDirection = function () {
        if (this.selectionStartLineNumber === this.startLineNumber && this.selectionStartColumn === this.startColumn) {
            return SelectionDirection.LTR;
        }
        return SelectionDirection.RTL;
    };
    /**
     * Create a new selection with a different `positionLineNumber` and `positionColumn`.
     */
    Selection.prototype.setEndPosition = function (endLineNumber, endColumn) {
        if (this.getDirection() === SelectionDirection.LTR) {
            return new Selection(this.startLineNumber, this.startColumn, endLineNumber, endColumn);
        }
        return new Selection(endLineNumber, endColumn, this.startLineNumber, this.startColumn);
    };
    /**
     * Get the position at `positionLineNumber` and `positionColumn`.
     */
    Selection.prototype.getPosition = function () {
        return new _position.Position(this.positionLineNumber, this.positionColumn);
    };
    /**
     * Create a new selection with a different `selectionStartLineNumber` and `selectionStartColumn`.
     */
    Selection.prototype.setStartPosition = function (startLineNumber, startColumn) {
        if (this.getDirection() === SelectionDirection.LTR) {
            return new Selection(startLineNumber, startColumn, this.endLineNumber, this.endColumn);
        }
        return new Selection(this.endLineNumber, this.endColumn, startLineNumber, startColumn);
    };
    // ----
    /**
     * Create a `Selection` from one or two positions
     */
    Selection.fromPositions = function (start, end) {
        if (end === void 0) {
            end = start;
        }
        return new Selection(start.lineNumber, start.column, end.lineNumber, end.column);
    };
    /**
     * Create a `Selection` from an `ISelection`.
     */
    Selection.liftSelection = function (sel) {
        return new Selection(sel.selectionStartLineNumber, sel.selectionStartColumn, sel.positionLineNumber, sel.positionColumn);
    };
    /**
     * `a` equals `b`.
     */
    Selection.selectionsArrEqual = function (a, b) {
        if (a && !b || !a && b) {
            return false;
        }
        if (!a && !b) {
            return true;
        }
        if (a.length !== b.length) {
            return false;
        }
        for (var i = 0, len = a.length; i < len; i++) {
            if (!this.selectionsEqual(a[i], b[i])) {
                return false;
            }
        }
        return true;
    };
    /**
     * Test if `obj` is an `ISelection`.
     */
    Selection.isISelection = function (obj) {
        return obj && typeof obj.selectionStartLineNumber === 'number' && typeof obj.selectionStartColumn === 'number' && typeof obj.positionLineNumber === 'number' && typeof obj.positionColumn === 'number';
    };
    /**
     * Create with a direction.
     */
    Selection.createWithDirection = function (startLineNumber, startColumn, endLineNumber, endColumn, direction) {
        if (direction === SelectionDirection.LTR) {
            return new Selection(startLineNumber, startColumn, endLineNumber, endColumn);
        }
        return new Selection(endLineNumber, endColumn, startLineNumber, startColumn);
    };
    return Selection;
}(_range.Range);
exports.Selection = Selection;

/***/ }),
/* 28 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/


Object.defineProperty(exports, "__esModule", {
    value: true
});
var Token = /** @class */function () {
    function Token(offset, type, language) {
        this.offset = offset | 0; // @perf
        this.type = type;
        this.language = language;
    }
    Token.prototype.toString = function () {
        return '(' + this.offset + ', ' + this.type + ')';
    };
    return Token;
}();
exports.Token = Token;

var TokenizationResult = /** @class */function () {
    function TokenizationResult(tokens, endState) {
        this.tokens = tokens;
        this.endState = endState;
    }
    return TokenizationResult;
}();
exports.TokenizationResult = TokenizationResult;

var TokenizationResult2 = /** @class */function () {
    function TokenizationResult2(tokens, endState) {
        this.tokens = tokens;
        this.endState = endState;
    }
    return TokenizationResult2;
}();
exports.TokenizationResult2 = TokenizationResult2;

/***/ }),
/* 29 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.DiffComputer = undefined;

var _diff = __webpack_require__(13);

var _strings = __webpack_require__(25);

var strings = _interopRequireWildcard(_strings);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

var __extends = undefined && undefined.__extends || function () {
    var extendStatics = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function (d, b) {
        d.__proto__ = b;
    } || function (d, b) {
        for (var p in b) {
            if (b.hasOwnProperty(p)) d[p] = b[p];
        }
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() {
            this.constructor = d;
        }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
}();

var MAXIMUM_RUN_TIME = 5000; // 5 seconds
var MINIMUM_MATCHING_CHARACTER_LENGTH = 3;
function computeDiff(originalSequence, modifiedSequence, continueProcessingPredicate, pretty) {
    var diffAlgo = new _diff.LcsDiff(originalSequence, modifiedSequence, continueProcessingPredicate);
    return diffAlgo.ComputeDiff(pretty);
}
var MarkerSequence = /** @class */function () {
    function MarkerSequence(buffer, startMarkers, endMarkers) {
        this.buffer = buffer;
        this.startMarkers = startMarkers;
        this.endMarkers = endMarkers;
    }
    MarkerSequence.prototype.getLength = function () {
        return this.startMarkers.length;
    };
    MarkerSequence.prototype.getElementHash = function (i) {
        return this.buffer.substring(this.startMarkers[i].offset, this.endMarkers[i].offset);
    };
    MarkerSequence.prototype.getStartLineNumber = function (i) {
        if (i === this.startMarkers.length) {
            // This is the special case where a change happened after the last marker
            return this.startMarkers[i - 1].lineNumber + 1;
        }
        return this.startMarkers[i].lineNumber;
    };
    MarkerSequence.prototype.getStartColumn = function (i) {
        return this.startMarkers[i].column;
    };
    MarkerSequence.prototype.getEndLineNumber = function (i) {
        return this.endMarkers[i].lineNumber;
    };
    MarkerSequence.prototype.getEndColumn = function (i) {
        return this.endMarkers[i].column;
    };
    return MarkerSequence;
}();
var LineMarkerSequence = /** @class */function (_super) {
    __extends(LineMarkerSequence, _super);
    function LineMarkerSequence(lines) {
        var _this = this;
        var buffer = '';
        var startMarkers = [];
        var endMarkers = [];
        for (var pos = 0, i = 0, length_1 = lines.length; i < length_1; i++) {
            buffer += lines[i];
            var startColumn = LineMarkerSequence._getFirstNonBlankColumn(lines[i], 1);
            var endColumn = LineMarkerSequence._getLastNonBlankColumn(lines[i], 1);
            startMarkers.push({
                offset: pos + startColumn - 1,
                lineNumber: i + 1,
                column: startColumn
            });
            endMarkers.push({
                offset: pos + endColumn - 1,
                lineNumber: i + 1,
                column: endColumn
            });
            pos += lines[i].length;
        }
        _this = _super.call(this, buffer, startMarkers, endMarkers) || this;
        return _this;
    }
    LineMarkerSequence._getFirstNonBlankColumn = function (txt, defaultValue) {
        var r = strings.firstNonWhitespaceIndex(txt);
        if (r === -1) {
            return defaultValue;
        }
        return r + 1;
    };
    LineMarkerSequence._getLastNonBlankColumn = function (txt, defaultValue) {
        var r = strings.lastNonWhitespaceIndex(txt);
        if (r === -1) {
            return defaultValue;
        }
        return r + 2;
    };
    LineMarkerSequence.prototype.getCharSequence = function (startIndex, endIndex) {
        var startMarkers = [];
        var endMarkers = [];
        for (var index = startIndex; index <= endIndex; index++) {
            var startMarker = this.startMarkers[index];
            var endMarker = this.endMarkers[index];
            for (var i = startMarker.offset; i < endMarker.offset; i++) {
                startMarkers.push({
                    offset: i,
                    lineNumber: startMarker.lineNumber,
                    column: startMarker.column + (i - startMarker.offset)
                });
                endMarkers.push({
                    offset: i + 1,
                    lineNumber: startMarker.lineNumber,
                    column: startMarker.column + (i - startMarker.offset) + 1
                });
            }
        }
        return new MarkerSequence(this.buffer, startMarkers, endMarkers);
    };
    return LineMarkerSequence;
}(MarkerSequence);
var CharChange = /** @class */function () {
    function CharChange(originalStartLineNumber, originalStartColumn, originalEndLineNumber, originalEndColumn, modifiedStartLineNumber, modifiedStartColumn, modifiedEndLineNumber, modifiedEndColumn) {
        this.originalStartLineNumber = originalStartLineNumber;
        this.originalStartColumn = originalStartColumn;
        this.originalEndLineNumber = originalEndLineNumber;
        this.originalEndColumn = originalEndColumn;
        this.modifiedStartLineNumber = modifiedStartLineNumber;
        this.modifiedStartColumn = modifiedStartColumn;
        this.modifiedEndLineNumber = modifiedEndLineNumber;
        this.modifiedEndColumn = modifiedEndColumn;
    }
    CharChange.createFromDiffChange = function (diffChange, originalCharSequence, modifiedCharSequence) {
        var originalStartLineNumber;
        var originalStartColumn;
        var originalEndLineNumber;
        var originalEndColumn;
        var modifiedStartLineNumber;
        var modifiedStartColumn;
        var modifiedEndLineNumber;
        var modifiedEndColumn;
        if (diffChange.originalLength === 0) {
            originalStartLineNumber = 0;
            originalStartColumn = 0;
            originalEndLineNumber = 0;
            originalEndColumn = 0;
        } else {
            originalStartLineNumber = originalCharSequence.getStartLineNumber(diffChange.originalStart);
            originalStartColumn = originalCharSequence.getStartColumn(diffChange.originalStart);
            originalEndLineNumber = originalCharSequence.getEndLineNumber(diffChange.originalStart + diffChange.originalLength - 1);
            originalEndColumn = originalCharSequence.getEndColumn(diffChange.originalStart + diffChange.originalLength - 1);
        }
        if (diffChange.modifiedLength === 0) {
            modifiedStartLineNumber = 0;
            modifiedStartColumn = 0;
            modifiedEndLineNumber = 0;
            modifiedEndColumn = 0;
        } else {
            modifiedStartLineNumber = modifiedCharSequence.getStartLineNumber(diffChange.modifiedStart);
            modifiedStartColumn = modifiedCharSequence.getStartColumn(diffChange.modifiedStart);
            modifiedEndLineNumber = modifiedCharSequence.getEndLineNumber(diffChange.modifiedStart + diffChange.modifiedLength - 1);
            modifiedEndColumn = modifiedCharSequence.getEndColumn(diffChange.modifiedStart + diffChange.modifiedLength - 1);
        }
        return new CharChange(originalStartLineNumber, originalStartColumn, originalEndLineNumber, originalEndColumn, modifiedStartLineNumber, modifiedStartColumn, modifiedEndLineNumber, modifiedEndColumn);
    };
    return CharChange;
}();
function postProcessCharChanges(rawChanges) {
    if (rawChanges.length <= 1) {
        return rawChanges;
    }
    var result = [rawChanges[0]];
    var prevChange = result[0];
    for (var i = 1, len = rawChanges.length; i < len; i++) {
        var currChange = rawChanges[i];
        var originalMatchingLength = currChange.originalStart - (prevChange.originalStart + prevChange.originalLength);
        var modifiedMatchingLength = currChange.modifiedStart - (prevChange.modifiedStart + prevChange.modifiedLength);
        // Both of the above should be equal, but the continueProcessingPredicate may prevent this from being true
        var matchingLength = Math.min(originalMatchingLength, modifiedMatchingLength);
        if (matchingLength < MINIMUM_MATCHING_CHARACTER_LENGTH) {
            // Merge the current change into the previous one
            prevChange.originalLength = currChange.originalStart + currChange.originalLength - prevChange.originalStart;
            prevChange.modifiedLength = currChange.modifiedStart + currChange.modifiedLength - prevChange.modifiedStart;
        } else {
            // Add the current change
            result.push(currChange);
            prevChange = currChange;
        }
    }
    return result;
}
var LineChange = /** @class */function () {
    function LineChange(originalStartLineNumber, originalEndLineNumber, modifiedStartLineNumber, modifiedEndLineNumber, charChanges) {
        this.originalStartLineNumber = originalStartLineNumber;
        this.originalEndLineNumber = originalEndLineNumber;
        this.modifiedStartLineNumber = modifiedStartLineNumber;
        this.modifiedEndLineNumber = modifiedEndLineNumber;
        this.charChanges = charChanges;
    }
    LineChange.createFromDiffResult = function (diffChange, originalLineSequence, modifiedLineSequence, continueProcessingPredicate, shouldPostProcessCharChanges) {
        var originalStartLineNumber;
        var originalEndLineNumber;
        var modifiedStartLineNumber;
        var modifiedEndLineNumber;
        var charChanges;
        if (diffChange.originalLength === 0) {
            originalStartLineNumber = originalLineSequence.getStartLineNumber(diffChange.originalStart) - 1;
            originalEndLineNumber = 0;
        } else {
            originalStartLineNumber = originalLineSequence.getStartLineNumber(diffChange.originalStart);
            originalEndLineNumber = originalLineSequence.getEndLineNumber(diffChange.originalStart + diffChange.originalLength - 1);
        }
        if (diffChange.modifiedLength === 0) {
            modifiedStartLineNumber = modifiedLineSequence.getStartLineNumber(diffChange.modifiedStart) - 1;
            modifiedEndLineNumber = 0;
        } else {
            modifiedStartLineNumber = modifiedLineSequence.getStartLineNumber(diffChange.modifiedStart);
            modifiedEndLineNumber = modifiedLineSequence.getEndLineNumber(diffChange.modifiedStart + diffChange.modifiedLength - 1);
        }
        if (diffChange.originalLength !== 0 && diffChange.modifiedLength !== 0 && continueProcessingPredicate()) {
            var originalCharSequence = originalLineSequence.getCharSequence(diffChange.originalStart, diffChange.originalStart + diffChange.originalLength - 1);
            var modifiedCharSequence = modifiedLineSequence.getCharSequence(diffChange.modifiedStart, diffChange.modifiedStart + diffChange.modifiedLength - 1);
            var rawChanges = computeDiff(originalCharSequence, modifiedCharSequence, continueProcessingPredicate, true);
            if (shouldPostProcessCharChanges) {
                rawChanges = postProcessCharChanges(rawChanges);
            }
            charChanges = [];
            for (var i = 0, length_2 = rawChanges.length; i < length_2; i++) {
                charChanges.push(CharChange.createFromDiffChange(rawChanges[i], originalCharSequence, modifiedCharSequence));
            }
        }
        return new LineChange(originalStartLineNumber, originalEndLineNumber, modifiedStartLineNumber, modifiedEndLineNumber, charChanges);
    };
    return LineChange;
}();
var DiffComputer = /** @class */function () {
    function DiffComputer(originalLines, modifiedLines, opts) {
        this.shouldPostProcessCharChanges = opts.shouldPostProcessCharChanges;
        this.shouldIgnoreTrimWhitespace = opts.shouldIgnoreTrimWhitespace;
        this.shouldMakePrettyDiff = opts.shouldMakePrettyDiff;
        this.maximumRunTimeMs = MAXIMUM_RUN_TIME;
        this.originalLines = originalLines;
        this.modifiedLines = modifiedLines;
        this.original = new LineMarkerSequence(originalLines);
        this.modified = new LineMarkerSequence(modifiedLines);
    }
    DiffComputer.prototype.computeDiff = function () {
        if (this.original.getLength() === 1 && this.original.getElementHash(0).length === 0) {
            // empty original => fast path
            return [{
                originalStartLineNumber: 1,
                originalEndLineNumber: 1,
                modifiedStartLineNumber: 1,
                modifiedEndLineNumber: this.modified.getLength(),
                charChanges: [{
                    modifiedEndColumn: 0,
                    modifiedEndLineNumber: 0,
                    modifiedStartColumn: 0,
                    modifiedStartLineNumber: 0,
                    originalEndColumn: 0,
                    originalEndLineNumber: 0,
                    originalStartColumn: 0,
                    originalStartLineNumber: 0
                }]
            }];
        }
        if (this.modified.getLength() === 1 && this.modified.getElementHash(0).length === 0) {
            // empty modified => fast path
            return [{
                originalStartLineNumber: 1,
                originalEndLineNumber: this.original.getLength(),
                modifiedStartLineNumber: 1,
                modifiedEndLineNumber: 1,
                charChanges: [{
                    modifiedEndColumn: 0,
                    modifiedEndLineNumber: 0,
                    modifiedStartColumn: 0,
                    modifiedStartLineNumber: 0,
                    originalEndColumn: 0,
                    originalEndLineNumber: 0,
                    originalStartColumn: 0,
                    originalStartLineNumber: 0
                }]
            }];
        }
        this.computationStartTime = new Date().getTime();
        var rawChanges = computeDiff(this.original, this.modified, this._continueProcessingPredicate.bind(this), this.shouldMakePrettyDiff);
        // The diff is always computed with ignoring trim whitespace
        // This ensures we get the prettiest diff
        if (this.shouldIgnoreTrimWhitespace) {
            var lineChanges = [];
            for (var i = 0, length_3 = rawChanges.length; i < length_3; i++) {
                lineChanges.push(LineChange.createFromDiffResult(rawChanges[i], this.original, this.modified, this._continueProcessingPredicate.bind(this), this.shouldPostProcessCharChanges));
            }
            return lineChanges;
        }
        // Need to post-process and introduce changes where the trim whitespace is different
        // Note that we are looping starting at -1 to also cover the lines before the first change
        var result = [];
        var originalLineIndex = 0;
        var modifiedLineIndex = 0;
        for (var i = -1 /* !!!! */, len = rawChanges.length; i < len; i++) {
            var nextChange = i + 1 < len ? rawChanges[i + 1] : null;
            var originalStop = nextChange ? nextChange.originalStart : this.originalLines.length;
            var modifiedStop = nextChange ? nextChange.modifiedStart : this.modifiedLines.length;
            while (originalLineIndex < originalStop && modifiedLineIndex < modifiedStop) {
                var originalLine = this.originalLines[originalLineIndex];
                var modifiedLine = this.modifiedLines[modifiedLineIndex];
                if (originalLine !== modifiedLine) {
                    // These lines differ only in trim whitespace
                    // Check the leading whitespace
                    {
                        var originalStartColumn = LineMarkerSequence._getFirstNonBlankColumn(originalLine, 1);
                        var modifiedStartColumn = LineMarkerSequence._getFirstNonBlankColumn(modifiedLine, 1);
                        while (originalStartColumn > 1 && modifiedStartColumn > 1) {
                            var originalChar = originalLine.charCodeAt(originalStartColumn - 2);
                            var modifiedChar = modifiedLine.charCodeAt(modifiedStartColumn - 2);
                            if (originalChar !== modifiedChar) {
                                break;
                            }
                            originalStartColumn--;
                            modifiedStartColumn--;
                        }
                        if (originalStartColumn > 1 || modifiedStartColumn > 1) {
                            this._pushTrimWhitespaceCharChange(result, originalLineIndex + 1, 1, originalStartColumn, modifiedLineIndex + 1, 1, modifiedStartColumn);
                        }
                    }
                    // Check the trailing whitespace
                    {
                        var originalEndColumn = LineMarkerSequence._getLastNonBlankColumn(originalLine, 1);
                        var modifiedEndColumn = LineMarkerSequence._getLastNonBlankColumn(modifiedLine, 1);
                        var originalMaxColumn = originalLine.length + 1;
                        var modifiedMaxColumn = modifiedLine.length + 1;
                        while (originalEndColumn < originalMaxColumn && modifiedEndColumn < modifiedMaxColumn) {
                            var originalChar = originalLine.charCodeAt(originalEndColumn - 1);
                            var modifiedChar = originalLine.charCodeAt(modifiedEndColumn - 1);
                            if (originalChar !== modifiedChar) {
                                break;
                            }
                            originalEndColumn++;
                            modifiedEndColumn++;
                        }
                        if (originalEndColumn < originalMaxColumn || modifiedEndColumn < modifiedMaxColumn) {
                            this._pushTrimWhitespaceCharChange(result, originalLineIndex + 1, originalEndColumn, originalMaxColumn, modifiedLineIndex + 1, modifiedEndColumn, modifiedMaxColumn);
                        }
                    }
                }
                originalLineIndex++;
                modifiedLineIndex++;
            }
            if (nextChange) {
                // Emit the actual change
                result.push(LineChange.createFromDiffResult(nextChange, this.original, this.modified, this._continueProcessingPredicate.bind(this), this.shouldPostProcessCharChanges));
                originalLineIndex += nextChange.originalLength;
                modifiedLineIndex += nextChange.modifiedLength;
            }
        }
        return result;
    };
    DiffComputer.prototype._pushTrimWhitespaceCharChange = function (result, originalLineNumber, originalStartColumn, originalEndColumn, modifiedLineNumber, modifiedStartColumn, modifiedEndColumn) {
        if (this._mergeTrimWhitespaceCharChange(result, originalLineNumber, originalStartColumn, originalEndColumn, modifiedLineNumber, modifiedStartColumn, modifiedEndColumn)) {
            // Merged into previous
            return;
        }
        result.push(new LineChange(originalLineNumber, originalLineNumber, modifiedLineNumber, modifiedLineNumber, [new CharChange(originalLineNumber, originalStartColumn, originalLineNumber, originalEndColumn, modifiedLineNumber, modifiedStartColumn, modifiedLineNumber, modifiedEndColumn)]));
    };
    DiffComputer.prototype._mergeTrimWhitespaceCharChange = function (result, originalLineNumber, originalStartColumn, originalEndColumn, modifiedLineNumber, modifiedStartColumn, modifiedEndColumn) {
        var len = result.length;
        if (len === 0) {
            return false;
        }
        var prevChange = result[len - 1];
        if (prevChange.originalEndLineNumber === 0 || prevChange.modifiedEndLineNumber === 0) {
            // Don't merge with inserts/deletes
            return false;
        }
        if (prevChange.originalEndLineNumber + 1 === originalLineNumber && prevChange.modifiedEndLineNumber + 1 === modifiedLineNumber) {
            prevChange.originalEndLineNumber = originalLineNumber;
            prevChange.modifiedEndLineNumber = modifiedLineNumber;
            prevChange.charChanges.push(new CharChange(originalLineNumber, originalStartColumn, originalLineNumber, originalEndColumn, modifiedLineNumber, modifiedStartColumn, modifiedLineNumber, modifiedEndColumn));
            return true;
        }
        return false;
    };
    DiffComputer.prototype._continueProcessingPredicate = function () {
        if (this.maximumRunTimeMs === 0) {
            return true;
        }
        var now = new Date().getTime();
        return now - this.computationStartTime < this.maximumRunTimeMs;
    };
    return DiffComputer;
}();
exports.DiffComputer = DiffComputer;

/***/ }),
/* 30 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.MirrorTextModel = undefined;

var _prefixSumComputer = __webpack_require__(35);

var _position = __webpack_require__(1);

var MirrorTextModel = /** @class */function () {
    function MirrorTextModel(uri, lines, eol, versionId) {
        this._uri = uri;
        this._lines = lines;
        this._eol = eol;
        this._versionId = versionId;
    }
    MirrorTextModel.prototype.dispose = function () {
        this._lines.length = 0;
    };
    Object.defineProperty(MirrorTextModel.prototype, "version", {
        get: function get() {
            return this._versionId;
        },
        enumerable: true,
        configurable: true
    });
    MirrorTextModel.prototype.getText = function () {
        return this._lines.join(this._eol);
    };
    MirrorTextModel.prototype.onEvents = function (e) {
        if (e.eol && e.eol !== this._eol) {
            this._eol = e.eol;
            this._lineStarts = null;
        }
        // Update my lines
        var changes = e.changes;
        for (var i = 0, len = changes.length; i < len; i++) {
            var change = changes[i];
            this._acceptDeleteRange(change.range);
            this._acceptInsertText(new _position.Position(change.range.startLineNumber, change.range.startColumn), change.text);
        }
        this._versionId = e.versionId;
    };
    MirrorTextModel.prototype._ensureLineStarts = function () {
        if (!this._lineStarts) {
            var eolLength = this._eol.length;
            var linesLength = this._lines.length;
            var lineStartValues = new Uint32Array(linesLength);
            for (var i = 0; i < linesLength; i++) {
                lineStartValues[i] = this._lines[i].length + eolLength;
            }
            this._lineStarts = new _prefixSumComputer.PrefixSumComputer(lineStartValues);
        }
    };
    /**
     * All changes to a line's text go through this method
     */
    MirrorTextModel.prototype._setLineText = function (lineIndex, newValue) {
        this._lines[lineIndex] = newValue;
        if (this._lineStarts) {
            // update prefix sum
            this._lineStarts.changeValue(lineIndex, this._lines[lineIndex].length + this._eol.length);
        }
    };
    MirrorTextModel.prototype._acceptDeleteRange = function (range) {
        if (range.startLineNumber === range.endLineNumber) {
            if (range.startColumn === range.endColumn) {
                // Nothing to delete
                return;
            }
            // Delete text on the affected line
            this._setLineText(range.startLineNumber - 1, this._lines[range.startLineNumber - 1].substring(0, range.startColumn - 1) + this._lines[range.startLineNumber - 1].substring(range.endColumn - 1));
            return;
        }
        // Take remaining text on last line and append it to remaining text on first line
        this._setLineText(range.startLineNumber - 1, this._lines[range.startLineNumber - 1].substring(0, range.startColumn - 1) + this._lines[range.endLineNumber - 1].substring(range.endColumn - 1));
        // Delete middle lines
        this._lines.splice(range.startLineNumber, range.endLineNumber - range.startLineNumber);
        if (this._lineStarts) {
            // update prefix sum
            this._lineStarts.removeValues(range.startLineNumber, range.endLineNumber - range.startLineNumber);
        }
    };
    MirrorTextModel.prototype._acceptInsertText = function (position, insertText) {
        if (insertText.length === 0) {
            // Nothing to insert
            return;
        }
        var insertLines = insertText.split(/\r\n|\r|\n/);
        if (insertLines.length === 1) {
            // Inserting text on one line
            this._setLineText(position.lineNumber - 1, this._lines[position.lineNumber - 1].substring(0, position.column - 1) + insertLines[0] + this._lines[position.lineNumber - 1].substring(position.column - 1));
            return;
        }
        // Append overflowing text from first line to the end of text to insert
        insertLines[insertLines.length - 1] += this._lines[position.lineNumber - 1].substring(position.column - 1);
        // Delete overflowing text from first line and insert text on first line
        this._setLineText(position.lineNumber - 1, this._lines[position.lineNumber - 1].substring(0, position.column - 1) + insertLines[0]);
        // Insert new lines & store lengths
        var newLengths = new Uint32Array(insertLines.length - 1);
        for (var i = 1; i < insertLines.length; i++) {
            this._lines.splice(position.lineNumber + i - 1, 0, insertLines[i]);
            newLengths[i - 1] = insertLines[i].length + this._eol.length;
        }
        if (this._lineStarts) {
            // update prefix sum
            this._lineStarts.insertValues(position.lineNumber, newLengths);
        }
    };
    return MirrorTextModel;
}();
exports.MirrorTextModel = MirrorTextModel;

/***/ }),
/* 31 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.ensureValidWordDefinition = ensureValidWordDefinition;
exports.getWordAtText = getWordAtText;
var USUAL_WORD_SEPARATORS = exports.USUAL_WORD_SEPARATORS = '`~!@#$%^&*()-=+[{]}\\|;:\'",.<>/?';
/**
 * Create a word definition regular expression based on default word separators.
 * Optionally provide allowed separators that should be included in words.
 *
 * The default would look like this:
 * /(-?\d*\.\d\w*)|([^\`\~\!\@\#\$\%\^\&\*\(\)\-\=\+\[\{\]\}\\\|\;\:\'\"\,\.\<\>\/\?\s]+)/g
 */
function createWordRegExp(allowInWords) {
    if (allowInWords === void 0) {
        allowInWords = '';
    }
    var source = '(-?\\d*\\.\\d\\w*)|([^';
    for (var i = 0; i < USUAL_WORD_SEPARATORS.length; i++) {
        if (allowInWords.indexOf(USUAL_WORD_SEPARATORS[i]) >= 0) {
            continue;
        }
        source += '\\' + USUAL_WORD_SEPARATORS[i];
    }
    source += '\\s]+)';
    return new RegExp(source, 'g');
}
// catches numbers (including floating numbers) in the first group, and alphanum in the second
var DEFAULT_WORD_REGEXP = exports.DEFAULT_WORD_REGEXP = createWordRegExp();
function ensureValidWordDefinition(wordDefinition) {
    var result = DEFAULT_WORD_REGEXP;
    if (wordDefinition && wordDefinition instanceof RegExp) {
        if (!wordDefinition.global) {
            var flags = 'g';
            if (wordDefinition.ignoreCase) {
                flags += 'i';
            }
            if (wordDefinition.multiline) {
                flags += 'm';
            }
            result = new RegExp(wordDefinition.source, flags);
        } else {
            result = wordDefinition;
        }
    }
    result.lastIndex = 0;
    return result;
}
function getWordAtPosFast(column, wordDefinition, text, textOffset) {
    // find whitespace enclosed text around column and match from there
    var pos = column - 1 - textOffset;
    var start = text.lastIndexOf(' ', pos - 1) + 1;
    var end = text.indexOf(' ', pos);
    if (end === -1) {
        end = text.length;
    }
    wordDefinition.lastIndex = start;
    var match;
    while (match = wordDefinition.exec(text)) {
        if (match.index <= pos && wordDefinition.lastIndex >= pos) {
            return {
                word: match[0],
                startColumn: textOffset + 1 + match.index,
                endColumn: textOffset + 1 + wordDefinition.lastIndex
            };
        }
    }
    return null;
}
function getWordAtPosSlow(column, wordDefinition, text, textOffset) {
    // matches all words starting at the beginning
    // of the input until it finds a match that encloses
    // the desired column. slow but correct
    var pos = column - 1 - textOffset;
    wordDefinition.lastIndex = 0;
    var match;
    while (match = wordDefinition.exec(text)) {
        if (match.index > pos) {
            // |nW -> matched only after the pos
            return null;
        } else if (wordDefinition.lastIndex >= pos) {
            // W|W -> match encloses pos
            return {
                word: match[0],
                startColumn: textOffset + 1 + match.index,
                endColumn: textOffset + 1 + wordDefinition.lastIndex
            };
        }
    }
    return null;
}
function getWordAtText(column, wordDefinition, text, textOffset) {
    // if `words` can contain whitespace character we have to use the slow variant
    // otherwise we use the fast variant of finding a word
    wordDefinition.lastIndex = 0;
    var match = wordDefinition.exec(text);
    if (!match) {
        return null;
    }
    // todo@joh the `match` could already be the (first) word
    var ret = match[0].indexOf(' ') >= 0
    // did match a word which contains a space character -> use slow word find
    ? getWordAtPosSlow(column, wordDefinition, text, textOffset)
    // sane word definition -> use fast word find
    : getWordAtPosFast(column, wordDefinition, text, textOffset);
    // both (getWordAtPosFast and getWordAtPosSlow) leave the wordDefinition-RegExp
    // in an undefined state and to not confuse other users of the wordDefinition
    // we reset the lastIndex
    wordDefinition.lastIndex = 0;
    return ret;
}

/***/ }),
/* 32 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.computeLinks = computeLinks;

var _characterClassifier = __webpack_require__(26);

var _uint = __webpack_require__(8);

var StateMachine = /** @class */function () {
    function StateMachine(edges) {
        var maxCharCode = 0;
        var maxState = 0 /* Invalid */;
        for (var i = 0, len = edges.length; i < len; i++) {
            var _a = edges[i],
                from = _a[0],
                chCode = _a[1],
                to = _a[2];
            if (chCode > maxCharCode) {
                maxCharCode = chCode;
            }
            if (from > maxState) {
                maxState = from;
            }
            if (to > maxState) {
                maxState = to;
            }
        }
        maxCharCode++;
        maxState++;
        var states = new _uint.Uint8Matrix(maxState, maxCharCode, 0 /* Invalid */);
        for (var i = 0, len = edges.length; i < len; i++) {
            var _b = edges[i],
                from = _b[0],
                chCode = _b[1],
                to = _b[2];
            states.set(from, chCode, to);
        }
        this._states = states;
        this._maxCharCode = maxCharCode;
    }
    StateMachine.prototype.nextState = function (currentState, chCode) {
        if (chCode < 0 || chCode >= this._maxCharCode) {
            return 0 /* Invalid */;
        }
        return this._states.get(currentState, chCode);
    };
    return StateMachine;
}();
// State machine for http:// or https:// or file://
var _stateMachine = null;
function getStateMachine() {
    if (_stateMachine === null) {
        _stateMachine = new StateMachine([[1 /* Start */, 104 /* h */, 2 /* H */], [1 /* Start */, 72 /* H */, 2 /* H */], [1 /* Start */, 102 /* f */, 6 /* F */], [1 /* Start */, 70 /* F */, 6 /* F */], [2 /* H */, 116 /* t */, 3 /* HT */], [2 /* H */, 84 /* T */, 3 /* HT */], [3 /* HT */, 116 /* t */, 4 /* HTT */], [3 /* HT */, 84 /* T */, 4 /* HTT */], [4 /* HTT */, 112 /* p */, 5 /* HTTP */], [4 /* HTT */, 80 /* P */, 5 /* HTTP */], [5 /* HTTP */, 115 /* s */, 9 /* BeforeColon */], [5 /* HTTP */, 83 /* S */, 9 /* BeforeColon */], [5 /* HTTP */, 58 /* Colon */, 10 /* AfterColon */], [6 /* F */, 105 /* i */, 7 /* FI */], [6 /* F */, 73 /* I */, 7 /* FI */], [7 /* FI */, 108 /* l */, 8 /* FIL */], [7 /* FI */, 76 /* L */, 8 /* FIL */], [8 /* FIL */, 101 /* e */, 9 /* BeforeColon */], [8 /* FIL */, 69 /* E */, 9 /* BeforeColon */], [9 /* BeforeColon */, 58 /* Colon */, 10 /* AfterColon */], [10 /* AfterColon */, 47 /* Slash */, 11 /* AlmostThere */], [11 /* AlmostThere */, 47 /* Slash */, 12 /* End */]]);
    }
    return _stateMachine;
}
var _classifier = null;
function getClassifier() {
    if (_classifier === null) {
        _classifier = new _characterClassifier.CharacterClassifier(0 /* None */);
        var FORCE_TERMINATION_CHARACTERS = ' \t<>\'\"、。｡､，．：；？！＠＃＄％＆＊‘“〈《「『【〔（［｛｢｣｝］）〕】』」》〉”’｀～…';
        for (var i = 0; i < FORCE_TERMINATION_CHARACTERS.length; i++) {
            _classifier.set(FORCE_TERMINATION_CHARACTERS.charCodeAt(i), 1 /* ForceTermination */);
        }
        var CANNOT_END_WITH_CHARACTERS = '.,;';
        for (var i = 0; i < CANNOT_END_WITH_CHARACTERS.length; i++) {
            _classifier.set(CANNOT_END_WITH_CHARACTERS.charCodeAt(i), 2 /* CannotEndIn */);
        }
    }
    return _classifier;
}
var LinkComputer = /** @class */function () {
    function LinkComputer() {}
    LinkComputer._createLink = function (classifier, line, lineNumber, linkBeginIndex, linkEndIndex) {
        // Do not allow to end link in certain characters...
        var lastIncludedCharIndex = linkEndIndex - 1;
        do {
            var chCode = line.charCodeAt(lastIncludedCharIndex);
            var chClass = classifier.get(chCode);
            if (chClass !== 2 /* CannotEndIn */) {
                    break;
                }
            lastIncludedCharIndex--;
        } while (lastIncludedCharIndex > linkBeginIndex);
        // Handle links enclosed in parens, square brackets and curlys.
        if (linkBeginIndex > 0) {
            var charCodeBeforeLink = line.charCodeAt(linkBeginIndex - 1);
            var lastCharCodeInLink = line.charCodeAt(lastIncludedCharIndex);
            if (charCodeBeforeLink === 40 /* OpenParen */ && lastCharCodeInLink === 41 /* CloseParen */ || charCodeBeforeLink === 91 /* OpenSquareBracket */ && lastCharCodeInLink === 93 /* CloseSquareBracket */ || charCodeBeforeLink === 123 /* OpenCurlyBrace */ && lastCharCodeInLink === 125 /* CloseCurlyBrace */) {
                // Do not end in ) if ( is before the link start
                // Do not end in ] if [ is before the link start
                // Do not end in } if { is before the link start
                lastIncludedCharIndex--;
            }
        }
        return {
            range: {
                startLineNumber: lineNumber,
                startColumn: linkBeginIndex + 1,
                endLineNumber: lineNumber,
                endColumn: lastIncludedCharIndex + 2
            },
            url: line.substring(linkBeginIndex, lastIncludedCharIndex + 1)
        };
    };
    LinkComputer.computeLinks = function (model) {
        var stateMachine = getStateMachine();
        var classifier = getClassifier();
        var result = [];
        for (var i = 1, lineCount = model.getLineCount(); i <= lineCount; i++) {
            var line = model.getLineContent(i);
            var len = line.length;
            var j = 0;
            var linkBeginIndex = 0;
            var linkBeginChCode = 0;
            var state = 1 /* Start */;
            var hasOpenParens = false;
            var hasOpenSquareBracket = false;
            var hasOpenCurlyBracket = false;
            while (j < len) {
                var resetStateMachine = false;
                var chCode = line.charCodeAt(j);
                if (state === 13 /* Accept */) {
                        var chClass = void 0;
                        switch (chCode) {
                            case 40 /* OpenParen */:
                                hasOpenParens = true;
                                chClass = 0 /* None */;
                                break;
                            case 41 /* CloseParen */:
                                chClass = hasOpenParens ? 0 /* None */ : 1 /* ForceTermination */;
                                break;
                            case 91 /* OpenSquareBracket */:
                                hasOpenSquareBracket = true;
                                chClass = 0 /* None */;
                                break;
                            case 93 /* CloseSquareBracket */:
                                chClass = hasOpenSquareBracket ? 0 /* None */ : 1 /* ForceTermination */;
                                break;
                            case 123 /* OpenCurlyBrace */:
                                hasOpenCurlyBracket = true;
                                chClass = 0 /* None */;
                                break;
                            case 125 /* CloseCurlyBrace */:
                                chClass = hasOpenCurlyBracket ? 0 /* None */ : 1 /* ForceTermination */;
                                break;
                            /* The following three rules make it that ' or " or ` are allowed inside links if the link began with a different one */
                            case 39 /* SingleQuote */:
                                chClass = linkBeginChCode === 34 /* DoubleQuote */ || linkBeginChCode === 96 /* BackTick */ ? 0 /* None */ : 1 /* ForceTermination */;
                                break;
                            case 34 /* DoubleQuote */:
                                chClass = linkBeginChCode === 39 /* SingleQuote */ || linkBeginChCode === 96 /* BackTick */ ? 0 /* None */ : 1 /* ForceTermination */;
                                break;
                            case 96 /* BackTick */:
                                chClass = linkBeginChCode === 39 /* SingleQuote */ || linkBeginChCode === 34 /* DoubleQuote */ ? 0 /* None */ : 1 /* ForceTermination */;
                                break;
                            default:
                                chClass = classifier.get(chCode);
                        }
                        // Check if character terminates link
                        if (chClass === 1 /* ForceTermination */) {
                                result.push(LinkComputer._createLink(classifier, line, i, linkBeginIndex, j));
                                resetStateMachine = true;
                            }
                    } else if (state === 12 /* End */) {
                        var chClass = classifier.get(chCode);
                        // Check if character terminates link
                        if (chClass === 1 /* ForceTermination */) {
                                resetStateMachine = true;
                            } else {
                            state = 13 /* Accept */;
                        }
                    } else {
                    state = stateMachine.nextState(state, chCode);
                    if (state === 0 /* Invalid */) {
                            resetStateMachine = true;
                        }
                }
                if (resetStateMachine) {
                    state = 1 /* Start */;
                    hasOpenParens = false;
                    hasOpenSquareBracket = false;
                    hasOpenCurlyBracket = false;
                    // Record where the link started
                    linkBeginIndex = j + 1;
                    linkBeginChCode = chCode;
                }
                j++;
            }
            if (state === 13 /* Accept */) {
                    result.push(LinkComputer._createLink(classifier, line, i, linkBeginIndex, len));
                }
        }
        return result;
    };
    return LinkComputer;
}();
/**
 * Returns an array of all links contains in the provided
 * document. *Note* that this operation is computational
 * expensive and should not run in the UI thread.
 */
function computeLinks(model) {
    if (!model || typeof model.getLineCount !== 'function' || typeof model.getLineContent !== 'function') {
        // Unknown caller!
        return [];
    }
    return LinkComputer.computeLinks(model);
}

/***/ }),
/* 33 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/


Object.defineProperty(exports, "__esModule", {
    value: true
});
var BasicInplaceReplace = /** @class */function () {
    function BasicInplaceReplace() {
        this._defaultValueSet = [['true', 'false'], ['True', 'False'], ['Private', 'Public', 'Friend', 'ReadOnly', 'Partial', 'Protected', 'WriteOnly'], ['public', 'protected', 'private']];
    }
    BasicInplaceReplace.prototype.navigateValueSet = function (range1, text1, range2, text2, up) {
        if (range1 && text1) {
            var result = this.doNavigateValueSet(text1, up);
            if (result) {
                return {
                    range: range1,
                    value: result
                };
            }
        }
        if (range2 && text2) {
            var result = this.doNavigateValueSet(text2, up);
            if (result) {
                return {
                    range: range2,
                    value: result
                };
            }
        }
        return null;
    };
    BasicInplaceReplace.prototype.doNavigateValueSet = function (text, up) {
        var numberResult = this.numberReplace(text, up);
        if (numberResult !== null) {
            return numberResult;
        }
        return this.textReplace(text, up);
    };
    BasicInplaceReplace.prototype.numberReplace = function (value, up) {
        var precision = Math.pow(10, value.length - (value.lastIndexOf('.') + 1));
        var n1 = Number(value);
        var n2 = parseFloat(value);
        if (!isNaN(n1) && !isNaN(n2) && n1 === n2) {
            if (n1 === 0 && !up) {
                return null; // don't do negative
                //			} else if(n1 === 9 && up) {
                //				return null; // don't insert 10 into a number
            } else {
                n1 = Math.floor(n1 * precision);
                n1 += up ? precision : -precision;
                return String(n1 / precision);
            }
        }
        return null;
    };
    BasicInplaceReplace.prototype.textReplace = function (value, up) {
        return this.valueSetsReplace(this._defaultValueSet, value, up);
    };
    BasicInplaceReplace.prototype.valueSetsReplace = function (valueSets, value, up) {
        var result = null;
        for (var i = 0, len = valueSets.length; result === null && i < len; i++) {
            result = this.valueSetReplace(valueSets[i], value, up);
        }
        return result;
    };
    BasicInplaceReplace.prototype.valueSetReplace = function (valueSet, value, up) {
        var idx = valueSet.indexOf(value);
        if (idx >= 0) {
            idx += up ? +1 : -1;
            if (idx < 0) {
                idx = valueSet.length - 1;
            } else {
                idx %= valueSet.length;
            }
            return valueSet[idx];
        }
        return null;
    };
    BasicInplaceReplace.INSTANCE = new BasicInplaceReplace();
    return BasicInplaceReplace;
}();
exports.BasicInplaceReplace = BasicInplaceReplace;

/***/ }),
/* 34 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.KeyCode = exports.KeyMod = exports.MarkerSeverity = exports.Severity = undefined;
exports.createMonacoBaseAPI = createMonacoBaseAPI;

var _event = __webpack_require__(3);

var _keyCodes = __webpack_require__(22);

var _position = __webpack_require__(1);

var _range = __webpack_require__(7);

var _selection = __webpack_require__(27);

var _winjsBase = __webpack_require__(0);

var _cancellation = __webpack_require__(12);

var _token = __webpack_require__(28);

var _uri = __webpack_require__(6);

var _uri2 = _interopRequireDefault(_uri);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// --------------------------------------------
// This is repeated here so it can be exported
// because TS inlines const enums
// --------------------------------------------
var Severity = exports.Severity = undefined;
(function (Severity) {
  Severity[Severity["Ignore"] = 0] = "Ignore";
  Severity[Severity["Info"] = 1] = "Info";
  Severity[Severity["Warning"] = 2] = "Warning";
  Severity[Severity["Error"] = 3] = "Error";
})(Severity || (exports.Severity = Severity = {}));
var MarkerSeverity = exports.MarkerSeverity = undefined;
(function (MarkerSeverity) {
  MarkerSeverity[MarkerSeverity["Hint"] = 1] = "Hint";
  MarkerSeverity[MarkerSeverity["Info"] = 2] = "Info";
  MarkerSeverity[MarkerSeverity["Warning"] = 4] = "Warning";
  MarkerSeverity[MarkerSeverity["Error"] = 8] = "Error";
})(MarkerSeverity || (exports.MarkerSeverity = MarkerSeverity = {}));
// --------------------------------------------
// This is repeated here so it can be exported
// because TS inlines const enums
// --------------------------------------------
var KeyMod = /** @class */function () {
  function KeyMod() {}
  KeyMod.chord = function (firstPart, secondPart) {
    return (0, _keyCodes.KeyChord)(firstPart, secondPart);
  };
  KeyMod.CtrlCmd = 2048 /* CtrlCmd */;
  KeyMod.Shift = 1024 /* Shift */;
  KeyMod.Alt = 512 /* Alt */;
  KeyMod.WinCtrl = 256 /* WinCtrl */;
  return KeyMod;
}();
exports.KeyMod = KeyMod;
// --------------------------------------------
// This is repeated here so it can be exported
// because TS inlines const enums
// --------------------------------------------
/**
 * Virtual Key Codes, the value does not hold any inherent meaning.
 * Inspired somewhat from https://msdn.microsoft.com/en-us/library/windows/desktop/dd375731(v=vs.85).aspx
 * But these are "more general", as they should work across browsers & OS`s.
 */

var KeyCode = exports.KeyCode = undefined;
(function (KeyCode) {
  /**
   * Placed first to cover the 0 value of the enum.
   */
  KeyCode[KeyCode["Unknown"] = 0] = "Unknown";
  KeyCode[KeyCode["Backspace"] = 1] = "Backspace";
  KeyCode[KeyCode["Tab"] = 2] = "Tab";
  KeyCode[KeyCode["Enter"] = 3] = "Enter";
  KeyCode[KeyCode["Shift"] = 4] = "Shift";
  KeyCode[KeyCode["Ctrl"] = 5] = "Ctrl";
  KeyCode[KeyCode["Alt"] = 6] = "Alt";
  KeyCode[KeyCode["PauseBreak"] = 7] = "PauseBreak";
  KeyCode[KeyCode["CapsLock"] = 8] = "CapsLock";
  KeyCode[KeyCode["Escape"] = 9] = "Escape";
  KeyCode[KeyCode["Space"] = 10] = "Space";
  KeyCode[KeyCode["PageUp"] = 11] = "PageUp";
  KeyCode[KeyCode["PageDown"] = 12] = "PageDown";
  KeyCode[KeyCode["End"] = 13] = "End";
  KeyCode[KeyCode["Home"] = 14] = "Home";
  KeyCode[KeyCode["LeftArrow"] = 15] = "LeftArrow";
  KeyCode[KeyCode["UpArrow"] = 16] = "UpArrow";
  KeyCode[KeyCode["RightArrow"] = 17] = "RightArrow";
  KeyCode[KeyCode["DownArrow"] = 18] = "DownArrow";
  KeyCode[KeyCode["Insert"] = 19] = "Insert";
  KeyCode[KeyCode["Delete"] = 20] = "Delete";
  KeyCode[KeyCode["KEY_0"] = 21] = "KEY_0";
  KeyCode[KeyCode["KEY_1"] = 22] = "KEY_1";
  KeyCode[KeyCode["KEY_2"] = 23] = "KEY_2";
  KeyCode[KeyCode["KEY_3"] = 24] = "KEY_3";
  KeyCode[KeyCode["KEY_4"] = 25] = "KEY_4";
  KeyCode[KeyCode["KEY_5"] = 26] = "KEY_5";
  KeyCode[KeyCode["KEY_6"] = 27] = "KEY_6";
  KeyCode[KeyCode["KEY_7"] = 28] = "KEY_7";
  KeyCode[KeyCode["KEY_8"] = 29] = "KEY_8";
  KeyCode[KeyCode["KEY_9"] = 30] = "KEY_9";
  KeyCode[KeyCode["KEY_A"] = 31] = "KEY_A";
  KeyCode[KeyCode["KEY_B"] = 32] = "KEY_B";
  KeyCode[KeyCode["KEY_C"] = 33] = "KEY_C";
  KeyCode[KeyCode["KEY_D"] = 34] = "KEY_D";
  KeyCode[KeyCode["KEY_E"] = 35] = "KEY_E";
  KeyCode[KeyCode["KEY_F"] = 36] = "KEY_F";
  KeyCode[KeyCode["KEY_G"] = 37] = "KEY_G";
  KeyCode[KeyCode["KEY_H"] = 38] = "KEY_H";
  KeyCode[KeyCode["KEY_I"] = 39] = "KEY_I";
  KeyCode[KeyCode["KEY_J"] = 40] = "KEY_J";
  KeyCode[KeyCode["KEY_K"] = 41] = "KEY_K";
  KeyCode[KeyCode["KEY_L"] = 42] = "KEY_L";
  KeyCode[KeyCode["KEY_M"] = 43] = "KEY_M";
  KeyCode[KeyCode["KEY_N"] = 44] = "KEY_N";
  KeyCode[KeyCode["KEY_O"] = 45] = "KEY_O";
  KeyCode[KeyCode["KEY_P"] = 46] = "KEY_P";
  KeyCode[KeyCode["KEY_Q"] = 47] = "KEY_Q";
  KeyCode[KeyCode["KEY_R"] = 48] = "KEY_R";
  KeyCode[KeyCode["KEY_S"] = 49] = "KEY_S";
  KeyCode[KeyCode["KEY_T"] = 50] = "KEY_T";
  KeyCode[KeyCode["KEY_U"] = 51] = "KEY_U";
  KeyCode[KeyCode["KEY_V"] = 52] = "KEY_V";
  KeyCode[KeyCode["KEY_W"] = 53] = "KEY_W";
  KeyCode[KeyCode["KEY_X"] = 54] = "KEY_X";
  KeyCode[KeyCode["KEY_Y"] = 55] = "KEY_Y";
  KeyCode[KeyCode["KEY_Z"] = 56] = "KEY_Z";
  KeyCode[KeyCode["Meta"] = 57] = "Meta";
  KeyCode[KeyCode["ContextMenu"] = 58] = "ContextMenu";
  KeyCode[KeyCode["F1"] = 59] = "F1";
  KeyCode[KeyCode["F2"] = 60] = "F2";
  KeyCode[KeyCode["F3"] = 61] = "F3";
  KeyCode[KeyCode["F4"] = 62] = "F4";
  KeyCode[KeyCode["F5"] = 63] = "F5";
  KeyCode[KeyCode["F6"] = 64] = "F6";
  KeyCode[KeyCode["F7"] = 65] = "F7";
  KeyCode[KeyCode["F8"] = 66] = "F8";
  KeyCode[KeyCode["F9"] = 67] = "F9";
  KeyCode[KeyCode["F10"] = 68] = "F10";
  KeyCode[KeyCode["F11"] = 69] = "F11";
  KeyCode[KeyCode["F12"] = 70] = "F12";
  KeyCode[KeyCode["F13"] = 71] = "F13";
  KeyCode[KeyCode["F14"] = 72] = "F14";
  KeyCode[KeyCode["F15"] = 73] = "F15";
  KeyCode[KeyCode["F16"] = 74] = "F16";
  KeyCode[KeyCode["F17"] = 75] = "F17";
  KeyCode[KeyCode["F18"] = 76] = "F18";
  KeyCode[KeyCode["F19"] = 77] = "F19";
  KeyCode[KeyCode["NumLock"] = 78] = "NumLock";
  KeyCode[KeyCode["ScrollLock"] = 79] = "ScrollLock";
  /**
   * Used for miscellaneous characters; it can vary by keyboard.
   * For the US standard keyboard, the ';:' key
   */
  KeyCode[KeyCode["US_SEMICOLON"] = 80] = "US_SEMICOLON";
  /**
   * For any country/region, the '+' key
   * For the US standard keyboard, the '=+' key
   */
  KeyCode[KeyCode["US_EQUAL"] = 81] = "US_EQUAL";
  /**
   * For any country/region, the ',' key
   * For the US standard keyboard, the ',<' key
   */
  KeyCode[KeyCode["US_COMMA"] = 82] = "US_COMMA";
  /**
   * For any country/region, the '-' key
   * For the US standard keyboard, the '-_' key
   */
  KeyCode[KeyCode["US_MINUS"] = 83] = "US_MINUS";
  /**
   * For any country/region, the '.' key
   * For the US standard keyboard, the '.>' key
   */
  KeyCode[KeyCode["US_DOT"] = 84] = "US_DOT";
  /**
   * Used for miscellaneous characters; it can vary by keyboard.
   * For the US standard keyboard, the '/?' key
   */
  KeyCode[KeyCode["US_SLASH"] = 85] = "US_SLASH";
  /**
   * Used for miscellaneous characters; it can vary by keyboard.
   * For the US standard keyboard, the '`~' key
   */
  KeyCode[KeyCode["US_BACKTICK"] = 86] = "US_BACKTICK";
  /**
   * Used for miscellaneous characters; it can vary by keyboard.
   * For the US standard keyboard, the '[{' key
   */
  KeyCode[KeyCode["US_OPEN_SQUARE_BRACKET"] = 87] = "US_OPEN_SQUARE_BRACKET";
  /**
   * Used for miscellaneous characters; it can vary by keyboard.
   * For the US standard keyboard, the '\|' key
   */
  KeyCode[KeyCode["US_BACKSLASH"] = 88] = "US_BACKSLASH";
  /**
   * Used for miscellaneous characters; it can vary by keyboard.
   * For the US standard keyboard, the ']}' key
   */
  KeyCode[KeyCode["US_CLOSE_SQUARE_BRACKET"] = 89] = "US_CLOSE_SQUARE_BRACKET";
  /**
   * Used for miscellaneous characters; it can vary by keyboard.
   * For the US standard keyboard, the ''"' key
   */
  KeyCode[KeyCode["US_QUOTE"] = 90] = "US_QUOTE";
  /**
   * Used for miscellaneous characters; it can vary by keyboard.
   */
  KeyCode[KeyCode["OEM_8"] = 91] = "OEM_8";
  /**
   * Either the angle bracket key or the backslash key on the RT 102-key keyboard.
   */
  KeyCode[KeyCode["OEM_102"] = 92] = "OEM_102";
  KeyCode[KeyCode["NUMPAD_0"] = 93] = "NUMPAD_0";
  KeyCode[KeyCode["NUMPAD_1"] = 94] = "NUMPAD_1";
  KeyCode[KeyCode["NUMPAD_2"] = 95] = "NUMPAD_2";
  KeyCode[KeyCode["NUMPAD_3"] = 96] = "NUMPAD_3";
  KeyCode[KeyCode["NUMPAD_4"] = 97] = "NUMPAD_4";
  KeyCode[KeyCode["NUMPAD_5"] = 98] = "NUMPAD_5";
  KeyCode[KeyCode["NUMPAD_6"] = 99] = "NUMPAD_6";
  KeyCode[KeyCode["NUMPAD_7"] = 100] = "NUMPAD_7";
  KeyCode[KeyCode["NUMPAD_8"] = 101] = "NUMPAD_8";
  KeyCode[KeyCode["NUMPAD_9"] = 102] = "NUMPAD_9";
  KeyCode[KeyCode["NUMPAD_MULTIPLY"] = 103] = "NUMPAD_MULTIPLY";
  KeyCode[KeyCode["NUMPAD_ADD"] = 104] = "NUMPAD_ADD";
  KeyCode[KeyCode["NUMPAD_SEPARATOR"] = 105] = "NUMPAD_SEPARATOR";
  KeyCode[KeyCode["NUMPAD_SUBTRACT"] = 106] = "NUMPAD_SUBTRACT";
  KeyCode[KeyCode["NUMPAD_DECIMAL"] = 107] = "NUMPAD_DECIMAL";
  KeyCode[KeyCode["NUMPAD_DIVIDE"] = 108] = "NUMPAD_DIVIDE";
  /**
   * Cover all key codes when IME is processing input.
   */
  KeyCode[KeyCode["KEY_IN_COMPOSITION"] = 109] = "KEY_IN_COMPOSITION";
  KeyCode[KeyCode["ABNT_C1"] = 110] = "ABNT_C1";
  KeyCode[KeyCode["ABNT_C2"] = 111] = "ABNT_C2";
  /**
   * Placed last to cover the length of the enum.
   * Please do not depend on this value!
   */
  KeyCode[KeyCode["MAX_VALUE"] = 112] = "MAX_VALUE";
})(KeyCode || (exports.KeyCode = KeyCode = {}));
function createMonacoBaseAPI() {
  return {
    editor: undefined,
    languages: undefined,
    CancellationTokenSource: _cancellation.CancellationTokenSource,
    Emitter: _event.Emitter,
    KeyCode: KeyCode,
    KeyMod: KeyMod,
    Position: _position.Position,
    Range: _range.Range,
    Selection: _selection.Selection,
    SelectionDirection: _selection.SelectionDirection,
    Severity: Severity,
    MarkerSeverity: MarkerSeverity,
    Promise: _winjsBase.TPromise,
    Uri: _uri2.default,
    Token: _token.Token
  };
}

/***/ }),
/* 35 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.PrefixSumComputerWithCache = exports.PrefixSumComputer = exports.PrefixSumIndexOfResult = undefined;

var _uint = __webpack_require__(8);

var PrefixSumIndexOfResult = /** @class */function () {
    function PrefixSumIndexOfResult(index, remainder) {
        this.index = index;
        this.remainder = remainder;
    }
    return PrefixSumIndexOfResult;
}();
exports.PrefixSumIndexOfResult = PrefixSumIndexOfResult;

var PrefixSumComputer = /** @class */function () {
    function PrefixSumComputer(values) {
        this.values = values;
        this.prefixSum = new Uint32Array(values.length);
        this.prefixSumValidIndex = new Int32Array(1);
        this.prefixSumValidIndex[0] = -1;
    }
    PrefixSumComputer.prototype.getCount = function () {
        return this.values.length;
    };
    PrefixSumComputer.prototype.insertValues = function (insertIndex, insertValues) {
        insertIndex = (0, _uint.toUint32)(insertIndex);
        var oldValues = this.values;
        var oldPrefixSum = this.prefixSum;
        var insertValuesLen = insertValues.length;
        if (insertValuesLen === 0) {
            return false;
        }
        this.values = new Uint32Array(oldValues.length + insertValuesLen);
        this.values.set(oldValues.subarray(0, insertIndex), 0);
        this.values.set(oldValues.subarray(insertIndex), insertIndex + insertValuesLen);
        this.values.set(insertValues, insertIndex);
        if (insertIndex - 1 < this.prefixSumValidIndex[0]) {
            this.prefixSumValidIndex[0] = insertIndex - 1;
        }
        this.prefixSum = new Uint32Array(this.values.length);
        if (this.prefixSumValidIndex[0] >= 0) {
            this.prefixSum.set(oldPrefixSum.subarray(0, this.prefixSumValidIndex[0] + 1));
        }
        return true;
    };
    PrefixSumComputer.prototype.changeValue = function (index, value) {
        index = (0, _uint.toUint32)(index);
        value = (0, _uint.toUint32)(value);
        if (this.values[index] === value) {
            return false;
        }
        this.values[index] = value;
        if (index - 1 < this.prefixSumValidIndex[0]) {
            this.prefixSumValidIndex[0] = index - 1;
        }
        return true;
    };
    PrefixSumComputer.prototype.removeValues = function (startIndex, cnt) {
        startIndex = (0, _uint.toUint32)(startIndex);
        cnt = (0, _uint.toUint32)(cnt);
        var oldValues = this.values;
        var oldPrefixSum = this.prefixSum;
        if (startIndex >= oldValues.length) {
            return false;
        }
        var maxCnt = oldValues.length - startIndex;
        if (cnt >= maxCnt) {
            cnt = maxCnt;
        }
        if (cnt === 0) {
            return false;
        }
        this.values = new Uint32Array(oldValues.length - cnt);
        this.values.set(oldValues.subarray(0, startIndex), 0);
        this.values.set(oldValues.subarray(startIndex + cnt), startIndex);
        this.prefixSum = new Uint32Array(this.values.length);
        if (startIndex - 1 < this.prefixSumValidIndex[0]) {
            this.prefixSumValidIndex[0] = startIndex - 1;
        }
        if (this.prefixSumValidIndex[0] >= 0) {
            this.prefixSum.set(oldPrefixSum.subarray(0, this.prefixSumValidIndex[0] + 1));
        }
        return true;
    };
    PrefixSumComputer.prototype.getTotalValue = function () {
        if (this.values.length === 0) {
            return 0;
        }
        return this._getAccumulatedValue(this.values.length - 1);
    };
    PrefixSumComputer.prototype.getAccumulatedValue = function (index) {
        if (index < 0) {
            return 0;
        }
        index = (0, _uint.toUint32)(index);
        return this._getAccumulatedValue(index);
    };
    PrefixSumComputer.prototype._getAccumulatedValue = function (index) {
        if (index <= this.prefixSumValidIndex[0]) {
            return this.prefixSum[index];
        }
        var startIndex = this.prefixSumValidIndex[0] + 1;
        if (startIndex === 0) {
            this.prefixSum[0] = this.values[0];
            startIndex++;
        }
        if (index >= this.values.length) {
            index = this.values.length - 1;
        }
        for (var i = startIndex; i <= index; i++) {
            this.prefixSum[i] = this.prefixSum[i - 1] + this.values[i];
        }
        this.prefixSumValidIndex[0] = Math.max(this.prefixSumValidIndex[0], index);
        return this.prefixSum[index];
    };
    PrefixSumComputer.prototype.getIndexOf = function (accumulatedValue) {
        accumulatedValue = Math.floor(accumulatedValue); //@perf
        // Compute all sums (to get a fully valid prefixSum)
        this.getTotalValue();
        var low = 0;
        var high = this.values.length - 1;
        var mid;
        var midStop;
        var midStart;
        while (low <= high) {
            mid = low + (high - low) / 2 | 0;
            midStop = this.prefixSum[mid];
            midStart = midStop - this.values[mid];
            if (accumulatedValue < midStart) {
                high = mid - 1;
            } else if (accumulatedValue >= midStop) {
                low = mid + 1;
            } else {
                break;
            }
        }
        return new PrefixSumIndexOfResult(mid, accumulatedValue - midStart);
    };
    return PrefixSumComputer;
}();
exports.PrefixSumComputer = PrefixSumComputer;

var PrefixSumComputerWithCache = /** @class */function () {
    function PrefixSumComputerWithCache(values) {
        this._cacheAccumulatedValueStart = 0;
        this._cache = null;
        this._actual = new PrefixSumComputer(values);
        this._bustCache();
    }
    PrefixSumComputerWithCache.prototype._bustCache = function () {
        this._cacheAccumulatedValueStart = 0;
        this._cache = null;
    };
    PrefixSumComputerWithCache.prototype.insertValues = function (insertIndex, insertValues) {
        if (this._actual.insertValues(insertIndex, insertValues)) {
            this._bustCache();
        }
    };
    PrefixSumComputerWithCache.prototype.changeValue = function (index, value) {
        if (this._actual.changeValue(index, value)) {
            this._bustCache();
        }
    };
    PrefixSumComputerWithCache.prototype.removeValues = function (startIndex, cnt) {
        if (this._actual.removeValues(startIndex, cnt)) {
            this._bustCache();
        }
    };
    PrefixSumComputerWithCache.prototype.getTotalValue = function () {
        return this._actual.getTotalValue();
    };
    PrefixSumComputerWithCache.prototype.getAccumulatedValue = function (index) {
        return this._actual.getAccumulatedValue(index);
    };
    PrefixSumComputerWithCache.prototype.getIndexOf = function (accumulatedValue) {
        accumulatedValue = Math.floor(accumulatedValue); //@perf
        if (this._cache !== null) {
            var cacheIndex = accumulatedValue - this._cacheAccumulatedValueStart;
            if (cacheIndex >= 0 && cacheIndex < this._cache.length) {
                // Cache hit!
                return this._cache[cacheIndex];
            }
        }
        // Cache miss!
        return this._actual.getIndexOf(accumulatedValue);
    };
    /**
     * Gives a hint that a lot of requests are about to come in for these accumulated values.
     */
    PrefixSumComputerWithCache.prototype.warmUpCache = function (accumulatedValueStart, accumulatedValueEnd) {
        var newCache = [];
        for (var accumulatedValue = accumulatedValueStart; accumulatedValue <= accumulatedValueEnd; accumulatedValue++) {
            newCache[accumulatedValue - accumulatedValueStart] = this.getIndexOf(accumulatedValue);
        }
        this._cache = newCache;
        this._cacheAccumulatedValueStart = accumulatedValueStart;
    };
    return PrefixSumComputerWithCache;
}();
exports.PrefixSumComputerWithCache = PrefixSumComputerWithCache;

/***/ }),
/* 36 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* --------------------------------------------------------------------------------------------
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 * ------------------------------------------------------------------------------------------ */

/**
 * The Position namespace provides helper functions to work with
 * [Position](#Position) literals.
 */

Object.defineProperty(exports, "__esModule", {
    value: true
});
var Position = exports.Position = undefined;
(function (Position) {
    /**
     * Creates a new Position literal from the given line and character.
     * @param line The position's line.
     * @param character The position's character.
     */
    function create(line, character) {
        return { line: line, character: character };
    }
    Position.create = create;
    /**
     * Checks whether the given liternal conforms to the [Position](#Position) interface.
     */
    function is(value) {
        var candidate = value;
        return Is.defined(candidate) && Is.number(candidate.line) && Is.number(candidate.character);
    }
    Position.is = is;
})(Position || (exports.Position = Position = {}));
/**
 * The Range namespace provides helper functions to work with
 * [Range](#Range) literals.
 */
var Range = exports.Range = undefined;
(function (Range) {
    function create(one, two, three, four) {
        if (Is.number(one) && Is.number(two) && Is.number(three) && Is.number(four)) {
            return { start: Position.create(one, two), end: Position.create(three, four) };
        } else if (Position.is(one) && Position.is(two)) {
            return { start: one, end: two };
        } else {
            throw new Error("Range#create called with invalid arguments[" + one + ", " + two + ", " + three + ", " + four + "]");
        }
    }
    Range.create = create;
    /**
     * Checks whether the given literal conforms to the [Range](#Range) interface.
     */
    function is(value) {
        var candidate = value;
        return Is.defined(candidate) && Position.is(candidate.start) && Position.is(candidate.end);
    }
    Range.is = is;
})(Range || (exports.Range = Range = {}));
/**
 * The Location namespace provides helper functions to work with
 * [Location](#Location) literals.
 */
var Location = exports.Location = undefined;
(function (Location) {
    /**
     * Creates a Location literal.
     * @param uri The location's uri.
     * @param range The location's range.
     */
    function create(uri, range) {
        return { uri: uri, range: range };
    }
    Location.create = create;
    /**
     * Checks whether the given literal conforms to the [Location](#Location) interface.
     */
    function is(value) {
        var candidate = value;
        return Is.defined(candidate) && Range.is(candidate.range) && (Is.string(candidate.uri) || Is.undefined(candidate.uri));
    }
    Location.is = is;
})(Location || (exports.Location = Location = {}));
/**
 * The diagnostic's serverity.
 */
var DiagnosticSeverity = exports.DiagnosticSeverity = undefined;
(function (DiagnosticSeverity) {
    /**
     * Reports an error.
     */
    DiagnosticSeverity.Error = 1;
    /**
     * Reports a warning.
     */
    DiagnosticSeverity.Warning = 2;
    /**
     * Reports an information.
     */
    DiagnosticSeverity.Information = 3;
    /**
     * Reports a hint.
     */
    DiagnosticSeverity.Hint = 4;
})(DiagnosticSeverity || (exports.DiagnosticSeverity = DiagnosticSeverity = {}));
/**
 * The Diagnostic namespace provides helper functions to work with
 * [Diagnostic](#Diagnostic) literals.
 */
var Diagnostic = exports.Diagnostic = undefined;
(function (Diagnostic) {
    /**
     * Creates a new Diagnostic literal.
     */
    function create(range, message, severity, code, source) {
        var result = { range: range, message: message };
        if (Is.defined(severity)) {
            result.severity = severity;
        }
        if (Is.defined(code)) {
            result.code = code;
        }
        if (Is.defined(source)) {
            result.source = source;
        }
        return result;
    }
    Diagnostic.create = create;
    /**
     * Checks whether the given literal conforms to the [Diagnostic](#Diagnostic) interface.
     */
    function is(value) {
        var candidate = value;
        return Is.defined(candidate) && Range.is(candidate.range) && Is.string(candidate.message) && (Is.number(candidate.severity) || Is.undefined(candidate.severity)) && (Is.number(candidate.code) || Is.string(candidate.code) || Is.undefined(candidate.code)) && (Is.string(candidate.source) || Is.undefined(candidate.source));
    }
    Diagnostic.is = is;
})(Diagnostic || (exports.Diagnostic = Diagnostic = {}));
/**
 * The Command namespace provides helper functions to work with
 * [Command](#Command) literals.
 */
var Command = exports.Command = undefined;
(function (Command) {
    /**
     * Creates a new Command literal.
     */
    function create(title, command) {
        var args = [];
        for (var _i = 2; _i < arguments.length; _i++) {
            args[_i - 2] = arguments[_i];
        }
        var result = { title: title, command: command };
        if (Is.defined(args) && args.length > 0) {
            result.arguments = args;
        }
        return result;
    }
    Command.create = create;
    /**
     * Checks whether the given literal conforms to the [Command](#Command) interface.
     */
    function is(value) {
        var candidate = value;
        return Is.defined(candidate) && Is.string(candidate.title) && Is.string(candidate.title);
    }
    Command.is = is;
})(Command || (exports.Command = Command = {}));
/**
 * The TextEdit namespace provides helper function to create replace,
 * insert and delete edits more easily.
 */
var TextEdit = exports.TextEdit = undefined;
(function (TextEdit) {
    /**
     * Creates a replace text edit.
     * @param range The range of text to be replaced.
     * @param newText The new text.
     */
    function replace(range, newText) {
        return { range: range, newText: newText };
    }
    TextEdit.replace = replace;
    /**
     * Creates a insert text edit.
     * @param position The position to insert the text at.
     * @param newText The text to be inserted.
     */
    function insert(position, newText) {
        return { range: { start: position, end: position }, newText: newText };
    }
    TextEdit.insert = insert;
    /**
     * Creates a delete text edit.
     * @param range The range of text to be deleted.
     */
    function del(range) {
        return { range: range, newText: '' };
    }
    TextEdit.del = del;
})(TextEdit || (exports.TextEdit = TextEdit = {}));
/**
 * The TextDocumentEdit namespace provides helper function to create
 * an edit that manipulates a text document.
 */
var TextDocumentEdit = exports.TextDocumentEdit = undefined;
(function (TextDocumentEdit) {
    /**
     * Creates a new `TextDocumentEdit`
     */
    function create(textDocument, edits) {
        return { textDocument: textDocument, edits: edits };
    }
    TextDocumentEdit.create = create;
    function is(value) {
        var candidate = value;
        return Is.defined(candidate) && VersionedTextDocumentIdentifier.is(candidate.textDocument) && Array.isArray(candidate.edits);
    }
    TextDocumentEdit.is = is;
})(TextDocumentEdit || (exports.TextDocumentEdit = TextDocumentEdit = {}));
var TextEditChangeImpl = /** @class */function () {
    function TextEditChangeImpl(edits) {
        this.edits = edits;
    }
    TextEditChangeImpl.prototype.insert = function (position, newText) {
        this.edits.push(TextEdit.insert(position, newText));
    };
    TextEditChangeImpl.prototype.replace = function (range, newText) {
        this.edits.push(TextEdit.replace(range, newText));
    };
    TextEditChangeImpl.prototype.delete = function (range) {
        this.edits.push(TextEdit.del(range));
    };
    TextEditChangeImpl.prototype.add = function (edit) {
        this.edits.push(edit);
    };
    TextEditChangeImpl.prototype.all = function () {
        return this.edits;
    };
    TextEditChangeImpl.prototype.clear = function () {
        this.edits.splice(0, this.edits.length);
    };
    return TextEditChangeImpl;
}();
/**
 * A workspace change helps constructing changes to a workspace.
 */
var WorkspaceChange = /** @class */function () {
    function WorkspaceChange(workspaceEdit) {
        var _this = this;
        this._textEditChanges = Object.create(null);
        if (workspaceEdit) {
            this._workspaceEdit = workspaceEdit;
            if (workspaceEdit.documentChanges) {
                workspaceEdit.documentChanges.forEach(function (textDocumentEdit) {
                    var textEditChange = new TextEditChangeImpl(textDocumentEdit.edits);
                    _this._textEditChanges[textDocumentEdit.textDocument.uri] = textEditChange;
                });
            } else if (workspaceEdit.changes) {
                Object.keys(workspaceEdit.changes).forEach(function (key) {
                    var textEditChange = new TextEditChangeImpl(workspaceEdit.changes[key]);
                    _this._textEditChanges[key] = textEditChange;
                });
            }
        }
    }
    Object.defineProperty(WorkspaceChange.prototype, "edit", {
        /**
         * Returns the underlying [WorkspaceEdit](#WorkspaceEdit) literal
         * use to be returned from a workspace edit operation like rename.
         */
        get: function get() {
            return this._workspaceEdit;
        },
        enumerable: true,
        configurable: true
    });
    WorkspaceChange.prototype.getTextEditChange = function (key) {
        if (VersionedTextDocumentIdentifier.is(key)) {
            if (!this._workspaceEdit) {
                this._workspaceEdit = {
                    documentChanges: []
                };
            }
            if (!this._workspaceEdit.documentChanges) {
                throw new Error('Workspace edit is not configured for versioned document changes.');
            }
            var textDocument = key;
            var result = this._textEditChanges[textDocument.uri];
            if (!result) {
                var edits = [];
                var textDocumentEdit = {
                    textDocument: textDocument,
                    edits: edits
                };
                this._workspaceEdit.documentChanges.push(textDocumentEdit);
                result = new TextEditChangeImpl(edits);
                this._textEditChanges[textDocument.uri] = result;
            }
            return result;
        } else {
            if (!this._workspaceEdit) {
                this._workspaceEdit = {
                    changes: Object.create(null)
                };
            }
            if (!this._workspaceEdit.changes) {
                throw new Error('Workspace edit is not configured for normal text edit changes.');
            }
            var result = this._textEditChanges[key];
            if (!result) {
                var edits = [];
                this._workspaceEdit.changes[key] = edits;
                result = new TextEditChangeImpl(edits);
                this._textEditChanges[key] = result;
            }
            return result;
        }
    };
    return WorkspaceChange;
}();
exports.WorkspaceChange = WorkspaceChange;
/**
 * The TextDocumentIdentifier namespace provides helper functions to work with
 * [TextDocumentIdentifier](#TextDocumentIdentifier) literals.
 */

var TextDocumentIdentifier = exports.TextDocumentIdentifier = undefined;
(function (TextDocumentIdentifier) {
    /**
     * Creates a new TextDocumentIdentifier literal.
     * @param uri The document's uri.
     */
    function create(uri) {
        return { uri: uri };
    }
    TextDocumentIdentifier.create = create;
    /**
     * Checks whether the given literal conforms to the [TextDocumentIdentifier](#TextDocumentIdentifier) interface.
     */
    function is(value) {
        var candidate = value;
        return Is.defined(candidate) && Is.string(candidate.uri);
    }
    TextDocumentIdentifier.is = is;
})(TextDocumentIdentifier || (exports.TextDocumentIdentifier = TextDocumentIdentifier = {}));
/**
 * The VersionedTextDocumentIdentifier namespace provides helper functions to work with
 * [VersionedTextDocumentIdentifier](#VersionedTextDocumentIdentifier) literals.
 */
var VersionedTextDocumentIdentifier = exports.VersionedTextDocumentIdentifier = undefined;
(function (VersionedTextDocumentIdentifier) {
    /**
     * Creates a new VersionedTextDocumentIdentifier literal.
     * @param uri The document's uri.
     * @param uri The document's text.
     */
    function create(uri, version) {
        return { uri: uri, version: version };
    }
    VersionedTextDocumentIdentifier.create = create;
    /**
     * Checks whether the given literal conforms to the [VersionedTextDocumentIdentifier](#VersionedTextDocumentIdentifier) interface.
     */
    function is(value) {
        var candidate = value;
        return Is.defined(candidate) && Is.string(candidate.uri) && Is.number(candidate.version);
    }
    VersionedTextDocumentIdentifier.is = is;
})(VersionedTextDocumentIdentifier || (exports.VersionedTextDocumentIdentifier = VersionedTextDocumentIdentifier = {}));
/**
 * The TextDocumentItem namespace provides helper functions to work with
 * [TextDocumentItem](#TextDocumentItem) literals.
 */
var TextDocumentItem = exports.TextDocumentItem = undefined;
(function (TextDocumentItem) {
    /**
     * Creates a new TextDocumentItem literal.
     * @param uri The document's uri.
     * @param languageId The document's language identifier.
     * @param version The document's version number.
     * @param text The document's text.
     */
    function create(uri, languageId, version, text) {
        return { uri: uri, languageId: languageId, version: version, text: text };
    }
    TextDocumentItem.create = create;
    /**
     * Checks whether the given literal conforms to the [TextDocumentItem](#TextDocumentItem) interface.
     */
    function is(value) {
        var candidate = value;
        return Is.defined(candidate) && Is.string(candidate.uri) && Is.string(candidate.languageId) && Is.number(candidate.version) && Is.string(candidate.text);
    }
    TextDocumentItem.is = is;
})(TextDocumentItem || (exports.TextDocumentItem = TextDocumentItem = {}));
/**
 * Describes the content type that a client supports in various
 * result literals like `Hover`, `ParameterInfo` or `CompletionItem`.
 *
 * Please note that `MarkupKinds` must not start with a `$`. This kinds
 * are reserved for internal usage.
 */
var MarkupKind = exports.MarkupKind = undefined;
(function (MarkupKind) {
    /**
     * Plain text is supported as a content format
     */
    MarkupKind.PlainText = 'plaintext';
    /**
     * Markdown is supported as a content format
     */
    MarkupKind.Markdown = 'markdown';
})(MarkupKind || (exports.MarkupKind = MarkupKind = {}));
/**
 * The kind of a completion entry.
 */
var CompletionItemKind = exports.CompletionItemKind = undefined;
(function (CompletionItemKind) {
    CompletionItemKind.Text = 1;
    CompletionItemKind.Method = 2;
    CompletionItemKind.Function = 3;
    CompletionItemKind.Constructor = 4;
    CompletionItemKind.Field = 5;
    CompletionItemKind.Variable = 6;
    CompletionItemKind.Class = 7;
    CompletionItemKind.Interface = 8;
    CompletionItemKind.Module = 9;
    CompletionItemKind.Property = 10;
    CompletionItemKind.Unit = 11;
    CompletionItemKind.Value = 12;
    CompletionItemKind.Enum = 13;
    CompletionItemKind.Keyword = 14;
    CompletionItemKind.Snippet = 15;
    CompletionItemKind.Color = 16;
    CompletionItemKind.File = 17;
    CompletionItemKind.Reference = 18;
    CompletionItemKind.Folder = 19;
    CompletionItemKind.EnumMember = 20;
    CompletionItemKind.Constant = 21;
    CompletionItemKind.Struct = 22;
    CompletionItemKind.Event = 23;
    CompletionItemKind.Operator = 24;
    CompletionItemKind.TypeParameter = 25;
})(CompletionItemKind || (exports.CompletionItemKind = CompletionItemKind = {}));
/**
 * Defines whether the insert text in a completion item should be interpreted as
 * plain text or a snippet.
 */
var InsertTextFormat = exports.InsertTextFormat = undefined;
(function (InsertTextFormat) {
    /**
     * The primary text to be inserted is treated as a plain string.
     */
    InsertTextFormat.PlainText = 1;
    /**
     * The primary text to be inserted is treated as a snippet.
     *
     * A snippet can define tab stops and placeholders with `$1`, `$2`
     * and `${3:foo}`. `$0` defines the final tab stop, it defaults to
     * the end of the snippet. Placeholders with equal identifiers are linked,
     * that is typing in one will update others too.
     *
     * See also: https://github.com/Microsoft/vscode/blob/master/src/vs/editor/contrib/snippet/common/snippet.md
     */
    InsertTextFormat.Snippet = 2;
})(InsertTextFormat || (exports.InsertTextFormat = InsertTextFormat = {}));
/**
 * The CompletionItem namespace provides functions to deal with
 * completion items.
 */
var CompletionItem = exports.CompletionItem = undefined;
(function (CompletionItem) {
    /**
     * Create a completion item and seed it with a label.
     * @param label The completion item's label
     */
    function create(label) {
        return { label: label };
    }
    CompletionItem.create = create;
})(CompletionItem || (exports.CompletionItem = CompletionItem = {}));
/**
 * The CompletionList namespace provides functions to deal with
 * completion lists.
 */
var CompletionList = exports.CompletionList = undefined;
(function (CompletionList) {
    /**
     * Creates a new completion list.
     *
     * @param items The completion items.
     * @param isIncomplete The list is not complete.
     */
    function create(items, isIncomplete) {
        return { items: items ? items : [], isIncomplete: !!isIncomplete };
    }
    CompletionList.create = create;
})(CompletionList || (exports.CompletionList = CompletionList = {}));
var MarkedString = exports.MarkedString = undefined;
(function (MarkedString) {
    /**
     * Creates a marked string from plain text.
     *
     * @param plainText The plain text.
     */
    function fromPlainText(plainText) {
        return plainText.replace(/[\\`*_{}[\]()#+\-.!]/g, "\\$&"); // escape markdown syntax tokens: http://daringfireball.net/projects/markdown/syntax#backslash
    }
    MarkedString.fromPlainText = fromPlainText;
})(MarkedString || (exports.MarkedString = MarkedString = {}));
/**
 * The ParameterInformation namespace provides helper functions to work with
 * [ParameterInformation](#ParameterInformation) literals.
 */
var ParameterInformation = exports.ParameterInformation = undefined;
(function (ParameterInformation) {
    /**
     * Creates a new parameter information literal.
     *
     * @param label A label string.
     * @param documentation A doc string.
     */
    function create(label, documentation) {
        return documentation ? { label: label, documentation: documentation } : { label: label };
    }
    ParameterInformation.create = create;
    ;
})(ParameterInformation || (exports.ParameterInformation = ParameterInformation = {}));
/**
 * The SignatureInformation namespace provides helper functions to work with
 * [SignatureInformation](#SignatureInformation) literals.
 */
var SignatureInformation = exports.SignatureInformation = undefined;
(function (SignatureInformation) {
    function create(label, documentation) {
        var parameters = [];
        for (var _i = 2; _i < arguments.length; _i++) {
            parameters[_i - 2] = arguments[_i];
        }
        var result = { label: label };
        if (Is.defined(documentation)) {
            result.documentation = documentation;
        }
        if (Is.defined(parameters)) {
            result.parameters = parameters;
        } else {
            result.parameters = [];
        }
        return result;
    }
    SignatureInformation.create = create;
})(SignatureInformation || (exports.SignatureInformation = SignatureInformation = {}));
/**
 * A document highlight kind.
 */
var DocumentHighlightKind = exports.DocumentHighlightKind = undefined;
(function (DocumentHighlightKind) {
    /**
     * A textual occurrance.
     */
    DocumentHighlightKind.Text = 1;
    /**
     * Read-access of a symbol, like reading a variable.
     */
    DocumentHighlightKind.Read = 2;
    /**
     * Write-access of a symbol, like writing to a variable.
     */
    DocumentHighlightKind.Write = 3;
})(DocumentHighlightKind || (exports.DocumentHighlightKind = DocumentHighlightKind = {}));
/**
 * DocumentHighlight namespace to provide helper functions to work with
 * [DocumentHighlight](#DocumentHighlight) literals.
 */
var DocumentHighlight = exports.DocumentHighlight = undefined;
(function (DocumentHighlight) {
    /**
     * Create a DocumentHighlight object.
     * @param range The range the highlight applies to.
     */
    function create(range, kind) {
        var result = { range: range };
        if (Is.number(kind)) {
            result.kind = kind;
        }
        return result;
    }
    DocumentHighlight.create = create;
})(DocumentHighlight || (exports.DocumentHighlight = DocumentHighlight = {}));
/**
 * A symbol kind.
 */
var SymbolKind = exports.SymbolKind = undefined;
(function (SymbolKind) {
    SymbolKind.File = 1;
    SymbolKind.Module = 2;
    SymbolKind.Namespace = 3;
    SymbolKind.Package = 4;
    SymbolKind.Class = 5;
    SymbolKind.Method = 6;
    SymbolKind.Property = 7;
    SymbolKind.Field = 8;
    SymbolKind.Constructor = 9;
    SymbolKind.Enum = 10;
    SymbolKind.Interface = 11;
    SymbolKind.Function = 12;
    SymbolKind.Variable = 13;
    SymbolKind.Constant = 14;
    SymbolKind.String = 15;
    SymbolKind.Number = 16;
    SymbolKind.Boolean = 17;
    SymbolKind.Array = 18;
    SymbolKind.Object = 19;
    SymbolKind.Key = 20;
    SymbolKind.Null = 21;
    SymbolKind.EnumMember = 22;
    SymbolKind.Struct = 23;
    SymbolKind.Event = 24;
    SymbolKind.Operator = 25;
    SymbolKind.TypeParameter = 26;
})(SymbolKind || (exports.SymbolKind = SymbolKind = {}));
var SymbolInformation = exports.SymbolInformation = undefined;
(function (SymbolInformation) {
    /**
     * Creates a new symbol information literal.
     *
     * @param name The name of the symbol.
     * @param kind The kind of the symbol.
     * @param range The range of the location of the symbol.
     * @param uri The resource of the location of symbol, defaults to the current document.
     * @param containerName The name of the symbol containg the symbol.
     */
    function create(name, kind, range, uri, containerName) {
        var result = {
            name: name,
            kind: kind,
            location: { uri: uri, range: range }
        };
        if (containerName) {
            result.containerName = containerName;
        }
        return result;
    }
    SymbolInformation.create = create;
})(SymbolInformation || (exports.SymbolInformation = SymbolInformation = {}));
/**
 * The CodeActionContext namespace provides helper functions to work with
 * [CodeActionContext](#CodeActionContext) literals.
 */
var CodeActionContext = exports.CodeActionContext = undefined;
(function (CodeActionContext) {
    /**
     * Creates a new CodeActionContext literal.
     */
    function create(diagnostics) {
        return { diagnostics: diagnostics };
    }
    CodeActionContext.create = create;
    /**
     * Checks whether the given literal conforms to the [CodeActionContext](#CodeActionContext) interface.
     */
    function is(value) {
        var candidate = value;
        return Is.defined(candidate) && Is.typedArray(candidate.diagnostics, Diagnostic.is);
    }
    CodeActionContext.is = is;
})(CodeActionContext || (exports.CodeActionContext = CodeActionContext = {}));
/**
 * The CodeLens namespace provides helper functions to work with
 * [CodeLens](#CodeLens) literals.
 */
var CodeLens = exports.CodeLens = undefined;
(function (CodeLens) {
    /**
     * Creates a new CodeLens literal.
     */
    function create(range, data) {
        var result = { range: range };
        if (Is.defined(data)) result.data = data;
        return result;
    }
    CodeLens.create = create;
    /**
     * Checks whether the given literal conforms to the [CodeLens](#CodeLens) interface.
     */
    function is(value) {
        var candidate = value;
        return Is.defined(candidate) && Range.is(candidate.range) && (Is.undefined(candidate.command) || Command.is(candidate.command));
    }
    CodeLens.is = is;
})(CodeLens || (exports.CodeLens = CodeLens = {}));
/**
 * The FormattingOptions namespace provides helper functions to work with
 * [FormattingOptions](#FormattingOptions) literals.
 */
var FormattingOptions = exports.FormattingOptions = undefined;
(function (FormattingOptions) {
    /**
     * Creates a new FormattingOptions literal.
     */
    function create(tabSize, insertSpaces) {
        return { tabSize: tabSize, insertSpaces: insertSpaces };
    }
    FormattingOptions.create = create;
    /**
     * Checks whether the given literal conforms to the [FormattingOptions](#FormattingOptions) interface.
     */
    function is(value) {
        var candidate = value;
        return Is.defined(candidate) && Is.number(candidate.tabSize) && Is.boolean(candidate.insertSpaces);
    }
    FormattingOptions.is = is;
})(FormattingOptions || (exports.FormattingOptions = FormattingOptions = {}));
/**
 * A document link is a range in a text document that links to an internal or external resource, like another
 * text document or a web site.
 */
var DocumentLink = /** @class */function () {
    function DocumentLink() {}
    return DocumentLink;
}();
exports.DocumentLink = DocumentLink;
/**
 * The DocumentLink namespace provides helper functions to work with
 * [DocumentLink](#DocumentLink) literals.
 */

(function (DocumentLink) {
    /**
     * Creates a new DocumentLink literal.
     */
    function create(range, target) {
        return { range: range, target: target };
    }
    DocumentLink.create = create;
    /**
     * Checks whether the given literal conforms to the [DocumentLink](#DocumentLink) interface.
     */
    function is(value) {
        var candidate = value;
        return Is.defined(candidate) && Range.is(candidate.range) && (Is.undefined(candidate.target) || Is.string(candidate.target));
    }
    DocumentLink.is = is;
})(DocumentLink || (exports.DocumentLink = DocumentLink = {}));
var EOL = exports.EOL = ['\n', '\r\n', '\r'];
var TextDocument = exports.TextDocument = undefined;
(function (TextDocument) {
    /**
     * Creates a new ITextDocument literal from the given uri and content.
     * @param uri The document's uri.
     * @param languageId  The document's language Id.
     * @param content The document's content.
     */
    function create(uri, languageId, version, content) {
        return new FullTextDocument(uri, languageId, version, content);
    }
    TextDocument.create = create;
    /**
     * Checks whether the given literal conforms to the [ITextDocument](#ITextDocument) interface.
     */
    function is(value) {
        var candidate = value;
        return Is.defined(candidate) && Is.string(candidate.uri) && (Is.undefined(candidate.languageId) || Is.string(candidate.languageId)) && Is.number(candidate.lineCount) && Is.func(candidate.getText) && Is.func(candidate.positionAt) && Is.func(candidate.offsetAt) ? true : false;
    }
    TextDocument.is = is;
    function applyEdits(document, edits) {
        var text = document.getText();
        var sortedEdits = mergeSort(edits, function (a, b) {
            var diff = a.range.start.line - b.range.start.line;
            if (diff === 0) {
                return a.range.start.character - b.range.start.character;
            }
            return 0;
        });
        var lastModifiedOffset = text.length;
        for (var i = sortedEdits.length - 1; i >= 0; i--) {
            var e = sortedEdits[i];
            var startOffset = document.offsetAt(e.range.start);
            var endOffset = document.offsetAt(e.range.end);
            if (endOffset <= lastModifiedOffset) {
                text = text.substring(0, startOffset) + e.newText + text.substring(endOffset, text.length);
            } else {
                throw new Error('Ovelapping edit');
            }
            lastModifiedOffset = startOffset;
        }
        return text;
    }
    TextDocument.applyEdits = applyEdits;
    function mergeSort(data, compare) {
        if (data.length <= 1) {
            // sorted
            return data;
        }
        var p = data.length / 2 | 0;
        var left = data.slice(0, p);
        var right = data.slice(p);
        mergeSort(left, compare);
        mergeSort(right, compare);
        var leftIdx = 0;
        var rightIdx = 0;
        var i = 0;
        while (leftIdx < left.length && rightIdx < right.length) {
            var ret = compare(left[leftIdx], right[rightIdx]);
            if (ret <= 0) {
                // smaller_equal -> take left to preserve order
                data[i++] = left[leftIdx++];
            } else {
                // greater -> take right
                data[i++] = right[rightIdx++];
            }
        }
        while (leftIdx < left.length) {
            data[i++] = left[leftIdx++];
        }
        while (rightIdx < right.length) {
            data[i++] = right[rightIdx++];
        }
        return data;
    }
})(TextDocument || (exports.TextDocument = TextDocument = {}));
/**
 * Represents reasons why a text document is saved.
 */
var TextDocumentSaveReason = exports.TextDocumentSaveReason = undefined;
(function (TextDocumentSaveReason) {
    /**
     * Manually triggered, e.g. by the user pressing save, by starting debugging,
     * or by an API call.
     */
    TextDocumentSaveReason.Manual = 1;
    /**
     * Automatic after a delay.
     */
    TextDocumentSaveReason.AfterDelay = 2;
    /**
     * When the editor lost focus.
     */
    TextDocumentSaveReason.FocusOut = 3;
})(TextDocumentSaveReason || (exports.TextDocumentSaveReason = TextDocumentSaveReason = {}));
var FullTextDocument = /** @class */function () {
    function FullTextDocument(uri, languageId, version, content) {
        this._uri = uri;
        this._languageId = languageId;
        this._version = version;
        this._content = content;
        this._lineOffsets = null;
    }
    Object.defineProperty(FullTextDocument.prototype, "uri", {
        get: function get() {
            return this._uri;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(FullTextDocument.prototype, "languageId", {
        get: function get() {
            return this._languageId;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(FullTextDocument.prototype, "version", {
        get: function get() {
            return this._version;
        },
        enumerable: true,
        configurable: true
    });
    FullTextDocument.prototype.getText = function (range) {
        if (range) {
            var start = this.offsetAt(range.start);
            var end = this.offsetAt(range.end);
            return this._content.substring(start, end);
        }
        return this._content;
    };
    FullTextDocument.prototype.update = function (event, version) {
        this._content = event.text;
        this._version = version;
        this._lineOffsets = null;
    };
    FullTextDocument.prototype.getLineOffsets = function () {
        if (this._lineOffsets === null) {
            var lineOffsets = [];
            var text = this._content;
            var isLineStart = true;
            for (var i = 0; i < text.length; i++) {
                if (isLineStart) {
                    lineOffsets.push(i);
                    isLineStart = false;
                }
                var ch = text.charAt(i);
                isLineStart = ch === '\r' || ch === '\n';
                if (ch === '\r' && i + 1 < text.length && text.charAt(i + 1) === '\n') {
                    i++;
                }
            }
            if (isLineStart && text.length > 0) {
                lineOffsets.push(text.length);
            }
            this._lineOffsets = lineOffsets;
        }
        return this._lineOffsets;
    };
    FullTextDocument.prototype.positionAt = function (offset) {
        offset = Math.max(Math.min(offset, this._content.length), 0);
        var lineOffsets = this.getLineOffsets();
        var low = 0,
            high = lineOffsets.length;
        if (high === 0) {
            return Position.create(0, offset);
        }
        while (low < high) {
            var mid = Math.floor((low + high) / 2);
            if (lineOffsets[mid] > offset) {
                high = mid;
            } else {
                low = mid + 1;
            }
        }
        // low is the least x for which the line offset is larger than the current offset
        // or array.length if no line offset is larger than the current offset
        var line = low - 1;
        return Position.create(line, offset - lineOffsets[line]);
    };
    FullTextDocument.prototype.offsetAt = function (position) {
        var lineOffsets = this.getLineOffsets();
        if (position.line >= lineOffsets.length) {
            return this._content.length;
        } else if (position.line < 0) {
            return 0;
        }
        var lineOffset = lineOffsets[position.line];
        var nextLineOffset = position.line + 1 < lineOffsets.length ? lineOffsets[position.line + 1] : this._content.length;
        return Math.max(Math.min(lineOffset + position.character, nextLineOffset), lineOffset);
    };
    Object.defineProperty(FullTextDocument.prototype, "lineCount", {
        get: function get() {
            return this.getLineOffsets().length;
        },
        enumerable: true,
        configurable: true
    });
    return FullTextDocument;
}();
var Is;
(function (Is) {
    var toString = Object.prototype.toString;
    function defined(value) {
        return typeof value !== 'undefined';
    }
    Is.defined = defined;
    function undefined(value) {
        return typeof value === 'undefined';
    }
    Is.undefined = undefined;
    function boolean(value) {
        return value === true || value === false;
    }
    Is.boolean = boolean;
    function string(value) {
        return toString.call(value) === '[object String]';
    }
    Is.string = string;
    function number(value) {
        return toString.call(value) === '[object Number]';
    }
    Is.number = number;
    function func(value) {
        return toString.call(value) === '[object Function]';
    }
    Is.func = func;
    function typedArray(value, check) {
        return Array.isArray(value) && value.every(check);
    }
    Is.typedArray = typedArray;
})(Is || (Is = {}));

/***/ }),
/* 37 */,
/* 38 */,
/* 39 */,
/* 40 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.ScannerState = exports.TokenType = undefined;
exports.createScanner = createScanner;

var _vscodeNls = __webpack_require__(51);

var nls = _interopRequireWildcard(_vscodeNls);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

var localize = nls.loadMessageBundle();
var TokenType = exports.TokenType = undefined;
(function (TokenType) {
    TokenType[TokenType["StartCommentTag"] = 0] = "StartCommentTag";
    TokenType[TokenType["Comment"] = 1] = "Comment";
    TokenType[TokenType["EndCommentTag"] = 2] = "EndCommentTag";
    TokenType[TokenType["StartTagOpen"] = 3] = "StartTagOpen";
    TokenType[TokenType["StartTagClose"] = 4] = "StartTagClose";
    TokenType[TokenType["StartTagSelfClose"] = 5] = "StartTagSelfClose";
    TokenType[TokenType["StartTag"] = 6] = "StartTag";
    TokenType[TokenType["EndTagOpen"] = 7] = "EndTagOpen";
    TokenType[TokenType["EndTagClose"] = 8] = "EndTagClose";
    TokenType[TokenType["EndTag"] = 9] = "EndTag";
    TokenType[TokenType["DelimiterAssign"] = 10] = "DelimiterAssign";
    TokenType[TokenType["AttributeName"] = 11] = "AttributeName";
    TokenType[TokenType["AttributeValue"] = 12] = "AttributeValue";
    TokenType[TokenType["StartDoctypeTag"] = 13] = "StartDoctypeTag";
    TokenType[TokenType["Doctype"] = 14] = "Doctype";
    TokenType[TokenType["EndDoctypeTag"] = 15] = "EndDoctypeTag";
    TokenType[TokenType["Content"] = 16] = "Content";
    TokenType[TokenType["Whitespace"] = 17] = "Whitespace";
    TokenType[TokenType["Unknown"] = 18] = "Unknown";
    TokenType[TokenType["Script"] = 19] = "Script";
    TokenType[TokenType["Styles"] = 20] = "Styles";
    TokenType[TokenType["EOS"] = 21] = "EOS";
})(TokenType || (exports.TokenType = TokenType = {}));
var MultiLineStream = /** @class */function () {
    function MultiLineStream(source, position) {
        this.source = source;
        this.len = source.length;
        this.position = position;
    }
    MultiLineStream.prototype.eos = function () {
        return this.len <= this.position;
    };
    MultiLineStream.prototype.getSource = function () {
        return this.source;
    };
    MultiLineStream.prototype.pos = function () {
        return this.position;
    };
    MultiLineStream.prototype.goBackTo = function (pos) {
        this.position = pos;
    };
    MultiLineStream.prototype.goBack = function (n) {
        this.position -= n;
    };
    MultiLineStream.prototype.advance = function (n) {
        this.position += n;
    };
    MultiLineStream.prototype.goToEnd = function () {
        this.position = this.source.length;
    };
    MultiLineStream.prototype.nextChar = function () {
        return this.source.charCodeAt(this.position++) || 0;
    };
    MultiLineStream.prototype.peekChar = function (n) {
        if (n === void 0) {
            n = 0;
        }
        return this.source.charCodeAt(this.position + n) || 0;
    };
    MultiLineStream.prototype.advanceIfChar = function (ch) {
        if (ch === this.source.charCodeAt(this.position)) {
            this.position++;
            return true;
        }
        return false;
    };
    MultiLineStream.prototype.advanceIfChars = function (ch) {
        var i;
        if (this.position + ch.length > this.source.length) {
            return false;
        }
        for (i = 0; i < ch.length; i++) {
            if (this.source.charCodeAt(this.position + i) !== ch[i]) {
                return false;
            }
        }
        this.advance(i);
        return true;
    };
    MultiLineStream.prototype.advanceIfRegExp = function (regex) {
        var str = this.source.substr(this.position);
        var match = str.match(regex);
        if (match) {
            this.position = this.position + match.index + match[0].length;
            return match[0];
        }
        return '';
    };
    MultiLineStream.prototype.advanceUntilRegExp = function (regex) {
        var str = this.source.substr(this.position);
        var match = str.match(regex);
        if (match) {
            this.position = this.position + match.index;
            return match[0];
        } else {
            this.goToEnd();
        }
        return '';
    };
    MultiLineStream.prototype.advanceUntilChar = function (ch) {
        while (this.position < this.source.length) {
            if (this.source.charCodeAt(this.position) === ch) {
                return true;
            }
            this.advance(1);
        }
        return false;
    };
    MultiLineStream.prototype.advanceUntilChars = function (ch) {
        while (this.position + ch.length <= this.source.length) {
            var i = 0;
            for (; i < ch.length && this.source.charCodeAt(this.position + i) === ch[i]; i++) {}
            if (i === ch.length) {
                return true;
            }
            this.advance(1);
        }
        this.goToEnd();
        return false;
    };
    MultiLineStream.prototype.skipWhitespace = function () {
        var n = this.advanceWhileChar(function (ch) {
            return ch === _WSP || ch === _TAB || ch === _NWL || ch === _LFD || ch === _CAR;
        });
        return n > 0;
    };
    MultiLineStream.prototype.advanceWhileChar = function (condition) {
        var posNow = this.position;
        while (this.position < this.len && condition(this.source.charCodeAt(this.position))) {
            this.position++;
        }
        return this.position - posNow;
    };
    return MultiLineStream;
}();
var _BNG = '!'.charCodeAt(0);
var _MIN = '-'.charCodeAt(0);
var _LAN = '<'.charCodeAt(0);
var _RAN = '>'.charCodeAt(0);
var _FSL = '/'.charCodeAt(0);
var _EQS = '='.charCodeAt(0);
var _DQO = '"'.charCodeAt(0);
var _SQO = '\''.charCodeAt(0);
var _NWL = '\n'.charCodeAt(0);
var _CAR = '\r'.charCodeAt(0);
var _LFD = '\f'.charCodeAt(0);
var _WSP = ' '.charCodeAt(0);
var _TAB = '\t'.charCodeAt(0);
var ScannerState = exports.ScannerState = undefined;
(function (ScannerState) {
    ScannerState[ScannerState["WithinContent"] = 0] = "WithinContent";
    ScannerState[ScannerState["AfterOpeningStartTag"] = 1] = "AfterOpeningStartTag";
    ScannerState[ScannerState["AfterOpeningEndTag"] = 2] = "AfterOpeningEndTag";
    ScannerState[ScannerState["WithinDoctype"] = 3] = "WithinDoctype";
    ScannerState[ScannerState["WithinTag"] = 4] = "WithinTag";
    ScannerState[ScannerState["WithinEndTag"] = 5] = "WithinEndTag";
    ScannerState[ScannerState["WithinComment"] = 6] = "WithinComment";
    ScannerState[ScannerState["WithinScriptContent"] = 7] = "WithinScriptContent";
    ScannerState[ScannerState["WithinStyleContent"] = 8] = "WithinStyleContent";
    ScannerState[ScannerState["AfterAttributeName"] = 9] = "AfterAttributeName";
    ScannerState[ScannerState["BeforeAttributeValue"] = 10] = "BeforeAttributeValue";
})(ScannerState || (exports.ScannerState = ScannerState = {}));
var htmlScriptContents = {
    'text/x-handlebars-template': true
};
function createScanner(input, initialOffset, initialState) {
    if (initialOffset === void 0) {
        initialOffset = 0;
    }
    if (initialState === void 0) {
        initialState = ScannerState.WithinContent;
    }
    var stream = new MultiLineStream(input, initialOffset);
    var state = initialState;
    var tokenOffset = 0;
    var tokenType = TokenType.Unknown;
    var tokenError;
    var hasSpaceAfterTag;
    var lastTag;
    var lastAttributeName;
    var lastTypeValue;
    function nextElementName() {
        return stream.advanceIfRegExp(/^[_:\w][_:\w-.\d]*/).toLowerCase();
    }
    function nextAttributeName() {
        return stream.advanceIfRegExp(/^[^\s"'>/=\x00-\x0F\x7F\x80-\x9F]*/).toLowerCase();
    }
    function finishToken(offset, type, errorMessage) {
        tokenType = type;
        tokenOffset = offset;
        tokenError = errorMessage;
        return type;
    }
    function scan() {
        var offset = stream.pos();
        var oldState = state;
        var token = internalScan();
        if (token !== TokenType.EOS && offset === stream.pos()) {
            console.log('Scanner.scan has not advanced at offset ' + offset + ', state before: ' + oldState + ' after: ' + state);
            stream.advance(1);
            return finishToken(offset, TokenType.Unknown);
        }
        return token;
    }
    function internalScan() {
        var offset = stream.pos();
        if (stream.eos()) {
            return finishToken(offset, TokenType.EOS);
        }
        var errorMessage;
        switch (state) {
            case ScannerState.WithinComment:
                if (stream.advanceIfChars([_MIN, _MIN, _RAN])) {
                    state = ScannerState.WithinContent;
                    return finishToken(offset, TokenType.EndCommentTag);
                }
                stream.advanceUntilChars([_MIN, _MIN, _RAN]); // -->
                return finishToken(offset, TokenType.Comment);
            case ScannerState.WithinDoctype:
                if (stream.advanceIfChar(_RAN)) {
                    state = ScannerState.WithinContent;
                    return finishToken(offset, TokenType.EndDoctypeTag);
                }
                stream.advanceUntilChar(_RAN); // >
                return finishToken(offset, TokenType.Doctype);
            case ScannerState.WithinContent:
                if (stream.advanceIfChar(_LAN)) {
                    if (!stream.eos() && stream.peekChar() === _BNG) {
                        if (stream.advanceIfChars([_BNG, _MIN, _MIN])) {
                            state = ScannerState.WithinComment;
                            return finishToken(offset, TokenType.StartCommentTag);
                        }
                        if (stream.advanceIfRegExp(/^!doctype/i)) {
                            state = ScannerState.WithinDoctype;
                            return finishToken(offset, TokenType.StartDoctypeTag);
                        }
                    }
                    if (stream.advanceIfChar(_FSL)) {
                        state = ScannerState.AfterOpeningEndTag;
                        return finishToken(offset, TokenType.EndTagOpen);
                    }
                    state = ScannerState.AfterOpeningStartTag;
                    return finishToken(offset, TokenType.StartTagOpen);
                }
                stream.advanceUntilChar(_LAN);
                return finishToken(offset, TokenType.Content);
            case ScannerState.AfterOpeningEndTag:
                var tagName = nextElementName();
                if (tagName.length > 0) {
                    state = ScannerState.WithinEndTag;
                    return finishToken(offset, TokenType.EndTag);
                }
                if (stream.skipWhitespace()) {
                    return finishToken(offset, TokenType.Whitespace, localize('error.unexpectedWhitespace', 'Tag name must directly follow the open bracket.'));
                }
                state = ScannerState.WithinEndTag;
                stream.advanceUntilChar(_RAN);
                if (offset < stream.pos()) {
                    return finishToken(offset, TokenType.Unknown, localize('error.endTagNameExpected', 'End tag name expected.'));
                }
                return internalScan();
            case ScannerState.WithinEndTag:
                if (stream.skipWhitespace()) {
                    return finishToken(offset, TokenType.Whitespace);
                }
                if (stream.advanceIfChar(_RAN)) {
                    state = ScannerState.WithinContent;
                    return finishToken(offset, TokenType.EndTagClose);
                }
                errorMessage = localize('error.tagNameExpected', 'Closing bracket expected.');
                break;
            case ScannerState.AfterOpeningStartTag:
                lastTag = nextElementName();
                lastTypeValue = void 0;
                lastAttributeName = void 0;
                if (lastTag.length > 0) {
                    hasSpaceAfterTag = false;
                    state = ScannerState.WithinTag;
                    return finishToken(offset, TokenType.StartTag);
                }
                if (stream.skipWhitespace()) {
                    return finishToken(offset, TokenType.Whitespace, localize('error.unexpectedWhitespace', 'Tag name must directly follow the open bracket.'));
                }
                state = ScannerState.WithinTag;
                stream.advanceUntilChar(_RAN);
                if (offset < stream.pos()) {
                    return finishToken(offset, TokenType.Unknown, localize('error.startTagNameExpected', 'Start tag name expected.'));
                }
                return internalScan();
            case ScannerState.WithinTag:
                if (stream.skipWhitespace()) {
                    hasSpaceAfterTag = true; // remember that we have seen a whitespace
                    return finishToken(offset, TokenType.Whitespace);
                }
                if (hasSpaceAfterTag) {
                    lastAttributeName = nextAttributeName();
                    if (lastAttributeName.length > 0) {
                        state = ScannerState.AfterAttributeName;
                        hasSpaceAfterTag = false;
                        return finishToken(offset, TokenType.AttributeName);
                    }
                }
                if (stream.advanceIfChars([_FSL, _RAN])) {
                    state = ScannerState.WithinContent;
                    return finishToken(offset, TokenType.StartTagSelfClose);
                }
                if (stream.advanceIfChar(_RAN)) {
                    if (lastTag === 'script') {
                        if (lastTypeValue && htmlScriptContents[lastTypeValue]) {
                            // stay in html
                            state = ScannerState.WithinContent;
                        } else {
                            state = ScannerState.WithinScriptContent;
                        }
                    } else if (lastTag === 'style') {
                        state = ScannerState.WithinStyleContent;
                    } else {
                        state = ScannerState.WithinContent;
                    }
                    return finishToken(offset, TokenType.StartTagClose);
                }
                stream.advance(1);
                return finishToken(offset, TokenType.Unknown, localize('error.unexpectedCharacterInTag', 'Unexpected character in tag.'));
            case ScannerState.AfterAttributeName:
                if (stream.skipWhitespace()) {
                    hasSpaceAfterTag = true;
                    return finishToken(offset, TokenType.Whitespace);
                }
                if (stream.advanceIfChar(_EQS)) {
                    state = ScannerState.BeforeAttributeValue;
                    return finishToken(offset, TokenType.DelimiterAssign);
                }
                state = ScannerState.WithinTag;
                return internalScan(); // no advance yet - jump to WithinTag
            case ScannerState.BeforeAttributeValue:
                if (stream.skipWhitespace()) {
                    return finishToken(offset, TokenType.Whitespace);
                }
                var attributeValue = stream.advanceIfRegExp(/^[^\s"'`=<>\/]+/);
                if (attributeValue.length > 0) {
                    if (lastAttributeName === 'type') {
                        lastTypeValue = attributeValue;
                    }
                    state = ScannerState.WithinTag;
                    hasSpaceAfterTag = false;
                    return finishToken(offset, TokenType.AttributeValue);
                }
                var ch = stream.peekChar();
                if (ch === _SQO || ch === _DQO) {
                    stream.advance(1); // consume quote
                    if (stream.advanceUntilChar(ch)) {
                        stream.advance(1); // consume quote
                    }
                    if (lastAttributeName === 'type') {
                        lastTypeValue = stream.getSource().substring(offset + 1, stream.pos() - 1);
                    }
                    state = ScannerState.WithinTag;
                    hasSpaceAfterTag = false;
                    return finishToken(offset, TokenType.AttributeValue);
                }
                state = ScannerState.WithinTag;
                hasSpaceAfterTag = false;
                return internalScan(); // no advance yet - jump to WithinTag
            case ScannerState.WithinScriptContent:
                // see http://stackoverflow.com/questions/14574471/how-do-browsers-parse-a-script-tag-exactly
                var sciptState = 1;
                while (!stream.eos()) {
                    var match = stream.advanceIfRegExp(/<!--|-->|<\/?script\s*\/?>?/i);
                    if (match.length === 0) {
                        stream.goToEnd();
                        return finishToken(offset, TokenType.Script);
                    } else if (match === '<!--') {
                        if (sciptState === 1) {
                            sciptState = 2;
                        }
                    } else if (match === '-->') {
                        sciptState = 1;
                    } else if (match[1] !== '/') {
                        if (sciptState === 2) {
                            sciptState = 3;
                        }
                    } else {
                        if (sciptState === 3) {
                            sciptState = 2;
                        } else {
                            stream.goBack(match.length); // to the beginning of the closing tag
                            break;
                        }
                    }
                }
                state = ScannerState.WithinContent;
                if (offset < stream.pos()) {
                    return finishToken(offset, TokenType.Script);
                }
                return internalScan(); // no advance yet - jump to content
            case ScannerState.WithinStyleContent:
                stream.advanceUntilRegExp(/<\/style/i);
                state = ScannerState.WithinContent;
                if (offset < stream.pos()) {
                    return finishToken(offset, TokenType.Styles);
                }
                return internalScan(); // no advance yet - jump to content
        }
        stream.advance(1);
        state = ScannerState.WithinContent;
        return finishToken(offset, TokenType.Unknown, errorMessage);
    }
    return {
        scan: scan,
        getTokenType: function getTokenType() {
            return tokenType;
        },
        getTokenOffset: function getTokenOffset() {
            return tokenOffset;
        },
        getTokenLength: function getTokenLength() {
            return stream.pos() - tokenOffset;
        },
        getTokenEnd: function getTokenEnd() {
            return stream.pos();
        },
        getTokenText: function getTokenText() {
            return stream.getSource().substring(tokenOffset, stream.pos());
        },
        getScannerState: function getScannerState() {
            return state;
        },
        getTokenError: function getTokenError() {
            return tokenError;
        }
    };
}
//# sourceMappingURL=htmlScanner.js.map

/***/ }),
/* 41 */,
/* 42 */,
/* 43 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.startsWith = startsWith;
exports.endsWith = endsWith;
exports.commonPrefixLength = commonPrefixLength;
exports.repeat = repeat;
exports.isLetterOrDigit = isLetterOrDigit;
function startsWith(haystack, needle) {
    if (haystack.length < needle.length) {
        return false;
    }
    for (var i = 0; i < needle.length; i++) {
        if (haystack[i] !== needle[i]) {
            return false;
        }
    }
    return true;
}
/**
 * Determines if haystack ends with needle.
 */
function endsWith(haystack, needle) {
    var diff = haystack.length - needle.length;
    if (diff > 0) {
        return haystack.lastIndexOf(needle) === diff;
    } else if (diff === 0) {
        return haystack === needle;
    } else {
        return false;
    }
}
/**
 * @returns the length of the common prefix of the two strings.
 */
function commonPrefixLength(a, b) {
    var i,
        len = Math.min(a.length, b.length);
    for (i = 0; i < len; i++) {
        if (a.charCodeAt(i) !== b.charCodeAt(i)) {
            return i;
        }
    }
    return len;
}
function repeat(value, count) {
    var s = '';
    while (count > 0) {
        if ((count & 1) === 1) {
            s += value;
        }
        value += value;
        count = count >>> 1;
    }
    return s;
}
var _a = 'a'.charCodeAt(0);
var _z = 'z'.charCodeAt(0);
var _A = 'A'.charCodeAt(0);
var _Z = 'Z'.charCodeAt(0);
var _0 = '0'.charCodeAt(0);
var _9 = '9'.charCodeAt(0);
function isLetterOrDigit(text, index) {
    var c = text.charCodeAt(index);
    return _a <= c && c <= _z || _A <= c && c <= _Z || _0 <= c && c <= _9;
}
//# sourceMappingURL=strings.js.map

/***/ }),
/* 44 */,
/* 45 */,
/* 46 */,
/* 47 */,
/* 48 */,
/* 49 */,
/* 50 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.IONIC_TAGS = exports.HTML_TAGS = exports.HTMLTagSpecification = exports.EMPTY_ELEMENTS = undefined;
exports.isEmptyElement = isEmptyElement;
exports.getHTML5TagProvider = getHTML5TagProvider;
exports.getAngularTagProvider = getAngularTagProvider;
exports.getIonicTagProvider = getIonicTagProvider;

var _strings = __webpack_require__(43);

var strings = _interopRequireWildcard(_strings);

var _arrays = __webpack_require__(59);

var arrays = _interopRequireWildcard(_arrays);

var _vscodeNls = __webpack_require__(51);

var nls = _interopRequireWildcard(_vscodeNls);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

var localize = nls.loadMessageBundle(); /*---------------------------------------------------------------------------------------------
                                         *  Copyright (c) Microsoft Corporation. All rights reserved.
                                         *  Licensed under the MIT License. See License.txt in the project root for license information.
                                         *--------------------------------------------------------------------------------------------*/
/*!
BEGIN THIRD PARTY
*/
/*--------------------------------------------------------------------------------------------
 *  This file is based on or incorporates material from the projects listed below (Third Party IP).
 *  The original copyright notice and the license under which Microsoft received such Third Party IP,
 *  are set forth below. Such licenses and notices are provided for informational purposes only.
 *  Microsoft licenses the Third Party IP to you under the licensing terms for the Microsoft product.
 *  Microsoft reserves all other rights not expressly granted under this agreement, whether by implication,
 *  estoppel or otherwise.
 *--------------------------------------------------------------------------------------------*/
/*---------------------------------------------------------------------------------------------
 *  Copyright © 2015 W3C® (MIT, ERCIM, Keio, Beihang). This software or document includes includes material copied
 *  from or derived from HTML 5.1 W3C Working Draft (http://www.w3.org/TR/2015/WD-html51-20151008/.)"
 *--------------------------------------------------------------------------------------------*/
/*---------------------------------------------------------------------------------------------
 *  Ionic Main Site (https://github.com/driftyco/ionic-site).
 *  Copyright Drifty Co. http://drifty.com/.
 *
 *  Licensed under the Apache License, Version 2.0 (the "License"); you may not use this file
 *  except in compliance with the License. You may obtain a copy of the License at
 *  http://www.apache.org/licenses/LICENSE-2.0
 *
 *  THIS CODE IS PROVIDED ON AN *AS IS* BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 *  KIND, EITHER EXPRESS OR IMPLIED, INCLUDING WITHOUT LIMITATION ANY IMPLIED
 *  WARRANTIES OR CONDITIONS OF TITLE, FITNESS FOR A PARTICULAR PURPOSE,
 *  MERCHANTABLITY OR NON-INFRINGEMENT.
 *
 *  See the Apache Version 2.0 License for specific language governing permissions
 *  and limitations under the License.
 *--------------------------------------------------------------------------------------------*/
var EMPTY_ELEMENTS = exports.EMPTY_ELEMENTS = ['area', 'base', 'br', 'col', 'embed', 'hr', 'img', 'input', 'keygen', 'link', 'menuitem', 'meta', 'param', 'source', 'track', 'wbr'];
function isEmptyElement(e) {
    return !!e && arrays.binarySearch(EMPTY_ELEMENTS, e.toLowerCase(), function (s1, s2) {
        return s1.localeCompare(s2);
    }) >= 0;
}
var HTMLTagSpecification = /** @class */function () {
    function HTMLTagSpecification(label, attributes) {
        if (attributes === void 0) {
            attributes = [];
        }
        this.label = label;
        this.attributes = attributes;
    }
    return HTMLTagSpecification;
}();
exports.HTMLTagSpecification = HTMLTagSpecification;
// HTML tag information sourced from http://www.w3.org/TR/2015/WD-html51-20151008/

var HTML_TAGS = exports.HTML_TAGS = {
    // The root element
    html: new HTMLTagSpecification(localize('tags.html', 'The html element represents the root of an HTML document.'), ['manifest']),
    // Document metadata
    head: new HTMLTagSpecification(localize('tags.head', 'The head element represents a collection of metadata for the Document.')),
    title: new HTMLTagSpecification(localize('tags.title', 'The title element represents the document\'s title or name. Authors should use titles that identify their documents even when they are used out of context, for example in a user\'s history or bookmarks, or in search results. The document\'s title is often different from its first heading, since the first heading does not have to stand alone when taken out of context.')),
    base: new HTMLTagSpecification(localize('tags.base', 'The base element allows authors to specify the document base URL for the purposes of resolving relative URLs, and the name of the default browsing context for the purposes of following hyperlinks. The element does not represent any content beyond this information.'), ['href', 'target']),
    link: new HTMLTagSpecification(localize('tags.link', 'The link element allows authors to link their document to other resources.'), ['href', 'crossorigin:xo', 'rel', 'media', 'hreflang', 'type', 'sizes']),
    meta: new HTMLTagSpecification(localize('tags.meta', 'The meta element represents various kinds of metadata that cannot be expressed using the title, base, link, style, and script elements.'), ['name', 'http-equiv', 'content', 'charset']),
    style: new HTMLTagSpecification(localize('tags.style', 'The style element allows authors to embed style information in their documents. The style element is one of several inputs to the styling processing model. The element does not represent content for the user.'), ['media', 'nonce', 'type', 'scoped:v']),
    // Sections
    body: new HTMLTagSpecification(localize('tags.body', 'The body element represents the content of the document.'), ['onafterprint', 'onbeforeprint', 'onbeforeunload', 'onhashchange', 'onlanguagechange', 'onmessage', 'onoffline', 'ononline', 'onpagehide', 'onpageshow', 'onpopstate', 'onstorage', 'onunload']),
    article: new HTMLTagSpecification(localize('tags.article', 'The article element represents a complete, or self-contained, composition in a document, page, application, or site and that is, in principle, independently distributable or reusable, e.g. in syndication. This could be a forum post, a magazine or newspaper article, a blog entry, a user-submitted comment, an interactive widget or gadget, or any other independent item of content. Each article should be identified, typically by including a heading (h1–h6 element) as a child of the article element.')),
    section: new HTMLTagSpecification(localize('tags.section', 'The section element represents a generic section of a document or application. A section, in this context, is a thematic grouping of content. Each section should be identified, typically by including a heading ( h1- h6 element) as a child of the section element.')),
    nav: new HTMLTagSpecification(localize('tags.nav', 'The nav element represents a section of a page that links to other pages or to parts within the page: a section with navigation links.')),
    aside: new HTMLTagSpecification(localize('tags.aside', 'The aside element represents a section of a page that consists of content that is tangentially related to the content around the aside element, and which could be considered separate from that content. Such sections are often represented as sidebars in printed typography.')),
    h1: new HTMLTagSpecification(localize('tags.h1', 'The h1 element represents a section heading.')),
    h2: new HTMLTagSpecification(localize('tags.h2', 'The h2 element represents a section heading.')),
    h3: new HTMLTagSpecification(localize('tags.h3', 'The h3 element represents a section heading.')),
    h4: new HTMLTagSpecification(localize('tags.h4', 'The h4 element represents a section heading.')),
    h5: new HTMLTagSpecification(localize('tags.h5', 'The h5 element represents a section heading.')),
    h6: new HTMLTagSpecification(localize('tags.h6', 'The h6 element represents a section heading.')),
    header: new HTMLTagSpecification(localize('tags.header', 'The header element represents introductory content for its nearest ancestor sectioning content or sectioning root element. A header typically contains a group of introductory or navigational aids. When the nearest ancestor sectioning content or sectioning root element is the body element, then it applies to the whole page.')),
    footer: new HTMLTagSpecification(localize('tags.footer', 'The footer element represents a footer for its nearest ancestor sectioning content or sectioning root element. A footer typically contains information about its section such as who wrote it, links to related documents, copyright data, and the like.')),
    address: new HTMLTagSpecification(localize('tags.address', 'The address element represents the contact information for its nearest article or body element ancestor. If that is the body element, then the contact information applies to the document as a whole.')),
    // Grouping content
    p: new HTMLTagSpecification(localize('tags.p', 'The p element represents a paragraph.')),
    hr: new HTMLTagSpecification(localize('tags.hr', 'The hr element represents a paragraph-level thematic break, e.g. a scene change in a story, or a transition to another topic within a section of a reference book.')),
    pre: new HTMLTagSpecification(localize('tags.pre', 'The pre element represents a block of preformatted text, in which structure is represented by typographic conventions rather than by elements.')),
    blockquote: new HTMLTagSpecification(localize('tags.blockquote', 'The blockquote element represents content that is quoted from another source, optionally with a citation which must be within a footer or cite element, and optionally with in-line changes such as annotations and abbreviations.'), ['cite']),
    ol: new HTMLTagSpecification(localize('tags.ol', 'The ol element represents a list of items, where the items have been intentionally ordered, such that changing the order would change the meaning of the document.'), ['reversed:v', 'start', 'type:lt']),
    ul: new HTMLTagSpecification(localize('tags.ul', 'The ul element represents a list of items, where the order of the items is not important — that is, where changing the order would not materially change the meaning of the document.')),
    li: new HTMLTagSpecification(localize('tags.li', 'The li element represents a list item. If its parent element is an ol, ul, or menu element, then the element is an item of the parent element\'s list, as defined for those elements. Otherwise, the list item has no defined list-related relationship to any other li element.'), ['value']),
    dl: new HTMLTagSpecification(localize('tags.dl', 'The dl element represents an association list consisting of zero or more name-value groups (a description list). A name-value group consists of one or more names (dt elements) followed by one or more values (dd elements), ignoring any nodes other than dt and dd elements. Within a single dl element, there should not be more than one dt element for each name.')),
    dt: new HTMLTagSpecification(localize('tags.dt', 'The dt element represents the term, or name, part of a term-description group in a description list (dl element).')),
    dd: new HTMLTagSpecification(localize('tags.dd', 'The dd element represents the description, definition, or value, part of a term-description group in a description list (dl element).')),
    figure: new HTMLTagSpecification(localize('tags.figure', 'The figure element represents some flow content, optionally with a caption, that is self-contained (like a complete sentence) and is typically referenced as a single unit from the main flow of the document.')),
    figcaption: new HTMLTagSpecification(localize('tags.figcaption', 'The figcaption element represents a caption or legend for the rest of the contents of the figcaption element\'s parent figure element, if any.')),
    main: new HTMLTagSpecification(localize('tags.main', 'The main element represents the main content of the body of a document or application. The main content area consists of content that is directly related to or expands upon the central topic of a document or central functionality of an application.')),
    div: new HTMLTagSpecification(localize('tags.div', 'The div element has no special meaning at all. It represents its children. It can be used with the class, lang, and title attributes to mark up semantics common to a group of consecutive elements.')),
    // Text-level semantics
    a: new HTMLTagSpecification(localize('tags.a', 'If the a element has an href attribute, then it represents a hyperlink (a hypertext anchor) labeled by its contents.'), ['href', 'target', 'download', 'ping', 'rel', 'hreflang', 'type']),
    em: new HTMLTagSpecification(localize('tags.em', 'The em element represents stress emphasis of its contents.')),
    strong: new HTMLTagSpecification(localize('tags.strong', 'The strong element represents strong importance, seriousness, or urgency for its contents.')),
    small: new HTMLTagSpecification(localize('tags.small', 'The small element represents side comments such as small print.')),
    s: new HTMLTagSpecification(localize('tags.s', 'The s element represents contents that are no longer accurate or no longer relevant.')),
    cite: new HTMLTagSpecification(localize('tags.cite', 'The cite element represents a reference to a creative work. It must include the title of the work or the name of the author(person, people or organization) or an URL reference, or a reference in abbreviated form as per the conventions used for the addition of citation metadata.')),
    q: new HTMLTagSpecification(localize('tags.q', 'The q element represents some phrasing content quoted from another source.'), ['cite']),
    dfn: new HTMLTagSpecification(localize('tags.dfn', 'The dfn element represents the defining instance of a term. The paragraph, description list group, or section that is the nearest ancestor of the dfn element must also contain the definition(s) for the term given by the dfn element.')),
    abbr: new HTMLTagSpecification(localize('tags.abbr', 'The abbr element represents an abbreviation or acronym, optionally with its expansion. The title attribute may be used to provide an expansion of the abbreviation. The attribute, if specified, must contain an expansion of the abbreviation, and nothing else.')),
    ruby: new HTMLTagSpecification(localize('tags.ruby', 'The ruby element allows one or more spans of phrasing content to be marked with ruby annotations. Ruby annotations are short runs of text presented alongside base text, primarily used in East Asian typography as a guide for pronunciation or to include other annotations. In Japanese, this form of typography is also known as furigana. Ruby text can appear on either side, and sometimes both sides, of the base text, and it is possible to control its position using CSS. A more complete introduction to ruby can be found in the Use Cases & Exploratory Approaches for Ruby Markup document as well as in CSS Ruby Module Level 1. [RUBY-UC] [CSSRUBY]')),
    rb: new HTMLTagSpecification(localize('tags.rb', 'The rb element marks the base text component of a ruby annotation. When it is the child of a ruby element, it doesn\'t represent anything itself, but its parent ruby element uses it as part of determining what it represents.')),
    rt: new HTMLTagSpecification(localize('tags.rt', 'The rt element marks the ruby text component of a ruby annotation. When it is the child of a ruby element or of an rtc element that is itself the child of a ruby element, it doesn\'t represent anything itself, but its ancestor ruby element uses it as part of determining what it represents.')),
    // <rtc> is not yet supported by 2+ browsers
    //rtc: new HTMLTagSpecification(
    //	localize('tags.rtc', 'The rtc element marks a ruby text container for ruby text components in a ruby annotation. When it is the child of a ruby element it doesn\'t represent anything itself, but its parent ruby element uses it as part of determining what it represents.')),
    rp: new HTMLTagSpecification(localize('tags.rp', 'The rp element is used to provide fallback text to be shown by user agents that don\'t support ruby annotations. One widespread convention is to provide parentheses around the ruby text component of a ruby annotation.')),
    // <data> is not yet supported by 2+ browsers
    //data: new HTMLTagSpecification(
    //	localize('tags.data', 'The data element represents its contents, along with a machine-readable form of those contents in the value attribute.')),
    time: new HTMLTagSpecification(localize('tags.time', 'The time element represents its contents, along with a machine-readable form of those contents in the datetime attribute. The kind of content is limited to various kinds of dates, times, time-zone offsets, and durations, as described below.'), ['datetime']),
    code: new HTMLTagSpecification(localize('tags.code', 'The code element represents a fragment of computer code. This could be an XML element name, a file name, a computer program, or any other string that a computer would recognize.')),
    var: new HTMLTagSpecification(localize('tags.var', 'The var element represents a variable. This could be an actual variable in a mathematical expression or programming context, an identifier representing a constant, a symbol identifying a physical quantity, a function parameter, or just be a term used as a placeholder in prose.')),
    samp: new HTMLTagSpecification(localize('tags.samp', 'The samp element represents sample or quoted output from another program or computing system.')),
    kbd: new HTMLTagSpecification(localize('tags.kbd', 'The kbd element represents user input (typically keyboard input, although it may also be used to represent other input, such as voice commands).')),
    sub: new HTMLTagSpecification(localize('tags.sub', 'The sub element represents a subscript.')),
    sup: new HTMLTagSpecification(localize('tags.sup', 'The sup element represents a superscript.')),
    i: new HTMLTagSpecification(localize('tags.i', 'The i element represents a span of text in an alternate voice or mood, or otherwise offset from the normal prose in a manner indicating a different quality of text, such as a taxonomic designation, a technical term, an idiomatic phrase from another language, transliteration, a thought, or a ship name in Western texts.')),
    b: new HTMLTagSpecification(localize('tags.b', 'The b element represents a span of text to which attention is being drawn for utilitarian purposes without conveying any extra importance and with no implication of an alternate voice or mood, such as key words in a document abstract, product names in a review, actionable words in interactive text-driven software, or an article lede.')),
    u: new HTMLTagSpecification(localize('tags.u', 'The u element represents a span of text with an unarticulated, though explicitly rendered, non-textual annotation, such as labeling the text as being a proper name in Chinese text (a Chinese proper name mark), or labeling the text as being misspelt.')),
    mark: new HTMLTagSpecification(localize('tags.mark', 'The mark element represents a run of text in one document marked or highlighted for reference purposes, due to its relevance in another context. When used in a quotation or other block of text referred to from the prose, it indicates a highlight that was not originally present but which has been added to bring the reader\'s attention to a part of the text that might not have been considered important by the original author when the block was originally written, but which is now under previously unexpected scrutiny. When used in the main prose of a document, it indicates a part of the document that has been highlighted due to its likely relevance to the user\'s current activity.')),
    bdi: new HTMLTagSpecification(localize('tags.bdi', 'The bdi element represents a span of text that is to be isolated from its surroundings for the purposes of bidirectional text formatting. [BIDI]')),
    bdo: new HTMLTagSpecification(localize('tags.dbo', 'The bdo element represents explicit text directionality formatting control for its children. It allows authors to override the Unicode bidirectional algorithm by explicitly specifying a direction override. [BIDI]')),
    span: new HTMLTagSpecification(localize('tags.span', 'The span element doesn\'t mean anything on its own, but can be useful when used together with the global attributes, e.g. class, lang, or dir. It represents its children.')),
    br: new HTMLTagSpecification(localize('tags.br', 'The br element represents a line break.')),
    wbr: new HTMLTagSpecification(localize('tags.wbr', 'The wbr element represents a line break opportunity.')),
    // Edits
    ins: new HTMLTagSpecification(localize('tags.ins', 'The ins element represents an addition to the document.')),
    del: new HTMLTagSpecification(localize('tags.del', 'The del element represents a removal from the document.'), ['cite', 'datetime']),
    // Embedded content
    picture: new HTMLTagSpecification(localize('tags.picture', 'The picture element is a container which provides multiple sources to its contained img element to allow authors to declaratively control or give hints to the user agent about which image resource to use, based on the screen pixel density, viewport size, image format, and other factors. It represents its children.')),
    img: new HTMLTagSpecification(localize('tags.img', 'An img element represents an image.'), ['alt', 'src', 'srcset', 'crossorigin:xo', 'usemap', 'ismap:v', 'width', 'height']),
    iframe: new HTMLTagSpecification(localize('tags.iframe', 'The iframe element represents a nested browsing context.'), ['src', 'srcdoc', 'name', 'sandbox:sb', 'seamless:v', 'allowfullscreen:v', 'width', 'height']),
    embed: new HTMLTagSpecification(localize('tags.embed', 'The embed element provides an integration point for an external (typically non-HTML) application or interactive content.'), ['src', 'type', 'width', 'height']),
    object: new HTMLTagSpecification(localize('tags.object', 'The object element can represent an external resource, which, depending on the type of the resource, will either be treated as an image, as a nested browsing context, or as an external resource to be processed by a plugin.'), ['data', 'type', 'typemustmatch:v', 'name', 'usemap', 'form', 'width', 'height']),
    param: new HTMLTagSpecification(localize('tags.param', 'The param element defines parameters for plugins invoked by object elements. It does not represent anything on its own.'), ['name', 'value']),
    video: new HTMLTagSpecification(localize('tags.video', 'A video element is used for playing videos or movies, and audio files with captions.'), ['src', 'crossorigin:xo', 'poster', 'preload:pl', 'autoplay:v', 'mediagroup', 'loop:v', 'muted:v', 'controls:v', 'width', 'height']),
    audio: new HTMLTagSpecification(localize('tags.audio', 'An audio element represents a sound or audio stream.'), ['src', 'crossorigin:xo', 'preload:pl', 'autoplay:v', 'mediagroup', 'loop:v', 'muted:v', 'controls:v']),
    source: new HTMLTagSpecification(localize('tags.source', 'The source element allows authors to specify multiple alternative media resources for media elements. It does not represent anything on its own.'),
    // 'When the source element has a parent that is a picture element, the source element allows authors to specify multiple alternative source sets for img elements.'
    ['src', 'type']),
    track: new HTMLTagSpecification(localize('tags.track', 'The track element allows authors to specify explicit external timed text tracks for media elements. It does not represent anything on its own.'), ['default:v', 'kind:tk', 'label', 'src', 'srclang']),
    map: new HTMLTagSpecification(localize('tags.map', 'The map element, in conjunction with an img element and any area element descendants, defines an image map. The element represents its children.'), ['name']),
    area: new HTMLTagSpecification(localize('tags.area', 'The area element represents either a hyperlink with some text and a corresponding area on an image map, or a dead area on an image map.'), ['alt', 'coords', 'shape:sh', 'href', 'target', 'download', 'ping', 'rel', 'hreflang', 'type']),
    // Tabular data
    table: new HTMLTagSpecification(localize('tags.table', 'The table element represents data with more than one dimension, in the form of a table.'), ['sortable:v', 'border']),
    caption: new HTMLTagSpecification(localize('tags.caption', 'The caption element represents the title of the table that is its parent, if it has a parent and that is a table element.')),
    colgroup: new HTMLTagSpecification(localize('tags.colgroup', 'The colgroup element represents a group of one or more columns in the table that is its parent, if it has a parent and that is a table element.'), ['span']),
    col: new HTMLTagSpecification(localize('tags.col', 'If a col element has a parent and that is a colgroup element that itself has a parent that is a table element, then the col element represents one or more columns in the column group represented by that colgroup.'), ['span']),
    tbody: new HTMLTagSpecification(localize('tags.tbody', 'The tbody element represents a block of rows that consist of a body of data for the parent table element, if the tbody element has a parent and it is a table.')),
    thead: new HTMLTagSpecification(localize('tags.thead', 'The thead element represents the block of rows that consist of the column labels (headers) for the parent table element, if the thead element has a parent and it is a table.')),
    tfoot: new HTMLTagSpecification(localize('tags.tfoot', 'The tfoot element represents the block of rows that consist of the column summaries (footers) for the parent table element, if the tfoot element has a parent and it is a table.')),
    tr: new HTMLTagSpecification(localize('tags.tr', 'The tr element represents a row of cells in a table.')),
    td: new HTMLTagSpecification(localize('tags.td', 'The td element represents a data cell in a table.'), ['colspan', 'rowspan', 'headers']),
    th: new HTMLTagSpecification(localize('tags.th', 'The th element represents a header cell in a table.'), ['colspan', 'rowspan', 'headers', 'scope:s', 'sorted', 'abbr']),
    // Forms
    form: new HTMLTagSpecification(localize('tags.form', 'The form element represents a collection of form-associated elements, some of which can represent editable values that can be submitted to a server for processing.'), ['accept-charset', 'action', 'autocomplete:o', 'enctype:et', 'method:m', 'name', 'novalidate:v', 'target']),
    label: new HTMLTagSpecification(localize('tags.label', 'The label element represents a caption in a user interface. The caption can be associated with a specific form control, known as the label element\'s labeled control, either using the for attribute, or by putting the form control inside the label element itself.'), ['form', 'for']),
    input: new HTMLTagSpecification(localize('tags.input', 'The input element represents a typed data field, usually with a form control to allow the user to edit the data.'), ['accept', 'alt', 'autocomplete:inputautocomplete', 'autofocus:v', 'checked:v', 'dirname', 'disabled:v', 'form', 'formaction', 'formenctype:et', 'formmethod:fm', 'formnovalidate:v', 'formtarget', 'height', 'inputmode:im', 'list', 'max', 'maxlength', 'min', 'minlength', 'multiple:v', 'name', 'pattern', 'placeholder', 'readonly:v', 'required:v', 'size', 'src', 'step', 'type:t', 'value', 'width']),
    button: new HTMLTagSpecification(localize('tags.button', 'The button element represents a button labeled by its contents.'), ['autofocus:v', 'disabled:v', 'form', 'formaction', 'formenctype:et', 'formmethod:fm', 'formnovalidate:v', 'formtarget', 'name', 'type:bt', 'value']),
    select: new HTMLTagSpecification(localize('tags.select', 'The select element represents a control for selecting amongst a set of options.'), ['autocomplete:inputautocomplete', 'autofocus:v', 'disabled:v', 'form', 'multiple:v', 'name', 'required:v', 'size']),
    datalist: new HTMLTagSpecification(localize('tags.datalist', 'The datalist element represents a set of option elements that represent predefined options for other controls. In the rendering, the datalist element represents nothing and it, along with its children, should be hidden.')),
    optgroup: new HTMLTagSpecification(localize('tags.optgroup', 'The optgroup element represents a group of option elements with a common label.'), ['disabled:v', 'label']),
    option: new HTMLTagSpecification(localize('tags.option', 'The option element represents an option in a select element or as part of a list of suggestions in a datalist element.'), ['disabled:v', 'label', 'selected:v', 'value']),
    textarea: new HTMLTagSpecification(localize('tags.textarea', 'The textarea element represents a multiline plain text edit control for the element\'s raw value. The contents of the control represent the control\'s default value.'), ['autocomplete:inputautocomplete', 'autofocus:v', 'cols', 'dirname', 'disabled:v', 'form', 'inputmode:im', 'maxlength', 'minlength', 'name', 'placeholder', 'readonly:v', 'required:v', 'rows', 'wrap:w']),
    output: new HTMLTagSpecification(localize('tags.output', 'The output element represents the result of a calculation performed by the application, or the result of a user action.'), ['for', 'form', 'name']),
    progress: new HTMLTagSpecification(localize('tags.progress', 'The progress element represents the completion progress of a task. The progress is either indeterminate, indicating that progress is being made but that it is not clear how much more work remains to be done before the task is complete (e.g. because the task is waiting for a remote host to respond), or the progress is a number in the range zero to a maximum, giving the fraction of work that has so far been completed.'), ['value', 'max']),
    meter: new HTMLTagSpecification(localize('tags.meter', 'The meter element represents a scalar measurement within a known range, or a fractional value; for example disk usage, the relevance of a query result, or the fraction of a voting population to have selected a particular candidate.'), ['value', 'min', 'max', 'low', 'high', 'optimum']),
    fieldset: new HTMLTagSpecification(localize('tags.fieldset', 'The fieldset element represents a set of form controls optionally grouped under a common name.'), ['disabled:v', 'form', 'name']),
    legend: new HTMLTagSpecification(localize('tags.legend', 'The legend element represents a caption for the rest of the contents of the legend element\'s parent fieldset element, if any.')),
    // Interactive elements
    details: new HTMLTagSpecification(localize('tags.details', 'The details element represents a disclosure widget from which the user can obtain additional information or controls.'), ['open:v']),
    summary: new HTMLTagSpecification(localize('tags.summary', 'The summary element represents a summary, caption, or legend for the rest of the contents of the summary element\'s parent details element, if any.')),
    // <menu> and <menuitem> are not yet supported by 2+ browsers
    //menu: new HTMLTagSpecification(
    //	localize('tags.menu', 'The menu element represents a list of commands.'),
    //	['type:mt', 'label']),
    //menuitem: new HTMLTagSpecification(
    //	localize('tags.menuitem', 'The menuitem element represents a command that the user can invoke from a popup menu (either a context menu or the menu of a menu button).')),
    dialog: new HTMLTagSpecification(localize('tags.dialog', 'The dialog element represents a part of an application that a user interacts with to perform a task, for example a dialog box, inspector, or window.')),
    // Scripting
    script: new HTMLTagSpecification(localize('tags.script', 'The script element allows authors to include dynamic script and data blocks in their documents. The element does not represent content for the user.'), ['src', 'type', 'charset', 'async:v', 'defer:v', 'crossorigin:xo', 'nonce']),
    noscript: new HTMLTagSpecification(localize('tags.noscript', 'The noscript element represents nothing if scripting is enabled, and represents its children if scripting is disabled. It is used to present different markup to user agents that support scripting and those that don\'t support scripting, by affecting how the document is parsed.')),
    template: new HTMLTagSpecification(localize('tags.template', 'The template element is used to declare fragments of HTML that can be cloned and inserted in the document by script.')),
    canvas: new HTMLTagSpecification(localize('tags.canvas', 'The canvas element provides scripts with a resolution-dependent bitmap canvas, which can be used for rendering graphs, game graphics, art, or other visual images on the fly.'), ['width', 'height'])
};
// Ionic tag information sourced from Ionic main website (https://github.com/driftyco/ionic-site)
var IONIC_TAGS = exports.IONIC_TAGS = {
    'ion-checkbox': new HTMLTagSpecification(localize('tags.ion.checkbox', 'The checkbox is no different than the HTML checkbox input, except it\'s styled differently. The checkbox behaves like any AngularJS checkbox.'), ['name', 'ng-false-value', 'ng-model', 'ng-true-value']),
    'ion-content': new HTMLTagSpecification(localize('tags.ion.content', 'The ionContent directive provides an easy to use content area that can be configured to use Ionic\'s custom Scroll View, or the built-in overflow scrolling of the browser.'), ['delegate-handle', 'direction:scrolldir', 'has-bouncing:b', 'locking:b', 'on-scroll', 'on-scroll-complete', 'overflow-scroll:b', 'padding:b', 'scroll:b', 'scrollbar-x:b', 'scrollbar-y:b', 'start-x', 'start-y']),
    'ion-delete-button': new HTMLTagSpecification(localize('tags.ion.deletebutton', 'Child of ionItem'), []),
    'ion-footer-bar': new HTMLTagSpecification(localize('tags.ion.footerbar', 'Adds a fixed footer bar below some content. Can also be a subfooter (higher up) if the "bar-subfooter" class is applied.'), ['align-title:align', 'keyboard-attach:v']),
    'ion-header-bar': new HTMLTagSpecification(localize('tags.ion.headerbar', 'Adds a fixed header bar above some content. Can also be a subheader (lower down) if the "bar-subheader" class is applied.'), ['align-title:align', 'no-tap-scroll:b']),
    'ion-infinite-scroll': new HTMLTagSpecification(localize('tags.ion.infinitescroll', 'Child of ionContent or ionScroll. The ionInfiniteScroll directive allows you to call a function whenever the user gets to the bottom of the page or near the bottom of the page.'), ['distance', 'icon', 'immediate-check:b', 'on-infinite', 'spinner']),
    'ion-input': new HTMLTagSpecification(localize('tags.ion.input', 'ionInput is meant for text type inputs only. Ionic uses an actual <input type="text"> HTML element within the component, with Ionic wrapping to better handle the user experience and interactivity.'), ['type:inputtype', 'clearInput:v']),
    'ion-item': new HTMLTagSpecification(localize('tags.ion.item', 'Child of ionList.'), []),
    'ion-list': new HTMLTagSpecification(localize('tags.ion.list', 'The List is a widely used interface element in almost any mobile app, and can include content ranging from basic text all the way to buttons, toggles, icons, and thumbnails.'), ['can-swipe:b', 'delegate-handle', 'show-delete:b', 'show-reorder:b', 'type:listtype']),
    'ion-modal-view': new HTMLTagSpecification(localize('tags.ion.modalview', 'The Modal is a content pane that can go over the user\'s main view temporarily. Usually used for making a choice or editing an item.'), []),
    'ion-nav-back-button': new HTMLTagSpecification(localize('tags.ion.navbackbutton', 'Child of ionNavBar. Creates a back button inside an ionNavBar. The back button will appear when the user is able to go back in the current navigation stack.'), []),
    'ion-nav-bar': new HTMLTagSpecification(localize('tags.ion.navbar', 'If you have an ionNavView directive, you can also create an <ion-nav-bar>, which will create a topbar that updates as the application state changes.'), ['align-title:align', 'delegate-handle', 'no-tap-scroll:b']),
    'ion-nav-buttons': new HTMLTagSpecification(localize('tags.ion.navbuttons', 'Child of ionNavView. Use ionNavButtons to set the buttons on your ionNavBar from within an ionView.'), ['side:navsides']),
    'ion-nav-title': new HTMLTagSpecification(localize('tags.ion.navtitle', 'Child of ionNavView. The ionNavTitle directive replaces an ionNavBar title text with custom HTML from within an ionView template.'), []),
    'ion-nav-view': new HTMLTagSpecification(localize('tags.ion.navview', 'The ionNavView directive is used to render templates in your application. Each template is part of a state. States are usually mapped to a url, and are defined programatically using angular-ui-router.'), ['name']),
    'ion-option-button': new HTMLTagSpecification(localize('tags.ion.optionbutton', 'Child of ionItem. Creates an option button inside a list item, that is visible when the item is swiped to the left by the user.'), []),
    'ion-pane': new HTMLTagSpecification(localize('tags.ion.pane', 'A simple container that fits content, with no side effects. Adds the "pane" class to the element.'), []),
    'ion-popover-view': new HTMLTagSpecification(localize('tags.ion.popoverview', 'The Popover is a view that floats above an app\'s content. Popovers provide an easy way to present or gather information from the user.'), []),
    'ion-radio': new HTMLTagSpecification(localize('tags.ion.radio', 'The radio ionRirective is no different than the HTML radio input, except it\'s styled differently. The ionRadio behaves like AngularJS radio input.'), ['disabled:b', 'icon', 'name', 'ng-disabled:b', 'ng-model', 'ng-value', 'value']),
    'ion-refresher': new HTMLTagSpecification(localize('tags.ion.refresher', 'Child of ionContent or ionScroll. Allows you to add pull-to-refresh to a scrollView. Place it as the first child of your ionContent or ionScroll element.'), ['disable-pulling-rotation:b', 'on-pulling', 'on-refresh', 'pulling-icon', 'pulling-text', 'refreshing-icon', 'spinner']),
    'ion-reorder-button': new HTMLTagSpecification(localize('tags.ion.reorderbutton', 'Child of ionItem.'), ['on-reorder']),
    'ion-scroll': new HTMLTagSpecification(localize('tags.ion.scroll', 'Creates a scrollable container for all content inside.'), ['delegate-handle', 'direction:scrolldir', 'has-bouncing:b', 'locking:b', 'max-zoom', 'min-zoom', 'on-refresh', 'on-scroll', 'paging:b', 'scrollbar-x:b', 'scrollbar-y:b', 'zooming:b']),
    'ion-side-menu': new HTMLTagSpecification(localize('tags.ion.sidemenu', 'Child of ionSideMenus. A container for a side menu, sibling to an ionSideMenuContent directive.'), ['is-enabled:b', 'expose-aside-when', 'side:navsides', 'width']),
    'ion-side-menu-content': new HTMLTagSpecification(localize('tags.ion.sidemenucontent', 'Child of ionSideMenus. A container for the main visible content, sibling to one or more ionSideMenu directives.'), ['drag-content:b', 'edge-drag-threshold']),
    'ion-side-menus': new HTMLTagSpecification(localize('tags.ion.sidemenus', 'A container element for side menu(s) and the main content. Allows the left and/or right side menu to be toggled by dragging the main content area side to side.'), ['delegate-handle', 'enable-menu-with-back-views:b']),
    'ion-slide': new HTMLTagSpecification(localize('tags.ion.slide', 'Child of ionSlideBox. Displays a slide inside of a slidebox.'), []),
    'ion-slide-box': new HTMLTagSpecification(localize('tags.ion.slidebox', 'The Slide Box is a multi-page container where each page can be swiped or dragged between.'), ['active-slide', 'auto-play:b', 'delegate-handle', 'does-continue:b', 'on-slide-changed', 'pager-click', 'show-pager:b', 'slide-interval']),
    'ion-spinner': new HTMLTagSpecification(localize('tags.ion.spinner', 'The ionSpinner directive provides a variety of animated spinners.'), ['icon']),
    'ion-tab': new HTMLTagSpecification(localize('tags.ion.tab', 'Child of ionTabs. Contains a tab\'s content. The content only exists while the given tab is selected.'), ['badge', 'badge-style', 'disabled', 'hidden', 'href', 'icon', 'icon-off', 'icon-on', 'ng-click', 'on-deselect', 'on-select', 'title']),
    'ion-tabs': new HTMLTagSpecification(localize('tags.ion.tabs', 'Powers a multi-tabbed interface with a tab bar and a set of "pages" that can be tabbed through.'), ['delegate-handle']),
    'ion-title': new HTMLTagSpecification(localize('tags.ion.title', 'ion-title is a component that sets the title of the ionNavbar'), []),
    'ion-toggle': new HTMLTagSpecification(localize('tags.ion.toggle', 'A toggle is an animated switch which binds a given model to a boolean. Allows dragging of the switch\'s nub. The toggle behaves like any AngularJS checkbox otherwise.'), ['name', 'ng-false-value', 'ng-model', 'ng-true-value', 'toggle-class']),
    'ion-view ': new HTMLTagSpecification(localize('tags.ion.view', 'Child of ionNavView. A container for view content and any navigational and header bar information.'), ['cache-view:b', 'can-swipe-back:b', 'hide-back-button:b', 'hide-nav-bar:b', 'view-title'])
};
function getHTML5TagProvider() {
    var globalAttributes = ['aria-activedescendant', 'aria-atomic:b', 'aria-autocomplete:autocomplete', 'aria-busy:b', 'aria-checked:tristate', 'aria-colcount', 'aria-colindex', 'aria-colspan', 'aria-controls', 'aria-current:current', 'aria-describedat', 'aria-describedby', 'aria-disabled:b', 'aria-dropeffect:dropeffect', 'aria-errormessage', 'aria-expanded:u', 'aria-flowto', 'aria-grabbed:u', 'aria-haspopup:b', 'aria-hidden:b', 'aria-invalid:invalid', 'aria-kbdshortcuts', 'aria-label', 'aria-labelledby', 'aria-level', 'aria-live:live', 'aria-modal:b', 'aria-multiline:b', 'aria-multiselectable:b', 'aria-orientation:orientation', 'aria-owns', 'aria-placeholder', 'aria-posinset', 'aria-pressed:tristate', 'aria-readonly:b', 'aria-relevant:relevant', 'aria-required:b', 'aria-roledescription', 'aria-rowcount', 'aria-rowindex', 'aria-rowspan', 'aria-selected:u', 'aria-setsize', 'aria-sort:sort', 'aria-valuemax', 'aria-valuemin', 'aria-valuenow', 'aria-valuetext', 'accesskey', 'class', 'contenteditable:b', 'contextmenu', 'dir:d', 'draggable:b', 'dropzone', 'hidden:v', 'id', 'itemid', 'itemprop', 'itemref', 'itemscope:v', 'itemtype', 'lang', 'role:roles', 'spellcheck:b', 'style', 'tabindex', 'title', 'translate:y'];
    var eventHandlers = ['onabort', 'onblur', 'oncanplay', 'oncanplaythrough', 'onchange', 'onclick', 'oncontextmenu', 'ondblclick', 'ondrag', 'ondragend', 'ondragenter', 'ondragleave', 'ondragover', 'ondragstart', 'ondrop', 'ondurationchange', 'onemptied', 'onended', 'onerror', 'onfocus', 'onformchange', 'onforminput', 'oninput', 'oninvalid', 'onkeydown', 'onkeypress', 'onkeyup', 'onload', 'onloadeddata', 'onloadedmetadata', 'onloadstart', 'onmousedown', 'onmousemove', 'onmouseout', 'onmouseover', 'onmouseup', 'onmousewheel', 'onpause', 'onplay', 'onplaying', 'onprogress', 'onratechange', 'onreset', 'onresize', 'onreadystatechange', 'onscroll', 'onseeked', 'onseeking', 'onselect', 'onshow', 'onstalled', 'onsubmit', 'onsuspend', 'ontimeupdate', 'onvolumechange', 'onwaiting'];
    var valueSets = {
        b: ['true', 'false'],
        u: ['true', 'false', 'undefined'],
        o: ['on', 'off'],
        y: ['yes', 'no'],
        w: ['soft', 'hard'],
        d: ['ltr', 'rtl', 'auto'],
        m: ['GET', 'POST', 'dialog'],
        fm: ['GET', 'POST'],
        s: ['row', 'col', 'rowgroup', 'colgroup'],
        t: ['hidden', 'text', 'search', 'tel', 'url', 'email', 'password', 'datetime', 'date', 'month', 'week', 'time', 'datetime-local', 'number', 'range', 'color', 'checkbox', 'radio', 'file', 'submit', 'image', 'reset', 'button'],
        im: ['verbatim', 'latin', 'latin-name', 'latin-prose', 'full-width-latin', 'kana', 'kana-name', 'katakana', 'numeric', 'tel', 'email', 'url'],
        bt: ['button', 'submit', 'reset', 'menu'],
        lt: ['1', 'a', 'A', 'i', 'I'],
        mt: ['context', 'toolbar'],
        mit: ['command', 'checkbox', 'radio'],
        et: ['application/x-www-form-urlencoded', 'multipart/form-data', 'text/plain'],
        tk: ['subtitles', 'captions', 'descriptions', 'chapters', 'metadata'],
        pl: ['none', 'metadata', 'auto'],
        sh: ['circle', 'default', 'poly', 'rect'],
        xo: ['anonymous', 'use-credentials'],
        sb: ['allow-forms', 'allow-modals', 'allow-pointer-lock', 'allow-popups', 'allow-popups-to-escape-sandbox', 'allow-same-origin', 'allow-scripts', 'allow-top-navigation'],
        tristate: ['true', 'false', 'mixed', 'undefined'],
        inputautocomplete: ['additional-name', 'address-level1', 'address-level2', 'address-level3', 'address-level4', 'address-line1', 'address-line2', 'address-line3', 'bday', 'bday-year', 'bday-day', 'bday-month', 'billing', 'cc-additional-name', 'cc-csc', 'cc-exp', 'cc-exp-month', 'cc-exp-year', 'cc-family-name', 'cc-given-name', 'cc-name', 'cc-number', 'cc-type', 'country', 'country-name', 'current-password', 'email', 'family-name', 'fax', 'given-name', 'home', 'honorific-prefix', 'honorific-suffix', 'impp', 'language', 'mobile', 'name', 'new-password', 'nickname', 'organization', 'organization-title', 'pager', 'photo', 'postal-code', 'sex', 'shipping', 'street-address', 'tel-area-code', 'tel', 'tel-country-code', 'tel-extension', 'tel-local', 'tel-local-prefix', 'tel-local-suffix', 'tel-national', 'transaction-amount', 'transaction-currency', 'url', 'username', 'work'],
        autocomplete: ['inline', 'list', 'both', 'none'],
        current: ['page', 'step', 'location', 'date', 'time', 'true', 'false'],
        dropeffect: ['copy', 'move', 'link', 'execute', 'popup', 'none'],
        invalid: ['grammar', 'false', 'spelling', 'true'],
        live: ['off', 'polite', 'assertive'],
        orientation: ['vertical', 'horizontal', 'undefined'],
        relevant: ['additions', 'removals', 'text', 'all', 'additions text'],
        sort: ['ascending', 'descending', 'none', 'other'],
        roles: ['alert', 'alertdialog', 'button', 'checkbox', 'dialog', 'gridcell', 'link', 'log', 'marquee', 'menuitem', 'menuitemcheckbox', 'menuitemradio', 'option', 'progressbar', 'radio', 'scrollbar', 'searchbox', 'slider', 'spinbutton', 'status', 'switch', 'tab', 'tabpanel', 'textbox', 'timer', 'tooltip', 'treeitem', 'combobox', 'grid', 'listbox', 'menu', 'menubar', 'radiogroup', 'tablist', 'tree', 'treegrid', 'application', 'article', 'cell', 'columnheader', 'definition', 'directory', 'document', 'feed', 'figure', 'group', 'heading', 'img', 'list', 'listitem', 'math', 'none', 'note', 'presentation', 'region', 'row', 'rowgroup', 'rowheader', 'separator', 'table', 'term', 'text', 'toolbar', 'banner', 'complementary', 'contentinfo', 'form', 'main', 'navigation', 'region', 'search', 'doc-abstract', 'doc-acknowledgments', 'doc-afterword', 'doc-appendix', 'doc-backlink', 'doc-biblioentry', 'doc-bibliography', 'doc-biblioref', 'doc-chapter', 'doc-colophon', 'doc-conclusion', 'doc-cover', 'doc-credit', 'doc-credits', 'doc-dedication', 'doc-endnote', 'doc-endnotes', 'doc-epigraph', 'doc-epilogue', 'doc-errata', 'doc-example', 'doc-footnote', 'doc-foreword', 'doc-glossary', 'doc-glossref', 'doc-index', 'doc-introduction', 'doc-noteref', 'doc-notice', 'doc-pagebreak', 'doc-pagelist', 'doc-part', 'doc-preface', 'doc-prologue', 'doc-pullquote', 'doc-qna', 'doc-subtitle', 'doc-tip', 'doc-toc']
    };
    return {
        getId: function getId() {
            return 'html5';
        },
        isApplicable: function isApplicable() {
            return true;
        },
        collectTags: function collectTags(collector) {
            return collectTagsDefault(collector, HTML_TAGS);
        },
        collectAttributes: function collectAttributes(tag, collector) {
            collectAttributesDefault(tag, collector, HTML_TAGS, globalAttributes);
            eventHandlers.forEach(function (handler) {
                collector(handler, 'event');
            });
        },
        collectValues: function collectValues(tag, attribute, collector) {
            return collectValuesDefault(tag, attribute, collector, HTML_TAGS, globalAttributes, valueSets);
        }
    };
}
function getAngularTagProvider() {
    var customTags = {
        input: ['ng-model', 'ng-required', 'ng-minlength', 'ng-maxlength', 'ng-pattern', 'ng-trim'],
        select: ['ng-model'],
        textarea: ['ng-model', 'ng-required', 'ng-minlength', 'ng-maxlength', 'ng-pattern', 'ng-trim']
    };
    var globalAttributes = ['ng-app', 'ng-strict-di', 'ng-bind', 'ng-bind-html', 'ng-bind-template', 'ng-blur', 'ng-change', 'ng-checked', 'ng-class', 'ng-class-even', 'ng-class-odd', 'ng-click', 'ng-cloak', 'ng-controller', 'ng-copy', 'ng-csp', 'ng-cut', 'ng-dblclick', 'ng-disabled', 'ng-focus', 'ng-form', 'ng-hide', 'ng-href', 'ng-if', 'ng-include', 'ng-init', 'ng-jq', 'ng-keydown', 'ng-keypress', 'ng-keyup', 'ng-list', 'ng-model-options', 'ng-mousedown', 'ng-mouseenter', 'ng-mouseleave', 'ng-mousemove', 'ng-mouseover', 'ng-mouseup', 'ng-non-bindable', 'ng-open', 'ng-options', 'ng-paste', 'ng-pluralize', 'ng-readonly', 'ng-repeat', 'ng-selected', 'ng-show', 'ng-src', 'ng-srcset', 'ng-style', 'ng-submit', 'ng-switch', 'ng-transclude', 'ng-value'];
    return {
        getId: function getId() {
            return 'angular1';
        },
        isApplicable: function isApplicable(languageId) {
            return languageId === 'html';
        },
        collectTags: function collectTags(collector) {
            // no extra tags
        },
        collectAttributes: function collectAttributes(tag, collector) {
            if (tag) {
                var attributes = customTags[tag];
                if (attributes) {
                    attributes.forEach(function (a) {
                        collector(a);
                        collector('data-' + a);
                    });
                }
            }
            globalAttributes.forEach(function (a) {
                collector(a);
                collector('data-' + a);
            });
        },
        collectValues: function collectValues(tag, attribute, collector) {
            // no values
        }
    };
}
function getIonicTagProvider() {
    var customTags = {
        a: ['nav-direction:navdir', 'nav-transition:trans'],
        button: ['menu-toggle:menusides']
    };
    var globalAttributes = ['collection-repeat', 'force-refresh-images:b', 'ion-stop-event', 'item-height', 'item-render-buffer', 'item-width', 'menu-close:v', 'on-double-tap', 'on-drag', 'on-drag-down', 'on-drag-left', 'on-drag-right', 'on-drag-up', 'on-hold', 'on-release', 'on-swipe', 'on-swipe-down', 'on-swipe-left', 'on-swipe-right', 'on-swipe-up', 'on-tap', 'on-touch'];
    var valueSets = {
        align: ['center', 'left', 'right'],
        b: ['true', 'false'],
        inputtype: ['email', 'number', 'password', 'search', 'tel', 'text', 'url'],
        listtype: ['card', 'list-inset'],
        menusides: ['left', 'right'],
        navdir: ['back', 'enter', 'exit', 'forward', 'swap'],
        navsides: ['left', 'primary', 'right', 'secondary'],
        scrolldir: ['x', 'xy', 'y'],
        trans: ['android', 'ios', 'none']
    };
    return {
        getId: function getId() {
            return 'ionic';
        },
        isApplicable: function isApplicable(languageId) {
            return languageId === 'html';
        },
        collectTags: function collectTags(collector) {
            return collectTagsDefault(collector, IONIC_TAGS);
        },
        collectAttributes: function collectAttributes(tag, collector) {
            collectAttributesDefault(tag, collector, IONIC_TAGS, globalAttributes);
            if (tag) {
                var attributes = customTags[tag];
                if (attributes) {
                    attributes.forEach(function (a) {
                        var segments = a.split(':');
                        collector(segments[0], segments[1]);
                    });
                }
            }
        },
        collectValues: function collectValues(tag, attribute, collector) {
            return collectValuesDefault(tag, attribute, collector, IONIC_TAGS, globalAttributes, valueSets, customTags);
        }
    };
}
function collectTagsDefault(collector, tagSet) {
    for (var tag in tagSet) {
        collector(tag, tagSet[tag].label);
    }
}
function collectAttributesDefault(tag, collector, tagSet, globalAttributes) {
    globalAttributes.forEach(function (attr) {
        var segments = attr.split(':');
        collector(segments[0], segments[1]);
    });
    if (tag) {
        var tags = tagSet[tag];
        if (tags) {
            var attributes = tags.attributes;
            if (attributes) {
                attributes.forEach(function (attr) {
                    var segments = attr.split(':');
                    collector(segments[0], segments[1]);
                });
            }
        }
    }
}
function collectValuesDefault(tag, attribute, collector, tagSet, globalAttributes, valueSets, customTags) {
    var prefix = attribute + ':';
    var processAttributes = function processAttributes(attributes) {
        attributes.forEach(function (attr) {
            if (attr.length > prefix.length && strings.startsWith(attr, prefix)) {
                var typeInfo = attr.substr(prefix.length);
                if (typeInfo === 'v') {
                    collector(attribute);
                } else {
                    var values = valueSets[typeInfo];
                    if (values) {
                        values.forEach(collector);
                    }
                }
            }
        });
    };
    if (tag) {
        var tags = tagSet[tag];
        if (tags) {
            var attributes = tags.attributes;
            if (attributes) {
                processAttributes(attributes);
            }
        }
    }
    processAttributes(globalAttributes);
    if (customTags) {
        var customTagAttributes = customTags[tag];
        if (customTagAttributes) {
            processAttributes(customTagAttributes);
        }
    }
}
/*!
END THIRD PARTY
*/
//# sourceMappingURL=htmlTags.js.map

/***/ }),
/* 51 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.loadMessageBundle = loadMessageBundle;
exports.config = config;
/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/
function format(message, args) {
    var result;
    if (args.length === 0) {
        result = message;
    } else {
        result = message.replace(/\{(\d+)\}/g, function (match, rest) {
            var index = rest[0];
            return typeof args[index] !== 'undefined' ? args[index] : match;
        });
    }
    return result;
}
function localize(key, message) {
    var args = [];
    for (var _i = 2; _i < arguments.length; _i++) {
        args[_i - 2] = arguments[_i];
    }
    return format(message, args);
}
function loadMessageBundle(file) {
    return localize;
}
function config(opt) {
    return loadMessageBundle;
}

/***/ }),
/* 52 */,
/* 53 */,
/* 54 */,
/* 55 */,
/* 56 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;

// copied from https://raw.githubusercontent.com/beautify-web/js-beautify/master/js/lib/beautify-css.js
// https://github.com/beautify-web/js-beautify/commit/2009d250914ba865e81b20b264aa40736e38bf86
/*jshint curly:false, eqeqeq:true, laxbreak:true, noempty:false */
/* AUTO-GENERATED. DO NOT MODIFY. */
/*

  The MIT License (MIT)

  Copyright (c) 2007-2017 Einar Lielmanis, Liam Newman, and contributors.

  Permission is hereby granted, free of charge, to any person
  obtaining a copy of this software and associated documentation files
  (the "Software"), to deal in the Software without restriction,
  including without limitation the rights to use, copy, modify, merge,
  publish, distribute, sublicense, and/or sell copies of the Software,
  and to permit persons to whom the Software is furnished to do so,
  subject to the following conditions:

  The above copyright notice and this permission notice shall be
  included in all copies or substantial portions of the Software.

  THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
  EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
  MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
  NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS
  BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN
  ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN
  CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
  SOFTWARE.


 CSS Beautifier
---------------

    Written by Harutyun Amirjanyan, (amirjanyan@gmail.com)

    Based on code initially developed by: Einar Lielmanis, <einar@jsbeautifier.org>
        http://jsbeautifier.org/

    Usage:
        css_beautify(source_text);
        css_beautify(source_text, options);

    The options are (default in brackets):
        indent_size (4)                         — indentation size,
        indent_char (space)                     — character to indent with,
        selector_separator_newline (true)       - separate selectors with newline or
                                                  not (e.g. "a,\nbr" or "a, br")
        end_with_newline (false)                - end with a newline
        newline_between_rules (true)            - add a new line after every css rule
        space_around_selector_separator (false) - ensure space around selector separators:
                                                  '>', '+', '~' (e.g. "a>b" -> "a > b")
    e.g

    css_beautify(css_source_text, {
      'indent_size': 1,
      'indent_char': '\t',
      'selector_separator': ' ',
      'end_with_newline': false,
      'newline_between_rules': true,
      'space_around_selector_separator': true
    });
*/

// http://www.w3.org/TR/CSS21/syndata.html#tokenization
// http://www.w3.org/TR/css3-syntax/

(function () {
    var legacy_beautify_css =
    /******/function (modules) {
        // webpackBootstrap
        /******/ // The module cache
        /******/var installedModules = {};
        /******/
        /******/ // The require function
        /******/function __webpack_require__(moduleId) {
            /******/
            /******/ // Check if module is in cache
            /******/if (installedModules[moduleId]) {
                /******/return installedModules[moduleId].exports;
                /******/
            }
            /******/ // Create a new module (and put it into the cache)
            /******/var module = installedModules[moduleId] = {
                /******/i: moduleId,
                /******/l: false,
                /******/exports: {}
                /******/ };
            /******/
            /******/ // Execute the module function
            /******/modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
            /******/
            /******/ // Flag the module as loaded
            /******/module.l = true;
            /******/
            /******/ // Return the exports of the module
            /******/return module.exports;
            /******/
        }
        /******/
        /******/
        /******/ // expose the modules object (__webpack_modules__)
        /******/__webpack_require__.m = modules;
        /******/
        /******/ // expose the module cache
        /******/__webpack_require__.c = installedModules;
        /******/
        /******/ // identity function for calling harmony imports with the correct context
        /******/__webpack_require__.i = function (value) {
            return value;
        };
        /******/
        /******/ // define getter function for harmony exports
        /******/__webpack_require__.d = function (exports, name, getter) {
            /******/if (!__webpack_require__.o(exports, name)) {
                /******/Object.defineProperty(exports, name, {
                    /******/configurable: false,
                    /******/enumerable: true,
                    /******/get: getter
                    /******/ });
                /******/
            }
            /******/
        };
        /******/
        /******/ // getDefaultExport function for compatibility with non-harmony modules
        /******/__webpack_require__.n = function (module) {
            /******/var getter = module && module.__esModule ?
            /******/function getDefault() {
                return module['default'];
            } :
            /******/function getModuleExports() {
                return module;
            };
            /******/__webpack_require__.d(getter, 'a', getter);
            /******/return getter;
            /******/
        };
        /******/
        /******/ // Object.prototype.hasOwnProperty.call
        /******/__webpack_require__.o = function (object, property) {
            return Object.prototype.hasOwnProperty.call(object, property);
        };
        /******/
        /******/ // __webpack_public_path__
        /******/__webpack_require__.p = "";
        /******/
        /******/ // Load entry module and return exports
        /******/return __webpack_require__(__webpack_require__.s = 4);
        /******/
    }(
    /************************************************************************/
    /******/[
    /* 0 */
    /***/function (module, exports, __webpack_require__) {

        /*jshint curly:true, eqeqeq:true, laxbreak:true, noempty:false */
        /*
        
          The MIT License (MIT)
        
          Copyright (c) 2007-2017 Einar Lielmanis, Liam Newman, and contributors.
        
          Permission is hereby granted, free of charge, to any person
          obtaining a copy of this software and associated documentation files
          (the "Software"), to deal in the Software without restriction,
          including without limitation the rights to use, copy, modify, merge,
          publish, distribute, sublicense, and/or sell copies of the Software,
          and to permit persons to whom the Software is furnished to do so,
          subject to the following conditions:
        
          The above copyright notice and this permission notice shall be
          included in all copies or substantial portions of the Software.
        
          THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
          EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
          MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
          NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS
          BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN
          ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN
          CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
          SOFTWARE.
        */

        var mergeOpts = __webpack_require__(2).mergeOpts;
        var acorn = __webpack_require__(1);
        var Output = __webpack_require__(3).Output;

        var lineBreak = acorn.lineBreak;
        var allLineBreaks = acorn.allLineBreaks;

        function Beautifier(source_text, options) {
            options = options || {};

            // Allow the setting of language/file-type specific options
            // with inheritance of overall settings
            options = mergeOpts(options, 'css');

            source_text = source_text || '';

            var newlinesFromLastWSEat = 0;
            var indentSize = options.indent_size ? parseInt(options.indent_size, 10) : 4;
            var indentCharacter = options.indent_char || ' ';
            var preserve_newlines = options.preserve_newlines === undefined ? false : options.preserve_newlines;
            var selectorSeparatorNewline = options.selector_separator_newline === undefined ? true : options.selector_separator_newline;
            var end_with_newline = options.end_with_newline === undefined ? false : options.end_with_newline;
            var newline_between_rules = options.newline_between_rules === undefined ? true : options.newline_between_rules;
            var space_around_combinator = options.space_around_combinator === undefined ? false : options.space_around_combinator;
            space_around_combinator = space_around_combinator || (options.space_around_selector_separator === undefined ? false : options.space_around_selector_separator);
            var eol = options.eol ? options.eol : 'auto';

            if (options.indent_with_tabs) {
                indentCharacter = '\t';
                indentSize = 1;
            }

            if (eol === 'auto') {
                eol = '\n';
                if (source_text && lineBreak.test(source_text || '')) {
                    eol = source_text.match(lineBreak)[0];
                }
            }

            eol = eol.replace(/\\r/, '\r').replace(/\\n/, '\n');

            // HACK: newline parsing inconsistent. This brute force normalizes the input.
            source_text = source_text.replace(allLineBreaks, '\n');

            // tokenizer
            var whiteRe = /^\s+$/;

            var pos = -1,
                ch;
            var parenLevel = 0;

            function next() {
                ch = source_text.charAt(++pos);
                return ch || '';
            }

            function peek(skipWhitespace) {
                var result = '';
                var prev_pos = pos;
                if (skipWhitespace) {
                    eatWhitespace();
                }
                result = source_text.charAt(pos + 1) || '';
                pos = prev_pos - 1;
                next();
                return result;
            }

            function eatString(endChars) {
                var start = pos;
                while (next()) {
                    if (ch === "\\") {
                        next();
                    } else if (endChars.indexOf(ch) !== -1) {
                        break;
                    } else if (ch === "\n") {
                        break;
                    }
                }
                return source_text.substring(start, pos + 1);
            }

            function peekString(endChar) {
                var prev_pos = pos;
                var str = eatString(endChar);
                pos = prev_pos - 1;
                next();
                return str;
            }

            function eatWhitespace(preserve_newlines_local) {
                var result = 0;
                while (whiteRe.test(peek())) {
                    next();
                    if (ch === '\n' && preserve_newlines_local && preserve_newlines) {
                        output.add_new_line(true);
                        result++;
                    }
                }
                newlinesFromLastWSEat = result;
                return result;
            }

            function skipWhitespace() {
                var result = '';
                if (ch && whiteRe.test(ch)) {
                    result = ch;
                }
                while (whiteRe.test(next())) {
                    result += ch;
                }
                return result;
            }

            function eatComment() {
                var start = pos;
                var singleLine = peek() === "/";
                next();
                while (next()) {
                    if (!singleLine && ch === "*" && peek() === "/") {
                        next();
                        break;
                    } else if (singleLine && ch === "\n") {
                        return source_text.substring(start, pos);
                    }
                }

                return source_text.substring(start, pos) + ch;
            }

            function lookBack(str) {
                return source_text.substring(pos - str.length, pos).toLowerCase() === str;
            }

            // Nested pseudo-class if we are insideRule
            // and the next special character found opens
            // a new block
            function foundNestedPseudoClass() {
                var openParen = 0;
                for (var i = pos + 1; i < source_text.length; i++) {
                    var ch = source_text.charAt(i);
                    if (ch === "{") {
                        return true;
                    } else if (ch === '(') {
                        // pseudoclasses can contain ()
                        openParen += 1;
                    } else if (ch === ')') {
                        if (openParen === 0) {
                            return false;
                        }
                        openParen -= 1;
                    } else if (ch === ";" || ch === "}") {
                        return false;
                    }
                }
                return false;
            }

            // printer
            var baseIndentString = '';
            var preindent_index = 0;
            if (source_text && source_text.length) {
                while (source_text.charAt(preindent_index) === ' ' || source_text.charAt(preindent_index) === '\t') {
                    preindent_index += 1;
                }
                baseIndentString = source_text.substring(0, preindent_index);
                js_source_text = source_text.substring(preindent_index);
            }

            var singleIndent = new Array(indentSize + 1).join(indentCharacter);
            var indentLevel;
            var nestedLevel;
            var output;

            function print_string(output_string) {
                if (output.just_added_newline()) {
                    output.set_indent(indentLevel);
                }
                output.add_token(output_string);
            }

            function preserveSingleSpace(isAfterSpace) {
                if (isAfterSpace) {
                    output.space_before_token = true;
                }
            }

            function indent() {
                indentLevel++;
            }

            function outdent() {
                if (indentLevel > 0) {
                    indentLevel--;
                }
            }

            /*_____________________--------------------_____________________*/

            this.beautify = function () {
                // reset
                output = new Output(singleIndent, baseIndentString);
                indentLevel = 0;
                nestedLevel = 0;

                pos = -1;
                ch = null;
                parenLevel = 0;

                var insideRule = false;
                var insidePropertyValue = false;
                var enteringConditionalGroup = false;
                var top_ch = '';
                var last_top_ch = '';

                while (true) {
                    var whitespace = skipWhitespace();
                    var isAfterSpace = whitespace !== '';
                    var isAfterNewline = whitespace.indexOf('\n') !== -1;
                    last_top_ch = top_ch;
                    top_ch = ch;

                    if (!ch) {
                        break;
                    } else if (ch === '/' && peek() === '*') {
                        /* css comment */
                        var header = indentLevel === 0;

                        if (isAfterNewline || header) {
                            output.add_new_line();
                        }

                        print_string(eatComment());
                        output.add_new_line();
                        if (header) {
                            output.add_new_line(true);
                        }
                    } else if (ch === '/' && peek() === '/') {
                        // single line comment
                        if (!isAfterNewline && last_top_ch !== '{') {
                            output.trim(true);
                        }
                        output.space_before_token = true;
                        print_string(eatComment());
                        output.add_new_line();
                    } else if (ch === '@') {
                        preserveSingleSpace(isAfterSpace);

                        // deal with less propery mixins @{...}
                        if (peek() === '{') {
                            print_string(eatString('}'));
                        } else {
                            print_string(ch);

                            // strip trailing space, if present, for hash property checks
                            var variableOrRule = peekString(": ,;{}()[]/='\"");

                            if (variableOrRule.match(/[ :]$/)) {
                                // we have a variable or pseudo-class, add it and insert one space before continuing
                                next();
                                variableOrRule = eatString(": ").replace(/\s$/, '');
                                print_string(variableOrRule);
                                output.space_before_token = true;
                            }

                            variableOrRule = variableOrRule.replace(/\s$/, '');

                            // might be a nesting at-rule
                            if (variableOrRule in this.NESTED_AT_RULE) {
                                nestedLevel += 1;
                                if (variableOrRule in this.CONDITIONAL_GROUP_RULE) {
                                    enteringConditionalGroup = true;
                                }
                            }
                        }
                    } else if (ch === '#' && peek() === '{') {
                        preserveSingleSpace(isAfterSpace);
                        print_string(eatString('}'));
                    } else if (ch === '{') {
                        if (peek(true) === '}') {
                            eatWhitespace();
                            next();
                            output.space_before_token = true;
                            print_string("{}");
                            if (!eatWhitespace(true)) {
                                output.add_new_line();
                            }

                            if (newlinesFromLastWSEat < 2 && newline_between_rules && indentLevel === 0) {
                                output.add_new_line(true);
                            }
                        } else {
                            indent();
                            output.space_before_token = true;
                            print_string(ch);
                            if (!eatWhitespace(true)) {
                                output.add_new_line();
                            }

                            // when entering conditional groups, only rulesets are allowed
                            if (enteringConditionalGroup) {
                                enteringConditionalGroup = false;
                                insideRule = indentLevel > nestedLevel;
                            } else {
                                // otherwise, declarations are also allowed
                                insideRule = indentLevel >= nestedLevel;
                            }
                        }
                    } else if (ch === '}') {
                        outdent();
                        output.add_new_line();
                        print_string(ch);
                        insideRule = false;
                        insidePropertyValue = false;
                        if (nestedLevel) {
                            nestedLevel--;
                        }

                        if (!eatWhitespace(true)) {
                            output.add_new_line();
                        }

                        if (newlinesFromLastWSEat < 2 && newline_between_rules && indentLevel === 0) {
                            output.add_new_line(true);
                        }
                    } else if (ch === ":") {
                        eatWhitespace();
                        if ((insideRule || enteringConditionalGroup) && !(lookBack("&") || foundNestedPseudoClass()) && !lookBack("(")) {
                            // 'property: value' delimiter
                            // which could be in a conditional group query
                            print_string(':');
                            if (!insidePropertyValue) {
                                insidePropertyValue = true;
                                output.space_before_token = true;
                            }
                        } else {
                            // sass/less parent reference don't use a space
                            // sass nested pseudo-class don't use a space

                            // preserve space before pseudoclasses/pseudoelements, as it means "in any child"
                            if (lookBack(" ")) {
                                output.space_before_token = true;
                            }
                            if (peek() === ":") {
                                // pseudo-element
                                next();
                                print_string("::");
                            } else {
                                // pseudo-class
                                print_string(':');
                            }
                        }
                    } else if (ch === '"' || ch === '\'') {
                        preserveSingleSpace(isAfterSpace);
                        print_string(eatString(ch));
                    } else if (ch === ';') {
                        insidePropertyValue = false;
                        print_string(ch);
                        if (!eatWhitespace(true)) {
                            output.add_new_line();
                        }
                    } else if (ch === '(') {
                        // may be a url
                        if (lookBack("url")) {
                            print_string(ch);
                            eatWhitespace();
                            if (next()) {
                                if (ch !== ')' && ch !== '"' && ch !== '\'') {
                                    print_string(eatString(')'));
                                } else {
                                    pos--;
                                }
                            }
                        } else {
                            parenLevel++;
                            preserveSingleSpace(isAfterSpace);
                            print_string(ch);
                            eatWhitespace();
                        }
                    } else if (ch === ')') {
                        print_string(ch);
                        parenLevel--;
                    } else if (ch === ',') {
                        print_string(ch);
                        if (!eatWhitespace(true) && selectorSeparatorNewline && !insidePropertyValue && parenLevel < 1) {
                            output.add_new_line();
                        } else {
                            output.space_before_token = true;
                        }
                    } else if ((ch === '>' || ch === '+' || ch === '~') && !insidePropertyValue && parenLevel < 1) {
                        //handle combinator spacing
                        if (space_around_combinator) {
                            output.space_before_token = true;
                            print_string(ch);
                            output.space_before_token = true;
                        } else {
                            print_string(ch);
                            eatWhitespace();
                            // squash extra whitespace
                            if (ch && whiteRe.test(ch)) {
                                ch = '';
                            }
                        }
                    } else if (ch === ']') {
                        print_string(ch);
                    } else if (ch === '[') {
                        preserveSingleSpace(isAfterSpace);
                        print_string(ch);
                    } else if (ch === '=') {
                        // no whitespace before or after
                        eatWhitespace();
                        print_string('=');
                        if (whiteRe.test(ch)) {
                            ch = '';
                        }
                    } else {
                        preserveSingleSpace(isAfterSpace);
                        print_string(ch);
                    }
                }

                var sweetCode = output.get_code(end_with_newline, eol);

                return sweetCode;
            };

            // https://developer.mozilla.org/en-US/docs/Web/CSS/At-rule
            this.NESTED_AT_RULE = {
                "@page": true,
                "@font-face": true,
                "@keyframes": true,
                // also in CONDITIONAL_GROUP_RULE below
                "@media": true,
                "@supports": true,
                "@document": true
            };
            this.CONDITIONAL_GROUP_RULE = {
                "@media": true,
                "@supports": true,
                "@document": true
            };
        }

        module.exports.Beautifier = Beautifier;

        /***/
    },
    /* 1 */
    /***/function (module, exports) {

        /* jshint curly: false */
        // This section of code is taken from acorn.
        //
        // Acorn was written by Marijn Haverbeke and released under an MIT
        // license. The Unicode regexps (for identifiers and whitespace) were
        // taken from [Esprima](http://esprima.org) by Ariya Hidayat.
        //
        // Git repositories for Acorn are available at
        //
        //     http://marijnhaverbeke.nl/git/acorn
        //     https://github.com/marijnh/acorn.git

        // ## Character categories

        // Big ugly regular expressions that match characters in the
        // whitespace, identifier, and identifier-start categories. These
        // are only applied when a character is found to actually have a
        // code point above 128.

        var nonASCIIwhitespace = /[\u1680\u180e\u2000-\u200a\u202f\u205f\u3000\ufeff]/; // jshint ignore:line
        var nonASCIIidentifierStartChars = '\xAA\xB5\xBA\xC0-\xD6\xD8-\xF6\xF8-\u02C1\u02C6-\u02D1\u02E0-\u02E4\u02EC\u02EE\u0370-\u0374\u0376\u0377\u037A-\u037D\u0386\u0388-\u038A\u038C\u038E-\u03A1\u03A3-\u03F5\u03F7-\u0481\u048A-\u0527\u0531-\u0556\u0559\u0561-\u0587\u05D0-\u05EA\u05F0-\u05F2\u0620-\u064A\u066E\u066F\u0671-\u06D3\u06D5\u06E5\u06E6\u06EE\u06EF\u06FA-\u06FC\u06FF\u0710\u0712-\u072F\u074D-\u07A5\u07B1\u07CA-\u07EA\u07F4\u07F5\u07FA\u0800-\u0815\u081A\u0824\u0828\u0840-\u0858\u08A0\u08A2-\u08AC\u0904-\u0939\u093D\u0950\u0958-\u0961\u0971-\u0977\u0979-\u097F\u0985-\u098C\u098F\u0990\u0993-\u09A8\u09AA-\u09B0\u09B2\u09B6-\u09B9\u09BD\u09CE\u09DC\u09DD\u09DF-\u09E1\u09F0\u09F1\u0A05-\u0A0A\u0A0F\u0A10\u0A13-\u0A28\u0A2A-\u0A30\u0A32\u0A33\u0A35\u0A36\u0A38\u0A39\u0A59-\u0A5C\u0A5E\u0A72-\u0A74\u0A85-\u0A8D\u0A8F-\u0A91\u0A93-\u0AA8\u0AAA-\u0AB0\u0AB2\u0AB3\u0AB5-\u0AB9\u0ABD\u0AD0\u0AE0\u0AE1\u0B05-\u0B0C\u0B0F\u0B10\u0B13-\u0B28\u0B2A-\u0B30\u0B32\u0B33\u0B35-\u0B39\u0B3D\u0B5C\u0B5D\u0B5F-\u0B61\u0B71\u0B83\u0B85-\u0B8A\u0B8E-\u0B90\u0B92-\u0B95\u0B99\u0B9A\u0B9C\u0B9E\u0B9F\u0BA3\u0BA4\u0BA8-\u0BAA\u0BAE-\u0BB9\u0BD0\u0C05-\u0C0C\u0C0E-\u0C10\u0C12-\u0C28\u0C2A-\u0C33\u0C35-\u0C39\u0C3D\u0C58\u0C59\u0C60\u0C61\u0C85-\u0C8C\u0C8E-\u0C90\u0C92-\u0CA8\u0CAA-\u0CB3\u0CB5-\u0CB9\u0CBD\u0CDE\u0CE0\u0CE1\u0CF1\u0CF2\u0D05-\u0D0C\u0D0E-\u0D10\u0D12-\u0D3A\u0D3D\u0D4E\u0D60\u0D61\u0D7A-\u0D7F\u0D85-\u0D96\u0D9A-\u0DB1\u0DB3-\u0DBB\u0DBD\u0DC0-\u0DC6\u0E01-\u0E30\u0E32\u0E33\u0E40-\u0E46\u0E81\u0E82\u0E84\u0E87\u0E88\u0E8A\u0E8D\u0E94-\u0E97\u0E99-\u0E9F\u0EA1-\u0EA3\u0EA5\u0EA7\u0EAA\u0EAB\u0EAD-\u0EB0\u0EB2\u0EB3\u0EBD\u0EC0-\u0EC4\u0EC6\u0EDC-\u0EDF\u0F00\u0F40-\u0F47\u0F49-\u0F6C\u0F88-\u0F8C\u1000-\u102A\u103F\u1050-\u1055\u105A-\u105D\u1061\u1065\u1066\u106E-\u1070\u1075-\u1081\u108E\u10A0-\u10C5\u10C7\u10CD\u10D0-\u10FA\u10FC-\u1248\u124A-\u124D\u1250-\u1256\u1258\u125A-\u125D\u1260-\u1288\u128A-\u128D\u1290-\u12B0\u12B2-\u12B5\u12B8-\u12BE\u12C0\u12C2-\u12C5\u12C8-\u12D6\u12D8-\u1310\u1312-\u1315\u1318-\u135A\u1380-\u138F\u13A0-\u13F4\u1401-\u166C\u166F-\u167F\u1681-\u169A\u16A0-\u16EA\u16EE-\u16F0\u1700-\u170C\u170E-\u1711\u1720-\u1731\u1740-\u1751\u1760-\u176C\u176E-\u1770\u1780-\u17B3\u17D7\u17DC\u1820-\u1877\u1880-\u18A8\u18AA\u18B0-\u18F5\u1900-\u191C\u1950-\u196D\u1970-\u1974\u1980-\u19AB\u19C1-\u19C7\u1A00-\u1A16\u1A20-\u1A54\u1AA7\u1B05-\u1B33\u1B45-\u1B4B\u1B83-\u1BA0\u1BAE\u1BAF\u1BBA-\u1BE5\u1C00-\u1C23\u1C4D-\u1C4F\u1C5A-\u1C7D\u1CE9-\u1CEC\u1CEE-\u1CF1\u1CF5\u1CF6\u1D00-\u1DBF\u1E00-\u1F15\u1F18-\u1F1D\u1F20-\u1F45\u1F48-\u1F4D\u1F50-\u1F57\u1F59\u1F5B\u1F5D\u1F5F-\u1F7D\u1F80-\u1FB4\u1FB6-\u1FBC\u1FBE\u1FC2-\u1FC4\u1FC6-\u1FCC\u1FD0-\u1FD3\u1FD6-\u1FDB\u1FE0-\u1FEC\u1FF2-\u1FF4\u1FF6-\u1FFC\u2071\u207F\u2090-\u209C\u2102\u2107\u210A-\u2113\u2115\u2119-\u211D\u2124\u2126\u2128\u212A-\u212D\u212F-\u2139\u213C-\u213F\u2145-\u2149\u214E\u2160-\u2188\u2C00-\u2C2E\u2C30-\u2C5E\u2C60-\u2CE4\u2CEB-\u2CEE\u2CF2\u2CF3\u2D00-\u2D25\u2D27\u2D2D\u2D30-\u2D67\u2D6F\u2D80-\u2D96\u2DA0-\u2DA6\u2DA8-\u2DAE\u2DB0-\u2DB6\u2DB8-\u2DBE\u2DC0-\u2DC6\u2DC8-\u2DCE\u2DD0-\u2DD6\u2DD8-\u2DDE\u2E2F\u3005-\u3007\u3021-\u3029\u3031-\u3035\u3038-\u303C\u3041-\u3096\u309D-\u309F\u30A1-\u30FA\u30FC-\u30FF\u3105-\u312D\u3131-\u318E\u31A0-\u31BA\u31F0-\u31FF\u3400-\u4DB5\u4E00-\u9FCC\uA000-\uA48C\uA4D0-\uA4FD\uA500-\uA60C\uA610-\uA61F\uA62A\uA62B\uA640-\uA66E\uA67F-\uA697\uA6A0-\uA6EF\uA717-\uA71F\uA722-\uA788\uA78B-\uA78E\uA790-\uA793\uA7A0-\uA7AA\uA7F8-\uA801\uA803-\uA805\uA807-\uA80A\uA80C-\uA822\uA840-\uA873\uA882-\uA8B3\uA8F2-\uA8F7\uA8FB\uA90A-\uA925\uA930-\uA946\uA960-\uA97C\uA984-\uA9B2\uA9CF\uAA00-\uAA28\uAA40-\uAA42\uAA44-\uAA4B\uAA60-\uAA76\uAA7A\uAA80-\uAAAF\uAAB1\uAAB5\uAAB6\uAAB9-\uAABD\uAAC0\uAAC2\uAADB-\uAADD\uAAE0-\uAAEA\uAAF2-\uAAF4\uAB01-\uAB06\uAB09-\uAB0E\uAB11-\uAB16\uAB20-\uAB26\uAB28-\uAB2E\uABC0-\uABE2\uAC00-\uD7A3\uD7B0-\uD7C6\uD7CB-\uD7FB\uF900-\uFA6D\uFA70-\uFAD9\uFB00-\uFB06\uFB13-\uFB17\uFB1D\uFB1F-\uFB28\uFB2A-\uFB36\uFB38-\uFB3C\uFB3E\uFB40\uFB41\uFB43\uFB44\uFB46-\uFBB1\uFBD3-\uFD3D\uFD50-\uFD8F\uFD92-\uFDC7\uFDF0-\uFDFB\uFE70-\uFE74\uFE76-\uFEFC\uFF21-\uFF3A\uFF41-\uFF5A\uFF66-\uFFBE\uFFC2-\uFFC7\uFFCA-\uFFCF\uFFD2-\uFFD7\uFFDA-\uFFDC';
        var nonASCIIidentifierChars = '\u0300-\u036F\u0483-\u0487\u0591-\u05BD\u05BF\u05C1\u05C2\u05C4\u05C5\u05C7\u0610-\u061A\u0620-\u0649\u0672-\u06D3\u06E7-\u06E8\u06FB-\u06FC\u0730-\u074A\u0800-\u0814\u081B-\u0823\u0825-\u0827\u0829-\u082D\u0840-\u0857\u08E4-\u08FE\u0900-\u0903\u093A-\u093C\u093E-\u094F\u0951-\u0957\u0962-\u0963\u0966-\u096F\u0981-\u0983\u09BC\u09BE-\u09C4\u09C7\u09C8\u09D7\u09DF-\u09E0\u0A01-\u0A03\u0A3C\u0A3E-\u0A42\u0A47\u0A48\u0A4B-\u0A4D\u0A51\u0A66-\u0A71\u0A75\u0A81-\u0A83\u0ABC\u0ABE-\u0AC5\u0AC7-\u0AC9\u0ACB-\u0ACD\u0AE2-\u0AE3\u0AE6-\u0AEF\u0B01-\u0B03\u0B3C\u0B3E-\u0B44\u0B47\u0B48\u0B4B-\u0B4D\u0B56\u0B57\u0B5F-\u0B60\u0B66-\u0B6F\u0B82\u0BBE-\u0BC2\u0BC6-\u0BC8\u0BCA-\u0BCD\u0BD7\u0BE6-\u0BEF\u0C01-\u0C03\u0C46-\u0C48\u0C4A-\u0C4D\u0C55\u0C56\u0C62-\u0C63\u0C66-\u0C6F\u0C82\u0C83\u0CBC\u0CBE-\u0CC4\u0CC6-\u0CC8\u0CCA-\u0CCD\u0CD5\u0CD6\u0CE2-\u0CE3\u0CE6-\u0CEF\u0D02\u0D03\u0D46-\u0D48\u0D57\u0D62-\u0D63\u0D66-\u0D6F\u0D82\u0D83\u0DCA\u0DCF-\u0DD4\u0DD6\u0DD8-\u0DDF\u0DF2\u0DF3\u0E34-\u0E3A\u0E40-\u0E45\u0E50-\u0E59\u0EB4-\u0EB9\u0EC8-\u0ECD\u0ED0-\u0ED9\u0F18\u0F19\u0F20-\u0F29\u0F35\u0F37\u0F39\u0F41-\u0F47\u0F71-\u0F84\u0F86-\u0F87\u0F8D-\u0F97\u0F99-\u0FBC\u0FC6\u1000-\u1029\u1040-\u1049\u1067-\u106D\u1071-\u1074\u1082-\u108D\u108F-\u109D\u135D-\u135F\u170E-\u1710\u1720-\u1730\u1740-\u1750\u1772\u1773\u1780-\u17B2\u17DD\u17E0-\u17E9\u180B-\u180D\u1810-\u1819\u1920-\u192B\u1930-\u193B\u1951-\u196D\u19B0-\u19C0\u19C8-\u19C9\u19D0-\u19D9\u1A00-\u1A15\u1A20-\u1A53\u1A60-\u1A7C\u1A7F-\u1A89\u1A90-\u1A99\u1B46-\u1B4B\u1B50-\u1B59\u1B6B-\u1B73\u1BB0-\u1BB9\u1BE6-\u1BF3\u1C00-\u1C22\u1C40-\u1C49\u1C5B-\u1C7D\u1CD0-\u1CD2\u1D00-\u1DBE\u1E01-\u1F15\u200C\u200D\u203F\u2040\u2054\u20D0-\u20DC\u20E1\u20E5-\u20F0\u2D81-\u2D96\u2DE0-\u2DFF\u3021-\u3028\u3099\u309A\uA640-\uA66D\uA674-\uA67D\uA69F\uA6F0-\uA6F1\uA7F8-\uA800\uA806\uA80B\uA823-\uA827\uA880-\uA881\uA8B4-\uA8C4\uA8D0-\uA8D9\uA8F3-\uA8F7\uA900-\uA909\uA926-\uA92D\uA930-\uA945\uA980-\uA983\uA9B3-\uA9C0\uAA00-\uAA27\uAA40-\uAA41\uAA4C-\uAA4D\uAA50-\uAA59\uAA7B\uAAE0-\uAAE9\uAAF2-\uAAF3\uABC0-\uABE1\uABEC\uABED\uABF0-\uABF9\uFB20-\uFB28\uFE00-\uFE0F\uFE20-\uFE26\uFE33\uFE34\uFE4D-\uFE4F\uFF10-\uFF19\uFF3F';
        var nonASCIIidentifierStart = new RegExp("[" + nonASCIIidentifierStartChars + "]");
        var nonASCIIidentifier = new RegExp("[" + nonASCIIidentifierStartChars + nonASCIIidentifierChars + "]");

        // Whether a single character denotes a newline.

        exports.newline = /[\n\r\u2028\u2029]/;

        // Matches a whole line break (where CRLF is considered a single
        // line break). Used to count lines.

        // in javascript, these two differ
        // in python they are the same, different methods are called on them
        exports.lineBreak = new RegExp('\r\n|' + exports.newline.source);
        exports.allLineBreaks = new RegExp(exports.lineBreak.source, 'g');

        // Test whether a given character code starts an identifier.

        exports.isIdentifierStart = function (code) {
            // permit $ (36) and @ (64). @ is used in ES7 decorators.
            if (code < 65) return code === 36 || code === 64;
            // 65 through 91 are uppercase letters.
            if (code < 91) return true;
            // permit _ (95).
            if (code < 97) return code === 95;
            // 97 through 123 are lowercase letters.
            if (code < 123) return true;
            return code >= 0xaa && nonASCIIidentifierStart.test(String.fromCharCode(code));
        };

        // Test whether a given character is part of an identifier.

        exports.isIdentifierChar = function (code) {
            if (code < 48) return code === 36;
            if (code < 58) return true;
            if (code < 65) return false;
            if (code < 91) return true;
            if (code < 97) return code === 95;
            if (code < 123) return true;
            return code >= 0xaa && nonASCIIidentifier.test(String.fromCharCode(code));
        };

        /***/
    },
    /* 2 */
    /***/function (module, exports) {

        /*jshint curly:true, eqeqeq:true, laxbreak:true, noempty:false */
        /*
        
            The MIT License (MIT)
        
            Copyright (c) 2007-2017 Einar Lielmanis, Liam Newman, and contributors.
        
            Permission is hereby granted, free of charge, to any person
            obtaining a copy of this software and associated documentation files
            (the "Software"), to deal in the Software without restriction,
            including without limitation the rights to use, copy, modify, merge,
            publish, distribute, sublicense, and/or sell copies of the Software,
            and to permit persons to whom the Software is furnished to do so,
            subject to the following conditions:
        
            The above copyright notice and this permission notice shall be
            included in all copies or substantial portions of the Software.
        
            THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
            EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
            MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
            NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS
            BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN
            ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN
            CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
            SOFTWARE.
        */

        function mergeOpts(allOptions, targetType) {
            var finalOpts = {};
            var name;

            for (name in allOptions) {
                if (name !== targetType) {
                    finalOpts[name] = allOptions[name];
                }
            }

            //merge in the per type settings for the targetType
            if (targetType in allOptions) {
                for (name in allOptions[targetType]) {
                    finalOpts[name] = allOptions[targetType][name];
                }
            }
            return finalOpts;
        }

        module.exports.mergeOpts = mergeOpts;

        /***/
    },
    /* 3 */
    /***/function (module, exports) {

        /*jshint curly:true, eqeqeq:true, laxbreak:true, noempty:false */
        /*
        
          The MIT License (MIT)
        
          Copyright (c) 2007-2017 Einar Lielmanis, Liam Newman, and contributors.
        
          Permission is hereby granted, free of charge, to any person
          obtaining a copy of this software and associated documentation files
          (the "Software"), to deal in the Software without restriction,
          including without limitation the rights to use, copy, modify, merge,
          publish, distribute, sublicense, and/or sell copies of the Software,
          and to permit persons to whom the Software is furnished to do so,
          subject to the following conditions:
        
          The above copyright notice and this permission notice shall be
          included in all copies or substantial portions of the Software.
        
          THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
          EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
          MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
          NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS
          BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN
          ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN
          CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
          SOFTWARE.
        */

        function OutputLine(parent) {
            var _character_count = 0;
            // use indent_count as a marker for lines that have preserved indentation
            var _indent_count = -1;

            var _items = [];
            var _empty = true;

            this.set_indent = function (level) {
                _character_count = parent.baseIndentLength + level * parent.indent_length;
                _indent_count = level;
            };

            this.get_character_count = function () {
                return _character_count;
            };

            this.is_empty = function () {
                return _empty;
            };

            this.last = function () {
                if (!this._empty) {
                    return _items[_items.length - 1];
                } else {
                    return null;
                }
            };

            this.push = function (input) {
                _items.push(input);
                _character_count += input.length;
                _empty = false;
            };

            this.pop = function () {
                var item = null;
                if (!_empty) {
                    item = _items.pop();
                    _character_count -= item.length;
                    _empty = _items.length === 0;
                }
                return item;
            };

            this.remove_indent = function () {
                if (_indent_count > 0) {
                    _indent_count -= 1;
                    _character_count -= parent.indent_length;
                }
            };

            this.trim = function () {
                while (this.last() === ' ') {
                    _items.pop();
                    _character_count -= 1;
                }
                _empty = _items.length === 0;
            };

            this.toString = function () {
                var result = '';
                if (!this._empty) {
                    if (_indent_count >= 0) {
                        result = parent.indent_cache[_indent_count];
                    }
                    result += _items.join('');
                }
                return result;
            };
        }

        function Output(indent_string, baseIndentString) {
            baseIndentString = baseIndentString || '';
            this.indent_cache = [baseIndentString];
            this.baseIndentLength = baseIndentString.length;
            this.indent_length = indent_string.length;
            this.raw = false;

            var lines = [];
            this.baseIndentString = baseIndentString;
            this.indent_string = indent_string;
            this.previous_line = null;
            this.current_line = null;
            this.space_before_token = false;

            this.add_outputline = function () {
                this.previous_line = this.current_line;
                this.current_line = new OutputLine(this);
                lines.push(this.current_line);
            };

            // initialize
            this.add_outputline();

            this.get_line_number = function () {
                return lines.length;
            };

            // Using object instead of string to allow for later expansion of info about each line
            this.add_new_line = function (force_newline) {
                if (this.get_line_number() === 1 && this.just_added_newline()) {
                    return false; // no newline on start of file
                }

                if (force_newline || !this.just_added_newline()) {
                    if (!this.raw) {
                        this.add_outputline();
                    }
                    return true;
                }

                return false;
            };

            this.get_code = function (end_with_newline, eol) {
                var sweet_code = lines.join('\n').replace(/[\r\n\t ]+$/, '');

                if (end_with_newline) {
                    sweet_code += '\n';
                }

                if (eol !== '\n') {
                    sweet_code = sweet_code.replace(/[\n]/g, eol);
                }

                return sweet_code;
            };

            this.set_indent = function (level) {
                // Never indent your first output indent at the start of the file
                if (lines.length > 1) {
                    while (level >= this.indent_cache.length) {
                        this.indent_cache.push(this.indent_cache[this.indent_cache.length - 1] + this.indent_string);
                    }

                    this.current_line.set_indent(level);
                    return true;
                }
                this.current_line.set_indent(0);
                return false;
            };

            this.add_raw_token = function (token) {
                for (var x = 0; x < token.newlines; x++) {
                    this.add_outputline();
                }
                this.current_line.push(token.whitespace_before);
                this.current_line.push(token.text);
                this.space_before_token = false;
            };

            this.add_token = function (printable_token) {
                this.add_space_before_token();
                this.current_line.push(printable_token);
            };

            this.add_space_before_token = function () {
                if (this.space_before_token && !this.just_added_newline()) {
                    this.current_line.push(' ');
                }
                this.space_before_token = false;
            };

            this.remove_indent = function (index) {
                var output_length = lines.length;
                while (index < output_length) {
                    lines[index].remove_indent();
                    index++;
                }
            };

            this.trim = function (eat_newlines) {
                eat_newlines = eat_newlines === undefined ? false : eat_newlines;

                this.current_line.trim(indent_string, baseIndentString);

                while (eat_newlines && lines.length > 1 && this.current_line.is_empty()) {
                    lines.pop();
                    this.current_line = lines[lines.length - 1];
                    this.current_line.trim();
                }

                this.previous_line = lines.length > 1 ? lines[lines.length - 2] : null;
            };

            this.just_added_newline = function () {
                return this.current_line.is_empty();
            };

            this.just_added_blankline = function () {
                if (this.just_added_newline()) {
                    if (lines.length === 1) {
                        return true; // start of the file and newline = blank
                    }

                    var line = lines[lines.length - 2];
                    return line.is_empty();
                }
                return false;
            };
        }

        module.exports.Output = Output;

        /***/
    },
    /* 4 */
    /***/function (module, exports, __webpack_require__) {

        /*jshint curly:true, eqeqeq:true, laxbreak:true, noempty:false */
        /*
        
            The MIT License (MIT)
        
            Copyright (c) 2007-2017 Einar Lielmanis, Liam Newman, and contributors.
        
            Permission is hereby granted, free of charge, to any person
            obtaining a copy of this software and associated documentation files
            (the "Software"), to deal in the Software without restriction,
            including without limitation the rights to use, copy, modify, merge,
            publish, distribute, sublicense, and/or sell copies of the Software,
            and to permit persons to whom the Software is furnished to do so,
            subject to the following conditions:
        
            The above copyright notice and this permission notice shall be
            included in all copies or substantial portions of the Software.
        
            THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
            EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
            MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
            NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS
            BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN
            ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN
            CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
            SOFTWARE.
        */

        var Beautifier = __webpack_require__(0).Beautifier;

        function css_beautify(source_text, options) {
            var beautifier = new Beautifier(source_text, options);
            return beautifier.beautify();
        }

        module.exports = css_beautify;

        /***/
    }]
    /******/);
    var css_beautify = legacy_beautify_css;
    /* Footer */
    if (true) {
        // Add support for AMD ( https://github.com/amdjs/amdjs-api/wiki/AMD#defineamd-property- )
        !(__WEBPACK_AMD_DEFINE_ARRAY__ = [], __WEBPACK_AMD_DEFINE_RESULT__ = function () {
            return {
                css_beautify: css_beautify
            };
        }.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
    } else if (typeof exports !== "undefined") {
        // Add support for CommonJS. Just put this file somewhere on your require.paths
        // and you will be able to `var html_beautify = require("beautify").html_beautify`.
        exports.css_beautify = css_beautify;
    } else if (typeof window !== "undefined") {
        // If we're running a web page and don't have either of the above, add our one global
        window.css_beautify = css_beautify;
    } else if (typeof global !== "undefined") {
        // If we don't even have window, try global.
        global.css_beautify = css_beautify;
    }
})();

/***/ }),
/* 57 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.js_beautify = js_beautify;
/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/
/*
 * Mock for the JS formatter. Ignore formatting of JS content in HTML.
 */
function js_beautify(js_source_text, options) {
  // no formatting
  return js_source_text;
}
//# sourceMappingURL=beautify.js.map

/***/ }),
/* 58 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.allTagProviders = undefined;

var _htmlTags = __webpack_require__(50);

var _razorTags = __webpack_require__(87);

var allTagProviders = exports.allTagProviders = [(0, _htmlTags.getHTML5TagProvider)(), (0, _htmlTags.getAngularTagProvider)(), (0, _htmlTags.getIonicTagProvider)(), (0, _razorTags.getRazorTagProvider)()];
//# sourceMappingURL=tagProviders.js.map

/***/ }),
/* 59 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/

/**
 * Takes a sorted array and a function p. The array is sorted in such a way that all elements where p(x) is false
 * are located before all elements where p(x) is true.
 * @returns the least x for which p(x) is true or array.length if no element fullfills the given function.
 */

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.findFirst = findFirst;
exports.binarySearch = binarySearch;
function findFirst(array, p) {
    var low = 0,
        high = array.length;
    if (high === 0) {
        return 0; // no children
    }
    while (low < high) {
        var mid = Math.floor((low + high) / 2);
        if (p(array[mid])) {
            high = mid;
        } else {
            low = mid + 1;
        }
    }
    return low;
}
function binarySearch(array, key, comparator) {
    var low = 0,
        high = array.length - 1;
    while (low <= high) {
        var mid = (low + high) / 2 | 0;
        var comp = comparator(array[mid], key);
        if (comp < 0) {
            low = mid + 1;
        } else if (comp > 0) {
            high = mid - 1;
        } else {
            return mid;
        }
    }
    return -(low + 1);
}
//# sourceMappingURL=arrays.js.map

/***/ }),
/* 60 */,
/* 61 */,
/* 62 */,
/* 63 */,
/* 64 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.HTMLWorker = undefined;
exports.create = create;

var _htmlLanguageService = __webpack_require__(84);

var htmlService = _interopRequireWildcard(_htmlLanguageService);

var _main = __webpack_require__(36);

var ls = _interopRequireWildcard(_main);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

var Promise = monaco.Promise;

var HTMLWorker = /** @class */function () {
    function HTMLWorker(ctx, createData) {
        this._ctx = ctx;
        this._languageSettings = createData.languageSettings;
        this._languageId = createData.languageId;
        this._languageService = htmlService.getLanguageService();
    }
    HTMLWorker.prototype.doValidation = function (uri) {
        // not yet suported
        return Promise.as([]);
    };
    HTMLWorker.prototype.doComplete = function (uri, position) {
        var document = this._getTextDocument(uri);
        var htmlDocument = this._languageService.parseHTMLDocument(document);
        return Promise.as(this._languageService.doComplete(document, position, htmlDocument, this._languageSettings && this._languageSettings.suggest));
    };
    HTMLWorker.prototype.format = function (uri, range, options) {
        var document = this._getTextDocument(uri);
        var textEdits = this._languageService.format(document, range, this._languageSettings && this._languageSettings.format);
        return Promise.as(textEdits);
    };
    HTMLWorker.prototype.findDocumentHighlights = function (uri, position) {
        var document = this._getTextDocument(uri);
        var htmlDocument = this._languageService.parseHTMLDocument(document);
        var highlights = this._languageService.findDocumentHighlights(document, position, htmlDocument);
        return Promise.as(highlights);
    };
    HTMLWorker.prototype.findDocumentLinks = function (uri) {
        var document = this._getTextDocument(uri);
        var links = this._languageService.findDocumentLinks(document, null);
        return Promise.as(links);
    };
    HTMLWorker.prototype._getTextDocument = function (uri) {
        var models = this._ctx.getMirrorModels();
        for (var _i = 0, models_1 = models; _i < models_1.length; _i++) {
            var model = models_1[_i];
            if (model.uri.toString() === uri) {
                return ls.TextDocument.create(uri, this._languageId, model.version, model.getValue());
            }
        }
        return null;
    };
    return HTMLWorker;
}();
exports.HTMLWorker = HTMLWorker;
function create(ctx, createData) {
    return new HTMLWorker(ctx, createData);
}

/***/ }),
/* 65 */,
/* 66 */,
/* 67 */,
/* 68 */,
/* 69 */,
/* 70 */,
/* 71 */,
/* 72 */,
/* 73 */,
/* 74 */,
/* 75 */,
/* 76 */,
/* 77 */,
/* 78 */,
/* 79 */,
/* 80 */,
/* 81 */,
/* 82 */,
/* 83 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

// copied from https://raw.githubusercontent.com/beautify-web/js-beautify/master/js/lib/beautify-html.js
// https://github.com/beautify-web/js-beautify/commit/2009d250914ba865e81b20b264aa40736e38bf86
/*jshint curly:false, eqeqeq:true, laxbreak:true, noempty:false */
/* AUTO-GENERATED. DO NOT MODIFY. */
/*

  The MIT License (MIT)

  Copyright (c) 2007-2017 Einar Lielmanis, Liam Newman, and contributors.

  Permission is hereby granted, free of charge, to any person
  obtaining a copy of this software and associated documentation files
  (the "Software"), to deal in the Software without restriction,
  including without limitation the rights to use, copy, modify, merge,
  publish, distribute, sublicense, and/or sell copies of the Software,
  and to permit persons to whom the Software is furnished to do so,
  subject to the following conditions:

  The above copyright notice and this permission notice shall be
  included in all copies or substantial portions of the Software.

  THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
  EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
  MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
  NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS
  BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN
  ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN
  CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
  SOFTWARE.


 Style HTML
---------------

  Written by Nochum Sossonko, (nsossonko@hotmail.com)

  Based on code initially developed by: Einar Lielmanis, <einar@jsbeautifier.org>
    http://jsbeautifier.org/

  Usage:
    style_html(html_source);

    style_html(html_source, options);

  The options are:
    indent_inner_html (default false)  — indent <head> and <body> sections,
    indent_size (default 4)          — indentation size,
    indent_char (default space)      — character to indent with,
    wrap_line_length (default 250)            -  maximum amount of characters per line (0 = disable)
    brace_style (default "collapse") - "collapse" | "expand" | "end-expand" | "none"
            put braces on the same line as control statements (default), or put braces on own line (Allman / ANSI style), or just put end braces on own line, or attempt to keep them where they are.
    unformatted (defaults to inline tags) - list of tags, that shouldn't be reformatted
    content_unformatted (defaults to pre tag) - list of tags, that its content shouldn't be reformatted
    indent_scripts (default normal)  - "keep"|"separate"|"normal"
    preserve_newlines (default true) - whether existing line breaks before elements should be preserved
                                        Only works before elements, not inside tags or for text.
    max_preserve_newlines (default unlimited) - maximum number of line breaks to be preserved in one chunk
    indent_handlebars (default false) - format and indent {{#foo}} and {{/foo}}
    end_with_newline (false)          - end with a newline
    extra_liners (default [head,body,/html]) -List of tags that should have an extra newline before them.

    e.g.

    style_html(html_source, {
      'indent_inner_html': false,
      'indent_size': 2,
      'indent_char': ' ',
      'wrap_line_length': 78,
      'brace_style': 'expand',
      'preserve_newlines': true,
      'max_preserve_newlines': 5,
      'indent_handlebars': false,
      'extra_liners': ['/html']
    });
*/

(function () {
    var legacy_beautify_html =
    /******/function (modules) {
        // webpackBootstrap
        /******/ // The module cache
        /******/var installedModules = {};
        /******/
        /******/ // The require function
        /******/function __webpack_require__(moduleId) {
            /******/
            /******/ // Check if module is in cache
            /******/if (installedModules[moduleId]) {
                /******/return installedModules[moduleId].exports;
                /******/
            }
            /******/ // Create a new module (and put it into the cache)
            /******/var module = installedModules[moduleId] = {
                /******/i: moduleId,
                /******/l: false,
                /******/exports: {}
                /******/ };
            /******/
            /******/ // Execute the module function
            /******/modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
            /******/
            /******/ // Flag the module as loaded
            /******/module.l = true;
            /******/
            /******/ // Return the exports of the module
            /******/return module.exports;
            /******/
        }
        /******/
        /******/
        /******/ // expose the modules object (__webpack_modules__)
        /******/__webpack_require__.m = modules;
        /******/
        /******/ // expose the module cache
        /******/__webpack_require__.c = installedModules;
        /******/
        /******/ // identity function for calling harmony imports with the correct context
        /******/__webpack_require__.i = function (value) {
            return value;
        };
        /******/
        /******/ // define getter function for harmony exports
        /******/__webpack_require__.d = function (exports, name, getter) {
            /******/if (!__webpack_require__.o(exports, name)) {
                /******/Object.defineProperty(exports, name, {
                    /******/configurable: false,
                    /******/enumerable: true,
                    /******/get: getter
                    /******/ });
                /******/
            }
            /******/
        };
        /******/
        /******/ // getDefaultExport function for compatibility with non-harmony modules
        /******/__webpack_require__.n = function (module) {
            /******/var getter = module && module.__esModule ?
            /******/function getDefault() {
                return module['default'];
            } :
            /******/function getModuleExports() {
                return module;
            };
            /******/__webpack_require__.d(getter, 'a', getter);
            /******/return getter;
            /******/
        };
        /******/
        /******/ // Object.prototype.hasOwnProperty.call
        /******/__webpack_require__.o = function (object, property) {
            return Object.prototype.hasOwnProperty.call(object, property);
        };
        /******/
        /******/ // __webpack_public_path__
        /******/__webpack_require__.p = "";
        /******/
        /******/ // Load entry module and return exports
        /******/return __webpack_require__(__webpack_require__.s = 3);
        /******/
    }(
    /************************************************************************/
    /******/[
    /* 0 */
    /***/function (module, exports, __webpack_require__) {

        /*jshint curly:true, eqeqeq:true, laxbreak:true, noempty:false */
        /*
        
          The MIT License (MIT)
        
          Copyright (c) 2007-2017 Einar Lielmanis, Liam Newman, and contributors.
        
          Permission is hereby granted, free of charge, to any person
          obtaining a copy of this software and associated documentation files
          (the "Software"), to deal in the Software without restriction,
          including without limitation the rights to use, copy, modify, merge,
          publish, distribute, sublicense, and/or sell copies of the Software,
          and to permit persons to whom the Software is furnished to do so,
          subject to the following conditions:
        
          The above copyright notice and this permission notice shall be
          included in all copies or substantial portions of the Software.
        
          THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
          EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
          MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
          NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS
          BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN
          ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN
          CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
          SOFTWARE.
        */

        var mergeOpts = __webpack_require__(2).mergeOpts;
        var acorn = __webpack_require__(1);

        var lineBreak = acorn.lineBreak;
        var allLineBreaks = acorn.allLineBreaks;

        // function trim(s) {
        //     return s.replace(/^\s+|\s+$/g, '');
        // }

        function ltrim(s) {
            return s.replace(/^\s+/g, '');
        }

        function rtrim(s) {
            return s.replace(/\s+$/g, '');
        }

        function Beautifier(html_source, options, js_beautify, css_beautify) {
            //Wrapper function to invoke all the necessary constructors and deal with the output.
            html_source = html_source || '';

            var multi_parser, indent_inner_html, indent_body_inner_html, indent_head_inner_html, indent_size, indent_character, wrap_line_length, brace_style, unformatted, content_unformatted, preserve_newlines, max_preserve_newlines, indent_handlebars, wrap_attributes, wrap_attributes_indent_size, is_wrap_attributes_force, is_wrap_attributes_force_expand_multiline, is_wrap_attributes_force_aligned, end_with_newline, extra_liners, eol;

            options = options || {};

            // Allow the setting of language/file-type specific options
            // with inheritance of overall settings
            options = mergeOpts(options, 'html');

            // backwards compatibility to 1.3.4
            if ((options.wrap_line_length === undefined || parseInt(options.wrap_line_length, 10) === 0) && options.max_char !== undefined && parseInt(options.max_char, 10) !== 0) {
                options.wrap_line_length = options.max_char;
            }

            indent_inner_html = options.indent_inner_html === undefined ? false : options.indent_inner_html;
            indent_body_inner_html = options.indent_body_inner_html === undefined ? true : options.indent_body_inner_html;
            indent_head_inner_html = options.indent_head_inner_html === undefined ? true : options.indent_head_inner_html;
            indent_size = options.indent_size === undefined ? 4 : parseInt(options.indent_size, 10);
            indent_character = options.indent_char === undefined ? ' ' : options.indent_char;
            brace_style = options.brace_style === undefined ? 'collapse' : options.brace_style;
            wrap_line_length = parseInt(options.wrap_line_length, 10) === 0 ? 32786 : parseInt(options.wrap_line_length || 250, 10);
            unformatted = options.unformatted || [
            // https://www.w3.org/TR/html5/dom.html#phrasing-content
            'a', 'abbr', 'area', 'audio', 'b', 'bdi', 'bdo', 'br', 'button', 'canvas', 'cite', 'code', 'data', 'datalist', 'del', 'dfn', 'em', 'embed', 'i', 'iframe', 'img', 'input', 'ins', 'kbd', 'keygen', 'label', 'map', 'mark', 'math', 'meter', 'noscript', 'object', 'output', 'progress', 'q', 'ruby', 's', 'samp', /* 'script', */'select', 'small', 'span', 'strong', 'sub', 'sup', 'svg', 'template', 'textarea', 'time', 'u', 'var', 'video', 'wbr', 'text',
            // prexisting - not sure of full effect of removing, leaving in
            'acronym', 'address', 'big', 'dt', 'ins', 'strike', 'tt'];
            content_unformatted = options.content_unformatted || ['pre'];
            preserve_newlines = options.preserve_newlines === undefined ? true : options.preserve_newlines;
            max_preserve_newlines = preserve_newlines ? isNaN(parseInt(options.max_preserve_newlines, 10)) ? 32786 : parseInt(options.max_preserve_newlines, 10) : 0;
            indent_handlebars = options.indent_handlebars === undefined ? false : options.indent_handlebars;
            wrap_attributes = options.wrap_attributes === undefined ? 'auto' : options.wrap_attributes;
            wrap_attributes_indent_size = isNaN(parseInt(options.wrap_attributes_indent_size, 10)) ? indent_size : parseInt(options.wrap_attributes_indent_size, 10);
            is_wrap_attributes_force = wrap_attributes.substr(0, 'force'.length) === 'force';
            is_wrap_attributes_force_expand_multiline = wrap_attributes === 'force-expand-multiline';
            is_wrap_attributes_force_aligned = wrap_attributes === 'force-aligned';
            end_with_newline = options.end_with_newline === undefined ? false : options.end_with_newline;
            extra_liners = _typeof(options.extra_liners) === 'object' && options.extra_liners ? options.extra_liners.concat() : typeof options.extra_liners === 'string' ? options.extra_liners.split(',') : 'head,body,/html'.split(',');
            eol = options.eol ? options.eol : 'auto';

            if (options.indent_with_tabs) {
                indent_character = '\t';
                indent_size = 1;
            }

            if (eol === 'auto') {
                eol = '\n';
                if (html_source && lineBreak.test(html_source || '')) {
                    eol = html_source.match(lineBreak)[0];
                }
            }

            eol = eol.replace(/\\r/, '\r').replace(/\\n/, '\n');

            // HACK: newline parsing inconsistent. This brute force normalizes the input.
            html_source = html_source.replace(allLineBreaks, '\n');

            function Parser() {

                this.pos = 0; //Parser position
                this.token = '';
                this.current_mode = 'CONTENT'; //reflects the current Parser mode: TAG/CONTENT
                this.tags = { //An object to hold tags, their position, and their parent-tags, initiated with default values
                    parent: 'parent1',
                    parentcount: 1,
                    parent1: ''
                };
                this.tag_type = '';
                this.token_text = this.last_token = this.last_text = this.token_type = '';
                this.newlines = 0;
                this.indent_content = indent_inner_html;
                this.indent_body_inner_html = indent_body_inner_html;
                this.indent_head_inner_html = indent_head_inner_html;

                this.Utils = { //Uilities made available to the various functions
                    whitespace: "\n\r\t ".split(''),

                    single_token: options.void_elements || [
                    // HTLM void elements - aka self-closing tags - aka singletons
                    // https://www.w3.org/html/wg/drafts/html/master/syntax.html#void-elements
                    'area', 'base', 'br', 'col', 'embed', 'hr', 'img', 'input', 'keygen', 'link', 'menuitem', 'meta', 'param', 'source', 'track', 'wbr',
                    // NOTE: Optional tags - are not understood.
                    // https://www.w3.org/TR/html5/syntax.html#optional-tags
                    // The rules for optional tags are too complex for a simple list
                    // Also, the content of these tags should still be indented in many cases.
                    // 'li' is a good exmple.

                    // Doctype and xml elements
                    '!doctype', '?xml',
                    // ?php tag
                    '?php',
                    // other tags that were in this list, keeping just in case
                    'basefont', 'isindex'],
                    extra_liners: extra_liners, //for tags that need a line of whitespace before them
                    in_array: function in_array(what, arr) {
                        for (var i = 0; i < arr.length; i++) {
                            if (what === arr[i]) {
                                return true;
                            }
                        }
                        return false;
                    }
                };

                // Return true if the given text is composed entirely of whitespace.
                this.is_whitespace = function (text) {
                    for (var n = 0; n < text.length; n++) {
                        if (!this.Utils.in_array(text.charAt(n), this.Utils.whitespace)) {
                            return false;
                        }
                    }
                    return true;
                };

                this.traverse_whitespace = function () {
                    var input_char = '';

                    input_char = this.input.charAt(this.pos);
                    if (this.Utils.in_array(input_char, this.Utils.whitespace)) {
                        this.newlines = 0;
                        while (this.Utils.in_array(input_char, this.Utils.whitespace)) {
                            if (preserve_newlines && input_char === '\n' && this.newlines <= max_preserve_newlines) {
                                this.newlines += 1;
                            }

                            this.pos++;
                            input_char = this.input.charAt(this.pos);
                        }
                        return true;
                    }
                    return false;
                };

                // Append a space to the given content (string array) or, if we are
                // at the wrap_line_length, append a newline/indentation.
                // return true if a newline was added, false if a space was added
                this.space_or_wrap = function (content) {
                    if (this.line_char_count >= this.wrap_line_length) {
                        //insert a line when the wrap_line_length is reached
                        this.print_newline(false, content);
                        this.print_indentation(content);
                        return true;
                    } else {
                        this.line_char_count++;
                        content.push(' ');
                        return false;
                    }
                };

                this.get_content = function () {
                    //function to capture regular content between tags
                    var input_char = '',
                        content = [],
                        handlebarsStarted = 0;

                    while (this.input.charAt(this.pos) !== '<' || handlebarsStarted === 2) {
                        if (this.pos >= this.input.length) {
                            return content.length ? content.join('') : ['', 'TK_EOF'];
                        }

                        if (handlebarsStarted < 2 && this.traverse_whitespace()) {
                            this.space_or_wrap(content);
                            continue;
                        }

                        input_char = this.input.charAt(this.pos);

                        if (indent_handlebars) {
                            if (input_char === '{') {
                                handlebarsStarted += 1;
                            } else if (handlebarsStarted < 2) {
                                handlebarsStarted = 0;
                            }

                            if (input_char === '}' && handlebarsStarted > 0) {
                                if (handlebarsStarted-- === 0) {
                                    break;
                                }
                            }
                            // Handlebars parsing is complicated.
                            // {{#foo}} and {{/foo}} are formatted tags.
                            // {{something}} should get treated as content, except:
                            // {{else}} specifically behaves like {{#if}} and {{/if}}
                            var peek3 = this.input.substr(this.pos, 3);
                            if (peek3 === '{{#' || peek3 === '{{/') {
                                // These are tags and not content.
                                break;
                            } else if (peek3 === '{{!') {
                                return [this.get_tag(), 'TK_TAG_HANDLEBARS_COMMENT'];
                            } else if (this.input.substr(this.pos, 2) === '{{') {
                                if (this.get_tag(true) === '{{else}}') {
                                    break;
                                }
                            }
                        }

                        this.pos++;
                        this.line_char_count++;
                        content.push(input_char); //letter at-a-time (or string) inserted to an array
                    }
                    return content.length ? content.join('') : '';
                };

                this.get_contents_to = function (name) {
                    //get the full content of a script or style to pass to js_beautify
                    if (this.pos === this.input.length) {
                        return ['', 'TK_EOF'];
                    }
                    var content = '';
                    var reg_match = new RegExp('</' + name + '\\s*>', 'igm');
                    reg_match.lastIndex = this.pos;
                    var reg_array = reg_match.exec(this.input);
                    var end_script = reg_array ? reg_array.index : this.input.length; //absolute end of script
                    if (this.pos < end_script) {
                        //get everything in between the script tags
                        content = this.input.substring(this.pos, end_script);
                        this.pos = end_script;
                    }
                    return content;
                };

                this.record_tag = function (tag) {
                    //function to record a tag and its parent in this.tags Object
                    if (this.tags[tag + 'count']) {
                        //check for the existence of this tag type
                        this.tags[tag + 'count']++;
                        this.tags[tag + this.tags[tag + 'count']] = this.indent_level; //and record the present indent level
                    } else {
                        //otherwise initialize this tag type
                        this.tags[tag + 'count'] = 1;
                        this.tags[tag + this.tags[tag + 'count']] = this.indent_level; //and record the present indent level
                    }
                    this.tags[tag + this.tags[tag + 'count'] + 'parent'] = this.tags.parent; //set the parent (i.e. in the case of a div this.tags.div1parent)
                    this.tags.parent = tag + this.tags[tag + 'count']; //and make this the current parent (i.e. in the case of a div 'div1')
                };

                this.retrieve_tag = function (tag) {
                    //function to retrieve the opening tag to the corresponding closer
                    if (this.tags[tag + 'count']) {
                        //if the openener is not in the Object we ignore it
                        var temp_parent = this.tags.parent; //check to see if it's a closable tag.
                        while (temp_parent) {
                            //till we reach '' (the initial value);
                            if (tag + this.tags[tag + 'count'] === temp_parent) {
                                //if this is it use it
                                break;
                            }
                            temp_parent = this.tags[temp_parent + 'parent']; //otherwise keep on climbing up the DOM Tree
                        }
                        if (temp_parent) {
                            //if we caught something
                            this.indent_level = this.tags[tag + this.tags[tag + 'count']]; //set the indent_level accordingly
                            this.tags.parent = this.tags[temp_parent + 'parent']; //and set the current parent
                        }
                        delete this.tags[tag + this.tags[tag + 'count'] + 'parent']; //delete the closed tags parent reference...
                        delete this.tags[tag + this.tags[tag + 'count']]; //...and the tag itself
                        if (this.tags[tag + 'count'] === 1) {
                            delete this.tags[tag + 'count'];
                        } else {
                            this.tags[tag + 'count']--;
                        }
                    }
                };

                this.indent_to_tag = function (tag) {
                    // Match the indentation level to the last use of this tag, but don't remove it.
                    if (!this.tags[tag + 'count']) {
                        return;
                    }
                    var temp_parent = this.tags.parent;
                    while (temp_parent) {
                        if (tag + this.tags[tag + 'count'] === temp_parent) {
                            break;
                        }
                        temp_parent = this.tags[temp_parent + 'parent'];
                    }
                    if (temp_parent) {
                        this.indent_level = this.tags[tag + this.tags[tag + 'count']];
                    }
                };

                this.get_tag = function (peek) {
                    //function to get a full tag and parse its type
                    var input_char = '',
                        content = [],
                        comment = '',
                        space = false,
                        first_attr = true,
                        has_wrapped_attrs = false,
                        tag_start,
                        tag_end,
                        tag_start_char,
                        orig_pos = this.pos,
                        orig_line_char_count = this.line_char_count,
                        is_tag_closed = false,
                        tail;

                    peek = peek !== undefined ? peek : false;

                    do {
                        if (this.pos >= this.input.length) {
                            if (peek) {
                                this.pos = orig_pos;
                                this.line_char_count = orig_line_char_count;
                            }
                            return content.length ? content.join('') : ['', 'TK_EOF'];
                        }

                        input_char = this.input.charAt(this.pos);
                        this.pos++;

                        if (this.Utils.in_array(input_char, this.Utils.whitespace)) {
                            //don't want to insert unnecessary space
                            space = true;
                            continue;
                        }

                        if (input_char === "'" || input_char === '"') {
                            input_char += this.get_unformatted(input_char);
                            space = true;
                        }

                        if (input_char === '=') {
                            //no space before =
                            space = false;
                        }
                        tail = this.input.substr(this.pos - 1);
                        if (is_wrap_attributes_force_expand_multiline && has_wrapped_attrs && !is_tag_closed && (input_char === '>' || input_char === '/')) {
                            if (tail.match(/^\/?\s*>/)) {
                                space = false;
                                is_tag_closed = true;
                                this.print_newline(false, content);
                                this.print_indentation(content);
                            }
                        }
                        if (content.length && content[content.length - 1] !== '=' && input_char !== '>' && space) {
                            //no space after = or before >
                            var wrapped = this.space_or_wrap(content);
                            var indentAttrs = wrapped && input_char !== '/' && !is_wrap_attributes_force;
                            space = false;

                            if (is_wrap_attributes_force && input_char !== '/') {
                                var force_first_attr_wrap = false;
                                if (is_wrap_attributes_force_expand_multiline && first_attr) {
                                    var is_only_attribute = tail.match(/^\S*(="([^"]|\\")*")?\s*\/?\s*>/) !== null;
                                    force_first_attr_wrap = !is_only_attribute;
                                }
                                if (!first_attr || force_first_attr_wrap) {
                                    this.print_newline(false, content);
                                    this.print_indentation(content);
                                    indentAttrs = true;
                                }
                            }
                            if (indentAttrs) {
                                has_wrapped_attrs = true;

                                //indent attributes an auto, forced, or forced-align line-wrap
                                var alignment_size = wrap_attributes_indent_size;
                                if (is_wrap_attributes_force_aligned) {
                                    alignment_size = content.indexOf(' ') + 1;
                                }

                                for (var count = 0; count < alignment_size; count++) {
                                    // only ever further indent with spaces since we're trying to align characters
                                    content.push(' ');
                                }
                            }
                            if (first_attr) {
                                for (var i = 0; i < content.length; i++) {
                                    if (content[i] === ' ') {
                                        first_attr = false;
                                        break;
                                    }
                                }
                            }
                        }

                        if (indent_handlebars && tag_start_char === '<') {
                            // When inside an angle-bracket tag, put spaces around
                            // handlebars not inside of strings.
                            if (input_char + this.input.charAt(this.pos) === '{{') {
                                input_char += this.get_unformatted('}}');
                                if (content.length && content[content.length - 1] !== ' ' && content[content.length - 1] !== '<') {
                                    input_char = ' ' + input_char;
                                }
                                space = true;
                            }
                        }

                        if (input_char === '<' && !tag_start_char) {
                            tag_start = this.pos - 1;
                            tag_start_char = '<';
                        }

                        if (indent_handlebars && !tag_start_char) {
                            if (content.length >= 2 && content[content.length - 1] === '{' && content[content.length - 2] === '{') {
                                if (input_char === '#' || input_char === '/' || input_char === '!') {
                                    tag_start = this.pos - 3;
                                } else {
                                    tag_start = this.pos - 2;
                                }
                                tag_start_char = '{';
                            }
                        }

                        this.line_char_count++;
                        content.push(input_char); //inserts character at-a-time (or string)

                        if (content[1] && (content[1] === '!' || content[1] === '?' || content[1] === '%')) {
                            //if we're in a comment, do something special
                            // We treat all comments as literals, even more than preformatted tags
                            // we just look for the appropriate close tag
                            content = [this.get_comment(tag_start)];
                            break;
                        }

                        if (indent_handlebars && content[1] && content[1] === '{' && content[2] && content[2] === '!') {
                            //if we're in a comment, do something special
                            // We treat all comments as literals, even more than preformatted tags
                            // we just look for the appropriate close tag
                            content = [this.get_comment(tag_start)];
                            break;
                        }

                        if (indent_handlebars && tag_start_char === '{' && content.length > 2 && content[content.length - 2] === '}' && content[content.length - 1] === '}') {
                            break;
                        }
                    } while (input_char !== '>');

                    var tag_complete = content.join('');
                    var tag_index;
                    var tag_offset;

                    // must check for space first otherwise the tag could have the first attribute included, and
                    // then not un-indent correctly
                    if (tag_complete.indexOf(' ') !== -1) {
                        //if there's whitespace, thats where the tag name ends
                        tag_index = tag_complete.indexOf(' ');
                    } else if (tag_complete.indexOf('\n') !== -1) {
                        //if there's a line break, thats where the tag name ends
                        tag_index = tag_complete.indexOf('\n');
                    } else if (tag_complete.charAt(0) === '{') {
                        tag_index = tag_complete.indexOf('}');
                    } else {
                        //otherwise go with the tag ending
                        tag_index = tag_complete.indexOf('>');
                    }
                    if (tag_complete.charAt(0) === '<' || !indent_handlebars) {
                        tag_offset = 1;
                    } else {
                        tag_offset = tag_complete.charAt(2) === '#' ? 3 : 2;
                    }
                    var tag_check = tag_complete.substring(tag_offset, tag_index).toLowerCase();
                    if (tag_complete.charAt(tag_complete.length - 2) === '/' || this.Utils.in_array(tag_check, this.Utils.single_token)) {
                        //if this tag name is a single tag type (either in the list or has a closing /)
                        if (!peek) {
                            this.tag_type = 'SINGLE';
                        }
                    } else if (indent_handlebars && tag_complete.charAt(0) === '{' && tag_check === 'else') {
                        if (!peek) {
                            this.indent_to_tag('if');
                            this.tag_type = 'HANDLEBARS_ELSE';
                            this.indent_content = true;
                            this.traverse_whitespace();
                        }
                    } else if (this.is_unformatted(tag_check, unformatted) || this.is_unformatted(tag_check, content_unformatted)) {
                        // do not reformat the "unformatted" or "content_unformatted" tags
                        comment = this.get_unformatted('</' + tag_check + '>', tag_complete); //...delegate to get_unformatted function
                        content.push(comment);
                        tag_end = this.pos - 1;
                        this.tag_type = 'SINGLE';
                    } else if (tag_check === 'script' && (tag_complete.search('type') === -1 || tag_complete.search('type') > -1 && tag_complete.search(/\b(text|application|dojo)\/(x-)?(javascript|ecmascript|jscript|livescript|(ld\+)?json|method|aspect)/) > -1)) {
                        if (!peek) {
                            this.record_tag(tag_check);
                            this.tag_type = 'SCRIPT';
                        }
                    } else if (tag_check === 'style' && (tag_complete.search('type') === -1 || tag_complete.search('type') > -1 && tag_complete.search('text/css') > -1)) {
                        if (!peek) {
                            this.record_tag(tag_check);
                            this.tag_type = 'STYLE';
                        }
                    } else if (tag_check.charAt(0) === '!') {
                        //peek for <! comment
                        // for comments content is already correct.
                        if (!peek) {
                            this.tag_type = 'SINGLE';
                            this.traverse_whitespace();
                        }
                    } else if (!peek) {
                        if (tag_check.charAt(0) === '/') {
                            //this tag is a double tag so check for tag-ending
                            this.retrieve_tag(tag_check.substring(1)); //remove it and all ancestors
                            this.tag_type = 'END';
                        } else {
                            //otherwise it's a start-tag
                            this.record_tag(tag_check); //push it on the tag stack
                            if (tag_check.toLowerCase() !== 'html') {
                                this.indent_content = true;
                            }
                            this.tag_type = 'START';
                        }

                        // Allow preserving of newlines after a start or end tag
                        if (this.traverse_whitespace()) {
                            this.space_or_wrap(content);
                        }

                        if (this.Utils.in_array(tag_check, this.Utils.extra_liners)) {
                            //check if this double needs an extra line
                            this.print_newline(false, this.output);
                            if (this.output.length && this.output[this.output.length - 2] !== '\n') {
                                this.print_newline(true, this.output);
                            }
                        }
                    }

                    if (peek) {
                        this.pos = orig_pos;
                        this.line_char_count = orig_line_char_count;
                    }

                    return content.join(''); //returns fully formatted tag
                };

                this.get_comment = function (start_pos) {
                    //function to return comment content in its entirety
                    // this is will have very poor perf, but will work for now.
                    var comment = '',
                        delimiter = '>',
                        matched = false;

                    this.pos = start_pos;
                    var input_char = this.input.charAt(this.pos);
                    this.pos++;

                    while (this.pos <= this.input.length) {
                        comment += input_char;

                        // only need to check for the delimiter if the last chars match
                        if (comment.charAt(comment.length - 1) === delimiter.charAt(delimiter.length - 1) && comment.indexOf(delimiter) !== -1) {
                            break;
                        }

                        // only need to search for custom delimiter for the first few characters
                        if (!matched && comment.length < 10) {
                            if (comment.indexOf('<![if') === 0) {
                                //peek for <![if conditional comment
                                delimiter = '<![endif]>';
                                matched = true;
                            } else if (comment.indexOf('<![cdata[') === 0) {
                                //if it's a <[cdata[ comment...
                                delimiter = ']]>';
                                matched = true;
                            } else if (comment.indexOf('<![') === 0) {
                                // some other ![ comment? ...
                                delimiter = ']>';
                                matched = true;
                            } else if (comment.indexOf('<!--') === 0) {
                                // <!-- comment ...
                                delimiter = '-->';
                                matched = true;
                            } else if (comment.indexOf('{{!--') === 0) {
                                // {{!-- handlebars comment
                                delimiter = '--}}';
                                matched = true;
                            } else if (comment.indexOf('{{!') === 0) {
                                // {{! handlebars comment
                                if (comment.length === 5 && comment.indexOf('{{!--') === -1) {
                                    delimiter = '}}';
                                    matched = true;
                                }
                            } else if (comment.indexOf('<?') === 0) {
                                // {{! handlebars comment
                                delimiter = '?>';
                                matched = true;
                            } else if (comment.indexOf('<%') === 0) {
                                // {{! handlebars comment
                                delimiter = '%>';
                                matched = true;
                            }
                        }

                        input_char = this.input.charAt(this.pos);
                        this.pos++;
                    }

                    return comment;
                };

                function tokenMatcher(delimiter) {
                    var token = '';

                    var add = function add(str) {
                        var newToken = token + str.toLowerCase();
                        token = newToken.length <= delimiter.length ? newToken : newToken.substr(newToken.length - delimiter.length, delimiter.length);
                    };

                    var doesNotMatch = function doesNotMatch() {
                        return token.indexOf(delimiter) === -1;
                    };

                    return {
                        add: add,
                        doesNotMatch: doesNotMatch
                    };
                }

                this.get_unformatted = function (delimiter, orig_tag) {
                    //function to return unformatted content in its entirety
                    if (orig_tag && orig_tag.toLowerCase().indexOf(delimiter) !== -1) {
                        return '';
                    }
                    var input_char = '';
                    var content = '';
                    var space = true;

                    var delimiterMatcher = tokenMatcher(delimiter);

                    do {

                        if (this.pos >= this.input.length) {
                            return content;
                        }

                        input_char = this.input.charAt(this.pos);
                        this.pos++;

                        if (this.Utils.in_array(input_char, this.Utils.whitespace)) {
                            if (!space) {
                                this.line_char_count--;
                                continue;
                            }
                            if (input_char === '\n' || input_char === '\r') {
                                content += '\n';
                                /*  Don't change tab indention for unformatted blocks.  If using code for html editing, this will greatly affect <pre> tags if they are specified in the 'unformatted array'
                                for (var i=0; i<this.indent_level; i++) {
                                content += this.indent_string;
                                }
                                space = false; //...and make sure other indentation is erased
                                */
                                this.line_char_count = 0;
                                continue;
                            }
                        }
                        content += input_char;
                        delimiterMatcher.add(input_char);
                        this.line_char_count++;
                        space = true;

                        if (indent_handlebars && input_char === '{' && content.length && content.charAt(content.length - 2) === '{') {
                            // Handlebars expressions in strings should also be unformatted.
                            content += this.get_unformatted('}}');
                            // Don't consider when stopping for delimiters.
                        }
                    } while (delimiterMatcher.doesNotMatch());

                    return content;
                };

                this.get_token = function () {
                    //initial handler for token-retrieval
                    var token;

                    if (this.last_token === 'TK_TAG_SCRIPT' || this.last_token === 'TK_TAG_STYLE') {
                        //check if we need to format javascript
                        var type = this.last_token.substr(7);
                        token = this.get_contents_to(type);
                        if (typeof token !== 'string') {
                            return token;
                        }
                        return [token, 'TK_' + type];
                    }
                    if (this.current_mode === 'CONTENT') {
                        token = this.get_content();
                        if (typeof token !== 'string') {
                            return token;
                        } else {
                            return [token, 'TK_CONTENT'];
                        }
                    }

                    if (this.current_mode === 'TAG') {
                        token = this.get_tag();
                        if (typeof token !== 'string') {
                            return token;
                        } else {
                            var tag_name_type = 'TK_TAG_' + this.tag_type;
                            return [token, tag_name_type];
                        }
                    }
                };

                this.get_full_indent = function (level) {
                    level = this.indent_level + level || 0;
                    if (level < 1) {
                        return '';
                    }

                    return Array(level + 1).join(this.indent_string);
                };

                this.is_unformatted = function (tag_check, unformatted) {
                    //is this an HTML5 block-level link?
                    if (!this.Utils.in_array(tag_check, unformatted)) {
                        return false;
                    }

                    if (tag_check.toLowerCase() !== 'a' || !this.Utils.in_array('a', unformatted)) {
                        return true;
                    }

                    //at this point we have an  tag; is its first child something we want to remain
                    //unformatted?
                    var next_tag = this.get_tag(true /* peek. */);

                    // test next_tag to see if it is just html tag (no external content)
                    var tag = (next_tag || "").match(/^\s*<\s*\/?([a-z]*)\s*[^>]*>\s*$/);

                    // if next_tag comes back but is not an isolated tag, then
                    // let's treat the 'a' tag as having content
                    // and respect the unformatted option
                    if (!tag || this.Utils.in_array(tag[1], unformatted)) {
                        return true;
                    } else {
                        return false;
                    }
                };

                this.printer = function (js_source, indent_character, indent_size, wrap_line_length, brace_style) {
                    //handles input/output and some other printing functions

                    this.input = js_source || ''; //gets the input for the Parser

                    // HACK: newline parsing inconsistent. This brute force normalizes the input.
                    this.input = this.input.replace(/\r\n|[\r\u2028\u2029]/g, '\n');

                    this.output = [];
                    this.indent_character = indent_character;
                    this.indent_string = '';
                    this.indent_size = indent_size;
                    this.brace_style = brace_style;
                    this.indent_level = 0;
                    this.wrap_line_length = wrap_line_length;
                    this.line_char_count = 0; //count to see if wrap_line_length was exceeded

                    for (var i = 0; i < this.indent_size; i++) {
                        this.indent_string += this.indent_character;
                    }

                    this.print_newline = function (force, arr) {
                        this.line_char_count = 0;
                        if (!arr || !arr.length) {
                            return;
                        }
                        if (force || arr[arr.length - 1] !== '\n') {
                            //we might want the extra line
                            if (arr[arr.length - 1] !== '\n') {
                                arr[arr.length - 1] = rtrim(arr[arr.length - 1]);
                            }
                            arr.push('\n');
                        }
                    };

                    this.print_indentation = function (arr) {
                        for (var i = 0; i < this.indent_level; i++) {
                            arr.push(this.indent_string);
                            this.line_char_count += this.indent_string.length;
                        }
                    };

                    this.print_token = function (text) {
                        // Avoid printing initial whitespace.
                        if (this.is_whitespace(text) && !this.output.length) {
                            return;
                        }
                        if (text || text !== '') {
                            if (this.output.length && this.output[this.output.length - 1] === '\n') {
                                this.print_indentation(this.output);
                                text = ltrim(text);
                            }
                        }
                        this.print_token_raw(text);
                    };

                    this.print_token_raw = function (text) {
                        // If we are going to print newlines, truncate trailing
                        // whitespace, as the newlines will represent the space.
                        if (this.newlines > 0) {
                            text = rtrim(text);
                        }

                        if (text && text !== '') {
                            if (text.length > 1 && text.charAt(text.length - 1) === '\n') {
                                // unformatted tags can grab newlines as their last character
                                this.output.push(text.slice(0, -1));
                                this.print_newline(false, this.output);
                            } else {
                                this.output.push(text);
                            }
                        }

                        for (var n = 0; n < this.newlines; n++) {
                            this.print_newline(n > 0, this.output);
                        }
                        this.newlines = 0;
                    };

                    this.indent = function () {
                        this.indent_level++;
                    };

                    this.unindent = function () {
                        if (this.indent_level > 0) {
                            this.indent_level--;
                        }
                    };
                };
                return this;
            }

            /*_____________________--------------------_____________________*/

            this.beautify = function () {
                multi_parser = new Parser(); //wrapping functions Parser
                multi_parser.printer(html_source, indent_character, indent_size, wrap_line_length, brace_style); //initialize starting values
                while (true) {
                    var t = multi_parser.get_token();
                    multi_parser.token_text = t[0];
                    multi_parser.token_type = t[1];

                    if (multi_parser.token_type === 'TK_EOF') {
                        break;
                    }

                    switch (multi_parser.token_type) {
                        case 'TK_TAG_START':
                            multi_parser.print_newline(false, multi_parser.output);
                            multi_parser.print_token(multi_parser.token_text);
                            if (multi_parser.indent_content) {
                                if ((multi_parser.indent_body_inner_html || !multi_parser.token_text.match(/<body(?:.*)>/)) && (multi_parser.indent_head_inner_html || !multi_parser.token_text.match(/<head(?:.*)>/))) {

                                    multi_parser.indent();
                                }

                                multi_parser.indent_content = false;
                            }
                            multi_parser.current_mode = 'CONTENT';
                            break;
                        case 'TK_TAG_STYLE':
                        case 'TK_TAG_SCRIPT':
                            multi_parser.print_newline(false, multi_parser.output);
                            multi_parser.print_token(multi_parser.token_text);
                            multi_parser.current_mode = 'CONTENT';
                            break;
                        case 'TK_TAG_END':
                            //Print new line only if the tag has no content and has child
                            if (multi_parser.last_token === 'TK_CONTENT' && multi_parser.last_text === '') {
                                var tag_name = (multi_parser.token_text.match(/\w+/) || [])[0];
                                var tag_extracted_from_last_output = null;
                                if (multi_parser.output.length) {
                                    tag_extracted_from_last_output = multi_parser.output[multi_parser.output.length - 1].match(/(?:<|{{#)\s*(\w+)/);
                                }
                                if (tag_extracted_from_last_output === null || tag_extracted_from_last_output[1] !== tag_name && !multi_parser.Utils.in_array(tag_extracted_from_last_output[1], unformatted)) {
                                    multi_parser.print_newline(false, multi_parser.output);
                                }
                            }
                            multi_parser.print_token(multi_parser.token_text);
                            multi_parser.current_mode = 'CONTENT';
                            break;
                        case 'TK_TAG_SINGLE':
                            // Don't add a newline before elements that should remain unformatted.
                            var tag_check = multi_parser.token_text.match(/^\s*<([a-z-]+)/i);
                            if (!tag_check || !multi_parser.Utils.in_array(tag_check[1], unformatted)) {
                                multi_parser.print_newline(false, multi_parser.output);
                            }
                            multi_parser.print_token(multi_parser.token_text);
                            multi_parser.current_mode = 'CONTENT';
                            break;
                        case 'TK_TAG_HANDLEBARS_ELSE':
                            // Don't add a newline if opening {{#if}} tag is on the current line
                            var foundIfOnCurrentLine = false;
                            for (var lastCheckedOutput = multi_parser.output.length - 1; lastCheckedOutput >= 0; lastCheckedOutput--) {
                                if (multi_parser.output[lastCheckedOutput] === '\n') {
                                    break;
                                } else {
                                    if (multi_parser.output[lastCheckedOutput].match(/{{#if/)) {
                                        foundIfOnCurrentLine = true;
                                        break;
                                    }
                                }
                            }
                            if (!foundIfOnCurrentLine) {
                                multi_parser.print_newline(false, multi_parser.output);
                            }
                            multi_parser.print_token(multi_parser.token_text);
                            if (multi_parser.indent_content) {
                                multi_parser.indent();
                                multi_parser.indent_content = false;
                            }
                            multi_parser.current_mode = 'CONTENT';
                            break;
                        case 'TK_TAG_HANDLEBARS_COMMENT':
                            multi_parser.print_token(multi_parser.token_text);
                            multi_parser.current_mode = 'TAG';
                            break;
                        case 'TK_CONTENT':
                            multi_parser.print_token(multi_parser.token_text);
                            multi_parser.current_mode = 'TAG';
                            break;
                        case 'TK_STYLE':
                        case 'TK_SCRIPT':
                            if (multi_parser.token_text !== '') {
                                multi_parser.print_newline(false, multi_parser.output);
                                var text = multi_parser.token_text,
                                    _beautifier,
                                    script_indent_level = 1;
                                if (multi_parser.token_type === 'TK_SCRIPT') {
                                    _beautifier = typeof js_beautify === 'function' && js_beautify;
                                } else if (multi_parser.token_type === 'TK_STYLE') {
                                    _beautifier = typeof css_beautify === 'function' && css_beautify;
                                }

                                if (options.indent_scripts === "keep") {
                                    script_indent_level = 0;
                                } else if (options.indent_scripts === "separate") {
                                    script_indent_level = -multi_parser.indent_level;
                                }

                                var indentation = multi_parser.get_full_indent(script_indent_level);
                                if (_beautifier) {

                                    // call the Beautifier if avaliable
                                    var Child_options = function Child_options() {
                                        this.eol = '\n';
                                    };
                                    Child_options.prototype = options;
                                    var child_options = new Child_options();
                                    text = _beautifier(text.replace(/^\s*/, indentation), child_options);
                                } else {
                                    // simply indent the string otherwise
                                    var white = text.match(/^\s*/)[0];
                                    var _level = white.match(/[^\n\r]*$/)[0].split(multi_parser.indent_string).length - 1;
                                    var reindent = multi_parser.get_full_indent(script_indent_level - _level);
                                    text = text.replace(/^\s*/, indentation).replace(/\r\n|\r|\n/g, '\n' + reindent).replace(/\s+$/, '');
                                }
                                if (text) {
                                    multi_parser.print_token_raw(text);
                                    multi_parser.print_newline(true, multi_parser.output);
                                }
                            }
                            multi_parser.current_mode = 'TAG';
                            break;
                        default:
                            // We should not be getting here but we don't want to drop input on the floor
                            // Just output the text and move on
                            if (multi_parser.token_text !== '') {
                                multi_parser.print_token(multi_parser.token_text);
                            }
                            break;
                    }
                    multi_parser.last_token = multi_parser.token_type;
                    multi_parser.last_text = multi_parser.token_text;
                }
                var sweet_code = multi_parser.output.join('').replace(/[\r\n\t ]+$/, '');

                // establish end_with_newline
                if (end_with_newline) {
                    sweet_code += '\n';
                }

                if (eol !== '\n') {
                    sweet_code = sweet_code.replace(/[\n]/g, eol);
                }

                return sweet_code;
            };
        }

        module.exports.Beautifier = Beautifier;

        /***/
    },
    /* 1 */
    /***/function (module, exports) {

        /* jshint curly: false */
        // This section of code is taken from acorn.
        //
        // Acorn was written by Marijn Haverbeke and released under an MIT
        // license. The Unicode regexps (for identifiers and whitespace) were
        // taken from [Esprima](http://esprima.org) by Ariya Hidayat.
        //
        // Git repositories for Acorn are available at
        //
        //     http://marijnhaverbeke.nl/git/acorn
        //     https://github.com/marijnh/acorn.git

        // ## Character categories

        // Big ugly regular expressions that match characters in the
        // whitespace, identifier, and identifier-start categories. These
        // are only applied when a character is found to actually have a
        // code point above 128.

        var nonASCIIwhitespace = /[\u1680\u180e\u2000-\u200a\u202f\u205f\u3000\ufeff]/; // jshint ignore:line
        var nonASCIIidentifierStartChars = '\xAA\xB5\xBA\xC0-\xD6\xD8-\xF6\xF8-\u02C1\u02C6-\u02D1\u02E0-\u02E4\u02EC\u02EE\u0370-\u0374\u0376\u0377\u037A-\u037D\u0386\u0388-\u038A\u038C\u038E-\u03A1\u03A3-\u03F5\u03F7-\u0481\u048A-\u0527\u0531-\u0556\u0559\u0561-\u0587\u05D0-\u05EA\u05F0-\u05F2\u0620-\u064A\u066E\u066F\u0671-\u06D3\u06D5\u06E5\u06E6\u06EE\u06EF\u06FA-\u06FC\u06FF\u0710\u0712-\u072F\u074D-\u07A5\u07B1\u07CA-\u07EA\u07F4\u07F5\u07FA\u0800-\u0815\u081A\u0824\u0828\u0840-\u0858\u08A0\u08A2-\u08AC\u0904-\u0939\u093D\u0950\u0958-\u0961\u0971-\u0977\u0979-\u097F\u0985-\u098C\u098F\u0990\u0993-\u09A8\u09AA-\u09B0\u09B2\u09B6-\u09B9\u09BD\u09CE\u09DC\u09DD\u09DF-\u09E1\u09F0\u09F1\u0A05-\u0A0A\u0A0F\u0A10\u0A13-\u0A28\u0A2A-\u0A30\u0A32\u0A33\u0A35\u0A36\u0A38\u0A39\u0A59-\u0A5C\u0A5E\u0A72-\u0A74\u0A85-\u0A8D\u0A8F-\u0A91\u0A93-\u0AA8\u0AAA-\u0AB0\u0AB2\u0AB3\u0AB5-\u0AB9\u0ABD\u0AD0\u0AE0\u0AE1\u0B05-\u0B0C\u0B0F\u0B10\u0B13-\u0B28\u0B2A-\u0B30\u0B32\u0B33\u0B35-\u0B39\u0B3D\u0B5C\u0B5D\u0B5F-\u0B61\u0B71\u0B83\u0B85-\u0B8A\u0B8E-\u0B90\u0B92-\u0B95\u0B99\u0B9A\u0B9C\u0B9E\u0B9F\u0BA3\u0BA4\u0BA8-\u0BAA\u0BAE-\u0BB9\u0BD0\u0C05-\u0C0C\u0C0E-\u0C10\u0C12-\u0C28\u0C2A-\u0C33\u0C35-\u0C39\u0C3D\u0C58\u0C59\u0C60\u0C61\u0C85-\u0C8C\u0C8E-\u0C90\u0C92-\u0CA8\u0CAA-\u0CB3\u0CB5-\u0CB9\u0CBD\u0CDE\u0CE0\u0CE1\u0CF1\u0CF2\u0D05-\u0D0C\u0D0E-\u0D10\u0D12-\u0D3A\u0D3D\u0D4E\u0D60\u0D61\u0D7A-\u0D7F\u0D85-\u0D96\u0D9A-\u0DB1\u0DB3-\u0DBB\u0DBD\u0DC0-\u0DC6\u0E01-\u0E30\u0E32\u0E33\u0E40-\u0E46\u0E81\u0E82\u0E84\u0E87\u0E88\u0E8A\u0E8D\u0E94-\u0E97\u0E99-\u0E9F\u0EA1-\u0EA3\u0EA5\u0EA7\u0EAA\u0EAB\u0EAD-\u0EB0\u0EB2\u0EB3\u0EBD\u0EC0-\u0EC4\u0EC6\u0EDC-\u0EDF\u0F00\u0F40-\u0F47\u0F49-\u0F6C\u0F88-\u0F8C\u1000-\u102A\u103F\u1050-\u1055\u105A-\u105D\u1061\u1065\u1066\u106E-\u1070\u1075-\u1081\u108E\u10A0-\u10C5\u10C7\u10CD\u10D0-\u10FA\u10FC-\u1248\u124A-\u124D\u1250-\u1256\u1258\u125A-\u125D\u1260-\u1288\u128A-\u128D\u1290-\u12B0\u12B2-\u12B5\u12B8-\u12BE\u12C0\u12C2-\u12C5\u12C8-\u12D6\u12D8-\u1310\u1312-\u1315\u1318-\u135A\u1380-\u138F\u13A0-\u13F4\u1401-\u166C\u166F-\u167F\u1681-\u169A\u16A0-\u16EA\u16EE-\u16F0\u1700-\u170C\u170E-\u1711\u1720-\u1731\u1740-\u1751\u1760-\u176C\u176E-\u1770\u1780-\u17B3\u17D7\u17DC\u1820-\u1877\u1880-\u18A8\u18AA\u18B0-\u18F5\u1900-\u191C\u1950-\u196D\u1970-\u1974\u1980-\u19AB\u19C1-\u19C7\u1A00-\u1A16\u1A20-\u1A54\u1AA7\u1B05-\u1B33\u1B45-\u1B4B\u1B83-\u1BA0\u1BAE\u1BAF\u1BBA-\u1BE5\u1C00-\u1C23\u1C4D-\u1C4F\u1C5A-\u1C7D\u1CE9-\u1CEC\u1CEE-\u1CF1\u1CF5\u1CF6\u1D00-\u1DBF\u1E00-\u1F15\u1F18-\u1F1D\u1F20-\u1F45\u1F48-\u1F4D\u1F50-\u1F57\u1F59\u1F5B\u1F5D\u1F5F-\u1F7D\u1F80-\u1FB4\u1FB6-\u1FBC\u1FBE\u1FC2-\u1FC4\u1FC6-\u1FCC\u1FD0-\u1FD3\u1FD6-\u1FDB\u1FE0-\u1FEC\u1FF2-\u1FF4\u1FF6-\u1FFC\u2071\u207F\u2090-\u209C\u2102\u2107\u210A-\u2113\u2115\u2119-\u211D\u2124\u2126\u2128\u212A-\u212D\u212F-\u2139\u213C-\u213F\u2145-\u2149\u214E\u2160-\u2188\u2C00-\u2C2E\u2C30-\u2C5E\u2C60-\u2CE4\u2CEB-\u2CEE\u2CF2\u2CF3\u2D00-\u2D25\u2D27\u2D2D\u2D30-\u2D67\u2D6F\u2D80-\u2D96\u2DA0-\u2DA6\u2DA8-\u2DAE\u2DB0-\u2DB6\u2DB8-\u2DBE\u2DC0-\u2DC6\u2DC8-\u2DCE\u2DD0-\u2DD6\u2DD8-\u2DDE\u2E2F\u3005-\u3007\u3021-\u3029\u3031-\u3035\u3038-\u303C\u3041-\u3096\u309D-\u309F\u30A1-\u30FA\u30FC-\u30FF\u3105-\u312D\u3131-\u318E\u31A0-\u31BA\u31F0-\u31FF\u3400-\u4DB5\u4E00-\u9FCC\uA000-\uA48C\uA4D0-\uA4FD\uA500-\uA60C\uA610-\uA61F\uA62A\uA62B\uA640-\uA66E\uA67F-\uA697\uA6A0-\uA6EF\uA717-\uA71F\uA722-\uA788\uA78B-\uA78E\uA790-\uA793\uA7A0-\uA7AA\uA7F8-\uA801\uA803-\uA805\uA807-\uA80A\uA80C-\uA822\uA840-\uA873\uA882-\uA8B3\uA8F2-\uA8F7\uA8FB\uA90A-\uA925\uA930-\uA946\uA960-\uA97C\uA984-\uA9B2\uA9CF\uAA00-\uAA28\uAA40-\uAA42\uAA44-\uAA4B\uAA60-\uAA76\uAA7A\uAA80-\uAAAF\uAAB1\uAAB5\uAAB6\uAAB9-\uAABD\uAAC0\uAAC2\uAADB-\uAADD\uAAE0-\uAAEA\uAAF2-\uAAF4\uAB01-\uAB06\uAB09-\uAB0E\uAB11-\uAB16\uAB20-\uAB26\uAB28-\uAB2E\uABC0-\uABE2\uAC00-\uD7A3\uD7B0-\uD7C6\uD7CB-\uD7FB\uF900-\uFA6D\uFA70-\uFAD9\uFB00-\uFB06\uFB13-\uFB17\uFB1D\uFB1F-\uFB28\uFB2A-\uFB36\uFB38-\uFB3C\uFB3E\uFB40\uFB41\uFB43\uFB44\uFB46-\uFBB1\uFBD3-\uFD3D\uFD50-\uFD8F\uFD92-\uFDC7\uFDF0-\uFDFB\uFE70-\uFE74\uFE76-\uFEFC\uFF21-\uFF3A\uFF41-\uFF5A\uFF66-\uFFBE\uFFC2-\uFFC7\uFFCA-\uFFCF\uFFD2-\uFFD7\uFFDA-\uFFDC';
        var nonASCIIidentifierChars = '\u0300-\u036F\u0483-\u0487\u0591-\u05BD\u05BF\u05C1\u05C2\u05C4\u05C5\u05C7\u0610-\u061A\u0620-\u0649\u0672-\u06D3\u06E7-\u06E8\u06FB-\u06FC\u0730-\u074A\u0800-\u0814\u081B-\u0823\u0825-\u0827\u0829-\u082D\u0840-\u0857\u08E4-\u08FE\u0900-\u0903\u093A-\u093C\u093E-\u094F\u0951-\u0957\u0962-\u0963\u0966-\u096F\u0981-\u0983\u09BC\u09BE-\u09C4\u09C7\u09C8\u09D7\u09DF-\u09E0\u0A01-\u0A03\u0A3C\u0A3E-\u0A42\u0A47\u0A48\u0A4B-\u0A4D\u0A51\u0A66-\u0A71\u0A75\u0A81-\u0A83\u0ABC\u0ABE-\u0AC5\u0AC7-\u0AC9\u0ACB-\u0ACD\u0AE2-\u0AE3\u0AE6-\u0AEF\u0B01-\u0B03\u0B3C\u0B3E-\u0B44\u0B47\u0B48\u0B4B-\u0B4D\u0B56\u0B57\u0B5F-\u0B60\u0B66-\u0B6F\u0B82\u0BBE-\u0BC2\u0BC6-\u0BC8\u0BCA-\u0BCD\u0BD7\u0BE6-\u0BEF\u0C01-\u0C03\u0C46-\u0C48\u0C4A-\u0C4D\u0C55\u0C56\u0C62-\u0C63\u0C66-\u0C6F\u0C82\u0C83\u0CBC\u0CBE-\u0CC4\u0CC6-\u0CC8\u0CCA-\u0CCD\u0CD5\u0CD6\u0CE2-\u0CE3\u0CE6-\u0CEF\u0D02\u0D03\u0D46-\u0D48\u0D57\u0D62-\u0D63\u0D66-\u0D6F\u0D82\u0D83\u0DCA\u0DCF-\u0DD4\u0DD6\u0DD8-\u0DDF\u0DF2\u0DF3\u0E34-\u0E3A\u0E40-\u0E45\u0E50-\u0E59\u0EB4-\u0EB9\u0EC8-\u0ECD\u0ED0-\u0ED9\u0F18\u0F19\u0F20-\u0F29\u0F35\u0F37\u0F39\u0F41-\u0F47\u0F71-\u0F84\u0F86-\u0F87\u0F8D-\u0F97\u0F99-\u0FBC\u0FC6\u1000-\u1029\u1040-\u1049\u1067-\u106D\u1071-\u1074\u1082-\u108D\u108F-\u109D\u135D-\u135F\u170E-\u1710\u1720-\u1730\u1740-\u1750\u1772\u1773\u1780-\u17B2\u17DD\u17E0-\u17E9\u180B-\u180D\u1810-\u1819\u1920-\u192B\u1930-\u193B\u1951-\u196D\u19B0-\u19C0\u19C8-\u19C9\u19D0-\u19D9\u1A00-\u1A15\u1A20-\u1A53\u1A60-\u1A7C\u1A7F-\u1A89\u1A90-\u1A99\u1B46-\u1B4B\u1B50-\u1B59\u1B6B-\u1B73\u1BB0-\u1BB9\u1BE6-\u1BF3\u1C00-\u1C22\u1C40-\u1C49\u1C5B-\u1C7D\u1CD0-\u1CD2\u1D00-\u1DBE\u1E01-\u1F15\u200C\u200D\u203F\u2040\u2054\u20D0-\u20DC\u20E1\u20E5-\u20F0\u2D81-\u2D96\u2DE0-\u2DFF\u3021-\u3028\u3099\u309A\uA640-\uA66D\uA674-\uA67D\uA69F\uA6F0-\uA6F1\uA7F8-\uA800\uA806\uA80B\uA823-\uA827\uA880-\uA881\uA8B4-\uA8C4\uA8D0-\uA8D9\uA8F3-\uA8F7\uA900-\uA909\uA926-\uA92D\uA930-\uA945\uA980-\uA983\uA9B3-\uA9C0\uAA00-\uAA27\uAA40-\uAA41\uAA4C-\uAA4D\uAA50-\uAA59\uAA7B\uAAE0-\uAAE9\uAAF2-\uAAF3\uABC0-\uABE1\uABEC\uABED\uABF0-\uABF9\uFB20-\uFB28\uFE00-\uFE0F\uFE20-\uFE26\uFE33\uFE34\uFE4D-\uFE4F\uFF10-\uFF19\uFF3F';
        var nonASCIIidentifierStart = new RegExp("[" + nonASCIIidentifierStartChars + "]");
        var nonASCIIidentifier = new RegExp("[" + nonASCIIidentifierStartChars + nonASCIIidentifierChars + "]");

        // Whether a single character denotes a newline.

        exports.newline = /[\n\r\u2028\u2029]/;

        // Matches a whole line break (where CRLF is considered a single
        // line break). Used to count lines.

        // in javascript, these two differ
        // in python they are the same, different methods are called on them
        exports.lineBreak = new RegExp('\r\n|' + exports.newline.source);
        exports.allLineBreaks = new RegExp(exports.lineBreak.source, 'g');

        // Test whether a given character code starts an identifier.

        exports.isIdentifierStart = function (code) {
            // permit $ (36) and @ (64). @ is used in ES7 decorators.
            if (code < 65) return code === 36 || code === 64;
            // 65 through 91 are uppercase letters.
            if (code < 91) return true;
            // permit _ (95).
            if (code < 97) return code === 95;
            // 97 through 123 are lowercase letters.
            if (code < 123) return true;
            return code >= 0xaa && nonASCIIidentifierStart.test(String.fromCharCode(code));
        };

        // Test whether a given character is part of an identifier.

        exports.isIdentifierChar = function (code) {
            if (code < 48) return code === 36;
            if (code < 58) return true;
            if (code < 65) return false;
            if (code < 91) return true;
            if (code < 97) return code === 95;
            if (code < 123) return true;
            return code >= 0xaa && nonASCIIidentifier.test(String.fromCharCode(code));
        };

        /***/
    },
    /* 2 */
    /***/function (module, exports) {

        /*jshint curly:true, eqeqeq:true, laxbreak:true, noempty:false */
        /*
        
            The MIT License (MIT)
        
            Copyright (c) 2007-2017 Einar Lielmanis, Liam Newman, and contributors.
        
            Permission is hereby granted, free of charge, to any person
            obtaining a copy of this software and associated documentation files
            (the "Software"), to deal in the Software without restriction,
            including without limitation the rights to use, copy, modify, merge,
            publish, distribute, sublicense, and/or sell copies of the Software,
            and to permit persons to whom the Software is furnished to do so,
            subject to the following conditions:
        
            The above copyright notice and this permission notice shall be
            included in all copies or substantial portions of the Software.
        
            THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
            EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
            MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
            NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS
            BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN
            ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN
            CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
            SOFTWARE.
        */

        function mergeOpts(allOptions, targetType) {
            var finalOpts = {};
            var name;

            for (name in allOptions) {
                if (name !== targetType) {
                    finalOpts[name] = allOptions[name];
                }
            }

            //merge in the per type settings for the targetType
            if (targetType in allOptions) {
                for (name in allOptions[targetType]) {
                    finalOpts[name] = allOptions[targetType][name];
                }
            }
            return finalOpts;
        }

        module.exports.mergeOpts = mergeOpts;

        /***/
    },
    /* 3 */
    /***/function (module, exports, __webpack_require__) {

        /*jshint curly:true, eqeqeq:true, laxbreak:true, noempty:false */
        /*
        
            The MIT License (MIT)
        
            Copyright (c) 2007-2017 Einar Lielmanis, Liam Newman, and contributors.
        
            Permission is hereby granted, free of charge, to any person
            obtaining a copy of this software and associated documentation files
            (the "Software"), to deal in the Software without restriction,
            including without limitation the rights to use, copy, modify, merge,
            publish, distribute, sublicense, and/or sell copies of the Software,
            and to permit persons to whom the Software is furnished to do so,
            subject to the following conditions:
        
            The above copyright notice and this permission notice shall be
            included in all copies or substantial portions of the Software.
        
            THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
            EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
            MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
            NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS
            BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN
            ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN
            CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
            SOFTWARE.
        */

        var Beautifier = __webpack_require__(0).Beautifier;

        function style_html(html_source, options, js_beautify, css_beautify) {
            var beautifier = new Beautifier(html_source, options, js_beautify, css_beautify);
            return beautifier.beautify();
        }

        module.exports = style_html;

        /***/
    }]
    /******/);
    var style_html = legacy_beautify_html;
    /* Footer */
    if (true) {
        // Add support for AMD ( https://github.com/amdjs/amdjs-api/wiki/AMD#defineamd-property- )
        !(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__, __webpack_require__(57), __webpack_require__(56)], __WEBPACK_AMD_DEFINE_RESULT__ = function (requireamd) {
            var js_beautify = __webpack_require__(57);
            var css_beautify = __webpack_require__(56);

            return {
                html_beautify: function html_beautify(html_source, options) {
                    return style_html(html_source, options, js_beautify.js_beautify, css_beautify.css_beautify);
                }
            };
        }.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
    } else if (typeof exports !== "undefined") {
        // Add support for CommonJS. Just put this file somewhere on your require.paths
        // and you will be able to `var html_beautify = require("beautify").html_beautify`.
        var js_beautify = require('./beautify.js');
        var css_beautify = require('./beautify-css.js');

        exports.html_beautify = function (html_source, options) {
            return style_html(html_source, options, js_beautify.js_beautify, css_beautify.css_beautify);
        };
    } else if (typeof window !== "undefined") {
        // If we're running a web page and don't have either of the above, add our one global
        window.html_beautify = function (html_source, options) {
            return style_html(html_source, options, window.js_beautify, window.css_beautify);
        };
    } else if (typeof global !== "undefined") {
        // If we don't even have window, try global.
        global.html_beautify = function (html_source, options) {
            return style_html(html_source, options, global.js_beautify, global.css_beautify);
        };
    }
})();

/***/ }),
/* 84 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.ScannerState = exports.TokenType = exports.DocumentLink = exports.MarkedString = exports.FormattingOptions = exports.DocumentHighlight = exports.TextEdit = exports.Diagnostic = exports.SymbolInformation = exports.Range = exports.CompletionList = exports.CompletionItem = exports.Position = exports.TextDocument = undefined;
exports.getLanguageService = getLanguageService;

var _htmlScanner = __webpack_require__(40);

var _htmlParser = __webpack_require__(86);

var _htmlCompletion = __webpack_require__(88);

var _htmlHover = __webpack_require__(91);

var _htmlFormatter = __webpack_require__(89);

var _htmlLinks = __webpack_require__(92);

var _htmlHighlighting = __webpack_require__(90);

var _htmlSymbolsProvider = __webpack_require__(93);

var _main = __webpack_require__(36);

exports.TextDocument = _main.TextDocument;
exports.Position = _main.Position;
exports.CompletionItem = _main.CompletionItem;
exports.CompletionList = _main.CompletionList;
exports.Range = _main.Range;
exports.SymbolInformation = _main.SymbolInformation;
exports.Diagnostic = _main.Diagnostic;
exports.TextEdit = _main.TextEdit;
exports.DocumentHighlight = _main.DocumentHighlight;
exports.FormattingOptions = _main.FormattingOptions;
exports.MarkedString = _main.MarkedString;
exports.DocumentLink = _main.DocumentLink;
var TokenType = exports.TokenType = undefined;
(function (TokenType) {
    TokenType[TokenType["StartCommentTag"] = 0] = "StartCommentTag";
    TokenType[TokenType["Comment"] = 1] = "Comment";
    TokenType[TokenType["EndCommentTag"] = 2] = "EndCommentTag";
    TokenType[TokenType["StartTagOpen"] = 3] = "StartTagOpen";
    TokenType[TokenType["StartTagClose"] = 4] = "StartTagClose";
    TokenType[TokenType["StartTagSelfClose"] = 5] = "StartTagSelfClose";
    TokenType[TokenType["StartTag"] = 6] = "StartTag";
    TokenType[TokenType["EndTagOpen"] = 7] = "EndTagOpen";
    TokenType[TokenType["EndTagClose"] = 8] = "EndTagClose";
    TokenType[TokenType["EndTag"] = 9] = "EndTag";
    TokenType[TokenType["DelimiterAssign"] = 10] = "DelimiterAssign";
    TokenType[TokenType["AttributeName"] = 11] = "AttributeName";
    TokenType[TokenType["AttributeValue"] = 12] = "AttributeValue";
    TokenType[TokenType["StartDoctypeTag"] = 13] = "StartDoctypeTag";
    TokenType[TokenType["Doctype"] = 14] = "Doctype";
    TokenType[TokenType["EndDoctypeTag"] = 15] = "EndDoctypeTag";
    TokenType[TokenType["Content"] = 16] = "Content";
    TokenType[TokenType["Whitespace"] = 17] = "Whitespace";
    TokenType[TokenType["Unknown"] = 18] = "Unknown";
    TokenType[TokenType["Script"] = 19] = "Script";
    TokenType[TokenType["Styles"] = 20] = "Styles";
    TokenType[TokenType["EOS"] = 21] = "EOS";
})(TokenType || (exports.TokenType = TokenType = {}));
var ScannerState = exports.ScannerState = undefined;
(function (ScannerState) {
    ScannerState[ScannerState["WithinContent"] = 0] = "WithinContent";
    ScannerState[ScannerState["AfterOpeningStartTag"] = 1] = "AfterOpeningStartTag";
    ScannerState[ScannerState["AfterOpeningEndTag"] = 2] = "AfterOpeningEndTag";
    ScannerState[ScannerState["WithinDoctype"] = 3] = "WithinDoctype";
    ScannerState[ScannerState["WithinTag"] = 4] = "WithinTag";
    ScannerState[ScannerState["WithinEndTag"] = 5] = "WithinEndTag";
    ScannerState[ScannerState["WithinComment"] = 6] = "WithinComment";
    ScannerState[ScannerState["WithinScriptContent"] = 7] = "WithinScriptContent";
    ScannerState[ScannerState["WithinStyleContent"] = 8] = "WithinStyleContent";
    ScannerState[ScannerState["AfterAttributeName"] = 9] = "AfterAttributeName";
    ScannerState[ScannerState["BeforeAttributeValue"] = 10] = "BeforeAttributeValue";
})(ScannerState || (exports.ScannerState = ScannerState = {}));
function getLanguageService() {
    var htmlCompletion = new _htmlCompletion.HTMLCompletion();
    return {
        createScanner: _htmlScanner.createScanner,
        parseHTMLDocument: function parseHTMLDocument(document) {
            return (0, _htmlParser.parse)(document.getText());
        },
        doComplete: htmlCompletion.doComplete.bind(htmlCompletion),
        setCompletionParticipants: htmlCompletion.setCompletionParticipants.bind(htmlCompletion),
        doHover: _htmlHover.doHover,
        format: _htmlFormatter.format,
        findDocumentHighlights: _htmlHighlighting.findDocumentHighlights,
        findDocumentLinks: _htmlLinks.findDocumentLinks,
        findDocumentSymbols: _htmlSymbolsProvider.findDocumentSymbols,
        doTagComplete: htmlCompletion.doTagComplete.bind(htmlCompletion)
    };
}
//# sourceMappingURL=htmlLanguageService.js.map

/***/ }),
/* 85 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/

/**
 * HTML 5 character entities
 * https://www.w3.org/TR/html5/syntax.html#named-character-references
 */

Object.defineProperty(exports, "__esModule", {
  value: true
});
var entities = exports.entities = {
  "Aacute;": "\xC1",
  "Aacute": "\xC1",
  "aacute;": "\xE1",
  "aacute": "\xE1",
  "Abreve;": "\u0102",
  "abreve;": "\u0103",
  "ac;": "\u223E",
  "acd;": "\u223F",
  "acE;": "\u223E\u0333",
  "Acirc;": "\xC2",
  "Acirc": "\xC2",
  "acirc;": "\xE2",
  "acirc": "\xE2",
  "acute;": "\xB4",
  "acute": "\xB4",
  "Acy;": "\u0410",
  "acy;": "\u0430",
  "AElig;": "\xC6",
  "AElig": "\xC6",
  "aelig;": "\xE6",
  "aelig": "\xE6",
  "af;": "\u2061",
  "Afr;": "\uD835\uDD04",
  "afr;": "\uD835\uDD1E",
  "Agrave;": "\xC0",
  "Agrave": "\xC0",
  "agrave;": "\xE0",
  "agrave": "\xE0",
  "alefsym;": "\u2135",
  "aleph;": "\u2135",
  "Alpha;": "\u0391",
  "alpha;": "\u03B1",
  "Amacr;": "\u0100",
  "amacr;": "\u0101",
  "amalg;": "\u2A3F",
  "AMP;": "&",
  "AMP": "&",
  "amp;": "&",
  "amp": "&",
  "And;": "\u2A53",
  "and;": "\u2227",
  "andand;": "\u2A55",
  "andd;": "\u2A5C",
  "andslope;": "\u2A58",
  "andv;": "\u2A5A",
  "ang;": "\u2220",
  "ange;": "\u29A4",
  "angle;": "\u2220",
  "angmsd;": "\u2221",
  "angmsdaa;": "\u29A8",
  "angmsdab;": "\u29A9",
  "angmsdac;": "\u29AA",
  "angmsdad;": "\u29AB",
  "angmsdae;": "\u29AC",
  "angmsdaf;": "\u29AD",
  "angmsdag;": "\u29AE",
  "angmsdah;": "\u29AF",
  "angrt;": "\u221F",
  "angrtvb;": "\u22BE",
  "angrtvbd;": "\u299D",
  "angsph;": "\u2222",
  "angst;": "\xC5",
  "angzarr;": "\u237C",
  "Aogon;": "\u0104",
  "aogon;": "\u0105",
  "Aopf;": "\uD835\uDD38",
  "aopf;": "\uD835\uDD52",
  "ap;": "\u2248",
  "apacir;": "\u2A6F",
  "apE;": "\u2A70",
  "ape;": "\u224A",
  "apid;": "\u224B",
  "apos;": "'",
  "ApplyFunction;": "\u2061",
  "approx;": "\u2248",
  "approxeq;": "\u224A",
  "Aring;": "\xC5",
  "Aring": "\xC5",
  "aring;": "\xE5",
  "aring": "\xE5",
  "Ascr;": "\uD835\uDC9C",
  "ascr;": "\uD835\uDCB6",
  "Assign;": "\u2254",
  "ast;": "*",
  "asymp;": "\u2248",
  "asympeq;": "\u224D",
  "Atilde;": "\xC3",
  "Atilde": "\xC3",
  "atilde;": "\xE3",
  "atilde": "\xE3",
  "Auml;": "\xC4",
  "Auml": "\xC4",
  "auml;": "\xE4",
  "auml": "\xE4",
  "awconint;": "\u2233",
  "awint;": "\u2A11",
  "backcong;": "\u224C",
  "backepsilon;": "\u03F6",
  "backprime;": "\u2035",
  "backsim;": "\u223D",
  "backsimeq;": "\u22CD",
  "Backslash;": "\u2216",
  "Barv;": "\u2AE7",
  "barvee;": "\u22BD",
  "Barwed;": "\u2306",
  "barwed;": "\u2305",
  "barwedge;": "\u2305",
  "bbrk;": "\u23B5",
  "bbrktbrk;": "\u23B6",
  "bcong;": "\u224C",
  "Bcy;": "\u0411",
  "bcy;": "\u0431",
  "bdquo;": "\u201E",
  "becaus;": "\u2235",
  "Because;": "\u2235",
  "because;": "\u2235",
  "bemptyv;": "\u29B0",
  "bepsi;": "\u03F6",
  "bernou;": "\u212C",
  "Bernoullis;": "\u212C",
  "Beta;": "\u0392",
  "beta;": "\u03B2",
  "beth;": "\u2136",
  "between;": "\u226C",
  "Bfr;": "\uD835\uDD05",
  "bfr;": "\uD835\uDD1F",
  "bigcap;": "\u22C2",
  "bigcirc;": "\u25EF",
  "bigcup;": "\u22C3",
  "bigodot;": "\u2A00",
  "bigoplus;": "\u2A01",
  "bigotimes;": "\u2A02",
  "bigsqcup;": "\u2A06",
  "bigstar;": "\u2605",
  "bigtriangledown;": "\u25BD",
  "bigtriangleup;": "\u25B3",
  "biguplus;": "\u2A04",
  "bigvee;": "\u22C1",
  "bigwedge;": "\u22C0",
  "bkarow;": "\u290D",
  "blacklozenge;": "\u29EB",
  "blacksquare;": "\u25AA",
  "blacktriangle;": "\u25B4",
  "blacktriangledown;": "\u25BE",
  "blacktriangleleft;": "\u25C2",
  "blacktriangleright;": "\u25B8",
  "blank;": "\u2423",
  "blk12;": "\u2592",
  "blk14;": "\u2591",
  "blk34;": "\u2593",
  "block;": "\u2588",
  "bne;": "=\u20E5",
  "bnequiv;": "\u2261\u20E5",
  "bNot;": "\u2AED",
  "bnot;": "\u2310",
  "Bopf;": "\uD835\uDD39",
  "bopf;": "\uD835\uDD53",
  "bot;": "\u22A5",
  "bottom;": "\u22A5",
  "bowtie;": "\u22C8",
  "boxbox;": "\u29C9",
  "boxDL;": "\u2557",
  "boxDl;": "\u2556",
  "boxdL;": "\u2555",
  "boxdl;": "\u2510",
  "boxDR;": "\u2554",
  "boxDr;": "\u2553",
  "boxdR;": "\u2552",
  "boxdr;": "\u250C",
  "boxH;": "\u2550",
  "boxh;": "\u2500",
  "boxHD;": "\u2566",
  "boxHd;": "\u2564",
  "boxhD;": "\u2565",
  "boxhd;": "\u252C",
  "boxHU;": "\u2569",
  "boxHu;": "\u2567",
  "boxhU;": "\u2568",
  "boxhu;": "\u2534",
  "boxminus;": "\u229F",
  "boxplus;": "\u229E",
  "boxtimes;": "\u22A0",
  "boxUL;": "\u255D",
  "boxUl;": "\u255C",
  "boxuL;": "\u255B",
  "boxul;": "\u2518",
  "boxUR;": "\u255A",
  "boxUr;": "\u2559",
  "boxuR;": "\u2558",
  "boxur;": "\u2514",
  "boxV;": "\u2551",
  "boxv;": "\u2502",
  "boxVH;": "\u256C",
  "boxVh;": "\u256B",
  "boxvH;": "\u256A",
  "boxvh;": "\u253C",
  "boxVL;": "\u2563",
  "boxVl;": "\u2562",
  "boxvL;": "\u2561",
  "boxvl;": "\u2524",
  "boxVR;": "\u2560",
  "boxVr;": "\u255F",
  "boxvR;": "\u255E",
  "boxvr;": "\u251C",
  "bprime;": "\u2035",
  "Breve;": "\u02D8",
  "breve;": "\u02D8",
  "brvbar;": "\xA6",
  "brvbar": "\xA6",
  "Bscr;": "\u212C",
  "bscr;": "\uD835\uDCB7",
  "bsemi;": "\u204F",
  "bsim;": "\u223D",
  "bsime;": "\u22CD",
  "bsol;": "\\",
  "bsolb;": "\u29C5",
  "bsolhsub;": "\u27C8",
  "bull;": "\u2022",
  "bullet;": "\u2022",
  "bump;": "\u224E",
  "bumpE;": "\u2AAE",
  "bumpe;": "\u224F",
  "Bumpeq;": "\u224E",
  "bumpeq;": "\u224F",
  "Cacute;": "\u0106",
  "cacute;": "\u0107",
  "Cap;": "\u22D2",
  "cap;": "\u2229",
  "capand;": "\u2A44",
  "capbrcup;": "\u2A49",
  "capcap;": "\u2A4B",
  "capcup;": "\u2A47",
  "capdot;": "\u2A40",
  "CapitalDifferentialD;": "\u2145",
  "caps;": "\u2229\uFE00",
  "caret;": "\u2041",
  "caron;": "\u02C7",
  "Cayleys;": "\u212D",
  "ccaps;": "\u2A4D",
  "Ccaron;": "\u010C",
  "ccaron;": "\u010D",
  "Ccedil;": "\xC7",
  "Ccedil": "\xC7",
  "ccedil;": "\xE7",
  "ccedil": "\xE7",
  "Ccirc;": "\u0108",
  "ccirc;": "\u0109",
  "Cconint;": "\u2230",
  "ccups;": "\u2A4C",
  "ccupssm;": "\u2A50",
  "Cdot;": "\u010A",
  "cdot;": "\u010B",
  "cedil;": "\xB8",
  "cedil": "\xB8",
  "Cedilla;": "\xB8",
  "cemptyv;": "\u29B2",
  "cent;": "\xA2",
  "cent": "\xA2",
  "CenterDot;": "\xB7",
  "centerdot;": "\xB7",
  "Cfr;": "\u212D",
  "cfr;": "\uD835\uDD20",
  "CHcy;": "\u0427",
  "chcy;": "\u0447",
  "check;": "\u2713",
  "checkmark;": "\u2713",
  "Chi;": "\u03A7",
  "chi;": "\u03C7",
  "cir;": "\u25CB",
  "circ;": "\u02C6",
  "circeq;": "\u2257",
  "circlearrowleft;": "\u21BA",
  "circlearrowright;": "\u21BB",
  "circledast;": "\u229B",
  "circledcirc;": "\u229A",
  "circleddash;": "\u229D",
  "CircleDot;": "\u2299",
  "circledR;": "\xAE",
  "circledS;": "\u24C8",
  "CircleMinus;": "\u2296",
  "CirclePlus;": "\u2295",
  "CircleTimes;": "\u2297",
  "cirE;": "\u29C3",
  "cire;": "\u2257",
  "cirfnint;": "\u2A10",
  "cirmid;": "\u2AEF",
  "cirscir;": "\u29C2",
  "ClockwiseContourIntegral;": "\u2232",
  "CloseCurlyDoubleQuote;": "\u201D",
  "CloseCurlyQuote;": "\u2019",
  "clubs;": "\u2663",
  "clubsuit;": "\u2663",
  "Colon;": "\u2237",
  "colon;": ":",
  "Colone;": "\u2A74",
  "colone;": "\u2254",
  "coloneq;": "\u2254",
  "comma;": ",",
  "commat;": "@",
  "comp;": "\u2201",
  "compfn;": "\u2218",
  "complement;": "\u2201",
  "complexes;": "\u2102",
  "cong;": "\u2245",
  "congdot;": "\u2A6D",
  "Congruent;": "\u2261",
  "Conint;": "\u222F",
  "conint;": "\u222E",
  "ContourIntegral;": "\u222E",
  "Copf;": "\u2102",
  "copf;": "\uD835\uDD54",
  "coprod;": "\u2210",
  "Coproduct;": "\u2210",
  "COPY;": "\xA9",
  "COPY": "\xA9",
  "copy;": "\xA9",
  "copy": "\xA9",
  "copysr;": "\u2117",
  "CounterClockwiseContourIntegral;": "\u2233",
  "crarr;": "\u21B5",
  "Cross;": "\u2A2F",
  "cross;": "\u2717",
  "Cscr;": "\uD835\uDC9E",
  "cscr;": "\uD835\uDCB8",
  "csub;": "\u2ACF",
  "csube;": "\u2AD1",
  "csup;": "\u2AD0",
  "csupe;": "\u2AD2",
  "ctdot;": "\u22EF",
  "cudarrl;": "\u2938",
  "cudarrr;": "\u2935",
  "cuepr;": "\u22DE",
  "cuesc;": "\u22DF",
  "cularr;": "\u21B6",
  "cularrp;": "\u293D",
  "Cup;": "\u22D3",
  "cup;": "\u222A",
  "cupbrcap;": "\u2A48",
  "CupCap;": "\u224D",
  "cupcap;": "\u2A46",
  "cupcup;": "\u2A4A",
  "cupdot;": "\u228D",
  "cupor;": "\u2A45",
  "cups;": "\u222A\uFE00",
  "curarr;": "\u21B7",
  "curarrm;": "\u293C",
  "curlyeqprec;": "\u22DE",
  "curlyeqsucc;": "\u22DF",
  "curlyvee;": "\u22CE",
  "curlywedge;": "\u22CF",
  "curren;": "\xA4",
  "curren": "\xA4",
  "curvearrowleft;": "\u21B6",
  "curvearrowright;": "\u21B7",
  "cuvee;": "\u22CE",
  "cuwed;": "\u22CF",
  "cwconint;": "\u2232",
  "cwint;": "\u2231",
  "cylcty;": "\u232D",
  "Dagger;": "\u2021",
  "dagger;": "\u2020",
  "daleth;": "\u2138",
  "Darr;": "\u21A1",
  "dArr;": "\u21D3",
  "darr;": "\u2193",
  "dash;": "\u2010",
  "Dashv;": "\u2AE4",
  "dashv;": "\u22A3",
  "dbkarow;": "\u290F",
  "dblac;": "\u02DD",
  "Dcaron;": "\u010E",
  "dcaron;": "\u010F",
  "Dcy;": "\u0414",
  "dcy;": "\u0434",
  "DD;": "\u2145",
  "dd;": "\u2146",
  "ddagger;": "\u2021",
  "ddarr;": "\u21CA",
  "DDotrahd;": "\u2911",
  "ddotseq;": "\u2A77",
  "deg;": "\xB0",
  "deg": "\xB0",
  "Del;": "\u2207",
  "Delta;": "\u0394",
  "delta;": "\u03B4",
  "demptyv;": "\u29B1",
  "dfisht;": "\u297F",
  "Dfr;": "\uD835\uDD07",
  "dfr;": "\uD835\uDD21",
  "dHar;": "\u2965",
  "dharl;": "\u21C3",
  "dharr;": "\u21C2",
  "DiacriticalAcute;": "\xB4",
  "DiacriticalDot;": "\u02D9",
  "DiacriticalDoubleAcute;": "\u02DD",
  "DiacriticalGrave;": "`",
  "DiacriticalTilde;": "\u02DC",
  "diam;": "\u22C4",
  "Diamond;": "\u22C4",
  "diamond;": "\u22C4",
  "diamondsuit;": "\u2666",
  "diams;": "\u2666",
  "die;": "\xA8",
  "DifferentialD;": "\u2146",
  "digamma;": "\u03DD",
  "disin;": "\u22F2",
  "div;": "\xF7",
  "divide;": "\xF7",
  "divide": "\xF7",
  "divideontimes;": "\u22C7",
  "divonx;": "\u22C7",
  "DJcy;": "\u0402",
  "djcy;": "\u0452",
  "dlcorn;": "\u231E",
  "dlcrop;": "\u230D",
  "dollar;": "$",
  "Dopf;": "\uD835\uDD3B",
  "dopf;": "\uD835\uDD55",
  "Dot;": "\xA8",
  "dot;": "\u02D9",
  "DotDot;": "\u20DC",
  "doteq;": "\u2250",
  "doteqdot;": "\u2251",
  "DotEqual;": "\u2250",
  "dotminus;": "\u2238",
  "dotplus;": "\u2214",
  "dotsquare;": "\u22A1",
  "doublebarwedge;": "\u2306",
  "DoubleContourIntegral;": "\u222F",
  "DoubleDot;": "\xA8",
  "DoubleDownArrow;": "\u21D3",
  "DoubleLeftArrow;": "\u21D0",
  "DoubleLeftRightArrow;": "\u21D4",
  "DoubleLeftTee;": "\u2AE4",
  "DoubleLongLeftArrow;": "\u27F8",
  "DoubleLongLeftRightArrow;": "\u27FA",
  "DoubleLongRightArrow;": "\u27F9",
  "DoubleRightArrow;": "\u21D2",
  "DoubleRightTee;": "\u22A8",
  "DoubleUpArrow;": "\u21D1",
  "DoubleUpDownArrow;": "\u21D5",
  "DoubleVerticalBar;": "\u2225",
  "DownArrow;": "\u2193",
  "Downarrow;": "\u21D3",
  "downarrow;": "\u2193",
  "DownArrowBar;": "\u2913",
  "DownArrowUpArrow;": "\u21F5",
  "DownBreve;": "\u0311",
  "downdownarrows;": "\u21CA",
  "downharpoonleft;": "\u21C3",
  "downharpoonright;": "\u21C2",
  "DownLeftRightVector;": "\u2950",
  "DownLeftTeeVector;": "\u295E",
  "DownLeftVector;": "\u21BD",
  "DownLeftVectorBar;": "\u2956",
  "DownRightTeeVector;": "\u295F",
  "DownRightVector;": "\u21C1",
  "DownRightVectorBar;": "\u2957",
  "DownTee;": "\u22A4",
  "DownTeeArrow;": "\u21A7",
  "drbkarow;": "\u2910",
  "drcorn;": "\u231F",
  "drcrop;": "\u230C",
  "Dscr;": "\uD835\uDC9F",
  "dscr;": "\uD835\uDCB9",
  "DScy;": "\u0405",
  "dscy;": "\u0455",
  "dsol;": "\u29F6",
  "Dstrok;": "\u0110",
  "dstrok;": "\u0111",
  "dtdot;": "\u22F1",
  "dtri;": "\u25BF",
  "dtrif;": "\u25BE",
  "duarr;": "\u21F5",
  "duhar;": "\u296F",
  "dwangle;": "\u29A6",
  "DZcy;": "\u040F",
  "dzcy;": "\u045F",
  "dzigrarr;": "\u27FF",
  "Eacute;": "\xC9",
  "Eacute": "\xC9",
  "eacute;": "\xE9",
  "eacute": "\xE9",
  "easter;": "\u2A6E",
  "Ecaron;": "\u011A",
  "ecaron;": "\u011B",
  "ecir;": "\u2256",
  "Ecirc;": "\xCA",
  "Ecirc": "\xCA",
  "ecirc;": "\xEA",
  "ecirc": "\xEA",
  "ecolon;": "\u2255",
  "Ecy;": "\u042D",
  "ecy;": "\u044D",
  "eDDot;": "\u2A77",
  "Edot;": "\u0116",
  "eDot;": "\u2251",
  "edot;": "\u0117",
  "ee;": "\u2147",
  "efDot;": "\u2252",
  "Efr;": "\uD835\uDD08",
  "efr;": "\uD835\uDD22",
  "eg;": "\u2A9A",
  "Egrave;": "\xC8",
  "Egrave": "\xC8",
  "egrave;": "\xE8",
  "egrave": "\xE8",
  "egs;": "\u2A96",
  "egsdot;": "\u2A98",
  "el;": "\u2A99",
  "Element;": "\u2208",
  "elinters;": "\u23E7",
  "ell;": "\u2113",
  "els;": "\u2A95",
  "elsdot;": "\u2A97",
  "Emacr;": "\u0112",
  "emacr;": "\u0113",
  "empty;": "\u2205",
  "emptyset;": "\u2205",
  "EmptySmallSquare;": "\u25FB",
  "emptyv;": "\u2205",
  "EmptyVerySmallSquare;": "\u25AB",
  "emsp;": "\u2003",
  "emsp13;": "\u2004",
  "emsp14;": "\u2005",
  "ENG;": "\u014A",
  "eng;": "\u014B",
  "ensp;": "\u2002",
  "Eogon;": "\u0118",
  "eogon;": "\u0119",
  "Eopf;": "\uD835\uDD3C",
  "eopf;": "\uD835\uDD56",
  "epar;": "\u22D5",
  "eparsl;": "\u29E3",
  "eplus;": "\u2A71",
  "epsi;": "\u03B5",
  "Epsilon;": "\u0395",
  "epsilon;": "\u03B5",
  "epsiv;": "\u03F5",
  "eqcirc;": "\u2256",
  "eqcolon;": "\u2255",
  "eqsim;": "\u2242",
  "eqslantgtr;": "\u2A96",
  "eqslantless;": "\u2A95",
  "Equal;": "\u2A75",
  "equals;": "=",
  "EqualTilde;": "\u2242",
  "equest;": "\u225F",
  "Equilibrium;": "\u21CC",
  "equiv;": "\u2261",
  "equivDD;": "\u2A78",
  "eqvparsl;": "\u29E5",
  "erarr;": "\u2971",
  "erDot;": "\u2253",
  "Escr;": "\u2130",
  "escr;": "\u212F",
  "esdot;": "\u2250",
  "Esim;": "\u2A73",
  "esim;": "\u2242",
  "Eta;": "\u0397",
  "eta;": "\u03B7",
  "ETH;": "\xD0",
  "ETH": "\xD0",
  "eth;": "\xF0",
  "eth": "\xF0",
  "Euml;": "\xCB",
  "Euml": "\xCB",
  "euml;": "\xEB",
  "euml": "\xEB",
  "euro;": "\u20AC",
  "excl;": "!",
  "exist;": "\u2203",
  "Exists;": "\u2203",
  "expectation;": "\u2130",
  "ExponentialE;": "\u2147",
  "exponentiale;": "\u2147",
  "fallingdotseq;": "\u2252",
  "Fcy;": "\u0424",
  "fcy;": "\u0444",
  "female;": "\u2640",
  "ffilig;": "\uFB03",
  "fflig;": "\uFB00",
  "ffllig;": "\uFB04",
  "Ffr;": "\uD835\uDD09",
  "ffr;": "\uD835\uDD23",
  "filig;": "\uFB01",
  "FilledSmallSquare;": "\u25FC",
  "FilledVerySmallSquare;": "\u25AA",
  "fjlig;": "fj",
  "flat;": "\u266D",
  "fllig;": "\uFB02",
  "fltns;": "\u25B1",
  "fnof;": "\u0192",
  "Fopf;": "\uD835\uDD3D",
  "fopf;": "\uD835\uDD57",
  "ForAll;": "\u2200",
  "forall;": "\u2200",
  "fork;": "\u22D4",
  "forkv;": "\u2AD9",
  "Fouriertrf;": "\u2131",
  "fpartint;": "\u2A0D",
  "frac12;": "\xBD",
  "frac12": "\xBD",
  "frac13;": "\u2153",
  "frac14;": "\xBC",
  "frac14": "\xBC",
  "frac15;": "\u2155",
  "frac16;": "\u2159",
  "frac18;": "\u215B",
  "frac23;": "\u2154",
  "frac25;": "\u2156",
  "frac34;": "\xBE",
  "frac34": "\xBE",
  "frac35;": "\u2157",
  "frac38;": "\u215C",
  "frac45;": "\u2158",
  "frac56;": "\u215A",
  "frac58;": "\u215D",
  "frac78;": "\u215E",
  "frasl;": "\u2044",
  "frown;": "\u2322",
  "Fscr;": "\u2131",
  "fscr;": "\uD835\uDCBB",
  "gacute;": "\u01F5",
  "Gamma;": "\u0393",
  "gamma;": "\u03B3",
  "Gammad;": "\u03DC",
  "gammad;": "\u03DD",
  "gap;": "\u2A86",
  "Gbreve;": "\u011E",
  "gbreve;": "\u011F",
  "Gcedil;": "\u0122",
  "Gcirc;": "\u011C",
  "gcirc;": "\u011D",
  "Gcy;": "\u0413",
  "gcy;": "\u0433",
  "Gdot;": "\u0120",
  "gdot;": "\u0121",
  "gE;": "\u2267",
  "ge;": "\u2265",
  "gEl;": "\u2A8C",
  "gel;": "\u22DB",
  "geq;": "\u2265",
  "geqq;": "\u2267",
  "geqslant;": "\u2A7E",
  "ges;": "\u2A7E",
  "gescc;": "\u2AA9",
  "gesdot;": "\u2A80",
  "gesdoto;": "\u2A82",
  "gesdotol;": "\u2A84",
  "gesl;": "\u22DB\uFE00",
  "gesles;": "\u2A94",
  "Gfr;": "\uD835\uDD0A",
  "gfr;": "\uD835\uDD24",
  "Gg;": "\u22D9",
  "gg;": "\u226B",
  "ggg;": "\u22D9",
  "gimel;": "\u2137",
  "GJcy;": "\u0403",
  "gjcy;": "\u0453",
  "gl;": "\u2277",
  "gla;": "\u2AA5",
  "glE;": "\u2A92",
  "glj;": "\u2AA4",
  "gnap;": "\u2A8A",
  "gnapprox;": "\u2A8A",
  "gnE;": "\u2269",
  "gne;": "\u2A88",
  "gneq;": "\u2A88",
  "gneqq;": "\u2269",
  "gnsim;": "\u22E7",
  "Gopf;": "\uD835\uDD3E",
  "gopf;": "\uD835\uDD58",
  "grave;": "`",
  "GreaterEqual;": "\u2265",
  "GreaterEqualLess;": "\u22DB",
  "GreaterFullEqual;": "\u2267",
  "GreaterGreater;": "\u2AA2",
  "GreaterLess;": "\u2277",
  "GreaterSlantEqual;": "\u2A7E",
  "GreaterTilde;": "\u2273",
  "Gscr;": "\uD835\uDCA2",
  "gscr;": "\u210A",
  "gsim;": "\u2273",
  "gsime;": "\u2A8E",
  "gsiml;": "\u2A90",
  "GT;": ">",
  "GT": ">",
  "Gt;": "\u226B",
  "gt;": ">",
  "gt": ">",
  "gtcc;": "\u2AA7",
  "gtcir;": "\u2A7A",
  "gtdot;": "\u22D7",
  "gtlPar;": "\u2995",
  "gtquest;": "\u2A7C",
  "gtrapprox;": "\u2A86",
  "gtrarr;": "\u2978",
  "gtrdot;": "\u22D7",
  "gtreqless;": "\u22DB",
  "gtreqqless;": "\u2A8C",
  "gtrless;": "\u2277",
  "gtrsim;": "\u2273",
  "gvertneqq;": "\u2269\uFE00",
  "gvnE;": "\u2269\uFE00",
  "Hacek;": "\u02C7",
  "hairsp;": "\u200A",
  "half;": "\xBD",
  "hamilt;": "\u210B",
  "HARDcy;": "\u042A",
  "hardcy;": "\u044A",
  "hArr;": "\u21D4",
  "harr;": "\u2194",
  "harrcir;": "\u2948",
  "harrw;": "\u21AD",
  "Hat;": "^",
  "hbar;": "\u210F",
  "Hcirc;": "\u0124",
  "hcirc;": "\u0125",
  "hearts;": "\u2665",
  "heartsuit;": "\u2665",
  "hellip;": "\u2026",
  "hercon;": "\u22B9",
  "Hfr;": "\u210C",
  "hfr;": "\uD835\uDD25",
  "HilbertSpace;": "\u210B",
  "hksearow;": "\u2925",
  "hkswarow;": "\u2926",
  "hoarr;": "\u21FF",
  "homtht;": "\u223B",
  "hookleftarrow;": "\u21A9",
  "hookrightarrow;": "\u21AA",
  "Hopf;": "\u210D",
  "hopf;": "\uD835\uDD59",
  "horbar;": "\u2015",
  "HorizontalLine;": "\u2500",
  "Hscr;": "\u210B",
  "hscr;": "\uD835\uDCBD",
  "hslash;": "\u210F",
  "Hstrok;": "\u0126",
  "hstrok;": "\u0127",
  "HumpDownHump;": "\u224E",
  "HumpEqual;": "\u224F",
  "hybull;": "\u2043",
  "hyphen;": "\u2010",
  "Iacute;": "\xCD",
  "Iacute": "\xCD",
  "iacute;": "\xED",
  "iacute": "\xED",
  "ic;": "\u2063",
  "Icirc;": "\xCE",
  "Icirc": "\xCE",
  "icirc;": "\xEE",
  "icirc": "\xEE",
  "Icy;": "\u0418",
  "icy;": "\u0438",
  "Idot;": "\u0130",
  "IEcy;": "\u0415",
  "iecy;": "\u0435",
  "iexcl;": "\xA1",
  "iexcl": "\xA1",
  "iff;": "\u21D4",
  "Ifr;": "\u2111",
  "ifr;": "\uD835\uDD26",
  "Igrave;": "\xCC",
  "Igrave": "\xCC",
  "igrave;": "\xEC",
  "igrave": "\xEC",
  "ii;": "\u2148",
  "iiiint;": "\u2A0C",
  "iiint;": "\u222D",
  "iinfin;": "\u29DC",
  "iiota;": "\u2129",
  "IJlig;": "\u0132",
  "ijlig;": "\u0133",
  "Im;": "\u2111",
  "Imacr;": "\u012A",
  "imacr;": "\u012B",
  "image;": "\u2111",
  "ImaginaryI;": "\u2148",
  "imagline;": "\u2110",
  "imagpart;": "\u2111",
  "imath;": "\u0131",
  "imof;": "\u22B7",
  "imped;": "\u01B5",
  "Implies;": "\u21D2",
  "in;": "\u2208",
  "incare;": "\u2105",
  "infin;": "\u221E",
  "infintie;": "\u29DD",
  "inodot;": "\u0131",
  "Int;": "\u222C",
  "int;": "\u222B",
  "intcal;": "\u22BA",
  "integers;": "\u2124",
  "Integral;": "\u222B",
  "intercal;": "\u22BA",
  "Intersection;": "\u22C2",
  "intlarhk;": "\u2A17",
  "intprod;": "\u2A3C",
  "InvisibleComma;": "\u2063",
  "InvisibleTimes;": "\u2062",
  "IOcy;": "\u0401",
  "iocy;": "\u0451",
  "Iogon;": "\u012E",
  "iogon;": "\u012F",
  "Iopf;": "\uD835\uDD40",
  "iopf;": "\uD835\uDD5A",
  "Iota;": "\u0399",
  "iota;": "\u03B9",
  "iprod;": "\u2A3C",
  "iquest;": "\xBF",
  "iquest": "\xBF",
  "Iscr;": "\u2110",
  "iscr;": "\uD835\uDCBE",
  "isin;": "\u2208",
  "isindot;": "\u22F5",
  "isinE;": "\u22F9",
  "isins;": "\u22F4",
  "isinsv;": "\u22F3",
  "isinv;": "\u2208",
  "it;": "\u2062",
  "Itilde;": "\u0128",
  "itilde;": "\u0129",
  "Iukcy;": "\u0406",
  "iukcy;": "\u0456",
  "Iuml;": "\xCF",
  "Iuml": "\xCF",
  "iuml;": "\xEF",
  "iuml": "\xEF",
  "Jcirc;": "\u0134",
  "jcirc;": "\u0135",
  "Jcy;": "\u0419",
  "jcy;": "\u0439",
  "Jfr;": "\uD835\uDD0D",
  "jfr;": "\uD835\uDD27",
  "jmath;": "\u0237",
  "Jopf;": "\uD835\uDD41",
  "jopf;": "\uD835\uDD5B",
  "Jscr;": "\uD835\uDCA5",
  "jscr;": "\uD835\uDCBF",
  "Jsercy;": "\u0408",
  "jsercy;": "\u0458",
  "Jukcy;": "\u0404",
  "jukcy;": "\u0454",
  "Kappa;": "\u039A",
  "kappa;": "\u03BA",
  "kappav;": "\u03F0",
  "Kcedil;": "\u0136",
  "kcedil;": "\u0137",
  "Kcy;": "\u041A",
  "kcy;": "\u043A",
  "Kfr;": "\uD835\uDD0E",
  "kfr;": "\uD835\uDD28",
  "kgreen;": "\u0138",
  "KHcy;": "\u0425",
  "khcy;": "\u0445",
  "KJcy;": "\u040C",
  "kjcy;": "\u045C",
  "Kopf;": "\uD835\uDD42",
  "kopf;": "\uD835\uDD5C",
  "Kscr;": "\uD835\uDCA6",
  "kscr;": "\uD835\uDCC0",
  "lAarr;": "\u21DA",
  "Lacute;": "\u0139",
  "lacute;": "\u013A",
  "laemptyv;": "\u29B4",
  "lagran;": "\u2112",
  "Lambda;": "\u039B",
  "lambda;": "\u03BB",
  "Lang;": "\u27EA",
  "lang;": "\u27E8",
  "langd;": "\u2991",
  "langle;": "\u27E8",
  "lap;": "\u2A85",
  "Laplacetrf;": "\u2112",
  "laquo;": "\xAB",
  "laquo": "\xAB",
  "Larr;": "\u219E",
  "lArr;": "\u21D0",
  "larr;": "\u2190",
  "larrb;": "\u21E4",
  "larrbfs;": "\u291F",
  "larrfs;": "\u291D",
  "larrhk;": "\u21A9",
  "larrlp;": "\u21AB",
  "larrpl;": "\u2939",
  "larrsim;": "\u2973",
  "larrtl;": "\u21A2",
  "lat;": "\u2AAB",
  "lAtail;": "\u291B",
  "latail;": "\u2919",
  "late;": "\u2AAD",
  "lates;": "\u2AAD\uFE00",
  "lBarr;": "\u290E",
  "lbarr;": "\u290C",
  "lbbrk;": "\u2772",
  "lbrace;": "{",
  "lbrack;": "[",
  "lbrke;": "\u298B",
  "lbrksld;": "\u298F",
  "lbrkslu;": "\u298D",
  "Lcaron;": "\u013D",
  "lcaron;": "\u013E",
  "Lcedil;": "\u013B",
  "lcedil;": "\u013C",
  "lceil;": "\u2308",
  "lcub;": "{",
  "Lcy;": "\u041B",
  "lcy;": "\u043B",
  "ldca;": "\u2936",
  "ldquo;": "\u201C",
  "ldquor;": "\u201E",
  "ldrdhar;": "\u2967",
  "ldrushar;": "\u294B",
  "ldsh;": "\u21B2",
  "lE;": "\u2266",
  "le;": "\u2264",
  "LeftAngleBracket;": "\u27E8",
  "LeftArrow;": "\u2190",
  "Leftarrow;": "\u21D0",
  "leftarrow;": "\u2190",
  "LeftArrowBar;": "\u21E4",
  "LeftArrowRightArrow;": "\u21C6",
  "leftarrowtail;": "\u21A2",
  "LeftCeiling;": "\u2308",
  "LeftDoubleBracket;": "\u27E6",
  "LeftDownTeeVector;": "\u2961",
  "LeftDownVector;": "\u21C3",
  "LeftDownVectorBar;": "\u2959",
  "LeftFloor;": "\u230A",
  "leftharpoondown;": "\u21BD",
  "leftharpoonup;": "\u21BC",
  "leftleftarrows;": "\u21C7",
  "LeftRightArrow;": "\u2194",
  "Leftrightarrow;": "\u21D4",
  "leftrightarrow;": "\u2194",
  "leftrightarrows;": "\u21C6",
  "leftrightharpoons;": "\u21CB",
  "leftrightsquigarrow;": "\u21AD",
  "LeftRightVector;": "\u294E",
  "LeftTee;": "\u22A3",
  "LeftTeeArrow;": "\u21A4",
  "LeftTeeVector;": "\u295A",
  "leftthreetimes;": "\u22CB",
  "LeftTriangle;": "\u22B2",
  "LeftTriangleBar;": "\u29CF",
  "LeftTriangleEqual;": "\u22B4",
  "LeftUpDownVector;": "\u2951",
  "LeftUpTeeVector;": "\u2960",
  "LeftUpVector;": "\u21BF",
  "LeftUpVectorBar;": "\u2958",
  "LeftVector;": "\u21BC",
  "LeftVectorBar;": "\u2952",
  "lEg;": "\u2A8B",
  "leg;": "\u22DA",
  "leq;": "\u2264",
  "leqq;": "\u2266",
  "leqslant;": "\u2A7D",
  "les;": "\u2A7D",
  "lescc;": "\u2AA8",
  "lesdot;": "\u2A7F",
  "lesdoto;": "\u2A81",
  "lesdotor;": "\u2A83",
  "lesg;": "\u22DA\uFE00",
  "lesges;": "\u2A93",
  "lessapprox;": "\u2A85",
  "lessdot;": "\u22D6",
  "lesseqgtr;": "\u22DA",
  "lesseqqgtr;": "\u2A8B",
  "LessEqualGreater;": "\u22DA",
  "LessFullEqual;": "\u2266",
  "LessGreater;": "\u2276",
  "lessgtr;": "\u2276",
  "LessLess;": "\u2AA1",
  "lesssim;": "\u2272",
  "LessSlantEqual;": "\u2A7D",
  "LessTilde;": "\u2272",
  "lfisht;": "\u297C",
  "lfloor;": "\u230A",
  "Lfr;": "\uD835\uDD0F",
  "lfr;": "\uD835\uDD29",
  "lg;": "\u2276",
  "lgE;": "\u2A91",
  "lHar;": "\u2962",
  "lhard;": "\u21BD",
  "lharu;": "\u21BC",
  "lharul;": "\u296A",
  "lhblk;": "\u2584",
  "LJcy;": "\u0409",
  "ljcy;": "\u0459",
  "Ll;": "\u22D8",
  "ll;": "\u226A",
  "llarr;": "\u21C7",
  "llcorner;": "\u231E",
  "Lleftarrow;": "\u21DA",
  "llhard;": "\u296B",
  "lltri;": "\u25FA",
  "Lmidot;": "\u013F",
  "lmidot;": "\u0140",
  "lmoust;": "\u23B0",
  "lmoustache;": "\u23B0",
  "lnap;": "\u2A89",
  "lnapprox;": "\u2A89",
  "lnE;": "\u2268",
  "lne;": "\u2A87",
  "lneq;": "\u2A87",
  "lneqq;": "\u2268",
  "lnsim;": "\u22E6",
  "loang;": "\u27EC",
  "loarr;": "\u21FD",
  "lobrk;": "\u27E6",
  "LongLeftArrow;": "\u27F5",
  "Longleftarrow;": "\u27F8",
  "longleftarrow;": "\u27F5",
  "LongLeftRightArrow;": "\u27F7",
  "Longleftrightarrow;": "\u27FA",
  "longleftrightarrow;": "\u27F7",
  "longmapsto;": "\u27FC",
  "LongRightArrow;": "\u27F6",
  "Longrightarrow;": "\u27F9",
  "longrightarrow;": "\u27F6",
  "looparrowleft;": "\u21AB",
  "looparrowright;": "\u21AC",
  "lopar;": "\u2985",
  "Lopf;": "\uD835\uDD43",
  "lopf;": "\uD835\uDD5D",
  "loplus;": "\u2A2D",
  "lotimes;": "\u2A34",
  "lowast;": "\u2217",
  "lowbar;": "_",
  "LowerLeftArrow;": "\u2199",
  "LowerRightArrow;": "\u2198",
  "loz;": "\u25CA",
  "lozenge;": "\u25CA",
  "lozf;": "\u29EB",
  "lpar;": "(",
  "lparlt;": "\u2993",
  "lrarr;": "\u21C6",
  "lrcorner;": "\u231F",
  "lrhar;": "\u21CB",
  "lrhard;": "\u296D",
  "lrm;": "\u200E",
  "lrtri;": "\u22BF",
  "lsaquo;": "\u2039",
  "Lscr;": "\u2112",
  "lscr;": "\uD835\uDCC1",
  "Lsh;": "\u21B0",
  "lsh;": "\u21B0",
  "lsim;": "\u2272",
  "lsime;": "\u2A8D",
  "lsimg;": "\u2A8F",
  "lsqb;": "[",
  "lsquo;": "\u2018",
  "lsquor;": "\u201A",
  "Lstrok;": "\u0141",
  "lstrok;": "\u0142",
  "LT;": "<",
  "LT": "<",
  "Lt;": "\u226A",
  "lt;": "<",
  "lt": "<",
  "ltcc;": "\u2AA6",
  "ltcir;": "\u2A79",
  "ltdot;": "\u22D6",
  "lthree;": "\u22CB",
  "ltimes;": "\u22C9",
  "ltlarr;": "\u2976",
  "ltquest;": "\u2A7B",
  "ltri;": "\u25C3",
  "ltrie;": "\u22B4",
  "ltrif;": "\u25C2",
  "ltrPar;": "\u2996",
  "lurdshar;": "\u294A",
  "luruhar;": "\u2966",
  "lvertneqq;": "\u2268\uFE00",
  "lvnE;": "\u2268\uFE00",
  "macr;": "\xAF",
  "macr": "\xAF",
  "male;": "\u2642",
  "malt;": "\u2720",
  "maltese;": "\u2720",
  "Map;": "\u2905",
  "map;": "\u21A6",
  "mapsto;": "\u21A6",
  "mapstodown;": "\u21A7",
  "mapstoleft;": "\u21A4",
  "mapstoup;": "\u21A5",
  "marker;": "\u25AE",
  "mcomma;": "\u2A29",
  "Mcy;": "\u041C",
  "mcy;": "\u043C",
  "mdash;": "\u2014",
  "mDDot;": "\u223A",
  "measuredangle;": "\u2221",
  "MediumSpace;": "\u205F",
  "Mellintrf;": "\u2133",
  "Mfr;": "\uD835\uDD10",
  "mfr;": "\uD835\uDD2A",
  "mho;": "\u2127",
  "micro;": "\xB5",
  "micro": "\xB5",
  "mid;": "\u2223",
  "midast;": "*",
  "midcir;": "\u2AF0",
  "middot;": "\xB7",
  "middot": "\xB7",
  "minus;": "\u2212",
  "minusb;": "\u229F",
  "minusd;": "\u2238",
  "minusdu;": "\u2A2A",
  "MinusPlus;": "\u2213",
  "mlcp;": "\u2ADB",
  "mldr;": "\u2026",
  "mnplus;": "\u2213",
  "models;": "\u22A7",
  "Mopf;": "\uD835\uDD44",
  "mopf;": "\uD835\uDD5E",
  "mp;": "\u2213",
  "Mscr;": "\u2133",
  "mscr;": "\uD835\uDCC2",
  "mstpos;": "\u223E",
  "Mu;": "\u039C",
  "mu;": "\u03BC",
  "multimap;": "\u22B8",
  "mumap;": "\u22B8",
  "nabla;": "\u2207",
  "Nacute;": "\u0143",
  "nacute;": "\u0144",
  "nang;": "\u2220\u20D2",
  "nap;": "\u2249",
  "napE;": "\u2A70\u0338",
  "napid;": "\u224B\u0338",
  "napos;": "\u0149",
  "napprox;": "\u2249",
  "natur;": "\u266E",
  "natural;": "\u266E",
  "naturals;": "\u2115",
  "nbsp;": "\xA0",
  "nbsp": "\xA0",
  "nbump;": "\u224E\u0338",
  "nbumpe;": "\u224F\u0338",
  "ncap;": "\u2A43",
  "Ncaron;": "\u0147",
  "ncaron;": "\u0148",
  "Ncedil;": "\u0145",
  "ncedil;": "\u0146",
  "ncong;": "\u2247",
  "ncongdot;": "\u2A6D\u0338",
  "ncup;": "\u2A42",
  "Ncy;": "\u041D",
  "ncy;": "\u043D",
  "ndash;": "\u2013",
  "ne;": "\u2260",
  "nearhk;": "\u2924",
  "neArr;": "\u21D7",
  "nearr;": "\u2197",
  "nearrow;": "\u2197",
  "nedot;": "\u2250\u0338",
  "NegativeMediumSpace;": "\u200B",
  "NegativeThickSpace;": "\u200B",
  "NegativeThinSpace;": "\u200B",
  "NegativeVeryThinSpace;": "\u200B",
  "nequiv;": "\u2262",
  "nesear;": "\u2928",
  "nesim;": "\u2242\u0338",
  "NestedGreaterGreater;": "\u226B",
  "NestedLessLess;": "\u226A",
  "NewLine;": "\n",
  "nexist;": "\u2204",
  "nexists;": "\u2204",
  "Nfr;": "\uD835\uDD11",
  "nfr;": "\uD835\uDD2B",
  "ngE;": "\u2267\u0338",
  "nge;": "\u2271",
  "ngeq;": "\u2271",
  "ngeqq;": "\u2267\u0338",
  "ngeqslant;": "\u2A7E\u0338",
  "nges;": "\u2A7E\u0338",
  "nGg;": "\u22D9\u0338",
  "ngsim;": "\u2275",
  "nGt;": "\u226B\u20D2",
  "ngt;": "\u226F",
  "ngtr;": "\u226F",
  "nGtv;": "\u226B\u0338",
  "nhArr;": "\u21CE",
  "nharr;": "\u21AE",
  "nhpar;": "\u2AF2",
  "ni;": "\u220B",
  "nis;": "\u22FC",
  "nisd;": "\u22FA",
  "niv;": "\u220B",
  "NJcy;": "\u040A",
  "njcy;": "\u045A",
  "nlArr;": "\u21CD",
  "nlarr;": "\u219A",
  "nldr;": "\u2025",
  "nlE;": "\u2266\u0338",
  "nle;": "\u2270",
  "nLeftarrow;": "\u21CD",
  "nleftarrow;": "\u219A",
  "nLeftrightarrow;": "\u21CE",
  "nleftrightarrow;": "\u21AE",
  "nleq;": "\u2270",
  "nleqq;": "\u2266\u0338",
  "nleqslant;": "\u2A7D\u0338",
  "nles;": "\u2A7D\u0338",
  "nless;": "\u226E",
  "nLl;": "\u22D8\u0338",
  "nlsim;": "\u2274",
  "nLt;": "\u226A\u20D2",
  "nlt;": "\u226E",
  "nltri;": "\u22EA",
  "nltrie;": "\u22EC",
  "nLtv;": "\u226A\u0338",
  "nmid;": "\u2224",
  "NoBreak;": "\u2060",
  "NonBreakingSpace;": "\xA0",
  "Nopf;": "\u2115",
  "nopf;": "\uD835\uDD5F",
  "Not;": "\u2AEC",
  "not;": "\xAC",
  "not": "\xAC",
  "NotCongruent;": "\u2262",
  "NotCupCap;": "\u226D",
  "NotDoubleVerticalBar;": "\u2226",
  "NotElement;": "\u2209",
  "NotEqual;": "\u2260",
  "NotEqualTilde;": "\u2242\u0338",
  "NotExists;": "\u2204",
  "NotGreater;": "\u226F",
  "NotGreaterEqual;": "\u2271",
  "NotGreaterFullEqual;": "\u2267\u0338",
  "NotGreaterGreater;": "\u226B\u0338",
  "NotGreaterLess;": "\u2279",
  "NotGreaterSlantEqual;": "\u2A7E\u0338",
  "NotGreaterTilde;": "\u2275",
  "NotHumpDownHump;": "\u224E\u0338",
  "NotHumpEqual;": "\u224F\u0338",
  "notin;": "\u2209",
  "notindot;": "\u22F5\u0338",
  "notinE;": "\u22F9\u0338",
  "notinva;": "\u2209",
  "notinvb;": "\u22F7",
  "notinvc;": "\u22F6",
  "NotLeftTriangle;": "\u22EA",
  "NotLeftTriangleBar;": "\u29CF\u0338",
  "NotLeftTriangleEqual;": "\u22EC",
  "NotLess;": "\u226E",
  "NotLessEqual;": "\u2270",
  "NotLessGreater;": "\u2278",
  "NotLessLess;": "\u226A\u0338",
  "NotLessSlantEqual;": "\u2A7D\u0338",
  "NotLessTilde;": "\u2274",
  "NotNestedGreaterGreater;": "\u2AA2\u0338",
  "NotNestedLessLess;": "\u2AA1\u0338",
  "notni;": "\u220C",
  "notniva;": "\u220C",
  "notnivb;": "\u22FE",
  "notnivc;": "\u22FD",
  "NotPrecedes;": "\u2280",
  "NotPrecedesEqual;": "\u2AAF\u0338",
  "NotPrecedesSlantEqual;": "\u22E0",
  "NotReverseElement;": "\u220C",
  "NotRightTriangle;": "\u22EB",
  "NotRightTriangleBar;": "\u29D0\u0338",
  "NotRightTriangleEqual;": "\u22ED",
  "NotSquareSubset;": "\u228F\u0338",
  "NotSquareSubsetEqual;": "\u22E2",
  "NotSquareSuperset;": "\u2290\u0338",
  "NotSquareSupersetEqual;": "\u22E3",
  "NotSubset;": "\u2282\u20D2",
  "NotSubsetEqual;": "\u2288",
  "NotSucceeds;": "\u2281",
  "NotSucceedsEqual;": "\u2AB0\u0338",
  "NotSucceedsSlantEqual;": "\u22E1",
  "NotSucceedsTilde;": "\u227F\u0338",
  "NotSuperset;": "\u2283\u20D2",
  "NotSupersetEqual;": "\u2289",
  "NotTilde;": "\u2241",
  "NotTildeEqual;": "\u2244",
  "NotTildeFullEqual;": "\u2247",
  "NotTildeTilde;": "\u2249",
  "NotVerticalBar;": "\u2224",
  "npar;": "\u2226",
  "nparallel;": "\u2226",
  "nparsl;": "\u2AFD\u20E5",
  "npart;": "\u2202\u0338",
  "npolint;": "\u2A14",
  "npr;": "\u2280",
  "nprcue;": "\u22E0",
  "npre;": "\u2AAF\u0338",
  "nprec;": "\u2280",
  "npreceq;": "\u2AAF\u0338",
  "nrArr;": "\u21CF",
  "nrarr;": "\u219B",
  "nrarrc;": "\u2933\u0338",
  "nrarrw;": "\u219D\u0338",
  "nRightarrow;": "\u21CF",
  "nrightarrow;": "\u219B",
  "nrtri;": "\u22EB",
  "nrtrie;": "\u22ED",
  "nsc;": "\u2281",
  "nsccue;": "\u22E1",
  "nsce;": "\u2AB0\u0338",
  "Nscr;": "\uD835\uDCA9",
  "nscr;": "\uD835\uDCC3",
  "nshortmid;": "\u2224",
  "nshortparallel;": "\u2226",
  "nsim;": "\u2241",
  "nsime;": "\u2244",
  "nsimeq;": "\u2244",
  "nsmid;": "\u2224",
  "nspar;": "\u2226",
  "nsqsube;": "\u22E2",
  "nsqsupe;": "\u22E3",
  "nsub;": "\u2284",
  "nsubE;": "\u2AC5\u0338",
  "nsube;": "\u2288",
  "nsubset;": "\u2282\u20D2",
  "nsubseteq;": "\u2288",
  "nsubseteqq;": "\u2AC5\u0338",
  "nsucc;": "\u2281",
  "nsucceq;": "\u2AB0\u0338",
  "nsup;": "\u2285",
  "nsupE;": "\u2AC6\u0338",
  "nsupe;": "\u2289",
  "nsupset;": "\u2283\u20D2",
  "nsupseteq;": "\u2289",
  "nsupseteqq;": "\u2AC6\u0338",
  "ntgl;": "\u2279",
  "Ntilde;": "\xD1",
  "Ntilde": "\xD1",
  "ntilde;": "\xF1",
  "ntilde": "\xF1",
  "ntlg;": "\u2278",
  "ntriangleleft;": "\u22EA",
  "ntrianglelefteq;": "\u22EC",
  "ntriangleright;": "\u22EB",
  "ntrianglerighteq;": "\u22ED",
  "Nu;": "\u039D",
  "nu;": "\u03BD",
  "num;": "#",
  "numero;": "\u2116",
  "numsp;": "\u2007",
  "nvap;": "\u224D\u20D2",
  "nVDash;": "\u22AF",
  "nVdash;": "\u22AE",
  "nvDash;": "\u22AD",
  "nvdash;": "\u22AC",
  "nvge;": "\u2265\u20D2",
  "nvgt;": ">\u20D2",
  "nvHarr;": "\u2904",
  "nvinfin;": "\u29DE",
  "nvlArr;": "\u2902",
  "nvle;": "\u2264\u20D2",
  "nvlt;": "<\u20D2",
  "nvltrie;": "\u22B4\u20D2",
  "nvrArr;": "\u2903",
  "nvrtrie;": "\u22B5\u20D2",
  "nvsim;": "\u223C\u20D2",
  "nwarhk;": "\u2923",
  "nwArr;": "\u21D6",
  "nwarr;": "\u2196",
  "nwarrow;": "\u2196",
  "nwnear;": "\u2927",
  "Oacute;": "\xD3",
  "Oacute": "\xD3",
  "oacute;": "\xF3",
  "oacute": "\xF3",
  "oast;": "\u229B",
  "ocir;": "\u229A",
  "Ocirc;": "\xD4",
  "Ocirc": "\xD4",
  "ocirc;": "\xF4",
  "ocirc": "\xF4",
  "Ocy;": "\u041E",
  "ocy;": "\u043E",
  "odash;": "\u229D",
  "Odblac;": "\u0150",
  "odblac;": "\u0151",
  "odiv;": "\u2A38",
  "odot;": "\u2299",
  "odsold;": "\u29BC",
  "OElig;": "\u0152",
  "oelig;": "\u0153",
  "ofcir;": "\u29BF",
  "Ofr;": "\uD835\uDD12",
  "ofr;": "\uD835\uDD2C",
  "ogon;": "\u02DB",
  "Ograve;": "\xD2",
  "Ograve": "\xD2",
  "ograve;": "\xF2",
  "ograve": "\xF2",
  "ogt;": "\u29C1",
  "ohbar;": "\u29B5",
  "ohm;": "\u03A9",
  "oint;": "\u222E",
  "olarr;": "\u21BA",
  "olcir;": "\u29BE",
  "olcross;": "\u29BB",
  "oline;": "\u203E",
  "olt;": "\u29C0",
  "Omacr;": "\u014C",
  "omacr;": "\u014D",
  "Omega;": "\u03A9",
  "omega;": "\u03C9",
  "Omicron;": "\u039F",
  "omicron;": "\u03BF",
  "omid;": "\u29B6",
  "ominus;": "\u2296",
  "Oopf;": "\uD835\uDD46",
  "oopf;": "\uD835\uDD60",
  "opar;": "\u29B7",
  "OpenCurlyDoubleQuote;": "\u201C",
  "OpenCurlyQuote;": "\u2018",
  "operp;": "\u29B9",
  "oplus;": "\u2295",
  "Or;": "\u2A54",
  "or;": "\u2228",
  "orarr;": "\u21BB",
  "ord;": "\u2A5D",
  "order;": "\u2134",
  "orderof;": "\u2134",
  "ordf;": "\xAA",
  "ordf": "\xAA",
  "ordm;": "\xBA",
  "ordm": "\xBA",
  "origof;": "\u22B6",
  "oror;": "\u2A56",
  "orslope;": "\u2A57",
  "orv;": "\u2A5B",
  "oS;": "\u24C8",
  "Oscr;": "\uD835\uDCAA",
  "oscr;": "\u2134",
  "Oslash;": "\xD8",
  "Oslash": "\xD8",
  "oslash;": "\xF8",
  "oslash": "\xF8",
  "osol;": "\u2298",
  "Otilde;": "\xD5",
  "Otilde": "\xD5",
  "otilde;": "\xF5",
  "otilde": "\xF5",
  "Otimes;": "\u2A37",
  "otimes;": "\u2297",
  "otimesas;": "\u2A36",
  "Ouml;": "\xD6",
  "Ouml": "\xD6",
  "ouml;": "\xF6",
  "ouml": "\xF6",
  "ovbar;": "\u233D",
  "OverBar;": "\u203E",
  "OverBrace;": "\u23DE",
  "OverBracket;": "\u23B4",
  "OverParenthesis;": "\u23DC",
  "par;": "\u2225",
  "para;": "\xB6",
  "para": "\xB6",
  "parallel;": "\u2225",
  "parsim;": "\u2AF3",
  "parsl;": "\u2AFD",
  "part;": "\u2202",
  "PartialD;": "\u2202",
  "Pcy;": "\u041F",
  "pcy;": "\u043F",
  "percnt;": "%",
  "period;": ".",
  "permil;": "\u2030",
  "perp;": "\u22A5",
  "pertenk;": "\u2031",
  "Pfr;": "\uD835\uDD13",
  "pfr;": "\uD835\uDD2D",
  "Phi;": "\u03A6",
  "phi;": "\u03C6",
  "phiv;": "\u03D5",
  "phmmat;": "\u2133",
  "phone;": "\u260E",
  "Pi;": "\u03A0",
  "pi;": "\u03C0",
  "pitchfork;": "\u22D4",
  "piv;": "\u03D6",
  "planck;": "\u210F",
  "planckh;": "\u210E",
  "plankv;": "\u210F",
  "plus;": "+",
  "plusacir;": "\u2A23",
  "plusb;": "\u229E",
  "pluscir;": "\u2A22",
  "plusdo;": "\u2214",
  "plusdu;": "\u2A25",
  "pluse;": "\u2A72",
  "PlusMinus;": "\xB1",
  "plusmn;": "\xB1",
  "plusmn": "\xB1",
  "plussim;": "\u2A26",
  "plustwo;": "\u2A27",
  "pm;": "\xB1",
  "Poincareplane;": "\u210C",
  "pointint;": "\u2A15",
  "Popf;": "\u2119",
  "popf;": "\uD835\uDD61",
  "pound;": "\xA3",
  "pound": "\xA3",
  "Pr;": "\u2ABB",
  "pr;": "\u227A",
  "prap;": "\u2AB7",
  "prcue;": "\u227C",
  "prE;": "\u2AB3",
  "pre;": "\u2AAF",
  "prec;": "\u227A",
  "precapprox;": "\u2AB7",
  "preccurlyeq;": "\u227C",
  "Precedes;": "\u227A",
  "PrecedesEqual;": "\u2AAF",
  "PrecedesSlantEqual;": "\u227C",
  "PrecedesTilde;": "\u227E",
  "preceq;": "\u2AAF",
  "precnapprox;": "\u2AB9",
  "precneqq;": "\u2AB5",
  "precnsim;": "\u22E8",
  "precsim;": "\u227E",
  "Prime;": "\u2033",
  "prime;": "\u2032",
  "primes;": "\u2119",
  "prnap;": "\u2AB9",
  "prnE;": "\u2AB5",
  "prnsim;": "\u22E8",
  "prod;": "\u220F",
  "Product;": "\u220F",
  "profalar;": "\u232E",
  "profline;": "\u2312",
  "profsurf;": "\u2313",
  "prop;": "\u221D",
  "Proportion;": "\u2237",
  "Proportional;": "\u221D",
  "propto;": "\u221D",
  "prsim;": "\u227E",
  "prurel;": "\u22B0",
  "Pscr;": "\uD835\uDCAB",
  "pscr;": "\uD835\uDCC5",
  "Psi;": "\u03A8",
  "psi;": "\u03C8",
  "puncsp;": "\u2008",
  "Qfr;": "\uD835\uDD14",
  "qfr;": "\uD835\uDD2E",
  "qint;": "\u2A0C",
  "Qopf;": "\u211A",
  "qopf;": "\uD835\uDD62",
  "qprime;": "\u2057",
  "Qscr;": "\uD835\uDCAC",
  "qscr;": "\uD835\uDCC6",
  "quaternions;": "\u210D",
  "quatint;": "\u2A16",
  "quest;": "?",
  "questeq;": "\u225F",
  "QUOT;": "\"",
  "QUOT": "\"",
  "quot;": "\"",
  "quot": "\"",
  "rAarr;": "\u21DB",
  "race;": "\u223D\u0331",
  "Racute;": "\u0154",
  "racute;": "\u0155",
  "radic;": "\u221A",
  "raemptyv;": "\u29B3",
  "Rang;": "\u27EB",
  "rang;": "\u27E9",
  "rangd;": "\u2992",
  "range;": "\u29A5",
  "rangle;": "\u27E9",
  "raquo;": "\xBB",
  "raquo": "\xBB",
  "Rarr;": "\u21A0",
  "rArr;": "\u21D2",
  "rarr;": "\u2192",
  "rarrap;": "\u2975",
  "rarrb;": "\u21E5",
  "rarrbfs;": "\u2920",
  "rarrc;": "\u2933",
  "rarrfs;": "\u291E",
  "rarrhk;": "\u21AA",
  "rarrlp;": "\u21AC",
  "rarrpl;": "\u2945",
  "rarrsim;": "\u2974",
  "Rarrtl;": "\u2916",
  "rarrtl;": "\u21A3",
  "rarrw;": "\u219D",
  "rAtail;": "\u291C",
  "ratail;": "\u291A",
  "ratio;": "\u2236",
  "rationals;": "\u211A",
  "RBarr;": "\u2910",
  "rBarr;": "\u290F",
  "rbarr;": "\u290D",
  "rbbrk;": "\u2773",
  "rbrace;": "}",
  "rbrack;": "]",
  "rbrke;": "\u298C",
  "rbrksld;": "\u298E",
  "rbrkslu;": "\u2990",
  "Rcaron;": "\u0158",
  "rcaron;": "\u0159",
  "Rcedil;": "\u0156",
  "rcedil;": "\u0157",
  "rceil;": "\u2309",
  "rcub;": "}",
  "Rcy;": "\u0420",
  "rcy;": "\u0440",
  "rdca;": "\u2937",
  "rdldhar;": "\u2969",
  "rdquo;": "\u201D",
  "rdquor;": "\u201D",
  "rdsh;": "\u21B3",
  "Re;": "\u211C",
  "real;": "\u211C",
  "realine;": "\u211B",
  "realpart;": "\u211C",
  "reals;": "\u211D",
  "rect;": "\u25AD",
  "REG;": "\xAE",
  "REG": "\xAE",
  "reg;": "\xAE",
  "reg": "\xAE",
  "ReverseElement;": "\u220B",
  "ReverseEquilibrium;": "\u21CB",
  "ReverseUpEquilibrium;": "\u296F",
  "rfisht;": "\u297D",
  "rfloor;": "\u230B",
  "Rfr;": "\u211C",
  "rfr;": "\uD835\uDD2F",
  "rHar;": "\u2964",
  "rhard;": "\u21C1",
  "rharu;": "\u21C0",
  "rharul;": "\u296C",
  "Rho;": "\u03A1",
  "rho;": "\u03C1",
  "rhov;": "\u03F1",
  "RightAngleBracket;": "\u27E9",
  "RightArrow;": "\u2192",
  "Rightarrow;": "\u21D2",
  "rightarrow;": "\u2192",
  "RightArrowBar;": "\u21E5",
  "RightArrowLeftArrow;": "\u21C4",
  "rightarrowtail;": "\u21A3",
  "RightCeiling;": "\u2309",
  "RightDoubleBracket;": "\u27E7",
  "RightDownTeeVector;": "\u295D",
  "RightDownVector;": "\u21C2",
  "RightDownVectorBar;": "\u2955",
  "RightFloor;": "\u230B",
  "rightharpoondown;": "\u21C1",
  "rightharpoonup;": "\u21C0",
  "rightleftarrows;": "\u21C4",
  "rightleftharpoons;": "\u21CC",
  "rightrightarrows;": "\u21C9",
  "rightsquigarrow;": "\u219D",
  "RightTee;": "\u22A2",
  "RightTeeArrow;": "\u21A6",
  "RightTeeVector;": "\u295B",
  "rightthreetimes;": "\u22CC",
  "RightTriangle;": "\u22B3",
  "RightTriangleBar;": "\u29D0",
  "RightTriangleEqual;": "\u22B5",
  "RightUpDownVector;": "\u294F",
  "RightUpTeeVector;": "\u295C",
  "RightUpVector;": "\u21BE",
  "RightUpVectorBar;": "\u2954",
  "RightVector;": "\u21C0",
  "RightVectorBar;": "\u2953",
  "ring;": "\u02DA",
  "risingdotseq;": "\u2253",
  "rlarr;": "\u21C4",
  "rlhar;": "\u21CC",
  "rlm;": "\u200F",
  "rmoust;": "\u23B1",
  "rmoustache;": "\u23B1",
  "rnmid;": "\u2AEE",
  "roang;": "\u27ED",
  "roarr;": "\u21FE",
  "robrk;": "\u27E7",
  "ropar;": "\u2986",
  "Ropf;": "\u211D",
  "ropf;": "\uD835\uDD63",
  "roplus;": "\u2A2E",
  "rotimes;": "\u2A35",
  "RoundImplies;": "\u2970",
  "rpar;": ")",
  "rpargt;": "\u2994",
  "rppolint;": "\u2A12",
  "rrarr;": "\u21C9",
  "Rrightarrow;": "\u21DB",
  "rsaquo;": "\u203A",
  "Rscr;": "\u211B",
  "rscr;": "\uD835\uDCC7",
  "Rsh;": "\u21B1",
  "rsh;": "\u21B1",
  "rsqb;": "]",
  "rsquo;": "\u2019",
  "rsquor;": "\u2019",
  "rthree;": "\u22CC",
  "rtimes;": "\u22CA",
  "rtri;": "\u25B9",
  "rtrie;": "\u22B5",
  "rtrif;": "\u25B8",
  "rtriltri;": "\u29CE",
  "RuleDelayed;": "\u29F4",
  "ruluhar;": "\u2968",
  "rx;": "\u211E",
  "Sacute;": "\u015A",
  "sacute;": "\u015B",
  "sbquo;": "\u201A",
  "Sc;": "\u2ABC",
  "sc;": "\u227B",
  "scap;": "\u2AB8",
  "Scaron;": "\u0160",
  "scaron;": "\u0161",
  "sccue;": "\u227D",
  "scE;": "\u2AB4",
  "sce;": "\u2AB0",
  "Scedil;": "\u015E",
  "scedil;": "\u015F",
  "Scirc;": "\u015C",
  "scirc;": "\u015D",
  "scnap;": "\u2ABA",
  "scnE;": "\u2AB6",
  "scnsim;": "\u22E9",
  "scpolint;": "\u2A13",
  "scsim;": "\u227F",
  "Scy;": "\u0421",
  "scy;": "\u0441",
  "sdot;": "\u22C5",
  "sdotb;": "\u22A1",
  "sdote;": "\u2A66",
  "searhk;": "\u2925",
  "seArr;": "\u21D8",
  "searr;": "\u2198",
  "searrow;": "\u2198",
  "sect;": "\xA7",
  "sect": "\xA7",
  "semi;": ";",
  "seswar;": "\u2929",
  "setminus;": "\u2216",
  "setmn;": "\u2216",
  "sext;": "\u2736",
  "Sfr;": "\uD835\uDD16",
  "sfr;": "\uD835\uDD30",
  "sfrown;": "\u2322",
  "sharp;": "\u266F",
  "SHCHcy;": "\u0429",
  "shchcy;": "\u0449",
  "SHcy;": "\u0428",
  "shcy;": "\u0448",
  "ShortDownArrow;": "\u2193",
  "ShortLeftArrow;": "\u2190",
  "shortmid;": "\u2223",
  "shortparallel;": "\u2225",
  "ShortRightArrow;": "\u2192",
  "ShortUpArrow;": "\u2191",
  "shy;": "\xAD",
  "shy": "\xAD",
  "Sigma;": "\u03A3",
  "sigma;": "\u03C3",
  "sigmaf;": "\u03C2",
  "sigmav;": "\u03C2",
  "sim;": "\u223C",
  "simdot;": "\u2A6A",
  "sime;": "\u2243",
  "simeq;": "\u2243",
  "simg;": "\u2A9E",
  "simgE;": "\u2AA0",
  "siml;": "\u2A9D",
  "simlE;": "\u2A9F",
  "simne;": "\u2246",
  "simplus;": "\u2A24",
  "simrarr;": "\u2972",
  "slarr;": "\u2190",
  "SmallCircle;": "\u2218",
  "smallsetminus;": "\u2216",
  "smashp;": "\u2A33",
  "smeparsl;": "\u29E4",
  "smid;": "\u2223",
  "smile;": "\u2323",
  "smt;": "\u2AAA",
  "smte;": "\u2AAC",
  "smtes;": "\u2AAC\uFE00",
  "SOFTcy;": "\u042C",
  "softcy;": "\u044C",
  "sol;": "/",
  "solb;": "\u29C4",
  "solbar;": "\u233F",
  "Sopf;": "\uD835\uDD4A",
  "sopf;": "\uD835\uDD64",
  "spades;": "\u2660",
  "spadesuit;": "\u2660",
  "spar;": "\u2225",
  "sqcap;": "\u2293",
  "sqcaps;": "\u2293\uFE00",
  "sqcup;": "\u2294",
  "sqcups;": "\u2294\uFE00",
  "Sqrt;": "\u221A",
  "sqsub;": "\u228F",
  "sqsube;": "\u2291",
  "sqsubset;": "\u228F",
  "sqsubseteq;": "\u2291",
  "sqsup;": "\u2290",
  "sqsupe;": "\u2292",
  "sqsupset;": "\u2290",
  "sqsupseteq;": "\u2292",
  "squ;": "\u25A1",
  "Square;": "\u25A1",
  "square;": "\u25A1",
  "SquareIntersection;": "\u2293",
  "SquareSubset;": "\u228F",
  "SquareSubsetEqual;": "\u2291",
  "SquareSuperset;": "\u2290",
  "SquareSupersetEqual;": "\u2292",
  "SquareUnion;": "\u2294",
  "squarf;": "\u25AA",
  "squf;": "\u25AA",
  "srarr;": "\u2192",
  "Sscr;": "\uD835\uDCAE",
  "sscr;": "\uD835\uDCC8",
  "ssetmn;": "\u2216",
  "ssmile;": "\u2323",
  "sstarf;": "\u22C6",
  "Star;": "\u22C6",
  "star;": "\u2606",
  "starf;": "\u2605",
  "straightepsilon;": "\u03F5",
  "straightphi;": "\u03D5",
  "strns;": "\xAF",
  "Sub;": "\u22D0",
  "sub;": "\u2282",
  "subdot;": "\u2ABD",
  "subE;": "\u2AC5",
  "sube;": "\u2286",
  "subedot;": "\u2AC3",
  "submult;": "\u2AC1",
  "subnE;": "\u2ACB",
  "subne;": "\u228A",
  "subplus;": "\u2ABF",
  "subrarr;": "\u2979",
  "Subset;": "\u22D0",
  "subset;": "\u2282",
  "subseteq;": "\u2286",
  "subseteqq;": "\u2AC5",
  "SubsetEqual;": "\u2286",
  "subsetneq;": "\u228A",
  "subsetneqq;": "\u2ACB",
  "subsim;": "\u2AC7",
  "subsub;": "\u2AD5",
  "subsup;": "\u2AD3",
  "succ;": "\u227B",
  "succapprox;": "\u2AB8",
  "succcurlyeq;": "\u227D",
  "Succeeds;": "\u227B",
  "SucceedsEqual;": "\u2AB0",
  "SucceedsSlantEqual;": "\u227D",
  "SucceedsTilde;": "\u227F",
  "succeq;": "\u2AB0",
  "succnapprox;": "\u2ABA",
  "succneqq;": "\u2AB6",
  "succnsim;": "\u22E9",
  "succsim;": "\u227F",
  "SuchThat;": "\u220B",
  "Sum;": "\u2211",
  "sum;": "\u2211",
  "sung;": "\u266A",
  "Sup;": "\u22D1",
  "sup;": "\u2283",
  "sup1;": "\xB9",
  "sup1": "\xB9",
  "sup2;": "\xB2",
  "sup2": "\xB2",
  "sup3;": "\xB3",
  "sup3": "\xB3",
  "supdot;": "\u2ABE",
  "supdsub;": "\u2AD8",
  "supE;": "\u2AC6",
  "supe;": "\u2287",
  "supedot;": "\u2AC4",
  "Superset;": "\u2283",
  "SupersetEqual;": "\u2287",
  "suphsol;": "\u27C9",
  "suphsub;": "\u2AD7",
  "suplarr;": "\u297B",
  "supmult;": "\u2AC2",
  "supnE;": "\u2ACC",
  "supne;": "\u228B",
  "supplus;": "\u2AC0",
  "Supset;": "\u22D1",
  "supset;": "\u2283",
  "supseteq;": "\u2287",
  "supseteqq;": "\u2AC6",
  "supsetneq;": "\u228B",
  "supsetneqq;": "\u2ACC",
  "supsim;": "\u2AC8",
  "supsub;": "\u2AD4",
  "supsup;": "\u2AD6",
  "swarhk;": "\u2926",
  "swArr;": "\u21D9",
  "swarr;": "\u2199",
  "swarrow;": "\u2199",
  "swnwar;": "\u292A",
  "szlig;": "\xDF",
  "szlig": "\xDF",
  "Tab;": "\t",
  "target;": "\u2316",
  "Tau;": "\u03A4",
  "tau;": "\u03C4",
  "tbrk;": "\u23B4",
  "Tcaron;": "\u0164",
  "tcaron;": "\u0165",
  "Tcedil;": "\u0162",
  "tcedil;": "\u0163",
  "Tcy;": "\u0422",
  "tcy;": "\u0442",
  "tdot;": "\u20DB",
  "telrec;": "\u2315",
  "Tfr;": "\uD835\uDD17",
  "tfr;": "\uD835\uDD31",
  "there4;": "\u2234",
  "Therefore;": "\u2234",
  "therefore;": "\u2234",
  "Theta;": "\u0398",
  "theta;": "\u03B8",
  "thetasym;": "\u03D1",
  "thetav;": "\u03D1",
  "thickapprox;": "\u2248",
  "thicksim;": "\u223C",
  "ThickSpace;": "\u205F\u200A",
  "thinsp;": "\u2009",
  "ThinSpace;": "\u2009",
  "thkap;": "\u2248",
  "thksim;": "\u223C",
  "THORN;": "\xDE",
  "THORN": "\xDE",
  "thorn;": "\xFE",
  "thorn": "\xFE",
  "Tilde;": "\u223C",
  "tilde;": "\u02DC",
  "TildeEqual;": "\u2243",
  "TildeFullEqual;": "\u2245",
  "TildeTilde;": "\u2248",
  "times;": "\xD7",
  "times": "\xD7",
  "timesb;": "\u22A0",
  "timesbar;": "\u2A31",
  "timesd;": "\u2A30",
  "tint;": "\u222D",
  "toea;": "\u2928",
  "top;": "\u22A4",
  "topbot;": "\u2336",
  "topcir;": "\u2AF1",
  "Topf;": "\uD835\uDD4B",
  "topf;": "\uD835\uDD65",
  "topfork;": "\u2ADA",
  "tosa;": "\u2929",
  "tprime;": "\u2034",
  "TRADE;": "\u2122",
  "trade;": "\u2122",
  "triangle;": "\u25B5",
  "triangledown;": "\u25BF",
  "triangleleft;": "\u25C3",
  "trianglelefteq;": "\u22B4",
  "triangleq;": "\u225C",
  "triangleright;": "\u25B9",
  "trianglerighteq;": "\u22B5",
  "tridot;": "\u25EC",
  "trie;": "\u225C",
  "triminus;": "\u2A3A",
  "TripleDot;": "\u20DB",
  "triplus;": "\u2A39",
  "trisb;": "\u29CD",
  "tritime;": "\u2A3B",
  "trpezium;": "\u23E2",
  "Tscr;": "\uD835\uDCAF",
  "tscr;": "\uD835\uDCC9",
  "TScy;": "\u0426",
  "tscy;": "\u0446",
  "TSHcy;": "\u040B",
  "tshcy;": "\u045B",
  "Tstrok;": "\u0166",
  "tstrok;": "\u0167",
  "twixt;": "\u226C",
  "twoheadleftarrow;": "\u219E",
  "twoheadrightarrow;": "\u21A0",
  "Uacute;": "\xDA",
  "Uacute": "\xDA",
  "uacute;": "\xFA",
  "uacute": "\xFA",
  "Uarr;": "\u219F",
  "uArr;": "\u21D1",
  "uarr;": "\u2191",
  "Uarrocir;": "\u2949",
  "Ubrcy;": "\u040E",
  "ubrcy;": "\u045E",
  "Ubreve;": "\u016C",
  "ubreve;": "\u016D",
  "Ucirc;": "\xDB",
  "Ucirc": "\xDB",
  "ucirc;": "\xFB",
  "ucirc": "\xFB",
  "Ucy;": "\u0423",
  "ucy;": "\u0443",
  "udarr;": "\u21C5",
  "Udblac;": "\u0170",
  "udblac;": "\u0171",
  "udhar;": "\u296E",
  "ufisht;": "\u297E",
  "Ufr;": "\uD835\uDD18",
  "ufr;": "\uD835\uDD32",
  "Ugrave;": "\xD9",
  "Ugrave": "\xD9",
  "ugrave;": "\xF9",
  "ugrave": "\xF9",
  "uHar;": "\u2963",
  "uharl;": "\u21BF",
  "uharr;": "\u21BE",
  "uhblk;": "\u2580",
  "ulcorn;": "\u231C",
  "ulcorner;": "\u231C",
  "ulcrop;": "\u230F",
  "ultri;": "\u25F8",
  "Umacr;": "\u016A",
  "umacr;": "\u016B",
  "uml;": "\xA8",
  "uml": "\xA8",
  "UnderBar;": "_",
  "UnderBrace;": "\u23DF",
  "UnderBracket;": "\u23B5",
  "UnderParenthesis;": "\u23DD",
  "Union;": "\u22C3",
  "UnionPlus;": "\u228E",
  "Uogon;": "\u0172",
  "uogon;": "\u0173",
  "Uopf;": "\uD835\uDD4C",
  "uopf;": "\uD835\uDD66",
  "UpArrow;": "\u2191",
  "Uparrow;": "\u21D1",
  "uparrow;": "\u2191",
  "UpArrowBar;": "\u2912",
  "UpArrowDownArrow;": "\u21C5",
  "UpDownArrow;": "\u2195",
  "Updownarrow;": "\u21D5",
  "updownarrow;": "\u2195",
  "UpEquilibrium;": "\u296E",
  "upharpoonleft;": "\u21BF",
  "upharpoonright;": "\u21BE",
  "uplus;": "\u228E",
  "UpperLeftArrow;": "\u2196",
  "UpperRightArrow;": "\u2197",
  "Upsi;": "\u03D2",
  "upsi;": "\u03C5",
  "upsih;": "\u03D2",
  "Upsilon;": "\u03A5",
  "upsilon;": "\u03C5",
  "UpTee;": "\u22A5",
  "UpTeeArrow;": "\u21A5",
  "upuparrows;": "\u21C8",
  "urcorn;": "\u231D",
  "urcorner;": "\u231D",
  "urcrop;": "\u230E",
  "Uring;": "\u016E",
  "uring;": "\u016F",
  "urtri;": "\u25F9",
  "Uscr;": "\uD835\uDCB0",
  "uscr;": "\uD835\uDCCA",
  "utdot;": "\u22F0",
  "Utilde;": "\u0168",
  "utilde;": "\u0169",
  "utri;": "\u25B5",
  "utrif;": "\u25B4",
  "uuarr;": "\u21C8",
  "Uuml;": "\xDC",
  "Uuml": "\xDC",
  "uuml;": "\xFC",
  "uuml": "\xFC",
  "uwangle;": "\u29A7",
  "vangrt;": "\u299C",
  "varepsilon;": "\u03F5",
  "varkappa;": "\u03F0",
  "varnothing;": "\u2205",
  "varphi;": "\u03D5",
  "varpi;": "\u03D6",
  "varpropto;": "\u221D",
  "vArr;": "\u21D5",
  "varr;": "\u2195",
  "varrho;": "\u03F1",
  "varsigma;": "\u03C2",
  "varsubsetneq;": "\u228A\uFE00",
  "varsubsetneqq;": "\u2ACB\uFE00",
  "varsupsetneq;": "\u228B\uFE00",
  "varsupsetneqq;": "\u2ACC\uFE00",
  "vartheta;": "\u03D1",
  "vartriangleleft;": "\u22B2",
  "vartriangleright;": "\u22B3",
  "Vbar;": "\u2AEB",
  "vBar;": "\u2AE8",
  "vBarv;": "\u2AE9",
  "Vcy;": "\u0412",
  "vcy;": "\u0432",
  "VDash;": "\u22AB",
  "Vdash;": "\u22A9",
  "vDash;": "\u22A8",
  "vdash;": "\u22A2",
  "Vdashl;": "\u2AE6",
  "Vee;": "\u22C1",
  "vee;": "\u2228",
  "veebar;": "\u22BB",
  "veeeq;": "\u225A",
  "vellip;": "\u22EE",
  "Verbar;": "\u2016",
  "verbar;": "|",
  "Vert;": "\u2016",
  "vert;": "|",
  "VerticalBar;": "\u2223",
  "VerticalLine;": "|",
  "VerticalSeparator;": "\u2758",
  "VerticalTilde;": "\u2240",
  "VeryThinSpace;": "\u200A",
  "Vfr;": "\uD835\uDD19",
  "vfr;": "\uD835\uDD33",
  "vltri;": "\u22B2",
  "vnsub;": "\u2282\u20D2",
  "vnsup;": "\u2283\u20D2",
  "Vopf;": "\uD835\uDD4D",
  "vopf;": "\uD835\uDD67",
  "vprop;": "\u221D",
  "vrtri;": "\u22B3",
  "Vscr;": "\uD835\uDCB1",
  "vscr;": "\uD835\uDCCB",
  "vsubnE;": "\u2ACB\uFE00",
  "vsubne;": "\u228A\uFE00",
  "vsupnE;": "\u2ACC\uFE00",
  "vsupne;": "\u228B\uFE00",
  "Vvdash;": "\u22AA",
  "vzigzag;": "\u299A",
  "Wcirc;": "\u0174",
  "wcirc;": "\u0175",
  "wedbar;": "\u2A5F",
  "Wedge;": "\u22C0",
  "wedge;": "\u2227",
  "wedgeq;": "\u2259",
  "weierp;": "\u2118",
  "Wfr;": "\uD835\uDD1A",
  "wfr;": "\uD835\uDD34",
  "Wopf;": "\uD835\uDD4E",
  "wopf;": "\uD835\uDD68",
  "wp;": "\u2118",
  "wr;": "\u2240",
  "wreath;": "\u2240",
  "Wscr;": "\uD835\uDCB2",
  "wscr;": "\uD835\uDCCC",
  "xcap;": "\u22C2",
  "xcirc;": "\u25EF",
  "xcup;": "\u22C3",
  "xdtri;": "\u25BD",
  "Xfr;": "\uD835\uDD1B",
  "xfr;": "\uD835\uDD35",
  "xhArr;": "\u27FA",
  "xharr;": "\u27F7",
  "Xi;": "\u039E",
  "xi;": "\u03BE",
  "xlArr;": "\u27F8",
  "xlarr;": "\u27F5",
  "xmap;": "\u27FC",
  "xnis;": "\u22FB",
  "xodot;": "\u2A00",
  "Xopf;": "\uD835\uDD4F",
  "xopf;": "\uD835\uDD69",
  "xoplus;": "\u2A01",
  "xotime;": "\u2A02",
  "xrArr;": "\u27F9",
  "xrarr;": "\u27F6",
  "Xscr;": "\uD835\uDCB3",
  "xscr;": "\uD835\uDCCD",
  "xsqcup;": "\u2A06",
  "xuplus;": "\u2A04",
  "xutri;": "\u25B3",
  "xvee;": "\u22C1",
  "xwedge;": "\u22C0",
  "Yacute;": "\xDD",
  "Yacute": "\xDD",
  "yacute;": "\xFD",
  "yacute": "\xFD",
  "YAcy;": "\u042F",
  "yacy;": "\u044F",
  "Ycirc;": "\u0176",
  "ycirc;": "\u0177",
  "Ycy;": "\u042B",
  "ycy;": "\u044B",
  "yen;": "\xA5",
  "yen": "\xA5",
  "Yfr;": "\uD835\uDD1C",
  "yfr;": "\uD835\uDD36",
  "YIcy;": "\u0407",
  "yicy;": "\u0457",
  "Yopf;": "\uD835\uDD50",
  "yopf;": "\uD835\uDD6A",
  "Yscr;": "\uD835\uDCB4",
  "yscr;": "\uD835\uDCCE",
  "YUcy;": "\u042E",
  "yucy;": "\u044E",
  "Yuml;": "\u0178",
  "yuml;": "\xFF",
  "yuml": "\xFF",
  "Zacute;": "\u0179",
  "zacute;": "\u017A",
  "Zcaron;": "\u017D",
  "zcaron;": "\u017E",
  "Zcy;": "\u0417",
  "zcy;": "\u0437",
  "Zdot;": "\u017B",
  "zdot;": "\u017C",
  "zeetrf;": "\u2128",
  "ZeroWidthSpace;": "\u200B",
  "Zeta;": "\u0396",
  "zeta;": "\u03B6",
  "Zfr;": "\u2128",
  "zfr;": "\uD835\uDD37",
  "ZHcy;": "\u0416",
  "zhcy;": "\u0436",
  "zigrarr;": "\u21DD",
  "Zopf;": "\u2124",
  "zopf;": "\uD835\uDD6B",
  "Zscr;": "\uD835\uDCB5",
  "zscr;": "\uD835\uDCCF",
  "zwj;": "\u200D",
  "zwnj;": "\u200C"
};
//# sourceMappingURL=htmlEntities.js.map

/***/ }),
/* 86 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.Node = undefined;
exports.parse = parse;

var _htmlScanner = __webpack_require__(40);

var _arrays = __webpack_require__(59);

var _htmlTags = __webpack_require__(50);

var Node = /** @class */function () {
    function Node(start, end, children, parent) {
        this.start = start;
        this.end = end;
        this.children = children;
        this.parent = parent;
        this.closed = false;
    }
    Object.defineProperty(Node.prototype, "attributeNames", {
        get: function get() {
            return this.attributes ? Object.keys(this.attributes) : [];
        },
        enumerable: true,
        configurable: true
    });
    Node.prototype.isSameTag = function (tagInLowerCase) {
        return this.tag && tagInLowerCase && this.tag.length === tagInLowerCase.length && this.tag.toLowerCase() === tagInLowerCase;
    };
    Object.defineProperty(Node.prototype, "firstChild", {
        get: function get() {
            return this.children[0];
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Node.prototype, "lastChild", {
        get: function get() {
            return this.children.length ? this.children[this.children.length - 1] : void 0;
        },
        enumerable: true,
        configurable: true
    });
    Node.prototype.findNodeBefore = function (offset) {
        var idx = (0, _arrays.findFirst)(this.children, function (c) {
            return offset <= c.start;
        }) - 1;
        if (idx >= 0) {
            var child = this.children[idx];
            if (offset > child.start) {
                if (offset < child.end) {
                    return child.findNodeBefore(offset);
                }
                var lastChild = child.lastChild;
                if (lastChild && lastChild.end === child.end) {
                    return child.findNodeBefore(offset);
                }
                return child;
            }
        }
        return this;
    };
    Node.prototype.findNodeAt = function (offset) {
        var idx = (0, _arrays.findFirst)(this.children, function (c) {
            return offset <= c.start;
        }) - 1;
        if (idx >= 0) {
            var child = this.children[idx];
            if (offset > child.start && offset <= child.end) {
                return child.findNodeAt(offset);
            }
        }
        return this;
    };
    return Node;
}();
exports.Node = Node;
function parse(text) {
    var scanner = (0, _htmlScanner.createScanner)(text);
    var htmlDocument = new Node(0, text.length, [], void 0);
    var curr = htmlDocument;
    var endTagStart = -1;
    var pendingAttribute = null;
    var token = scanner.scan();
    while (token !== _htmlScanner.TokenType.EOS) {
        switch (token) {
            case _htmlScanner.TokenType.StartTagOpen:
                var child = new Node(scanner.getTokenOffset(), text.length, [], curr);
                curr.children.push(child);
                curr = child;
                break;
            case _htmlScanner.TokenType.StartTag:
                curr.tag = scanner.getTokenText();
                break;
            case _htmlScanner.TokenType.StartTagClose:
                curr.end = scanner.getTokenEnd(); // might be later set to end tag position
                if (curr.tag && (0, _htmlTags.isEmptyElement)(curr.tag) && curr.parent) {
                    curr.closed = true;
                    curr = curr.parent;
                }
                break;
            case _htmlScanner.TokenType.EndTagOpen:
                endTagStart = scanner.getTokenOffset();
                break;
            case _htmlScanner.TokenType.EndTag:
                var closeTag = scanner.getTokenText().toLowerCase();
                while (!curr.isSameTag(closeTag) && curr.parent) {
                    curr.end = endTagStart;
                    curr.closed = false;
                    curr = curr.parent;
                }
                if (curr !== htmlDocument) {
                    curr.closed = true;
                    curr.endTagStart = endTagStart;
                }
                break;
            case _htmlScanner.TokenType.StartTagSelfClose:
                if (curr.parent) {
                    curr.closed = true;
                    curr.end = scanner.getTokenEnd();
                    curr = curr.parent;
                }
                break;
            case _htmlScanner.TokenType.EndTagClose:
                if (curr.parent) {
                    curr.end = scanner.getTokenEnd();
                    curr = curr.parent;
                }
                break;
            case _htmlScanner.TokenType.AttributeName:
                {
                    var attributeName = pendingAttribute = scanner.getTokenText();
                    var attributes = curr.attributes;
                    if (!attributes) {
                        curr.attributes = attributes = {};
                    }
                    attributes[pendingAttribute] = null; // Support valueless attributes such as 'checked'
                    break;
                }
            case _htmlScanner.TokenType.AttributeValue:
                {
                    var value = scanner.getTokenText();
                    var attributes = curr.attributes;
                    if (attributes && pendingAttribute) {
                        attributes[pendingAttribute] = value;
                        pendingAttribute = null;
                    }
                    break;
                }
        }
        token = scanner.scan();
    }
    while (curr.parent) {
        curr.end = text.length;
        curr.closed = false;
        curr = curr.parent;
    }
    return {
        roots: htmlDocument.children,
        findNodeBefore: htmlDocument.findNodeBefore.bind(htmlDocument),
        findNodeAt: htmlDocument.findNodeAt.bind(htmlDocument)
    };
}
//# sourceMappingURL=htmlParser.js.map

/***/ }),
/* 87 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.getRazorTagProvider = getRazorTagProvider;
function getRazorTagProvider() {
    var customTags = {
        a: ['asp-action', 'asp-controller', 'asp-fragment', 'asp-host', 'asp-protocol', 'asp-route'],
        div: ['asp-validation-summary'],
        form: ['asp-action', 'asp-controller', 'asp-anti-forgery'],
        input: ['asp-for', 'asp-format'],
        label: ['asp-for'],
        select: ['asp-for', 'asp-items'],
        span: ['asp-validation-for']
    };
    return {
        getId: function getId() {
            return 'razor';
        },
        isApplicable: function isApplicable(languageId) {
            return languageId === 'razor';
        },
        collectTags: function collectTags(collector) {
            // no extra tags
        },
        collectAttributes: function collectAttributes(tag, collector) {
            if (tag) {
                var attributes = customTags[tag];
                if (attributes) {
                    attributes.forEach(function (a) {
                        return collector(a);
                    });
                }
            }
        },
        collectValues: function collectValues(tag, attribute, collector) {
            // no values
        }
    };
}
//# sourceMappingURL=razorTags.js.map

/***/ }),
/* 88 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.HTMLCompletion = undefined;

var _main = __webpack_require__(36);

var _htmlScanner = __webpack_require__(40);

var _htmlTags = __webpack_require__(50);

var _tagProviders = __webpack_require__(58);

var _htmlEntities = __webpack_require__(85);

var _vscodeNls = __webpack_require__(51);

var nls = _interopRequireWildcard(_vscodeNls);

var _strings = __webpack_require__(43);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

var localize = nls.loadMessageBundle();
var HTMLCompletion = /** @class */function () {
    function HTMLCompletion() {
        this.completionParticipants = [];
    }
    HTMLCompletion.prototype.setCompletionParticipants = function (registeredCompletionParticipants) {
        this.completionParticipants = registeredCompletionParticipants || [];
    };
    HTMLCompletion.prototype.doComplete = function (document, position, htmlDocument, settings) {
        var result = {
            isIncomplete: false,
            items: []
        };
        var completionParticipants = this.completionParticipants;
        var tagProviders = _tagProviders.allTagProviders.filter(function (p) {
            return p.isApplicable(document.languageId) && (!settings || settings[p.getId()] !== false);
        });
        var text = document.getText();
        var offset = document.offsetAt(position);
        var node = htmlDocument.findNodeBefore(offset);
        if (!node) {
            return result;
        }
        var scanner = (0, _htmlScanner.createScanner)(text, node.start);
        var currentTag = '';
        var currentAttributeName;
        function getReplaceRange(replaceStart, replaceEnd) {
            if (replaceEnd === void 0) {
                replaceEnd = offset;
            }
            if (replaceStart > offset) {
                replaceStart = offset;
            }
            return { start: document.positionAt(replaceStart), end: document.positionAt(replaceEnd) };
        }
        function collectOpenTagSuggestions(afterOpenBracket, tagNameEnd) {
            var range = getReplaceRange(afterOpenBracket, tagNameEnd);
            tagProviders.forEach(function (provider) {
                provider.collectTags(function (tag, label) {
                    result.items.push({
                        label: tag,
                        kind: _main.CompletionItemKind.Property,
                        documentation: label,
                        textEdit: _main.TextEdit.replace(range, tag),
                        insertTextFormat: _main.InsertTextFormat.PlainText
                    });
                });
            });
            return result;
        }
        function getLineIndent(offset) {
            var start = offset;
            while (start > 0) {
                var ch = text.charAt(start - 1);
                if ("\n\r".indexOf(ch) >= 0) {
                    return text.substring(start, offset);
                }
                if (!isWhiteSpace(ch)) {
                    return null;
                }
                start--;
            }
            return text.substring(0, offset);
        }
        function collectCloseTagSuggestions(afterOpenBracket, inOpenTag, tagNameEnd) {
            if (tagNameEnd === void 0) {
                tagNameEnd = offset;
            }
            var range = getReplaceRange(afterOpenBracket, tagNameEnd);
            var closeTag = isFollowedBy(text, tagNameEnd, _htmlScanner.ScannerState.WithinEndTag, _htmlScanner.TokenType.EndTagClose) ? '' : '>';
            var curr = node;
            if (inOpenTag) {
                curr = curr.parent; // don't suggest the own tag, it's not yet open
            }
            while (curr) {
                var tag = curr.tag;
                if (tag && (!curr.closed || curr.endTagStart && curr.endTagStart > offset)) {
                    var item = {
                        label: '/' + tag,
                        kind: _main.CompletionItemKind.Property,
                        filterText: '/' + tag + closeTag,
                        textEdit: _main.TextEdit.replace(range, '/' + tag + closeTag),
                        insertTextFormat: _main.InsertTextFormat.PlainText
                    };
                    var startIndent = getLineIndent(curr.start);
                    var endIndent = getLineIndent(afterOpenBracket - 1);
                    if (startIndent !== null && endIndent !== null && startIndent !== endIndent) {
                        var insertText = startIndent + '</' + tag + closeTag;
                        item.textEdit = _main.TextEdit.replace(getReplaceRange(afterOpenBracket - 1 - endIndent.length), insertText);
                        item.filterText = endIndent + '</' + tag + closeTag;
                    }
                    result.items.push(item);
                    return result;
                }
                curr = curr.parent;
            }
            if (inOpenTag) {
                return result;
            }
            tagProviders.forEach(function (provider) {
                provider.collectTags(function (tag, label) {
                    result.items.push({
                        label: '/' + tag,
                        kind: _main.CompletionItemKind.Property,
                        documentation: label,
                        filterText: '/' + tag + closeTag,
                        textEdit: _main.TextEdit.replace(range, '/' + tag + closeTag),
                        insertTextFormat: _main.InsertTextFormat.PlainText
                    });
                });
            });
            return result;
        }
        function collectAutoCloseTagSuggestion(tagCloseEnd, tag) {
            if (settings && settings.hideAutoCompleteProposals) {
                return result;
            }
            if (!(0, _htmlTags.isEmptyElement)(tag)) {
                var pos = document.positionAt(tagCloseEnd);
                result.items.push({
                    label: '</' + tag + '>',
                    kind: _main.CompletionItemKind.Property,
                    filterText: '</' + tag + '>',
                    textEdit: _main.TextEdit.insert(pos, '$0</' + tag + '>'),
                    insertTextFormat: _main.InsertTextFormat.Snippet
                });
            }
            return result;
        }
        function collectTagSuggestions(tagStart, tagEnd) {
            collectOpenTagSuggestions(tagStart, tagEnd);
            collectCloseTagSuggestions(tagStart, true, tagEnd);
            return result;
        }
        function collectAttributeNameSuggestions(nameStart, nameEnd) {
            if (nameEnd === void 0) {
                nameEnd = offset;
            }
            var replaceEnd = offset;
            while (replaceEnd < nameEnd && text[replaceEnd] !== '<') {
                replaceEnd++;
            }
            var range = getReplaceRange(nameStart, replaceEnd);
            var value = isFollowedBy(text, nameEnd, _htmlScanner.ScannerState.AfterAttributeName, _htmlScanner.TokenType.DelimiterAssign) ? '' : '="$1"';
            var tag = currentTag.toLowerCase();
            var seenAttributes = Object.create(null);
            tagProviders.forEach(function (provider) {
                provider.collectAttributes(tag, function (attribute, type) {
                    if (seenAttributes[attribute]) {
                        return;
                    }
                    seenAttributes[attribute] = true;
                    var codeSnippet = attribute;
                    var command;
                    if (type !== 'v' && value.length) {
                        codeSnippet = codeSnippet + value;
                        if (type) {
                            command = {
                                title: 'Suggest',
                                command: 'editor.action.triggerSuggest'
                            };
                        }
                    }
                    result.items.push({
                        label: attribute,
                        kind: type === 'handler' ? _main.CompletionItemKind.Function : _main.CompletionItemKind.Value,
                        textEdit: _main.TextEdit.replace(range, codeSnippet),
                        insertTextFormat: _main.InsertTextFormat.Snippet,
                        command: command
                    });
                });
            });
            collectDataAttributesSuggestions(range, seenAttributes);
            return result;
        }
        function collectDataAttributesSuggestions(range, seenAttributes) {
            var dataAttr = 'data-';
            var dataAttributes = {};
            dataAttributes[dataAttr] = dataAttr + "$1=\"$2\"";
            function addNodeDataAttributes(node) {
                node.attributeNames.forEach(function (attr) {
                    if ((0, _strings.startsWith)(attr, dataAttr) && !dataAttributes[attr] && !seenAttributes[attr]) {
                        dataAttributes[attr] = attr + '="$1"';
                    }
                });
                node.children.forEach(function (child) {
                    return addNodeDataAttributes(child);
                });
            }
            if (htmlDocument) {
                htmlDocument.roots.forEach(function (root) {
                    return addNodeDataAttributes(root);
                });
            }
            Object.keys(dataAttributes).forEach(function (attr) {
                return result.items.push({
                    label: attr,
                    kind: _main.CompletionItemKind.Value,
                    textEdit: _main.TextEdit.replace(range, dataAttributes[attr]),
                    insertTextFormat: _main.InsertTextFormat.Snippet
                });
            });
        }
        function collectAttributeValueSuggestions(valueStart, valueEnd) {
            if (valueEnd === void 0) {
                valueEnd = offset;
            }
            var range;
            var addQuotes;
            var valuePrefix;
            if (offset > valueStart && offset <= valueEnd && isQuote(text[valueStart])) {
                // inside quoted attribute
                var valueContentStart = valueStart + 1;
                var valueContentEnd = valueEnd;
                // valueEnd points to the char after quote, which encloses the replace range
                if (valueEnd > valueStart && text[valueEnd - 1] === text[valueStart]) {
                    valueContentEnd--;
                }
                var wsBefore = getWordStart(text, offset, valueContentStart);
                var wsAfter = getWordEnd(text, offset, valueContentEnd);
                range = getReplaceRange(wsBefore, wsAfter);
                valuePrefix = offset >= valueContentStart && offset <= valueContentEnd ? text.substring(valueContentStart, offset) : '';
                addQuotes = false;
            } else {
                range = getReplaceRange(valueStart, valueEnd);
                valuePrefix = text.substring(valueStart, offset);
                addQuotes = true;
            }
            var tag = currentTag.toLowerCase();
            var attribute = currentAttributeName.toLowerCase();
            if (completionParticipants.length > 0) {
                var fullRange = getReplaceRange(valueStart, valueEnd);
                for (var _i = 0, completionParticipants_1 = completionParticipants; _i < completionParticipants_1.length; _i++) {
                    var participant = completionParticipants_1[_i];
                    if (participant.onHtmlAttributeValue) {
                        participant.onHtmlAttributeValue({ document: document, position: position, tag: tag, attribute: attribute, value: valuePrefix, range: fullRange });
                    }
                }
            }
            var value = scanner.getTokenText();
            tagProviders.forEach(function (provider) {
                provider.collectValues(tag, attribute, function (value) {
                    var insertText = addQuotes ? '"' + value + '"' : value;
                    result.items.push({
                        label: value,
                        filterText: insertText,
                        kind: _main.CompletionItemKind.Unit,
                        textEdit: _main.TextEdit.replace(range, insertText),
                        insertTextFormat: _main.InsertTextFormat.PlainText
                    });
                });
            });
            collectCharacterEntityProposals();
            return result;
        }
        function scanNextForEndPos(nextToken) {
            if (offset === scanner.getTokenEnd()) {
                token = scanner.scan();
                if (token === nextToken && scanner.getTokenOffset() === offset) {
                    return scanner.getTokenEnd();
                }
            }
            return offset;
        }
        function collectInsideContent() {
            for (var _i = 0, completionParticipants_2 = completionParticipants; _i < completionParticipants_2.length; _i++) {
                var participant = completionParticipants_2[_i];
                if (participant.onHtmlContent) {
                    participant.onHtmlContent({ document: document, position: position });
                }
            }
            return collectCharacterEntityProposals();
        }
        function collectCharacterEntityProposals() {
            // character entities
            var k = offset - 1;
            var characterStart = position.character;
            while (k >= 0 && (0, _strings.isLetterOrDigit)(text, k)) {
                k--;
                characterStart--;
            }
            if (k >= 0 && text[k] === '&') {
                var range = _main.Range.create(_main.Position.create(position.line, characterStart - 1), position);
                for (var entity in _htmlEntities.entities) {
                    if ((0, _strings.endsWith)(entity, ';')) {
                        var label = '&' + entity;
                        result.items.push({
                            label: label,
                            kind: _main.CompletionItemKind.Keyword,
                            documentation: localize('entity.propose', "Character entity representing '" + _htmlEntities.entities[entity] + "'"),
                            textEdit: _main.TextEdit.replace(range, label),
                            insertTextFormat: _main.InsertTextFormat.PlainText
                        });
                    }
                }
            }
            return result;
        }
        var token = scanner.scan();
        while (token !== _htmlScanner.TokenType.EOS && scanner.getTokenOffset() <= offset) {
            switch (token) {
                case _htmlScanner.TokenType.StartTagOpen:
                    if (scanner.getTokenEnd() === offset) {
                        var endPos = scanNextForEndPos(_htmlScanner.TokenType.StartTag);
                        return collectTagSuggestions(offset, endPos);
                    }
                    break;
                case _htmlScanner.TokenType.StartTag:
                    if (scanner.getTokenOffset() <= offset && offset <= scanner.getTokenEnd()) {
                        return collectOpenTagSuggestions(scanner.getTokenOffset(), scanner.getTokenEnd());
                    }
                    currentTag = scanner.getTokenText();
                    break;
                case _htmlScanner.TokenType.AttributeName:
                    if (scanner.getTokenOffset() <= offset && offset <= scanner.getTokenEnd()) {
                        return collectAttributeNameSuggestions(scanner.getTokenOffset(), scanner.getTokenEnd());
                    }
                    currentAttributeName = scanner.getTokenText();
                    break;
                case _htmlScanner.TokenType.DelimiterAssign:
                    if (scanner.getTokenEnd() === offset) {
                        var endPos = scanNextForEndPos(_htmlScanner.TokenType.AttributeValue);
                        return collectAttributeValueSuggestions(offset, endPos);
                    }
                    break;
                case _htmlScanner.TokenType.AttributeValue:
                    if (scanner.getTokenOffset() <= offset && offset <= scanner.getTokenEnd()) {
                        return collectAttributeValueSuggestions(scanner.getTokenOffset(), scanner.getTokenEnd());
                    }
                    break;
                case _htmlScanner.TokenType.Whitespace:
                    if (offset <= scanner.getTokenEnd()) {
                        switch (scanner.getScannerState()) {
                            case _htmlScanner.ScannerState.AfterOpeningStartTag:
                                var startPos = scanner.getTokenOffset();
                                var endTagPos = scanNextForEndPos(_htmlScanner.TokenType.StartTag);
                                return collectTagSuggestions(startPos, endTagPos);
                            case _htmlScanner.ScannerState.WithinTag:
                            case _htmlScanner.ScannerState.AfterAttributeName:
                                return collectAttributeNameSuggestions(scanner.getTokenEnd());
                            case _htmlScanner.ScannerState.BeforeAttributeValue:
                                return collectAttributeValueSuggestions(scanner.getTokenEnd());
                            case _htmlScanner.ScannerState.AfterOpeningEndTag:
                                return collectCloseTagSuggestions(scanner.getTokenOffset() - 1, false);
                            case _htmlScanner.ScannerState.WithinContent:
                                return collectInsideContent();
                        }
                    }
                    break;
                case _htmlScanner.TokenType.EndTagOpen:
                    if (offset <= scanner.getTokenEnd()) {
                        var afterOpenBracket = scanner.getTokenOffset() + 1;
                        var endOffset = scanNextForEndPos(_htmlScanner.TokenType.EndTag);
                        return collectCloseTagSuggestions(afterOpenBracket, false, endOffset);
                    }
                    break;
                case _htmlScanner.TokenType.EndTag:
                    if (offset <= scanner.getTokenEnd()) {
                        var start = scanner.getTokenOffset() - 1;
                        while (start >= 0) {
                            var ch = text.charAt(start);
                            if (ch === '/') {
                                return collectCloseTagSuggestions(start, false, scanner.getTokenEnd());
                            } else if (!isWhiteSpace(ch)) {
                                break;
                            }
                            start--;
                        }
                    }
                    break;
                case _htmlScanner.TokenType.StartTagClose:
                    if (offset <= scanner.getTokenEnd()) {
                        if (currentTag) {
                            return collectAutoCloseTagSuggestion(scanner.getTokenEnd(), currentTag);
                        }
                    }
                    break;
                case _htmlScanner.TokenType.Content:
                    if (offset <= scanner.getTokenEnd()) {
                        return collectInsideContent();
                    }
                    break;
                default:
                    if (offset <= scanner.getTokenEnd()) {
                        return result;
                    }
                    break;
            }
            token = scanner.scan();
        }
        return result;
    };
    HTMLCompletion.prototype.doTagComplete = function (document, position, htmlDocument) {
        var offset = document.offsetAt(position);
        if (offset <= 0) {
            return null;
        }
        var char = document.getText().charAt(offset - 1);
        if (char === '>') {
            var node = htmlDocument.findNodeBefore(offset);
            if (node && node.tag && !(0, _htmlTags.isEmptyElement)(node.tag) && node.start < offset && (!node.endTagStart || node.endTagStart > offset)) {
                var scanner = (0, _htmlScanner.createScanner)(document.getText(), node.start);
                var token = scanner.scan();
                while (token !== _htmlScanner.TokenType.EOS && scanner.getTokenEnd() <= offset) {
                    if (token === _htmlScanner.TokenType.StartTagClose && scanner.getTokenEnd() === offset) {
                        return "$0</" + node.tag + ">";
                    }
                    token = scanner.scan();
                }
            }
        } else if (char === '/') {
            var node = htmlDocument.findNodeBefore(offset);
            while (node && node.closed) {
                node = node.parent;
            }
            if (node && node.tag) {
                var scanner = (0, _htmlScanner.createScanner)(document.getText(), node.start);
                var token = scanner.scan();
                while (token !== _htmlScanner.TokenType.EOS && scanner.getTokenEnd() <= offset) {
                    if (token === _htmlScanner.TokenType.EndTagOpen && scanner.getTokenEnd() === offset) {
                        return node.tag + ">";
                    }
                    token = scanner.scan();
                }
            }
        }
        return null;
    };
    return HTMLCompletion;
}();
exports.HTMLCompletion = HTMLCompletion;

function isQuote(s) {
    return (/^["']*$/.test(s)
    );
}
function isWhiteSpace(s) {
    return (/^\s*$/.test(s)
    );
}
function isFollowedBy(s, offset, intialState, expectedToken) {
    var scanner = (0, _htmlScanner.createScanner)(s, offset, intialState);
    var token = scanner.scan();
    while (token === _htmlScanner.TokenType.Whitespace) {
        token = scanner.scan();
    }
    return token === expectedToken;
}
function getWordStart(s, offset, limit) {
    while (offset > limit && !isWhiteSpace(s[offset - 1])) {
        offset--;
    }
    return offset;
}
function getWordEnd(s, offset, limit) {
    while (offset < limit && !isWhiteSpace(s[offset])) {
        offset++;
    }
    return offset;
}
//# sourceMappingURL=htmlCompletion.js.map

/***/ }),
/* 89 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.format = format;

var _main = __webpack_require__(36);

var _beautifyHtml = __webpack_require__(83);

var _strings = __webpack_require__(43);

function format(document, range, options) {
    var value = document.getText();
    var includesEnd = true;
    var initialIndentLevel = 0;
    var tabSize = options.tabSize || 4;
    if (range) {
        var startOffset = document.offsetAt(range.start);
        // include all leading whitespace iff at the beginning of the line
        var extendedStart = startOffset;
        while (extendedStart > 0 && isWhitespace(value, extendedStart - 1)) {
            extendedStart--;
        }
        if (extendedStart === 0 || isEOL(value, extendedStart - 1)) {
            startOffset = extendedStart;
        } else {
            // else keep at least one whitespace
            if (extendedStart < startOffset) {
                startOffset = extendedStart + 1;
            }
        }
        // include all following whitespace until the end of the line
        var endOffset = document.offsetAt(range.end);
        var extendedEnd = endOffset;
        while (extendedEnd < value.length && isWhitespace(value, extendedEnd)) {
            extendedEnd++;
        }
        if (extendedEnd === value.length || isEOL(value, extendedEnd)) {
            endOffset = extendedEnd;
        }
        range = _main.Range.create(document.positionAt(startOffset), document.positionAt(endOffset));
        includesEnd = endOffset === value.length;
        value = value.substring(startOffset, endOffset);
        if (startOffset !== 0) {
            var startOfLineOffset = document.offsetAt(_main.Position.create(range.start.line, 0));
            initialIndentLevel = computeIndentLevel(document.getText(), startOfLineOffset, options);
        }
    } else {
        range = _main.Range.create(_main.Position.create(0, 0), document.positionAt(value.length));
    }
    var htmlOptions = {
        indent_size: options.insertSpaces ? tabSize : 1,
        indent_char: options.insertSpaces ? ' ' : '\t',
        wrap_line_length: getFormatOption(options, 'wrapLineLength', 120),
        unformatted: getTagsFormatOption(options, 'unformatted', void 0),
        content_unformatted: getTagsFormatOption(options, 'contentUnformatted', void 0),
        indent_inner_html: getFormatOption(options, 'indentInnerHtml', false),
        preserve_newlines: getFormatOption(options, 'preserveNewLines', true),
        max_preserve_newlines: getFormatOption(options, 'maxPreserveNewLines', 32786),
        indent_handlebars: getFormatOption(options, 'indentHandlebars', false),
        end_with_newline: includesEnd && getFormatOption(options, 'endWithNewline', false),
        extra_liners: getTagsFormatOption(options, 'extraLiners', void 0),
        wrap_attributes: getFormatOption(options, 'wrapAttributes', 'auto'),
        eol: '\n'
    };
    var result = (0, _beautifyHtml.html_beautify)(value, htmlOptions);
    if (initialIndentLevel > 0) {
        var indent = options.insertSpaces ? (0, _strings.repeat)(' ', tabSize * initialIndentLevel) : (0, _strings.repeat)('\t', initialIndentLevel);
        result = result.split('\n').join('\n' + indent);
        if (range.start.character === 0) {
            result = indent + result; // keep the indent
        }
    }
    return [{
        range: range,
        newText: result
    }];
}
function getFormatOption(options, key, dflt) {
    if (options && options.hasOwnProperty(key)) {
        var value = options[key];
        if (value !== null) {
            return value;
        }
    }
    return dflt;
}
function getTagsFormatOption(options, key, dflt) {
    var list = getFormatOption(options, key, null);
    if (typeof list === 'string') {
        if (list.length > 0) {
            return list.split(',').map(function (t) {
                return t.trim().toLowerCase();
            });
        }
        return [];
    }
    return dflt;
}
function computeIndentLevel(content, offset, options) {
    var i = offset;
    var nChars = 0;
    var tabSize = options.tabSize || 4;
    while (i < content.length) {
        var ch = content.charAt(i);
        if (ch === ' ') {
            nChars++;
        } else if (ch === '\t') {
            nChars += tabSize;
        } else {
            break;
        }
        i++;
    }
    return Math.floor(nChars / tabSize);
}
function getEOL(document) {
    var text = document.getText();
    if (document.lineCount > 1) {
        var to = document.offsetAt(_main.Position.create(1, 0));
        var from = to;
        while (from > 0 && isEOL(text, from - 1)) {
            from--;
        }
        return text.substr(from, to - from);
    }
    return '\n';
}
function isEOL(text, offset) {
    return '\r\n'.indexOf(text.charAt(offset)) !== -1;
}
function isWhitespace(text, offset) {
    return ' \t'.indexOf(text.charAt(offset)) !== -1;
}
//# sourceMappingURL=htmlFormatter.js.map

/***/ }),
/* 90 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.findDocumentHighlights = findDocumentHighlights;

var _htmlScanner = __webpack_require__(40);

var _main = __webpack_require__(36);

function findDocumentHighlights(document, position, htmlDocument) {
    var offset = document.offsetAt(position);
    var node = htmlDocument.findNodeAt(offset);
    if (!node.tag) {
        return [];
    }
    var result = [];
    var startTagRange = getTagNameRange(_htmlScanner.TokenType.StartTag, document, node.start);
    var endTagRange = typeof node.endTagStart === 'number' && getTagNameRange(_htmlScanner.TokenType.EndTag, document, node.endTagStart);
    if (startTagRange && covers(startTagRange, position) || endTagRange && covers(endTagRange, position)) {
        if (startTagRange) {
            result.push({ kind: _main.DocumentHighlightKind.Read, range: startTagRange });
        }
        if (endTagRange) {
            result.push({ kind: _main.DocumentHighlightKind.Read, range: endTagRange });
        }
    }
    return result;
}
function isBeforeOrEqual(pos1, pos2) {
    return pos1.line < pos2.line || pos1.line === pos2.line && pos1.character <= pos2.character;
}
function covers(range, position) {
    return isBeforeOrEqual(range.start, position) && isBeforeOrEqual(position, range.end);
}
function getTagNameRange(tokenType, document, startOffset) {
    var scanner = (0, _htmlScanner.createScanner)(document.getText(), startOffset);
    var token = scanner.scan();
    while (token !== _htmlScanner.TokenType.EOS && token !== tokenType) {
        token = scanner.scan();
    }
    if (token !== _htmlScanner.TokenType.EOS) {
        return { start: document.positionAt(scanner.getTokenOffset()), end: document.positionAt(scanner.getTokenEnd()) };
    }
    return null;
}
//# sourceMappingURL=htmlHighlighting.js.map

/***/ }),
/* 91 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

exports.doHover = doHover;

var _htmlScanner = __webpack_require__(40);

var _main = __webpack_require__(36);

var _tagProviders = __webpack_require__(58);

function doHover(document, position, htmlDocument) {
    var offset = document.offsetAt(position);
    var node = htmlDocument.findNodeAt(offset);
    if (!node || !node.tag) {
        return null;
    }
    var tagProviders = _tagProviders.allTagProviders.filter(function (p) {
        return p.isApplicable(document.languageId);
    });
    function getTagHover(tag, range, open) {
        tag = tag.toLowerCase();
        var _loop_1 = function _loop_1(provider) {
            var hover = null;
            provider.collectTags(function (t, label) {
                if (t === tag) {
                    var tagLabel = open ? '<' + tag + '>' : '</' + tag + '>';
                    hover = { contents: [{ language: 'html', value: tagLabel }, _main.MarkedString.fromPlainText(label)], range: range };
                }
            });
            if (hover) {
                return { value: hover };
            }
        };
        for (var _i = 0, tagProviders_1 = tagProviders; _i < tagProviders_1.length; _i++) {
            var provider = tagProviders_1[_i];
            var state_1 = _loop_1(provider);
            if ((typeof state_1 === 'undefined' ? 'undefined' : _typeof(state_1)) === "object") return state_1.value;
        }
        return null;
    }
    function getTagNameRange(tokenType, startOffset) {
        var scanner = (0, _htmlScanner.createScanner)(document.getText(), startOffset);
        var token = scanner.scan();
        while (token !== _htmlScanner.TokenType.EOS && (scanner.getTokenEnd() < offset || scanner.getTokenEnd() === offset && token !== tokenType)) {
            token = scanner.scan();
        }
        if (token === tokenType && offset <= scanner.getTokenEnd()) {
            return { start: document.positionAt(scanner.getTokenOffset()), end: document.positionAt(scanner.getTokenEnd()) };
        }
        return null;
    }
    if (node.endTagStart && offset >= node.endTagStart) {
        var tagRange_1 = getTagNameRange(_htmlScanner.TokenType.EndTag, node.endTagStart);
        if (tagRange_1) {
            return getTagHover(node.tag, tagRange_1, false);
        }
        return null;
    }
    var tagRange = getTagNameRange(_htmlScanner.TokenType.StartTag, node.start);
    if (tagRange) {
        return getTagHover(node.tag, tagRange, true);
    }
    return null;
}
//# sourceMappingURL=htmlHover.js.map

/***/ }),
/* 92 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.findDocumentLinks = findDocumentLinks;

var _htmlScanner = __webpack_require__(40);

var _main = __webpack_require__(36);

var _strings = __webpack_require__(43);

var strings = _interopRequireWildcard(_strings);

var _index = __webpack_require__(94);

var _index2 = _interopRequireDefault(_index);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function normalizeRef(url, languageId) {
    var first = url[0];
    var last = url[url.length - 1];
    if (first === last && (first === '\'' || first === '\"')) {
        url = url.substr(1, url.length - 2);
    }
    if (languageId === 'razor' && url[0] === '~') {
        url = url.substr(1);
    }
    return url;
}
function validateRef(url, languageId) {
    if (!url.length) {
        return false;
    }
    if (languageId === 'handlebars' && /{{.*}}/.test(url)) {
        return false;
    }
    if (languageId === 'razor' && /@/.test(url)) {
        return false;
    }
    try {
        return !!_index2.default.parse(url);
    } catch (e) {
        return false;
    }
}
function getWorkspaceUrl(documentUri, tokenContent, documentContext, base) {
    if (/^\s*javascript\:/i.test(tokenContent) || /^\s*\#/i.test(tokenContent) || /[\n\r]/.test(tokenContent)) {
        return null;
    }
    tokenContent = tokenContent.replace(/^\s*/g, '');
    if (/^https?:\/\//i.test(tokenContent) || /^file:\/\//i.test(tokenContent)) {
        // Absolute link that needs no treatment
        return tokenContent;
    }
    if (/^\/\//i.test(tokenContent)) {
        // Absolute link (that does not name the protocol)
        var pickedScheme = strings.startsWith(documentUri, 'https://') ? 'https' : 'http';
        return pickedScheme + ':' + tokenContent.replace(/^\s*/g, '');
    }
    if (documentContext) {
        return documentContext.resolveReference(tokenContent, base || documentUri);
    }
    return tokenContent;
}
function createLink(document, documentContext, attributeValue, startOffset, endOffset, base) {
    var tokenContent = normalizeRef(attributeValue, document.languageId);
    if (!validateRef(tokenContent, document.languageId)) {
        return null;
    }
    if (tokenContent.length < attributeValue.length) {
        startOffset++;
        endOffset--;
    }
    var workspaceUrl = getWorkspaceUrl(document.uri, tokenContent, documentContext, base);
    if (!workspaceUrl || !isValidURI(workspaceUrl)) {
        return null;
    }
    return {
        range: _main.Range.create(document.positionAt(startOffset), document.positionAt(endOffset)),
        target: workspaceUrl
    };
}
function isValidURI(uri) {
    try {
        _index2.default.parse(uri);
        return true;
    } catch (e) {
        return false;
    }
}
function findDocumentLinks(document, documentContext) {
    var newLinks = [];
    var rootAbsoluteUrl = null;
    var scanner = (0, _htmlScanner.createScanner)(document.getText(), 0);
    var token = scanner.scan();
    var afterHrefOrSrc = false;
    var afterBase = false;
    var base = void 0;
    while (token !== _htmlScanner.TokenType.EOS) {
        switch (token) {
            case _htmlScanner.TokenType.StartTag:
                if (!base) {
                    var tagName = scanner.getTokenText().toLowerCase();
                    afterBase = tagName === 'base';
                }
                break;
            case _htmlScanner.TokenType.AttributeName:
                var attributeName = scanner.getTokenText().toLowerCase();
                afterHrefOrSrc = attributeName === 'src' || attributeName === 'href';
                break;
            case _htmlScanner.TokenType.AttributeValue:
                if (afterHrefOrSrc) {
                    var attributeValue = scanner.getTokenText();
                    if (!afterBase) {
                        var link = createLink(document, documentContext, attributeValue, scanner.getTokenOffset(), scanner.getTokenEnd(), base);
                        if (link) {
                            newLinks.push(link);
                        }
                    }
                    if (afterBase && typeof base === 'undefined') {
                        base = normalizeRef(attributeValue, document.languageId);
                        if (base && documentContext) {
                            base = documentContext.resolveReference(base, document.uri);
                        }
                    }
                    afterBase = false;
                    afterHrefOrSrc = false;
                }
                break;
        }
        token = scanner.scan();
    }
    return newLinks;
}
//# sourceMappingURL=htmlLinks.js.map

/***/ }),
/* 93 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.findDocumentSymbols = findDocumentSymbols;

var _main = __webpack_require__(36);

function findDocumentSymbols(document, htmlDocument) {
    var symbols = [];
    htmlDocument.roots.forEach(function (node) {
        provideFileSymbolsInternal(document, node, '', symbols);
    });
    return symbols;
}
function provideFileSymbolsInternal(document, node, container, symbols) {
    var name = nodeToName(node);
    var location = _main.Location.create(document.uri, _main.Range.create(document.positionAt(node.start), document.positionAt(node.end)));
    var symbol = {
        name: name,
        location: location,
        containerName: container,
        kind: _main.SymbolKind.Field
    };
    symbols.push(symbol);
    node.children.forEach(function (child) {
        provideFileSymbolsInternal(document, child, name, symbols);
    });
}
function nodeToName(node) {
    var name = node.tag;
    if (node.attributes) {
        var id = node.attributes['id'];
        var classes = node.attributes['class'];
        if (id) {
            name += "#" + id.replace(/[\"\']/g, '');
        }
        if (classes) {
            name += classes.replace(/[\"\']/g, '').split(/\s+/).map(function (className) {
                return "." + className;
            }).join('');
        }
    }
    return name || '?';
}
//# sourceMappingURL=htmlSymbolsProvider.js.map

/***/ }),
/* 94 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(process) {/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

function _encode(ch) {
    return '%' + ch.charCodeAt(0).toString(16).toUpperCase();
}
// see https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/encodeURIComponent
function encodeURIComponent2(str) {
    return encodeURIComponent(str).replace(/[!'()*]/g, _encode);
}
function encodeNoop(str) {
    return str.replace(/[#?]/, _encode);
}
/**
 * Uniform Resource Identifier (URI) http://tools.ietf.org/html/rfc3986.
 * This class is a simple parser which creates the basic component paths
 * (http://tools.ietf.org/html/rfc3986#section-3) with minimal validation
 * and encoding.
 *
 *       foo://example.com:8042/over/there?name=ferret#nose
 *       \_/   \______________/\_________/ \_________/ \__/
 *        |           |            |            |        |
 *     scheme     authority       path        query   fragment
 *        |   _____________________|__
 *       / \ /                        \
 *       urn:example:animal:ferret:nose
 *
 *
 */
var URI = function () {
    function URI() {
        this._scheme = URI._empty;
        this._authority = URI._empty;
        this._path = URI._empty;
        this._query = URI._empty;
        this._fragment = URI._empty;
        this._formatted = null;
        this._fsPath = null;
    }
    URI.isUri = function (thing) {
        if (thing instanceof URI) {
            return true;
        }
        if (!thing) {
            return false;
        }
        return typeof thing.authority === 'string' && typeof thing.fragment === 'string' && typeof thing.path === 'string' && typeof thing.query === 'string' && typeof thing.scheme === 'string';
    };
    Object.defineProperty(URI.prototype, "scheme", {
        /**
         * scheme is the 'http' part of 'http://www.msft.com/some/path?query#fragment'.
         * The part before the first colon.
         */
        get: function get() {
            return this._scheme;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(URI.prototype, "authority", {
        /**
         * authority is the 'www.msft.com' part of 'http://www.msft.com/some/path?query#fragment'.
         * The part between the first double slashes and the next slash.
         */
        get: function get() {
            return this._authority;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(URI.prototype, "path", {
        /**
         * path is the '/some/path' part of 'http://www.msft.com/some/path?query#fragment'.
         */
        get: function get() {
            return this._path;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(URI.prototype, "query", {
        /**
         * query is the 'query' part of 'http://www.msft.com/some/path?query#fragment'.
         */
        get: function get() {
            return this._query;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(URI.prototype, "fragment", {
        /**
         * fragment is the 'fragment' part of 'http://www.msft.com/some/path?query#fragment'.
         */
        get: function get() {
            return this._fragment;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(URI.prototype, "fsPath", {
        // ---- filesystem path -----------------------
        /**
         * Returns a string representing the corresponding file system path of this URI.
         * Will handle UNC paths and normalize windows drive letters to lower-case. Also
         * uses the platform specific path separator. Will *not* validate the path for
         * invalid characters and semantics. Will *not* look at the scheme of this URI.
         */
        get: function get() {
            if (!this._fsPath) {
                var value;
                if (this._authority && this._path && this.scheme === 'file') {
                    // unc path: file://shares/c$/far/boo
                    value = "//" + this._authority + this._path;
                } else if (URI._driveLetterPath.test(this._path)) {
                    // windows drive letter: file:///c:/far/boo
                    value = this._path[1].toLowerCase() + this._path.substr(2);
                } else {
                    // other path
                    value = this._path;
                }
                if (isWindows) {
                    value = value.replace(/\//g, '\\');
                }
                this._fsPath = value;
            }
            return this._fsPath;
        },
        enumerable: true,
        configurable: true
    });
    // ---- modify to new -------------------------
    URI.prototype.with = function (change) {
        if (!change) {
            return this;
        }
        var scheme = change.scheme,
            authority = change.authority,
            path = change.path,
            query = change.query,
            fragment = change.fragment;
        if (scheme === void 0) {
            scheme = this.scheme;
        } else if (scheme === null) {
            scheme = '';
        }
        if (authority === void 0) {
            authority = this.authority;
        } else if (authority === null) {
            authority = '';
        }
        if (path === void 0) {
            path = this.path;
        } else if (path === null) {
            path = '';
        }
        if (query === void 0) {
            query = this.query;
        } else if (query === null) {
            query = '';
        }
        if (fragment === void 0) {
            fragment = this.fragment;
        } else if (fragment === null) {
            fragment = '';
        }
        if (scheme === this.scheme && authority === this.authority && path === this.path && query === this.query && fragment === this.fragment) {
            return this;
        }
        var ret = new URI();
        ret._scheme = scheme;
        ret._authority = authority;
        ret._path = path;
        ret._query = query;
        ret._fragment = fragment;
        URI._validate(ret);
        return ret;
    };
    // ---- parse & validate ------------------------
    URI.parse = function (value) {
        var ret = new URI();
        var data = URI._parseComponents(value);
        ret._scheme = data.scheme;
        ret._authority = decodeURIComponent(data.authority);
        ret._path = decodeURIComponent(data.path);
        ret._query = decodeURIComponent(data.query);
        ret._fragment = decodeURIComponent(data.fragment);
        URI._validate(ret);
        return ret;
    };
    URI.file = function (path) {
        var ret = new URI();
        ret._scheme = 'file';
        // normalize to fwd-slashes on windows,
        // on other systems bwd-slaches are valid
        // filename character, eg /f\oo/ba\r.txt
        if (isWindows) {
            path = path.replace(/\\/g, URI._slash);
        }
        // check for authority as used in UNC shares
        // or use the path as given
        if (path[0] === URI._slash && path[0] === path[1]) {
            var idx = path.indexOf(URI._slash, 2);
            if (idx === -1) {
                ret._authority = path.substring(2);
            } else {
                ret._authority = path.substring(2, idx);
                ret._path = path.substring(idx);
            }
        } else {
            ret._path = path;
        }
        // Ensure that path starts with a slash
        // or that it is at least a slash
        if (ret._path[0] !== URI._slash) {
            ret._path = URI._slash + ret._path;
        }
        URI._validate(ret);
        return ret;
    };
    URI._parseComponents = function (value) {
        var ret = {
            scheme: URI._empty,
            authority: URI._empty,
            path: URI._empty,
            query: URI._empty,
            fragment: URI._empty
        };
        var match = URI._regexp.exec(value);
        if (match) {
            ret.scheme = match[2] || ret.scheme;
            ret.authority = match[4] || ret.authority;
            ret.path = match[5] || ret.path;
            ret.query = match[7] || ret.query;
            ret.fragment = match[9] || ret.fragment;
        }
        return ret;
    };
    URI.from = function (components) {
        return new URI().with(components);
    };
    URI._validate = function (ret) {
        // scheme, https://tools.ietf.org/html/rfc3986#section-3.1
        // ALPHA *( ALPHA / DIGIT / "+" / "-" / "." )
        if (ret.scheme && !URI._schemePattern.test(ret.scheme)) {
            throw new Error('[UriError]: Scheme contains illegal characters.');
        }
        // path, http://tools.ietf.org/html/rfc3986#section-3.3
        // If a URI contains an authority component, then the path component
        // must either be empty or begin with a slash ("/") character.  If a URI
        // does not contain an authority component, then the path cannot begin
        // with two slash characters ("//").
        if (ret.path) {
            if (ret.authority) {
                if (!URI._singleSlashStart.test(ret.path)) {
                    throw new Error('[UriError]: If a URI contains an authority component, then the path component must either be empty or begin with a slash ("/") character');
                }
            } else {
                if (URI._doubleSlashStart.test(ret.path)) {
                    throw new Error('[UriError]: If a URI does not contain an authority component, then the path cannot begin with two slash characters ("//")');
                }
            }
        }
    };
    // ---- printing/externalize ---------------------------
    /**
     *
     * @param skipEncoding Do not encode the result, default is `false`
     */
    URI.prototype.toString = function (skipEncoding) {
        if (skipEncoding === void 0) {
            skipEncoding = false;
        }
        if (!skipEncoding) {
            if (!this._formatted) {
                this._formatted = URI._asFormatted(this, false);
            }
            return this._formatted;
        } else {
            // we don't cache that
            return URI._asFormatted(this, true);
        }
    };
    URI._asFormatted = function (uri, skipEncoding) {
        var encoder = !skipEncoding ? encodeURIComponent2 : encodeNoop;
        var parts = [];
        var scheme = uri.scheme,
            authority = uri.authority,
            path = uri.path,
            query = uri.query,
            fragment = uri.fragment;
        if (scheme) {
            parts.push(scheme, ':');
        }
        if (authority || scheme === 'file') {
            parts.push('//');
        }
        if (authority) {
            authority = authority.toLowerCase();
            var idx = authority.indexOf(':');
            if (idx === -1) {
                parts.push(encoder(authority));
            } else {
                parts.push(encoder(authority.substr(0, idx)), authority.substr(idx));
            }
        }
        if (path) {
            // lower-case windows drive letters in /C:/fff or C:/fff
            var m = URI._upperCaseDrive.exec(path);
            if (m) {
                if (m[1]) {
                    path = '/' + m[2].toLowerCase() + path.substr(3); // "/c:".length === 3
                } else {
                    path = m[2].toLowerCase() + path.substr(2); // // "c:".length === 2
                }
            }
            // encode every segement but not slashes
            // make sure that # and ? are always encoded
            // when occurring in paths - otherwise the result
            // cannot be parsed back again
            var lastIdx = 0;
            while (true) {
                var idx = path.indexOf(URI._slash, lastIdx);
                if (idx === -1) {
                    parts.push(encoder(path.substring(lastIdx)));
                    break;
                }
                parts.push(encoder(path.substring(lastIdx, idx)), URI._slash);
                lastIdx = idx + 1;
            }
            ;
        }
        if (query) {
            parts.push('?', encoder(query));
        }
        if (fragment) {
            parts.push('#', encoder(fragment));
        }
        return parts.join(URI._empty);
    };
    URI.prototype.toJSON = function () {
        var res = {
            fsPath: this.fsPath,
            external: this.toString(),
            $mid: 1
        };
        if (this.path) {
            res.path = this.path;
        }
        if (this.scheme) {
            res.scheme = this.scheme;
        }
        if (this.authority) {
            res.authority = this.authority;
        }
        if (this.query) {
            res.query = this.query;
        }
        if (this.fragment) {
            res.fragment = this.fragment;
        }
        return res;
    };
    URI.revive = function (data) {
        var result = new URI();
        result._scheme = data.scheme || URI._empty;
        result._authority = data.authority || URI._empty;
        result._path = data.path || URI._empty;
        result._query = data.query || URI._empty;
        result._fragment = data.fragment || URI._empty;
        result._fsPath = data.fsPath;
        result._formatted = data.external;
        URI._validate(result);
        return result;
    };
    return URI;
}();
exports.default = URI;

URI._empty = '';
URI._slash = '/';
URI._regexp = /^(([^:/?#]+?):)?(\/\/([^/?#]*))?([^?#]*)(\?([^#]*))?(#(.*))?/;
URI._driveLetterPath = /^\/[a-zA-z]:/;
URI._upperCaseDrive = /^(\/)?([A-Z]:)/;
URI._schemePattern = /^\w[\w\d+.-]*$/;
URI._singleSlashStart = /^\//;
URI._doubleSlashStart = /^\/\//;
var isWindows;
if ((typeof process === 'undefined' ? 'undefined' : _typeof(process)) === 'object') {
    isWindows = process.platform === 'win32';
} else if ((typeof navigator === 'undefined' ? 'undefined' : _typeof(navigator)) === 'object') {
    var userAgent = navigator.userAgent;
    isWindows = userAgent.indexOf('Windows') >= 0;
}
/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(9)))

/***/ }),
/* 95 */,
/* 96 */,
/* 97 */,
/* 98 */,
/* 99 */,
/* 100 */,
/* 101 */,
/* 102 */,
/* 103 */,
/* 104 */,
/* 105 */,
/* 106 */,
/* 107 */,
/* 108 */,
/* 109 */,
/* 110 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/


var _editorWorker = __webpack_require__(15);

var worker = _interopRequireWildcard(_editorWorker);

var _htmlWorker = __webpack_require__(64);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

self.onmessage = function () {
    // ignore the first message
    worker.initialize(function (ctx, createData) {
        return new _htmlWorker.HTMLWorker(ctx, createData);
    });
};

/***/ })
/******/ ]);