﻿/// <reference path="../index.ref.ts"/>

class UserName extends HTMLView {
	constructor(private constants: INDEX.UserName, private language: Language) {
		super(constants);
		this.setView();
		this.setEvent();
	}

	private checkNameInSession(): string {
		var name: string = "";
		$.ajax({
			url: this.constants.sessionGetUserName,
			async: false,
			success: (data: string) => { if (data != "") name = data; }
		});
		return name;
	}

	private setView() {
		var lang = this.language.getLanguage;
		var name: string = this.checkNameInSession() + this.constants.honorText[lang];
		if(name == "") name = this.constants.guestText[lang];
		this.$.text(this.constants.welcomeText[lang] + name);
	}

	private setEvent() {
		this.language.onChangeLanguage(() => this.setView());
	}
}