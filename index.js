const dayInput = document.getElementById("number");
const monthInput = document.getElementById("month");
const yearInput = document.getElementById("year");

const resultYears = document.getElementById("years");
const resultMonths = document.getElementById("months");
const resultDays = document.getElementById("days");

const submitBtn = document.querySelector(".submit");

function isValidDate(y, m, d) {
  const date = new Date(y, m - 1, d);
  return (
    date.getFullYear() === y &&
    date.getMonth() === m - 1 &&
    date.getDate() === d
  );
}

function showError(input, message) {
  const group = input.parentElement;
  const label = group.querySelector("label");
  const warning = group.querySelector(".warning");

  input.classList.add("error");
  label.classList.add("error");
  warning.textContent = message;
}

function clearError(input) {
  const group = input.parentElement;
  const label = group.querySelector("label");
  const warning = group.querySelector(".warning");

  input.classList.remove("error");
  label.classList.remove("error");
  warning.textContent = "";
}

function calculateAge() {
  const day = parseInt(dayInput.value);
  const month = parseInt(monthInput.value);
  const year = parseInt(yearInput.value);

  let hasError = false;

  clearError(dayInput);
  clearError(monthInput);
  clearError(yearInput);

  if (isNaN(day) || day < 1 || day > 31) {
    showError(dayInput, "Must be a valid day");
    hasError = true;
  }
  if (isNaN(month) || month < 1 || month > 12) {
    showError(monthInput, "Must be a valid month");
    hasError = true;
  }
  const currentYear = new Date().getFullYear();
  if (isNaN(year) || year < 1000 || year > currentYear) {
    showError(yearInput, "Must be a valid year");
    hasError = true;
  }

  if (hasError) return;

  if (!isValidDate(year, month, day)) {
    showError(dayInput, "Date doesn't exist");
    showError(monthInput, "");
    showError(yearInput, "");
    return;
  }

  const birthDate = new Date(year, month - 1, day);
  const today = new Date();

  let years = today.getFullYear() - birthDate.getFullYear();
  let months = today.getMonth() - birthDate.getMonth();
  let days = today.getDate() - birthDate.getDate();

  if (days < 0) {
    months--;
    const prevMonth = new Date(today.getFullYear(), today.getMonth(), 0);
    days += prevMonth.getDate();
  }

  if (months < 0) {
    years--;
    months += 12;
  }

  resultYears.textContent = years;
  resultMonths.textContent = months;
  resultDays.textContent = days;
}

submitBtn.addEventListener("click", calculateAge);