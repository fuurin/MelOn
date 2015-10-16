/// <reference path="../reference.ts"/>
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var Note = (function (_super) {
    __extends(Note, _super);
    function Note(game, constants, models, data) {
        var _this = this;
        _super.call(this, game, constants, models);
        this.constants = constants;
        this.data = data;
        this.music = this.models["music"];
        this.stationery = this.models["stationery"];
        this.instrument = this.models["instrument"];
        this.musicPlayer = this.models["musicPlayer"];
        this.pointer = this.game.device.touch ? this.game.input.pointer1 : this.game.input.activePointer;
        this.isStreching = true;
        this.isMoving = false;
        this.touchPosition = null;
        this.music.onRefresh.add(function () { _this.refresh(); });
        this.music.onMove.add(function () { _this.movePosition(); });
        this.music.onChangeExtension.add(function () { _this.changeExtension(); });
        this.setPosition(data.start * constants.width, constants.pitch.indexOf(data.pitch) * constants.height);
        this.sampleSound();
    }
    Note.prototype.setPhysical = function () {
        this.game.physics.enable(this);
    };
    Note.prototype.setInput = function () {
        var _this = this;
        this.inputEnabled = true;
        this.input.useHandCursor = true;
        this.events.onInputUp.add(function () { _this.music.refresh(); });
        this.events.onInputDown.add(function () { _this.touchNote(); });
        this.events.onInputOver.add(function () {
            if (_this.stationery.getStationery === _this.constants.eraseStationery && _this.pointer.isDown)
                _this.erase();
        });
    };
    Object.defineProperty(Note.prototype, "getNoteData", {
        get: function () {
            return this.data;
        },
        enumerable: true,
        configurable: true
    });
    Note.prototype.touchNote = function () {
        this.music.select(this.data);
        this.sampleSound();
        if (this.stationery.getStationery === this.constants.writeStationery)
            this.startMoving();
        if (this.stationery.getStationery === this.constants.eraseStationery)
            this.erase();
    };
    Note.prototype.refresh = function () {
        this.isStreching = false;
        this.isMoving = false;
        this.touchPosition = null;
    };
    Note.prototype.startMoving = function () {
        this.isMoving = true;
        this.touchPosition = Math.floor(((this.pointer.x + this.game.camera.x) - this.x) / this.constants.width);
    };
    Note.prototype.movePosition = function () {
        if (this.music.getSelectedNote === this.data) {
            this.x = this.data.start * this.constants.width;
            if (this.y != this.constants.pitch.indexOf(this.data.pitch) * this.constants.height) {
                this.y = this.constants.pitch.indexOf(this.data.pitch) * this.constants.height;
                this.sampleSound();
            }
        }
    };
    Note.prototype.changeExtension = function () {
        if (this.music.getSelectedNote === this.data)
            this.width = this.constants.width * (this.music.getSelectedNote.extension + 1);
    };
    Note.prototype.erase = function () {
        this.music.select(this.data);
        this.music.erase(this.data);
        this.destroy();
    };
    Note.prototype.sampleSound = function () {
        this.sound = this.game.sound.play(this.instrument.getInstrument + this.data.pitch);
        this.sound.fadeOut(this.constants.sampleDuration);
    };
    Note.prototype.onOverlap = function () {
        if (this.musicPlayer.isPlaying)
            this.sound = this.game.sound.play(this.instrument.getInstrument + this.data.pitch);
    };
    Note.prototype.offOverlap = function () {
        if (this.sound && this.sound.isPlaying)
            this.sound.fadeOut(this.constants.fadeDuration);
    };
    Note.prototype.update = function () {
        if (this.isMoving)
            this.move();
        if (this.isStreching)
            this.strech();
    };
    Note.prototype.move = function () {
        var _this = this;
        var juttingRight = (this.pointer.x + this.game.camera.x) - (this.x + this.constants.width * (this.touchPosition + 1));
        var juttingLeft = (this.x + this.constants.width * this.touchPosition) - (this.pointer.x + this.game.camera.x);
        var juttingTop = this.y - (this.pointer.y + this.game.camera.y);
        var juttingBottom = (this.pointer.y + this.game.camera.y) - (this.y + this.height);
        if (juttingRight > 0)
            _.times(Math.ceil(juttingRight / this.constants.width), function () { _this.music.moveHorizontally(_this.data, true); });
        if (juttingLeft > 0)
            _.times(Math.ceil(juttingLeft / this.constants.width), function () { _this.music.moveHorizontally(_this.data, false); });
        if (juttingTop > 0)
            _.times(Math.ceil(juttingTop / this.constants.height), function () { _this.music.moveVertically(_this.data, true); });
        if (juttingBottom > 0)
            _.times(Math.ceil(juttingBottom / this.constants.height), function () { _this.music.moveVertically(_this.data, false); });
    };
    Note.prototype.strech = function () {
        var _this = this;
        var juttingOut = (this.pointer.x + this.game.camera.x) - (this.x + this.width);
        var juttingIn = (this.x + this.width) - (this.pointer.x + this.game.camera.x);
        if (juttingOut > 0)
            _.times(Math.ceil(juttingOut / this.constants.width), function () { _this.music.lengthen(_this.data); });
        if (juttingIn > 0)
            _.times(Math.floor(juttingIn / this.constants.width), function () { _this.music.shorten(_this.data); });
    };
    return Note;
})(SpriteView);
//# sourceMappingURL=Note.js.map