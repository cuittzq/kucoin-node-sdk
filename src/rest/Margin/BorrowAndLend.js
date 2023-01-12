
const Http = require('../../lib/http');

/**
 * @name postBorrowOrder
 * @description Post Borrow Order. This endpoint requires the "Trade" permission.
 * @param params
 *   - {string} currency - Currency to Borrow
 *   - {string} type - Type: FOK, IOC
 *   - {number} size - Total size
 *   - {number} maxRate - [Optional] The max interest rate. All interest rates are acceptable if this field is left empty.
 *   - {string} term - [Optional] Term (Unit: Day). All terms are acceptable if this field is left empty. Please note to separate the terms via comma. For example, 7,14,28.
 * @return {Object} { code, success, data }
 */
exports.postBorrowOrder = async function postBorrowOrder(params = {}) {
  /*
  {
    "code": "200000",     
    "data": {
      "orderId": "a2111213",
      "currency": "USDT"
    }
  }
  */
  return await Http().POST('/api/v1/margin/borrow', { ...params });
};

/**
 * @name getBorrowOrder
 * @description Request via this endpoint to get the info of the borrow order through the orderId retrieved from Post Borrow Order .
 * @param {string} orderId - Borrow order ID
 * @return {Object} { code, success, data }
 */
exports.getBorrowOrder = async function getBorrowOrder(orderId) {
  /*
  {
    "code": "200000",     
    "data": {
      "currency": "USDT",
      "filled": 1.009,
      "matchList": [
        {
          "currency": "USDT",
          "dailyIntRate": "0.001",
          "size": "12.9",
          "term": 7,
          "timestamp": "1544657947759",
          "tradeId": "1212331"
        }
      ],
      "orderId": "a2111213",
      "size": "1.009",
      "status": "DONE"
    }
  }
  */
  return await Http().GET('/api/v1/margin/borrow', { orderId });
};

/**
 * @name getRepayRecord
 * @description Get Repay Record
 * @param {string} currency - [Optional] Currency. All currencies will be quried if this field is not required.
 * @return {Object} { code, success, data }
 */
exports.getRepayRecord = async function getRepayRecord(currency) {
  /*
  {
    "code": "200000",     
    "data": {
      "currentPage": 0,
      "items": [
        {
          "accruedInterest": "0.22121",
          "createdAt": "1544657947759",
          "currency": "USDT",
          "dailyIntRate": "0.0021",
          "liability": "1.32121",
          "maturityTime": "1544657947759",
          "principal": "1.22121",
          "repaidSize": "0",
          "term": 7,
          "tradeId": "1231141"
        }
      ],
      "pageSize": 0,
      "totalNum": 0,
      "totalPage": 0
    }
  }
  */
  return await Http().GET('/api/v1/margin/borrow/outstanding', { currency });
};

/**
 * @name getRepaymentRecord
 * @description Get Repayment Record
 * @param {string} currency - [Optional] Currency. All currencies will be quried if this field is not required.
 * @return {Object} { code, success, data }
 */
exports.getRepaymentRecord = async function getRepaymentRecord(currency) {
  /*
  {
    "code": "200000",     
    "data": {
      "currentPage": 0,
      "items": [
        {
          "currency": "USDT",
          "dailyIntRate": "0.0021",
          "interest": "0.22121",
          "principal": "1.22121",
          "repaidSize": "0",
          "repayTime": "1544657947759",
          "term": 7,
          "tradeId": "1231141"
        }
      ],
      "pageSize": 0,
      "totalNum": 0,
      "totalPage": 0
    }
  }
  */
  return await Http().GET('/api/v1/margin/borrow/repaid', { currency });
};

/**
 * @name repayAll
 * @description One-Click Repayment. This endpoint requires the "Trade" permission..
 * @param {string} currency - Currency
 * @param {string} sequence - Repayment strategy. RECENTLY_EXPIRE_FIRST: Time priority, namely to repay the loans of the nearest maturity time first, HIGHEST_RATE_FIRST: Rate Priority: Repay the loans of the highest interest rate first.
 * @param {number} size - Repayment size
 * @return {Object} { code, success, data }
 */
exports.repayAll = async function repayAll(currency, sequence, size) {
  /*
  {
    "code": "200000",     
    "data": {
    }
  }
  */
  return await Http().POST('/api/v1/margin/repay/all', {
    currency,
    sequence,
    size,
  });
};

/**
 * @name repaySingle
 * @description One-Click Repayment. This endpoint requires the "Trade" permission..
 * @param {string} currency - Currency
 * @param {string} tradeId - Trade ID
 * @param {number} size - Repayment size
 * @return {Object} { code, success, data }
 */
exports.repaySingle = async function repaySingle(currency, tradeId, size) {
  /*
  {
    "code": "200000",     
    "data": {
    }
  }
  */
  return await Http().POST('/api/v1/margin/repay/single', {
    currency,
    tradeId,
    size,
  });
};

/**
 * @name postLendOrder
 * @description Request via this endpoint to post lend order. This endpoint requires the "Trade" permission..
 * @param {string} currency - Currency
 * @param {string} size - Total size
 * @param {string} dailyIntRate - Daily interest rate. e.g. 0.002 is 0.2%
 * @param {number} term - Term (Unit: Day)
 * @return {Object} { code, success, data }
 */
exports.postLendOrder = async function postLendOrder(currency, size, dailyIntRate, term) {
  /*
  {
    "code": "200000",     
    "data": {
      "orderId": "5da5a4f0f943c040c2f8501e"
    }
  }
  */
  return await Http().POST('/api/v1/margin/lend', {
    currency,
    size,
    dailyIntRate,
    term,
  });
};

/**
 * @name cancelLendOrder
 * @description Request via this endpoint to cancel lend order. This endpoint requires the "Trade" permission..
 * @param {string} orderId - Lend order ID
 * @return {Object} { code, success, data }
 */
exports.cancelLendOrder = async function cancelLendOrder(orderId) {
  /*
  {
    "code": "200000",     
    "data": {
    }
  }
  */
  return await Http().DEL(`/api/v1/margin/lend/${orderId}`);
};

/**
 * @name setAutoLend
 * @description Request via this endpoint to post lend order. This endpoint requires the "Trade" permission..
 * @param {string} currency - Currency
 * @param {boolean} isEnable - Auto-lend enabled or not
 * @param {string} retainSize - Reserved size in main account. Required when isEnable is true.
 * @param {string} dailyIntRate - Daily interest rate. e.g. 0.002 is 0.2%. Required when isEnable is true.
 * @param {number} term - Term (Unit: Day). Required when isEnable is true.
 * @return {Object} { code, success, data }
 */
exports.setAutoLend = async function setAutoLend(currency, isEnable, retainSize, dailyIntRate, term) {
  /*
  {
    "code": "200000",     
    "data": {
    }
  }
  */
  return await Http().POST('/api/v1/margin/toggle-auto-lend', {
    currency,
    isEnable,
    retainSize,
    dailyIntRate,
    term,
  });
};

/**
 * @name getActiveOrder
 * @description Get Active Order. This endpoint requires the "Trade" permission..
 * @param {string} currency - [Optional] Currency
 * @param {Object}
 *   - {number} currentPage
 *   - {number} pageSize
 * @return {Object} { code, success, data }
 */
exports.getActiveOrder = async function getActiveOrder(currency, { currentPage, pageSize } = {}) {
  /*
  {
    "code": "200000",     
    "data": {
      "currentPage": 1,
      "pageSize": 1,
      "totalNum": 1,
      "totalPage": 1,
      "items": [{
          "orderId": "5da59f5ef943c033b2b643e4",
          "currency": "BTC",
          "size": "0.51",
          "filledSize": "0",
          "dailyIntRate": "0.0001",
          "term": 7,
          "createdAt": 1571135326913
      }]
    }
  }
  */
  return await Http().GET('/api/v1/margin/lend/active', {
    currency,
    currentPage,
    pageSize,
  });
};

/**
 * @name getLentHistory
 * @description Get Lent History. This endpoint requires the "Trade" permission..
 * @param {string} currency - [Optional] Currency
 * @param {Object}
 *   - {number} currentPage
 *   - {number} pageSize
 * @return {Object} { code, success, data }
 */
exports.getLentHistory = async function getLentHistory(currency, { currentPage, pageSize } = {}) {
  /*
  {
    "code": "200000",     
    "data": {
      "currentPage": 1,
      "pageSize": 1,
      "totalNum": 1,
      "totalPage": 1,
      "items": [{
          "orderId": "5da59f5bf943c033b2b643da",
          "currency": "BTC",
          "size": "0.51",
          "filledSize": "0.51",
          "dailyIntRate": "0.0001",
          "term": 7,
          "createdAt": 1571135323984,
          "status": "FILLED"
      }]
    }
  }
  */
  return await Http().GET('/api/v1/margin/lend/done', {
    currency,
    currentPage,
    pageSize,
  });
};

/**
 * @name getActiveLendOrdersList
 * @description Get Active Lend Order List. This endpoint requires the "Trade" permission..
 * @param {string} currency - [Optional] Currency
 * @param {Object}
 *   - {number} currentPage
 *   - {number} pageSize
 * @return {Object} { code, success, data }
 */
exports.getActiveLendOrdersList = async function getActiveLendOrdersList(currency, { currentPage, pageSize } = {}) {
  /*
  {
    "code": "200000",     
    "data": {
      "currentPage": 1,
      "pageSize": 1,
      "totalNum": 1,
      "totalPage": 1,
      "items": [{
        "tradeId": "5da6dba0f943c0c81f5d5db5",
        "currency": "BTC",
        "size": "0.51",
        "accruedInterest": "0",
        "repaid": "0.10999968",
        "dailyIntRate": "0.0001",
        "term": 14,
        "maturityTime": 1572425888958
      }]
    }
  }
  */
  return await Http().GET('/api/v1/margin/lend/trade/unsettled', {
    currency,
    currentPage,
    pageSize,
  });
};

/**
 * @name getSettledLendOrderHistory
 * @description Get Settled Lend Order History. This endpoint requires the "Trade" permission..
 * @param {string} currency - [Optional] Currency
 * @param {Object}
 *   - {number} currentPage
 *   - {number} pageSize
 * @return {Object} { code, success, data }
 */
exports.getSettledLendOrderHistory = async function getSettledLendOrderHistory(currency, { currentPage, pageSize } = {}) {
  /*
  {
    "code": "200000",     
    "data": {
      "currentPage": 1,
      "pageSize": 1,
      "totalNum": 1,
      "totalPage": 1,
      "items": [{
        "tradeId": "5da59fe6f943c033b2b6440b",
        "currency": "BTC",
        "size": "0.51",
        "interest": "0.00004899",
        "repaid": "0.510041641",
        "dailyIntRate": "0.0001",
        "term": 7,
        "settledAt": 1571216254767,
        "note": "The account of the borrowers reached a negative balance, and the system has supplemented the loss via the insurance fund. Deposit funds: 0.51."
      }]
    }
  }
  */
  return await Http().GET('/api/v1/margin/lend/trade/settled', {
    currency,
    currentPage,
    pageSize,
  });
};

/**
 * @name getAccountLendRecord
 * @description Request via this endpoint to get the lending history of the main account. This endpoint requires the "Trade" permission..
 * @param {string} currency - [Optional] Currency
 * @return {Object} { code, success, data }
 */
exports.getAccountLendRecord = async function getAccountLendRecord(currency) {
  /*
  {
    "code": "200000",     
    "data": [{
      "currency": "BTC",
      "outstanding": "1.02",
      "filledSize": "0.91000213",
      "accruedInterest": "0.00000213",
      "realizedProfit": "0.000045261",
      "isAutoLend": false
    }]
  }
  */
  return await Http().GET('/api/v1/margin/lend/assets', { currency });
};

/**
 * @name getLendingMarketData
 * @description Lending Market Data.
 * @param {string} currency - Currency
 * @param {number} term - [Optional] Term (Unit: Day)
 * @return {Object} { code, success, data }
 */
exports.getLendingMarketData = async function getLendingMarketData(currency, term) {
  /*
  {
    "code": "200000",     
    "data": [{
      "dailyIntRate": "0.0001",
      "term": 7,
      "size": "1.02"
    }]
  }
  */
  return await Http().GET('/api/v1/margin/market', {
    currency,
    term,
  });
};

/**
 * @name getMarginFillsTradeData
 * @description Request via this endpoint to get the last 300 fills in the lending and borrowing market.
 * @param {string} currency - Currency
 * @return {Object} { code, success, data }
 */
exports.getMarginFillsTradeData = async function getMarginFillsTradeData(currency) {
  /*
  {
    "code": "200000",     
    "data": [{
      "tradeId": "5da6dba0f943c0c81f5d5db5",
      "currency": "BTC",
      "size": "0.51",
      "dailyIntRate": "0.0001",
      "term": 14,
      "timestamp": 1571216288958989641
    }]
  }
  */
  return await Http().GET('/api/v1/margin/trade/last', {
    currency,
  });
};

/**
 * @name getLendConfig
 * @description Query Lending Configuration. This endpoint requires the "General" permission.
 * @param {string} currency - [Optional] Currency
 * @return {Object} { code, success, data }
 */
exports.getLendConfig = async function getLendConfig(currency) {
  /*
{
    "success": true,
    "code": "200",
    "msg": "success",
    "retry": false,
    "data": {
        "timestamp": 1669709409384,
        "items": [
            {
                "currency": "BTC",
                "lendMinSize": "0.001",
                "lendMaxSize": "300",
                "increment": "0.0001",
                "minDailyIntRate": "0",
                "maxDailyIntRate": "0.002",
                "precisionDailyIntRate": "0.00001",
                "terms": "7,14,28"
            }
        ]
    }
}
  */
  return await Http().GET('/api/v2/margin/lend/config', {
    currency
  });
};

/**
 * @name getLendMarkets
 * @description Query Lending Market List. This endpoint requires the "General" permission.
 * @param {string} currency - [Optional] Currency
 * @param {Int} term - [Optional] Currency
 * @return {Object} { code, success, data }
 */
exports.getLendMarkets = async function getLendMarkets(currency,term) {
  /*
 {
    "success": true,
    "code": "200",
    "msg": "success",
    "retry": false,
    "data": {
        "timestamp": 1669709478401,
        "items": [
            {
                "currency": "BTC",
                "size": "300",
                "dailyIntRate": "0.002",
                "term": 7
            }
        ]
    }
}
  */
  return await Http().GET('/api/v2/margin/lend/market', {
    currency,
    term
  });
};

/**
 * @name getLendOrder
 * @description Lending Order Query (Paginated). This endpoint requires the "Trade" permission.
 * @param {string} status - [Optional] Status
 * @param {string} currency - [Optional] Currency
 * @param {Object}
 *   - {number} currentPage
 *   - {number} pageSize
 * @return {Object} { code, success, data }
 */
exports.getLendOrder = async function getLendOrder(status,currency, { currentPage, pageSize } = {}) {
  /*
  {
    "success": true,
    "code": "200",
    "msg": "success",
    "retry": false,
    "data": {
        "timestamp": 1669708513820,
        "currentPage": 1,
        "pageSize": 100,
        "totalNum": 1,
        "totalPage": 1,
        "items": [
            {
                "orderId": "637c85a15403ae00016bd6df",
                "currency": "USDT",
                "size": "3000000",
                "filledSize": "144",
                "dailyIntRate": "0.002",
                "term": 7,
                "createdAt": 1669105056560,
                "status": "ACTIVE"
            }
        ]
    }
}
  */
  return await Http().GET('/api/v2/margin/lend/orders', {
    currency,
    status,
    currentPage,
    pageSize,
  });
};

/**
 * @name getSingleLendOrder
 * @description Query Single Lending Order . This endpoint requires the "Trade" permission.
 * @param {string} orderId - [Optional] Currency
 * @return {Object} { code, success, data }
 */
exports.getSingleLendOrder = async function getSingleLendOrder(orderId) {
  /*
{
    "success": true,
    "code": "200",
    "msg": "success",
    "retry": false,
    "data": {
        "orderId": "6385c0b3e0debdb6feb06e97",
        "currency": "USDT",
        "size": "11",
        "filledSize": "0",
        "dailyIntRate": "0.002",
        "term": 7,
        "createdAt": 1669710002360,
        "status": "ACTIVE"
    }
}
  */
  return await Http().GET('/api/v2/margin/lend', {
    orderId
  });
};

/**
 * @name getLendRecords
 * @description Query Lending Records . This endpoint requires the "Trade" permission.
 * @param {string} status - [Optional] Status
 * @param {string} currency - [Optional] Currency
 * @param {Object}
 *   - {number} currentPage
 *   - {number} pageSize
 * @return {Object} { code, success, data }
 */
exports.getLendRecords = async function getLendRecords(status,currency, { currentPage, pageSize } = {}) {
  /*
{
    "success": true,
    "code": "200",
    "msg": "success",
    "retry": false,
    "data": {
        "timestamp": 1669711220219,
        "currentPage": 1,
        "pageSize": 10,
        "totalNum": 39,
        "totalPage": 4,
        "items": [
            {
                "tradeId": "637c85a754f4d9000122f510",
                "currency": "USDT",
                "size": "11",
                "repaidSize": "11",
                "interest": "0.15400056",
                "accruedInterest": "0",
                "term": 7,
                "maturityTime": 1669709863747,
                "status": "CLEAR",
                "note": ""
            },
            {
                "tradeId": "6335ab03503ab80001485cb3",
                "currency": "USDT",
                "size": "1117",
                "repaidSize": "1117",
                "interest": "15.63799944",
                "accruedInterest": "0",
                "term": 7,
                "maturityTime": 1665066311258,
                "status": "CLEAR",
                "note": ""
            }
        ]
    }
}
  */
  return await Http().GET('/api/v2/margin/lend/trade/orders', {
    currency,
    status,
    currentPage,
    pageSize,
  });
};
