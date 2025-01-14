import { showError } from "../errors/errors.js";

/**
 @param {HTMLElement} selectElement
 @param {string} status
 */
function applyStatusColor(selectElement, status) {
    selectElement.classList.remove("bg-warning", "bg-info", "bg-success", "text-light");

    switch (status) {
        case "Ожидает отправки":
            selectElement.classList.add("bg-warning");
            break;
        case "В пути":
            selectElement.classList.add("bg-info", "text-light");
            break;
        case "Доставлен":
            selectElement.classList.add("bg-success", "text-light");
            break;
        default:
            break;
    }
}

/**
 * @param {Object} cargo — cargo object
 * @param {string} newStatus
 * @param {HTMLSelectElement} selectElement
 * @param {HTMLElement} errorContainer
 */
function handleStatusChange(cargo, newStatus, selectElement, errorContainer) {
    if (newStatus === "Доставлен") {
        const today = new Date();
        const departure = new Date(cargo.departureDate);

        if (departure > today) {
            showError(
                errorContainer,
                `Ошибка: Нельзя установить "Доставлен" для груза (ID=${cargo.id}), 
         дата отправления ${cargo.departureDate} ещё не наступила.`
            );
            selectElement.value = cargo.status;
            return;
        }
    }

    cargo.status = newStatus;
    applyStatusColor(selectElement, newStatus);
}

/**
 * @param {Array} cargoItems — array of cargo objects
 * @param {string} filterStatus
 * @param {HTMLElement} tableBody
 * @param {HTMLElement} errorContainer
 */
export function renderCargoTable(cargoItems, filterStatus, tableBody, errorContainer) {
    tableBody.innerHTML = "";

    const statusOptions = ["Ожидает отправки", "В пути", "Доставлен"];

    const filtered = (filterStatus === "Все")
        ? cargoItems
        : cargoItems.filter((item) => item.status === filterStatus);

    filtered.forEach((cargo) => {
        const tr = document.createElement("tr");

        const tdId = document.createElement("td");
        tdId.textContent = cargo.id;
        tr.appendChild(tdId);

        const tdName = document.createElement("td");
        tdName.textContent = cargo.name;
        tr.appendChild(tdName);

        const tdStatus = document.createElement("td");
        const selectStatus = document.createElement("select");
        selectStatus.classList.add("form-select");

        statusOptions.forEach((status) => {
            const option = document.createElement("option");
            option.value = status;
            option.textContent = status;
            if (status === cargo.status) {
                option.selected = true;
            }
            selectStatus.appendChild(option);
        });

        applyStatusColor(selectStatus, cargo.status);

        selectStatus.addEventListener("change", () => {
            handleStatusChange(cargo, selectStatus.value, selectStatus, errorContainer);
        });

        tdStatus.appendChild(selectStatus);
        tr.appendChild(tdStatus);

        const tdOrigin = document.createElement("td");
        tdOrigin.textContent = cargo.origin;
        tr.appendChild(tdOrigin);

        const tdDestination = document.createElement("td");
        tdDestination.textContent = cargo.destination;
        tr.appendChild(tdDestination);

        const tdDate = document.createElement("td");
        tdDate.textContent = cargo.departureDate;
        tr.appendChild(tdDate);

        tableBody.appendChild(tr);
    });
}
