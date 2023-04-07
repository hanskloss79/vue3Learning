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

        // testowanie wysyłania danych z formularza - dodanie Item do listy
        describe("a następnie przesyła formularz", () => {
            let addItemButton;
            let itemList;
            let inputField;

            beforeEach(async () => {
                addItemButton = wrapper.find(".ui.button");
                itemList = wrapper.find(".item-list");
                inputField = wrapper.find("input");

                wrapper.setData({ item: "New Item" });
                await addItemButton.trigger("submit");
            });
            it('aplikacja powinna dodać nowy element do tablicy "items" i na stronę', () => {
                expect(wrapper.vm.items).to.contain("New Item");
                expect(itemList.html()).to.contain("<td>New Item</td>");
            })
            it('aplikacja powinna wyczyścić pole tekstowe i ustawić item na pusty string', () => {
                expect(wrapper.vm.item).to.equal("");
                expect(inputField.element.value).to.equal("");
            })
            it('przycisk "Add" powinien stać się nieaktywny', async () => {
                expect(addItemButton.element.disabled).to.be.true;
            });
        });

    });

    describe('Użytkownik kliknie etykietę "Remove all"', () => {
        let itemList;
        let removeItemsLabel;

        beforeEach(() => {
            itemList = wrapper.find(".item-list");
            removeItemsLabel = wrapper.find(".ui.label");

            wrapper.setData({ items: ["Item 1", "Item 2", "Item 3" ]});
        });

        it('aplikacja powinna wyczyścić listę i tablicę "items"', async () => {
            await removeItemsLabel.trigger('click');

            expect(wrapper.vm.items).to.deep.equal([]);
            expect(itemList.html()).to.not.contain('<td>Item 1</td>');
            expect(itemList.html()).to.not.contain('<td>Item 2</td>');
            expect(itemList.html()).to.not.contain('<td>Item 3</td>');
        });
    });

})