const ButtonRow = {
    template: `
    <div>
    <button name="przycisk-bluza" value="Bluza z kapturem"
        @click="onButtonClick" class="ui button">Bluza z kapturem</button>
    <button name="przycisk-tshirt" value="T-shirt"
        @click="onButtonClick" class="ui primary button">T-shirt</button>
    <button name="przycisk-czapka" value="Czapka" 
        @click="onButtonClick" class="ui button">Czapka</button>
    <button name="przycisk-kurtka" value="Kurtka"
        @click="onButtonClick" class="ui button">Kurtka</button>
    </div>`,

    methods: {
        onButtonClick(evt) {
            const button = evt.target;
            console.log(`Użytkownik kliknął ${button.name}:  ${button.value}`);
        },
    }
};

Vue.createApp({
    components: {
        "button-row": ButtonRow,
    },
}).mount('#Button_app');
