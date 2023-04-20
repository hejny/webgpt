#!/usr/bin/env ts-node

import * as fs from 'fs';
import * as yaml from 'js-yaml';
import * as path from 'path';

const directoryPath = path.join(process.cwd(), 'locales/en');
const outputFilePath = path.join(process.cwd(), 'locales/en.yml');

let bigYaml: any = {};

fs.readdir(directoryPath, function (err: any, files: string[]) {
    if (err) {
        return console.log('Unable to scan directory: ' + err);
    }
    files.forEach(function (file) {
        if (path.extname(file) === '.yml') {
            let fileContents = fs.readFileSync(path.join(directoryPath, file), 'utf8');
            let data = yaml.load(fileContents);
            bigYaml[file] = data;
        }
    });
    let yamlStr = yaml.dump(bigYaml);
    fs.writeFileSync(outputFilePath, yamlStr, 'utf8');
});

/**
 * @generator Bing Chat
 */
