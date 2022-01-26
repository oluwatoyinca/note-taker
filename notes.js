const fs = require('fs')
const chalk = require('chalk')

const saveNotes = (notes) => {
    const dataJSON = JSON.stringify(notes)

    fs.writeFileSync('notes.json', dataJSON)
}

const loadNotes = () => {
    try {
        const dataJSON = fs.readFileSync('notes.json')
        return JSON.parse(dataJSON)
    }
    catch (e) {
        return []
    }
}

const getNotes = () => 'Your Notes...'

const addNote = (title, body) => {
    const notes = loadNotes()

    // const duplicateNotes = notes.filter((note) => note.title === title)
    const duplicateNote = notes.find((note) => note.title === title)

    // if (duplicateNotes.length === 0) {
    if (!duplicateNote) {
        notes.push({
            title: title,
            body: body
        })
    
        saveNotes(notes)

        console.log(chalk.green.inverse.bold('New note added!'))
    }
    else {
        console.log(chalk.red.inverse.bold('Duplicate note. Not added!'))
    }
}

const removeNote = (title, body) => {
    const notes = loadNotes()

    const keepNotes = notes.filter((note) => note.title !== title)

    // if (keepNotes.length > 0) {
    //     saveNotes(keepNotes)

    //     console.log('Note '+ title +' removed!')
    // }

    if (notes.length > keepNotes.length) {
        saveNotes(keepNotes)

        console.log(chalk.green.inverse.bold('Note '+ title +' removed!'))
    }
    else {
        console.log(chalk.red.inverse.bold('Note '+ title +' not found!'))
    }
}

const listNotes = (title) => {
    const notes = loadNotes()

    console.log(chalk.blue.bold('Your Notes:'))
    notes.forEach((note) => console.log(note.title))
}

const readNote = (title) => {
    const notes = loadNotes()
    const toRead = notes.find((note) => note.title === title)

    if (toRead) {
        console.log(chalk.blue.bold(toRead.title) + ":")
        console.log(toRead.body)
    }
    else{
        console.log(chalk.red.inverse.bold('Note '+ title +' not found!'))
    }
}

module.exports = {
    getNotes: getNotes,
    addNote: addNote,
    removeNote: removeNote,
    listNotes: listNotes,
    readNote: readNote
}