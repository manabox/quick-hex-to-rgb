new Vue({
    el: '#app',
    data: {
        newColor: '',
        validColor: /^([a-fA-F0-9]{6}|[a-fA-F0-9]{3})$/,
        invalidColor: false,

        // Dafault Color
        lists: [{
            listHex: '00bbdd',
            listRgb: '0, 187, 221'
        }]
    },

    computed: {
        // Getting hex code and convert to RGB value
        rgbValue: function() {
            // Get each letter of hex code
            const hexValue = this.newColor.split('');
            let r,
                g,
                b;

            // 3 digit hex code (repeat same letter to make it as 6 digits)
            if (this.newColor.length === 3) {
                r = parseInt(hexValue[0].toString() + hexValue[0].toString(), 16);
                g = parseInt(hexValue[1].toString() + hexValue[1].toString(), 16);
                b = parseInt(hexValue[2].toString() + hexValue[2].toString(), 16);
            // 6 digt hex code
            } else if (this.newColor.length === 6) {
                r = parseInt(hexValue[0].toString() + hexValue[1].toString(), 16);
                g = parseInt(hexValue[2].toString() + hexValue[3].toString(), 16);
                b = parseInt(hexValue[4].toString() + hexValue[5].toString(), 16);
            }

            // If color code is not valid, show '---'
            if (this.validColor.test(this.newColor) !== true) {
                r = g = b = '---';
            }

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
            // Not empty & valid value
            if (this.newColor !== '' && this.validColor.test(this.newColor) == true) {
                const newList = {
                    // Define new color
                    listHex: this.newColor,
                    listRgb: this.rgbValue
                }
                this.lists.push(newList);
                this.newColor = '';
                this.invalidColor = false;
            } else {
                // Add class and hake a text field
                this.invalidColor = true;
            }
        },
        // Remove .error class when any key except Enter pressed
        removeClass: function(event){
            if (event.key !== 'Enter') {
                this.invalidColor = false;
            }
        }
    }
});


/* CLICK AND COPY
--------------------------------*/
const clipboard = new ClipboardJS('.copy-value');

// Select all .copy-value items
const btns = document.querySelectorAll('.copy-value');

// Remove .tooptip class by mouseout
for(let i=0;i<btns.length;i++){
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
