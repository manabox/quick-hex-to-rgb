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


/* CLICK AND COPY
--------------------------------*/
var clipboard = new ClipboardJS('.copy-value');

// Select all .copy-value items
var btns = document.querySelectorAll('.copy-value');

// Remove .tooptip class by mouseout
for(var i=0;i<btns.length;i++){
    btns[i].addEventListener('mouseleave',clearTooltip);
}
function clearTooltip(e){
    e.currentTarget.setAttribute('class','copy-value');
}

// Add .tooltip class when it's clicked
function showTooltip(elem){
    elem.setAttribute('class','copy-value tooltip');
}

clipboard.on('success', function(e) {
    showTooltip(e.trigger);

    // Clear selecting text
    e.clearSelection();
});
