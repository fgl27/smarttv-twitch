// Adapted from:
// https://developer.tizen.org/community/tip-tech/using-css3-units-support-low-and-high-density-screens

// BodyfontSize is used for px to em calculation used by scroll functions
var BodyfontSize;

function calculateFontSize() {
    // Initial sizes.
    var initialFontSize = 29 + Settings_value.global_font_offset.values[Main_getItemInt('global_font_offset', Settings_value.global_font_offset.defaultValue) - 1],
        initialWidth = 1920,
        initialHeight = 1080,
        doc = document.getElementById('body_container'),
        currentHeight,
        scaleFactor,
        scaledWidth;

    // Get current client/screen height.
    currentHeight = window.innerHeight;

    // Calculate scale factor and scaled font size.
    scaleFactor = currentHeight / initialHeight;
    BodyfontSize = initialFontSize * scaleFactor;

    // Calculate scaled body/divs size.
    scaledWidth = initialWidth * scaleFactor;

    //Set new body width/height recalculated to 16 by 9 and scaled fontSize
    doc.style.width = scaledWidth + 'px';
    doc.style.height = currentHeight + 'px';
    document.body.style.fontSize = BodyfontSize + 'px';
}

//Do the calculation and changes on proper events call
window.addEventListener('resize', calculateFontSizeTizen, false);

function calculateFontSizeTizen() {
    if (!Main_IsNotBrowser) calculateFontSize();
}
