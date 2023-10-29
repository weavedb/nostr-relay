const { mkdirSync, writeFileSync, existsSync } = require("fs")
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
const dir = resolve(__dirname, "../.weavedb/accounts")
const dir_weavedb = resolve(__dirname, "../.weavedb")
const dir_evm = resolve(__dirname, "../.weavedb/accounts/evm")
const dir_ar = resolve(__dirname, "../.weavedb/accounts/ar")
const main = async () => {
  for (let v of [dir_weavedb, dir, dir_evm, dir_ar]) {
    try {
      mkdirSync(v)
    } catch (e) {}
  }
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
  const name = "nostr"
  const admin = EthCrypto.createIdentity()
  config.admin = admin.privateKey
  config.rollups.nostr.owner = admin.address.toLowerCase()

  const keyfile = resolve(dir, "evm", `${name}.json`)
  writeFileSync(keyfile, JSON.stringify(admin))

  const arweave = Arweave.init()
  const bundler = await arweave.wallets.generate()
  config.bundler = bundler
  writeFileSync(
    config_path,
    `module.exports = ${JSON.stringify(config, null, 2)}`
  )
  const keyfile2 = resolve(dir, "ar", `${name}.json`)
  writeFileSync(keyfile2, JSON.stringify(bundler))
}

main()
