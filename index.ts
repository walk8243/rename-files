import { rename, readdir } from "fs";
import { resolve, parse } from 'path';

const targetDir = resolve(__dirname, process.argv[2]);
const numberFormat = new Intl.NumberFormat('ja-JP', { minimumIntegerDigits: 5, useGrouping: false });

readdir(`${targetDir}`, { withFileTypes: true }, (err, files) => {
	if(err) {
		console.error(err);
		return;
	}
	const filepaths = files.filter((file) => file.isFile()).map((file) => {
		const fullpath = resolve(targetDir, file.name);
		return { ...parse(fullpath), path: fullpath };
	});
	filepaths.forEach((filepath, index) => {
		rename(filepath.path, resolve(filepath.dir, `${numberFormat.format(index)}${filepath.ext}`), (err) => {
			if(err) {
				console.error(err);
				return;
			}
		});
	});
});
