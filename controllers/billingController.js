const QueryDTO = require('../dtos/QueryDTO');
const DetailedDTO = require('../dtos/DetailedDTO');
const Billing = require('../models/billingModel');



const addUsage = async (req, res) => {
  try {
    const { subscriberNo, month, phoneUsageMinutes, internetUsageGB } = req.body;
    let bill = await Billing.findOne({ subscriberNo, month });

    if (!bill) {
      bill = new Billing({
        subscriberNo,
        month,
        year: new Date().getFullYear(),
        phoneUsageMinutes: phoneUsageMinutes,
        internetUsageGB: internetUsageGB,
      });
      await bill.save();
      return res.status(201).json({ message: 'Usage added and bill created' });
    }

    await bill.updateOne({
      $set: {
        phoneUsageMinutes: bill.phoneUsageMinutes + phoneUsageMinutes,
        internetUsageGB: bill.internetUsageGB + internetUsageGB,
      },
    });

    res.status(200).json({ message: 'Usage added' });
  } catch (error) {
    console.error('Error adding usage:', error);
    res.status(500).json({ message: 'Error' });
  }
};



const calculateBill = async (req, res) => {
  try {
    const { subscriberNo, month, year } = req.body;
    const bill = await Billing.findOne({ subscriberNo, month, year });

    if (!bill) {
      return res.status(404).json({ message: 'Bill not found' });
    }

    const phoneRate = 10; 
    const internetRateBefore20 = 50; 
    const internetRateAfter20 = 10; 

    if (bill.phoneUsageMinutes > 1000) {
      bill.totalAmount += (bill.phoneUsageMinutes - 1000) * phoneRate;
    }

    if (bill.internetUsageGB !== 0) {
      bill.totalAmount += internetRateBefore20;
    }

    if (bill.internetUsageGB > 20) {
      bill.totalAmount += (bill.internetUsageGB - 20) * internetRateAfter20;
    }

    bill.isPaid = false;
    await bill.save();

    res.status(200).json({ message: 'Bill calculated' });
  } catch (error) {
    console.error('Error calculating bill:', error);
    res.status(500).json({ message: 'Error' });
  }
};


const queryBill = async (req, res) => {
  try {
    const { subscriberNo, month, year } = req.query;
    const bill = await Billing.findOne({ subscriberNo, month, year });

    if (!bill) {
      return res.status(404).json({ message: 'Bill not found' });
    }

  
    res.status(200).json(QueryDTO(bill));
  } catch (error) {
    console.error('Error querying bill:', error);
    res.status(500).json({ message: 'Error' });
  }
};


const queryBillDetailed = async (req, res) => {
  try {
    const { subscriberNo, month, year } = req.query;
    const bill = await Billing.findOne({ subscriberNo, month, year });

    if (!bill) {
      return res.status(404).json({ message: 'Bill not found' });
    }

    res.status(200).json( DetailedDTO(bill));
  } catch (error) {
    console.error('Error querying bill:', error);
    res.status(500).json({ message: 'Error' });
  }
};


const payBill = async (req, res) => {
  try {
    const { subscriberNo, month, year } = req.body;
    const bill = await Billing.findOne({ subscriberNo, month, year });

    if (!bill) {
      return res.status(404).json({ message: 'Bill not found' });
    }

    if (bill.isPaid) {
      return res.status(400).json({ message: 'Bill already paid' });
    }

    bill.isPaid = true;
    await bill.save();

    res.status(200).json({ message: 'Bill paid' });
  } catch (error) {
    console.error('Error paying bill:', error);
    res.status(500).json({ message: 'Error' });
  }
};

module.exports = {
  addUsage,
  calculateBill,
  queryBill,
  queryBillDetailed,
  payBill,
};
