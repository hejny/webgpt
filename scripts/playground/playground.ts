#!/usr/bin/env ts-node

import * as dotenv from 'dotenv';

dotenv.config({ path: '.env' });

import chalk from 'chalk';
import OpenAI from 'openai';
import { join } from 'path';
import spaceTrim from 'spacetrim';
import { OPENAI_API_KEY } from '../../config';

if (process.cwd() !== join(__dirname, '../..')) {
    console.error(chalk.red(`CWD must be root of the project`));
    process.exit(1);
}

playground()
    .catch((error) => {
        console.error(chalk.bgRed(error.name));
        console.error(error);
        process.exit(1);
    })
    .then(() => {
        process.exit(0);
    });

async function playground() {
    console.info(`🧸  Playground`);

    // Do here stuff you want to test
    //========================================>

    const openai = new OpenAI({
        apiKey: OPENAI_API_KEY,
    });

    const rawResponse = await openai.completions.create({
        model: 'gpt-3.5-turbo-instruct',
        max_tokens: 1000,
        prompt: spaceTrim(`
            
            Jako zkušenému copywriterovi a webdesignérovi vám bylo svěřeno vytvoření textu pro novou webovou stránku Nestvořené dětské světy.

            Zadání webu od zákazníka:
            
            \`\`\`
            dítě sedí na zemi
            \`\`\`
            
            ## Pokyny:
            
            -   Formátování textu je v Markdownu
            -   Buďte struční a výstižní
            -   Použijte klíčová slova, avšak ta mají být přirozeně v textu
            -   Jedná se o kompletní obsah stránky, tedy nezapomeňte na všechny důležité informace a prvky, co by měla stránka obsahovat
            -   Použijte nadpisy, odrážky, formátování textu
            
            ## Klíčová slova:
            
            - Děti
            - Svět
            - Kreativita
            - Hračky
            - Fantazie
            - Vytváření
            - Prostor
            - Hraní
            - Inovace
            - Rozvoj
            - Představivost
            - Herní plocha
            - Design
            - Hry
            - Zábava
            - Interaktivita
            - Stimulace
            - Vzdělání
            - Dětský pokoj
            - Hra
            
            ## Obsah webu:
            
            
            # Nestvořené dětské světy
            
            > Domačtěte dětem svět, který nebyl ještě vymyšlený!
        
        `),
    });

    console.log(rawResponse);
    //========================================/

    console.info(`[ Done 🧸  Playground ]`);
}
