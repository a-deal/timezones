const express = require("express")
const status = require("http-status-codes")
const moment = require("moment-timezone")

const app = express()

app.get("/", (req, res) => {
  let currentTime = moment.tz(moment(), moment.tz.guess())
  if (req.query.timezone) {
    if (moment.tz.zone(req.query.timezone) === null) {
      res.status(status.BAD_REQUEST).json({
        error:
          "Specified time zone is unrecognized. Please provide one listed in the availableTimeZones member of this response.",
        availableTimeZones: moment.tz.names()
      })
      return
    } else {
      currentTime = currentTime.tz(req.query.timezone)
    }
  } else if (req.query.list_timezones && req.query.list_timezones === "true") {
    res.status(status.OK).json({
      availableTimeZones: moment.tz.names()
    })
    return
  }
  res.status(status.OK).json({
    currentServerTime: currentTime.format("HH:mm:ss z")
  })
})

app.use("*", (req, res) => {
  res.status(status.BAD_REQUEST).json({
    error:
      "Unrecognized URL path. Please see available endpoints provided in the supportedPaths member of this response.",
    supportedPaths: [
      {
        path: "/",
        supportedMethods: [
          {
            method: "GET",
            supportedQueryParameters: [
              {
                key: "timezone",
                expectedValue: "Supported time zone",
                description:
                  "Request server local time in a specified time zone"
              },
              {
                parameter: "list-timezones",
                expectedValue: "Boolean",
                description:
                  "If set to true, response will list all supported time zones"
              }
            ]
          }
        ]
      }
    ]
  })
})

app.listen(process.env.PORT, () => {
  console.log(`Server listening on ${process.env.PORT}`)
})
