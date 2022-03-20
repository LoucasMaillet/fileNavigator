import { Dir } from "./index.mjs";

const CHILD = ["LICENSE", "README", "docs", "package", "src"],
    DIR = Dir.from(".");

CHILD.forEach(child => {
    if (!(child in DIR)) throw new Error(`Something went wrong : ${child} is missing from Dir! TUTU DUDUDIDU-DUDIDU`)
})