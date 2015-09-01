(function(){

    'use strict';

    if (tinyMCEPopup.dom.events.domLoaded){
        beautify();
    } else {
        tinyMCEPopup.onInit.add(beautify);
    }

    function beautify(){

        var options = {
            source_view: true,
            format: 'raw'
        };
        var content = tinyMCEPopup.editor.getContent(options);

        content = prettydiff({
            source: content,
            lang: 'html',
            mode: 'beautify',
            textpreserve: true,
            wrap: 0
        })[0];

        document.getElementById('htmlSource').value = content;

        // Hide the word wrap checkbox since it is useless while we are beautifying.
        // PrettyDiff supports word wrap, maybe add it to the to-do list?
        hideControls();

    }

    function hideControls(){

        var label = document.querySelector('label[for="wraped"]');
        var input = document.getElementById('wraped');

        label && input && (label.style.display = input.style.display = 'none');

    }

})();