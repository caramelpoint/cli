#!/usr/bin/env node

import * as inquirer from 'inquirer';
import { exec } from 'child_process';
import { Answers } from './models/Answers';
import { ProjectTypes } from './models/ProjectTypes';

export const cli = async () => {
  const anwsers: Answers = await inquirer.prompt([
    {
      name: 'project.name',
      type: 'input',
      message: 'What name do you want to give to your project?',
      default: 'my-app',
    },
    {
      name: 'project.type',
      type: 'list',
      message: 'What type of project is it?',
      choices: [ProjectTypes.Frontend],
    },
    {
      name: 'frameworks.base',
      type: 'list',
      message: 'Which framework/library do you want to use?',
      choices: (answers: Answers) => {
        const frameworks = [];
        if (answers.project.type == 'frontend') {
          frameworks.push(...['next']);
        }

        return frameworks;
      },
    },
    {
      name: 'frameworks.css',
      type: 'list',
      message: 'Which CSS framework do you want to use?',
      choices: (answers: Answers) => {
        const frameworks = ['none'];

        if (answers.project.type == 'frontend') {
          frameworks.push(...['tailwind']);
        }

        return frameworks;
      },
      filter: (input: string) => {
        let newInput = '';

        if (input !== 'none') {
          newInput = input;
        }

        return newInput;
      },
      default: '',
    },
  ]);

  const {
    project: { name },
    frameworks: { base, css },
  } = anwsers;

  const templateName = `${base}${css != '' ? `-${css}` : ''}`;

  const command = `git clone https://github.com/caramelpoint/cp-template-${templateName}.git ./${name}`;

  exec(command, (error, stdout, stderr) => {
    if (error) {
      console.log(`error: ${error.message}`);
      return;
    }
    if (stderr) {
      console.log(`stderr: ${stderr}`);
      return;
    }
    console.log(`stdout: ${stdout}`);
  });
};
