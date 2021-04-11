const buildMixesReply = rows => {
  let mixes = []
  let mixNumber = 1
  let flavours = []
  let i = 0

  rows.forEach(row => {
    if (row.mix_id === mixNumber) {
      flavours.push(row.flavour_name)
    } else if (flavours.length) {
      mixes.push({ id: rows[i - 1].mix_id, name: rows[i - 1].mix_name, flavours, creator: { id: rows[i - 1].creator_id, name: rows[i - 1].creator_name } })
      flavours = []
      flavours.push(row.flavour_name)
      mixNumber = row.mix_id
    } else {
      flavours.push(row.flavour_name)
      mixNumber = row.mix_id
    }

    i++
  })

  mixes.push({ id: rows[i - 1].mix_id, name: rows[i - 1].mix_name, flavours, creator: { id: rows[i - 1].creator_id, name: rows[i - 1].creator_name } })

  return { success: true, count: mixes.length, results: mixes }
}

module.exports = {
  buildMixesReply
}