import App from '@/App';
import { shallowMount } from '@vue/test-utils';
import { expect } from 'chai';

describe("App.vue", () => {
    let wrapper;

    beforeEach(() => {
        wrapper = shallowMount(App);
    })

    it('poprawnie renderuje zawartość strony', () => {
        expect(wrapper.html()).to.contain('<th>Items</th>');
        expect(wrapper.html()).to.contain(
            '<input type="text" class="prompt" placeholder="Add item...">'
        );
        expect(wrapper.html()).to.contain(
            '<button type="submit" class="ui button" disabled="">Add</button>'
        );
        expect(wrapper.html()).to.contain(
            '<span class="ui label">Remove all</span>'
        );
    });

    it('powinno ustawić prawidłowo domyślne wartości dla item i items.', () => {
        expect(wrapper.vm.item).to.equal('');
        expect(wrapper.vm.items).to.deep.equal([]);
    });

    it('przycisk "Add" powinien być nieaktywny', () => {
        const addItemButton = wrapper.find(".ui.button");
        expect(addItemButton.element.disabled).to.be.true;
    });

    describe('Użytkownik wypełnia pole do wprowadzania tekstu', () => {
        let inputField;

        beforeEach(async () => {
            inputField = wrapper.find("input");
            inputField.element.value = "Dowolny tekst";
            await inputField.trigger("input");
        });

        it('aplikacja powinna zaktualizować właściwość "text"', () => {
            expect(wrapper.vm.item).to.equal("Dowolny tekst");
        });

        it('aplikacja powinna uaktywnić przycisk "Add", gdy jest wprowadzony tekst do pola tekstowego', () => {
            const addItemButton = wrapper.find(".ui.button");
            expect(addItemButton.element.disabled).to.be.false;
        });
        describe("a następnie czyści pole tekstowe", () => {
            it('przycisk "Add" powinien stać się nieaktywny', async () => {
                const addItemButton = wrapper.find(".ui.button");
                inputField.element.value = "";
                await inputField.trigger("input");
                expect(addItemButton.element.disabled).to.be.true;
            });
        });
    });



})