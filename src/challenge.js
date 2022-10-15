const {
    Connection,
    PublicKey,
    clusterApiUrl,
    LAMPORTS_PER_SOL
} = require("@solana/web3.js");
// 61uirhEr7vxMmTLgXHU9L2rU2gLYb1BgNXXkQZbWby7j
const publicKey = process.argv[process.argv.length - 1];

async function airDrop() {
    const connection = new Connection(clusterApiUrl('devnet'), 'confirmed');
    const fromAirDropSignature = await connection.requestAirdrop(
        new PublicKey(publicKey),
        2 * LAMPORTS_PER_SOL
    );
    await connection.confirmTransaction(fromAirDropSignature);
}

async function checkBalance() {
    const connection = new Connection(clusterApiUrl('devnet'), 'confirmed');
    const balance = await connection.getBalance(
        new PublicKey(publicKey)
    )
    console.log('Balance', balance / LAMPORTS_PER_SOL);
}

const main = async () => {
    await airDrop();
    await checkBalance();
}

main().then().catch();
