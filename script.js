const storageKey = "codes";
let codes = JSON.parse(localStorage.getItem(storageKey)) || {};

function saveCodes() {
  localStorage.setItem(storageKey, JSON.stringify(codes));
}

function returnToMenu() {
  hideAll();
  document.getElementById("mainMenu").classList.remove("hidden");
}

function hideAll() {
  document.querySelectorAll(".hidden").forEach(el => el.classList.add("hidden"));
  document.getElementById("querySection").classList.add("hidden");
  document.getElementById("addSection").classList.add("hidden");
  document.getElementById("listSection").classList.add("hidden");
}

function showQueryForm() {
  hideAll();
  document.getElementById("querySection").classList.remove("hidden");
  document.getElementById("queryInput").value = "";
  document.getElementById("queryResult").textContent = "";
}

function showAddForm() {
  hideAll();
  document.getElementById("addSection").classList.remove("hidden");
  document.getElementById("addResult").innerHTML = "";
  document.getElementById("addInput").value = "";
}

function showList() {
  hideAll();
  const list = document.getElementById("codeList");
  list.innerHTML = "";
  Object.keys(codes)
    .sort((a, b) => parseFloat(a) - parseFloat(b))
    .forEach(code => {
      const item = document.createElement("li");
      item.textContent = `Code ${code} = ${codes[code]}`;
      list.appendChild(item);
    });
  document.getElementById("listSection").classList.remove("hidden");
}

function queryCode() {
  const code = document.getElementById("queryInput").value.trim();
  const result = codes[code];
  document.getElementById("queryResult").textContent =
    result ? `Code ${code} = ${result}` : `Code ${code} ist nicht vergeben.`;
}

function checkAddCode() {
  const code = document.getElementById("addInput").value.trim();
  const container = document.getElementById("addResult");

  if (codes[code]) {
    container.innerHTML = `
      <p>Code ${code} ist schon mit "${codes[code]}" belegt.</p>
      <p>Möchtest du den Code ändern?</p>
      <button onclick="changeCodePrompt('${code}')">Ja, bitte</button>
      <button onclick="returnToMenu()">Nein, ich nehm ne andre Nummer</button>
    `;
  } else {
    container.innerHTML = `
      <p>Welchen Satz möchtest du für Code ${code} speichern?</p>
      <input type="text" id="newSentence" placeholder="Dein Satz" />
      <button onclick="saveNewCode('${code}')">Speichern</button>
    `;
  }
}

function saveNewCode(code) {
  const sentence = document.getElementById("newSentence").value.trim();
  if (sentence) {
    codes[code] = sentence;
    saveCodes();
    alert(`Code ${code} gespeichert!`);
    returnToMenu();
  }
}

function changeCodePrompt(existingCode) {
  const container = document.getElementById("addResult");
  container.innerHTML = `
    <p>Gib eine neue Zahl für "${codes[existingCode]}" ein:</p>
    <input type="text" id="newCode" placeholder="Neue Zahl" />
    <p>Oder gib einen neuen Satz für Code ${existingCode} ein:</p>
    <input type="text" id="updatedSentence" placeholder="Neuer Satz" />
    <button onclick="handleChange('${existingCode}')">Ändern</button>
  `;
}

function handleChange(oldCode) {
  const newCode = document.getElementById("newCode").value.trim();
  const updatedSentence = document.getElementById("updatedSentence").value.trim();

  if (newCode && !codes[newCode]) {
    codes[newCode] = codes[oldCode];
    delete codes[oldCode];
    saveCodes();
    alert(`Code ${oldCode} verschoben nach ${newCode}.`);
    returnToMenu();
  } else if (updatedSentence) {
    codes[oldCode] = updatedSentence;
    saveCodes();
    alert(`Code ${oldCode} neu belegt.`);
    returnToMenu();
  } else {
    alert("Bitte gib eine gültige neue Zahl ODER einen neuen Satz ein.");
  }
}