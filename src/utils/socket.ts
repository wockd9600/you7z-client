import { io, Socket } from "socket.io-client";
// import EventManager from "./socketEventManager";

enum SocketState {
    DISCONNECT,
    CONNECT,
    WAITTING,
}

class SocketService {
    private static instance: Socket | null = null;
    // private static eventManager: EventManager | null = null;
    private static state: SocketState = SocketState.WAITTING;

    public static getInstance(roomCode: string): Socket {
        if (this.instance) return this.instance;

        const URL = process.env.REACT_APP_SERVER;
        this.instance = io(`${URL}`, {
            transports: ["websocket", "polling", "flashsocket"],
            reconnection: true,
            query: {
                roomCode,
            },
        });

        this.registerEvents(this.instance);

        // this.eventManager = new EventManager();
        return this.instance;
    }

    public static getState(): SocketState {
        return this.state;
    }

    // public static registerEvents(events: string[]) {
    // if (!this.eventManager || !this.instance) return;
    // this.eventManager.registerEvents(this.instance, events);
    // }

    // public static unregisterEvents(events: string[]) {
    // if (!this.eventManager || !this.instance) return;
    // this.eventManager.unregisterEvents(this.instance, events);
    // }

    public static socketEmit(name: string, data?: any) {
        if (this.instance) {
            const token = localStorage.getItem("access_token");
            this.instance.emit(name, { token, data });
        }
    }

    public static clearInstance() {
        if (this.instance) {
            this.instance.disconnect();
            this.instance = null;
        }
    }

    // socket event
    private static registerEvents(socket: Socket) {
        socket.on("connect", () => {
            this.state = SocketState.CONNECT;
            this.socketEmit("change user status");
            // console.log("Socket connected");
        });

        socket.on("disconnect", () => {
            this.state = SocketState.DISCONNECT;
            // console.log("Socket disconnected");
        });

        // socket.onAny((eventName, ...args) => {
        // console.log(`Received event: ${eventName}`, args);
        // 여기서 모든 이벤트를 처리할 수 있습니다.
        // });

        socket.on("reconnect_attempt", () => {
            this.state = SocketState.WAITTING;
            console.log("reconnect attempt");
        });

        // socket.on("relogin", () => reLogin());
    }
}

export default SocketService;
