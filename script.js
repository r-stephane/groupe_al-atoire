const form = document.getElementById('groupe-form');
const regenBtn = document.getElementById('regen-btn');
const resultatsDiv = document.getElementById('resultats');

let participantsMemo = [];
let groupesMemo = 0;

form.addEventListener('submit', function (e) {
  e.preventDefault();
  const participantsText = document.getElementById('participants').value.trim();
  const nombreGroupes = parseInt(document.getElementById('nombre-groupes').value);

  if (!participantsText ||  isNaN(nombreGroupes) || nombreGroupes <= 0) {
  alert("Veuillez remplir correctement les champs.");
  return;
}

const participants = participantsText
  .split('\n')
  .map(nom => nom.trim())
  .filter(nom => nom !== "");
if (participants.length < nombreGroupes) {
  alert("Il y a moins de participants que de groupes !");
  return;
}

// Mémoriser pour re-génération
participantsMemo = [...participants];
groupesMemo = nombreGroupes;

afficherGroupes(participants, nombreGroupes);
regenBtn.style.display = 'block';
});

regenBtn.addEventListener('click', () => {
  if (participantsMemo.length && groupesMemo) {
    afficherGroupes([...participantsMemo], groupesMemo);
  }
});

function afficherGroupes(participants, nombreGroupes) {
  // Vider l'affichage précédent
  resultatsDiv.innerHTML = "";

  // Mélange aléatoire
  for (let i = participants.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [participants[i], participants[j]] = [participants[j], participants[i]];
  }

  // Création des groupes
  const groupes = Array.from({ length: nombreGroupes }, () => []);
  participants.forEach((nom, i) => {
    groupes[i % nombreGroupes].push(nom);
  });

  // Affichage
  groupes.forEach((groupe, index) => {
    const div = document.createElement('div');
    div.className = 'groupe';

    const titre = document.createElement('h3');
    titre.textContent =` Groupe ${ index + 1 }`;
    div.appendChild(titre);

    const liste = document.createElement('ul');
    groupe.forEach(participant => {
      const li = document.createElement('li');
      li.textContent = participant;
      liste.appendChild(li);
    });

    div.appendChild(liste);
    resultatsDiv.appendChild(div);
  });
}
