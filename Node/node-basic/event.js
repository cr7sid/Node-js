// First we import the events module and then create an event object using EventEmitter(). Then we can create an event using on(),
// and trigger it by using emit(). In node we can use any name for the event.

const events = require("events");
const event = new events.EventEmitter();

/*event.on('click', (n1, n2) => console.log(n1 + n2));
event.emit('click', 5, 6);*/

//We can also trigger one event in another event.

const firstEvent = (a, b) => {
    console.log(a + b);
    event.emit('click2');
}

const secondEvent = () => {
    console.log("Second event triggered!");
    event.emit('click3');
}

const thirdEvent = () => {
    console.log("Third event triggered!");
}

event.on('click', firstEvent);
event.on('click2', secondEvent);
event.on('click3', thirdEvent);
event.emit('click', 5, 6);