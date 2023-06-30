import express, {Express,Request,Response} from 'express';
import { PrismaClient } from "@prisma/client";
import dotenv from 'dotenv';

import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

dotenv.config();

const app: Express = express();
const port = process.env.PORT;

app.use(express.json());


// primera ruta

// primera ruta
app.get('/', (req: Request, res: Response) => {
  res.send('HOLA!!');
});

app.listen(port, () => {
  console.log(`El servidor se ejecuta en http://localhost:${port}`);
});

// crear Usuarios
app.post("/createUser", async (req: Request,res: Response) => {
  const { name, email, password,dateborn} = req.body;
  const passwordHash = await bcrypt.hash(password, 10);
  const result = await prisma.usuarios.create({
      data: {
        name: name,
        email:email,
        password: passwordHash,
        date_born:dateborn
      },
  }); 
  // Retorna la informacion
  res.json(result)
});

app.get("/users", async (req: Request,res: Response) => {
  const user = await prisma.usuarios.findMany();
  return res.json(user);
});


// crear Playlist
app.post("/createPlaylist", async (req: Request,res: Response) => {
  const { name, useremail} = req.body;
  const result = await prisma.playlist.create({
      data: {
        name: name,
        user: {connect: {email :useremail}},
      },
  });
  res.json(result)    
});








