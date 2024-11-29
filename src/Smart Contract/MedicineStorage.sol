// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract MedicineStorage {

    // สร้างโครงสร้างข้อมูลยา
    struct Medicine {
        string commonName;           // ชื่อสามัญของยา
        string tradeName;            // ชื่อการค้าของยา
        string dosageForm;           // รูปแบบยา (เม็ด, แคปซูล ฯลฯ)
        string usage;                // วิธีการใช้ยา
        string doctorInfo;           // สิ่งที่ต้องแจ้งให้แพทย์หรือเภสัชกรทราบ
        string missedDose;           // วิธีการทำเมื่อผู้ป่วยลืมรับประทานยา
        string commonSideEffects;    // อาการไม่พึงประสงค์ทั่วไป
        string immediateSideEffects; // อาการไม่พึงประสงค์ที่ต้องแจ้งแพทย์
        string storageMethod;        // วิธีการเก็บรักษายา (แก้ไขจาก storage)
    }

    // Mapping เพื่อเก็บข้อมูลยาโดยใช้ ID
    mapping(uint256 => Medicine) public medicines;
    uint256 public medicineCount;  // นับจำนวนข้อมูลยา

    // ฟังก์ชันในการเพิ่มข้อมูลยา
    function addMedicine(
        string memory _commonName,
        string memory _tradeName,
        string memory _dosageForm,
        string memory _usage,
        string memory _doctorInfo,
        string memory _missedDose,
        string memory _commonSideEffects,
        string memory _immediateSideEffects,
        string memory _storageMethod  // แก้ไขจาก storage
    ) public {
        medicineCount++;
        medicines[medicineCount] = Medicine(
            _commonName,
            _tradeName,
            _dosageForm,
            _usage,
            _doctorInfo,
            _missedDose,
            _commonSideEffects,
            _immediateSideEffects,
            _storageMethod  // แก้ไขจาก storage
        );
    }

    // ฟังก์ชันในการดึงข้อมูลยา
    function getMedicine(uint256 _id) public view returns (
        string memory commonName,
        string memory tradeName,
        string memory dosageForm,
        string memory usage,
        string memory doctorInfo,
        string memory missedDose,
        string memory commonSideEffects,
        string memory immediateSideEffects,
        string memory storageMethod  // แก้ไขจาก storage
    ) {
        Medicine memory medicine = medicines[_id];
        return (
            medicine.commonName,
            medicine.tradeName,
            medicine.dosageForm,
            medicine.usage,
            medicine.doctorInfo,
            medicine.missedDose,
            medicine.commonSideEffects,
            medicine.immediateSideEffects,
            medicine.storageMethod  // แก้ไขจาก storage
        );
    }
}
