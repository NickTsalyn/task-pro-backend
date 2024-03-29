import app from "./app.js";

import mongoose from "mongoose";

const { DB_HOST, PORT = 3232 } = process.env;

mongoose
	.connect(DB_HOST)
	.then(() => {
		app.listen(PORT, () => {
			console.log(`  Server succesfully running on ${PORT} Port`);
		});
	})
	.catch((error) => {
		console.log(error.message);
		process.exit(1);
	});
