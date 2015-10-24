﻿/// <reference path="../reference.ts"/>

// We have to consider order inside each class due to JavaScript codes.
// By using clesses in namespace, we can set inheritable constants!
// And by using interface, it will be safe for the parent class of child classes.
// If we don't use export, we can hide the classes.

namespace CONSTANTS {
    
    //
    // ========== Game Constants ==========
    //

    export class Game {
        width: number = new MeasureSheet().width * new ScoreSheet().displayMeasureNum;
        height: number = new Note().height * new ScoreSheet().displayPitchNum;
        renderer: string = "score";
        imageAddress: string = "storage/assets/image/";
        language: string = "Finnish";
    }





    //
    // ========== Model ==========
    //

    export interface Model {
    }

    export class Music implements Model {
        unitNote: number = 8;
        measureNum: number = 16;
        pitch: string[] = [ "C5",
            "B4", "A4", "G4", "F4", "E4", "D4", "C4",
            "B3", "A3", "G3", "F3", "E3", "D3", "C3",
            "B2", "A2", "G2", "F2", "E2", "D2", "C2",
        ];
        pitchNum = this.pitch.length;
        writeStationery: string = new Stationery().writeStationery;
        eraseStationery: string = new Stationery().eraseStationery;
    }

    export class Stationery implements Model {
        stationeries: string[] = ["pencil", "eraser"];
        writeStationery: string = this.stationeries[0];
        eraseStationery: string = this.stationeries[1];
        stationeryNum: number = this.stationeries.length;
        initStationery: string = this.writeStationery;
    }

    export class Instrument implements Model {
        initInstrument: number = 0;
        instruments: string[] = [
            "piano",
            "trumpet",
            "violin",
        ];
    }

    export class MusicPlayer implements Model {
    }

    export class Speed implements Model {
        speeds: number[] = [80, 100, 130, 170, 220];
        initSpeedGrade: number = 2;
    }





    //
    // ========== Sprite View ==========
    //

    export interface SpriteView {
        width: number;
        height: number;
        x: number;
        y: number;
        initImage: string;
        images: { [name: string]: string };
    }

    export class PreloadBar implements SpriteView{
        width = new MeasureSheet().width;
        height = new Note().height;
        x = new Game().width / 2;
        y = new Game().height / 2;
        initImage = "preloadBar";
        images: { [name: string]: string } = {
            preloadBar: "preloadBar"
        }
    }

    export class Background implements SpriteView {
        width = new Game().width;
        height = new Game().height;
        x = 0;
        y = 0;
        initImage = "background";
        images: { [name: string]: string } = {
            background: "background",
        };
    }

    export class Note extends Music implements SpriteView {
        width = new MeasureSheet().width / this.unitNote;
        height = new MeasureSheet().height / this.pitchNum;
        x = 0;
        y = 0;
        initImage = "note";
        images: { [name: string]: string } = {
            note: "note",
        }
        ringDuration: number = 700;   // ms
        fadeDuration: number = 100;   // ms
        doubleClkTime: number = 200;  // ms
    }

    export class MeasureSheet extends Music implements SpriteView {
        width = 320;
        height = 45 * this.pitchNum;
        x = 0;
        y = 0;
        initImage = "score";
        images: { [name: string]: string } = {
            score: "score",
        }
        noteWidth: number = this.width / this.unitNote;
        noteHeight: number = this.height / this.pitchNum;
    }

    export class MusicPlayBar extends Music implements SpriteView {
        width = 10;
        height = new MeasureSheet().height;
        beatWidth: number = new MeasureSheet().width / 4;
        x = 0;
        y = 0;
        initImage = "bar";
        beatSound: string = "tamb";
        images: { [name: string]: string } = {
            bar: "musicPlayBar",
        }
        playSpeed: number = 120;    // in Phaser Speed
    }





    //
    // ========== Group View ==========
    //

    export interface GroupView {
    }

    export class ScoreSheet extends MeasureSheet implements GroupView {
        displayMeasureNum: number = 2;
        displayPitchNum: number = 8;
    }

    export class Notes extends MeasureSheet implements GroupView {
    }





    //
    // ========== DOM View ==========
    //

    export interface DOMView {
        selector: string;
    }

    export class Logo implements DOMView {
        selector = "#logo";
    }

    export class StationeryButton implements DOMView {
        selector = "";
        name: string;
        protected imageAddress: string = new Game().imageAddress + "stationeryButton/";
        class: { [name: string]: string } = {
            buttonImage: "buttonImage",
        };
        images: { [name: string]: string };
        onColor: string = "crimson";
        offColor: string = "royalblue";
    }

    export class Pencil extends StationeryButton{
        selector = "#pencil";
        name = new Stationery().writeStationery;
        images: { [name: string]: string } = {
            image: this.imageAddress + "pencil.png",
        }
    }

    export class Eraser extends StationeryButton {
        selector = "#eraser";
        name = new Stationery().eraseStationery;
        images: { [name: string]: string } = {
            image: this.imageAddress + "eraser.png",
        }
    }

    export class StationeryToggler extends StationeryButton {
        stationeries = new Stationery().stationeries;
        stationeryNum = new Stationery().stationeryNum;
    }

    export class PlayButton implements DOMView {
        selector = "#play";
        class: { [name: string]: string } = {
            buttonImage: "buttonImage",
        };
        images: { [name: string]: string } = {
            image: new Game().imageAddress + "playButton/playButton.png",
        }
        onColor: string = "orange";
        offColor: string = "limegreen";
    }

    export class ScrollButton implements DOMView {
        selector;
        direction: string;
        protected imageAddress: string = new Game().imageAddress + "scrollButton/";
        class: { [name: string]: string } = {
            buttonImage: "buttonImage",
        };
        images: { [name: string]: string };
        speed: number = 5; // px per frame
        measureWidth: number = new ScoreSheet().width;
        displayMeasureNum: number = new ScoreSheet().displayMeasureNum;
        noteHeight: number = new MeasureSheet().noteHeight;
        pitch: string[] = new Music().pitch;
        initPitch: string = "C4"; // is the highest in display!
        doubleTapTime: number = new Note().doubleClkTime; // ms
    }

    export class UpButton extends ScrollButton {
        selector = "#up";
        direction = "up";
        images: { [name: string]: string } = {
            image: this.imageAddress + "up.png",
        };
    }

    export class DownButton extends ScrollButton {
        selector = "#down";
        direction = "down";
        images: { [name: string]: string } = {
            image: this.imageAddress + "down.png",
        };
    }

    export class RightButton extends ScrollButton {
        selector = "#right";
        direction = "right";
        images: { [name: string]: string } = {
            image: this.imageAddress + "right.png",
        };
    }

    export class LeftButton extends ScrollButton {
        selector = "#left";
        direction = "left";
        images: { [name: string]: string } = {
            image: this.imageAddress + "left.png",
        };
    }

    export class SaveButton implements DOMView {
        selector = "#save";
        image: string = new Game().imageAddress + "storageButton/save.png";
    }

    export class LoadButton implements DOMView {
        selector = "#load";
        image: string = new Game().imageAddress + "storageButton/load.png";
    }

    export class SoundButtonContainer implements DOMView {
        selector = "#soundButtonContainer";
        height: number = new MeasureSheet().noteHeight * new ScoreSheet().displayPitchNum;
        pitch: string[] = new Music().pitch;
    }

    export class SoundButton implements DOMView {
        selector = "soundButton";
        border: number = 2;
        pitchTop: number = new MeasureSheet().noteHeight;
        ringDuration: number = new Note().ringDuration;
        pitch: string[] = new Music().pitch;
        language: string = new Game().language;
        pitchText = {
            English: ["C", "B", "A", "G", "F", "E", "D", "C", "B", "A", "G", "F", "E", "D", "C", "B", "A", "G", "F", "E", "D", "C"],
            Japanese: ["ド", "シ", "ラ", "ソ", "ファ", "ミ", "レ", "ド", "シ", "ラ", "ソ", "ファ", "ミ", "レ", "ド", "シ", "ラ", "ソ", "ファ", "ミ", "レ", "ド"],
            Finnish: ["DO", "TI", "LA", "SO", "FA", "MI", "RE", "DO", "TI", "LA", "SO", "FA", "MI", "RE", "DO", "TI", "LA", "SO", "FA", "MI", "RE", "DO"],
        }
    }

    export class SpeedDisplay implements DOMView {
        selector = "#speedDisplay";
        speeds: number[] = new Speed().speeds;
        speedGradeNum: number = this.speeds.length;
        language: string = new Game().language;
        speedColor: string[] = ["green", "greenyellow", "yellow", "orange", "red"];
        textColor: string[] = ["white", "black", "black", "white", "white"];
        speedText = {
            English: ["VERY SLOW", "SLOW", "NORMAL", "FAST", "VERY FAST"],
            Japanese: ["とてもおそい", "おそい", "ふつう", "はやい", "とてもはやい"],
            Finnish: ["HYVIN HIDAS", "HIDAS", "NORMAALI", "NOPEA", "HYVIN NOPEA"],
        };
    }

    export class SpeedButton implements DOMView {
        selector = "";
        upDirection: string = "up";
        downDirection: string = "down";
        direction: string = "";
        speedGradeNum: number = new Speed().speeds.length;
    }

    export class SpeedUpButton extends SpeedButton implements DOMView {
        selector = "#speedUp";
        direction = this.upDirection;
    }

    export class SpeedDownButton extends SpeedButton implements DOMView {
        selector = "#speedDown";
        direction = this.downDirection;
    }

    export class InstrumentOption extends Instrument implements DOMView {
        selector = "";
        height: number = 60;
        samplePitch: string = "C3";
        sampleTime: number = new Note().ringDuration
        language: string = new Game().language;
        instrumentText = {
            English: { piano: "Piano", trumpet: "Trumpet", violin: "Violin" },
            Japanese: { piano: "ピアノ", trumpet: "トランペット", violin: "バイオリン" },
            Finnish: { piano: "Piano", trumpet: "Trumpetti", violin: "Viulu" },
        }
        backgroundColor = {
            piano: "silver",
            trumpet: "gold",
            violin: "saddlebrown",
        };
        textColor = {
            piano: "black",
            trumpet: "black",
            violin: "white",
        };
        imageAddress = new Game().imageAddress + "instrument/";
        image = {
            piano: this.imageAddress + "piano.png",
            trumpet: this.imageAddress + "trumpet.png",
            violin: this.imageAddress + "violin.png",
        }
    }

    export class InstrumentContainer extends InstrumentOption implements DOMView {
        selector = "#instrumentContainer";
        containerHeight = this.height * (this.instruments.length - 1);
        slideTime: number = 500 // ms
    }

    export class InstrumentMenu extends InstrumentOption implements DOMView {
        selector = "#instrumentMenu";
    }
}