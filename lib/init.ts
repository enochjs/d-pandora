#!/usr/bin/env node
import program from 'commander'
import inquirer from 'inquirer'
import ora from 'ora'
import { ncp } from 'ncp'
import colors from 'colors'
import path from 'path'
import fs from 'fs'

const projectsPath = path.resolve(__dirname, '../src/projects')
const projects = fs.readdirSync(projectsPath)

async function inquire () {
  const promps = [
    {
      type: 'input',
      name: 'name',
      message: `${colors.red('make sure you are in a empty project!\n')} ${colors.green('please input you project name:')}`,
    },
    {
      type: 'list',
      name: 'project',
      message: 'please selet a project template?',
      choices: projects,
      when: function (answers: { name: string, project: string }) {
        return answers.name !== '';
      }
    },
  ];
  const result = await inquirer.prompt(promps)
  const { name, project } = result

  if (!name) {
    console.log(colors.red('please input your project name!'), '\n')
    await inquire()
    return
  }

  if (fs.existsSync(`${process.cwd()}/${name}`)) {
    console.log(colors.red(`${name} aleardy exist!!!`))
    return
  }

  const spinning = ora('start init project, please wait ...')

  spinning.start()
  
  ncp(`${projectsPath}/${project}`, `${name}`, err => {
    if (err) {
      console.log(colors.red(`build fail!, ${err}`));
      process.exit();
    }
    spinning.stop()

    console.log(colors.green('Success! project detail info you can read the readme file!'));
  });
}

program.command('init')
  .option('-n, --name', 'project name')
  .description('init a project')
  .alias('i')
  .action(async (option) => {
    await inquire()
  })
  
// program.parse(process.argv)
