import Head from "next/head"
import { addIndex, map } from "ramda"
import {
  Input,
  Textarea,
  Box,
  Flex,
  ChakraProvider,
  Image,
} from "@chakra-ui/react"

export default function Home() {
  return (
    <>
      <Flex justify="center" w="100%">
        <Flex p={4} direction="column" maxW="1200px" w="100%">
          <Flex>
            <Flex align="center">
              <Image src="/logo.png" boxSize="25px" />
              <Box mx={2} fontWeight="bold" color="#555">
                WeaveDB as a Nostr Relay
              </Box>
            </Flex>
            <Box flex={1} />
            <Flex align="center" mr={6} display={["none", null, null, "flex"]}>
              <Box mx={2} as="a" href="#censorship-resistance">
                Censorship Resistance
              </Box>
              <Box mx={2} as="a" href="#how-it-works">
                How it Works
              </Box>
              <Box mx={2} as="a" href="#development">
                Development
              </Box>
              <Box mx={2} as="a" href="#queries">
                Queries
              </Box>
              <Box mx={2} as="a" href="#clients">
                Clients
              </Box>
            </Flex>
            <Flex align="center" mx={4} fontSize="25px">
              <Box as="a" href="https://twitter.com/weave_db" target="_blank">
                <Box
                  as="i"
                  className="fab fa-twitter"
                  sx={{ cursor: "pointer", ":hover": { opacity: 0.75 } }}
                />
              </Box>
              <Box
                as="a"
                href="https://github.com/weavedb/nostr-relay"
                target="_blank"
              >
                <Box
                  as="i"
                  className="fab fa-github"
                  ml={3}
                  sx={{ cursor: "pointer", ":hover": { opacity: 0.75 } }}
                />
              </Box>
            </Flex>
          </Flex>
          <Flex w="100%" pt="20px" pb="50px" wrap="wrap">
            <Flex
              flex={["auto", null, null, null, 1]}
              w="100%"
              direction="column"
              justify="center"
              align="flex-start"
            >
              <Box p={6} w="100%">
                <Box
                  fontWeight="bold"
                  fontSize={["40px", "50px", "70px"]}
                  color="#9543DC"
                  textAlign="center"
                >
                  Nostr Relay++
                </Box>
                <Box
                  fontSize={["20px", "22px", "25px"]}
                  fontWeight="bold"
                  color="#555"
                  textAlign="center"
                >
                  powered by Decentralized Database
                </Box>
                <Flex mt={6} justify="center">
                  <Flex
                    mx={2}
                    w="150px"
                    bg="#9543DC"
                    color="white"
                    p={2}
                    justify="center"
                    onClick={() => alert("Managed Relay coming soon!")}
                    sx={{
                      borderRadius: "50px",
                      cursor: "pointer",
                      ":hover": { opacity: 0.75 },
                    }}
                  >
                    Deploy Relay
                  </Flex>
                  <Flex
                    mx={2}
                    w="150px"
                    bg="#9543DC"
                    color="white"
                    p={2}
                    justify="center"
                    sx={{
                      borderRadius: "50px",
                      cursor: "pointer",
                      ":hover": { opacity: 0.75 },
                    }}
                  >
                    Get Started
                  </Flex>
                </Flex>
              </Box>
            </Flex>
            <Flex flex={1} direction="column" justify="center" fontSize="14px">
              <Box mt={2} mx={2} fontWeight="bold" color="#9543DC">
                Deploy a Nostr Relay (Docker Compose & NodeJS required)
              </Box>
              <Flex w="100%">
                <Box
                  flex={1}
                  m={2}
                  as="code"
                  style={{ borderRadius: "5px" }}
                  color="white"
                  bg="#2B2B2B"
                  p={4}
                >
                  <Box>
                    <Box as="span" color="#BC98FB">
                      git
                    </Box>{" "}
                    clone https://github.com/weavedb/nostr-relay.git
                  </Box>
                  <Box>
                    <Box as="span" color="#BC98FB">
                      cd
                    </Box>{" "}
                    nostr-relay &&{" "}
                    <Box as="span" color="#BC98FB">
                      yarn
                    </Box>
                  </Box>
                  <Box>
                    <Box as="span" color="#BC98FB">
                      yarn
                    </Box>{" "}
                    gen-config &&{" "}
                    <Box as="span" color="#BC98FB">
                      yarn
                    </Box>{" "}
                    run-relay
                  </Box>
                </Box>
              </Flex>
              <Box mx={2} fontWeight="bold" color="#9543DC" mt={2}>
                Set up and Run a Nostr Client
              </Box>
              <Flex w="100%">
                <Box
                  flex={1}
                  m={2}
                  as="code"
                  style={{ borderRadius: "5px" }}
                  color="white"
                  bg="#2B2B2B"
                  p={4}
                >
                  <Box>
                    <Box as="span" color="#BC98FB">
                      cd
                    </Box>{" "}
                    nostr-relay &&{" "}
                    <Box as="span" color="#BC98FB">
                      yarn
                    </Box>{" "}
                    setup
                  </Box>
                  <Box>
                    <Box as="span" color="#BC98FB">
                      cd
                    </Box>{" "}
                    client &&{" "}
                    <Box as="span" color="#BC98FB">
                      yarn
                    </Box>{" "}
                    dev
                  </Box>
                </Box>
              </Flex>
              <Box mx={2} mt={2}>
                Now a Nostr client is running at{" "}
                <Box
                  fontWeight="bold"
                  as="a"
                  href="http://localhost:3000"
                  target="_blank"
                  color="#9543DC"
                >
                  localhost:3000
                </Box>
                .
              </Box>
              <Box mx={2} mt={2}>
                View events on WeaveDB Scan at{" "}
                <Box
                  as="a"
                  fontWeight="bold"
                  target="_blank"
                  href="https://scan.weavedb.dev/node/localhost/db/nostr"
                  color="#9543DC"
                >
                  scan.weavedb.dev/node/localhost/db/nostr
                </Box>
                .
              </Box>
            </Flex>
          </Flex>
          <Flex justify="center" id="censorship-resistance">
            <Box
              fontWeight="bold"
              fontSize="30px"
              color="#9543DC"
              textAlign="center"
            >
              WeaveDB Enables True Censorship-Resistance for Nostr
            </Box>
          </Flex>
          <Flex width="100%" wrap="wrap" justify="center" py={4}>
            {map(v => {
              return (
                <Flex
                  m={4}
                  bg="#F6F6F7"
                  direction="column"
                  width="350px"
                  sx={{ borderRadius: "10px" }}
                  p={4}
                >
                  <Box>
                    <Flex
                      justify="center"
                      align="center"
                      boxSize="30px"
                      bg="#ddd"
                      mb={2}
                      mx={1}
                      sx={{ borderRadius: "3px" }}
                    >
                      <Box as="i" className={v.icon} />
                    </Flex>
                  </Box>
                  <Box fontSize="20px" fontWeight="bold" ml={2} color="#9543DC">
                    {v.title}
                  </Box>
                  <Box p={2} fontSize="14px">
                    {v.body}
                  </Box>
                </Flex>
              )
            })([
              {
                title: "Data Permanency",
                body: "Events are stored on the Arweave permanent storage, which makes Nostr truly censorship resistant. Your data will not be lost even all relays shut down.",
                icon: "fas fa-database",
              },
              {
                title: "Lightning Performance",
                body: "WeaveDB is the one and only fully decentralized DB with web2 performance. Each DB is a high performance app-specific rollup to Arweave. And queries are served via gRPC.",
                icon: "fas fa-bolt",
              },
              {
                title: "Indefinite Scalability",
                body: "WeaveDB stores data on Arweave, which is indefinetely scalable. Arweave gateways guarantee accessibility and liveness of the data independent of Nostr relays.",
                icon: "fas fa-expand-alt",
              },
              {
                title: "Smart Contracts",
                body: "WeaveDB is a smart contract database, which transforms raw Nostr events into more structured collections. You can apply advanced logic to suit your applicaiton needs.",
                icon: "fas fa-code",
              },
              {
                title: "Onchain Composability",
                body: "Nostr events are stored as smart contract states, which means now Nostr is composable with other onchain protocols. This opens up countless possibilities for Nostr.",
                icon: "fas fa-cubes",
              },
              {
                title: "Media Uploads",
                body: "Irys enables easy media uploads to the Arweave permanent storage. Any kinds of media files such as images, audios and videos are also censorship resistant with WeaveDB.",
                icon: "fas fa-photo-video",
              },
            ])}
          </Flex>
          <Flex
            w="100%"
            p={4}
            justify="center"
            align="center"
            id="how-it-works"
            wrap="wrap"
          >
            <Flex
              w={["100%", null, null, "auto"]}
              flex={["auto", null, null, 1]}
              pr={[0, null, null, "30px"]}
              mb={[8, null, null, 0]}
            >
              <Box w="100%">
                <Flex
                  mb={6}
                  w="100%"
                  fontWeight="bold"
                  fontSize="30px"
                  color="#004874"
                >
                  How it Works
                </Flex>
                <Box>
                  {addIndex(map)((v, i) => (
                    <Flex align="center" mb={6}>
                      <Flex
                        bg="#004874"
                        color="white"
                        boxSize="25px"
                        fontSize="10px"
                        sx={{ borderRadius: "50%" }}
                        justify="center"
                        align="center"
                      >
                        {i + 1}
                      </Flex>
                      <Box mx={3}>{v}</Box>
                    </Flex>
                  ))([
                    "WeaveDB Relay receives raw Nostr events.",
                    "Events are transformed into collections by smart contract logic.",
                    "Data are bundled up and stored permanently on Arweave.",
                    "Clients fetch data with sophisticated queries via gRPC.",
                    "Regular Nostr queries via web sockets are still possible.",
                    "Media files are also permanently stored and censorship resistant.",
                    "Super advanced app logic for clients can be built all onchain.",
                  ])}
                </Box>
                <Flex justify="center">
                  <Box
                    mx={2}
                    w="350px"
                    bg="#004874"
                    color="white"
                    p={2}
                    justifyContent="center"
                    display="flex"
                    target="_blank"
                    href="https://twitter.com/weave_db/status/1717415538417410336"
                    as="a"
                    sx={{
                      borderRadius: "50px",
                      cursor: "pointer",
                      ":hover": { opacity: 0.75 },
                    }}
                  >
                    Our Talk at BTC/Arweave Conference
                  </Box>
                </Flex>
              </Box>
            </Flex>
            <Flex flex={1} direction="column" justify="center" pl="30px">
              <Image src="/relay.png" />
            </Flex>
          </Flex>
          <Flex
            w="100%"
            p={4}
            justify="center"
            align="center"
            id="development"
            wrap="wrap"
          >
            <Flex
              flex={1}
              direction="column"
              justify="center"
              pr="30px"
              w={["100%", null, null, "auto"]}
              flex={["auto", null, null, 1]}
              pr={[0, null, null, "30px"]}
              mb={[8, null, null, 0]}
            >
              <Image src="/explorer.png" />
            </Flex>
            <Flex flex={1} pl="30px">
              <Box w="100%">
                <Flex
                  mb={6}
                  w="100%"
                  fontWeight="bold"
                  fontSize="30px"
                  color="#9543DC"
                >
                  Simple Dapp Development
                </Flex>
                <Box>
                  {addIndex(map)((v, i) => (
                    <Flex align="center" mb={6}>
                      <Flex
                        bg="#9543DC"
                        color="white"
                        boxSize="25px"
                        fontSize="10px"
                        sx={{ borderRadius: "50%" }}
                        justify="center"
                        align="center"
                      >
                        {i + 1}
                      </Flex>
                      <Box mx={3}>{v}</Box>
                    </Flex>
                  ))([
                    "Everything is just simple JSON in WeaveDB.",
                    "WeaveDB comes with CL tools and no-code web console.",
                    "FPJSON allows highly advanced logic on data manipulation.",
                    "WeaveDB blockchain explorer works as Nostr Event scan.",
                  ])}
                </Box>
                <Flex justify="center">
                  <Box
                    mx={2}
                    w="300px"
                    bg="#9543DC"
                    color="white"
                    p={2}
                    justifyContent="center"
                    display="flex"
                    target="_blank"
                    href="https://weavedb.dev"
                    as="a"
                    sx={{
                      borderRadius: "50px",
                      cursor: "pointer",
                      ":hover": { opacity: 0.75 },
                    }}
                  >
                    Go to WeaveDB
                  </Box>
                </Flex>
              </Box>
            </Flex>
          </Flex>
          <Flex
            id="queries"
            mt={6}
            w="100%"
            fontWeight="bold"
            fontSize="30px"
            color="#FF5F56"
            justify="center"
          >
            Powerful Queries for Nostr Clients
          </Flex>
          <Flex justify="center" my={3}>
            DB indexers are all onchain, which provides permanent APIs to client
            dapps.
          </Flex>
          <Flex justify="center">
            <Image src="/code.png" maxW="750px" w="100%" />
          </Flex>
          <Flex
            w="100%"
            p={4}
            justify="center"
            align="center"
            my={6}
            id="clients"
            wrap="wrap"
          >
            <Flex
              flex={1}
              pr="30px"
              w={["100%", null, null, "auto"]}
              flex={["auto", null, null, 1]}
              pr={[0, null, null, "30px"]}
              mb={[8, null, null, 0]}
            >
              <Box w="100%">
                <Flex
                  mb={6}
                  w="100%"
                  fontWeight="bold"
                  fontSize="30px"
                  color="#0573CE"
                >
                  Full Onchain Nostr Dapps
                </Flex>
                <Box>
                  {addIndex(map)((v, i) => (
                    <Flex align="center" mb={6}>
                      <Flex
                        bg="#0573CE"
                        color="white"
                        boxSize="25px"
                        fontSize="10px"
                        sx={{ borderRadius: "50%" }}
                        justify="center"
                        align="center"
                      >
                        {i + 1}
                      </Flex>
                      <Box mx={3}>{v}</Box>
                    </Flex>
                  ))([
                    "WeaveDB is a smart contract DB with a powerful DSL.",
                    "Transform Nostr events any way you want with powerfull utilities.",
                    "All the app logic is fully onchain defined by smart contract.",
                    "Apps are even composable with other blockchains via relayers.",
                    "Deploy your own client with one click DB fork.",
                  ])}
                </Box>
                <Flex justify="center">
                  <Box
                    mx={2}
                    w="300px"
                    bg="#0573CE"
                    color="white"
                    p={2}
                    justifyContent="center"
                    display="flex"
                    target="_blank"
                    href="https://jots.social"
                    as="a"
                    sx={{
                      borderRadius: "50px",
                      cursor: "pointer",
                      ":hover": { opacity: 0.75 },
                    }}
                  >
                    Go to Jots Social for Nostr
                  </Box>
                </Flex>
              </Box>
            </Flex>
            <Flex flex={1} direction="column" justify="center" pl="30px">
              <Image src="/jots.png" />
            </Flex>
          </Flex>
          <Flex pb={4} justify="center">
            <Box ml={1} as="a" href="https://twitter.com/weave_db">
              powered by WeaveDB
            </Box>
          </Flex>
        </Flex>
      </Flex>
    </>
  )
}
