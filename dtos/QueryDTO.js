const createQueryDTO = (bill) => ({
    BillTotal: bill.totalAmount,
    BillPaid: bill.isPaid,
  });
  
  module.exports = createQueryDTO;
  