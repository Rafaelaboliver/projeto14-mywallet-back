import express from 'express';
import cors from 'cors'
import authRouter from './routes/authRoutes.js';
import walletRoutes from './routes/walletRoutes.js';
//servidor settings
const app = express();
app.use(cors());
app.use(express.json());

app.use([authRouter])
app.use([walletRoutes])

const PORT = 5000;
app.listen(PORT, () => console.log(`Servidor listening on port ${PORT}`));
