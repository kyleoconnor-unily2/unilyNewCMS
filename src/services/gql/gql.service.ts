import { Injectable } from '@angular/core';
import { HttpClientService } from '../http-client/http-client.service';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
//import * as v1 from '@unily-apis/v1/api';

@Injectable({
    providedIn: 'root',
})
export class GQLService
{
    constructor(
        private httpClientService: HttpClientService,
        private httpClient: HttpClient
    ) { }

    post(url: string, operationName: string, gqlText: string, variables: object): Promise<any>
    {

        var request = {
            url: url,
            headers: {
                "Content-Type": "application/json",
            },
            data: {
                operationName: operationName,
                query: gqlText,
                variables: variables,
            },
        };
        return this.httpClientService.post(request.url, request.data, request.headers);
    }

    postObservable(
        operationName: string,
        gqlText: string,
        variables: object
    ): Observable<any>
    {
        const request = {
            url: '/api/v1/search',
            headers: {
                "Content-Type": "application/json",
            },
            data: {
                operationName: operationName,
                query: gqlText,
                variables: variables,
            },
        };

        return this.httpClient.post(
            request.url,
            request.data,
            {
                headers: request.headers
            })
    }
}

