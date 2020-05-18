# Time Zones

> Implement an HTTP server with a single endpoint that allows the client to request the wall-clock time on the server.
>
> - The server should return the time in 24-hour "hh:mm:ss" format, e.g. "18:36:24"
> - The client should be able to optionally specify a time zone, e.g. "America/Los_Angeles"
>
> Feel free to use any suitable libraries or frameworks, and to make your own design choices about the API.

This API exposes one endpoint to retrieve a server's wall clock time.

Additionally, you can specify a time zone with the query parameter `timezone` set to a recognized time zone.

To see a list of recognized time zones, you can set the paramter `list_timezones` to `true`.

## Guide

To install dependencies, run `npm install`

To run the server, run `npm start`
