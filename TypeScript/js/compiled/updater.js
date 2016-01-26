define(["require", "exports"], function (require, exports) {
    var Updater = (function () {
        function Updater() {
        }
        Updater.Add = function (handler) {
            this._handlers.push(handler);
        };
        Updater.Remove = function (handler) {
            var index = this._handlers.indexOf(handler);
            if (index > -1)
                this._handlers.splice(index, 1);
        };
        Updater.Clear = function () {
            this._handlers.length = 0;
        };
        Updater.Update = function () {
            for (var i = 0; i < this._handlers.length; i++)
                this._handlers[i].Update();
        };
        Updater._handlers = [];
        return Updater;
    })();
    return Updater;
});
