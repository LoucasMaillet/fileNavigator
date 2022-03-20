"use strict"

/**
 * Just a simple script of a path tree.
 * There is currently no support for hidden file (like .vscode).
 * @author Lucas Maillet
 */

import * as FS from "fs";

const X_SPACE = 2,
    Y_SPACE = 0,
    X_INDENT = ' '.repeat(X_SPACE),
    X_STROKE = '─'.repeat(X_SPACE),
    DECO_DIR = "\x1b[1;36m",
    DECO_FILE = "\x1b[32m",
    END = "\x1b[0m",
    REGEX_NAME = /^(.*)\/|\.(.*)$/gm;

//* Prototypes

/**
 * Create a line tree of the visual tree
 * @param {String} indent Starting indent
 * @returns {String}
 */
String.prototype.__tree__ = function (indent, base) {
    return `${X_STROKE}╼ ${DECO_FILE + base + END}\n`
}

//* Class

export class Dir extends Object {

    /** @type {String} */
    #path;

    /**
     * Create a basic path tree, usefull for path navigation in code
     * @param {String} path
     */
    constructor(path) {
        super();
        this.#path = path;
    }

    /**
     * Create a string tree of the path
     * @param {String} indent Starting indent
     * @param {String} base
     * @returns {String}
     */
    __tree__(indent, base) {
        const keys = Object.keys(this);
        if (keys.length === 0) return `${X_STROKE}╼ ${DECO_DIR + base + END}\n`;

        var tree = `${X_STROKE}┮ ${DECO_DIR + base + END}\n`,
            i = 0;

        const yIndent = `${`${indent}${X_INDENT}│\n`.repeat(Y_SPACE)}${indent}${X_INDENT}`;
        for (; i < keys.length - 1; i++) tree += `${yIndent}├${this[keys[i]].__tree__(`${indent}${X_INDENT}│`, keys[i])}`
        return `${tree}${yIndent}└${this[keys[i]].__tree__(`${indent}${X_INDENT} `, keys[i])}`
    }

    /**
     * Get a visual representation of the tree
     * @returns {String}
     */
    get tree() {
        return this.__tree__('', this.#path)
    }

    /**
     * Return correct class name
     */
    get [Symbol.toStringTag]() {
        return "Dir"
    }

    /**
     * Return correct class name
     */
    static get [Symbol.toStringTag]() {
        return "Dir"
    }

    /**
     * Get a Dir from a real location
     * @param {String} path 
     * @returns {Dir}
     */
    static from (path) {
        const dir = new Dir(path);
        for (let child of FS.readdirSync(path)) dir.pushChild(`${path}/${child}`);
        return dir
    }

    /**
     * Allow to loop over the files
     */
    *[Symbol.iterator]() {
        for (const path of Object.values(this)) yield path;
    }

    /**
     * Get this.#path
     * @returns {String}
     */
    toString() {
        return this.#path
    }

    /**
     * Add a file/folder
     * @param {String} path Starting path
     */
    pushChild(path) {
        const name = path.replace(REGEX_NAME, '');
        if (FS.lstatSync(path).isDirectory()) this[name] = Dir.from(path);
        else this[name] = path;
    };

    /**
     * Remove some part of the path
     * @param {String | Dir} path 
     * @returns {Dir}
     */
    replace(pathFrom, pathDest) {
        const dir = new Dir(this.#path.replace(pathFrom, pathDest));
        for (let k in this) dir[k] = this[k].replace(pathFrom, pathDest);
        return dir;
    }

    /**
     * Copy itself to a new Dir with his path as root
     * @returns {Dir}
     */
    asRoot() {
        const root = new Dir('/');
        for (let k in this) root[k] = this[k].replace(this.#path, '');
        return root;
    }
}