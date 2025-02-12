document.addEventListener("DOMContentLoaded", async () => {
    const medicalCardInput = document.getElementById("medicalCardNumber");
    const addHospitalizationBtn = document.getElementById("addHospitalizationBtn");
    const reasonSelect = document.getElementById("reasonSelect");
    const tableBody = document.getElementById("hospitalizationTable").querySelector("tbody");

    // Загрузка списка причин госпитализации
    async function loadReasons() {
        const response = await fetch("http://localhost:3000/api/hospitalizationReasons");
        const reasons = await response.json();
        reasons.forEach(reason => {
            const option = document.createElement("option");
            option.value = reason.idHospitalizationReasons;
            option.textContent = reason.ReasonName;
            reasonSelect.appendChild(option);
        });
    }

    async function addHospitalization() {
        const medicalCardNumber = document.getElementById("medicalCardNumber").value;
        const conditionDescription = document.getElementById("conditionDescription").value;
        const reasonId = document.getElementById("reasonSelect").value;
        const hospitalizationDate = document.getElementById("hospitalizationDate").value;

        const data = {
            medicalCardNumber,  // Передаем номер мед карты
            hospitalizationDate,
            reasonId,
            conditionDescription
        };

        const response = await window.api.addHospitalization(data);  // Запрос на добавление госпитализации
        alert(response.message);
        loadHospitalizations();
    }

    async function loadHospitalizations() {
        tableBody.innerHTML = ""; // Очистка
        try {
            const hospitalizations = await window.api.getHospitalizations();
            console.log(hospitalizations);  // Логируем данные

            hospitalizations.forEach(hosp => {
                const row = document.createElement("tr");
                row.innerHTML = `
                <td>${hosp.Patients_idPatient || 'N/A'}</td>
                <td>${hosp.PatientName || 'Неизвестно'}</td>
                <td>${hosp.HospitalizationDate || 'Дата не указана'}</td>
                <td>${hosp.Reason || 'Не указано'}</td>
                <td>${hosp.ConditionDescription || 'Описание отсутствует'}</td>
                <td><button onclick="dischargePatient(${hosp.idHospitalization})">Выписать</button></td>
            `;
                tableBody.appendChild(row);
            });
        } catch (err) {
            console.error("Ошибка при загрузке госпитализаций:", err);
        }
    }

    async function dischargePatient(id) {
        await window.api.dischargePatient(id);
        loadHospitalizations();
    }

    addHospitalizationBtn.addEventListener("click", addHospitalization);
    loadReasons();
    loadHospitalizations();
});
