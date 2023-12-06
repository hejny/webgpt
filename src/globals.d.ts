// Note: [📍] Allow here to import raw content of html and markdown files
declare module '*.html';
declare module '*.md';
declare module '*.txt' /* <- [👩‍🌾] */;

// Note: Following are needed modules without types
declare module 'elevenlabs-node';
