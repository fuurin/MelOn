/// <reference path="../index.ref.ts"/>
var index = (function () {
    function index() {
        this.logo = new HTMLLogo(new INDEX.HTMLLogo());
        this.freeMakingMusic = new ModeButton(new INDEX.FreeMakingMusic());
        this.lesson = new ModeButton(new INDEX.Lesson);
    }
    return index;
})();
window.onload = function () {
    $(function () { new index(); });
};
//# sourceMappingURL=index.js.map