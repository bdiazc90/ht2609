"use strict";

const LS_KEY = "trade.skills";
const BACKEND_URL = "http://localhost:3000"; // Cambialo por la URL:PORT de tu backend

// state to use with local storage
let state;

// load from local storage
function loadState() {
	let getState = localStorage.getItem(LS_KEY);
	if (getState) {
		const objectState = JSON.parse(getState);
		if (objectState.user) {
			state = objectState;
		} else {
			state = null;
		}
	}
}

// use state from local storage on page load
function pageLoad() {
	loadState();
	const currentPage = window.location.pathname;

	if (state && currentPage.includes("index")) {
		window.location.href = "/apps/frontend/home.html";
	} else if (!state && currentPage.includes("auth")) {
		return;
	} else if (!state && !currentPage.includes("index")) {
		window.location.href = "/apps/frontend/index.html";
	}
}

pageLoad();

// update state in local storage:
function updateUserInState(newUser) {
	console.log("newUser", newUser);
	const newState = { user: newUser };
	let stringify = JSON.stringify(newState);
	localStorage.setItem(LS_KEY, stringify);
}

// ---> Aquí deberías empezar tu código propio:
