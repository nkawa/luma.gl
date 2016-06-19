// Contains class and function wrappers around low level webgl objects
// These classes are intended to stay close to the WebGL API semantics
// but make it easier to use.
// Higher level abstractions can be built on these classes
export * from './types';

// Low level objects
export {default as Buffer} from './buffer';
export {default as Program} from './program';
export {default as Framebuffer} from './framebuffer';
export {default as Renderbuffer} from './renderbuffer';
export {Texture2D, TextureCube} from './texture';

import * as VertexAttributes from './vertex-attributes';
export {VertexAttributes};

// Functions
export * from './context';
export * from './draw';
export {default as glGet} from './get';

// Higher level abstractions
export {default as FBO} from './fbo';
