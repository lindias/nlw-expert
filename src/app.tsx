import { ChangeEvent, useState } from 'react'
import logoImg from './assets/logo-nlw-expert.svg'
import { NewNoteCard } from './components/new-note-card'
import { NoteCard } from './components/note-card'

type Note = {
  id: string
  date: Date
  content: string
}

export function App() {
  const [notes, setNotes] = useState<Note[]>(() => {
    const notesOnStorage = localStorage.getItem('@nlw-expert:notes')

    if (notesOnStorage) {
      return JSON.parse(notesOnStorage)
    }
    return []
  })
  const [searchTerm, setSearchTerm] = useState('')

  function onNoteCreated(content: string) {
    const newNote = {
      id: crypto.randomUUID(),
      date: new Date(),
      content,
    }

    const notesArray = [newNote, ...notes]

    setNotes(notesArray)

    localStorage.setItem('@nlw-expert:notes', JSON.stringify(notesArray))
  }

  function onNoteDeleted(id: string) {
    const notesArray = notes.filter((note) => note.id !== id)

    setNotes(notesArray)

    localStorage.setItem('@nlw-expert:notes', JSON.stringify(notesArray))
  }

  function handleSearchTerm(event: ChangeEvent<HTMLInputElement>) {
    const query = event.target.value

    setSearchTerm(query)
  }

  const filteredNotes =
    searchTerm !== ''
      ? notes.filter((note) => note.content.toLowerCase().includes(searchTerm))
      : notes

  return (
    <div className="mx-auto my-12 max-w-6xl space-y-6 px-5">
      <img src={logoImg} alt="" />

      <form className="w-full">
        <input
          type="text"
          placeholder="Busque em suas notas..."
          className="w-full bg-transparent text-3xl font-semibold tracking-tight outline-none placeholder:text-slate-500"
          onChange={handleSearchTerm}
        />
      </form>

      <div className="h-px bg-slate-700" />

      <div className="grid auto-rows-[250px] grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
        <NewNoteCard onNoteCreated={onNoteCreated} />
        {filteredNotes.map((note) => (
          <NoteCard
            key={note.id}
            id={note.id}
            date={note.date}
            content={note.content}
            onNoteDeleted={onNoteDeleted}
          />
        ))}
      </div>
    </div>
  )
}
