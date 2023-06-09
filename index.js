import { express, dotenv, cors, SocketIOServer } from './dependencies.js';
import userRoutes from './routes/userRoutes.js';
import dashboardRoutes from './routes/dashboardRouters.js';
import fireStoreDB from './firebase-config.js';

dotenv.config();
let PORT = 5050
const SERVER_IP = '192.168.10.17'; //Change IP
const app = express();
app.use(cors());


    //Server
    const httpServer = app.listen(PORT, () => { //Start the server
        console.log(`Server is running, host http://${SERVER_IP}:${PORT}/`);
    })

    const io = new SocketIOServer(httpServer, { path: '/real-time', cors:{origin: '*', methods: ['GET', 'POST']} }); //WebSocket Server initialization

//To let communication between localhost and ngrok
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
    next();
});

app.use(cors({origin: '*'}));


const STATIC_APP = express.static('./static/client-app');
const STATIC_DASHBOARD = express.static('./static/dashboard-app');

app.use(express.json());
app.use(cors({ origin: "*" }));
app.use('/mobile-app', STATIC_APP);
app.use('/dashboard-app', STATIC_DASHBOARD);
app.use('/user', userRoutes);
app.use('/dashboard', dashboardRoutes);

io.on('connection', (socket) => {
  console.log(`Client ${socket.id} connected.`);

  // Custom event
  socket.on('customEvent', (data) => {
    console.log('Received custom event:', data);
  });

  // Disconnect event
  socket.on('disconnect', () => {
    console.log(`Client ${socket.id} disconnect.`);
  });
});

fireStoreDB.updateRealTime('Leads', () => {
  io.emit('real-time-update', { state: 'Using onSnapshot' })
});

export { io };