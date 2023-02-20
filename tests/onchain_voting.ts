import * as anchor from "@project-serum/anchor";
import { Program } from "@project-serum/anchor";
import { OnchainVoting } from "../target/types/onchain_voting";


describe("onchain-voting", () => {
  anchor.setProvider(anchor.AnchorProvider.env());
  const program = anchor.workspace.OnchainVoting as Program<OnchainVoting>;
  let voteBank = anchor.web3.Keypair.generate();


  it("Creating vote bank for public to vote", async () => {
    const tx = await program.methods.initVoteBank()
      .accounts({
        voteAccount: voteBank.publicKey,
      })
      .signers([voteBank])
      .rpc();
    console.log("TxHash ::", tx);
  });

  it("Creating second vote bank for public to vote with same pubKey", async () => {
    try{
      const tx = await program.methods.initVoteBank().accounts({voteAccount: voteBank.publicKey,}).signers([voteBank]).rpc();
    console.log("TxHash ::", tx);
    }catch(err){
      console.log("Failed successfully, trying to calling init with same pubKey");
    }
  });


  it("Vote for GM", async () => { 
    const tx = await program.methods.gibVote({gm:{}})
    .accounts({
      voteAccount: voteBank.publicKey,
    })
    .rpc();
    console.log("TxHash ::", tx);


    let voteBankData = await program.account.voteBank.fetch(voteBank.publicKey);
    console.log(`Total GMs :: ${voteBankData.gm}`)
    console.log(`Total GNs :: ${voteBankData.gn}`)
  });


  it("Vote for GN", async () => { 
    const tx = await program.methods.gibVote({gn:{}})
    .accounts({
      voteAccount: voteBank.publicKey,
    })
    .rpc();
    console.log("TxHash ::", tx);


    let voteBankData = await program.account.voteBank.fetch(voteBank.publicKey);
    console.log(`Total GMs :: ${voteBankData.gm}`)
    console.log(`Total GNs :: ${voteBankData.gn}`)
  });
  
  it("Vote for GM", async () => { 
    const tx = await program.methods.gibVote({gm:{}})
    .accounts({
      voteAccount: voteBank.publicKey,
    })
    .rpc();
    console.log("TxHash ::", tx);


    let voteBankData = await program.account.voteBank.fetch(voteBank.publicKey);
    console.log(`Total GMs :: ${voteBankData.gm}`)
    console.log(`Total GNs :: ${voteBankData.gn}`)
  });
});