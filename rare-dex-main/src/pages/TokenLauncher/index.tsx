import { AutoRow } from "components/Row";
import { Checkbox } from "components/SearchModal/styleds";
import React, { useContext, useState } from "react";
import { Text } from "rebass";
import { TYPE, CloseIcon } from 'theme';
import styled, { ThemeContext } from "styled-components";
import InputLayout from "./InputLayout";
import "./style.scss"
import HackenIcon from '../../assets/svg/hacken-io-logo.svg';
import DropDown from "components/DropDown";
import { AutoColumn } from "components/Column";
import { ButtonPrimary } from "components/Button";

export const InputContainer = styled.div`
  padding: 24px 16px;
  margin: 24px 16px;
  border-radius: 1.6rem;
  display: flex;
  flex-direction: column;
  justify-content: left;
  align-items: left;
  width: 80%;
  background-color: ${({ theme }) => theme.bg6};
  box-shadow: 0 0 0.25rem #fff, inset 0 0 0.25rem #fff, 0 0 1rem #00e5ff, inset 0 0 1rem #00e5ff, 0 0 2rem #00e5ff, inset 0 0 2rem #00e5ff;
`;
const InputGroups = styled.div`
  display: grid;
  grid-template-columns: 50% 50%;
  ${({ theme }) => theme.mediaWidth.upToSmall`
    grid-template-columns: auto;
  `};
`
const TokenLauncher = () => {
  // @ts-ignore
  const theme = useContext(ThemeContext);
  const [tokenName, setTokenName] = useState('')
  const [tokenSymbol, setTokenSymbol] = useState('')
  const [tokenSupply, setTokenSupply] = useState('')
  const [burnable, setBurnable] = useState(false)
  const [mintable, setMintable] = useState(false)
  const [auditable, setAuditable] = useState(false)
  const [tokenOwner, setTokenOwner] = useState('')
  const [adminWallet, setAdminWallet] = useState('')
  const [recoveryAdminWallet, setRecoveryAdminWallet] = useState('')

  const [mfeeWallet, setmFeeWallet] = useState('')
  const [afeeWallet, setaFeeWallet] = useState('')
  const [gfeeWallet, setgFeeWallet] = useState('')

  const [mfeeAmount, setmFeeAmount] = useState('')
  const [afeeAmount, setaFeeAmount] = useState('')
  const [gfeeAmount, setgFeeAmount] = useState('')
  const [showDropDown, setShowDropDown] = useState(false)
  const [selectValue, setSelectValue] = useState('');
  const values = () => {
    return ["24 hours", "36 hours", "48 hours"];
  };
  /**
   * Toggle the drop down menu
   */
   const toggleDropDown = () => {
    setShowDropDown(!showDropDown);
  };
   /**
   * Hide the drop down menu if click occurs
   * outside of the drop-down element.
   *
   * @param event  The mouse event
   */
    const dismissHandler = (event: React.FocusEvent<HTMLButtonElement>): void => {
      if (event.currentTarget === event.target) {
        setShowDropDown(false);
      }
    };
      /**
       * Callback function to consume the
       * city name from the child component
       *
       * @param city  The selected city
       */
      const valueSelection = (value: string): void => {
        setSelectValue(value);
      };
  return (
    <>
      <InputContainer>
        <Text fontWeight={700} fontSize={22} color={theme.text1}>
          Token Details
        </Text>
        <div style={{marginTop: "16px"}}>
          <Text>Token Type</Text>
          <div style={{display: "flex"}}>
            <AutoRow justify="left" style={{ cursor: 'pointer', width: "120px" }} onClick={() => setMintable(!mintable)}>
              <Checkbox
                className="mintable-checkbox"
                name="mintable"
                type="checkbox"
                checked={mintable}
                onChange={() => setMintable(!mintable)}
              />
              <TYPE.body ml="10px" fontSize="16px" color={theme.text2} fontWeight={500}>
                Mintable
              </TYPE.body>
            </AutoRow>
            <AutoRow justify="left" style={{ cursor: 'pointer', width: "120px" }} onClick={() => setBurnable(!burnable)}>
              <Checkbox
                className="burnable-checkbox"
                name="burnable"
                type="checkbox"
                checked={burnable}
                onChange={() => setBurnable(!burnable)}
              />
              <TYPE.body ml="10px" fontSize="16px" color={theme.text2} fontWeight={500}>
                Burnable
              </TYPE.body>
            </AutoRow>
            
          </div>
        </div>
        <Text mt={3} color={theme.text2}>
          Please enter some basic information about your new token.
        </Text>
        <InputGroups>
          <InputLayout id="token-name" value={tokenName} label="Token Name" desc="Create a name for your token. (Alphanumeric characters only.)" onChange={(val: string) => {setTokenName(val);}}/>
          <InputLayout id="token-symbol" value={tokenSymbol} label="Token Symbol Ticker" desc="Create a unique symbol ticker for your token. (Alphanumeric characters only.)" onChange={(val) => {setTokenSymbol(val)}}/>
          <InputLayout id="token-supply" value={tokenSupply} label="Total Token Supply" desc="Enter the total supply of your new token. All tokens created on contract deployment will be transferred to the owner’s wallet." onChange={(val) => {setTokenSupply(val)}}/>
        </InputGroups>

      </InputContainer>
      <InputContainer>
        <Text fontWeight={700} fontSize={22} color={theme.text1}>
          Token Ownership Information
        </Text>
        <InputGroups>
          <InputLayout id="token-owner" value={tokenOwner} label="Token Owner" desc="The token owner’s wallet is the project owner’s main wallet, used to sign the smart contract transaction and receive the minted tokens." onChange={(val: string) => {setTokenOwner(val)}}/>
          <InputLayout id="admin-wallet" value={adminWallet} label="Admin Wallet" desc="The admin wallet is the project owner’s administrative wallet address, used for interactions with the Lossless protocol and governance bodies." onChange={(val: string) => {setAdminWallet(val);}}/>
          <InputLayout id="recovery-admin-wallet" value={recoveryAdminWallet} label="Recovery Admin Wallet" desc="The recovery admin wallet is the project owner’s recovery wallet address used to change the admin wallet. Multisignature authentication is advised to keep it as secure as possible." onChange={(val: string) => {setRecoveryAdminWallet(val);}}/>
        </InputGroups>
        {/* <button
          className={showDropDown ? "active" : undefined}
          onClick={(): void => toggleDropDown()}
          onBlur={(e: React.FocusEvent<HTMLButtonElement>): void =>
            dismissHandler(e)
          }
        >
        <input value={selectValue}/>
        {showDropDown && (
          <DropDown
            values={values()}
            showDropDown={false}
            toggleDropDown={(): void => toggleDropDown()}
            valueSelection={valueSelection}
          />
        )}
        </button> */}
      </InputContainer>
      <InputContainer>
        <Text fontWeight={700} fontSize={22} color={theme.text1}>
          Fee Infomation
        </Text>
        <InputGroups>
          <InputLayout id="fee-wallet-1" value={mfeeWallet} label="Fee Wallet #1" desc="Fee Wallet Address." onChange={(val: string) => {setmFeeWallet(val);}}/>
          <InputLayout id="fee-amount-1" value={mfeeAmount} label="Fee Amount #1" desc="Fee Wallet Amount." onChange={(val: string) => {setmFeeAmount(val);}}/>

          <InputLayout id="fee-wallet-2" value={afeeWallet} label="Fee Wallet #2" desc="Fee Wallet Address." onChange={(val: string) => {setaFeeWallet(val);}}/>
          <InputLayout id="fee-amount-2" value={afeeAmount} label="Fee Amount #2" desc="Fee Wallet Amount." onChange={(val: string) => {setaFeeAmount(val);}}/>

          <InputLayout id="fee-wallet-3" value={gfeeWallet} label="Fee Wallet #3" desc="Fee Wallet Address." onChange={(val: string) => {setgFeeWallet(val);}}/>
          <InputLayout id="fee-amount-3" value={gfeeAmount} label="Fee Amount #3" desc="Fee Wallet Amount." onChange={(val: string) => {setgFeeAmount(val);}}/>
        </InputGroups>

      </InputContainer>
      <InputContainer>
        <AutoRow justify="space-between">
          <Text fontWeight={700} fontSize={26}>Automated Audit by Hacken</Text>
          <img src={HackenIcon} width={80} height={80} alt="hacken logo"/>
        </AutoRow>
        <Text>
          Reap the benefits of our partnerships - audit your minted tokens with Hacken for $1000 instead of the original $7000 price tag.
        </Text>
        <Text fontWeight={700} mt={3}>
          All audits are carried out by Hacken themselves. They will get in touch with you directly via email. Note, KYC required.
        </Text>
        <AutoRow justify="left" style={{ cursor: 'pointer', marginTop: "32px" }} onClick={() => setAuditable(!auditable)}>
          <Checkbox
            className="auditable-checkbox"
            name="auditable"
            type="checkbox"
            checked={auditable}
            onChange={() => setAuditable(!auditable)}
          />
          <TYPE.body ml="10px" fontSize="16px" color={theme.text2} fontWeight={500}>
            Discounted Audit Report by Hacken
          </TYPE.body>
        </AutoRow>
      </InputContainer>
      <InputContainer>
        <Text fontWeight={700} fontSize={26}>Ready to deploy?</Text>
        <Text mt={4}>
          Please review the costs and the information you have provided before deploying.
        </Text>
        <ButtonPrimary mt={3}>Deploy</ButtonPrimary>
      </InputContainer>
    </>
  )
}

export default TokenLauncher;
