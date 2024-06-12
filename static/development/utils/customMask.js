const phoneInputs = document.querySelectorAll('[data-type="phone"]');

phoneInputs.forEach((element) => {
  element.addEventListener("input", handleInput);
});

function handleInput(e) {
  e.target.value = phoneMask(e.target.value);
}

function phoneMask(phone) {
  // Видаляємо всі нецифрові символи
  phone = phone.replace(/\D/g, "");

  // Додаємо "+" на початку номера
  phone = "+" + phone;

  // Форматуємо номер телефону: +38 (0XX) XXX-XX-XX
  phone = phone.replace(/^(\+\d{2})(\d{0,3})?(\d{0,3})?(\d{0,2})?(\d{0,2})?/, "$1 ($2) $3-$4-$5");

  // Обмежуємо максимальну довжину номера
  return phone.slice(0, 19);
}
