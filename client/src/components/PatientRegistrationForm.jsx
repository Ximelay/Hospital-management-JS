import React, { useState } from 'react';
import axios from 'axios';

const PatientRegistrationForm = () => {
    const [formData, setFormData] = useState({
        FirstName: '',  // Название как в БД
        LastName: '',
        MiddleName: '',
        InsurancePolicyNumber: '',
        BirthDate: '',
        Gender: '',  // Пол теперь обязателен
        EmailAddress: '',
        TelephoneNumber: '',
        PassportData: '',
        Workplace: '',
        Address: '',
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        console.log("Отправляемые данные:", formData); // Логируем данные перед отправкой

        try {
            const response = await axios.post('http://localhost:3000/api/patients', formData, {
                headers: { 'Content-Type': 'application/json' }
            });
            console.log('Пациент успешно зарегистрирован:', response.data);
        } catch (err) {
            console.error('Ошибка при регистрации пациента:', err.response ? err.response.data : err);
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
                        <label>Дата рождения:</label>
                        <input type="date" name="BirthDate" value={formData.BirthDate} onChange={handleInputChange}
                               required/>
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
                               onChange={handleInputChange}/>
                    </div>

                    <div className="input-group">
                        <label>Место работы:</label>
                        <input type="text" name="Workplace" value={formData.Workplace} onChange={handleInputChange}
                               required/>
                    </div>

                    <div className="input-group">
                        <label>Адрес проживания:</label>
                        <textarea name="Address" value={formData.Address} onChange={handleInputChange}/>
                    </div>

                    <button type="submit" className="submit-btn">Сохранить изменения</button>
                </div>
            </form>
        </div>
    );
};

export default PatientRegistrationForm;
