const noteForm = document.getElementById('noteForm');
const titleInput = document.getElementById('titleInput');
const contentInput = document.getElementById('contentInput');
const tagsInput = document.getElementById('tagsInput');
const notesContainer = document.getElementById('notesContainer');
const quoteBanner = document.getElementById('quoteBanner');
const searchInput = document.getElementById('searchInput');

let notes = JSON.parse(localStorage.getItem('notes')) || [];

function saveNotes() {
  localStorage.setItem('notes', JSON.stringify(notes));
}

function renderNotes(filter = '') {
  notesContainer.innerHTML = '';
  const filteredNotes = notes.filter(note =>
    note.title.toLowerCase().includes(filter.toLowerCase()) ||
    note.content.toLowerCase().includes(filter.toLowerCase()) ||
    note.tags.some(tag => tag.toLowerCase().includes(filter.toLowerCase()))
  );
  filteredNotes.forEach((note, index) => {
    const card = document.createElement('div');
    card.className = 'note-card';

    card.innerHTML = `
      <h3>${note.title}</h3>
      <p>${note.content}</p>
      <div class="tags">${note.tags.map(tag => `<span class="tag" onclick="filterByTag('${tag}')">${tag}</span>`).join('')}</div>
      <button class="delete-btn" onclick="deleteNote(${index})">🗑</button>
    `;
    notesContainer.appendChild(card);
  });
}

function deleteNote(index) {
  notes.splice(index, 1);
  saveNotes();
  renderNotes(searchInput.value);
}

function filterByTag(tag) {
  searchInput.value = tag;
  renderNotes(tag);
}

function fetchQuote() {
  const quotes = [
    { text: "Push yourself, because no one else is going to do it for you.", author: "Unknown" },
    { text: "Believe you can and you're halfway there.", author: "Theodore Roosevelt" },
    { text: "Dream it. Wish it. Do it.", author: "Unknown" },
    { text: "Your limitation—it's only your imagination.", author: "Unknown" },
  ];
  const quote = quotes[Math.floor(Math.random() * quotes.length)];
  quoteBanner.textContent = `"${quote.text}" — ${quote.author}`;
}

noteForm.addEventListener('submit', (e) => {
  e.preventDefault();
  const title = titleInput.value.trim();
  const content = contentInput.value.trim();
  const tags = tagsInput.value.split(',').map(t => t.trim()).filter(t => t !== '');

  notes.push({ title, content, tags });
  saveNotes();
  renderNotes(searchInput.value);
  fetchQuote();

  noteForm.reset();
});

searchInput.addEventListener('input', () => {
  renderNotes(searchInput.value);
});

renderNotes();
