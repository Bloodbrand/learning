System.register([], function(exports_1) {
    "use strict";
    var Room;
    return {
        setters:[],
        execute: function() {
            Room = (function () {
                function Room(set) {
                    this.Difficulty = set.difficulty;
                }
                Room.prototype.SetDifficulty = function (d) {
                };
                return Room;
            }());
            exports_1("Room", Room);
        }
    }
});
