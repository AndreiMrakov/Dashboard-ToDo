window.onload = () => {
    //----------declaration vars  -----------------
    let container = document.getElementById('board');
    let deltaX, deltaY;
    let ID_COUNTER = 0;
    let notesArchive = [];

    //----------adding new note func to the notes archive  -----------------
    let addNote = () => {
        notesArchive.push({
            id: ID_COUNTER++,
            posX: 100,
            posY: 100,
            textValue: 'Enter the text...',
        });
        showNotes(notesArchive);
    };

    //----------redrawing notes func in main container -----------------
    let showNotes = (array) => {
        container.innerHTML = "";
        array.forEach(arrayItem => {
            createNote(arrayItem);
        });
    };

    //----------creating note func with all listeners-----------------
    let createNote = (obj) => {
        //-----------------------------creating func that will create new tag with classname--------------
        let createNodeElem = (tagName, ...tagClassNames) => {
            let newElem = document.createElement(tagName);
            [...tagClassNames].forEach((tagClassName) => {
                newElem.classList.add(tagClassName);
            });
            return newElem;
        };

        //-----------------------------create parts of note block--------------------------------
        let itemContainer = createNodeElem('div', 'note-container');
        let itemText = createNodeElem('div', 'note-text');
        let itemTextArea = createNodeElem('textarea', 'note-textarea');

        //-----------------------------put note container to coordinate from note archive-----------------
        itemContainer.style.cssText = `left: ${obj.posX}px; top: ${obj.posY}px`;
        itemText.textContent = obj.textValue;

        //-----------------------------constructing new note from simple blocks---------------------------
        itemContainer.appendChild(itemText);
        itemContainer.appendChild(itemTextArea);
        container.appendChild(itemContainer);

        //-----------------------------add listeners to each note-------------------------------------------------------

        //-------------------change each note position when drag and drop it!!!!!-------------------------------
        let notePositionChanger = (e) => {
            obj.posX = e.pageX - deltaX;
			obj.posY = e.pageY - deltaY;
            itemContainer.style.cssText = `left: ${obj.posX}px; top: ${obj.posY}px`;
        };
        //-------------------change each note value -------------------------------
        let noteValueChanger = (e) => {
            obj.textValue = e.target.value;
        };
        //-------------------change each note textarea visibility !!!!!!!!!!!!!!-------------------------------
        let noteStatusChanger = () => {
            if (itemTextArea.classList.contains('active')) {
                itemText.textContent = obj.textValue;
                itemTextArea.value = '';
            } else {
                itemTextArea.value = obj.textValue;
                itemText.textContent = '';
            }
            itemTextArea.classList.toggle('active');
        };
        //-------------------change each note textarea visibility -------------------------------
        itemTextArea.addEventListener('input', noteValueChanger);
        itemTextArea.addEventListener('keydown', e => {
            if (e.keyCode === 13 && e.ctrlKey) {
                itemTextArea.value += '\n';
            } else if (e.keyCode === 13) {
                noteStatusChanger();
            }
        });
        itemContainer.addEventListener('dblclick', noteStatusChanger);
        //----------change each note coordinate when press on right mouse button -----------------
        itemText.addEventListener('mousedown', (e) => {
            deltaX = e.pageX - itemContainer.offsetLeft;
            deltaY = e.pageY - itemContainer.offsetTop;
            window.addEventListener('mousemove', notePositionChanger);
        });
        itemText.addEventListener('mouseup', () => {
            window.removeEventListener('mousemove', notePositionChanger);
        });
    };

    //----------add listener to add new note button -----------------
    document.getElementById('new-note').addEventListener('click', addNote);
};