// read-csv-app.js
// use module csv-parser

const csv = require("csv-parser");
const fs = require("node:fs");

// Read data.csv and write the file to the console
// fs.createReadStream("data/data.csv")
// 	.pipe(csv())
// 	.on("data", (row) => {
// 		console.log(row);
// 	})
// 	.on("end", () => {
// 		console.log("done parsing the file");
// 	});

// Parse languages.csv file, return only people who speak a certain language
// const language = process.argv[2];
// let count = 0;
// fs.createReadStream("data/languages.csv")
// 	.pipe(csv())
// 	.on("data", (row) => {
// 		if (row.language.toLowerCase() === language.toLowerCase()) {
// 			count++;
// 		}
// 	})
// 	.on("end", () => {
// 		console.log(
// 			`The amount of ${language} speaking people is ${count}\nDone parsing the file`
// 		);
// 	});

// Write to csv file
// const createCsvWriter = require("csv-writer").createObjectCsvWriter;
// const csvWriter = createCsvWriter({
// 	path: "./data/student.csv",
// 	header: [
// 		{ id: "name", title: "First" },
// 		{ id: "age", title: "Age" },
// 	],
// 	append: false,
// });

// const students = [
// 	{ name: "Blaine", age: "294" },
// 	{ name: "Brianna", age: "29" },
// ];
// csvWriter.writeRecords(students).then(() => console.log("...DONE"));

const rl = require("readline");
const { stdin: input, stdout: output } = require("process");

const userInput = rl.createInterface({ input, output });

function getCarData(usrInput) {
	let count = 0;
	fs.createReadStream("data/usedCars.csv")
		.pipe(csv())
		.on("data", (row) => {
			if (row.make.toLowerCase() === usrInput) {
				count++;
			}
		})
		.on("end", () => {
			console.log(`Number of matched cars: ${count}`);
			// resolve(count);
		});
}

function game() {
	userInput.question(
		"Enter a car by Make to find the number available: ",
		(usrInput) => {
			if (usrInput.toLowerCase() === "exit") {
				console.log("exiting game...");
				userInput.close();
			} else {
				console.log(`You have entered ${usrInput}`);
				usrInput = usrInput.trim().toLowerCase();
				getCarData(usrInput);
				// console.log(`Number of matched cars ${data}`);
				game();
			}
		}
	);
}

game();
