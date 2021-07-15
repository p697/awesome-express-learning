import express from 'express'
import * as OpenApiValidator from 'express-openapi-validator'
import { Express } from 'express-serve-static-core'
import morgan from 'morgan'
import morganBody from 'morgan-body'
import { connector, summarise } from 'swagger-routes-express'
import YAML from 'yamljs'

import * as api from '@src/api/controllers'
import logger from '@utils/logger'
import config from '@config'

export async function createServer(): Promise<Express> {
  const yamlSpecFile = './config/openapi.yml'
  const apiDefinition = YAML.load(yamlSpecFile)
  
  const apiSummary = summarise(apiDefinition)
  logger.info(apiSummary)

  const server = express()

  server.use(express.json())

  // 生产模式，只log基础信息
  if (config.morganLogger) {
    server.use(morgan(':method :url :status :response-time ms - :res[content-length]'))
  }
  
  // 开发模式，log详细信息
  if (config.morganBodyLogger) {
    morganBody(server)
  }

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

  // 根据openapi.yml配置路由
  const connect = connector(api, apiDefinition, {
    onCreateRoute: (method: string, descriptor: any[]) => {
      descriptor.shift()
      logger.verbose(`${method}: ${descriptor.map((d: any) => d.name).join(', ')}`)
    },
    security: {
      bearerAuth: api.auth
    }
  })
  connect(server)

  return server
}
