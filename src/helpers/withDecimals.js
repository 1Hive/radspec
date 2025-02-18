import { BigNumber } from 'ethers'
import { formatBN, tenPow } from './lib/formatBN'

export default () =>
  /**
   * Format an numerical amount with its decimals
   *
   * @param {*} amount The absolute amount, without any decimals.
   * @param decimals The number of decimal places to format to. Defaults to 18.
   * @return {Promise<radspec/evaluator/TypedValue>}
   */
  async (amount, decimals = 18) => {
    const amountBn = BigNumber.from(amount)

    const formattedAmount = formatBN(amountBn, tenPow(decimals), Number(decimals), false)

    return {
      type: 'string',
      value: formattedAmount
    }
  }
