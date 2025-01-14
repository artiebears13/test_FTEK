let cargoList = [
    {
        id: "CARGO001",
        name: "Строительные материалы",
        status: "В пути",
        origin: "Москва",
        destination: "Казань",
        departureDate: "2024-11-24",
    },
    {
        id: "CARGO002",
        name: "Хрупкий груз",
        status: "Ожидает отправки",
        origin: "Санкт-Петербург",
        destination: "Екатеринбург",
        departureDate: "2024-11-26",
    },
];

export function fetchCargoItems() {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve(cargoList);
        }, 300);
    });
}

export function updateCargoItems(newItems) {
    return new Promise((resolve) => {
        setTimeout(() => {
            cargoList = newItems;
            resolve(cargoList);
        }, 300);
    });
}
