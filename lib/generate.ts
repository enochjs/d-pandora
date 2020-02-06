import fs from 'fs'
import path from 'path'

const startReg = /^\@start/
const nameReg = /^\@name/
const prefixReg = /^\@prefix/
const contentReg = /^\@content/
const endReg = /^\@end/
const descriptionReg = /^\@description/

interface Template {
  name: string;
  prefix: string;
  content: string[];
  description: string;
}

const fileRecursive = (filePath: string) => {
  const files = fs.readdirSync(filePath)
  return Promise.all(files.map(filename => {
    const filedir = path.join(filePath, filename);
    return new Promise((resolve, reject) => {
      fs.stat(filedir, (eror,stats) => {
        if(eror){
          console.warn('获取文件stats失败');
        }else{
          const isFile = stats.isFile();//是文件
          const isDir = stats.isDirectory();//是文件夹
          if(isDir){
            resolve(fileRecursive(filedir));//递归，如果是文件夹，就继续遍历该文件夹下面的文件
          }
          if(isFile){
            resolve(filedir)
          }
        }
      })
    })
  }))
}

const templates: any = {}

const flatten: (arr: any[]) => string[] = (arr) => arr.reduce((pre, val) => pre.concat(Array.isArray(val) ? flatten(val) : val), []);

const types = fs.readdirSync(path.resolve(__dirname, '../src/templates'))

types.forEach((type) => {
  fileRecursive(path.resolve(__dirname, `../src/templates/${type}`)).then((result: any[]) => {
    const flattenResult = flatten(result)
    result = flattenResult.filter((item) => item)
    Promise.all(flattenResult.map((fileDir: string) => {
      return new Promise((resolve, reject) => {
        fs.readFile(fileDir, 'utf8', (err, data) => {
          if (err) throw err;
          resolve(data)
        });
      })
    })).then((files) => {
      files.map((file: any) => {
        const lines = file.toString().split(/\n/)
        let temp: Template = {} as Template
        let iscontent = false
        lines.map((line: string) => {
          if (line.match(startReg)) {
            temp = {} as Template
          } else if (line.match(nameReg)) {
            temp.name = line.slice(5).trim()
          } else if (line.match(prefixReg)) {
            temp.prefix = line.slice(7).trim()
          } else if (line.match(contentReg)) {
            temp.content = []
            iscontent = true
          } else if (line.match(descriptionReg)) {
            temp.description = line.slice(12).trim()
          } else if (line.match(endReg)) {
            templates[temp.name] = {
              prefix: `@${temp.prefix || temp.name}`,
              body: temp.content,
              description: temp.description,
            }
            iscontent = false
          } else {
            iscontent && temp.content.push(line)
          }
        })
      })
      fs.writeFile(path.resolve(__dirname, `../snippets/${type}.json`), JSON.stringify(templates, null, 2), (err) => {
        console.log(err? err.message : '')
      })
    })
  })
})


