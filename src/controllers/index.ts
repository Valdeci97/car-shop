import { Response, Request } from 'express';
import Service from '../services';

export type ResponseError = { error: unknown; };

export interface RequestWithBody<T> extends Request { body: T; }

enum ControllerErrors {
  internal = 'Internal server error',
  notFound = 'Object not found',
  badRequest = 'Bad request',
  idNotHexa = 'Id must have 24 hexadecimal characters',
}

export default abstract class Controller<T> {
  public abstract route: string;

  protected errors = ControllerErrors;

  constructor(protected service: Service<T>) {}

  public abstract create(
    req: RequestWithBody<T>,
    res: Response<T | ResponseError>
  ): Promise<typeof res>;

  public async read(
    _req: Request,
    res: Response<T[] | ResponseError>,
  ): Promise<typeof res> {
    try {
      const obj = await this.service.read();
      return res.status(200).json(obj);
    } catch (err) {
      return res.status(500).json({ error: this.errors.internal });
    }
  }

  public abstract readOne(
    req: Request<{ id: string }>,
    res: Response<T | ResponseError>
  ): Promise<typeof res>;

  public abstract update(
    req: Request<{ id: string } & T>,
    res: Response<T | ResponseError>,
  ): Promise<typeof res>;

  public abstract delete(
    req: RequestWithBody<T>,
    res: Response<T | ResponseError>,
  ): Promise<Response | void | ResponseError>;
}