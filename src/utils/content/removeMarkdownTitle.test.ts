import { describe, expect, it } from '@jest/globals';
import { spaceTrim } from 'spacetrim';
import { just } from '../just';
import { removeMarkdownTitle } from './removeMarkdownTitle';

describe('removeMarkdownTitle', () => {
    it('should keep text without title as it is', () => {
        expect(removeMarkdownTitle(`Text`)).toEqual(`Text`);
        expect(removeMarkdownTitle(`Hello **world**`)).toEqual(`Hello **world**`);
    });

    it('should remove title from markdown', () => {
        expect(
            removeMarkdownTitle(
                spaceTrim(`
                    # Title

                    Text
                
                `),
            ),
        ).toEqual(
            just(
                spaceTrim(`
                    Text
                `),
            ),
        );
    });

    it('should remove title from markdown and preserve all other formatting', () => {
        expect(
            removeMarkdownTitle(
                spaceTrim(`
                    # Title

                    Text **bold** *italic* [link](https://example.com) [link2](https://example.com)

                    > Quote

                    - List item
                    - List item 2

                    <!--Note-->
                    
                
                `),
            ),
        ).toEqual(
            just(
                spaceTrim(`
                

                    Text **bold** *italic* [link](https://example.com) [link2](https://example.com)

                    > Quote

                    - List item
                    - List item 2

                    <!--Note-->
                
                
                `),
            ),
        );
    });

    it('should not be confused by note', () => {
        expect(
            removeMarkdownTitle(
                spaceTrim(`
                    <!--
                    # Title in note without a real title
                    -->

                    Hello
                    
                
                `),
            ),
        ).toEqual(
            just(
                spaceTrim(`
                    <!--
                    # Title in note without a real title
                    -->

                    Hello
                
                `),
            ),
        );
        /*
        TODO:
        expect(
            removeMarkdownTitle(
                spaceTrim(`
                    <!--
                    # Title in note
                    -->

                    # Real title

                    Hello
                    
                
                `),
            ),
        ).toEqual(
            just(
                spaceTrim(`
                    <!--
                    # Title in note
                    -->


                    Hello
                    
                
                `),
            ),
        );
        */
    });
});
