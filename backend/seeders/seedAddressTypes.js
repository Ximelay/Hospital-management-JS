const { AddressesTypes } = require("../models");

const seedAddressTypes = async () => {
    try {
        await AddressesTypes.bulkCreate([
            { NameOfAddressType: "Постоянный" },
            { NameOfAddressType: "Временный" }
        ], { ignoreDuplicates: true });

        console.log("✅ Типы адресов успешно добавлены!");
    } catch (error) {
        console.error("❌ Ошибка при добавлении типов адресов:", error);
    }
};

seedAddressTypes();
