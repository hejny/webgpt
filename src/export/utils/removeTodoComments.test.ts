import { describe, expect, it } from '@jest/globals';
import spaceTrim from 'spacetrim';
import { removeTodoComments } from './removeTodoComments';

describe('removeTodoComments', () => {
    it(`keeps javascript as it is`, () => {
        expect(
            spaceTrim(
                removeTodoComments(`
                    console.info('Hello world');
                `),
            ),
        ).toEqual(
            spaceTrim(
                removeTodoComments(`
                    console.info('Hello world');
                `),
            ),
        );
    });

    it(`remove TODO comments from html`, () => {
        expect(
            spaceTrim(
                removeTodoComments(`
                    <html>
                        <head>
                            <title>Test</title>
                        </head>
                        <body>
                            <h1>Hello world</h1>
                            <!-- TODO: Some work -->
                        </body>
                    </html>
                `),
            ),
        ).toEqual(
            spaceTrim(
                removeTodoComments(`
                    <html>
                        <head>
                            <title>Test</title>
                        </head>
                        <body>
                            <h1>Hello world</h1>
                            ${``}
                        </body>
                    </html>
                `),
            ),
        );
    });

    it(`remove TODO comments from css in html`, () => {
        expect(
            spaceTrim(
                removeTodoComments(`
                <html>
                    <head>
                        <title>Test</title>
                    </head>
                    <body>
                        <h1>Hello world</h1>
                        <style>
                            body {
                                color: red;
                            }
                            /* TODO: Some work */
                        <style>
                    </body>
                </html>
                `),
            ),
        ).toEqual(
            spaceTrim(
                removeTodoComments(`
                <html>
                    <head>
                        <title>Test</title>
                    </head>
                    <body>
                        <h1>Hello world</h1>
                        <style>
                            body {
                                color: red;
                            }
                            ${``}
                        <style>
                    </body>
                </html>
                `),
            ),
        );
    });

    it(`remove TODO comments from javascript in html`, () => {
        expect(
            spaceTrim(
                removeTodoComments(`
                <html>
                    <head>
                        <title>Test</title>
                    </head>
                    <body>
                        <h1>Hello world</h1>
                        <script>
                            console.info('Hello world');

                            /* TODO: Some work */
                            // TODO: Some other work

                        </script>
                    </body>
                </html>
                `),
            ),
        ).toEqual(
            spaceTrim(
                removeTodoComments(`
                <html>
                    <head>
                        <title>Test</title>
                    </head>
                    <body>
                        <h1>Hello world</h1>
                        <script>
                            console.info('Hello world');

                            
                            

                        </script>
                    </body>
                </html>
                `),
            ),
        );
    });

    it(`remove TODO comments from css`, () => {
        expect(
            spaceTrim(
                removeTodoComments(`
                    .test {
                        color: red;
                    }

                    /* TODO: Some work */
                    
                `),
            ),
        ).toEqual(
            spaceTrim(
                removeTodoComments(`
                    .test {
                        color: red;
                    }

                `),
            ),
        );
    });

    it(`remove TODO comments from javascript`, () => {
        expect(
            spaceTrim(
                removeTodoComments(`
                    console.info('Hello world');

                    /* TODO: Some work */
                    // TODO: Some other work

                `),
            ),
        ).toEqual(
            spaceTrim(
                removeTodoComments(`
                    console.info('Hello world');
                `),
            ),
        );
    });
});
