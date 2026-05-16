import { useEffect, useState } from "react";

import {
  createNote,
  getNotes,
  generateSummary,
} from "./api/notes";

function App() {

  // STATES
  const [title, setTitle] = useState("");

  const [content, setContent] = useState("");

  const [notes, setNotes] = useState([]);

  const [allNotes, setAllNotes] = useState([]);

  const [aiResult, setAiResult] = useState("");

  // TOKEN
  const token =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjZhMDgyMGM0NjAwMGFhN2E0NTkxZWQxZCIsImlhdCI6MTc3ODkxODA3OSwiZXhwIjoxNzc5NTIyODc5fQ.91Yzr-JD3vCj0u3DOgKRXyBLZiRbO7zLaFWaJ_XrLc0";

  // FETCH NOTES
  const fetchNotes = async () => {
    try {

      const data = await getNotes(token);

      setNotes(data);

      setAllNotes(data);

    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchNotes();
  }, []);

  // SAVE NOTE
  const handleSave = async () => {
    try {

      await createNote(
        {
          title,
          content,
          tags: ["work"],
        },
        token
      );

      fetchNotes();

      setTitle("");

      setContent("");

      alert("Note Saved Successfully");

    } catch (error) {
      console.log(error);
    }
  };

  // AI SUMMARY
  const handleAISummary = async () => {
    try {

      if (notes.length === 0) {
        return alert("No notes available");
      }

      const latestNote = notes[0];

      const data = await generateSummary(
        latestNote._id,
        token
      );

      setAiResult(data.summary);

    } catch (error) {
      console.log(error);
    }
  };

  // SEARCH NOTES
  const handleSearch = (e) => {

    const value = e.target.value.toLowerCase();

    const filtered = allNotes.filter((note) =>
      note.title.toLowerCase().includes(value)
    );

    setNotes(filtered);
  };

  return (
    <div className="min-h-screen bg-slate-950 text-white flex">

      {/* SIDEBAR */}
      <div className="w-72 bg-slate-900 border-r border-slate-800 p-6">

        <h1 className="text-3xl font-bold text-cyan-400">
          Peblo AI
        </h1>

        <p className="text-slate-400 mt-2">
          Smart Notes Workspace
        </p>

        <button className="mt-8 w-full bg-cyan-500 hover:bg-cyan-600 transition px-4 py-3 rounded-xl font-semibold">
          + New Note
        </button>

        {/* NOTES LIST */}
        <div className="mt-10 space-y-4 overflow-y-auto max-h-[600px]">

          {notes.map((note) => (
            <div
              key={note._id}
              className="bg-slate-800 p-4 rounded-xl cursor-pointer hover:bg-slate-700 transition"
            >
              <h2 className="font-semibold">
                {note.title}
              </h2>

              <p className="text-sm text-slate-400 mt-1">
                {note.content.substring(0, 50)}
              </p>
            </div>
          ))}

        </div>
      </div>

      {/* MAIN CONTENT */}
      <div className="flex-1 p-8 overflow-y-auto">

        {/* TOP BAR */}
        <div className="flex justify-between items-center">

          <div>
            <h1 className="text-4xl font-bold">
              Welcome Back 👋
            </h1>

            <p className="text-slate-400 mt-2">
              Manage your AI-powered notes workspace
            </p>
          </div>

          <input
            type="text"
            placeholder="Search notes..."
            onChange={handleSearch}
            className="bg-slate-800 px-4 py-3 rounded-xl outline-none w-80"
          />
        </div>

        {/* DASHBOARD CARDS */}
        <div className="grid grid-cols-4 gap-6 mt-10">

          <div className="bg-slate-900 p-6 rounded-2xl border border-slate-800">
            <h2 className="text-slate-400">
              Total Notes
            </h2>

            <p className="text-4xl font-bold mt-3">
              {notes.length}
            </p>
          </div>

          <div className="bg-slate-900 p-6 rounded-2xl border border-slate-800">
            <h2 className="text-slate-400">
              AI Summaries
            </h2>

            <p className="text-4xl font-bold mt-3 text-cyan-400">
              {aiResult ? 1 : 0}
            </p>
          </div>

          <div className="bg-slate-900 p-6 rounded-2xl border border-slate-800">
            <h2 className="text-slate-400">
              Most Used Tag
            </h2>

            <p className="text-3xl font-bold mt-3">
              Work
            </p>
          </div>

          <div className="bg-slate-900 p-6 rounded-2xl border border-slate-800">
            <h2 className="text-slate-400">
              Shared Notes
            </h2>

            <p className="text-4xl font-bold mt-3 text-green-400">
              4
            </p>
          </div>

        </div>

        {/* NOTE EDITOR */}
        <div className="mt-10 bg-slate-900 border border-slate-800 rounded-2xl p-6">

          <input
            type="text"
            placeholder="Note Title"
            value={title}
            onChange={(e) =>
              setTitle(e.target.value)
            }
            className="w-full bg-transparent text-3xl font-bold outline-none"
          />

          <textarea
            placeholder="Start writing your notes..."
            value={content}
            onChange={(e) =>
              setContent(e.target.value)
            }
            className="w-full h-64 bg-transparent mt-6 outline-none text-slate-300 resize-none"
          ></textarea>

          <div className="flex gap-4 mt-6">

            <button
              onClick={handleSave}
              className="bg-cyan-500 hover:bg-cyan-600 px-6 py-3 rounded-xl font-semibold"
            >
              Save Note
            </button>

            <button
              onClick={handleAISummary}
              className="bg-purple-500 hover:bg-purple-600 px-6 py-3 rounded-xl font-semibold"
            >
              Generate AI Summary
            </button>

          </div>
        </div>

        {/* AI RESULT */}
        {aiResult && (
          <div className="mt-8 bg-slate-900 border border-slate-800 rounded-2xl p-6">

            <h2 className="text-2xl font-bold text-cyan-400 mb-4">
              AI Generated Summary
            </h2>

            <pre className="whitespace-pre-wrap text-slate-300">
              {aiResult}
            </pre>

          </div>
        )}

      </div>
    </div>
  );
}

export default App;