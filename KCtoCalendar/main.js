class KCtoCalendar {
    constructor() {
        this._events = [];
        this._results = [];
    }
    main() {
        // get data from https://api2.kametotv.fr/karmine/events and display it
        // in the console
        const response = Promise.resolve(fetch('https://api2.kametotv.fr/karmine/events'));
        response.then((data) => {
            data.json().then((data) => {
            console.log(data);
            });
        });
        const response2 = Promise.resolve(fetch('https://api2.kametotv.fr/karmine/events_results'));
        response2.then((data) => {
            data.json().then((data2) => {
                console.log(data2);
            });
        });
        this._events = data;
        this._results = data2;
    }

}