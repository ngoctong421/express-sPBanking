const mongoose = require('mongoose');

const BankAccount = require('../models/bankaccount');

exports.createBankAccount = async (req, res) => {
  try {
    const bankAccount = new BankAccount({
      _id: new mongoose.Types.ObjectId(),
      bank: req.body.bank,
      name: req.body.name,
      cardnumber: req.body.cardnumber,
      validfrom: req.body.validfrom,
      account: req.body.account,
      balance: req.body.balance,
      connected: req.body.connected,
    });

    if (bankAccount.bank == 'VCB') {
      bankAccount.cardnumbersliced = bankAccount.cardnumber.slice(15, 20);
    } else {
      bankAccount.cardnumbersliced = bankAccount.cardnumber.slice(12, 16);
    }

    bankAccount.save();

    res.status(201).json({
      message: 'Created bank account successfully',
      bankAccount: bankAccount,
    });
  } catch (err) {
    res.status(500).json({
      error: err,
    });
  }
};

exports.checkBankAccount = async (req, res) => {
  try {
    const bankAccount = await BankAccount.findOne({
      cardnumber: req.body.cardnumber,
      bank: req.body.bank,
      validfrom: req.body.validfrom,
    });

    if (!bankAccount) {
      res.status(409).json({
        message: 'Numbercard invalid',
      });
    } else {
      if (bankAccount.connected > 0) {
        res.status(409).json({
          message: 'Your card was added before!',
        });
      } else {
        // bankAccount.connected = 1;

        // bankAccount.save();

        if (bankAccount.bank == 'VCB') {
          res.status(201).json({
            message: 'OK',
            bank: bankAccount.bank,
            name: bankAccount.name,
            cardnumbersliced: bankAccount.cardnumbersliced,
          });
        } else {
          res.status(201).json({
            message: 'OK',
            bank: bankAccount.bank,
            name: bankAccount.name,
            cardnumbersliced: bankAccount.cardnumbersliced,
          });
        }
      }
    }
  } catch (err) {
    res.status(500).json({
      error: err,
    });
  }
};

exports.eWalletTopup = async (req, res) => {
  try {
    const bankAccount = await BankAccount.findOne({
      cardnumbersliced: req.body.cardnumbersliced,
      bank: req.body.bank,
      name: req.body.name,
    });

    if (bankAccount) {
      if (req.body.amount < bankAccount.balance) {
        bankAccount.balance -= parseInt(req.body.amount);

        bankAccount.save();

        res.status(200).json({
          message: 'OK',
        });
      } else {
        res.status(409).json({
          message:
            'There is not enough money in your account to make this transaction.',
        });
      }
    } else {
      res.status(500).json({
        error: err,
      });
    }
  } catch (err) {
    res.status(500).json({
      error: err,
    });
  }
};

exports.eWalletWithdraw = async (req, res) => {
  try {
    const bankAccount = await BankAccount.findOne({
      cardnumbersliced: req.body.cardnumbersliced,
      bank: req.body.bank,
      name: req.body.name,
    });

    if (bankAccount) {
      bankAccount.balance += parseInt(req.body.amount);

      bankAccount.save();

      res.status(200).json({
        message: 'OK',
      });
    } else {
      res.status(500).json({
        error: err,
      });
    }
  } catch (err) {
    res.status(500).json({
      error: err,
    });
  }
};

exports.getBankAccount = async (req, res) => {
  try {
    const doc = await BankAccount.findOne({
      cardnumber: req.params.cardnumber,
    });

    res.status(200).json({
      bankAccount: doc,
    });
  } catch (err) {
    res.status(500).json({
      error: err,
    });
  }
};
