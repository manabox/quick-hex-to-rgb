new Vue({
    el: '#app',
    data: {
        newColor: '',

        // Dafault Color
        lists: [{
            listHex: '00bbdd',
            listRgb: '0, 187, 221'
        }]
    },

    computed: {
        // Getting hex code and convert to RGB value
        rgbValue: function() {
            const hexcolor = '0x' + this.newColor;
            const r = String(Math.floor(hexcolor / 0x010000));
            const g = String(Math.floor((hexcolor % 0x010000) / 0x000100));
            const b = String(hexcolor % 0x000100);
            return r + ', ' + g + ', ' + b;
        },

        // Show newer color to top
        reverseItems() {
            return this.lists.slice().reverse();
        }
    },

    methods: {
        // Adding new row
        addColor: function() {
            if (this.newColor !== '') {
                const newList = {
                    // Define new color
                    listHex: this.newColor,
                    listRgb: this.rgbValue
                }
                this.lists.push(newList);
                this.newColor = '';
            }
        }
    }
});


// Click and copy
new ClipboardJS('.copy-value');
