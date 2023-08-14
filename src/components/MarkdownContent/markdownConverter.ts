import { Converter } from 'showdown';
import showdownHighlight from 'showdown-highlight';

/**
 * A converter instance that uses showdown and highlight extensions ⁘
 *
 * @type {Converter}
 */
export const markdownConverter = new Converter({
    flavor: 'github',
    extensions: [
        showdownHighlight({
            // Whether to add the classes to the <pre> tag, default is false
            pre: true,
            // Whether to use hljs' auto language detection, default is true
            auto_detection: true,
        }),
    ],
});

/**
 * TODO: !! Lazy-make converter
 */
