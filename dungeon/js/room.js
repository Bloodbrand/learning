System.register(["./lib/triangulation/Utils"], function(exports_1) {
    "use strict";
    var Utils_1;
    var Room;
    return {
        setters:[
            function (Utils_1_1) {
                Utils_1 = Utils_1_1;
            }],
        execute: function() {
            Room = (function () {
                function Room(Difficulty) {
                    this.Difficulty = Difficulty;
                    this.maxDifficulty = 4;
                    if (Difficulty == undefined)
                        this.Difficulty = Utils_1.Utils.RandomNum(0, this.maxDifficulty);
                }
                Room.prototype.SetDifficulty = function (d) {
                };
                return Room;
            }());
            exports_1("Room", Room);
        }
    }
});
