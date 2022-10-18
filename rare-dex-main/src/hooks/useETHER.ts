import { ETHERs } from "@uniswap/sdk"
import { useActiveWeb3React } from "hooks"

const useETHER = () => {
    const { chainId } = useActiveWeb3React()
    return ETHERs[Number(chainId)]
}

export default useETHER
