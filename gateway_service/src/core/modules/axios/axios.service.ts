import { HttpService } from '@nestjs/axios';
import { HttpException, Injectable, Logger } from '@nestjs/common';
import { AxiosResponse } from 'axios';
import { Observable, catchError, map, tap } from 'rxjs';

@Injectable()
export class AxiosService {
  private readonly logger = new Logger(AxiosService.name);
  constructor(private httpService: HttpService) {}

  private truncateLog(data: any, maxLines: number = 25): any {
    if (data === undefined) return data;
    const stringData = JSON.stringify(data, null, 2);
    const lines = stringData.split('\n');
    if (lines.length > maxLines) {
      return lines.slice(0, maxLines).concat(['... (truncated)']).join('\n');
    }
    return stringData;
  }

  private async makeRequest(
    method: 'get' | 'post' | 'put' | 'delete',
    url: string,
    data?: any,
    params?: any,
  ): Promise<any> {
    const config = {
      headers: { Accept: 'application/json' },
      params,
    };

    this.logger.log(`Making ${method.toUpperCase()} request to ${url}`, {
      params: this.truncateLog(params),
      data: this.truncateLog(data),
    });

    let response$: Observable<AxiosResponse<any>>;
    if (method === 'get' || method === 'delete') {
      response$ = this.httpService[method](url, config);
    } else {
      response$ = this.httpService[method](url, data, config);
    }

    return response$.pipe(
      tap({
        next: (response) => {
          this.logger.log(`Received response from ${url}`, {
            status: response.status,
            data: this.truncateLog(response.data),
          });
        },
        error: (error) => {
          this.logger.error(`Error response from ${url}`, error.toString(), {
            error: this.truncateLog(
              error.response ? error.response.data : error.message,
            ),
          });
        },
      }),
      catchError((e) => {
        // Rethrow the error as a HttpException for NestJS to handle
        throw new HttpException(
          e.response ? e.response.data : 'Unknown error',
          e.response ? e.response.status : 500,
        );
      }),
      map((response) => response.data),
    );
  }

  public async request(
    http_method: 'GET' | 'POST' | 'PUT' | 'DELETE',
    url: string,
    payload?: any,
    params?: any,
  ) {
    return await this.makeRequest(
      http_method.toLowerCase() as 'get' | 'post' | 'put' | 'delete',
      url,
      payload,
      params,
    );
  }
}
