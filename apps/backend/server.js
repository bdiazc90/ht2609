const express = require("express");
const cors = require("cors");
require("dotenv").config();
const { connectDB, disconnectDB } = require("./db");
const UserModel = require("./models/user");

const PORT = process.env.PORT;

const app = express();

app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Conectar a la base de datos al iniciar la app
connectDB();

app.post("/user", async (request, response) => {
	// TODO: Si el correo no existe, crear un nuevo usuario en la DB (Mongo) y devolver el ID.
	const { email, fullname, phone } = request.body;
	const existingUser = await UserModel.findOne({ email });
	let userId;
	if (!existingUser) {
		if (!fullname || !phone) {
			return response.redirect("http://localhost:5500/apps/frontend/index.html?error=Parametros");
		}
		const newUser = new UserModel({
			email,
			fullname,
			phone,
		});
		newUser.save();
		userId = newUser._id;
	} else {
		// TODO: Si existe solamente devolver el ID
		userId = existingUser._id;
	}
	// TODO: Redireccionar al frontend con el token en la URL (no es lo más seguro, pero es un ejemplo)
	response.redirect("http://localhost:5500/apps/frontend/auth.html?id=" + userId);
});

app.post("/skill", async (request, response) => {
	// TODO: Agregar una habilidad a tu propio usuario en la DB (Mongo)
	response.json({ message: "Nuevo skill agregado." });
});

app.get("/user", async (request, response) => {
	// TODO: Obtener tu información de usuario (incluyendo skills) de la DB (Mongo)
	const userId = request.query.id;
	console.log(userId);
	const user = await UserModel.findById(userId);
	if (!user) {
		response.status(400).send("No existe");
	}
	response.json({ data: user, message: "Este es tu usuario." });
});

app.get("/users", async (request, response) => {
	// TODO: Obtener la información de todos los usuarios (incluyendo skills) de la DB (Mongo)
	const users = await UserModel.find({});
	response.json({ data: users, message: "Usuarios y skills." });
});

app.listen(PORT, () => console.log("Listening on PORT", PORT));

// Desconectar cuando la app se cierre (por ejemplo, en casos de interrupción)
process.on("SIGINT", async () => {
	await disconnectDB();
	process.exit(0);
});
