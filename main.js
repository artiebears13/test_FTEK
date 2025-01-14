import { fetchCargoItems } from "./api/mocks/cargoList.js";
import { renderCargoTable } from "./modules/cargoTable/cargoRender.js";
import { initAddCargoForm } from "./modules/cargoTable/cargoAdd.js";
import { showError, hideError } from "./modules/errors/errors.js";

const errorMessageElem = document.getElementById("error-message");
const tableBody = document.getElementById("cargo-table-body");
const statusFilter = document.getElementById("status-filter");
const addCargoForm = document.getElementById("add-cargo-form");

let cargoItems = [];

let currentFilter = "Все";

function refreshTable() {
    hideError(errorMessageElem);
    renderCargoTable(cargoItems, currentFilter, tableBody, errorMessageElem);
}

function onAddSuccess(updatedList) {
    cargoItems = updatedList;
    refreshTable();
}

fetchCargoItems()
    .then((data) => {
        cargoItems = data;
        refreshTable();
    })
    .catch((err) => {
        console.error("Ошибка при загрузке:", err);
        showError(errorMessageElem, "Не удалось загрузить список грузов.");
    });

statusFilter.addEventListener("change", () => {
    currentFilter = statusFilter.value;
    refreshTable();
});

initAddCargoForm(addCargoForm, errorMessageElem, cargoItems, onAddSuccess);
