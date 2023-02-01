{
    async function main() {
        const response = await fetch('https://api2.kametotv.fr/karmine/events');
        const response2 = await fetch('https://api2.kametotv.fr/karmine/events_results');
        const data2 = await response2.json();
        const data = await response.json();
    }
}