function randomName() {
    var name = Math.random().toString(36);
    return name.substring(name.length, name.length - 4);
}

module.exports = randomName;