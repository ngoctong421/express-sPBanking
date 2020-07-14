const express = require('express');
const router = express.Router();

const BankAccount = require('../models/bankaccount');

const BankController = require('../controllers/bank');

router.post('/createbankaccount', BankController.createBankAccount);

router.post('/checkbankaccount', BankController.checkBankAccount);

router.post('/topup', BankController.eWalletTopup);

router.get('/getbankaccount/:cardnumber', BankController.getBankAccount);

module.exports = router;
