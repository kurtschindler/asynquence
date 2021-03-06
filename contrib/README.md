# asynquence Contrib

Optional plugin helpers are provided in `/contrib/*`. The full bundle of plugins (`contrib.js`) is **~1.3k** minzipped.

Gate variations:

* `all(..)` is **an alias** of `gate(..)`.
* `any(..)` is like `gate(..)`, except **just one segment** *has* to succeed to proceed on the main sequence.
* `first(..)` is like `any(..)`, except **as soon as any segment succeeds**, the main sequence proceeds (ignoring subsequent results from other segments).
* `last(..)` is like `any(..)`, except only **the latest segment to complete successfully** sends message(s) along to the main sequence.
* `none(..)` is the inverse of `gate(..)`: the main sequence proceeds only **if all the segments fail** (with all segment error message(s) transposed as success message(s) and vice versa).

Sequence-step variations:

* `until(..)` is like `then(..)`, except it **keeps re-trying until success** or `break()` (for loop semantics) before the main sequence proceeds.
* `try(..)` is like `then(..)`, except it proceeds as success on the main sequence **regardless of success/failure signal**. If an error is caught, it's transposed as a special-format success message: `{ catch: ... }`.

### `iterable-sequence` Plugin
`iterable-sequence` plugin provides `ASQ.iterable()` for creating iterable sequences. See [Iterable Sequences](https://github.com/getify/asynquence/blob/master/README.md#iterable-sequences) for more information, and examples: [sync loop](https://gist.github.com/getify/8211148#file-ex1-sync-iteration-js) and [async loop](https://gist.github.com/getify/8211148#file-ex2-async-iteration-js).

## Using Contrib Plugins

In the browser, include the `contrib.js` file along with the *asynquence* library file (`asq.js`). Doing so automatically extends the API with the plugins.

In node.js, you install the `asynquence-contrib` package alongside the `asynquence` package, and `require(..)` both of them, in order:

```js
var ASQ = require("asynquence");
require("asynquence-contrib");
```

**Note:** The `asynquence-contrib` module has no API (it only attaches itself to the `asynquence` package), so just calling `require(..)` without storing its return value is sufficient and recommended.

They can then be used directly, like this:

```js
ASQ()
.try(foo)
.until(bar)
.then(baz);
```

## Building Contrib Bundle

There is a utility provided to bundle the contrib plugins.

`bundle.js` builds the unminified bundle `contrib.src.js`, and then builds (minifies) `contrib.js`. The recommended way to invoke this utility is via npm:

`npm run-script bundle`

By default, the build includes all the `contrib/plugin.*` plugins. But, you can manually specify which plugins you want, by name, like this:

```
./bundle.js any none try
```

This would bundle only the `any`, `none`, and `try` plugins.

**Note:** `npm run-script ..` [doesn't *currently*](https://github.com/isaacs/npm/issues/3494) support passing the extra command line parameters, so you must use `./bundle.js` **instead of** `npm run-script bundle` if you want to pick which specific plugins to bundle.

## License

The code and all the documentation, unless otherwise noted, are released under the MIT license.

http://getify.mit-license.org/
