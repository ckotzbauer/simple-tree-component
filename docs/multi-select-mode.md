
# Multi-select mode

**TODO**: Add screenshot, if styling is done.

## Features

In addition to the general, self-explanatory features, this mode also offers support for the following options:

### Custom styles for drop-down container

The drop-down is placed globally in the DOM. As described in the [API docs](interfaces/baseoptions.md#css) you can add a custom css-class to the
container-div where the drop-down lives. Simply add this snippet to the options during initialization:
```js
css: {
    dropdownHolder: "my-custom-dropdown-styles"
}
```

### Customize displayed text for selected items

You can use this hook to customize the text which is displayed for selected items. See [API docs](interfaces/baseoptions.md#templateselectedtext) for details.
```js
templateSelectedText: node => (`Selected: ${node.label}`)
```


## Live demo
**TODO**: Add JSFiddle demo, when repo is public.
