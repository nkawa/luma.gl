# picking (Shader Module)

Provides support for color based picking. In particular, supports picking a specific instance in an instanced draw call.

Color based picking lets the application draw a primitive with a fixed color, and by reading the color from a pixel in the resulting Framebuffer it can determine which primitive was drawn topmost at that point without asking the CPU to refer to geometry or raycasting etc.

## Usage

In your vertex shader, your inform the picking module what object we are currently rendering by supplying a picking color, perhaps from an attribute.
```
attribute vec3 aPickingColor;
main() {
  picking_setColor(aPickingColor);
  ...
}
```

In your fragment shader, you simply apply (call) the `picking_filterColor` filter function at the very end of the shader. This will return the normal color, or the highlight color, or the picking color, as appropriate.
```
main() {
  gl_FragColor = ...
  gl_FragColor = picking_filterColor(gl_FragColor);
}
```

A limitation with the above approach is that the highlight color does not get processed by i.e. other color filters in your fragment shader. If you would like to get the non-picking color (vertex or highlight color) of the current fragment simply call `picking_filterHighlight`, This ensures the highlight color gets exposed to the same lighting or other color treatments in your shader as normal vertex colors.
```
main() {
  gl_FragColor = picking_filterHighlight(color);
  // Now the highlight color will also be filtered...
  gl_FragColor = lighting_filterColor(gl_FragColor);
  ...
  gl_FragColor = picking_filterColor(gl_FragColor);
}
```

## JavaScript Functions

### getUniforms

`getUniforms` returns an object with key/value pairs representing the uniforms that the `picking` module shaders need.

`getUniforms({enabled, })`

* `enabled`=`true` (*boolean*) - Activates picking
* `selectedIndex`=-1 (*number*) - The index of the selected item, or -1 if no selection.
* `highlightColor`= (*array*)- Color used to highlight the currently selected
* `active`=`false` (*boolean*) - Renders the picking colors instead of the normal colors. Normally only used with an off-screen framebuffer during picking.

Note that the selected item will be rendered using `highlightColor`.


## Vertex Shader Functions

### `void picking_setPickingColor(vec3)`

Sets the color that will be returned by the fragment shader if color based picking is enabled. Typically set from a `pickingColor` uniform or a `pickingColors` attribute (e.g. when using instanced rendering, to identify the actual instance that was picked).


## Fragment Shader Functions

### picking_filterColor

 If is picking enabled and active, returns the current vertex's picking color set by `picking_setPickingColor`. Otherwise returns its argument, unmodified.

`vec4 picking_filterColor(vec4 color)`



### picking_filterHighlight

Returns the picking color set by `picking_setPickingColor`, if is picking enabled and active. Otherwise returns its argument, unmodified.

`vec4 picking_filterHighlight(vec4 color)`


## Remarks

* It is strongly recommended that `picking_filterColor` is called last in a fragment shader, as the picking color (returned when picking is enabled) must not be modified in any way (and alpha must remain 1) or picking results will not be correct.