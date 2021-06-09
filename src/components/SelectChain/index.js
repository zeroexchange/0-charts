import React, { useEffect, useState } from 'react'
import styled from 'styled-components'

import Row from '../Row'
import { ChevronDown as Arrow } from 'react-feather'
import { useChainManager } from '../../contexts/LocalStorage'
import { currentChainInStorage } from '../../constants'

const Select = styled.div`
    position: relative;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;

    width: fit-content;
    height: 38px;
    border-radius: 20px;
    font-weight: 500;
    color: ${({ theme }) => theme.text2};   
    :hover {
    cursor: pointer;
    }

    @media screen and (max-width: 40em) {
    display: none;
    }
`
const SelectedChain = styled(Row)`
    color: blue;
`
const BlockItem = styled.div`
    display: flex;
    align-items: flex-end;
    width: 100%;
    
`
const ArrowStyled = styled(Arrow)`
    height: 20px;
    width: 20px;
    margin-left: 6px;
`

const Option = styled(Row)` 
    top: 40px;
    margin-top: 10px;
    :hover {
        color: green;
    }
`

const SelectChain = () => {
    const [showDropdown, toggleDropdown] = useState(false)
    const chainsNames = ['Avalanche', 'Smart Chain', 'Ethereum']
    const [chain, toggleCurrency] = useState(currentChainInStorage)

    let chainsWithoutCurrent = chainsNames.filter(item => item !== chain)
    const switchChain = (chainName) => {
        toggleCurrency(chainName)
        toggleDropdown(!showDropdown)
    }

    // eslint-disable-next-line
    const [currentChain, toggleChain] = useChainManager()
    useEffect(() => {
        if (chain) {
            toggleChain(chain)
        }

    }, [chain, toggleChain])

    return (
        <>
            <Select>
                <Row>
                    Current chain
                </Row>
                <SelectedChain onClick={() => toggleDropdown(!showDropdown)}>
                    {chain} <ArrowStyled />
                </SelectedChain>
                {showDropdown && chainsWithoutCurrent.map((chainName) => (
                    <>
                        <BlockItem>
                            <Option key={chainName}
                                onClick={() => {
                                    switchChain(chainName)
                                }}
                            >
                                {chainName}
                            </Option>
                        </BlockItem>

                    </>
                ))}

            </Select>
        </>
    )
}

export default SelectChain
