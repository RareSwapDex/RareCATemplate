import { AutoRow } from "components/Row";
import { Checkbox } from "components/SearchModal/styleds";
import Slider from "components/Slider";
import { InputContainer } from "pages/TokenLauncher";
import React, { useState } from "react";
import { Text } from "rebass";

const GasLess = () => {
  const [gasPercent, setGasPercent] = useState(10)
  const [sellable, setSellable] = useState(false)
  return (
    <>
      <InputContainer>
        <Text fontSize={20} ml={3} mb={3}>If gas lower than {gasPercent}% of total purchase</Text>
        <Slider value={gasPercent} onChange={(val: number)=>setGasPercent(val)}  />
        <Text fontSize={20} mt={3} ml={3} mb={2}>On token sells</Text>
        <Checkbox
          className="sellable-checkbox"
          name="sellable"
          type="checkbox"
          checked={sellable}
          onChange={() => setSellable(!sellable)}
          style={{width: "56px"}}
        />
        <AutoRow mt={3}>
          <Text fontSize={20} ml={3}>If owner has more than</Text>
          <input style={{marginLeft: "10px"}} type="number" />
          <Text fontSize={20} ml={1} mr={1}>tokens</Text>
        </AutoRow>
        <Text fontSize={20} mt={3} ml={3} mb={2}>Whitelist wallet address</Text>
        <input style={{marginLeft: "1rem", marginRight: "1rem", height: "100px"}} />
      </InputContainer>
    </>
  )
}

export default GasLess;
