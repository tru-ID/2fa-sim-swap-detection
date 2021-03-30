const fetch = require('node-fetch')
const logger = require('../logger')()

exports.performSimCheck = async (phone_number, access_token) => {
  const body = JSON.stringify({ phone_number })

  const response = await fetch(`https://eu.api.tru.id/sim_check/v0.1/checks`, {
    method: 'POST',
    body,
    headers: {
      Authorization: `Bearer ${access_token}`,
      'Content-Type': 'application/json',
    },
  })

  const data = await response.json()
  logger.debug(data)

  return data.no_sim_change
}