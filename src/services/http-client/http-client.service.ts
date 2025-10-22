import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { firstValueFrom } from 'rxjs';

@Injectable({
    providedIn: 'root',
})
export class HttpClientService
{
    constructor(private http: HttpClient) { }

    get(url: string, headers?: any): Promise<any>
    {
        return firstValueFrom(this.http.get(url, { headers }));
    }

    put(url: string, body: any, headers?: any): Promise<any>
    {
        return firstValueFrom(this.http.put(url, body, { headers }));
    }

    post(url: string, body: any, headers?: any): Promise<any>
    {
        return firstValueFrom(this.http.post(url, body, { headers }));
    }
}
