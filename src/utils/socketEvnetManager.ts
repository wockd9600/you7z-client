// import { Socket } from "socket.io-client";

// class EventManager {
//     private eventList: { [key: string]: (data: any) => void } = {
//         customEvent1: (data: any) => {
//             console.log("Custom Event 1:", data);
//         },
//         customEvent2: (data: any) => {
//             console.log("Custom Event 2:", data);
//         },
//         // 추가 이벤트 핸들러들...
//     };

//     public registerEvents(socket: Socket, events: string[]) {
//         for (const eventName of events) {
//             const handler = this.eventList[eventName];
//             if (handler) {
//                 socket.on(eventName, handler);
//             }
//         }
//     }

//     public unregisterEvents(socket: Socket, events: string[]) {
//         for (const eventName of events) {
//             socket.off(eventName);
//         }
//     }
// }

// export default EventManager;
export {};
