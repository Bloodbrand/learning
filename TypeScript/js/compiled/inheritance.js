var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var BaseClass = (function () {
    function BaseClass(title) {
        this._title = title;
    }
    return BaseClass;
})();
var ExtendsClass = (function (_super) {
    __extends(ExtendsClass, _super);
    function ExtendsClass(title) {
        _super.call(this, title);
    }
    return ExtendsClass;
})(BaseClass);
var Plant = (function () {
    function Plant() {
    }
    Plant.prototype.getName = function (nameOrId) {
        if (typeof nameOrId == "string")
            return "The name of this plane is: " + nameOrId;
        else
            return nameOrId;
    };
    return Plant;
})();
var PlantInfo = (function (_super) {
    __extends(PlantInfo, _super);
    function PlantInfo() {
        _super.call(this);
    }
    PlantInfo.prototype.getName = function (nameOrId) {
        var studentID = _super.prototype.getName.call(this, nameOrId);
        return studentID;
    };
    return PlantInfo;
})(Plant);
var Plant_2 = (function () {
    function Plant_2(plantName) {
        this._plant = plantName;
    }
    Plant_2.prototype.getName = function () {
        return "The name of this plane is: " + this._plant;
    };
    return Plant_2;
})();
var PlantInfo_2 = (function (_super) {
    __extends(PlantInfo_2, _super);
    function PlantInfo_2(plantName) {
        _super.call(this, plantName);
        this._plant = plantName;
    }
    PlantInfo_2.prototype.getName = function () {
        return "The name of this plant is: " + this._plant + ". The plant ID is 1234";
    };
    return PlantInfo_2;
})(Plant_2);
