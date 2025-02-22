window.addEventListener('DOMContentLoaded', async () => {
    // Загружаем пациентов и госпитализации
    await loadPatientsForHospitalization();
    await loadHospitalizationReasons();
    await fetchHospitalizations();

    // Добавляем обработчик для формы добавления госпитализации
    const addHospitalizationForm = document.getElementById('add-hospitalization-form');
    if (addHospitalizationForm) {
        addHospitalizationForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            const hospitalizationData = {
                patientId: document.getElementById('patient').value,
                medicalCardNumber: document.getElementById('medicalCardNumber').value,
                hospitalizationDate: document.getElementById('hospitalizationDate').value,
                conditionDescription: document.getElementById('conditionDescription').value,
                hospitalizationReasonId: document.getElementById('hospitalizationReason').value // Добавляем выбранную причину
            };

            console.log(hospitalizationData); // Логируем данные

            const response = await window.electron.addHospitalization(hospitalizationData);
            if (response) {
                alert("Госпитализация добавлена успешно");
                fetchHospitalizations(); // Обновляем список госпитализаций
                document.getElementById('hospitalization-form').style.display = 'none'; // Скрываем форму
            } else {
                alert("Произошла ошибка при добавлении госпитализации");
            }
        });
    }

    // Обработчик для кнопки "Добавить госпитализацию"
    const addHospitalizationBtn = document.getElementById('add-hospitalization-btn');
    if (addHospitalizationBtn) {
        addHospitalizationBtn.addEventListener('click', () => {
            document.getElementById('hospitalization-form').style.display = 'block'; // Показать форму добавления госпитализации
        });
    }
});

// Загрузка списка причин госпитализации
async function loadHospitalizationReasons() {
    try {
        const reasons = await window.electron.getHospitalizationReasons();
        const reasonSelect = document.getElementById('hospitalizationReason');

        if (!reasonSelect) {
            console.error("Элемент с ID 'hospitalizationReason' не найден.");
            return;
        }

        reasons.forEach(reason => {
            const option = document.createElement('option');
            option.value = reason.idHospitalizationReasons;
            option.textContent = reason.ReasonName;
            reasonSelect.appendChild(option);
        });
    } catch (error) {
        console.error("Ошибка при загрузке причин госпитализации:", error);
    }
}

// Загрузка списка пациентов
async function loadPatientsForHospitalization() {
    try {
        const patients = await window.electron.getPatientsForHospitalization();
        const patientSelect = document.getElementById('patient');

        if (!patientSelect) {
            console.error("Элемент с ID 'patient' не найден.");
            return;
        }

        patients.forEach(patient => {
            const option = document.createElement('option');
            option.value = patient.idPatient;
            option.textContent = `${patient.FirstName} ${patient.LastName} ${patient.MiddleName}`;
            patientSelect.appendChild(option);
        });
    } catch (error) {
        console.error("Ошибка при загрузке пациентов:", error);
    }
}

// Загрузка госпитализаций
async function fetchHospitalizations() {
    try {
        const hospitalizations = await window.electron.getHospitalizations();
        console.log("Полученные данные о госпитализациях:", hospitalizations); // Логируем все данные

        const listContainer = document.getElementById('hospitalizations-list');
        listContainer.innerHTML = ''; // очищаем список

        if (Array.isArray(hospitalizations)) {
            hospitalizations.forEach(hospitalization => {
                console.log("Обработка госпитализации:", hospitalization); // Логируем каждую госпитализацию

                const row = document.createElement('tr');

                const hospitalizationDate = new Date(hospitalization.HospitalizationDate).toLocaleDateString();

                // Проверка на данные пациента
                const patient = hospitalization.Patient || {};
                const patientName = patient.FirstName && patient.LastName ? `${patient.FirstName} ${patient.LastName}` : 'Неизвестен';
                console.log("ФИО пациента:", patientName); // Логируем ФИО пациента

                // Извлекаем номер медицинской карты, если он есть
                const medicalCardNumber = patient.MedicalCard ? patient.MedicalCard.CardNumber : 'Не указан';
                console.log("Номер медицинской карты:", medicalCardNumber); // Логируем номер карты

                // Проверка на данные причины госпитализации
                const reasonName = hospitalization.HospitalizationReason ? hospitalization.HospitalizationReason.ReasonName : 'Не указано';
                console.log("Причина госпитализации:", reasonName); // Логируем причину госпитализации

                // Добавляем строку в таблицу
                row.innerHTML = `
                    <td>${medicalCardNumber}</td>
                    <td>${patientName}</td>
                    <td>${hospitalizationDate}</td>
                    <td>${reasonName}</td>
                    <td>${hospitalization.ConditionDescription || 'Не указано'}</td>
                    <td><button onclick="dischargePatient(${hospitalization.idHospitalization})">Выписать</button></td>
                `;
                listContainer.appendChild(row);
            });
        } else {
            console.error('Данные госпитализаций не являются массивом:', hospitalizations);
        }
    } catch (error) {
        console.error("Ошибка при загрузке госпитализаций:", error);
    }
}

// Выписка пациента
async function dischargePatient(id) {
    const dischargeReason = prompt("Введите причину выписки");
    if (dischargeReason) {
        await window.electron.dischargePatient(id, dischargeReason);
        fetchHospitalizations();
    }
}
