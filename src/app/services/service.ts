/** biome-ignore-all lint/complexity/noStaticOnlyClass: abstract base class used for inheritance — static client is shared across all service subclasses */
import { env } from '@app/config/env'
import axios from 'axios'

export abstract class Service {
  protected static client = axios.create({
    baseURL: env.api.url,
  })
}
