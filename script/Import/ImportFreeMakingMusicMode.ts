﻿var MelOn_LOCATIONS = {
    Libraries: "storage/lib/",
    Asset: "script/Asset/",
    Constants: "script/Constants/",
    Boot: "script/Boot/",
    Preloader: "script/Preloader/",
    Model: "script/Model/",
    ConcreteModel: "script/ConcreteModel/",
    View: "script/View/",
    DOMView: "script/DOMView/",
    GroupView: "script/GroupView/",
    SpriteView: "script/SpriteView/",
    MelOn: "script/MelOn/",
    Main: "script/",
};

var MelOn_SCRIPTS = {
    Libraries: [
        "phaser",
        "jquery-1.10.2.min",
        "underscore",
    ],

    Asset: [
        "AssetLoader",
        "MelOnAssets",
    ],

    Constants: [
        "Constants",
    ],

    Model: [
        "Model"
    ],

    ConcreteModel: [
        "Music",
        "Stationery",
        "MusicPlayer",
        "Instrument",
        "Speed",
    ],

    View: [
        "DOMView",
        "GroupView",
        "SpriteView",
        "ContactManager",
    ],

    DOMView: [
        "Logo",
        "StationeryToggler",
        "StationeryButton",
        "SpeedDisplay",
        "SpeedButton",
        "PlayButton",
        "SaveButton",
        "LoadButton",
        "InstrumentMenu",
        "InstrumentContainer",
        "InstrumentOption",
        "SoundButtonContainer",
        "SoundButton",
        "ScrollButton",
    ],

    GroupView: [
        "ScoreSheet",
        "Notes",
    ],

    SpriteView: [
        "MeasureSheet",
        "Note",
        "MusicPlayBar",
    ],

    Boot: [
        "Boot",
    ],

    Preloader: [
        "Preloader",
    ],

    MelOn: [
        "MelOn",
    ],

    Main: [
        "FreeMakingMusicMode",
    ],
};

function importJS(locations: Object, scripts: Object) {
    for (var locationName in locations) {
        var location = locations[locationName];
        for (var script of scripts[locationName]) document.write(`<script src=${location + script + ".js"}></script>`);
    }
}
importJS(MelOn_LOCATIONS, MelOn_SCRIPTS);