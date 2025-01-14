import { showError, hideError } from "../errors/errors.js";
import {updateCargoItems} from "../../api/mocks/cargoList.js";

/**
 * @param {Array} cargoItems
 */
function generateCargoId(cargoItems) {
    const nextNumber = cargoItems.length + 1;
    return "CARGO" + String(nextNumber).padStart(3, "0");
}

/**
 * @param {HTMLFormElement} formElement
 * @param {HTMLElement} errorContainer
 * @param {Array} cargoItems
 * @param {Function} onAddSuccess
 */
export function initAddCargoForm(formElement, errorContainer, cargoItems, onAddSuccess) {
    formElement.addEventListener("submit", (e) => {
        e.preventDefault();
        hideError(errorContainer);

        const cargoName = document.getElementById("cargo-name").value.trim();
        const cargoOrigin = document.getElementById("cargo-origin").value;
        const cargoDestination = document.getElementById("cargo-destination").value;
        const cargoDate = document.getElementById("cargo-date").value;

        if (!cargoName || !cargoOrigin || !cargoDestination || !cargoDate) {
            showError(errorContainer, "Пожалуйста, заполните все поля формы.");
            return;
        }

        const newCargo = {
            id: generateCargoId(cargoItems),
            name: cargoName,
            status: "Ожидает отправки",
            origin: cargoOrigin,
            destination: cargoDestination,
            departureDate: cargoDate,
        };

        const newList = [...cargoItems, newCargo];

        updateCargoItems(newList)
            .then((updatedList) => {
                formElement.reset();
                hideError(errorContainer);

                onAddSuccess(updatedList);
            })
            .catch((err) => {
                console.error("Ошибка при обновлении", err);
                showError(errorContainer, "Не удалось обновить список грузов.");
            });
    });
}
