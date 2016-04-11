function extend(child, parent) {
    child.prototype = parent.prototype;
}

module.exports = extend;