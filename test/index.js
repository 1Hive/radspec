import test from "ava";
import { ethers } from "ethers";
import { evaluate } from "../src";

const XDAI_ENDPOINT = "https://rpc.xdaichain.com";

test("radspec#evaluate json abi", async (t) => {
  const expression = "Will multiply `a` by 7 and return `a * 7`.";
  const call = {
    abi: [
      {
        name: "multiply",
        constant: false,
        type: "function",
        inputs: [
          {
            name: "a",
            type: "uint256",
          },
        ],
        outputs: [
          {
            name: "d",
            type: "uint256",
          },
        ],
      },
    ],
    transaction: {
      to: "0x8521742d3f456BD237E312d6E30724960f72517A",
      data: "0xc6888fa1000000000000000000000000000000000000000000000000000000000000007a",
    },
  };

  t.is(
    await evaluate(expression, call),
    "Will multiply 122 by 7 and return 854."
  );
});

test("radspec#evaluate Human-Readable abi", async (t) => {
  const expression = "Will multiply `a` by 7 and return `a * 7`.";
  const call = {
    abi: ["function multiply(uint256 a) public view returns(uint256)"],
    transaction: {
      to: "0x8521742d3f456BD237E312d6E30724960f72517A",
      data: "0xc6888fa1000000000000000000000000000000000000000000000000000000000000007a",
    },
  };

  t.is(
    await evaluate(expression, call),
    "Will multiply 122 by 7 and return 854."
  );
});

// TODO: include userFunctions test
// test("radspec#evaluate Helper userFunctions", async (t) => {
//   const expression = null;
//   const call = {
//     abi: [
//       "function stakeToProposal(uint256 _proposalId, uint256 _amount) external",
//     ],
//     transaction: {
//       to: "0x0b21081c6f8b1990f53fc76279cc41ba22d7afe2",
//       data: "0xfc3700510000000000000000000000000000000000000000000000000000000000000042000000000000000000000000000000000000000000000002a48286b8d60482b9",
//     },
//   };

//   const options = {
//     provider: new ethers.providers.StaticJsonRpcProvider(XDAI_ENDPOINT),
//     userFunctions: {
//       "stakeToProposal(uint256,uint256)":
//         "Stake `@tokenAmount((self.stakeToken(): address), _amount)` on proposal #`_proposalId`",
//     },
//   };

//   t.is(
//     await evaluate(expression, call, options),
//     "Stake 48.747673445034394297 on proposal #66"
//   );
// });
