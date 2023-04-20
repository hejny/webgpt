var TouchController = /******/ (function(modules) {
    // webpackBootstrap
    /******/ // The module cache
    /******/ var installedModules = {}; // The require function
    /******/
    /******/ /******/ function __webpack_require__(moduleId) {
        /******/
        /******/ // Check if module is in cache
        /******/ if (installedModules[moduleId]) {
            /******/ return installedModules[moduleId].exports;
            /******/
        } // Create a new module (and put it into the cache)
        /******/ /******/ var module = (installedModules[moduleId] = {
            /******/ i: moduleId,
            /******/ l: false,
            /******/ exports: {},
            /******/
        }); // Execute the module function
        /******/
        /******/ /******/ modules[moduleId].call(
            module.exports,
            module,
            module.exports,
            __webpack_require__,
        ); // Flag the module as loaded
        /******/
        /******/ /******/ module.l = true; // Return the exports of the module
        /******/
        /******/ /******/ return module.exports;
        /******/
    } // expose the modules object (__webpack_modules__)
    /******/
    /******/
    /******/ /******/ __webpack_require__.m = modules; // expose the module cache
    /******/
    /******/ /******/ __webpack_require__.c = installedModules; // define getter function for harmony exports
    /******/
    /******/ /******/ __webpack_require__.d = function(exports, name, getter) {
        /******/ if (!__webpack_require__.o(exports, name)) {
            /******/ Object.defineProperty(exports, name, {
                /******/ configurable: false,
                /******/ enumerable: true,
                /******/ get: getter,
                /******/
            });
            /******/
        }
        /******/
    }; // getDefaultExport function for compatibility with non-harmony modules
    /******/
    /******/ /******/ __webpack_require__.n = function(module) {
        /******/ var getter =
            module && module.__esModule
                ? /******/ function getDefault() {
                      return module['default'];
                  }
                : /******/ function getModuleExports() {
                      return module;
                  };
        /******/ __webpack_require__.d(getter, 'a', getter);
        /******/ return getter;
        /******/
    }; // Object.prototype.hasOwnProperty.call
    /******/
    /******/ /******/ __webpack_require__.o = function(object, property) {
        return Object.prototype.hasOwnProperty.call(object, property);
    }; // __webpack_public_path__
    /******/
    /******/ /******/ __webpack_require__.p = ''; // Load entry module and return exports
    /******/
    /******/ /******/ return __webpack_require__((__webpack_require__.s = 14));
    /******/
})(
    /************************************************************************/
    /******/ [
        /* 0 */
        /***/ function(module, exports, __webpack_require__) {
            'use strict';

            var root_1 = __webpack_require__(5);
            var toSubscriber_1 = __webpack_require__(16);
            var observable_1 = __webpack_require__(21);
            var pipe_1 = __webpack_require__(22);
            /**
             * A representation of any set of values over any amount of time. This is the most basic building block
             * of RxJS.
             *
             * @class Observable<T>
             */
            var Observable = (function() {
                /**
                 * @constructor
                 * @param {Function} subscribe the function that is called when the Observable is
                 * initially subscribed to. This function is given a Subscriber, to which new values
                 * can be `next`ed, or an `error` method can be called to raise an error, or
                 * `complete` can be called to notify of a successful completion.
                 */
                function Observable(subscribe) {
                    this._isScalar = false;
                    if (subscribe) {
                        this._subscribe = subscribe;
                    }
                }
                /**
                 * Creates a new Observable, with this Observable as the source, and the passed
                 * operator defined as the new observable's operator.
                 * @method lift
                 * @param {Operator} operator the operator defining the operation to take on the observable
                 * @return {Observable} a new observable with the Operator applied
                 */
                Observable.prototype.lift = function(operator) {
                    var observable = new Observable();
                    observable.source = this;
                    observable.operator = operator;
                    return observable;
                };
                /**
                 * Invokes an execution of an Observable and registers Observer handlers for notifications it will emit.
                 *
                 * <span class="informal">Use it when you have all these Observables, but still nothing is happening.</span>
                 *
                 * `subscribe` is not a regular operator, but a method that calls Observable's internal `subscribe` function. It
                 * might be for example a function that you passed to a {@link create} static factory, but most of the time it is
                 * a library implementation, which defines what and when will be emitted by an Observable. This means that calling
                 * `subscribe` is actually the moment when Observable starts its work, not when it is created, as it is often
                 * thought.
                 *
                 * Apart from starting the execution of an Observable, this method allows you to listen for values
                 * that an Observable emits, as well as for when it completes or errors. You can achieve this in two
                 * following ways.
                 *
                 * The first way is creating an object that implements {@link Observer} interface. It should have methods
                 * defined by that interface, but note that it should be just a regular JavaScript object, which you can create
                 * yourself in any way you want (ES6 class, classic function constructor, object literal etc.). In particular do
                 * not attempt to use any RxJS implementation details to create Observers - you don't need them. Remember also
                 * that your object does not have to implement all methods. If you find yourself creating a method that doesn't
                 * do anything, you can simply omit it. Note however, that if `error` method is not provided, all errors will
                 * be left uncaught.
                 *
                 * The second way is to give up on Observer object altogether and simply provide callback functions in place of its methods.
                 * This means you can provide three functions as arguments to `subscribe`, where first function is equivalent
                 * of a `next` method, second of an `error` method and third of a `complete` method. Just as in case of Observer,
                 * if you do not need to listen for something, you can omit a function, preferably by passing `undefined` or `null`,
                 * since `subscribe` recognizes these functions by where they were placed in function call. When it comes
                 * to `error` function, just as before, if not provided, errors emitted by an Observable will be thrown.
                 *
                 * Whatever style of calling `subscribe` you use, in both cases it returns a Subscription object.
                 * This object allows you to call `unsubscribe` on it, which in turn will stop work that an Observable does and will clean
                 * up all resources that an Observable used. Note that cancelling a subscription will not call `complete` callback
                 * provided to `subscribe` function, which is reserved for a regular completion signal that comes from an Observable.
                 *
                 * Remember that callbacks provided to `subscribe` are not guaranteed to be called asynchronously.
                 * It is an Observable itself that decides when these functions will be called. For example {@link of}
                 * by default emits all its values synchronously. Always check documentation for how given Observable
                 * will behave when subscribed and if its default behavior can be modified with a {@link Scheduler}.
                 *
                 * @example <caption>Subscribe with an Observer</caption>
                 * const sumObserver = {
                 *   sum: 0,
                 *   next(value) {
                 *     console.log('Adding: ' + value);
                 *     this.sum = this.sum + value;
                 *   },
                 *   error() { // We actually could just remove this method,
                 *   },        // since we do not really care about errors right now.
                 *   complete() {
                 *     console.log('Sum equals: ' + this.sum);
                 *   }
                 * };
                 *
                 * Rx.Observable.of(1, 2, 3) // Synchronously emits 1, 2, 3 and then completes.
                 * .subscribe(sumObserver);
                 *
                 * // Logs:
                 * // "Adding: 1"
                 * // "Adding: 2"
                 * // "Adding: 3"
                 * // "Sum equals: 6"
                 *
                 *
                 * @example <caption>Subscribe with functions</caption>
                 * let sum = 0;
                 *
                 * Rx.Observable.of(1, 2, 3)
                 * .subscribe(
                 *   function(value) {
                 *     console.log('Adding: ' + value);
                 *     sum = sum + value;
                 *   },
                 *   undefined,
                 *   function() {
                 *     console.log('Sum equals: ' + sum);
                 *   }
                 * );
                 *
                 * // Logs:
                 * // "Adding: 1"
                 * // "Adding: 2"
                 * // "Adding: 3"
                 * // "Sum equals: 6"
                 *
                 *
                 * @example <caption>Cancel a subscription</caption>
                 * const subscription = Rx.Observable.interval(1000).subscribe(
                 *   num => console.log(num),
                 *   undefined,
                 *   () => console.log('completed!') // Will not be called, even
                 * );                                // when cancelling subscription
                 *
                 *
                 * setTimeout(() => {
                 *   subscription.unsubscribe();
                 *   console.log('unsubscribed!');
                 * }, 2500);
                 *
                 * // Logs:
                 * // 0 after 1s
                 * // 1 after 2s
                 * // "unsubscribed!" after 2.5s
                 *
                 *
                 * @param {Observer|Function} observerOrNext (optional) Either an observer with methods to be called,
                 *  or the first of three possible handlers, which is the handler for each value emitted from the subscribed
                 *  Observable.
                 * @param {Function} error (optional) A handler for a terminal event resulting from an error. If no error handler is provided,
                 *  the error will be thrown as unhandled.
                 * @param {Function} complete (optional) A handler for a terminal event resulting from successful completion.
                 * @return {ISubscription} a subscription reference to the registered handlers
                 * @method subscribe
                 */
                Observable.prototype.subscribe = function(
                    observerOrNext,
                    error,
                    complete,
                ) {
                    var operator = this.operator;
                    var sink = toSubscriber_1.toSubscriber(
                        observerOrNext,
                        error,
                        complete,
                    );
                    if (operator) {
                        operator.call(sink, this.source);
                    } else {
                        sink.add(
                            this.source
                                ? this._subscribe(sink)
                                : this._trySubscribe(sink),
                        );
                    }
                    if (sink.syncErrorThrowable) {
                        sink.syncErrorThrowable = false;
                        if (sink.syncErrorThrown) {
                            throw sink.syncErrorValue;
                        }
                    }
                    return sink;
                };
                Observable.prototype._trySubscribe = function(sink) {
                    try {
                        return this._subscribe(sink);
                    } catch (err) {
                        sink.syncErrorThrown = true;
                        sink.syncErrorValue = err;
                        sink.error(err);
                    }
                };
                /**
                 * @method forEach
                 * @param {Function} next a handler for each value emitted by the observable
                 * @param {PromiseConstructor} [PromiseCtor] a constructor function used to instantiate the Promise
                 * @return {Promise} a promise that either resolves on observable completion or
                 *  rejects with the handled error
                 */
                Observable.prototype.forEach = function(next, PromiseCtor) {
                    var _this = this;
                    if (!PromiseCtor) {
                        if (
                            root_1.root.Rx &&
                            root_1.root.Rx.config &&
                            root_1.root.Rx.config.Promise
                        ) {
                            PromiseCtor = root_1.root.Rx.config.Promise;
                        } else if (root_1.root.Promise) {
                            PromiseCtor = root_1.root.Promise;
                        }
                    }
                    if (!PromiseCtor) {
                        throw new Error('no Promise impl found');
                    }
                    return new PromiseCtor(function(resolve, reject) {
                        // Must be declared in a separate statement to avoid a RefernceError when
                        // accessing subscription below in the closure due to Temporal Dead Zone.
                        var subscription;
                        subscription = _this.subscribe(
                            function(value) {
                                if (subscription) {
                                    // if there is a subscription, then we can surmise
                                    // the next handling is asynchronous. Any errors thrown
                                    // need to be rejected explicitly and unsubscribe must be
                                    // called manually
                                    try {
                                        next(value);
                                    } catch (err) {
                                        reject(err);
                                        subscription.unsubscribe();
                                    }
                                } else {
                                    // if there is NO subscription, then we're getting a nexted
                                    // value synchronously during subscription. We can just call it.
                                    // If it errors, Observable's `subscribe` will ensure the
                                    // unsubscription logic is called, then synchronously rethrow the error.
                                    // After that, Promise will trap the error and send it
                                    // down the rejection path.
                                    next(value);
                                }
                            },
                            reject,
                            resolve,
                        );
                    });
                };
                Observable.prototype._subscribe = function(subscriber) {
                    return this.source.subscribe(subscriber);
                };
                /**
                 * An interop point defined by the es7-observable spec https://github.com/zenparsing/es-observable
                 * @method Symbol.observable
                 * @return {Observable} this instance of the observable
                 */
                Observable.prototype[observable_1.observable] = function() {
                    return this;
                };
                /* tslint:enable:max-line-length */
                /**
                 * Used to stitch together functional operators into a chain.
                 * @method pipe
                 * @return {Observable} the Observable result of all of the operators having
                 * been called in the order they were passed in.
                 *
                 * @example
                 *
                 * import { map, filter, scan } from 'rxjs/operators';
                 *
                 * Rx.Observable.interval(1000)
                 *   .pipe(
                 *     filter(x => x % 2 === 0),
                 *     map(x => x + x),
                 *     scan((acc, x) => acc + x)
                 *   )
                 *   .subscribe(x => console.log(x))
                 */
                Observable.prototype.pipe = function() {
                    var operations = [];
                    for (var _i = 0; _i < arguments.length; _i++) {
                        operations[_i - 0] = arguments[_i];
                    }
                    if (operations.length === 0) {
                        return this;
                    }
                    return pipe_1.pipeFromArray(operations)(this);
                };
                /* tslint:enable:max-line-length */
                Observable.prototype.toPromise = function(PromiseCtor) {
                    var _this = this;
                    if (!PromiseCtor) {
                        if (
                            root_1.root.Rx &&
                            root_1.root.Rx.config &&
                            root_1.root.Rx.config.Promise
                        ) {
                            PromiseCtor = root_1.root.Rx.config.Promise;
                        } else if (root_1.root.Promise) {
                            PromiseCtor = root_1.root.Promise;
                        }
                    }
                    if (!PromiseCtor) {
                        throw new Error('no Promise impl found');
                    }
                    return new PromiseCtor(function(resolve, reject) {
                        var value;
                        _this.subscribe(
                            function(x) {
                                return (value = x);
                            },
                            function(err) {
                                return reject(err);
                            },
                            function() {
                                return resolve(value);
                            },
                        );
                    });
                };
                // HACK: Since TypeScript inherits static properties too, we have to
                // fight against TypeScript here so Subject can have a different static create signature
                /**
                 * Creates a new cold Observable by calling the Observable constructor
                 * @static true
                 * @owner Observable
                 * @method create
                 * @param {Function} subscribe? the subscriber function to be passed to the Observable constructor
                 * @return {Observable} a new cold observable
                 */
                Observable.create = function(subscribe) {
                    return new Observable(subscribe);
                };
                return Observable;
            })();
            exports.Observable = Observable;
            //# sourceMappingURL=Observable.js.map

            /***/
        },
        /* 1 */
        /***/ function(module, exports, __webpack_require__) {
            'use strict';

            var __extends =
                (this && this.__extends) ||
                function(d, b) {
                    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
                    function __() {
                        this.constructor = d;
                    }
                    d.prototype =
                        b === null
                            ? Object.create(b)
                            : ((__.prototype = b.prototype), new __());
                };
            var isFunction_1 = __webpack_require__(8);
            var Subscription_1 = __webpack_require__(2);
            var Observer_1 = __webpack_require__(10);
            var rxSubscriber_1 = __webpack_require__(6);
            /**
             * Implements the {@link Observer} interface and extends the
             * {@link Subscription} class. While the {@link Observer} is the public API for
             * consuming the values of an {@link Observable}, all Observers get converted to
             * a Subscriber, in order to provide Subscription-like capabilities such as
             * `unsubscribe`. Subscriber is a common type in RxJS, and crucial for
             * implementing operators, but it is rarely used as a public API.
             *
             * @class Subscriber<T>
             */
            var Subscriber = (function(_super) {
                __extends(Subscriber, _super);
                /**
                 * @param {Observer|function(value: T): void} [destinationOrNext] A partially
                 * defined Observer or a `next` callback function.
                 * @param {function(e: ?any): void} [error] The `error` callback of an
                 * Observer.
                 * @param {function(): void} [complete] The `complete` callback of an
                 * Observer.
                 */
                function Subscriber(destinationOrNext, error, complete) {
                    _super.call(this);
                    this.syncErrorValue = null;
                    this.syncErrorThrown = false;
                    this.syncErrorThrowable = false;
                    this.isStopped = false;
                    switch (arguments.length) {
                        case 0:
                            this.destination = Observer_1.empty;
                            break;
                        case 1:
                            if (!destinationOrNext) {
                                this.destination = Observer_1.empty;
                                break;
                            }
                            if (typeof destinationOrNext === 'object') {
                                if (destinationOrNext instanceof Subscriber) {
                                    this.destination = destinationOrNext;
                                    this.destination.add(this);
                                } else {
                                    this.syncErrorThrowable = true;
                                    this.destination = new SafeSubscriber(
                                        this,
                                        destinationOrNext,
                                    );
                                }
                                break;
                            }
                        default:
                            this.syncErrorThrowable = true;
                            this.destination = new SafeSubscriber(
                                this,
                                destinationOrNext,
                                error,
                                complete,
                            );
                            break;
                    }
                }
                Subscriber.prototype[rxSubscriber_1.rxSubscriber] = function() {
                    return this;
                };
                /**
                 * A static factory for a Subscriber, given a (potentially partial) definition
                 * of an Observer.
                 * @param {function(x: ?T): void} [next] The `next` callback of an Observer.
                 * @param {function(e: ?any): void} [error] The `error` callback of an
                 * Observer.
                 * @param {function(): void} [complete] The `complete` callback of an
                 * Observer.
                 * @return {Subscriber<T>} A Subscriber wrapping the (partially defined)
                 * Observer represented by the given arguments.
                 */
                Subscriber.create = function(next, error, complete) {
                    var subscriber = new Subscriber(next, error, complete);
                    subscriber.syncErrorThrowable = false;
                    return subscriber;
                };
                /**
                 * The {@link Observer} callback to receive notifications of type `next` from
                 * the Observable, with a value. The Observable may call this method 0 or more
                 * times.
                 * @param {T} [value] The `next` value.
                 * @return {void}
                 */
                Subscriber.prototype.next = function(value) {
                    if (!this.isStopped) {
                        this._next(value);
                    }
                };
                /**
                 * The {@link Observer} callback to receive notifications of type `error` from
                 * the Observable, with an attached {@link Error}. Notifies the Observer that
                 * the Observable has experienced an error condition.
                 * @param {any} [err] The `error` exception.
                 * @return {void}
                 */
                Subscriber.prototype.error = function(err) {
                    if (!this.isStopped) {
                        this.isStopped = true;
                        this._error(err);
                    }
                };
                /**
                 * The {@link Observer} callback to receive a valueless notification of type
                 * `complete` from the Observable. Notifies the Observer that the Observable
                 * has finished sending push-based notifications.
                 * @return {void}
                 */
                Subscriber.prototype.complete = function() {
                    if (!this.isStopped) {
                        this.isStopped = true;
                        this._complete();
                    }
                };
                Subscriber.prototype.unsubscribe = function() {
                    if (this.closed) {
                        return;
                    }
                    this.isStopped = true;
                    _super.prototype.unsubscribe.call(this);
                };
                Subscriber.prototype._next = function(value) {
                    this.destination.next(value);
                };
                Subscriber.prototype._error = function(err) {
                    this.destination.error(err);
                    this.unsubscribe();
                };
                Subscriber.prototype._complete = function() {
                    this.destination.complete();
                    this.unsubscribe();
                };
                Subscriber.prototype._unsubscribeAndRecycle = function() {
                    var _a = this,
                        _parent = _a._parent,
                        _parents = _a._parents;
                    this._parent = null;
                    this._parents = null;
                    this.unsubscribe();
                    this.closed = false;
                    this.isStopped = false;
                    this._parent = _parent;
                    this._parents = _parents;
                    return this;
                };
                return Subscriber;
            })(Subscription_1.Subscription);
            exports.Subscriber = Subscriber;
            /**
             * We need this JSDoc comment for affecting ESDoc.
             * @ignore
             * @extends {Ignored}
             */
            var SafeSubscriber = (function(_super) {
                __extends(SafeSubscriber, _super);
                function SafeSubscriber(
                    _parentSubscriber,
                    observerOrNext,
                    error,
                    complete,
                ) {
                    _super.call(this);
                    this._parentSubscriber = _parentSubscriber;
                    var next;
                    var context = this;
                    if (isFunction_1.isFunction(observerOrNext)) {
                        next = observerOrNext;
                    } else if (observerOrNext) {
                        next = observerOrNext.next;
                        error = observerOrNext.error;
                        complete = observerOrNext.complete;
                        if (observerOrNext !== Observer_1.empty) {
                            context = Object.create(observerOrNext);
                            if (isFunction_1.isFunction(context.unsubscribe)) {
                                this.add(context.unsubscribe.bind(context));
                            }
                            context.unsubscribe = this.unsubscribe.bind(this);
                        }
                    }
                    this._context = context;
                    this._next = next;
                    this._error = error;
                    this._complete = complete;
                }
                SafeSubscriber.prototype.next = function(value) {
                    if (!this.isStopped && this._next) {
                        var _parentSubscriber = this._parentSubscriber;
                        if (!_parentSubscriber.syncErrorThrowable) {
                            this.__tryOrUnsub(this._next, value);
                        } else if (
                            this.__tryOrSetError(
                                _parentSubscriber,
                                this._next,
                                value,
                            )
                        ) {
                            this.unsubscribe();
                        }
                    }
                };
                SafeSubscriber.prototype.error = function(err) {
                    if (!this.isStopped) {
                        var _parentSubscriber = this._parentSubscriber;
                        if (this._error) {
                            if (!_parentSubscriber.syncErrorThrowable) {
                                this.__tryOrUnsub(this._error, err);
                                this.unsubscribe();
                            } else {
                                this.__tryOrSetError(
                                    _parentSubscriber,
                                    this._error,
                                    err,
                                );
                                this.unsubscribe();
                            }
                        } else if (!_parentSubscriber.syncErrorThrowable) {
                            this.unsubscribe();
                            throw err;
                        } else {
                            _parentSubscriber.syncErrorValue = err;
                            _parentSubscriber.syncErrorThrown = true;
                            this.unsubscribe();
                        }
                    }
                };
                SafeSubscriber.prototype.complete = function() {
                    var _this = this;
                    if (!this.isStopped) {
                        var _parentSubscriber = this._parentSubscriber;
                        if (this._complete) {
                            var wrappedComplete = function() {
                                return _this._complete.call(_this._context);
                            };
                            if (!_parentSubscriber.syncErrorThrowable) {
                                this.__tryOrUnsub(wrappedComplete);
                                this.unsubscribe();
                            } else {
                                this.__tryOrSetError(
                                    _parentSubscriber,
                                    wrappedComplete,
                                );
                                this.unsubscribe();
                            }
                        } else {
                            this.unsubscribe();
                        }
                    }
                };
                SafeSubscriber.prototype.__tryOrUnsub = function(fn, value) {
                    try {
                        fn.call(this._context, value);
                    } catch (err) {
                        this.unsubscribe();
                        throw err;
                    }
                };
                SafeSubscriber.prototype.__tryOrSetError = function(
                    parent,
                    fn,
                    value,
                ) {
                    try {
                        fn.call(this._context, value);
                    } catch (err) {
                        parent.syncErrorValue = err;
                        parent.syncErrorThrown = true;
                        return true;
                    }
                    return false;
                };
                SafeSubscriber.prototype._unsubscribe = function() {
                    var _parentSubscriber = this._parentSubscriber;
                    this._context = null;
                    this._parentSubscriber = null;
                    _parentSubscriber.unsubscribe();
                };
                return SafeSubscriber;
            })(Subscriber);
            //# sourceMappingURL=Subscriber.js.map

            /***/
        },
        /* 2 */
        /***/ function(module, exports, __webpack_require__) {
            'use strict';

            var isArray_1 = __webpack_require__(17);
            var isObject_1 = __webpack_require__(18);
            var isFunction_1 = __webpack_require__(8);
            var tryCatch_1 = __webpack_require__(19);
            var errorObject_1 = __webpack_require__(9);
            var UnsubscriptionError_1 = __webpack_require__(20);
            /**
             * Represents a disposable resource, such as the execution of an Observable. A
             * Subscription has one important method, `unsubscribe`, that takes no argument
             * and just disposes the resource held by the subscription.
             *
             * Additionally, subscriptions may be grouped together through the `add()`
             * method, which will attach a child Subscription to the current Subscription.
             * When a Subscription is unsubscribed, all its children (and its grandchildren)
             * will be unsubscribed as well.
             *
             * @class Subscription
             */
            var Subscription = (function() {
                /**
                 * @param {function(): void} [unsubscribe] A function describing how to
                 * perform the disposal of resources when the `unsubscribe` method is called.
                 */
                function Subscription(unsubscribe) {
                    /**
                     * A flag to indicate whether this Subscription has already been unsubscribed.
                     * @type {boolean}
                     */
                    this.closed = false;
                    this._parent = null;
                    this._parents = null;
                    this._subscriptions = null;
                    if (unsubscribe) {
                        this._unsubscribe = unsubscribe;
                    }
                }
                /**
                 * Disposes the resources held by the subscription. May, for instance, cancel
                 * an ongoing Observable execution or cancel any other type of work that
                 * started when the Subscription was created.
                 * @return {void}
                 */
                Subscription.prototype.unsubscribe = function() {
                    var hasErrors = false;
                    var errors;
                    if (this.closed) {
                        return;
                    }
                    var _a = this,
                        _parent = _a._parent,
                        _parents = _a._parents,
                        _unsubscribe = _a._unsubscribe,
                        _subscriptions = _a._subscriptions;
                    this.closed = true;
                    this._parent = null;
                    this._parents = null;
                    // null out _subscriptions first so any child subscriptions that attempt
                    // to remove themselves from this subscription will noop
                    this._subscriptions = null;
                    var index = -1;
                    var len = _parents ? _parents.length : 0;
                    // if this._parent is null, then so is this._parents, and we
                    // don't have to remove ourselves from any parent subscriptions.
                    while (_parent) {
                        _parent.remove(this);
                        // if this._parents is null or index >= len,
                        // then _parent is set to null, and the loop exits
                        _parent = (++index < len && _parents[index]) || null;
                    }
                    if (isFunction_1.isFunction(_unsubscribe)) {
                        var trial = tryCatch_1
                            .tryCatch(_unsubscribe)
                            .call(this);
                        if (trial === errorObject_1.errorObject) {
                            hasErrors = true;
                            errors =
                                errors ||
                                (errorObject_1.errorObject.e instanceof
                                UnsubscriptionError_1.UnsubscriptionError
                                    ? flattenUnsubscriptionErrors(
                                          errorObject_1.errorObject.e.errors,
                                      )
                                    : [errorObject_1.errorObject.e]);
                        }
                    }
                    if (isArray_1.isArray(_subscriptions)) {
                        index = -1;
                        len = _subscriptions.length;
                        while (++index < len) {
                            var sub = _subscriptions[index];
                            if (isObject_1.isObject(sub)) {
                                var trial = tryCatch_1
                                    .tryCatch(sub.unsubscribe)
                                    .call(sub);
                                if (trial === errorObject_1.errorObject) {
                                    hasErrors = true;
                                    errors = errors || [];
                                    var err = errorObject_1.errorObject.e;
                                    if (
                                        err instanceof
                                        UnsubscriptionError_1.UnsubscriptionError
                                    ) {
                                        errors = errors.concat(
                                            flattenUnsubscriptionErrors(
                                                err.errors,
                                            ),
                                        );
                                    } else {
                                        errors.push(err);
                                    }
                                }
                            }
                        }
                    }
                    if (hasErrors) {
                        throw new UnsubscriptionError_1.UnsubscriptionError(
                            errors,
                        );
                    }
                };
                /**
                 * Adds a tear down to be called during the unsubscribe() of this
                 * Subscription.
                 *
                 * If the tear down being added is a subscription that is already
                 * unsubscribed, is the same reference `add` is being called on, or is
                 * `Subscription.EMPTY`, it will not be added.
                 *
                 * If this subscription is already in an `closed` state, the passed
                 * tear down logic will be executed immediately.
                 *
                 * @param {TeardownLogic} teardown The additional logic to execute on
                 * teardown.
                 * @return {Subscription} Returns the Subscription used or created to be
                 * added to the inner subscriptions list. This Subscription can be used with
                 * `remove()` to remove the passed teardown logic from the inner subscriptions
                 * list.
                 */
                Subscription.prototype.add = function(teardown) {
                    if (!teardown || teardown === Subscription.EMPTY) {
                        return Subscription.EMPTY;
                    }
                    if (teardown === this) {
                        return this;
                    }
                    var subscription = teardown;
                    switch (typeof teardown) {
                        case 'function':
                            subscription = new Subscription(teardown);
                        case 'object':
                            if (
                                subscription.closed ||
                                typeof subscription.unsubscribe !== 'function'
                            ) {
                                return subscription;
                            } else if (this.closed) {
                                subscription.unsubscribe();
                                return subscription;
                            } else if (
                                typeof subscription._addParent !==
                                'function' /* quack quack */
                            ) {
                                var tmp = subscription;
                                subscription = new Subscription();
                                subscription._subscriptions = [tmp];
                            }
                            break;
                        default:
                            throw new Error(
                                'unrecognized teardown ' +
                                    teardown +
                                    ' added to Subscription.',
                            );
                    }
                    var subscriptions =
                        this._subscriptions || (this._subscriptions = []);
                    subscriptions.push(subscription);
                    subscription._addParent(this);
                    return subscription;
                };
                /**
                 * Removes a Subscription from the internal list of subscriptions that will
                 * unsubscribe during the unsubscribe process of this Subscription.
                 * @param {Subscription} subscription The subscription to remove.
                 * @return {void}
                 */
                Subscription.prototype.remove = function(subscription) {
                    var subscriptions = this._subscriptions;
                    if (subscriptions) {
                        var subscriptionIndex = subscriptions.indexOf(
                            subscription,
                        );
                        if (subscriptionIndex !== -1) {
                            subscriptions.splice(subscriptionIndex, 1);
                        }
                    }
                };
                Subscription.prototype._addParent = function(parent) {
                    var _a = this,
                        _parent = _a._parent,
                        _parents = _a._parents;
                    if (!_parent || _parent === parent) {
                        // If we don't have a parent, or the new parent is the same as the
                        // current parent, then set this._parent to the new parent.
                        this._parent = parent;
                    } else if (!_parents) {
                        // If there's already one parent, but not multiple, allocate an Array to
                        // store the rest of the parent Subscriptions.
                        this._parents = [parent];
                    } else if (_parents.indexOf(parent) === -1) {
                        // Only add the new parent to the _parents list if it's not already there.
                        _parents.push(parent);
                    }
                };
                Subscription.EMPTY = (function(empty) {
                    empty.closed = true;
                    return empty;
                })(new Subscription());
                return Subscription;
            })();
            exports.Subscription = Subscription;
            function flattenUnsubscriptionErrors(errors) {
                return errors.reduce(function(errs, err) {
                    return errs.concat(
                        err instanceof UnsubscriptionError_1.UnsubscriptionError
                            ? err.errors
                            : err,
                    );
                }, []);
            }
            //# sourceMappingURL=Subscription.js.map

            /***/
        },
        /* 3 */
        /***/ function(module, exports, __webpack_require__) {
            'use strict';

            var Observable_1 = __webpack_require__(0);
            var share_1 = __webpack_require__(24);
            Observable_1.Observable.prototype.share = share_1.share;
            //# sourceMappingURL=share.js.map

            /***/
        },
        /* 4 */
        /***/ function(module, exports, __webpack_require__) {
            'use strict';

            Object.defineProperty(exports, '__esModule', { value: true });
            var Vector2 = /** @class */ (function() {
                function Vector2(x, y) {
                    this.x = x;
                    this.y = y;
                }
                Vector2.Zero = function() {
                    return new Vector2(0, 0);
                };
                Vector2.prototype.clone = function() {
                    return new Vector2(this.x, this.y);
                };
                Vector2.prototype.add = function() {
                    var vectors = [];
                    for (var _i = 0; _i < arguments.length; _i++) {
                        vectors[_i] = arguments[_i];
                    }
                    return new Vector2(
                        vectors.reduce(function(x, vector2) {
                            return x + vector2.x;
                        }, this.x),
                        vectors.reduce(function(y, vector2) {
                            return y + vector2.y;
                        }, this.y),
                    );
                };
                Vector2.prototype.subtract = function(vector2) {
                    return new Vector2(this.x - vector2.x, this.y - vector2.y);
                };
                Vector2.prototype.scale = function(scale) {
                    return new Vector2(this.x * scale, this.y * scale);
                };
                Vector2.prototype.length = function(vector2) {
                    if (vector2 === void 0) {
                        vector2 = Vector2.Zero();
                    }
                    return Math.sqrt(
                        Math.pow(this.x - vector2.x, 2) +
                            Math.pow(this.y - vector2.y, 2),
                    );
                };
                Vector2.prototype.rotation = function(vector2) {
                    if (vector2 === void 0) {
                        vector2 = Vector2.Zero();
                    }
                    return Math.atan2(this.y - vector2.y, this.x - vector2.x);
                };
                Vector2.prototype.rotate = function(radians, vector2) {
                    if (vector2 === void 0) {
                        vector2 = Vector2.Zero();
                    }
                    var base = this.subtract(vector2);
                    var length = base.length();
                    var rotation = base.rotation();
                    return new Vector2(
                        Math.cos(rotation + radians) * length,
                        Math.sin(rotation + radians) * length,
                    ).add(vector2);
                };
                Vector2.prototype.toArray = function() {
                    return [this.x, this.y];
                };
                return Vector2;
            })();
            exports.default = Vector2;

            /***/
        },
        /* 5 */
        /***/ function(module, exports, __webpack_require__) {
            'use strict';
            /* WEBPACK VAR INJECTION */ (function(global) {
                // CommonJS / Node have global context exposed as "global" variable.
                // We don't want to include the whole node.d.ts this this compilation unit so we'll just fake
                // the global "global" var for now.
                var __window = typeof window !== 'undefined' && window;
                var __self =
                    typeof self !== 'undefined' &&
                    typeof WorkerGlobalScope !== 'undefined' &&
                    self instanceof WorkerGlobalScope &&
                    self;
                var __global = typeof global !== 'undefined' && global;
                var _root = __window || __global || __self;
                exports.root = _root;
                // Workaround Closure Compiler restriction: The body of a goog.module cannot use throw.
                // This is needed when used with angular/tsickle which inserts a goog.module statement.
                // Wrap in IIFE
                (function() {
                    if (!_root) {
                        throw new Error(
                            'RxJS could not find any global context (window, self, global)',
                        );
                    }
                })();
                //# sourceMappingURL=root.js.map
                /* WEBPACK VAR INJECTION */
            }.call(exports, __webpack_require__(7)));

            /***/
        },
        /* 6 */
        /***/ function(module, exports, __webpack_require__) {
            'use strict';

            var root_1 = __webpack_require__(5);
            var Symbol = root_1.root.Symbol;
            exports.rxSubscriber =
                typeof Symbol === 'function' && typeof Symbol.for === 'function'
                    ? Symbol.for('rxSubscriber')
                    : '@@rxSubscriber';
            /**
             * @deprecated use rxSubscriber instead
             */
            exports.$$rxSubscriber = exports.rxSubscriber;
            //# sourceMappingURL=rxSubscriber.js.map

            /***/
        },
        /* 7 */
        /***/ function(module, exports) {
            var g;

            // This works in non-strict mode
            g = (function() {
                return this;
            })();

            try {
                // This works if eval is allowed (see CSP)
                g = g || Function('return this')() || (1, eval)('this');
            } catch (e) {
                // This works if the window reference is available
                if (typeof window === 'object') g = window;
            }

            // g can still be undefined, but nothing to do about it...
            // We return undefined, instead of nothing here, so it's
            // easier to handle this case. if(!global) { ...}

            module.exports = g;

            /***/
        },
        /* 8 */
        /***/ function(module, exports, __webpack_require__) {
            'use strict';

            function isFunction(x) {
                return typeof x === 'function';
            }
            exports.isFunction = isFunction;
            //# sourceMappingURL=isFunction.js.map

            /***/
        },
        /* 9 */
        /***/ function(module, exports, __webpack_require__) {
            'use strict';

            // typeof any so that it we don't have to cast when comparing a result to the error object
            exports.errorObject = { e: {} };
            //# sourceMappingURL=errorObject.js.map

            /***/
        },
        /* 10 */
        /***/ function(module, exports, __webpack_require__) {
            'use strict';

            exports.empty = {
                closed: true,
                next: function(value) {},
                error: function(err) {
                    throw err;
                },
                complete: function() {},
            };
            //# sourceMappingURL=Observer.js.map

            /***/
        },
        /* 11 */
        /***/ function(module, exports, __webpack_require__) {
            'use strict';

            var __extends =
                (this && this.__extends) ||
                function(d, b) {
                    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
                    function __() {
                        this.constructor = d;
                    }
                    d.prototype =
                        b === null
                            ? Object.create(b)
                            : ((__.prototype = b.prototype), new __());
                };
            var Observable_1 = __webpack_require__(0);
            var Subscriber_1 = __webpack_require__(1);
            var Subscription_1 = __webpack_require__(2);
            var ObjectUnsubscribedError_1 = __webpack_require__(28);
            var SubjectSubscription_1 = __webpack_require__(29);
            var rxSubscriber_1 = __webpack_require__(6);
            /**
             * @class SubjectSubscriber<T>
             */
            var SubjectSubscriber = (function(_super) {
                __extends(SubjectSubscriber, _super);
                function SubjectSubscriber(destination) {
                    _super.call(this, destination);
                    this.destination = destination;
                }
                return SubjectSubscriber;
            })(Subscriber_1.Subscriber);
            exports.SubjectSubscriber = SubjectSubscriber;
            /**
             * @class Subject<T>
             */
            var Subject = (function(_super) {
                __extends(Subject, _super);
                function Subject() {
                    _super.call(this);
                    this.observers = [];
                    this.closed = false;
                    this.isStopped = false;
                    this.hasError = false;
                    this.thrownError = null;
                }
                Subject.prototype[rxSubscriber_1.rxSubscriber] = function() {
                    return new SubjectSubscriber(this);
                };
                Subject.prototype.lift = function(operator) {
                    var subject = new AnonymousSubject(this, this);
                    subject.operator = operator;
                    return subject;
                };
                Subject.prototype.next = function(value) {
                    if (this.closed) {
                        throw new ObjectUnsubscribedError_1.ObjectUnsubscribedError();
                    }
                    if (!this.isStopped) {
                        var observers = this.observers;
                        var len = observers.length;
                        var copy = observers.slice();
                        for (var i = 0; i < len; i++) {
                            copy[i].next(value);
                        }
                    }
                };
                Subject.prototype.error = function(err) {
                    if (this.closed) {
                        throw new ObjectUnsubscribedError_1.ObjectUnsubscribedError();
                    }
                    this.hasError = true;
                    this.thrownError = err;
                    this.isStopped = true;
                    var observers = this.observers;
                    var len = observers.length;
                    var copy = observers.slice();
                    for (var i = 0; i < len; i++) {
                        copy[i].error(err);
                    }
                    this.observers.length = 0;
                };
                Subject.prototype.complete = function() {
                    if (this.closed) {
                        throw new ObjectUnsubscribedError_1.ObjectUnsubscribedError();
                    }
                    this.isStopped = true;
                    var observers = this.observers;
                    var len = observers.length;
                    var copy = observers.slice();
                    for (var i = 0; i < len; i++) {
                        copy[i].complete();
                    }
                    this.observers.length = 0;
                };
                Subject.prototype.unsubscribe = function() {
                    this.isStopped = true;
                    this.closed = true;
                    this.observers = null;
                };
                Subject.prototype._trySubscribe = function(subscriber) {
                    if (this.closed) {
                        throw new ObjectUnsubscribedError_1.ObjectUnsubscribedError();
                    } else {
                        return _super.prototype._trySubscribe.call(
                            this,
                            subscriber,
                        );
                    }
                };
                Subject.prototype._subscribe = function(subscriber) {
                    if (this.closed) {
                        throw new ObjectUnsubscribedError_1.ObjectUnsubscribedError();
                    } else if (this.hasError) {
                        subscriber.error(this.thrownError);
                        return Subscription_1.Subscription.EMPTY;
                    } else if (this.isStopped) {
                        subscriber.complete();
                        return Subscription_1.Subscription.EMPTY;
                    } else {
                        this.observers.push(subscriber);
                        return new SubjectSubscription_1.SubjectSubscription(
                            this,
                            subscriber,
                        );
                    }
                };
                Subject.prototype.asObservable = function() {
                    var observable = new Observable_1.Observable();
                    observable.source = this;
                    return observable;
                };
                Subject.create = function(destination, source) {
                    return new AnonymousSubject(destination, source);
                };
                return Subject;
            })(Observable_1.Observable);
            exports.Subject = Subject;
            /**
             * @class AnonymousSubject<T>
             */
            var AnonymousSubject = (function(_super) {
                __extends(AnonymousSubject, _super);
                function AnonymousSubject(destination, source) {
                    _super.call(this);
                    this.destination = destination;
                    this.source = source;
                }
                AnonymousSubject.prototype.next = function(value) {
                    var destination = this.destination;
                    if (destination && destination.next) {
                        destination.next(value);
                    }
                };
                AnonymousSubject.prototype.error = function(err) {
                    var destination = this.destination;
                    if (destination && destination.error) {
                        this.destination.error(err);
                    }
                };
                AnonymousSubject.prototype.complete = function() {
                    var destination = this.destination;
                    if (destination && destination.complete) {
                        this.destination.complete();
                    }
                };
                AnonymousSubject.prototype._subscribe = function(subscriber) {
                    var source = this.source;
                    if (source) {
                        return this.source.subscribe(subscriber);
                    } else {
                        return Subscription_1.Subscription.EMPTY;
                    }
                };
                return AnonymousSubject;
            })(Subject);
            exports.AnonymousSubject = AnonymousSubject;
            //# sourceMappingURL=Subject.js.map

            /***/
        },
        /* 12 */
        /***/ function(module, exports, __webpack_require__) {
            'use strict';

            var __extends =
                (this && this.__extends) ||
                function(d, b) {
                    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
                    function __() {
                        this.constructor = d;
                    }
                    d.prototype =
                        b === null
                            ? Object.create(b)
                            : ((__.prototype = b.prototype), new __());
                };
            var Subscriber_1 = __webpack_require__(1);
            function refCount() {
                return function refCountOperatorFunction(source) {
                    return source.lift(new RefCountOperator(source));
                };
            }
            exports.refCount = refCount;
            var RefCountOperator = (function() {
                function RefCountOperator(connectable) {
                    this.connectable = connectable;
                }
                RefCountOperator.prototype.call = function(subscriber, source) {
                    var connectable = this.connectable;
                    connectable._refCount++;
                    var refCounter = new RefCountSubscriber(
                        subscriber,
                        connectable,
                    );
                    var subscription = source.subscribe(refCounter);
                    if (!refCounter.closed) {
                        refCounter.connection = connectable.connect();
                    }
                    return subscription;
                };
                return RefCountOperator;
            })();
            var RefCountSubscriber = (function(_super) {
                __extends(RefCountSubscriber, _super);
                function RefCountSubscriber(destination, connectable) {
                    _super.call(this, destination);
                    this.connectable = connectable;
                }
                RefCountSubscriber.prototype._unsubscribe = function() {
                    var connectable = this.connectable;
                    if (!connectable) {
                        this.connection = null;
                        return;
                    }
                    this.connectable = null;
                    var refCount = connectable._refCount;
                    if (refCount <= 0) {
                        this.connection = null;
                        return;
                    }
                    connectable._refCount = refCount - 1;
                    if (refCount > 1) {
                        this.connection = null;
                        return;
                    }
                    ///
                    // Compare the local RefCountSubscriber's connection Subscription to the
                    // connection Subscription on the shared ConnectableObservable. In cases
                    // where the ConnectableObservable source synchronously emits values, and
                    // the RefCountSubscriber's downstream Observers synchronously unsubscribe,
                    // execution continues to here before the RefCountOperator has a chance to
                    // supply the RefCountSubscriber with the shared connection Subscription.
                    // For example:
                    // ```
                    // Observable.range(0, 10)
                    //   .publish()
                    //   .refCount()
                    //   .take(5)
                    //   .subscribe();
                    // ```
                    // In order to account for this case, RefCountSubscriber should only dispose
                    // the ConnectableObservable's shared connection Subscription if the
                    // connection Subscription exists, *and* either:
                    //   a. RefCountSubscriber doesn't have a reference to the shared connection
                    //      Subscription yet, or,
                    //   b. RefCountSubscriber's connection Subscription reference is identical
                    //      to the shared connection Subscription
                    ///
                    var connection = this.connection;
                    var sharedConnection = connectable._connection;
                    this.connection = null;
                    if (
                        sharedConnection &&
                        (!connection || sharedConnection === connection)
                    ) {
                        sharedConnection.unsubscribe();
                    }
                };
                return RefCountSubscriber;
            })(Subscriber_1.Subscriber);
            //# sourceMappingURL=refCount.js.map

            /***/
        },
        /* 13 */
        /***/ function(module, exports, __webpack_require__) {
            'use strict';

            Object.defineProperty(exports, '__esModule', { value: true });
            var Vector2_1 = __webpack_require__(4);
            var Transformation = /** @class */ (function() {
                function Transformation(translate, rotate, scale) {
                    this.translate = translate;
                    this.rotate = rotate;
                    this.scale = scale;
                }
                Transformation.Zero = function() {
                    return new Transformation(Vector2_1.default.Zero(), 0, 1);
                };
                Transformation.prototype.clone = function() {
                    return new Transformation(
                        this.translate,
                        this.rotate,
                        this.scale,
                    );
                };
                Transformation.prototype.cloneDeep = function() {
                    return new Transformation(
                        this.translate.clone(),
                        this.rotate,
                        this.scale,
                    );
                };
                Transformation.prototype.add = function(transformation) {
                    return new Transformation(
                        this.translate.add(transformation.translate),
                        (this.rotate + transformation.rotate) % (Math.PI * 2),
                        this.scale * transformation.scale,
                    );
                };
                Transformation.prototype.subtract = function(transformation) {
                    return new Transformation(
                        this.translate.subtract(transformation.translate),
                        (this.rotate - transformation.rotate + Math.PI * 2) %
                            (Math.PI * 2),
                        this.scale / transformation.scale,
                    );
                };
                Transformation.prototype.nest = function(
                    transformation,
                    center,
                ) {
                    if (center === void 0) {
                        center = Vector2_1.default.Zero();
                    }
                    return new Transformation(
                        this.translate.add(
                            transformation.translate
                                .subtract(center)
                                .scale(this.scale),
                            //.rotate(this.rotate, this.translate.subtract(center).scale(this.scale))
                            //.subtract(center)
                        ),
                        (this.rotate + transformation.rotate) % (Math.PI * 2),
                        this.scale * transformation.scale,
                    );
                };
                return Transformation;
            })();
            exports.default = Transformation;

            /***/
        },
        /* 14 */
        /***/ function(module, exports, __webpack_require__) {
            'use strict';

            Object.defineProperty(exports, '__esModule', { value: true });
            var TouchController_1 = __webpack_require__(15);
            exports.TouchController = TouchController_1.default;
            var MultiTouchController_1 = __webpack_require__(35);
            exports.MultiTouchController = MultiTouchController_1.default;
            var multiTouchTransformations_1 = __webpack_require__(43);
            exports.multiTouchTransformations =
                multiTouchTransformations_1.default;
            var Transformation_1 = __webpack_require__(13);
            exports.Transformation = Transformation_1.default;
            var listeners_1 = __webpack_require__(44);
            exports.listeners = listeners_1.default;
            var Vector2_1 = __webpack_require__(4);
            exports.Vector2 = Vector2_1.default;

            /***/
        },
        /* 15 */
        /***/ function(module, exports, __webpack_require__) {
            'use strict';

            Object.defineProperty(exports, '__esModule', { value: true });
            var Observable_1 = __webpack_require__(0);
            __webpack_require__(3);
            var VectorTouch_1 = __webpack_require__(30);
            var Touch_1 = __webpack_require__(31);
            var TouchController = /** @class */ (function() {
                function TouchController(element) {
                    var _this = this;
                    this.element = element;
                    this._touchesAutoIncrement = 0;
                    this._ongoingTouches = [];
                    this.hover = new Touch_1.default(
                        this,
                        this._touchesAutoIncrement++,
                        'hover', //todo this should be external ID
                        'MOUSE',
                        new VectorTouch_1.default(
                            this,
                            0,
                            0,
                            performance.now(),
                        ), //todo better
                    );
                    this.touches = Observable_1.Observable.create(function(
                        observer,
                    ) {
                        _this._touchesObserver = observer;
                    }).share();
                }
                //todo dispose
                TouchController.prototype.addListener = function(listener) {
                    listener.setListeners(this); //todo array of listeners
                };
                TouchController.prototype.touchStart = function(
                    eventId,
                    type,
                    event,
                ) {
                    var touch = new Touch_1.default(
                        this,
                        this._touchesAutoIncrement++,
                        eventId,
                        type,
                        this._createVectorFromEvent(event),
                    );
                    this._ongoingTouches.push(touch);
                    this._touchesObserver.next(touch);
                };
                TouchController.prototype.touchMove = function(
                    eventId,
                    end,
                    event,
                ) {
                    var index = this._ongoingTouchIndexById(eventId);
                    if (index !== -1) {
                        var touch = this._ongoingTouches[index];
                        touch.move(this._createVectorFromEvent(event), end);
                        if (end) {
                            this._ongoingTouches.splice(index, 1);
                            //this.callSubscribers('END', touch);
                        } else {
                            //this.callSubscribers('MOVE', touch);
                        }
                    } else {
                        this.hoverMove(event);
                    }
                };
                TouchController.prototype.hoverMove = function(event) {
                    this.hover.move(this._createVectorFromEvent(event));
                };
                TouchController.prototype._createVectorFromEvent = function(
                    event,
                ) {
                    return new VectorTouch_1.default(
                        this,
                        event.clientX - this.element.offsetLeft,
                        event.clientY - this.element.offsetTop,
                        performance.now(),
                    );
                };
                TouchController.prototype._ongoingTouchIndexById = function(
                    eventIdToFind,
                ) {
                    for (var i = 0; i < this._ongoingTouches.length; i++) {
                        var eventId = this._ongoingTouches[i].eventId;
                        if (eventId === eventIdToFind) {
                            return i;
                        }
                    }
                    return -1;
                };
                return TouchController;
            })();
            exports.default = TouchController;

            /***/
        },
        /* 16 */
        /***/ function(module, exports, __webpack_require__) {
            'use strict';

            var Subscriber_1 = __webpack_require__(1);
            var rxSubscriber_1 = __webpack_require__(6);
            var Observer_1 = __webpack_require__(10);
            function toSubscriber(nextOrObserver, error, complete) {
                if (nextOrObserver) {
                    if (nextOrObserver instanceof Subscriber_1.Subscriber) {
                        return nextOrObserver;
                    }
                    if (nextOrObserver[rxSubscriber_1.rxSubscriber]) {
                        return nextOrObserver[rxSubscriber_1.rxSubscriber]();
                    }
                }
                if (!nextOrObserver && !error && !complete) {
                    return new Subscriber_1.Subscriber(Observer_1.empty);
                }
                return new Subscriber_1.Subscriber(
                    nextOrObserver,
                    error,
                    complete,
                );
            }
            exports.toSubscriber = toSubscriber;
            //# sourceMappingURL=toSubscriber.js.map

            /***/
        },
        /* 17 */
        /***/ function(module, exports, __webpack_require__) {
            'use strict';

            exports.isArray =
                Array.isArray ||
                function(x) {
                    return x && typeof x.length === 'number';
                };
            //# sourceMappingURL=isArray.js.map

            /***/
        },
        /* 18 */
        /***/ function(module, exports, __webpack_require__) {
            'use strict';

            function isObject(x) {
                return x != null && typeof x === 'object';
            }
            exports.isObject = isObject;
            //# sourceMappingURL=isObject.js.map

            /***/
        },
        /* 19 */
        /***/ function(module, exports, __webpack_require__) {
            'use strict';

            var errorObject_1 = __webpack_require__(9);
            var tryCatchTarget;
            function tryCatcher() {
                try {
                    return tryCatchTarget.apply(this, arguments);
                } catch (e) {
                    errorObject_1.errorObject.e = e;
                    return errorObject_1.errorObject;
                }
            }
            function tryCatch(fn) {
                tryCatchTarget = fn;
                return tryCatcher;
            }
            exports.tryCatch = tryCatch;
            //# sourceMappingURL=tryCatch.js.map

            /***/
        },
        /* 20 */
        /***/ function(module, exports, __webpack_require__) {
            'use strict';

            var __extends =
                (this && this.__extends) ||
                function(d, b) {
                    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
                    function __() {
                        this.constructor = d;
                    }
                    d.prototype =
                        b === null
                            ? Object.create(b)
                            : ((__.prototype = b.prototype), new __());
                };
            /**
             * An error thrown when one or more errors have occurred during the
             * `unsubscribe` of a {@link Subscription}.
             */
            var UnsubscriptionError = (function(_super) {
                __extends(UnsubscriptionError, _super);
                function UnsubscriptionError(errors) {
                    _super.call(this);
                    this.errors = errors;
                    var err = Error.call(
                        this,
                        errors
                            ? errors.length +
                                  ' errors occurred during unsubscription:\n  ' +
                                  errors
                                      .map(function(err, i) {
                                          return i + 1 + ') ' + err.toString();
                                      })
                                      .join('\n  ')
                            : '',
                    );
                    this.name = err.name = 'UnsubscriptionError';
                    this.stack = err.stack;
                    this.message = err.message;
                }
                return UnsubscriptionError;
            })(Error);
            exports.UnsubscriptionError = UnsubscriptionError;
            //# sourceMappingURL=UnsubscriptionError.js.map

            /***/
        },
        /* 21 */
        /***/ function(module, exports, __webpack_require__) {
            'use strict';

            var root_1 = __webpack_require__(5);
            function getSymbolObservable(context) {
                var $$observable;
                var Symbol = context.Symbol;
                if (typeof Symbol === 'function') {
                    if (Symbol.observable) {
                        $$observable = Symbol.observable;
                    } else {
                        $$observable = Symbol('observable');
                        Symbol.observable = $$observable;
                    }
                } else {
                    $$observable = '@@observable';
                }
                return $$observable;
            }
            exports.getSymbolObservable = getSymbolObservable;
            exports.observable = getSymbolObservable(root_1.root);
            /**
             * @deprecated use observable instead
             */
            exports.$$observable = exports.observable;
            //# sourceMappingURL=observable.js.map

            /***/
        },
        /* 22 */
        /***/ function(module, exports, __webpack_require__) {
            'use strict';

            var noop_1 = __webpack_require__(23);
            /* tslint:enable:max-line-length */
            function pipe() {
                var fns = [];
                for (var _i = 0; _i < arguments.length; _i++) {
                    fns[_i - 0] = arguments[_i];
                }
                return pipeFromArray(fns);
            }
            exports.pipe = pipe;
            /* @internal */
            function pipeFromArray(fns) {
                if (!fns) {
                    return noop_1.noop;
                }
                if (fns.length === 1) {
                    return fns[0];
                }
                return function piped(input) {
                    return fns.reduce(function(prev, fn) {
                        return fn(prev);
                    }, input);
                };
            }
            exports.pipeFromArray = pipeFromArray;
            //# sourceMappingURL=pipe.js.map

            /***/
        },
        /* 23 */
        /***/ function(module, exports, __webpack_require__) {
            'use strict';

            /* tslint:disable:no-empty */
            function noop() {}
            exports.noop = noop;
            //# sourceMappingURL=noop.js.map

            /***/
        },
        /* 24 */
        /***/ function(module, exports, __webpack_require__) {
            'use strict';

            var share_1 = __webpack_require__(25);
            /**
             * Returns a new Observable that multicasts (shares) the original Observable. As long as there is at least one
             * Subscriber this Observable will be subscribed and emitting data. When all subscribers have unsubscribed it will
             * unsubscribe from the source Observable. Because the Observable is multicasting it makes the stream `hot`.
             *
             * This behaves similarly to .publish().refCount(), with a behavior difference when the source observable emits complete.
             * .publish().refCount() will not resubscribe to the original source, however .share() will resubscribe to the original source.
             * Observable.of("test").publish().refCount() will not re-emit "test" on new subscriptions, Observable.of("test").share() will
             * re-emit "test" to new subscriptions.
             *
             * <img src="./img/share.png" width="100%">
             *
             * @return {Observable<T>} An Observable that upon connection causes the source Observable to emit items to its Observers.
             * @method share
             * @owner Observable
             */
            function share() {
                return share_1.share()(this);
            }
            exports.share = share;
            //# sourceMappingURL=share.js.map

            /***/
        },
        /* 25 */
        /***/ function(module, exports, __webpack_require__) {
            'use strict';

            var multicast_1 = __webpack_require__(26);
            var refCount_1 = __webpack_require__(12);
            var Subject_1 = __webpack_require__(11);
            function shareSubjectFactory() {
                return new Subject_1.Subject();
            }
            /**
             * Returns a new Observable that multicasts (shares) the original Observable. As long as there is at least one
             * Subscriber this Observable will be subscribed and emitting data. When all subscribers have unsubscribed it will
             * unsubscribe from the source Observable. Because the Observable is multicasting it makes the stream `hot`.
             * This is an alias for .multicast(() => new Subject()).refCount().
             *
             * <img src="./img/share.png" width="100%">
             *
             * @return {Observable<T>} An Observable that upon connection causes the source Observable to emit items to its Observers.
             * @method share
             * @owner Observable
             */
            function share() {
                return function(source) {
                    return refCount_1.refCount()(
                        multicast_1.multicast(shareSubjectFactory)(source),
                    );
                };
            }
            exports.share = share;
            //# sourceMappingURL=share.js.map

            /***/
        },
        /* 26 */
        /***/ function(module, exports, __webpack_require__) {
            'use strict';

            var ConnectableObservable_1 = __webpack_require__(27);
            /* tslint:enable:max-line-length */
            /**
             * Returns an Observable that emits the results of invoking a specified selector on items
             * emitted by a ConnectableObservable that shares a single subscription to the underlying stream.
             *
             * <img src="./img/multicast.png" width="100%">
             *
             * @param {Function|Subject} subjectOrSubjectFactory - Factory function to create an intermediate subject through
             * which the source sequence's elements will be multicast to the selector function
             * or Subject to push source elements into.
             * @param {Function} [selector] - Optional selector function that can use the multicasted source stream
             * as many times as needed, without causing multiple subscriptions to the source stream.
             * Subscribers to the given source will receive all notifications of the source from the
             * time of the subscription forward.
             * @return {Observable} An Observable that emits the results of invoking the selector
             * on the items emitted by a `ConnectableObservable` that shares a single subscription to
             * the underlying stream.
             * @method multicast
             * @owner Observable
             */
            function multicast(subjectOrSubjectFactory, selector) {
                return function multicastOperatorFunction(source) {
                    var subjectFactory;
                    if (typeof subjectOrSubjectFactory === 'function') {
                        subjectFactory = subjectOrSubjectFactory;
                    } else {
                        subjectFactory = function subjectFactory() {
                            return subjectOrSubjectFactory;
                        };
                    }
                    if (typeof selector === 'function') {
                        return source.lift(
                            new MulticastOperator(subjectFactory, selector),
                        );
                    }
                    var connectable = Object.create(
                        source,
                        ConnectableObservable_1.connectableObservableDescriptor,
                    );
                    connectable.source = source;
                    connectable.subjectFactory = subjectFactory;
                    return connectable;
                };
            }
            exports.multicast = multicast;
            var MulticastOperator = (function() {
                function MulticastOperator(subjectFactory, selector) {
                    this.subjectFactory = subjectFactory;
                    this.selector = selector;
                }
                MulticastOperator.prototype.call = function(
                    subscriber,
                    source,
                ) {
                    var selector = this.selector;
                    var subject = this.subjectFactory();
                    var subscription = selector(subject).subscribe(subscriber);
                    subscription.add(source.subscribe(subject));
                    return subscription;
                };
                return MulticastOperator;
            })();
            exports.MulticastOperator = MulticastOperator;
            //# sourceMappingURL=multicast.js.map

            /***/
        },
        /* 27 */
        /***/ function(module, exports, __webpack_require__) {
            'use strict';

            var __extends =
                (this && this.__extends) ||
                function(d, b) {
                    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
                    function __() {
                        this.constructor = d;
                    }
                    d.prototype =
                        b === null
                            ? Object.create(b)
                            : ((__.prototype = b.prototype), new __());
                };
            var Subject_1 = __webpack_require__(11);
            var Observable_1 = __webpack_require__(0);
            var Subscriber_1 = __webpack_require__(1);
            var Subscription_1 = __webpack_require__(2);
            var refCount_1 = __webpack_require__(12);
            /**
             * @class ConnectableObservable<T>
             */
            var ConnectableObservable = (function(_super) {
                __extends(ConnectableObservable, _super);
                function ConnectableObservable(source, subjectFactory) {
                    _super.call(this);
                    this.source = source;
                    this.subjectFactory = subjectFactory;
                    this._refCount = 0;
                    this._isComplete = false;
                }
                ConnectableObservable.prototype._subscribe = function(
                    subscriber,
                ) {
                    return this.getSubject().subscribe(subscriber);
                };
                ConnectableObservable.prototype.getSubject = function() {
                    var subject = this._subject;
                    if (!subject || subject.isStopped) {
                        this._subject = this.subjectFactory();
                    }
                    return this._subject;
                };
                ConnectableObservable.prototype.connect = function() {
                    var connection = this._connection;
                    if (!connection) {
                        this._isComplete = false;
                        connection = this._connection = new Subscription_1.Subscription();
                        connection.add(
                            this.source.subscribe(
                                new ConnectableSubscriber(
                                    this.getSubject(),
                                    this,
                                ),
                            ),
                        );
                        if (connection.closed) {
                            this._connection = null;
                            connection = Subscription_1.Subscription.EMPTY;
                        } else {
                            this._connection = connection;
                        }
                    }
                    return connection;
                };
                ConnectableObservable.prototype.refCount = function() {
                    return refCount_1.refCount()(this);
                };
                return ConnectableObservable;
            })(Observable_1.Observable);
            exports.ConnectableObservable = ConnectableObservable;
            var connectableProto = ConnectableObservable.prototype;
            exports.connectableObservableDescriptor = {
                operator: { value: null },
                _refCount: { value: 0, writable: true },
                _subject: { value: null, writable: true },
                _connection: { value: null, writable: true },
                _subscribe: { value: connectableProto._subscribe },
                _isComplete: {
                    value: connectableProto._isComplete,
                    writable: true,
                },
                getSubject: { value: connectableProto.getSubject },
                connect: { value: connectableProto.connect },
                refCount: { value: connectableProto.refCount },
            };
            var ConnectableSubscriber = (function(_super) {
                __extends(ConnectableSubscriber, _super);
                function ConnectableSubscriber(destination, connectable) {
                    _super.call(this, destination);
                    this.connectable = connectable;
                }
                ConnectableSubscriber.prototype._error = function(err) {
                    this._unsubscribe();
                    _super.prototype._error.call(this, err);
                };
                ConnectableSubscriber.prototype._complete = function() {
                    this.connectable._isComplete = true;
                    this._unsubscribe();
                    _super.prototype._complete.call(this);
                };
                ConnectableSubscriber.prototype._unsubscribe = function() {
                    var connectable = this.connectable;
                    if (connectable) {
                        this.connectable = null;
                        var connection = connectable._connection;
                        connectable._refCount = 0;
                        connectable._subject = null;
                        connectable._connection = null;
                        if (connection) {
                            connection.unsubscribe();
                        }
                    }
                };
                return ConnectableSubscriber;
            })(Subject_1.SubjectSubscriber);
            var RefCountOperator = (function() {
                function RefCountOperator(connectable) {
                    this.connectable = connectable;
                }
                RefCountOperator.prototype.call = function(subscriber, source) {
                    var connectable = this.connectable;
                    connectable._refCount++;
                    var refCounter = new RefCountSubscriber(
                        subscriber,
                        connectable,
                    );
                    var subscription = source.subscribe(refCounter);
                    if (!refCounter.closed) {
                        refCounter.connection = connectable.connect();
                    }
                    return subscription;
                };
                return RefCountOperator;
            })();
            var RefCountSubscriber = (function(_super) {
                __extends(RefCountSubscriber, _super);
                function RefCountSubscriber(destination, connectable) {
                    _super.call(this, destination);
                    this.connectable = connectable;
                }
                RefCountSubscriber.prototype._unsubscribe = function() {
                    var connectable = this.connectable;
                    if (!connectable) {
                        this.connection = null;
                        return;
                    }
                    this.connectable = null;
                    var refCount = connectable._refCount;
                    if (refCount <= 0) {
                        this.connection = null;
                        return;
                    }
                    connectable._refCount = refCount - 1;
                    if (refCount > 1) {
                        this.connection = null;
                        return;
                    }
                    ///
                    // Compare the local RefCountSubscriber's connection Subscription to the
                    // connection Subscription on the shared ConnectableObservable. In cases
                    // where the ConnectableObservable source synchronously emits values, and
                    // the RefCountSubscriber's downstream Observers synchronously unsubscribe,
                    // execution continues to here before the RefCountOperator has a chance to
                    // supply the RefCountSubscriber with the shared connection Subscription.
                    // For example:
                    // ```
                    // Observable.range(0, 10)
                    //   .publish()
                    //   .refCount()
                    //   .take(5)
                    //   .subscribe();
                    // ```
                    // In order to account for this case, RefCountSubscriber should only dispose
                    // the ConnectableObservable's shared connection Subscription if the
                    // connection Subscription exists, *and* either:
                    //   a. RefCountSubscriber doesn't have a reference to the shared connection
                    //      Subscription yet, or,
                    //   b. RefCountSubscriber's connection Subscription reference is identical
                    //      to the shared connection Subscription
                    ///
                    var connection = this.connection;
                    var sharedConnection = connectable._connection;
                    this.connection = null;
                    if (
                        sharedConnection &&
                        (!connection || sharedConnection === connection)
                    ) {
                        sharedConnection.unsubscribe();
                    }
                };
                return RefCountSubscriber;
            })(Subscriber_1.Subscriber);
            //# sourceMappingURL=ConnectableObservable.js.map

            /***/
        },
        /* 28 */
        /***/ function(module, exports, __webpack_require__) {
            'use strict';

            var __extends =
                (this && this.__extends) ||
                function(d, b) {
                    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
                    function __() {
                        this.constructor = d;
                    }
                    d.prototype =
                        b === null
                            ? Object.create(b)
                            : ((__.prototype = b.prototype), new __());
                };
            /**
             * An error thrown when an action is invalid because the object has been
             * unsubscribed.
             *
             * @see {@link Subject}
             * @see {@link BehaviorSubject}
             *
             * @class ObjectUnsubscribedError
             */
            var ObjectUnsubscribedError = (function(_super) {
                __extends(ObjectUnsubscribedError, _super);
                function ObjectUnsubscribedError() {
                    var err = _super.call(this, 'object unsubscribed');
                    this.name = err.name = 'ObjectUnsubscribedError';
                    this.stack = err.stack;
                    this.message = err.message;
                }
                return ObjectUnsubscribedError;
            })(Error);
            exports.ObjectUnsubscribedError = ObjectUnsubscribedError;
            //# sourceMappingURL=ObjectUnsubscribedError.js.map

            /***/
        },
        /* 29 */
        /***/ function(module, exports, __webpack_require__) {
            'use strict';

            var __extends =
                (this && this.__extends) ||
                function(d, b) {
                    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
                    function __() {
                        this.constructor = d;
                    }
                    d.prototype =
                        b === null
                            ? Object.create(b)
                            : ((__.prototype = b.prototype), new __());
                };
            var Subscription_1 = __webpack_require__(2);
            /**
             * We need this JSDoc comment for affecting ESDoc.
             * @ignore
             * @extends {Ignored}
             */
            var SubjectSubscription = (function(_super) {
                __extends(SubjectSubscription, _super);
                function SubjectSubscription(subject, subscriber) {
                    _super.call(this);
                    this.subject = subject;
                    this.subscriber = subscriber;
                    this.closed = false;
                }
                SubjectSubscription.prototype.unsubscribe = function() {
                    if (this.closed) {
                        return;
                    }
                    this.closed = true;
                    var subject = this.subject;
                    var observers = subject.observers;
                    this.subject = null;
                    if (
                        !observers ||
                        observers.length === 0 ||
                        subject.isStopped ||
                        subject.closed
                    ) {
                        return;
                    }
                    var subscriberIndex = observers.indexOf(this.subscriber);
                    if (subscriberIndex !== -1) {
                        observers.splice(subscriberIndex, 1);
                    }
                };
                return SubjectSubscription;
            })(Subscription_1.Subscription);
            exports.SubjectSubscription = SubjectSubscription;
            //# sourceMappingURL=SubjectSubscription.js.map

            /***/
        },
        /* 30 */
        /***/ function(module, exports, __webpack_require__) {
            'use strict';

            var __extends =
                (this && this.__extends) ||
                (function() {
                    var extendStatics =
                        Object.setPrototypeOf ||
                        ({ __proto__: [] } instanceof Array &&
                            function(d, b) {
                                d.__proto__ = b;
                            }) ||
                        function(d, b) {
                            for (var p in b)
                                if (b.hasOwnProperty(p)) d[p] = b[p];
                        };
                    return function(d, b) {
                        extendStatics(d, b);
                        function __() {
                            this.constructor = d;
                        }
                        d.prototype =
                            b === null
                                ? Object.create(b)
                                : ((__.prototype = b.prototype), new __());
                    };
                })();
            Object.defineProperty(exports, '__esModule', { value: true });
            var Vector2_1 = __webpack_require__(4);
            var VectorTouch = /** @class */ (function(_super) {
                __extends(VectorTouch, _super);
                function VectorTouch(_touchController, x, y, t) {
                    var _this = _super.call(this, x, y) || this;
                    _this._touchController = _touchController;
                    _this.t = t;
                    return _this;
                }
                VectorTouch.prototype.to1 = function() {
                    return new Vector2_1.default(
                        this.x / this._touchController.element.clientWidth,
                        this.y / this._touchController.element.clientHeight,
                    );
                };
                return VectorTouch;
            })(Vector2_1.default);
            exports.default = VectorTouch;

            /***/
        },
        /* 31 */
        /***/ function(module, exports, __webpack_require__) {
            'use strict';

            Object.defineProperty(exports, '__esModule', { value: true });
            var Observable_1 = __webpack_require__(0);
            __webpack_require__(3);
            __webpack_require__(32);
            __webpack_require__(3);
            var Touch = /** @class */ (function() {
                //private _finished: boolean = false;
                //public positions: TimeVector2[];
                function Touch(
                    touchController,
                    id,
                    eventId, //todo this should be external id only in controller
                    type,
                    firstPosition,
                ) {
                    var _this = this;
                    this.touchController = touchController;
                    this.id = id;
                    this.eventId = eventId;
                    this.type = type;
                    this.firstPosition = firstPosition;
                    this.lastPosition = firstPosition;
                    this.lastPosition2 = firstPosition;
                    this.positions = Observable_1.Observable.create(function(
                        observer,
                    ) {
                        observer.next(firstPosition);
                        _this._positionsObserver = observer;
                    }).share(); //todo share vs publish
                }
                Touch.prototype.move = function(newPosition, end) {
                    if (end === void 0) {
                        end = false;
                    }
                    if (typeof this._positionsObserver === 'undefined') {
                        return; //todo better;
                    }
                    this.lastPosition2 = this.lastPosition;
                    this.lastPosition = newPosition;
                    this._positionsObserver.next(newPosition);
                    if (end) {
                        this._positionsObserver.complete();
                    }
                };
                Object.defineProperty(Touch.prototype, 'start', {
                    get: function() {
                        return this.firstPosition.t;
                    },
                    enumerable: true,
                    configurable: true,
                });
                /*chop(): Touch{
        //todo maybe more optimal way?
        return new Touch(
            this.touchController,
            this.id,
            this.eventId,
            this.type,
            this.lastPosition
        );
    }*/
                Touch.prototype.toString = function() {
                    return 'Touch(' + this.id + ')';
                };
                return Touch;
            })();
            exports.default = Touch;

            /***/
        },
        /* 32 */
        /***/ function(module, exports, __webpack_require__) {
            'use strict';

            var Observable_1 = __webpack_require__(0);
            var range_1 = __webpack_require__(33);
            Observable_1.Observable.range = range_1.range;
            //# sourceMappingURL=range.js.map

            /***/
        },
        /* 33 */
        /***/ function(module, exports, __webpack_require__) {
            'use strict';

            var RangeObservable_1 = __webpack_require__(34);
            exports.range = RangeObservable_1.RangeObservable.create;
            //# sourceMappingURL=range.js.map

            /***/
        },
        /* 34 */
        /***/ function(module, exports, __webpack_require__) {
            'use strict';

            var __extends =
                (this && this.__extends) ||
                function(d, b) {
                    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
                    function __() {
                        this.constructor = d;
                    }
                    d.prototype =
                        b === null
                            ? Object.create(b)
                            : ((__.prototype = b.prototype), new __());
                };
            var Observable_1 = __webpack_require__(0);
            /**
             * We need this JSDoc comment for affecting ESDoc.
             * @extends {Ignored}
             * @hide true
             */
            var RangeObservable = (function(_super) {
                __extends(RangeObservable, _super);
                function RangeObservable(start, count, scheduler) {
                    _super.call(this);
                    this.start = start;
                    this._count = count;
                    this.scheduler = scheduler;
                }
                /**
                 * Creates an Observable that emits a sequence of numbers within a specified
                 * range.
                 *
                 * <span class="informal">Emits a sequence of numbers in a range.</span>
                 *
                 * <img src="./img/range.png" width="100%">
                 *
                 * `range` operator emits a range of sequential integers, in order, where you
                 * select the `start` of the range and its `length`. By default, uses no
                 * IScheduler and just delivers the notifications synchronously, but may use
                 * an optional IScheduler to regulate those deliveries.
                 *
                 * @example <caption>Emits the numbers 1 to 10</caption>
                 * var numbers = Rx.Observable.range(1, 10);
                 * numbers.subscribe(x => console.log(x));
                 *
                 * @see {@link timer}
                 * @see {@link interval}
                 *
                 * @param {number} [start=0] The value of the first integer in the sequence.
                 * @param {number} [count=0] The number of sequential integers to generate.
                 * @param {Scheduler} [scheduler] A {@link IScheduler} to use for scheduling
                 * the emissions of the notifications.
                 * @return {Observable} An Observable of numbers that emits a finite range of
                 * sequential integers.
                 * @static true
                 * @name range
                 * @owner Observable
                 */
                RangeObservable.create = function(start, count, scheduler) {
                    if (start === void 0) {
                        start = 0;
                    }
                    if (count === void 0) {
                        count = 0;
                    }
                    return new RangeObservable(start, count, scheduler);
                };
                RangeObservable.dispatch = function(state) {
                    var start = state.start,
                        index = state.index,
                        count = state.count,
                        subscriber = state.subscriber;
                    if (index >= count) {
                        subscriber.complete();
                        return;
                    }
                    subscriber.next(start);
                    if (subscriber.closed) {
                        return;
                    }
                    state.index = index + 1;
                    state.start = start + 1;
                    this.schedule(state);
                };
                RangeObservable.prototype._subscribe = function(subscriber) {
                    var index = 0;
                    var start = this.start;
                    var count = this._count;
                    var scheduler = this.scheduler;
                    if (scheduler) {
                        return scheduler.schedule(RangeObservable.dispatch, 0, {
                            index: index,
                            count: count,
                            start: start,
                            subscriber: subscriber,
                        });
                    } else {
                        do {
                            if (index++ >= count) {
                                subscriber.complete();
                                break;
                            }
                            subscriber.next(start++);
                            if (subscriber.closed) {
                                break;
                            }
                        } while (true);
                    }
                };
                return RangeObservable;
            })(Observable_1.Observable);
            exports.RangeObservable = RangeObservable;
            //# sourceMappingURL=RangeObservable.js.map

            /***/
        },
        /* 35 */
        /***/ function(module, exports, __webpack_require__) {
            'use strict';

            Object.defineProperty(exports, '__esModule', { value: true });
            var Observable_1 = __webpack_require__(0);
            __webpack_require__(3);
            var MultiTouch_1 = __webpack_require__(36);
            var MultiTouchController = /** @class */ (function() {
                function MultiTouchController(
                    _touchController,
                    _elementBinder,
                ) {
                    var _this = this;
                    this._touchController = _touchController;
                    this._elementBinder = _elementBinder;
                    this.ongoingMultiTouches = [];
                    this._multiTouchesAutoIncrement = 0;
                    this.multiTouches = Observable_1.Observable.create(function(
                        observer,
                    ) {
                        _this._multiTouchesObserver = observer;
                    }).share();
                    this.unknownTouches = Observable_1.Observable.create(
                        function(observer) {
                            _this._unknownTouchesObserver = observer;
                        },
                    ).share();
                    this._touchController.touches.subscribe(function(touch) {
                        var element = _this._elementBinder(touch.firstPosition);
                        if (typeof element === 'undefined') {
                            _this._unknownTouchesObserver.next(touch);
                            return;
                        }
                        //todo why can not be used find
                        var multiTouch = _this.ongoingMultiTouches.filter(
                            function(multiTouch) {
                                return multiTouch.element === element;
                            },
                        )[0];
                        if (typeof multiTouch === 'undefined') {
                            //console.log('creating new multitouch');
                            multiTouch = new MultiTouch_1.default(
                                _this._multiTouchesAutoIncrement++,
                                element,
                                touch,
                            );
                            _this.ongoingMultiTouches.push(multiTouch);
                            _this._multiTouchesObserver.next(multiTouch);
                            multiTouch.touches.subscribe(
                                function() {},
                                function() {},
                                function() {
                                    _this.ongoingMultiTouches = _this.ongoingMultiTouches.filter(
                                        function(multiTouch2) {
                                            return multiTouch2 !== multiTouch;
                                        },
                                    );
                                },
                            );
                        } else {
                            multiTouch.addTouch(touch);
                        }
                    });
                }
                return MultiTouchController;
            })();
            exports.default = MultiTouchController;

            /***/
        },
        /* 36 */
        /***/ function(module, exports, __webpack_require__) {
            'use strict';
            /* WEBPACK VAR INJECTION */ (function(setImmediate) {
                Object.defineProperty(exports, '__esModule', { value: true });
                //import * as uuidv4 from 'uuid/v4';
                var Observable_1 = __webpack_require__(0);
                __webpack_require__(40);
                __webpack_require__(3);
                //import Vector2 from './Vector2';
                var MultiTouch = /** @class */ (function() {
                    function MultiTouch(id, element, firstTouch) {
                        var _this = this;
                        this.id = id;
                        this.element = element;
                        this.firstTouch = firstTouch;
                        //public id: string;
                        this.ongoingTouches = [];
                        //this.id = uuidv4();
                        this.touches = Observable_1.Observable.create(function(
                            observer,
                        ) {
                            _this._touchesObserver = observer;
                            _this.addTouch(firstTouch);
                        }).share();
                        //console.log(`------------------------------Creating ${this} `);
                    }
                    MultiTouch.prototype.addTouch = function(touch) {
                        var _this = this;
                        //console.log(this.touches.);
                        this.ongoingTouches.push(touch);
                        this._touchesObserver.next(touch);
                        //console.log(`Adding ${touch} To ${this}.`);
                        touch.positions.subscribe(
                            function(position) {
                                //console.log(`Next ${touch} in ${this}.`);
                                //this._touchesObserver.next(touch);
                            },
                            function() {
                                //console.log("Touch in multitouch error.");
                            },
                            function() {
                                //console.log(`Complete ${touch} in ${this}.`);
                                _this.ongoingTouches = _this.ongoingTouches.filter(
                                    function(touch2) {
                                        return touch2 !== touch;
                                    },
                                );
                                if (_this.ongoingTouches.length === 0) {
                                    _this._touchesObserver.complete();
                                }
                            },
                        );
                    };
                    Object.defineProperty(
                        MultiTouch.prototype,
                        'ongoingTouchesChanges',
                        {
                            get: function() {
                                var _this = this;
                                return Observable_1.Observable.create(function(
                                    observer,
                                ) {
                                    _this.touches.subscribe(
                                        function(touch) {
                                            observer.next(_this.ongoingTouches);
                                            touch.positions.subscribe(
                                                function(touch) {},
                                                function() {},
                                                function() {
                                                    setImmediate(function() {
                                                        return observer.next(
                                                            _this.ongoingTouches,
                                                        );
                                                    });
                                                },
                                            );
                                        },
                                        function() {},
                                        function() {
                                            observer.complete();
                                        },
                                    );
                                });
                            },
                            enumerable: true,
                            configurable: true,
                        },
                    );
                    Object.defineProperty(
                        MultiTouch.prototype,
                        'ongoingPositionsChanges',
                        {
                            get: function() {
                                var _this = this;
                                return Observable_1.Observable.create(function(
                                    observer,
                                ) {
                                    var subscriptions = [];
                                    _this.ongoingTouchesChanges.subscribe(
                                        function(touches) {
                                            for (
                                                var _i = 0,
                                                    subscriptions_1 = subscriptions;
                                                _i < subscriptions_1.length;
                                                _i++
                                            ) {
                                                var subscription =
                                                    subscriptions_1[_i];
                                                subscription.unsubscribe();
                                            }
                                            subscriptions = touches.map(
                                                function(touch) {
                                                    return touch.positions.subscribe(
                                                        function() {
                                                            observer.next(
                                                                touches,
                                                            );
                                                        },
                                                    );
                                                },
                                            );
                                        },
                                        function() {},
                                        function() {
                                            observer.complete();
                                        },
                                    );
                                });
                            },
                            enumerable: true,
                            configurable: true,
                        },
                    );
                    MultiTouch.prototype.toString = function() {
                        return 'MultiTouch(' + this.id + ')';
                    };
                    return MultiTouch;
                })();
                exports.default = MultiTouch;

                /* WEBPACK VAR INJECTION */
            }.call(exports, __webpack_require__(37).setImmediate));

            /***/
        },
        /* 37 */
        /***/ function(module, exports, __webpack_require__) {
            var apply = Function.prototype.apply;

            // DOM APIs, for completeness

            exports.setTimeout = function() {
                return new Timeout(
                    apply.call(setTimeout, window, arguments),
                    clearTimeout,
                );
            };
            exports.setInterval = function() {
                return new Timeout(
                    apply.call(setInterval, window, arguments),
                    clearInterval,
                );
            };
            exports.clearTimeout = exports.clearInterval = function(timeout) {
                if (timeout) {
                    timeout.close();
                }
            };

            function Timeout(id, clearFn) {
                this._id = id;
                this._clearFn = clearFn;
            }
            Timeout.prototype.unref = Timeout.prototype.ref = function() {};
            Timeout.prototype.close = function() {
                this._clearFn.call(window, this._id);
            };

            // Does not start the time, just sets up the members needed.
            exports.enroll = function(item, msecs) {
                clearTimeout(item._idleTimeoutId);
                item._idleTimeout = msecs;
            };

            exports.unenroll = function(item) {
                clearTimeout(item._idleTimeoutId);
                item._idleTimeout = -1;
            };

            exports._unrefActive = exports.active = function(item) {
                clearTimeout(item._idleTimeoutId);

                var msecs = item._idleTimeout;
                if (msecs >= 0) {
                    item._idleTimeoutId = setTimeout(function onTimeout() {
                        if (item._onTimeout) item._onTimeout();
                    }, msecs);
                }
            };

            // setimmediate attaches itself to the global object
            __webpack_require__(38);
            exports.setImmediate = setImmediate;
            exports.clearImmediate = clearImmediate;

            /***/
        },
        /* 38 */
        /***/ function(module, exports, __webpack_require__) {
            /* WEBPACK VAR INJECTION */ (function(global, process) {
                (function(global, undefined) {
                    'use strict';

                    if (global.setImmediate) {
                        return;
                    }

                    var nextHandle = 1; // Spec says greater than zero
                    var tasksByHandle = {};
                    var currentlyRunningATask = false;
                    var doc = global.document;
                    var registerImmediate;

                    function setImmediate(callback) {
                        // Callback can either be a function or a string
                        if (typeof callback !== 'function') {
                            callback = new Function('' + callback);
                        }
                        // Copy function arguments
                        var args = new Array(arguments.length - 1);
                        for (var i = 0; i < args.length; i++) {
                            args[i] = arguments[i + 1];
                        }
                        // Store and register the task
                        var task = { callback: callback, args: args };
                        tasksByHandle[nextHandle] = task;
                        registerImmediate(nextHandle);
                        return nextHandle++;
                    }

                    function clearImmediate(handle) {
                        delete tasksByHandle[handle];
                    }

                    function run(task) {
                        var callback = task.callback;
                        var args = task.args;
                        switch (args.length) {
                            case 0:
                                callback();
                                break;
                            case 1:
                                callback(args[0]);
                                break;
                            case 2:
                                callback(args[0], args[1]);
                                break;
                            case 3:
                                callback(args[0], args[1], args[2]);
                                break;
                            default:
                                callback.apply(undefined, args);
                                break;
                        }
                    }

                    function runIfPresent(handle) {
                        // From the spec: "Wait until any invocations of this algorithm started before this one have completed."
                        // So if we're currently running a task, we'll need to delay this invocation.
                        if (currentlyRunningATask) {
                            // Delay by doing a setTimeout. setImmediate was tried instead, but in Firefox 7 it generated a
                            // "too much recursion" error.
                            setTimeout(runIfPresent, 0, handle);
                        } else {
                            var task = tasksByHandle[handle];
                            if (task) {
                                currentlyRunningATask = true;
                                try {
                                    run(task);
                                } finally {
                                    clearImmediate(handle);
                                    currentlyRunningATask = false;
                                }
                            }
                        }
                    }

                    function installNextTickImplementation() {
                        registerImmediate = function(handle) {
                            process.nextTick(function() {
                                runIfPresent(handle);
                            });
                        };
                    }

                    function canUsePostMessage() {
                        // The test against `importScripts` prevents this implementation from being installed inside a web worker,
                        // where `global.postMessage` means something completely different and can't be used for this purpose.
                        if (global.postMessage && !global.importScripts) {
                            var postMessageIsAsynchronous = true;
                            var oldOnMessage = global.onmessage;
                            global.onmessage = function() {
                                postMessageIsAsynchronous = false;
                            };
                            global.postMessage('', '*');
                            global.onmessage = oldOnMessage;
                            return postMessageIsAsynchronous;
                        }
                    }

                    function installPostMessageImplementation() {
                        // Installs an event handler on `global` for the `message` event: see
                        // * https://developer.mozilla.org/en/DOM/window.postMessage
                        // * http://www.whatwg.org/specs/web-apps/current-work/multipage/comms.html#crossDocumentMessages

                        var messagePrefix =
                            'setImmediate$' + Math.random() + '$';
                        var onGlobalMessage = function(event) {
                            if (
                                event.source === global &&
                                typeof event.data === 'string' &&
                                event.data.indexOf(messagePrefix) === 0
                            ) {
                                runIfPresent(
                                    +event.data.slice(messagePrefix.length),
                                );
                            }
                        };

                        if (global.addEventListener) {
                            global.addEventListener(
                                'message',
                                onGlobalMessage,
                                false,
                            );
                        } else {
                            global.attachEvent('onmessage', onGlobalMessage);
                        }

                        registerImmediate = function(handle) {
                            global.postMessage(messagePrefix + handle, '*');
                        };
                    }

                    function installMessageChannelImplementation() {
                        var channel = new MessageChannel();
                        channel.port1.onmessage = function(event) {
                            var handle = event.data;
                            runIfPresent(handle);
                        };

                        registerImmediate = function(handle) {
                            channel.port2.postMessage(handle);
                        };
                    }

                    function installReadyStateChangeImplementation() {
                        var html = doc.documentElement;
                        registerImmediate = function(handle) {
                            // Create a <script> element; its readystatechange event will be fired asynchronously once it is inserted
                            // into the document. Do so, thus queuing up the task. Remember to clean up once it's been called.
                            var script = doc.createElement('script');
                            script.onreadystatechange = function() {
                                runIfPresent(handle);
                                script.onreadystatechange = null;
                                html.removeChild(script);
                                script = null;
                            };
                            html.appendChild(script);
                        };
                    }

                    function installSetTimeoutImplementation() {
                        registerImmediate = function(handle) {
                            setTimeout(runIfPresent, 0, handle);
                        };
                    }

                    // If supported, we should attach to the prototype of global, since that is where setTimeout et al. live.
                    var attachTo =
                        Object.getPrototypeOf && Object.getPrototypeOf(global);
                    attachTo =
                        attachTo && attachTo.setTimeout ? attachTo : global;

                    // Don't get fooled by e.g. browserify environments.
                    if (
                        {}.toString.call(global.process) === '[object process]'
                    ) {
                        // For Node.js before 0.9
                        installNextTickImplementation();
                    } else if (canUsePostMessage()) {
                        // For non-IE10 modern browsers
                        installPostMessageImplementation();
                    } else if (global.MessageChannel) {
                        // For web workers, where supported
                        installMessageChannelImplementation();
                    } else if (
                        doc &&
                        'onreadystatechange' in doc.createElement('script')
                    ) {
                        // For IE 6–8
                        installReadyStateChangeImplementation();
                    } else {
                        // For older browsers
                        installSetTimeoutImplementation();
                    }

                    attachTo.setImmediate = setImmediate;
                    attachTo.clearImmediate = clearImmediate;
                })(
                    typeof self === 'undefined'
                        ? typeof global === 'undefined'
                            ? this
                            : global
                        : self,
                );

                /* WEBPACK VAR INJECTION */
            }.call(exports, __webpack_require__(7), __webpack_require__(39)));

            /***/
        },
        /* 39 */
        /***/ function(module, exports) {
            // shim for using process in browser
            var process = (module.exports = {});

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
            (function() {
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
                if (
                    (cachedSetTimeout === defaultSetTimout ||
                        !cachedSetTimeout) &&
                    setTimeout
                ) {
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
                if (
                    (cachedClearTimeout === defaultClearTimeout ||
                        !cachedClearTimeout) &&
                    clearTimeout
                ) {
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

            process.nextTick = function(fun) {
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
            Item.prototype.run = function() {
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

            process.listeners = function(name) {
                return [];
            };

            process.binding = function(name) {
                throw new Error('process.binding is not supported');
            };

            process.cwd = function() {
                return '/';
            };
            process.chdir = function(dir) {
                throw new Error('process.chdir is not supported');
            };
            process.umask = function() {
                return 0;
            };

            /***/
        },
        /* 40 */
        /***/ function(module, exports, __webpack_require__) {
            'use strict';

            var Observable_1 = __webpack_require__(0);
            var finally_1 = __webpack_require__(41);
            Observable_1.Observable.prototype.finally = finally_1._finally;
            Observable_1.Observable.prototype._finally = finally_1._finally;
            //# sourceMappingURL=finally.js.map

            /***/
        },
        /* 41 */
        /***/ function(module, exports, __webpack_require__) {
            'use strict';

            var finalize_1 = __webpack_require__(42);
            /**
             * Returns an Observable that mirrors the source Observable, but will call a specified function when
             * the source terminates on complete or error.
             * @param {function} callback Function to be called when source terminates.
             * @return {Observable} An Observable that mirrors the source, but will call the specified function on termination.
             * @method finally
             * @owner Observable
             */
            function _finally(callback) {
                return finalize_1.finalize(callback)(this);
            }
            exports._finally = _finally;
            //# sourceMappingURL=finally.js.map

            /***/
        },
        /* 42 */
        /***/ function(module, exports, __webpack_require__) {
            'use strict';

            var __extends =
                (this && this.__extends) ||
                function(d, b) {
                    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
                    function __() {
                        this.constructor = d;
                    }
                    d.prototype =
                        b === null
                            ? Object.create(b)
                            : ((__.prototype = b.prototype), new __());
                };
            var Subscriber_1 = __webpack_require__(1);
            var Subscription_1 = __webpack_require__(2);
            /**
             * Returns an Observable that mirrors the source Observable, but will call a specified function when
             * the source terminates on complete or error.
             * @param {function} callback Function to be called when source terminates.
             * @return {Observable} An Observable that mirrors the source, but will call the specified function on termination.
             * @method finally
             * @owner Observable
             */
            function finalize(callback) {
                return function(source) {
                    return source.lift(new FinallyOperator(callback));
                };
            }
            exports.finalize = finalize;
            var FinallyOperator = (function() {
                function FinallyOperator(callback) {
                    this.callback = callback;
                }
                FinallyOperator.prototype.call = function(subscriber, source) {
                    return source.subscribe(
                        new FinallySubscriber(subscriber, this.callback),
                    );
                };
                return FinallyOperator;
            })();
            /**
             * We need this JSDoc comment for affecting ESDoc.
             * @ignore
             * @extends {Ignored}
             */
            var FinallySubscriber = (function(_super) {
                __extends(FinallySubscriber, _super);
                function FinallySubscriber(destination, callback) {
                    _super.call(this, destination);
                    this.add(new Subscription_1.Subscription(callback));
                }
                return FinallySubscriber;
            })(Subscriber_1.Subscriber);
            //# sourceMappingURL=finalize.js.map

            /***/
        },
        /* 43 */
        /***/ function(module, exports, __webpack_require__) {
            'use strict';

            Object.defineProperty(exports, '__esModule', { value: true });
            var Observable_1 = __webpack_require__(0);
            var Transformation_1 = __webpack_require__(13);
            var Vector2_1 = __webpack_require__(4);
            function multiTouchTransformations(
                multiTouch,
                objectTransformation,
            ) {
                if (objectTransformation === void 0) {
                    objectTransformation = Transformation_1.default.Zero();
                }
                return Observable_1.Observable.create(function(observer) {
                    //objectTransformation = objectTransformation.clone();
                    var subscriptions = [];
                    multiTouch.ongoingTouchesChanges.subscribe(
                        function(touches) {
                            for (
                                var _i = 0, subscriptions_1 = subscriptions;
                                _i < subscriptions_1.length;
                                _i++
                            ) {
                                var subscription = subscriptions_1[_i];
                                subscription.unsubscribe();
                            }
                            //todo maybe subscription = [];
                            /*for(const touch of touches){
             touch.chop();
             }*/
                            var countTouchesTransformation;
                            //console.log(touches);
                            if (touches.length === 1) {
                                /*
                 const touch = touches[0];
                 subscriptions = [touch.positions.subscribe((position)=>{
                 //console.log( position.subtract(touch.firstPosition));
                 observer.next(
                 //todo optimize
                 objectTransformation.add(new Transformation(
                 position.subtract(touch.firstPosition),
                 0,
                 1
                 ))
                 );
                 })];*/
                                countTouchesTransformation = function(touch1) {
                                    return new Transformation_1.default(
                                        touch1.lastPosition,
                                        0,
                                        1,
                                    );
                                };
                            } else {
                                //todo how to figure out with 3, 4, 5,... finger on one object?
                                countTouchesTransformation = function() {
                                    var touches = [];
                                    for (
                                        var _i = 0;
                                        _i < arguments.length;
                                        _i++
                                    ) {
                                        touches[_i] = arguments[_i];
                                    }
                                    return new Transformation_1.default(
                                        (_a = Vector2_1.default.Zero()).add
                                            .apply(
                                                _a,
                                                touches.map(function(touch) {
                                                    return touch.lastPosition;
                                                }),
                                            )
                                            .scale(1 / touches.length),
                                        touches[0].lastPosition.rotation(
                                            touches[1].lastPosition,
                                        ),
                                        touches[0].lastPosition.length(
                                            touches[1].lastPosition,
                                        ),
                                    );
                                    var _a;
                                };
                            }
                            var lastTouchesTransformation = countTouchesTransformation.apply(
                                void 0,
                                touches,
                            );
                            var touchMoveCallback = function() {
                                var currentTouchesTransformation = countTouchesTransformation.apply(
                                    void 0,
                                    touches,
                                );
                                objectTransformation = objectTransformation.add(
                                    currentTouchesTransformation.subtract(
                                        lastTouchesTransformation,
                                    ),
                                );
                                observer.next(objectTransformation);
                                lastTouchesTransformation = currentTouchesTransformation;
                            };
                            subscriptions = touches.map(function(touch) {
                                return touch.positions.subscribe(
                                    touchMoveCallback,
                                );
                            });
                            /*subscriptions = [
             touch1.positions.subscribe(touchMoveCallback),
             touch2.positions.subscribe(touchMoveCallback)
             ];*/
                        },
                        function() {},
                        function() {
                            observer.complete();
                        },
                    );
                });
            }
            exports.default = multiTouchTransformations;

            /***/
        },
        /* 44 */
        /***/ function(module, exports, __webpack_require__) {
            'use strict';

            Object.defineProperty(exports, '__esModule', { value: true });
            var TouchListener_1 = __webpack_require__(45);
            var MouseListener_1 = __webpack_require__(46);
            exports.default = {
                TouchListener: TouchListener_1.default,
                MouseListener: MouseListener_1.default,
            };

            /***/
        },
        /* 45 */
        /***/ function(module, exports, __webpack_require__) {
            'use strict';

            Object.defineProperty(exports, '__esModule', { value: true });
            var TouchListener = /** @class */ (function() {
                function TouchListener() {}
                TouchListener.prototype.setListeners = function(
                    touchController,
                ) {
                    var _this = this;
                    this._touchController = touchController;
                    touchController.element.addEventListener(
                        'touchstart',
                        function(event) {
                            return _this._handleTouchStart(event);
                        },
                        false,
                    );
                    touchController.element.addEventListener(
                        'touchend',
                        function(event) {
                            return _this._handleTouchEnd(true, event);
                        },
                        false,
                    );
                    touchController.element.addEventListener(
                        'touchcancel',
                        function(event) {
                            return _this._handleTouchEnd(false, event);
                        },
                        false,
                    );
                    //todo element.addEventListener("touchleave", (event)=>this._handleTouchEnd(true,event), false);
                    touchController.element.addEventListener(
                        'touchmove',
                        function(event) {
                            return _this._handleTouchMove(event);
                        },
                        false,
                    );
                };
                TouchListener.prototype.unsetListeners = function() {
                    //todo
                };
                TouchListener.prototype._handleTouchStart = function(event) {
                    event.preventDefault();
                    var touches = event.changedTouches;
                    for (var i = 0, l = touches.length; i < l; i++) {
                        this._touchController.touchStart(
                            'touch' + touches[i].identifier,
                            'TOUCH',
                            touches[i],
                        );
                    }
                };
                TouchListener.prototype._handleTouchMove = function(event) {
                    event.preventDefault();
                    var touches = event.changedTouches;
                    for (var i = 0, l = touches.length; i < l; i++) {
                        this._touchController.touchMove(
                            'touch' + touches[i].identifier,
                            false,
                            touches[i],
                        );
                    }
                };
                TouchListener.prototype._handleTouchEnd = function(
                    callSubscribers,
                    event,
                ) {
                    event.preventDefault();
                    var touches = event.changedTouches;
                    for (var i = 0, l = touches.length; i < l; i++) {
                        this._touchController.touchMove(
                            'touch' + touches[i].identifier,
                            callSubscribers,
                            touches[i],
                        );
                    }
                };
                return TouchListener;
            })();
            exports.default = TouchListener;

            /***/
        },
        /* 46 */
        /***/ function(module, exports, __webpack_require__) {
            'use strict';

            Object.defineProperty(exports, '__esModule', { value: true });
            var TouchListener = /** @class */ (function() {
                function TouchListener(_preventContextMenu) {
                    if (_preventContextMenu === void 0) {
                        _preventContextMenu = true;
                    }
                    this._preventContextMenu = _preventContextMenu;
                }
                TouchListener.prototype.setListeners = function(
                    touchController,
                ) {
                    var _this = this;
                    this._touchController = touchController;
                    touchController.element.addEventListener(
                        'mousedown',
                        function(event) {
                            return _this._handleMouseDown(event);
                        },
                        false,
                    );
                    touchController.element.addEventListener(
                        'mousemove',
                        function(event) {
                            return _this._handleMouseMove(event);
                        },
                        false,
                    );
                    touchController.element.addEventListener(
                        'mouseup',
                        function(event) {
                            return _this._handleMouseUp(true, event);
                        },
                        false,
                    );
                    touchController.element.addEventListener(
                        'mouseleave',
                        function(event) {
                            return _this._handleMouseUp(true, event);
                        },
                        false,
                    );
                    if (this._preventContextMenu) {
                        touchController.element.addEventListener(
                            'contextmenu',
                            function(event) {
                                event.preventDefault();
                                event.stopPropagation();
                            },
                            false,
                        );
                    }
                };
                TouchListener.prototype.unsetListeners = function() {
                    //todo
                };
                TouchListener.prototype._handleMouseDown = function(event) {
                    event.preventDefault();
                    this._touchController.touchStart(
                        'mouse' + event.button,
                        'MOUSE',
                        event,
                    );
                };
                TouchListener.prototype._handleMouseMove = function(event) {
                    event.preventDefault();
                    this._touchController.touchMove(
                        'mouse' + event.button,
                        false,
                        event,
                    );
                };
                TouchListener.prototype._handleMouseUp = function(
                    callSubscribers,
                    event,
                ) {
                    event.preventDefault();
                    this._touchController.touchMove(
                        'mouse' + event.button,
                        callSubscribers,
                        event,
                    );
                };
                return TouchListener;
            })();
            exports.default = TouchListener;

            /***/
        },
        /******/
    ],
);
//# sourceMappingURL=touchcontroller.browser.js.map
