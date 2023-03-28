const APIService = {
    async fetchData() {
        let nextPage = 'https://swapi.dev/api/starships';
        let items = [];
        while (nextPage) {
            try {
                const response = await fetch(nextPage);
                const raw = await response.json();
                console.log('response: ', raw);

                const { results, next } = raw;
                nextPage = next;
                items = [...items, ...results];
            } catch (error) {
                console.log("error", error);
            }
        }
        return items
    }

}
export default APIService;