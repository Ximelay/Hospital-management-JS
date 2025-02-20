import React, { useState } from 'react';
import axios from 'axios';

const PatientRegistrationForm = () => {
    const [formData, setFormData] = useState({
        FirstName: '',
        LastName: '',
        MiddleName: '',
        BirthDate: '',
        Gender: '',
        InsurancePolicyNumber: '',
        TelephoneNumber: '',
        EmailAddress: '',
        Workplace: '',
        PassportData: '',
        PassportIssueDate: '',
        Address: '',
        AddressType: '',
        MedicalCardNumber: ''
    });
    const [qrCode, setQrCode] = useState("");

    // Поиск пациента по номеру медицинской карты
    const searchPatient = async () => {
        if (!formData.MedicalCardNumber) {
            alert("Введите номер медицинской карты");
            return;
        }

        try {
            const response = await axios.get(`http://localhost:3000/api/patients/medical-card/${formData.MedicalCardNumber}`);

            if (response.data && response.data.Patient) {
                const patientData = response.data.Patient;

                // Функция для преобразования даты в формат "YYYY-MM-DD"
                const formatDate = (date) => {
                    if (!date) return '';
                    const d = new Date(date);
                    const year = d.getFullYear();
                    const month = String(d.getMonth() + 1).padStart(2, '0'); // Добавляем 0 перед месяцом, если нужно
                    const day = String(d.getDate()).padStart(2, '0'); // Добавляем 0 перед днем, если нужно
                    return `${year}-${month}-${day}`;
                };

                setFormData({
                    FirstName: patientData.FirstName || '',
                    LastName: patientData.LastName || '',
                    MiddleName: patientData.MiddleName || '',

                    BirthDate: formatDate(patientData.BirthDate), // Преобразуем дату рождения
                    Gender: patientData.Gender || '',
                    InsurancePolicyNumber: patientData.InsurancePolicyNumber || '',
                    TelephoneNumber: patientData.TelephoneNumber || '',
                    EmailAddress: patientData.EmailAddress || '',

                    Workplace: patientData.Workplace?.WorkplaceName || '',
                    PassportData: patientData.Passport?.SeriesNumber || '',
                    PassportIssueDate: formatDate(patientData.Passport?.IssueDate), // Преобразуем дату выдачи паспорта

                    Address: patientData.Address?.FullAddress || '',
                    AddressType: patientData.Address?.AddressesType?.NameOfAddressType || '',

                    MedicalCardNumber: formData.MedicalCardNumber
                });

                alert("Пациент найден и данные загружены!");
            } else {
                alert("Данные пациента не найдены.");
            }
        } catch (err) {
            console.error("Ошибка при поиске пациента:", err);
            alert("Пациент не найден! Проверьте номер медицинской карты.");
        }
    };

    const generateQRCode = async () => {
        if (!formData.MedicalCardNumber) {
            alert("Введите номер медицинской карты для генерации QR-кода");
            return;
        }

        try {
            const response = await axios.get(`http://localhost:3000/api/patients/qr/${formData.MedicalCardNumber}`);
            setQrCode(response.data.qrImage);
        } catch (err) {
            alert("Ошибка при генерации QR-кода!");
        }
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault(); // Отключаем стандартное поведение формы

        try {
            const response = await axios.post(
                'http://localhost:3000/api/patients/save-or-update',
                formData,
                { headers: { 'Content-Type': 'application/json' } }
            );

            alert(response.data.message); // Сообщение об успехе от сервера
        } catch (err) {
            console.error('Ошибка при сохранении данных пациента:', err.response ? err.response.data : err);
            alert('Произошла ошибка при сохранении данных пациента');
        }
    };

    return (
        <div className="registration-form">
            <h2>Регистрация пациента</h2>
            <form onSubmit={handleSubmit} className="form-container">
                <div className="left-column">
                    <div className="input-group">
                        <label>ФИО:</label>
                        <input type="text" name="FirstName" value={formData.FirstName} onChange={handleInputChange}
                               required/>
                        <input type="text" name="LastName" value={formData.LastName} onChange={handleInputChange}
                               required/>
                        <input type="text" name="MiddleName" value={formData.MiddleName} onChange={handleInputChange}/>
                    </div>

                    <div className="input-group">
                        <label>Номер страхового полиса:</label>
                        <input type="text" name="InsurancePolicyNumber" value={formData.InsurancePolicyNumber}
                               onChange={handleInputChange} required/>
                    </div>

                    <div className="input-group">
                        <label>Номер медицинской карты:</label>
                        <input type="text" name="MedicalCardNumber" value={formData.MedicalCardNumber}
                               onChange={handleInputChange}/>
                        <button type="button" onClick={searchPatient}>Проверить</button>
                    </div>

                    <div className="input-group">
                        <label>QR-код медкарты:</label>
                        {qrCode && <img src={qrCode} alt="QR Code"/>}
                        <button type="button" onClick={generateQRCode}>Сгенерировать QR-код</button>
                    </div>

                    <div className="input-group">
                        <label>Дата рождения:</label>
                        <input
                            type="date"
                            value={formData.BirthDate} // Преобразовано в формат "YYYY-MM-DD"
                            onChange={(e) => setFormData({...formData, BirthDate: e.target.value})}
                        />
                    </div>

                    <div className="input-group">
                        <label>Пол:</label>
                        <select name="Gender" value={formData.Gender} onChange={handleInputChange} required>
                            <option value="">Выберите</option>
                            <option value="Мужской">Мужской</option>
                            <option value="Женский">Женский</option>
                        </select>
                    </div>

                    <div className="input-group">
                        <label>Электронный адрес:</label>
                        <input type="email" name="EmailAddress" value={formData.EmailAddress}
                               onChange={handleInputChange}/>
                    </div>

                    <div className="input-group">
                        <label>Телефонный номер:</label>
                        <input type="text" name="TelephoneNumber" value={formData.TelephoneNumber}
                               onChange={handleInputChange} required/>
                    </div>

                    <div className="input-group">
                        <label>Паспортные данные:</label>
                        <input type="text" name="PassportData" value={formData.PassportData}
                               onChange={handleInputChange} required/>
                    </div>

                    <div className="input-group">
                        <label>Дата выдачи паспорта:</label>
                        <input
                            type="date"
                            value={formData.PassportIssueDate} // Преобразовано в формат "YYYY-MM-DD"
                            onChange={(e) => setFormData({...formData, PassportIssueDate: e.target.value})}
                        />
                    </div>

                    <div className="input-group">
                        <label>Место работы:</label>
                        <input type="text" name="Workplace" value={formData.Workplace} onChange={handleInputChange}
                               required/>
                    </div>

                    <div className="input-group">
                        <label>Адрес проживания:</label>
                        <textarea name="Address" value={formData.Address} onChange={handleInputChange} required/>
                    </div>

                    <div className="input-group">
                        <label>Тип адреса:</label>
                        <select name="AddressType" value={formData.AddressType} onChange={handleInputChange} required>
                            <option value="">Выберите</option>
                            <option value="Постоянный">Постоянный</option>
                            <option value="Временный">Временный</option>
                        </select>
                    </div>

                    <div className="input-group">
                        <button onClick={() => window.open("http://localhost:3000/api/files/download/consent")}>
                            Распечатать шаблон на согласие обработки персональных данных
                        </button>
                    </div>

                    <div className="input-group">
                        <button onClick={() => window.open("http://localhost:3000/api/files/download/agreement")}>
                            Распечатать шаблон на договор медицинских услуг
                        </button>
                    </div>

                    <button type="submit" className="submit-btn">Сохранить изменения</button>
                </div>
            </form>
        </div>
    );
};

export default PatientRegistrationForm;