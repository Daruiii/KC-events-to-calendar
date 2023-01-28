{
    function main() {
        // get data from https://api2.kametotv.fr/karmine/events and display it
        // in the console
        fetch('https://api2.kametotv.fr/karmine/events')
            .then(response => response.json())
            .then(data => console.log(data))
            .catch(error => console.error(error));
            
    }
    
    main();

}