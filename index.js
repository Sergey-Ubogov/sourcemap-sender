const {sendFiles, getAllFilesWithExtInFolder} = require('ftp-client-wrapper');
const args = require("args-parser")(process.argv);

class SourcemapSender {
	constructor(configPath) {
		let {destinationHost, sourcemapsFolder, assetsmapFolder, projectName} = require(configPath);
		this.sourcemapsFolder = args.sourcemapsFolder || sourcemapsFolder;
		this.assetsmapFolder = args.assetsmapFolder || assetsmapFolder;
		this.destinationHost = args.destinationHost || destinationHost;
		this.projectName = args.projectName || projectName || 'default';
		this.projectVersion = args.version || new Date().toLocaleString().replace(/:/g, '-').replace(/ /g, '_');


	}

	getAllFiles() {

		const allSourcemaps = getAllFilesWithExtInFolder(this.sourcemapsFolder, 'map');
		const allAssetsmaps = getAllFilesWithExtInFolder(this.assetsmapFolder, 'json');

		return allSourcemaps.concat(allAssetsmaps);
	}

	send() {
		const allFiles = this.getAllFiles();
		sendFiles(allFiles, this.destinationHost, this.projectName, this.projectVersion);
	}
}

module.exports = SourcemapSender;
