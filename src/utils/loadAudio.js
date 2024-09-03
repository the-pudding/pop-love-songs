export default function loadAudio(src) {
	return new Promise((resolve, reject) => {
		const request = new XMLHttpRequest();
		request.open("GET", src, true);
		request.responseType = "blob";
		request.onload = function () {
			if (this.status >= 200 && this.status < 300) {
				resolve(true);
			} else {
				reject(new Error("Audio loading failed: " + this.statusText));
			}
		};
		request.send();
	});
}
