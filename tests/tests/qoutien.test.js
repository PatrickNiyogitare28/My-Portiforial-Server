const {quotient} = require('../toTest/quotient');

describe('Test for quotien',()=> {
    it('it should computer the quotient',()=>{
      const result = quotient(8,4);
      expect(result).toEqual(2)
    })
})