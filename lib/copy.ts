#!/usr/bin/env node
import program from 'commander'
import inquirer from 'inquirer'
import ora from 'ora'
import { ncp } from 'ncp'
import colors from 'colors'
import path from 'path'
import fs from 'fs'

program.command('copy')
.option('-c, --copy', 'copy page template or component template')
.description('copy page template or component template')
.alias('c')
.action(async (option) => {

  async function inquire () {

    const {frameType, type} = await inquirer.prompt([
      {
        type: 'list',
        name: 'frameType',
        message: 'please selet a frame?',
        choices: ['react'],
      },
      {
        type: 'list',
        name: 'type',
        message: 'please selet copy type?',
        choices: ['pages', 'components'],
      },
    ])
    const componentsPath = path.resolve(__dirname, `../src/components/${frameType}`)
    const pagesPath = path.resolve(__dirname, `../src/pages/${frameType}`)
    const components = fs.readdirSync(componentsPath)
    const pages = fs.readdirSync(pagesPath)
    const promps = [
      {
        type: 'list',
        name: 'component',
        message: 'please selet a component?',
        choices: components,
        when: function () {
          return type === 'components';
        }
      },
      {
        type: 'list',
        name: 'page',
        message: 'please selet a page?',
        choices: pages,
        when: function () {
          return type === 'pages';
        }
      },
      {
        type: 'input',
        name: 'name',
        message: 'please input you page name',
        when: function () {
          return type === 'pages';
        }
      },
    ];

    const result = await inquirer.prompt(promps)
    const { component, page } = result
    const name = type === 'components' ? component : result.name

    if (fs.existsSync(`${process.cwd()}/${name}`)) {
      console.log(colors.red(`${name} aleardy exist!!!`))
      return
    }
  
    const spinning = ora('start copy...')
    spinning.start()
    ncp(`${type === 'components' ? componentsPath : pagesPath}/${type === 'components' ? component : page}`, `${name}`, err => {
      if (err) {
        console.log(colors.red(`build fail!, ${err}`));
        process.exit();
      }
      spinning.stop()
      console.log(colors.blue('copy Success!'));
    });
    spinning.stop()

  }

  inquire()

})
