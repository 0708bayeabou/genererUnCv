/* **** ANIMATION TEXTE **** */
const text = "Bienvenue sur  MonCvPro !"; // Le texte à afficher
const baliseH1 = document.getElementById("animated-text");

if (baliseH1) {
  let index = 0;

  function typeLetterByLetter() {
    if (text.substring(index, index + 4) === "<br>") {
      baliseH1.innerHTML += "<br>";
      index += 4;
    } else {
      baliseH1.innerHTML += text.charAt(index);
      index++;
    }

    if (index < text.length) {
      setTimeout(typeLetterByLetter, 100);
    }
  }

  typeLetterByLetter();
}

// GESTION DES liens ACTIFS 
document.addEventListener('DOMContentLoaded', function () {
  const menuLinks = document.querySelectorAll('.menu-links ul li a');

  menuLinks.forEach(link => {
    link.addEventListener('click', function (e) {
      // Empêcher le comportement par défaut pour les liens #
      if (this.getAttribute('href') === '#') {
        e.preventDefault();
      }

      // Retirer la classe active de tous les liens
      menuLinks.forEach(l => l.classList.remove('active'));

      // Ajouter la classe active au lien cliqué
      this.classList.add('active');
    });
  });
});

// recuperer les inf
document.addEventListener("DOMContentLoaded", function () {

  const form = document.getElementById("form");

  form.addEventListener("submit", async function (e) {

    e.preventDefault();

    const nom = document.getElementById("nom").value;
    const prenom = document.getElementById("prenom").value;
    const email = document.getElementById("email").value;
    const tel = document.getElementById("tel").value;

    const message = document.getElementById("message");

    function emailvalide(email) {
      const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      return regex.test(email);
    }

    function telValide(telephone) {
      return telephone.length === 9;
    }

    // Vérification email
    if (!emailvalide(email)) {
      message.textContent = "Email invalide";
      message.style.color = "red";
      return;
    }

    // Vérification téléphone
    if (!telValide(tel)) {
      message.textContent = "Numéro incorrect";
      message.style.color = "red";
      return;
    }

    message.textContent = "Email et téléphone valides";
    message.style.color = "green";

    const experience = document.getElementById("experience").value;
    const formation = document.getElementById("formation").value;
    const competence = document.getElementById("competence").value;

    const template = "assets/images/temp1.pdf";

    try {

      const { PDFDocument, rgb } = PDFLib;

      const response = await fetch(template);
      const existingPdfBytes = await response.arrayBuffer();

      const pdfDoc = await PDFDocument.load(existingPdfBytes);

      const page = pdfDoc.getPages()[0];

      // Nom et prénom
      page.drawText(prenom + " " + nom, {
        x: 230,
        y: 800,
        size: 18
      });

      // Email
      page.drawText(email, {
        x: 230,
        y: 780,
        size: 10
      });

      // Téléphone
      page.drawText(tel, {
        x: 230,
        y: 765,
        size: 10
      });

      // Expérience
      page.drawText(experience, {
        x: 80,
        y: 700,
        size: 10,
        maxWidth: 200,
        lineHeight: 14
      });

      // Formation
      page.drawText(formation, {
        x: 80,
        y: 645,
        size: 10,
        maxWidth: 200,
        lineHeight: 14
      });

      // Compétences
      page.drawText(competence, {
        x: 350,
        y: 700,
        size: 10,
        maxWidth: 180,
        lineHeight: 14
      });
      const pdfBytes = await pdfDoc.save();

      const blob = new Blob([pdfBytes], { type: "application/pdf" });

      const url = URL.createObjectURL(blob);

      const link = document.createElement("a");

      link.href = url;
      link.download = "mon-cv.pdf";

      link.click();

      alert("CV généré avec succès");

    }

    catch (error) {

      console.error(error);
      alert("Erreur lors de la génération du CV");

    }

  });

});
//verification  






