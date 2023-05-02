import { Converter } from 'showdown';
import showdownHighlight from 'showdown-highlight';
import spaceTrim from 'spacetrim';
import { emojifyHtml } from '../../utils/content/emojifyHtml';
import { linkMarkdown } from '../../utils/content/linkMarkdown';
import { normalizeDashes } from '../../utils/content/normalizeDashes';
import { Html } from '../Html/Html';
import styles from './Article.module.css';

/**
 * Interface for article props ⁘
 * 
 * @interface
 * @property {string} content - The content of the article in markdown format
 * @property {boolean} [isHashUsed] - Whether the article uses hash for navigation
 * @property {boolean} [isEnhanced] - Whether the article applies additional enhancements to the markdown
 */
interface IArticleProps {
    /**
     * Source markdown
     */
    content: string;

    /**
     * Make for each heading in markdown unique id and scroll to hash
     */
    isHashUsed?: boolean;

    /**
     * Is enhanced by adding links, normalize dashes and emojify
     */
    isEnhanced?: boolean;
}


/**
 * Function component that renders an article from markdown content ⁘
 * 
 * @param {IArticleProps} props - The props for the component
 * @returns {JSX.Element} - The JSX element for the article
 */
export function Article(props: IArticleProps) {
    const { content /* [0], isHashUsed */, isEnhanced } = props;

    // [0] const hash = useHash();

    let markdown = spaceTrim(content || '');

    if (isEnhanced) {
        markdown = linkMarkdown(markdown);
        markdown = normalizeDashes(markdown);
    }

    converter.setFlavor('github');
    let html = converter.makeHtml(markdown);

    if (html === '') {
        // Note: Do not make empty div for empty article
        return <></>;
    }

    if (isEnhanced) {
        html = emojifyHtml(html);
    }

    // TODO: [0] If not using hash, remove IDs from html

    // [0] const currentSubsection = hash.substring(1);

    return (
        <>
            <Html
                className={styles.Article}
                {...{ html }}

                /*
                [0]
                ref={(element) => {
                    if (!element) {
                        return;
                    }

                    if (currentSubsection) {
                        const section = element.querySelector(`#${currentSubsection}`);

                        if (section) {
                            section.scrollIntoView(true);
                        }
                    }
                }}
                */
            />
            {/*
            TODO: <style> can not be in <div> because of AMP

            <style>
                 [0] !currentSubsection
                    ? ``
                    : `
                        #${currentSubsection}{
                          color: #1b73f7;
                        }

                        /*
                        TODO: Also all items to the next heading
                        #${currentSubsection} + * {
                          color: red;
                        }
                        * /

                `
            </style>
            */}
        </>
    );
}

/**
 * A converter instance that uses showdown and highlight extensions ⁘
 * 
 * @type {Converter}
 */
const converter = new Converter({
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
 * TODO:[0] Use has if isHashUsed is true
 * TODO: Maybe rename to <Content/> or <MarkdownContent/> or <Markdown/>
 */
