(function(){

    'use strict';

    if (typeof window.prettydiff !== 'undefined'){
        setup();
    } else {
        var interval = setInterval(function(){
            if (typeof window.prettydiff !== 'undefined'){
                clearInterval(interval);
                setup();
            }
        }, 500);
    }

    function isAce(){
        return typeof ace !== 'undefined';
    }

    function setup(){

        if (tinyMCEPopup.dom.events.domLoaded){
            run();
        } else {
            tinyMCEPopup.onInit.add(function(){
                run();
            });
        }

    }

    function run(){

        beautify();
        hideCurrentControls();
        addCustomControls();

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

        if (isAce()){
            var editor = document.querySelector('.ace_editor');
            var session = editor && ace.edit(editor.id);
            session && session.setValue(content);
        }

        document.getElementById('htmlSource').value = content;

    }

    function hideCurrentControls(){

        var label = document.querySelector('label[for="wraped"]');
        var input = document.getElementById('wraped');

        label && input && (label.style.display = input.style.display = 'none');

    }

    function addCustomControls(){

        var input = document.getElementById('insert');

        if (input && document.getElementById('cmd-ace-prettydiff') === null){
            var button = document.createElement('button');
            button.className = 'updateButton';
            button.id = 'cmd-ace-prettydiff';
            button.style.fontSize = '80%';
            button.style.float = 'none';
            button.textContent = 'Beautify';
            button.addEventListener('click', onClick, false);
            input.parentNode.insertBefore(button, input);
        }

    }

    function onClick(event){

        event.preventDefault();
        beautify();

    }

})();