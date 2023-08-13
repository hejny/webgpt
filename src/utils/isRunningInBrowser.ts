export const isRunningInBrowser = new Function('try {return this===window;}catch(e){ return false;}');
export const isRunningInNode = new Function('try {return this===global;}catch(e){return false;}');
