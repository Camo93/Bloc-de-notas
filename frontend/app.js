document.addEventListener("DOMContentLoaded", () => {
    const API_URL = 'http://localhost:4000/api/notas';


    // Elementos del DOM
    const newNoteBtn = document.getElementById("newNoteBtn");
    const viewNotesBtn = document.getElementById("viewNotesBtn");
    const noteFormContainer = document.getElementById("noteFormContainer");
    const notesContainer = document.getElementById("notesContainer");
    const cancelBtn = document.getElementById("cancelBtn");
    const noteForm = document.getElementById("noteForm");
    const tituloInput = document.getElementById("title");
    const contenidoInput = document.getElementById("content");

    // Variable de estado para edición
    let editingNoteId = null;

    // ---------- Mostrar/ocultar formularios ----------
    newNoteBtn.addEventListener("click", () => {
        noteFormContainer.style.display = "block";
        notesContainer.style.display = "none";
        editingNoteId = null;
        noteForm.reset();
    });

    viewNotesBtn.addEventListener("click", () => {
        noteFormContainer.style.display = "none";
        notesContainer.style.display = "block";
    });

    cancelBtn.addEventListener("click", () => {
        noteFormContainer.style.display = "none";
        editingNoteId = null;
        noteForm.reset();
    });

    // ---------- Listar notas ----------
    async function fetchNotes() {
        try {
            const res = await fetch(API_URL);
            const notes = await res.json();
            notesContainer.innerHTML = "";

            notes.forEach(note => {
                const noteDiv = document.createElement("div");
                noteDiv.classList.add("note");
                noteDiv.innerHTML = `
                    <h3>${note.titulo}</h3>
                    <p>${note.contenido}</p>
                    <button onclick="deleteNote('${note._id}')">Borrar</button>
                    <button onclick="showEditForm('${note._id}', '${note.titulo}', '${note.contenido}')">Editar</button>
                `;
                notesContainer.appendChild(noteDiv);
            });
        } catch (err) {
            console.error("Error al obtener notas:", err);
        }
    }

    // ---------- Crear o editar nota ----------
    noteForm.addEventListener("submit", async (e) => {
        e.preventDefault();
        console.log("Submit clickeado");  // Log para depuración
        console.log("Titulo:", tituloInput.value);
        console.log("Contenido:", contenidoInput.value);

        const payload = {
            titulo: tituloInput.value,
            contenido: contenidoInput.value
        };

        try {
            const res = await fetch(
                editingNoteId ? `${API_URL}/${editingNoteId}` : API_URL,
                {
                    method: editingNoteId ? "PUT" : "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(payload)
                }
            );
            console.log("Respuesta del backend:", res);

            editingNoteId = null;
            noteForm.reset();
            noteFormContainer.style.display = "none";
            notesContainer.style.display = "block";
            fetchNotes();
        } catch (err) {
            console.error("Error al guardar nota:", err);
        }
    });

    // ---------- Borrar nota ----------
    window.deleteNote = async function(id) {
        if (confirm("¿Seguro que quieres borrar esta nota?")) {
            try {
                await fetch(`${API_URL}/${id}`, { method: "DELETE" });
                fetchNotes();
            } catch (err) {
                console.error("Error al borrar nota:", err);
            }
        }
    };

    // ---------- Preparar edición ----------
    window.showEditForm = function(id, titulo, contenido) {
        noteFormContainer.style.display = "block";
        notesContainer.style.display = "none";
        tituloInput.value = titulo;
        contenidoInput.value = contenido;
        editingNoteId = id;
    };

    // ---------- Inicializar lista ----------
    fetchNotes();
});
