document.addEventListener("DOMContentLoaded", () => {
  // DOM refs
  const dateField = document.getElementById("currentDate");
  const setTodayBtn = document.getElementById("setTodayBtn");
  const importInput = document.getElementById("importInput");
  const exportButton = document.getElementById("exportButton");
  const statOutput = document.getElementById("statOutput");
  const autoOutput = document.getElementById("autoOutput");
  const summaryOutput = document.getElementById("summaryOutput");
  const subject1NameField = document.getElementById("subject1Name");
  const subject2NameField = document.getElementById("subject2Name");
  const subject1LessonsField = document.getElementById("subject1Lessons");
  const subject2LessonsField = document.getElementById("subject2Lessons");
  const endDateField = document.getElementById("endDate");
  const lessonsPerDayField = document.getElementById("lessonsPerDay");
  const lastLesson1Field = document.getElementById("lastLesson1");
  const lastLesson2Field = document.getElementById("lastLesson2");
  const subject1Title = document.getElementById("subject1Title");
  const subject2Title = document.getElementById("subject2Title");
  const ll1Text = document.getElementById("ll1Text");
  const ll2Text = document.getElementById("ll2Text");
  const done1Button = document.getElementById("done1Button");
  const done2Button = document.getElementById("done2Button");
  const reset1Button = document.getElementById("reset1Button");
  const reset2Button = document.getElementById("reset2Button");

  // Helpers
  function formatDate(d) {
    const mesi = ["gennaio", "febbraio", "marzo", "aprile", "maggio", "giugno", "luglio", "agosto", "settembre", "ottobre", "novembre", "dicembre"];
    return d.getDate() + " " + mesi[d.getMonth()];
  }

  // Config (import/export)
  function getConfig() {
    return {
      currentDate: dateField.value,
      subject1Name: subject1NameField.value,
      subject1Lessons: subject1LessonsField.value,
      subject2Name: subject2NameField.value,
      subject2Lessons: subject2LessonsField.value,
      lessonsPerDay: lessonsPerDayField.value,
      endDate: endDateField.value,
      lastLesson1: lastLesson1Field.value,
      lastLesson2: lastLesson2Field.value
    };
  }
  function setConfig(data) {
    if (data.currentDate !== undefined) dateField.value = data.currentDate;
    if (data.subject1Name !== undefined) subject1NameField.value = data.subject1Name;
    if (data.subject1Lessons !== undefined) subject1LessonsField.value = data.subject1Lessons;
    if (data.subject2Name !== undefined) subject2NameField.value = data.subject2Name;
    if (data.subject2Lessons !== undefined) subject2LessonsField.value = data.subject2Lessons;
    if (data.lessonsPerDay !== undefined) lessonsPerDayField.value = data.lessonsPerDay;
    if (data.endDate !== undefined) endDateField.value = data.endDate;
    if (data.lastLesson1 !== undefined) lastLesson1Field.value = data.lastLesson1;
    if (data.lastLesson2 !== undefined) lastLesson2Field.value = data.lastLesson2;
  }
  function exportConfig() {
    const cfg = getConfig();
    const blob = new Blob([JSON.stringify(cfg, null, 2)], { type: "application/json" });
    const url = URL.createObjectURL(blob); const a = document.createElement("a");
    a.href = url; a.download = "studio-config.json"; a.click(); URL.revokeObjectURL(url);
  }
  function importConfig(evt) {
    const file = evt.target.files[0]; if (!file) return;
    const reader = new FileReader();
    reader.onload = e => { try { const data = JSON.parse(e.target.result); setConfig(data); updateSchedule(); } catch (err) { alert("File JSON non valido"); } };
    reader.readAsText(file);
  }

  // Core logic
  function updateSchedule() {
    const subj1 = subject1NameField.value || "Materia 1";
    const subj2 = subject2NameField.value || "Materia 2";
    let total1 = Math.max(0, parseInt(subject1LessonsField.value) || 72);
    let total2 = Math.max(0, parseInt(subject2LessonsField.value) || 72);
    const endDate = new Date(endDateField.value);
    const today = new Date(dateField.value);
    const perDay = Math.max(1, parseInt(lessonsPerDayField.value) || 3);
    let last1 = Math.max(0, parseInt(lastLesson1Field.value) || 0);
    let last2 = Math.max(0, parseInt(lastLesson2Field.value) || 0);

    // clamp ultimo completato al massimo numero di lezioni
    if (last1 > total1) { last1 = total1; lastLesson1Field.value = total1; }
    if (last2 > total2) { last2 = total2; lastLesson2Field.value = total2; }

    const msPerDay = 1000 * 60 * 60 * 24;

    // Update labels with subject names
    subject1Title.textContent = subj1; subject2Title.textContent = subj2;
    ll1Text.textContent = `Ultima lezione completata ${subj1}`;
    ll2Text.textContent = `Ultima lezione completata ${subj2}`;

    const schedule1 = [], schedule2 = [];
    let l1 = last1 + 1, l2 = last2 + 1;
    let dayIndex = 0;
    let lastStudyTime = null;

    while (l1 <= total1 || l2 <= total2) {
      const day = new Date(today.getTime() + dayIndex * msPerDay);
      const isLate = day > endDate; // il giorno di termine è ancora "in tempo"
      const cls = isLate ? 'late' : '';

      if (l1 <= total1) {
        const end = Math.min(l1 + perDay - 1, total1);
        const nums = []; for (let n = l1; n <= end; n++) nums.push(n);
        schedule1.push(`<span class="${cls}">${formatDate(day)}: Lezione ${nums[0]}${nums.length > 1 ? ', ' + nums.slice(1).join(', ') : ''}</span>`);
        l1 = end + 1;
      } else if (l2 <= total2) {
        const end = Math.min(l2 + perDay - 1, total2);
        const nums = []; for (let n = l2; n <= end; n++) nums.push(n);
        schedule2.push(`<span class="${cls}">${formatDate(day)}: Lezione ${nums[0]}${nums.length > 1 ? ', ' + nums.slice(1).join(', ') : ''}</span>`);
        l2 = end + 1;
      }
      lastStudyTime = day.getTime();
      dayIndex++;
    }
    statOutput.innerHTML = schedule1.join("<br>");
    autoOutput.innerHTML = schedule2.join("<br>");

    const rem1 = Math.max(0, total1 - last1), rem2 = Math.max(0, total2 - last2);

    let delayText;
    if (lastStudyTime === null) {
      delayText = "Nessuna lezione rimanente";
    } else {
      const lastStudyDate = new Date(lastStudyTime);
      // normalizza a mezzanotte per sicurezza
      const endMid = new Date(endDate.getFullYear(), endDate.getMonth(), endDate.getDate());
      const lastMid = new Date(lastStudyDate.getFullYear(), lastStudyDate.getMonth(), lastStudyDate.getDate());
      const diffDays = Math.round((lastMid - endMid) / msPerDay);

      if (diffDays > 0) {
        delayText = `Ritardo di ${diffDays} giorni`;
      } else if (diffDays < 0) {
        delayText = `Anticipo di ${-diffDays} giorni`;
      } else {
        delayText = "In tempo sulla scadenza";
      }
    }

    summaryOutput.innerHTML = `${subj1}: ${rem1} lezioni rimanenti<br>${subj2}: ${rem2} lezioni rimanenti<br><strong>${delayText}</strong>`;
  }

  // Event wiring
  function wireEvents() {
    // Auto-recalc on parameter change
    const watched = [dateField, subject1NameField, subject2NameField, subject1LessonsField, subject2LessonsField, endDateField, lessonsPerDayField, lastLesson1Field, lastLesson2Field];
    watched.forEach(el => { ["change", "input"].forEach(ev => el.addEventListener(ev, updateSchedule)); });

    // Buttons
    if (exportButton) exportButton.addEventListener("click", exportConfig);
    if (importInput) importInput.addEventListener("change", importConfig);

    if (done1Button) done1Button.addEventListener("click", () => {
      const total1 = Math.max(0, parseInt(subject1LessonsField.value) || 0);
      lastLesson1Field.value = total1;
      updateSchedule();
    });
    if (done2Button) done2Button.addEventListener("click", () => {
      const total2 = Math.max(0, parseInt(subject2LessonsField.value) || 0);
      lastLesson2Field.value = total2;
      updateSchedule();
    });
    if (reset1Button) reset1Button.addEventListener("click", () => {
      lastLesson1Field.value = 0;
      updateSchedule();
    });
    if (reset2Button) reset2Button.addEventListener("click", () => {
      lastLesson2Field.value = 0;
      updateSchedule();
    });
    if (setTodayBtn) setTodayBtn.addEventListener("click", () => {
      dateField.value = new Date().toISOString().split("T")[0];
      updateSchedule();
    });
  }

  // Init
  function init() {
    if (!dateField.value) {
      dateField.value = new Date().toISOString().split("T")[0];
    }
    wireEvents();
    updateSchedule();
  }

  init();
});
