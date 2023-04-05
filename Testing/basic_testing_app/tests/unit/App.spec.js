import App from "@/App";
import { expect } from "chai";


describe('App.vue', () => {
    it('powinno uruchomić ten prosty test', () => {
        expect('Prosty' + ' test!').to.equal('Prosty test!');
    })
});

describe('App.vue', () => {
    it('powinno ustawić prawidłowo domyślne dane.', () => {
        const initialData = App.data();
        expect(initialData.item).to.equal('');
        expect(initialData.items).to.deep.equal([]);
    });
});

