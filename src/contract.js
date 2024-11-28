import Web3 from 'web3';

// เชื่อมต่อกับ Ganache โดยตรง (ไม่ผ่าน Metamask)
const web3 = new Web3('http://localhost:7545');  // ให้แน่ใจว่า Ganache กำลังรันอยู่ที่ port นี้

// Smart Contract Address และ ABI
const contractAddress = '0xE90e4A8Dae4DC79cd65A44774C79BF50EB8Fed37';  // ระบุ Contract Address
const contractABI = [
	{
		"inputs": [
			{
				"internalType": "string",
				"name": "_commonName",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "_tradeName",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "_dosageForm",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "_usage",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "_doctorInfo",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "_missedDose",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "_commonSideEffects",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "_immediateSideEffects",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "_storageMethod",
				"type": "string"
			}
		],
		"name": "addMedicine",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "_id",
				"type": "uint256"
			}
		],
		"name": "getMedicine",
		"outputs": [
			{
				"internalType": "string",
				"name": "commonName",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "tradeName",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "dosageForm",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "usage",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "doctorInfo",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "missedDose",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "commonSideEffects",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "immediateSideEffects",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "storageMethod",
				"type": "string"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "medicineCount",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"name": "medicines",
		"outputs": [
			{
				"internalType": "string",
				"name": "commonName",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "tradeName",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "dosageForm",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "usage",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "doctorInfo",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "missedDose",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "commonSideEffects",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "immediateSideEffects",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "storageMethod",
				"type": "string"
			}
		],
		"stateMutability": "view",
		"type": "function"
	}
]

// สร้างอินสแตนซ์ของ Smart Contract
const contract = new web3.eth.Contract(contractABI, contractAddress);

// ฟังก์ชันในการเพิ่มข้อมูลยา
export const addMedicine = async (medicineData) => {
  try {
    const accounts = await web3.eth.getAccounts(); // ดึงบัญชีทั้งหมดจาก Ganache
    await contract.methods.addMedicine(
      medicineData.commonName,
      medicineData.tradeName,
      medicineData.dosageForm,
      medicineData.usage,
      medicineData.doctorInfo,
      medicineData.missedDose,
      medicineData.commonSideEffects,
      medicineData.immediateSideEffects,
      medicineData.storage
    ).send({
      from: accounts[0],
      gas: 2000000  // ระบุ Gas ให้เพียงพอ
    });
    console.log("Medicine added successfully!");
  } catch (error) {
    console.error("Error adding medicine:", error);
  }
};

// ฟังก์ชันดึงจำนวนข้อมูลยา
export const getMedicineCount = async () => {
  try {
    const count = await contract.methods.medicineCount().call();
    return count;
  } catch (error) {
    console.error("Error fetching medicine count:", error);
    return 0;
  }
};

// ฟังก์ชันดึงข้อมูลยา
export const getMedicine = async (id) => {
    try {
      const medicine = await contract.methods.getMedicine(id).call();
      return medicine; // ส่งกลับข้อมูลยาที่ตรงกับ id
    } catch (error) {
      console.error("Error fetching medicine with id", id, ":", error);
      return null;
    }
  };
  
