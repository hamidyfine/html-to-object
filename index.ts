#!/usr/bin/env node

import { Command } from 'commander';
import { convert } from './src/commands/convert';
import { name, version } from './package.json';

const program = new Command();

convert(program);

program.name(name);
program.version(version);

program.parse();
