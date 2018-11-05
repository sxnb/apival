import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class RequestService {

    constructor(private http: HttpClient) {
    }

    public call(method: string, url: string, body: string, headers: any): Observable<any> {

        let options = {
            headers: null
        };

        switch (method) {
            case 'GET':
                return this.get(url, options);
            case 'POST':
                return this.post(url, body, options);
            case 'PUT':
                return this.put(url, body, options);
            case 'PATCH':
                return this.patch(url, body, options);
            case 'DELETE':
                return this.delete(url, options);
        }
    }

    public get(url, options): Observable<any> {
        console.log(options.headers);
        return this.http.get(url, options);
    }

    public post(url, body, options): Observable<any> {
        return this.http.post(url, body, options);
    }

    public put(url, body, options): Observable<any> {
        return this.http.put(url, body, options);
    }

    public patch(url, body, options): Observable<any> {
        return this.http.patch(url, body, options);
    }

    public delete(url, options): Observable<any> {
        return this.http.delete(url, options);
    }
}
