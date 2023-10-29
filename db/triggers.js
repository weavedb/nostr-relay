const db = {
  inc: n => {
    return { __op: "inc", n }
  },
  ts: () => {
    return { __op: "ts" }
  },
  del: () => {
    return { __op: "del" }
  },
}

module.exports = {
  nostr_events: [
    {
      key: "nostr_events",
      on: "create",
      version: 2,
      func: [
        [
          "if",
          ["equals", 1, "$data.after.kind"],
          [
            "[]",
            ["=$tags", ["defaultTo", [], "$data.after.tags"]],
            [
              "=$mentions",
              [
                [
                  "pipe",
                  ["filter", ["propSatisfies", ["equals", "p"], 0]],
                  ["map", ["nth", 1]],
                ],
                "$tags",
              ],
            ],
            [
              "=$etags",
              [["filter", ["propSatisfies", ["equals", "e"], 0]], "$tags"],
            ],
            [
              "=$quote_tags",
              [
                [
                  "pipe",
                  ["filter", ["propSatisfies", ["equals", "mention"], 3]],
                  ["map", ["nth", 1]],
                ],
                "$etags",
              ],
            ],
            [
              "=$repost",
              [
                "if",
                ["isEmpty", "$quote_tags"],
                "",
                "else",
                ["head", "$quote_tags"],
              ],
            ],
            ["=$no_quote", ["isEmpty", "$repost"]],
            ["=$quote", "!$no_quote"],
            [
              "set()",
              [
                {
                  id: "$data.id",
                  owner: "$data.after.pubkey",
                  type: "status",
                  description: "$data.after.content",
                  date: "$data.after.created_at",
                  repost: "$repost",
                  reply_to: "",
                  reply: false,
                  quote: "$quote",
                  parents: [],
                  hashes: [],
                  mentions: "$mentions",
                  likes: 0,
                  reposts: 0,
                  quotes: 0,
                  comments: 0,
                },
                "posts",
                "$data.id",
              ],
            ],
          ],
        ],
        [
          "if",
          ["equals", 0, "$data.after.kind"],
          [
            "[]",
            ["=$profile", ["parse()", "$data.after.content"]],
            ["=$old_profile", ["get()", ["users", "$data.id"]]],
            ["=$new_profile", { address: "$data.after.pubkey" }],
            [
              "if",
              "x$old_profile",
              [
                "[]",
                ["=$new_profile.followers", 0],
                ["=$new_profile.following", 0],
              ],
            ],
            ["if", "o$profile.name", ["=$new_profile.name", "$profile.name"]],
            ["=$new_profile.description", ["defaultTo", "", "$profile.about"]],
            [
              "if",
              "o$profile.picture",
              ["=$new_profile.image", "$profile.picture"],
            ],
            [
              "if",
              "o$profile.banner",
              ["=$new_profile.cover", "$profile.banner"],
            ],
            ["upsert()", ["$new_profile", "users", "$data.after.pubkey"]],
          ],
        ],
      ],
    },
  ],
  posts: [
    {
      key: "del_timeline",
      version: 2,
      on: "update",
      func: [
        ["=$is_delete", ["isNil", "$data.after.date"]],
        ["=$tl", ["get()", "tl", ["timeline", "$data.after.id"]]],
        [
          "when",
          ["both", ["always", "$is_delete"], ["always", "o$tl"]],
          ["toBatch", ["delete", "timeline", "$data.after.id"]],
          "$data",
        ],
      ],
    },
    {
      key: "timeline",
      version: 2,
      on: "create",
      func: [
        [
          "=$aid",
          [
            "when",
            ["isEmpty"],
            ["always", "$data.after.id"],
            "$data.after.repost",
          ],
        ],
        [
          "=$receive_id",
          [
            [
              "ifElse",
              [
                "either",
                ["propSatisfies", ["isNil"], "description"],
                ["propSatisfies", ["isNil"], "repost"],
              ],
              ["always", "$aid"],
              ["prop", "id"],
            ],
            "$data.after",
          ],
        ],
        [
          "=$rid",
          [
            [
              "ifElse",
              ["propSatisfies", ["isEmpty"], "repost"],
              ["always", ""],
              ["prop", "id"],
            ],
            "$data.after",
          ],
        ],
        [
          "=$followers",
          [
            "get()",
            ["follows", ["to", "==", "$data.after.owner"], ["last", "desc"]],
          ],
        ],
        ["=$received", ["get()", ["timeline", ["aid", "==", "$receive_id"]]]],
        [
          "=$receivers",
          [["compose", ["flatten"], ["pluck", "broadcast"]], "$received"],
        ],
        ["=$new_receivers", ["pluck", "from", "$followers"]],
        ["=$to", ["difference", "$new_receivers", "$receivers"]],
        ["=$to_not_empty", [["complement", ["isEmpty"]], "$to"]],
        [
          "=$set_timeline",
          [
            [
              "both",
              ["pathEq", ["after", "reply_to"], ""],
              ["always", "$to_not_empty"],
            ],
            "$data",
          ],
        ],
        [
          "when",
          ["always", "$set_timeline"],
          [
            "toBatch",
            [
              "set",
              {
                rid: "$rid",
                aid: "$aid",
                date: "$data.after.date",
                broadcast: "$to",
              },
              "timeline",
              "$data.after.id",
            ],
          ],
          "$data",
        ],
      ],
    },
    {
      key: "last",
      version: 2,
      on: "create",
      func: [
        [
          "=$aid",
          [
            "when",
            ["isEmpty"],
            ["always", "$data.after.repost"],
            "$data.after.reply_to",
          ],
        ],
        ["if", ["equals", "", "$aid"], ["break"]],
        ["=$post", ["get()", ["posts", "$aid"]]],
        ["=$docid", ["join", ":", ["$data.after.owner", "$post.owner"]]],
        ["=$following", ["get()", ["follows", "$docid"]]],
        [
          "if",
          "o$following",
          ["update()", [{ last: db.ts() }, "follows", "$docid"]],
        ],
      ],
    },
    {
      key: "inc_reposts",
      version: 2,
      on: "update",
      func: [
        [
          "if",
          ["equals", 1, "$data.after.kind"],
          [
            "[]",
            ["=$tags", ["defaultTo", [], "$data.after.tags"]],
            [
              "=$mentions",
              [
                [
                  "pipe",
                  ["filter", ["propSatisfies", ["equals", "p"], 0]],
                  ["map", ["nth", 1]],
                ],
                "$tags",
              ],
            ],
            [
              "=$etags",
              [["filter", ["propSatisfies", ["equals", "e"], 0]], "$tags"],
            ],
            [
              "=$quote_tags",
              [
                [
                  "pipe",
                  ["filter", ["propSatisfies", ["equals", "mention"], 3]],
                  ["map", ["nth", 1]],
                ],
                "$etags",
              ],
            ],
            [
              "=$repost",
              [
                "if",
                ["isEmpty", "$quote_tags"],
                "",
                "else",
                ["head", "$quote_tags"],
              ],
            ],
            ["=$no_quote", ["isEmpty", "$repost"]],
            ["=$quote", "!$no_quote"],

            [
              "=$reply_tags",
              [
                [
                  "pipe",
                  ["filter", ["propSatisfies", ["equals", "reply"], 3]],
                  ["map", ["nth", 1]],
                ],
                "$etags",
              ],
            ],
            [
              "=$reply_to",
              [
                "if",
                ["isEmpty", "$reply_tags"],
                "",
                "else",
                ["last", "$reply_tags"],
              ],
            ],
            ["=$no_reply", ["isEmpty", "$reply_to"]],
            ["=$is_mark", "!$no_reply"],
            [
              "if",
              "$no_reply",
              [
                "[]",
                [
                  "=$reply_tags",
                  [
                    [
                      "pipe",
                      ["filter", ["propSatisfies", ["equals", "root"], 3]],
                      ["map", ["nth", 1]],
                    ],
                    "$etags",
                  ],
                ],
                [
                  "=$reply_to",
                  [
                    "if",
                    ["isEmpty", "$reply_tags"],
                    "",
                    "else",
                    ["last", "$reply_tags"],
                  ],
                ],
              ],
            ],
            ["=$no_reply", ["isEmpty", "$reply_to"]],
            ["=$is_mark", "!$no_reply"],
            [
              "if",
              "$no_reply",
              [
                "[]",
                [
                  "=$reply_tags",
                  [
                    [
                      "pipe",
                      [
                        "filter",
                        [
                          "propSatisfies",
                          ["either", ["equals", ""], ["isNil"]],
                          3,
                        ],
                      ],
                      ["map", ["nth", 1]],
                    ],
                    "$etags",
                  ],
                ],
                [
                  "=$reply_to",
                  [
                    "if",
                    ["isEmpty", "$reply_tags"],
                    "",
                    "else",
                    ["last", "$reply_tags"],
                  ],
                ],
              ],
            ],
            ["=$no_reply", ["isEmpty", "$reply_to"]],
            ["=$reply", "!$no_reply"],
            ["=$parents", []],
            [
              "if",
              "$is_mark",
              [
                "=$parents",
                [
                  [
                    "pipe",
                    [
                      "filter",
                      [
                        "propSatisfies",
                        ["includes", ["__"], ["[]", "root", "reply"]],
                        3,
                      ],
                    ],
                    ["map", ["nth", 1]],
                  ],
                  "$etags",
                ],
              ],
              "elif",
              "$reply",
              [
                "=$parents",
                [
                  [
                    "pipe",
                    [
                      "filter",
                      [
                        "propSatisfies",
                        ["either", ["equals", ""], ["isNil"]],
                        3,
                      ],
                    ],
                    ["map", ["nth", 1]],
                  ],
                  "$etags",
                ],
              ],
            ],
            [
              "set()",
              [
                {
                  id: "$data.id",
                  owner: "$data.after.pubkey",
                  type: "status",
                  description: "$data.after.content",
                  date: "$data.after.created_at",
                  repost: "$repost",
                  reply_to: "$reply_to",
                  reply: "$reply",
                  quote: "$quote",
                  parents: "$parents",
                  hashes: [],
                  mentions: "$mentions",
                  likes: 0,
                  reposts: 0,
                  quotes: 0,
                  comments: 0,
                },
                "posts",
                "$data.id",
              ],
            ],
          ],
        ],
      ],
    },
    {
      key: "inc_comments",
      version: 2,
      on: "create",
      func: [
        [
          "when",
          [
            "both",
            ["complement", ["isNil"]],
            [
              "o",
              [["complement", ["equals"]], ""],
              ["var", "data.after.reply_to"],
            ],
          ],
          [
            "pipe",
            [
              "map",
              [
                [
                  "append",
                  ["__"],
                  ["[]", "update", { comments: db.inc(1) }, "posts"],
                ],
              ],
            ],
            ["let", "batch"],
          ],
          "$data.after.parents",
        ],
      ],
    },
  ],
  follows: [
    {
      key: "follow",
      version: 2,
      on: "create",
      func: [
        ["update()", [{ followers: db.inc(1) }, "users", "$data.after.to"]],
        ["update()", [{ following: db.inc(1) }, "users", "$data.after.from"]],
        ["=$docid", ["join", ":", ["$data.after.from", "$data.after.to"]]],
        ["update()", [{ last: db.ts() }, "follows", "$docid"]],
      ],
    },
    {
      key: "unfollow",
      version: 2,
      on: "delete",
      func: [
        ["update()", [{ followers: db.inc(-1) }, "users", "$data.before.to"]],
        ["update()", [{ following: db.inc(-1) }, "users", "$data.before.from"]],
      ],
    },
  ],
  likes: [
    {
      key: "inc_like",
      version: 2,
      on: "create",
      func: [
        ["=$art", ["get()", ["posts", "$data.after.aid"]]],
        ["=$week", ["subtract", "$block.timestamp", 60 * 60 * 24 * 7]],
        [
          "=$new_pt",
          [
            "add",
            1,
            [
              "multiply",
              ["defaultTo", 0, "$art.pt"],
              [
                "subtract",
                1,
                [
                  "divide",
                  [
                    "subtract",
                    "$block.timestamp",
                    ["defaultTo", "$week", "$art.ptts"],
                  ],
                  "$week",
                ],
              ],
            ],
          ],
        ],
        [
          "update()",
          [
            {
              likes: db.inc(1),
              pt: "$new_pt",
              ptts: db.ts(),
              last_like: db.ts(),
            },
            "posts",
            "$data.after.aid",
          ],
        ],
      ],
    },
  ],
  users: [
    {
      key: "inc_invited",
      version: 2,
      on: "create",
      func: [
        [
          "update()",
          [{ invited: db.inc(1) }, "users", "$data.after.invited_by"],
        ],
      ],
    },
  ],
}
