<h1 align="center">FileNavigator</h1>

<div align="center">

[![Version](https://img.shields.io/npm/v/filenavigator?style=flat-square)](https://www.npmjs.com/package/filenavigator)
[![GitHub Issues](https://img.shields.io/github/issues-raw/LoucasMaillet/fileNavigator?style=flat-square)](https://github.com/LoucasMaillet/fileNavigator/issues)
[![GitHub Pull Requests](https://img.shields.io/github/issues-pr-raw/LoucasMaillet/fileNavigator?style=flat-square)](https://github.com/LoucasMaillet/fileNavigator/pulls)
[![License](https://img.shields.io/npm/l/filenavigator?style=flat-square)](/LICENSE)

</div>

---

<p align="center">
  Just a simple module to easely manipulate path : you can iterate over folder, access to his childs like for an object, replacing a part of his path and recursevely the same to his childs, also you can directly use their path in string format, etc ...
</p>

---

## 📝 Table of Contents

- [About](#about)
- [Getting Started](#getting_started)
- [Deployment](#deployment)
- [Usage](#usage)
- [Built Using](#built_using)
- [Limitations](#limitations)
- [Authors](#authors)

## 🧐 About <a name = "about"></a>

The aim behind this was to make life easier when you use way too much paths in your project, and when their not from the same folder, for instance it's very usefull with EJS.

## 🏁 Getting Started <a name = "getting_started"></a>

### Installing

Just install the packet with npm :

```
$ npm install filenavigator
```

## 🔧 Running the tests <a name = "tests"></a>

Like for each npm package :

```
$ npm test
```

## 🎈 Usage <a name="usage"></a>

```
/* Imagine you have a folder like that:
──┮ ..
  ├──╼ LICENSE
  ├──╼ README.md
  ├──┮ docs
  │  └──╼ ico.svg
  ├──╼ package.json
  └──┮ src <-- You're here
     ├──╼ index.js
     └──╼ test.js
*/

const fs = require("fs"),
      fn = require("filenavigator"),
      parentDir = fn.Dir.from(".."), // .from is needed if this came from a real path, here we get the parent folder of the script
      parentDirRoot = parentDir.asRoot(); // Here we make a copy of parentDir but his paths have removed the part from the parent ("..")

// Then you can navigate in the directory:

const ico = fs.readFileSync(parentDir.docs.ico);

for (let child of parentDir) console.log(child);

// You can also visualize the directory:

console.log(parentDir.tree);
```

## 🚀 Deployment <a name = "deployment"></a>

Build and tested on a linux, no certification this will work on windows but I think it's working on, anyway if it doesn't report [here](/issues).

## 🚀 Limitations <a name = "limitations"></a>

There is no support for file with the same name but not the same extension.
Beside that it's good to know that module can slow you're programm if you scan bif folder without setting a depth limit.
The current transformation to turn file name in object key is like that:
```
index.js --> index // For normal name

.vscode --> _vscode // For hidden unix name

hello.world.txt --> hello_world // For name with multilple dots
```

## ⛏️ Built Using <a name = "built_using"></a>

- [NodeJs](https://nodejs.org/en/) - Server Environment

## ✍️ Authors <a name = "authors"></a>

- [@loucas](https://github.com/LoucasMaillet) - Idea & Initial work