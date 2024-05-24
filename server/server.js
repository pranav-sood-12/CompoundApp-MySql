import {app} from "./app.js"
import { config } from 'dotenv';
config({
    path: './data/config.env',
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
