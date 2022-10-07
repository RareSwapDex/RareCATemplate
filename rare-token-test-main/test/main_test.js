const rareContract = artifacts.require("TheRareAntiquitiesTokenLtd");
const rareSwap = artifacts.require("IRARESwapRouter")
const weth = artifacts.require("IWETH")

contract('TheRareAntiquitiesTokenLtd', (accounts) => {

  // Global setup variables
  var totalSupply;
  const walletB = '0x51EeAb5b780A6be4537eF76d829CC88E98Bc71e5'
  const walletC = '0x3f7308ecc28AFFD2698B00F0A0BfAFd6F5eAf0Ab'
  var canTrade
  var walletBBalance
  const marketingWallet = '0x2B60d7683d4eD48A93B2cEF198959fFC956Fa452'
  const antiquitiesWallet = '0x4CcEE09FDd72c4CbAB6f4D27d2060375B27cD314'
  const gasWallet = '0x1626e068F452B018bC583590E67D6A0E5e8d2b5e'
  
  /****************************************************************************************/
  /* Operations and Settings                                                              */
  /****************************************************************************************/
  
  
  it(`1. Get Contration Information...`, async function () {
    const rareContractInstance = await rareContract.deployed()
    console.log('Address: ', rareContract.address)
    const name = await rareContractInstance.name()
    console.log('Contract Name:', name)
    const symbol = await rareContractInstance.symbol()
    console.log('Symbol: ', symbol)
    const decimals = (await rareContractInstance.decimals()).toNumber()
    console.log('Decimals: ', decimals)
    canTrade = await rareContractInstance.canTrade()
    console.log('canTrade: ', canTrade)
    const totalFee = (await rareContractInstance.totalFees()).toNumber()
    console.log('Total Fee: ', totalFee)
    const totalTax = (await rareContractInstance._totalTax()).toNumber()
    console.log('Total Tax: ', totalTax)
    assert.equal(decimals, 9, 'decimal is not correct')
  });

  it(`2. Check total supply.`, async function () {
    const rareContractInstance = await rareContract.deployed()
    // Get total token supply(in contract)
    totalSupply = await rareContractInstance.totalSupply.call({from: accounts[0]});
    // Total supply should be 500,000,000,000
    assert.equal(totalSupply, 500000000000000000000, "Fetches the total coin supply");
  });

  it(`3. Send 100000 tokens to WalletB and send 10000 tokens to WalletC.`, async function () {
    const rareContractInstance = await rareContract.deployed()
    await rareContractInstance.EnableTrading({from: accounts[0]})
    canTrade = await rareContractInstance.canTrade()
    console.log('canTrade: ', canTrade, accounts)
    assert.equal(canTrade, true, 'enable trading is not working')

    var tAmount = 100000000000000
    var tAmount1 = 10000000000000

     // Send 100000 of owner's token to walletB
    await rareContractInstance.transfer(walletB, tAmount, {from: accounts[0]})

    // Send 10000 of walletB to walletC
    await rareContractInstance.transfer(walletC, tAmount1, {from: walletB})

    walletBBalance = (await rareContractInstance.balanceOf.call(walletB, {from: accounts[0]})).toNumber()
    assert.equal(walletBBalance, 90000000018000, "reflection is not working")
  });

  it(`4. Add liquidity , Swap and Fees test.`, async function () {
    const rareSwapInstance = await rareSwap.at("0x25bFB54D3476bfcee2da42894957e8e52Fed35fD")
    const wethInstance = await weth.at("0xae13d989dac2f0debff460ac112a837c89baa7cd")
    await rareSwapInstance.addLiquidityETH("0x0F6308c4f81716085c07CA68307b0C26e6a043Db", '100000000000000000000', '90000000000000000000', '90000000000000000', accounts[0], 1667748824, {value: '100000000000000000'})
    await rareSwapInstance.swapTokensForExactETH("100000000000000", "1000000000000000000", ["0x0F6308c4f81716085c07CA68307b0C26e6a043Db","0xae13d989dac2f0debff460ac112a837c89baa7cd"], accounts[0], 1667748824)
    const marketingBalance = (await wethInstance.balanceOf(marketingWallet)).toNumber()
    assert(marketingBalance, 2000000000000, 'Marketing Fee is not correct')

    const antiquitiesBalance = (await wethInstance.balanceOf(antiquitiesWallet)).toNumber()
    assert(antiquitiesBalance, 3000000000000, 'Antiquities Fee is not correct')

    const gasBalance = (await wethInstance.balanceOf(gasWallet)).toNumber()
    assert(gasBalance, 1000000000000, 'Gas Fee is not correct')
  });
});
