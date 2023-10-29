const { writeFileSync, existsSync } = require("fs")
const { resolve } = require("path")
const EthCrypto = require("eth-crypto")
const Arweave = require("arweave")

const config_path = resolve(
  __dirname,
  "../grpc-node/node-server/weavedb.standalone.config.js"
)
if (existsSync(config_path)) {
  console.log("config already exists")
  process.exit()
}

const main = async () => {
  let config = {
    nostr: { db: "nostr" },
    rollups: {
      nostr: {
        name: "Jots Nostr",
        plugins: { notifications: {} },
        tick: 1000 * 60 * 5,
        initial_state: { nostr: "nostr_events" },
        app: "https://localhost:3000",
      },
    },
  }
  const admin = EthCrypto.createIdentity()
  config.admin = admin.privateKey
  config.rollups.nostr.owner = admin.address
  const arweave = Arweave.init()
  const bundler = await arweave.wallets.generate()
  config.bundler = bundler
  writeFileSync(
    config_path,
    `module.exports = ${JSON.stringify(config, null, 2)}`
  )
}

main()
