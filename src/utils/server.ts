import express from 'express'
import * as OpenApiValidator from 'express-openapi-validator'
import { Express } from 'express-serve-static-core'
import { connector, summarise } from 'swagger-routes-express'
import YAML from 'yamljs'

import * as api from '../api/controllers'

export async function createServer(): Promise<Express> {
  const yamlSpecFile = './config/openapi.yml'
  const apiDefinition = YAML.load(yamlSpecFile)
  
  const apiSummary = summarise(apiDefinition)
  console.info(apiSummary)

  const server = express()
  // here we can intialize body/cookies parsers, connect logger, for example morgan

  // setup API validator
  server.use(
    OpenApiValidator.middleware({
      coerceTypes: true,
      apiSpec: yamlSpecFile,
      validateRequests: true, // (default)
      validateResponses: true, // false by default
    }),
  )

  // error customization, if request is invalid
  server.use((err: any, req: express.Request, res: express.Response, next: express.NextFunction) => {
    res.status(err.status).json({
      error: {
        type: 'request_validation',
        message: err.message,
        errors: err.errors
      }
    })
  })

  const connect = connector(api, apiDefinition, {
    onCreateRoute: (method: string, descriptor: any[]) => {
      descriptor.shift()
      console.log(`${method}: ${descriptor.map((d: any) => d.name).join(', ')}`)
    }
  })
  connect(server)

  return server
}
