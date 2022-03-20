const { Dir } = require("filenavigator")
CHILD = ["LICENSE", "README", "package", "src"],
    PARENTDIR = Dir.from("..");

CHILD.forEach(child => {
    if (!(child in PARENTDIR)) throw new Error(`Something went wrong : ${child} is missing from Dir! TUTU DUDUDIDU-DUDIDU`)
})

if (!PARENTDIR.test._helloworld) throw new Error(`Can't reach hidden file (.helloworld)`)
if (!PARENTDIR.test.hello_world) throw new Error(`Can't reach file with multiple dots (hello.world.txt)`)