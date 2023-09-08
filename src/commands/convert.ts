import type { Command } from 'commander';
import path from 'path';
import fs from 'fs';
import chalk from 'chalk';
import { cleanComments, findTags, parseElement } from '../utils';

interface IOptions {
    src: string;
}

export const convert = (program: Command) => {
    program
        .command('convert')
        .description('convert html file to object')
        .option('-s, --src <file>', 'Option Description')
        .action(async (options: IOptions) => {
            // Check if the 'src' option is provided
            if (!options.src) {
                console.log('--src option which is file path is required');
                process.exit(1);
            }

            const cwd = process.cwd();
            const file_path = path.join(cwd, options.src);
            const output_path = path.join(cwd, 'output.json');
            let html = fs.readFileSync(file_path, 'utf-8');

            console.log(chalk.blue('Input file: ', file_path));
            console.log(chalk.blue('Converting...'));
            console.log();

            // Clean HTML comments, find HTML tags, and parse elements
            const _html = cleanComments(html);
            const { tags } = findTags(_html);
            const elements = parseElement(tags);

            console.log(chalk.yellow('Output JSON: '));
            console.log(elements);

            fs.writeFile(output_path, JSON.stringify(elements), 'utf8', (err) => {
                if (err) {
                    console.log('An error occurred while writing JSON Object to File.');
                    return console.log(err);
                }

                console.log();
                console.log(chalk.green('JSON file has been saved in this path: ', output_path));
                console.log();
            });
        });
};
