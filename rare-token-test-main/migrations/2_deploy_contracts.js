const reflect = artifacts.require("TheRareAntiquitiesTokenLtd");


module.exports = function(deployer) {
    deployer.deploy(reflect, "0x2B60d7683d4eD48A93B2cEF198959fFC956Fa452", "0x4CcEE09FDd72c4CbAB6f4D27d2060375B27cD314", "0x1626e068F452B018bC583590E67D6A0E5e8d2b5e")
}