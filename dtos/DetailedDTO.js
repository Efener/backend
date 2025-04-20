const createDetailedDTO = (bill) => ({
    BillTotal: bill.totalAmount,
    BillDetails: {
      PhoneUsageMinutes: bill.phoneUsageMinutes,
      InternetUsageGB: bill.internetUsageGB,
    },
    BillPaid: bill.isPaid,
  });
  
  module.exports = createDetailedDTO;
  