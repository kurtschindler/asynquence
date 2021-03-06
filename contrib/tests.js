(function(name,context,dependency,definition){
	if (typeof module !== "undefined" && module.exports) module.exports = definition(require(dependency));
	else if (typeof define === "function" && define.amd) define([dependency],definition);
	else context[name] = definition(dependency);
})("ASQ_contrib_tests",this,this.ASQ || "asynquence",function(ASQ){
	"use strict";

	function defineTests(doneLogMsg) {

		function asyncDelayFn(delay) {
			return function(done) {
				setTimeout(done,delay);
			};
		}

		function PASS(testDone,testLabel) {
			doneLogMsg(testLabel + ": PASSED")();
			testDone();
		}

		function FAIL(testDone,testLabel) {
			doneLogMsg(testLabel + ": FAILED")();
			testDone.fail.apply(testDone,ARRAY_SLICE.call(arguments,2));
		}

		var ARRAY_SLICE = Array.prototype.slice;
		var tests = [];

		tests.push(function(testDone){
			var label = "Contrib Test  #1", timeout;

			ASQ()
			.then(asyncDelayFn(100))
			.all(
				asyncDelayFn(400),
				asyncDelayFn(300),
				asyncDelayFn(200)
			)
			.then(function(){
				clearTimeout(timeout);
				PASS(testDone,label);
			})
			.or(function(){
				clearTimeout(timeout);
				var args = ARRAY_SLICE.call(arguments);
				args.unshift(testDone,label);
				FAIL.apply(FAIL,args);
			});

			timeout = setTimeout(function(){
				FAIL(testDone,label + " (from timeout)");
			},1000);
		});
		tests.push(function(testDone){
			var label = "Contrib Test  #2", timeout;

			ASQ("Hello")
			.any(
				function(done,msg){
					setTimeout(function(){
						done(msg,msg.toUpperCase());
					},500);
				},
				function(done,msg){
					done.fail("Bad");
				},
				function(done,msg){
					setTimeout(function(){
						done.fail("News");
					},250);
				},
				function(done,msg){
					done(msg.toLowerCase());
				}
			)
			.val(function(msg1,msg2,msg3,msg4){
				if (!(
					arguments.length === 4 &&
					ASQ.isMessageWrapper(msg1) &&
					msg1[0] === "Hello" &&
					msg1[1] === "HELLO" &&
					typeof msg2 === "undefined" &&
					typeof msg3 === "undefined" &&
					msg4 === "hello"
				)) {
					var args = ARRAY_SLICE.call(arguments);
					args.unshift(testDone,label);
					FAIL.apply(FAIL,args);
				}
			})
			.any(
				function(done,msg){
					setTimeout(function(){
						done.fail("Looks","good");
					},250);
				},
				function(done,msg){
					done.fail("now");
				}
			)
			.val(function(){
				clearTimeout(timeout);
				var args = ARRAY_SLICE.call(arguments);
				args.unshift(testDone,label);
				FAIL.apply(FAIL,args);
			})
			.or(function(msg1,msg2){
				clearTimeout(timeout);

				if (
					arguments.length === 2 &&
					ASQ.isMessageWrapper(msg1) &&
					msg1[0] === "Looks" &&
					msg1[1] === "good" &&
					msg2 === "now"
				) {
					PASS(testDone,label);
				}
				else {
					var args = ARRAY_SLICE.call(arguments);
					args.unshift(testDone,label);
					FAIL.apply(FAIL,args);
				}
			});

			timeout = setTimeout(function(){
				FAIL(testDone,label + " (from timeout)");
			},1000);
		});
		tests.push(function(testDone){
			var label = "Contrib Test  #3", timeout;

			ASQ("Hello")
			.first(
				function(done,msg){
					setTimeout(function(){
						done(msg,msg.toUpperCase());
					},500);
				},
				function(done,msg){
					done.fail("Bad");
				},
				function(done,msg){
					setTimeout(function(){
						done.fail("News");
					},250);
				},
				function(done,msg){
					setTimeout(function(){
						done("Ignored, too late");
					},750);
				}
			)
			.val(function(msg){
				if (!(
					arguments.length === 1 &&
					ASQ.isMessageWrapper(msg) &&
					msg[0] === "Hello" &&
					msg[1] === "HELLO"
				)) {
					var args = ARRAY_SLICE.call(arguments);
					args.unshift(testDone,label);
					FAIL.apply(FAIL,args);
				}
			})
			.first(
				function(done){
					setTimeout(function(){
						done.fail("Looks","good");
					},250);
				},
				function(done){
					done.fail("now");
				}
			)
			.val(function(){
				clearTimeout(timeout);
				var args = ARRAY_SLICE.call(arguments);
				args.unshift(testDone,label);
				FAIL.apply(FAIL,args);
			})
			.or(function(msg1,msg2){
				clearTimeout(timeout);

				if (
					arguments.length === 2 &&
					ASQ.isMessageWrapper(msg1) &&
					msg1[0] === "Looks" &&
					msg1[1] === "good" &&
					msg2 === "now"
				) {
					PASS(testDone,label);
				}
				else {
					var args = ARRAY_SLICE.call(arguments);
					args.unshift(testDone,label);
					FAIL.apply(FAIL,args);
				}
			});

			timeout = setTimeout(function(){
				FAIL(testDone,label + " (from timeout)");
			},1000);
		});
		tests.push(function(testDone){
			var label = "Contrib Test  #4", timeout;

			ASQ("Hello")
			.last(
				function(done,msg){
					done.fail("Bad");
				},
				function(done,msg){
					setTimeout(function(){
						done(msg,msg.toUpperCase());
					},400);
				},
				function(done,msg){
					setTimeout(function(){
						done(msg.toLowerCase());
					},300);
				},
				function(done,msg){
					setTimeout(function(){
						done.fail("News");
					},250);
				}
			)
			.val(function(msg){
				if (!(
					arguments.length === 1 &&
					ASQ.isMessageWrapper(msg) &&
					msg[0] === "Hello" &&
					msg[1] === "HELLO"
				)) {
					var args = ARRAY_SLICE.call(arguments);
					args.unshift(testDone,label);
					FAIL.apply(FAIL,args);
				}
			})
			.last(
				function(done){
					setTimeout(function(){
						done.fail("Looks","good");
					},250);
				},
				function(done){
					done.fail("now");
				}
			)
			.val(function(){
				clearTimeout(timeout);
				var args = ARRAY_SLICE.call(arguments);
				args.unshift(testDone,label);
				FAIL.apply(FAIL,args);
			})
			.or(function(msg1,msg2){
				clearTimeout(timeout);

				if (
					arguments.length === 2 &&
					ASQ.isMessageWrapper(msg1) &&
					msg1[0] === "Looks" &&
					msg1[1] === "good" &&
					msg2 === "now"
				) {
					PASS(testDone,label);
				}
				else {
					var args = ARRAY_SLICE.call(arguments);
					args.unshift(testDone,label);
					FAIL.apply(FAIL,args);
				}
			});

			timeout = setTimeout(function(){
				FAIL(testDone,label + " (from timeout)");
			},1000);
		});
		tests.push(function(testDone){
			var label = "Contrib Test  #5", timeout;

			ASQ("Hello")
			.none(
				function(done,msg){
					setTimeout(function(){
						done.fail("Looks","good");
					},250);
				},
				function(done,msg){
					done.fail("so far");
				}
			)
			.val(function(msg1,msg2){
				if (!(
					arguments.length === 2 &&
					ASQ.isMessageWrapper(msg1) &&
					msg1[0] === "Looks" &&
					msg1[1] === "good" &&
					msg2 === "so far"
				)) {
					var args = ARRAY_SLICE.call(arguments);
					args.unshift(testDone,label);
					FAIL.apply(FAIL,args);
				}
			})
			.none(
				function(done){
					done.fail("Bad");
				},
				function(done){
					setTimeout(function(){
						done("Hello");
					},400);
				},
				function(done){
					done("world","it's me!");
				},
				function(done){
					setTimeout(function(){
						done.fail("News");
					},250);
				}
			)
			.val(function(){
				clearTimeout(timeout);
				var args = ARRAY_SLICE.call(arguments);
				args.unshift(testDone,label);
				FAIL.apply(FAIL,args);
			})
			.or(function(msg1,msg2,msg3,msg4){
				clearTimeout(timeout);

				if (
					arguments.length === 4 &&
					typeof msg1 === "undefined" &&
					msg2 === "Hello" &&
					ASQ.isMessageWrapper(msg3) &&
					msg3[0] === "world" &&
					msg3[1] === "it's me!" &&
					typeof msg4 === "undefined"
				) {
					PASS(testDone,label);
				}
				else {
					var args = ARRAY_SLICE.call(arguments);
					args.unshift(testDone,label);
					FAIL.apply(FAIL,args);
				}
			});

			timeout = setTimeout(function(){
				FAIL(testDone,label + " (from timeout)");
			},1000);
		});
		tests.push(function(testDone){
			var label = "Contrib Test  #6", timeout, counter = 0;

			ASQ(3)
			.until(
				function(done,msg){
					setTimeout(function(){
						counter++;
						if (counter < msg) {
							done.fail();
						}
						else {
							done(msg,msg * 2);
						}
					},10);
				},
				function(done,msg1,msg2){
					setTimeout(function(){
						counter++;
						if (counter < msg2) {
							done.fail();
						}
						else {
							done(msg1,msg2,msg2 * 2);
						}
					},10);
				}
			)
			.val(function(msg1,msg2,msg3){
				if (!(
					arguments.length === 3 &&
					msg1 === 3 &&
					msg2 === 6 &&
					msg3 === 12 &&
					counter === 6
				)) {
					var args = ARRAY_SLICE.call(arguments);
					args.unshift(testDone,label);
					FAIL.apply(FAIL,args);
				}
			})
			.until(
				function(done,msg){
					setTimeout(function(){
						counter++;
						if (counter > 10) {
							done.break(
								ASQ.messages("Stop","the","madness!")
							);
						}
						else {
							done.fail();
						}
					},10);
				}
			)
			.val(function(){
				clearTimeout(timeout);
				var args = ARRAY_SLICE.call(arguments);
				args.unshift(testDone,label);
				FAIL.apply(FAIL,args);
			})
			.or(function(msg){
				clearTimeout(timeout);

				if (
					arguments.length === 1 &&
					ASQ.isMessageWrapper(msg) &&
					msg[0] === "Stop" &&
					msg[1] === "the" &&
					msg[2] === "madness!" &&
					counter === 11
				) {
					PASS(testDone,label);
				}
				else {
					var args = ARRAY_SLICE.call(arguments);
					args.unshift(testDone,label);
					FAIL.apply(FAIL,args);
				}
			});

			timeout = setTimeout(function(){
				FAIL(testDone,label + " (from timeout)");
			},1000);
		});
		tests.push(function(testDone){
			var label = "Contrib Test  #7", timeout;

			ASQ()
			.try(
				function(done){
					setTimeout(function(){
						done.fail("Hello");
					},100);
				},
				function(done,msg){
					if (
						arguments.length === 2 &&
						typeof msg === "object" &&
						msg.catch === "Hello"
					) {
						setTimeout(function(){
							done(msg.catch,"World");
						},100);
					}
					else {
						done.fail("Oops");
					}
				}
			)
			.val(function(msg1,msg2){
				clearTimeout(timeout);

				if (
					arguments.length === 2 &&
					msg1 === "Hello" &&
					msg2 === "World"
				) {
					PASS(testDone,label);
				}
				else {
					var args = ARRAY_SLICE.call(arguments);
					args.unshift(testDone,label);
					FAIL.apply(FAIL,args);
				}
			})
			.or(function(){
				clearTimeout(timeout);
				var args = ARRAY_SLICE.call(arguments);
				args.unshift(testDone,label);
				FAIL.apply(FAIL,args);
			});

			timeout = setTimeout(function(){
				FAIL(testDone,label + " (from timeout)");
			},1000);
		});
		tests.push(function(testDone){
			var label = "Contrib Test  #8", timeout, isq,
				seed, ret
			;

			function step(num) {
				return num * 2;
			}

			// set up an iterable-sequence
			isq = ASQ.iterable()
				.then(step)
				.then(step)
				.then(step);

			// synchronously iterate the sequence
			for (seed = 3;
				!(ret && ret.done) && (ret = isq.next(seed));
			) {
				seed = ret.value;
			}

			if (seed !== 24) {
				FAIL(testDone,label,"WTF",seed);
				return;
			}

			// now, wire the iterable-sequence into
			// a normal sequence
			ASQ()
			.seq(isq)
			.val(function(msg1,msg2){
				if (!(
					arguments.length === 2 &&
					msg1 === "Awesome" &&
					msg2 === "sauce!"
				)) {
					clearTimeout(timeout);
					var args = ARRAY_SLICE.call(arguments);
					args.unshift(testDone,label);
					FAIL.apply(FAIL,args);
				}
				else {
					isq.next();
					setTimeout(function(){
						// advance the iterable-sequence 2 steps, which
						// should keep the main sequence going
						isq.next("Hello","world");
					},100);
				}
			})
			.seq(isq,isq) // listen for two iterations
			.val(function(msg1,msg2){
				if (!(
					arguments.length === 2 &&
					msg1 === "Hello" &&
					msg2 === "world"
				)) {
					clearTimeout(timeout);
					var args = ARRAY_SLICE.call(arguments);
					args.unshift(testDone,label);
					FAIL.apply(FAIL,args);
				}
				else {
					setTimeout(function(){
						// throw an error into the iterable-sequence,
						// which should throw the main sequence into
						// error
						isq.throw("Cool","beans");
					},100);
				}
			})
			.seq(isq)
			.val(function(){
				clearTimeout(timeout);
				var args = ARRAY_SLICE.call(arguments);
				args.unshift(testDone,label);
				FAIL.apply(FAIL,args);
			})
			.or(function(msg1,msg2){
				clearTimeout(timeout);

				if (
					arguments.length === 2 &&
					msg1 === "Cool" &&
					msg2 === "beans"
				) {
					PASS(testDone,label);
				}
				else {
					var args = ARRAY_SLICE.call(arguments);
					args.unshift(testDone,label);
					FAIL.apply(FAIL,args);
				}
			});

			// advance the iterable-sequence a step, which should
			// restart the waiting sequence
			isq.next("Awesome","sauce!");

			timeout = setTimeout(function(){
				FAIL(testDone,label + " (from timeout)");
			},1000);
		});
		tests.push(function(testDone){
			var label = "Contrib Test  #9", timeout, isq;

			// set up an iterable-sequence
			isq = ASQ.iterable();

			// now, wire the iterable-sequence into
			// a normal sequence
			ASQ(function(done){
				// wait for the iterable-sequence to advance
				// before the main sequence can proceed
				isq.pipe(done);

				setTimeout(function(){
					// advance the iterable-sequence a step, which should
					// keep the main sequence going
					isq.next("Hello","world");
				},100);
			})
			.val(function(msg1,msg2){
				if (!(
					arguments.length === 2 &&
					msg1 === "Hello" &&
					msg2 === "world"
				)) {
					clearTimeout(timeout);
					var args = ARRAY_SLICE.call(arguments);
					args.unshift(testDone,label);
					FAIL.apply(FAIL,args);
				}
			})
			.then(function(done){
				// throw an error into the iterable-sequence, which
				// should throw the main sequence into error
				isq.throw("Awesome","sauce!");

				// wait to listen for errors on the iterable-sequence
				// until well after it's been error'd
				setTimeout(function(){
					// wait for the iterable-sequence to advance
					// before the main sequence can proceed
					isq.pipe(done);
				},100);
			})
			.val(function(){
				clearTimeout(timeout);
				var args = ARRAY_SLICE.call(arguments);
				args.unshift(testDone,label);
				FAIL.apply(FAIL,args);
			})
			.or(function(msg1,msg2){
				clearTimeout(timeout);

				if (
					arguments.length === 2 &&
					msg1 === "Awesome" &&
					msg2 === "sauce!"
				) {
					PASS(testDone,label);
				}
				else {
					var args = ARRAY_SLICE.call(arguments);
					args.unshift(testDone,label);
					FAIL.apply(FAIL,args);
				}
			});

			timeout = setTimeout(function(){
				FAIL(testDone,label + " (from timeout)");
			},1000);
		});
		tests.push(function(testDone){
			var label = "Contrib Test #10", timeout, sq, isq,
				loop, seed, ret;

			function step(num) {
				return num * 2;
			}

			function delay(done,msg) {
				setTimeout(done,50);
			}

			function iterate(msg) {
				var ret;
				if ((ret = isq.next(msg)) && !ret.done) {
					return ret.value;
				}
				else {
					// break the iteration loop
					throw "Iteration complete.";
				}
			}

			// set up an iterable-sequence
			isq = ASQ.iterable()
				.then(step)
				.then(step)
				.then(step)
				.then(function(){
					throw "Should not get here!";
				})
				.or(function(msg){
					if (!(
						arguments.length === 1 &&
						msg === "Too big!"
					)) {
						clearTimeout(timeout);
						var args = ARRAY_SLICE.call(arguments);
						args.unshift(testDone,label);
						FAIL.apply(FAIL,args);
					}
				});

			// set up an async loop sequence controller
			loop = ASQ()
			.or(function(msg){
				clearTimeout(timeout);

				if (
					arguments.length === 1 &&
					msg === "Iteration complete." &&
					seed === 24
				) {
					PASS(testDone,label);
				}
				else {
					var args = ARRAY_SLICE.call(arguments);
					args.unshift(testDone,label);
					FAIL.apply(FAIL,args);
				}
			});

			// asynchronously iterate the sequence
			(function next(msg){
				if (msg > 15) {
					// throw an error into the iterable
					// sequence
					isq.throw("Too big!");
				}

				// store seed so we can check it at the end
				seed = msg;

				loop
				.then(delay)
				.val(msg,iterate,next);
			})(3);

			timeout = setTimeout(function(){
				FAIL(testDone,label + " (from timeout)");
			},1000);
		});

		return tests;
	}

	return defineTests;
});
