import {
  connect,
  Contract,
  keyStores,
  utils,
  WalletConnection,
} from "near-api-js";
import * as nearAPI from "near-api-js";
import getConfig from "./config";
import { useState } from "react";

const config = {
  networkId: "testnet",
  keyStore: new keyStores.BrowserLocalStorageKeyStore(),
  // keyStore: new keyStores.,
  nodeUrl: "https://rpc.testnet.near.org",
  walletUrl: "https://wallet.testnet.near.org",
  helperUrl: "https://helper.testnet.near.org",
  explorerUrl: "https://explorer.testnet.near.org",
};

const nearConfig = getConfig(process.env.NODE_ENV || "development");
const GAS = "300000000000000";

export async function initContract() {
  const near = await connect(config);
  window.walletConnection = new WalletConnection(near);

  window.accountId = window.walletConnection.getAccountId();

  window.contract = await new Contract(
    window.walletConnection.account(),
    nearConfig.contractName,
    {
      viewMethods: ["get_nft_id"],

      changeMethods: [
        "metadata_insert",
        "insert_supply_cap",
        "insert_price",
        "insert_royalties",
        "nft_mint_call",
      ],
    }
  );
}

export function logout() {
  window.walletConnection.signOut();
  window.location.replace(window.location.origin + window.location.pathname);
}

export function logIn() {
  window.walletConnection.requestSignIn(nearConfig.contractName);
}

export async function InsertMetadata() {
  const contract = new nearAPI.Contract(
    window.walletConnection.account(),
    nearConfig.contractName,
    {
      viewMethods: ["get_nft_id"],

      changeMethods: ["insert_metadata"],
      sender: window.walletConnection.account(),
    }
  );

  try {
    await contract.insert_metadata({
      args: {
        metadata: {
          test: {
            title: "demo metadata",
            description: "You can purchase this nft on store front",
            media:
              "https://thumbor.forbes.com/thumbor/fit-in/900x510/https://www.forbes.com/advisor/in/wp-content/uploads/2022/03/monkey-g412399084_1280.jpg",
            collection_name: "Test Collection",
          },
        },
      },
    });
  } catch (error) {
    alert(error);
  }
}

export async function GetOwnedNfts() {
  const contract = new nearAPI.Contract(
    window.walletConnection.account(),
    nearConfig.contractName,
    {
      viewMethods: ["nft_tokens_for_owner"],
      sender: window.walletConnection.account(),
    }
  );
  let response = await contract.nft_tokens_for_owner({
    accountId: window.walletConnection.account(),
  });
  return response;
}

//===============================
// export function InsertRoyalities(){
//   const contract = nearAPI.Contract(
//     window.walletConnection.account(),
//     "dev-1657006606247-26998485455046",{
//       ViewMethods: ["get_nft_id"],

//       changeMethods: ["insert_royalities"],
//     }
//   );

//   contract.insert_royalities(
//     args:{

//     }
//   );
// }
// export function AddNftContract(){
//   const contract = nearAPI.Contract(
//     window.walletConnection.account(),
//     "dev-1657006606247-26998485455046",{
//       ViewMethods: ["get_nft_id"],

//       changeMethods: ["add_nft_contract"],
//     }
//   );

//   contract.add_nft_contract(
//     args:{

//     }
//   );
// }

// export function InsertSupplyCap(){
//   const contract = nearAPI.Contract(
//     window.walletConnection.account(),
//     "dev-1657006606247-26998485455046",{
//       ViewMethods: ["get_nft_id"],

//       changeMethods: ["insert_supply_cap"],
//     }
//   );

//   contract.insert_supply_cap(
//     args:{

//     }
//   );
// }

// export function InsertPrice(){
//   const contract = nearAPI.Contract(
//     window.walletConnection.account(),
//     "dev-1657006606247-26998485455046",{
//       ViewMethods: ["get_nft_id"],

//       changeMethods: ["insert_price"],
//     }
//   );

//   contract.insert_price(
//     args:{

//     }
//   );
// }

export async function NftMintCall() {
  const contract = new nearAPI.Contract(
    window.walletConnection.account(),
    nearConfig.contractName,
    {
      changeMethods: ["nft_mint_call"],
      sender: window.walletConnection.account(),
    }
  );
  try {
    await contract.nft_mint_call(
      {
        token_type: "res",
      },
      "300000000000000", // attached GAS (optional)
      "100000000000000000000000" // attached deposit in yoctoNEAR (optional)
    );
  } catch (error) {
    alert(error);
  }
}
